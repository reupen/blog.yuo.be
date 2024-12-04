---
title: 'Yes, it will always be "explorer.exe".'
slug: yes-it-will-always-be-explorer-exe
date: 2008-12-03T22:45:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-322
excerpt: |-
  One of the most annoying issues I have with applications when running under
  Vista 64-bit, is when applications (or rather their developers) decide that it
  will be a good idea to call explorer.exe directly for their implementation of
  "Open file location"/"Open containing folder". Apparently Shell APIs do not
  exist, or maybe they are scared of GetProcAddress et all if they actually care
  about Windows 2000 support.

  Not only does calling explorer.exe directly work like ass
  [http://www.hydrogenaudio
---

One of the most annoying issues I have with applications when running under
Vista 64-bit, is when applications (or rather their developers) decide that it
will be a good idea to call explorer.exe directly for their implementation of
"Open file location"/"Open containing folder". Apparently Shell APIs do not
exist, or maybe they are scared of GetProcAddress et all if they actually care
about Windows 2000 support.

Not
[only does calling explorer.exe directly work like ass](http://www.hydrogenaudio.org/forums/index.php?s=&showtopic=62742&view=findpost&p=570262),
but generally when 32-bit applications decide to do it, it launches an instance
of the 32-bit explorer.exe rather than the 64-bit version (I wasn't referring to
this in the linked post though). For me I have this issue with Firefox and
uTorrent. As a result, all of your 64-bit shell extensions will be unavailable.
For me that includes 7-Zip and my anti-virus - the things I usually want to use
on files downloaded with those two applications. Thankfully this was at least
fixed in foobar2000. \[Update: Seems to also be fixed in Firefox 3.1]

## Accumulated installer issues

On a vaguely similar note, I seem to remember (some years ago) some retarded
setup applications doing something like extracting a file called setup.exe into
the temp folder, but then running an entirely different setup.exe from the
(downloads) folder where the original executable was. Or something like that
anyway.

The other similar installer issue is when (self-extracting) installers - such as
most of nVidia's - decide the drive you wish to extract them to is the C:
drive - even when it does not exist or is not the system drive. Who knows, maybe
they fixed it by now.. I wouldn't bet on it though.

Installers launching the installed application with admin privileges when the
installer is running under UAC elevation also seems to be something people have
got wrong repeatedly in the past. Let's hope not so much in the future.

## Another OS bug

It doesn't warrant a new post but I finally tracked down another issue I was
having with Windows (Vista). I had downloaded an executable file, moved it into
a sub-folder of Program Files, and created shortcuts everywhere for it. Now,
whenever I ran those shortcuts, or even the executable directly it would always
warn me about the file coming from another computer. Even when I unticked the
box about always prompting for that file. Eventually it annoyed me enough to
investigate. I opened the properties for the file, and tried clicking the
'Unblock' button. But it didn't stop the messages, and the button came back next
time you opened that page! At this point I could work out what the problem was
(two-fold):

1. Vista needed elevation to unblock the file (as it was in the Program Files
   folder) but failed to prompt for it.
2. It silently failed when it couldn't unblock the file (and temporarily acted
   like it succeeded).

There is probably a few ways to work around this - I don't remember which one I
used, possibly moving the file out of Program Files, unblocking it, and moving
it back. But there sure is a couple of sloppy things on Microsoft's side here.
