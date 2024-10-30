---
title: "The queue to nowhere"
slug: the-queue-to-nowhere
date: 2016-07-10T18:29:22.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-373
tags:
  - Win32
excerpt: |-
  Recently, I received a report of a hang when using one of my foobar2000
  components on Windows 10. I had a process dump file which showed the hang was
  not in my code: foobar2000 itself was stuck in a loop on the main thread
  retrying a call to PostMessage after it had returned ERROR_NOT_ENOUGH_QUOTA.
  That return value indicates that the thread’s message queue has hit its size
  limit.

  According to the documentation for PostMessage
  [https://msdn.microsoft.com/en-gb/library/windows/desktop/ms644944(v
---

Recently, I received a report of a hang when using one of my foobar2000
components on Windows 10. I had a process dump file which showed the hang was
not in my code: foobar2000 itself was stuck in a loop on the main thread
retrying a call to `PostMessage` after it had returned `ERROR_NOT_ENOUGH_QUOTA`.
That return value indicates that the thread’s message queue has hit its size
limit.

According to the documentation for
[PostMessage](<https://msdn.microsoft.com/en-gb/library/windows/desktop/ms644944(v=vs.85).aspx>)
\[[archive](http://archive.is/7zz8C)]:

- the default message queue message limit is 10,000 messages;
- the limit is specified by the `USERPostMessageLimit` value under the
  `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Windows`
  registry key; and
- the ‘minimum acceptable value’ of the limit is 4000.

It was certainly a curious situation on multiple levels. It was in no way clear
why the message queue was full, nor where the bug lay. The process dump file
wasn’t much use beyond determining that the message queue was full (as user-mode
dump files don’t contain kernel memory, which is where the message queue is
held). I could not reproduce the problem either. I’d need to be looking at a
kernel dump to inspect the message queue, but it was not something I’d done
before.

I came across
[this article](http://blog.airesoft.co.uk/2009/11/jumping-the-queues/) which
explained that you can get to a thread’s message queue via the `tagTHREADINFO`
associated with the thread. But, being unfamiliar with kernel debugging, it
wasn’t immediately obvious to me how to locate and examine `tagTHREADINFO` and
other structures in a debugger. It turned out it was fairly simple for Windows
7, but in Windows 8 Microsoft removed `tagTHREADINFO` and other relevant types
from the public debugging symbols (and that remains the case today for Windows
10). Nonetheless, I was able to work out how to examine the message queue in a
kernel debugger on both Windows 7 and 10, and so I’ll cover both below.

## Creating a kernel dump

I first needed to know how to create a kernel dump file. This is where the
[Microsoft Sysinternals LiveKD utility](https://technet.microsoft.com/en-gb/sysinternals/livekd.aspx)
came handy: it can both start the kernel debugger and create a kernel dump on
the local system.[^1] That was useful, because it was easier than debugging a
second system, and it something someone could potentially do on their own
system. LiveKD requires the
[Debugging Tools for Windows](<https://msdn.microsoft.com/en-gb/library/windows/hardware/ff551063(v=vs.85).aspx>);
the version of the debugging tools in the
[Windows 10 SDK](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
works with Windows 7 to Windows 10 and so is a good one to use.

The LiveKD documentation explains how to use it, but the command to create a
(mirror) dump is along the lines of:

```
set path=C:\Program Files (x86)\Windows Kits\10\Debuggers\x64;%path%
livekd -m 18FC -o kernel.dmp
```

If you have multiple versions of WinDbg installed, you have to be careful
because LiveKD might use the wrong one, and you may end up with an unusable dump
file if the version used is very old.

In the example above, `-m` asks for a mirror dump, which ensures captured memory
is in a consistent state, and the `18FC` following specifies which regions of
memory to include in the dump. The default is `18F8` – I added the shared
section as `tagWND` structures seem to lie there.

Once you have a dump file, you can open it up with WinDbg or kd. You will need
Microsoft’s symbol server configured, but LiveKD would have set that up for you
if it wasn’t already.

## Locating tagTHREADINFO on Windows 7

Once you have the dump file loaded up, you can use the
[!process command](<https://msdn.microsoft.com/en-gb/library/windows/hardware/ff564717(v=vs.85).aspx>)
to list the threads of a process. Here’s an example on Windows 7 SP1 32-bit:

```
0: kd> !process 0 2 foobar2000.exe
PROCESS 85eb1030  SessionId: 1  Cid: 0f64    Peb: 7ffd6000  ParentCid: 075c
    DirBase: 3f3627c0  ObjectTable: ab2f1230  HandleCount: 303.
    Image: foobar2000.exe

        THREAD 86826030  Cid 0f64.1214  Teb: 7ffdf000 Win32Thread: fe634dc8 WAIT: (WrResource) KernelMode Non-Alertable
            85c13f78  SynchronizationEvent

        THREAD 86546430  Cid 0f64.12b8  Teb: 7ffde000 Win32Thread: 00000000 WAIT: (UserRequest) UserMode Non-Alertable
            8694b3e0  NotificationEvent
            85602d70  NotificationEvent
...
```

From the ‘Jumping the Queues’ article, we’re looking for the `tagTHREADINFO` or
`_W32THREAD` structure (the latter is the first part of the former). As it turns
out, the address of those for a particular thread is the `Win32Thread` address
in the output above.

As an aside, it’s useful to know where that address comes from. The address next
to `THREAD` is the address of the `_ETHREAD` structure associated with the
thread. That structure starts with a `_KTHREAD` structure, and it is a field
within that which contains the `Win32Thread` address.

The
[dt (display type) command](<https://msdn.microsoft.com/en-gb/library/windows/hardware/ff542772(v=vs.85).aspx>)
can be used to illustrate this:

```
0: kd> dt nt!_ETHREAD Tcb.Win32* 86826030
   +0x000 Tcb       :
      +0x18c Win32Thread : 0xfe634dc8 Void
```

Similarly, the address next to `PROCESS` is an `_EPROCESS` structure which
contains a pointer to the `_W32PROCESS` structure:

```
0: kd> dt nt!_EPROCESS Win32* 85eb1030
   +0x120 Win32Process : 0xfe109568 Void
   +0x13c Win32WindowStation : 0x00000030 Void

```

Back to the main topic. We’re looking for the `mlPost` field in the
`tagTHREADINFO` structure. We can again use the `dt` command to display the
definition of `tagTHREADINFO` – here’s partial output of it for Windows 7 SP1
32-bit:

```
0: kd> dt win32k!tagTHREADINFO
   +0x000 pEThread         : Ptr32 _ETHREAD
   +0x004 RefCount         : Uint4B
...
   +0x174 mlPost           : tagMLIST
...
   +0x210 dwIntegrityLevelMouseHookTarget : Uint4B
   +0x214 StackListHead    : _LIST_ENTRY
```

And there’s our `mlPost` field, of type `tagMLIST`. Here’s the definition of
`tagMLIST` and also the related `tagQMSG` and `tagMSG` structures (again 32-bit
versions):

```
0: kd> dt win32k!tagMLIST
   +0x000 pqmsgRead        : Ptr32 tagQMSG
   +0x004 pqmsgWriteLast   : Ptr32 tagQMSG
   +0x008 cMsgs            : Uint4B
```

```
0: kd> dt win32k!tagQMSG
   +0x000 pqmsgNext        : Ptr32 tagQMSG
   +0x004 pqmsgPrev        : Ptr32 tagQMSG
   +0x008 msg              : tagMSG
   +0x024 ExtraInfo        : Int4B
   +0x028 ptMouseReal      : tagPOINT
   +0x030 dwQEvent         : Pos 0, 30 Bits
   +0x030 Padding          : Pos 30, 2 Bits
   +0x034 Wow64Message     : Pos 0, 1 Bit
   +0x034 NoCoalesce       : Pos 1, 1 Bit
   +0x034 FromTouch        : Pos 2, 1 Bit
   +0x034 FromPen          : Pos 3, 1 Bit
   +0x038 pti              : Ptr32 tagTHREADINFO
   +0x03c MsgPPInfo        : tagMSGPPINFO
```

```
0: kd> dt win32k!tagMSG
   +0x000 hwnd             : Ptr32 HWND__
   +0x004 message          : Uint4B
   +0x008 wParam           : Uint4B
   +0x00c lParam           : Int4B
   +0x010 time             : Uint4B
   +0x014 pt               : tagPOINT
```

As can be seen, `tagMLIST` is
[a doubly-linked list](https://en.wikipedia.org/wiki/Doubly_linked_list), and as
such each message in the queue contains pointers to the previous and next
message.

## Examining the message queue

As shown earlier, you can give the `dt` command a type and an address and it
will show values from memory alongside the definition of the type. But
`tagTHREADINFO` is a large structure – I was only interested in the `mlPost`
field and all its subfields. You could get there using `dt`, but I soon found
the
[dx command](<https://msdn.microsoft.com/en-gb/library/windows/hardware/dn936815(v=vs.85).aspx>)
which I found more suited to this purpose. It effectively allows you to evaluate
a C++ expression involving types from debugging symbols. Here’s an example of
using `dx` to display the everything under the `mlPost` field:[^2]

```
0: kd> dx -r9 -n ((win32k!tagTHREADINFO*)0xfffffffffe634dc8)->mlPost
((win32k!tagTHREADINFO*)0xfffffffffe634dc8)->mlPost                 [Type: tagMLIST]
    [+0x000] pqmsgRead        : 0xfffffffffdef6918 [Type: tagQMSG *]
        [+0x000] pqmsgNext        : 0x0 [Type: tagQMSG *]
        [+0x004] pqmsgPrev        : 0x0 [Type: tagQMSG *]
        [+0x008] msg              [Type: tagMSG]
            [+0x000] hwnd             : 0x505e4 [Type: HWND__ *]
                [+0x000] unused           : Unable to read memory at Address 0x505e4
            [+0x004] message          : 0x113 [Type: unsigned int]
            [+0x008] wParam           : 0xc0ffee [Type: unsigned int]
            [+0x00c] lParam           : 0 [Type: long]
            [+0x010] time             : 0xa041e1 [Type: unsigned long]
            [+0x014] pt               [Type: tagPOINT]
                [+0x000] x                : 815 [Type: long]
                [+0x004] y                : 100 [Type: long]
        [+0x024] ExtraInfo        : 0 [Type: long]
        [+0x028] ptMouseReal      [Type: tagPOINT]
            [+0x000] x                : 815 [Type: long]
            [+0x004] y                : 100 [Type: long]
        [+0x030 (29: 0)] dwQEvent         : 0x0 [Type: unsigned long]
        [+0x030 (31:30)] Padding          : 0x0 [Type: unsigned long]
        [+0x034 ( 0: 0)] Wow64Message     : 0 [Type: int]
        [+0x034 ( 1: 1)] NoCoalesce       : 0 [Type: int]
        [+0x034 ( 2: 2)] FromTouch        : 0 [Type: int]
        [+0x034 ( 3: 3)] FromPen          : 0 [Type: int]
        [+0x038] pti              : 0x0 [Type: tagTHREADINFO *]
        [+0x03c] MsgPPInfo        [Type: tagMSGPPINFO]
            [+0x000] dwIndexMsgPP     : 0x0 [Type: unsigned long]
    [+0x004] pqmsgWriteLast   : 0xfffffffffdef6918 [Type: tagQMSG *]
        [+0x000] pqmsgNext        : 0x0 [Type: tagQMSG *]
        [+0x004] pqmsgPrev        : 0x0 [Type: tagQMSG *]
        [+0x008] msg              [Type: tagMSG]
            [+0x000] hwnd             : 0x505e4 [Type: HWND__ *]
                [+0x000] unused           : Unable to read memory at Address 0x505e4
            [+0x004] message          : 0x113 [Type: unsigned int]
            [+0x008] wParam           : 0xc0ffee [Type: unsigned int]
            [+0x00c] lParam           : 0 [Type: long]
            [+0x010] time             : 0xa041e1 [Type: unsigned long]
            [+0x014] pt               [Type: tagPOINT]
                [+0x000] x                : 815 [Type: long]
                [+0x004] y                : 100 [Type: long]
        [+0x024] ExtraInfo        : 0 [Type: long]
        [+0x028] ptMouseReal      [Type: tagPOINT]
            [+0x000] x                : 815 [Type: long]
            [+0x004] y                : 100 [Type: long]
        [+0x030 (29: 0)] dwQEvent         : 0x0 [Type: unsigned long]
        [+0x030 (31:30)] Padding          : 0x0 [Type: unsigned long]
        [+0x034 ( 0: 0)] Wow64Message     : 0 [Type: int]
        [+0x034 ( 1: 1)] NoCoalesce       : 0 [Type: int]
        [+0x034 ( 2: 2)] FromTouch        : 0 [Type: int]
        [+0x034 ( 3: 3)] FromPen          : 0 [Type: int]
        [+0x038] pti              : 0x0 [Type: tagTHREADINFO *]
        [+0x03c] MsgPPInfo        [Type: tagMSGPPINFO]
            [+0x000] dwIndexMsgPP     : 0x0 [Type: unsigned long]
    [+0x008] cMsgs            : 0x1 [Type: unsigned long]
```

And, there’s the message queue for this thread (which, from the value of
`cMsgs`, has just one message in it). Note that here we have `HWND`s and not
pointers to `tagWND` structures. You may be interested in things like the window
title and class of the window each message is going to, but these are in the
`tagWND` structure and I don’t know at present how to go from an `HWND` to a
`tagWND` structure using a kernel dump. At run-time, though, it can be done by
the
[private ValidateHWND user32 function](https://groups.google.com/forum/#!searchin/microsoft.public.win32.programmer.kernel/Reading$20a$20Wnd$20structure/microsoft.public.win32.programmer.kernel/XxihATyxaGI/NXNvPNXByLEJ).
(You may find it easier to save the details of all windows to a text file at the
same time as making the dump;
[WinLister](http://www.nirsoft.net/utils/winlister.html) can do that if you
enable the options to show hidden and zero-size windows.)

## What about Windows 10?

As mentioned, Microsoft have removed the types required from the debugging
symbols for Windows 8 and newer, which certainly makes the task no easier. With
a bit of effort, however, I was able to locate the message queue once again.

Here’s how to get to them as of an up-to-date version of Windows 10 version 1511
(build 10586.420). The first thing to note is that the `Win32Thread` address
isn’t the address of a `win32k!_W32THREAD` structure (at least for the threads I
looked at). I suspect it is instead a `win32k!_W32THREADNONPAGED` structure.[^3]
Regardless of whether that’s right, at the address is a pointer to the actual
`win32k!_W32THREAD` structure.

Here’s an example on Windows 10 32-bit:

```
0: kd> !process 0 2 foobar2000.exe
PROCESS c5d252c0  SessionId: 1  Cid: 0e00    Peb: 00eb0000  ParentCid: 0820
    DirBase: 05800520  ObjectTable: 93ef2a80  HandleCount: <Data Not Accessible>
    Image: foobar2000.exe

        THREAD af70db00  Cid 0e00.0ac0  Teb: 00eb1000 Win32Thread: bc5c1948 WAIT: (WrUserRequest) UserMode Non-Alertable
            bc58c7d0  SynchronizationEvent
...
```

```
0: kd> dt nt!_ETHREAD Tcb.Win32* af70db00
   +0x000 Tcb       :
      +0x124 Win32Thread : 0xbc5c1948 Void
```

```
0: kd> dt win32k!_W32THREADNONPAGED bc5c1948
   +0x000 pW32Thread       : 0x8dadc7a8 _W32THREAD
   +0x008 llQPCUserCritAcquire : 0n18795838967
   +0x010 ullUserCritAcquireToken : 0x14292c9
```

```
0: kd> dt win32k!_W32THREAD 8dadc7a8
   +0x000 pEThread         : 0xaf70db00 _ETHREAD
   +0x004 RefCount         : 1
   +0x008 ptlW32           : (null)
...
```

`tagMLIST` and `pqmsgRead` are then at an offset of 0x194 (32-bit)/0x2d8
(64-bit) from the start of `_W32THREAD`. The rest of the structures seem to be
broadly the same (at least, `pqmsgNext`, `pqmsgPrev` and `msg` of `tagQMSG`
were).

## What about the original problem?

It was some time before I found out that the problem was caused by the message
queue was being filled to its limit, and then a bit more time before I worked
out how to examine the message queue in a kernel dump on Windows 10.

In the meantime, I suspect the person with the problem simply moved on with
their life. On the plus side, I’m prepared if the problem crops up again.

[^1]:
    In fact, WinDbg supports live debugging on semi-recent versions of Windows
    and newer, but you have to enable it using bcdedit, and it (reportedly)
    really is live rather than a snapshot of any kind.

[^2]:
    I had to sign extend the address as I was using Windows 7 64-bit and the
    debugger complained if I didn’t.

[^3]: Surprisingly, a Google search for \_W32THREADNONPAGED yielded no results.
