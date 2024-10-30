---
title: "When in doubt, look closer to home"
slug: when-in-doubt-look-closer-to-home
date: 2009-04-28T19:50:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-310
excerpt: |-
  I saw a string of peculiar messages in the Windows Event Log on my laptop which
  at first sight looked quite alarming:

  > Windows (1608) Windows: A request to read from the file
  "C:\ProgramData\Microsoft\Search\Data\Applications\Windows\Windows.edb" at
  offset 56401920 (0x00000000035ca000) for 16384 (0x00004000) bytes succeeded, but
  took an abnormally long time (13930 seconds) to be serviced by the OS. In
  addition, 0 other I/O requests to this file have also taken an abnormally long
  time to be ser
---

I saw a string of peculiar messages in the Windows Event Log on my laptop which
at first sight looked quite alarming:

> Windows (1608) Windows: A request to read from the file
> "C:\ProgramData\Microsoft\Search\Data\Applications\Windows\Windows.edb" at
> offset 56401920 (0x00000000035ca000) for 16384 (0x00004000) bytes succeeded,
> but took an abnormally long time (13930 seconds) to be serviced by the OS. In
> addition, 0 other I/O requests to this file have also taken an abnormally long
> time to be serviced since the last message regarding this problem was posted
> 30928 seconds ago. This problem is likely due to faulty hardware. Please
> contact your hardware vendor for further assistance diagnosing the problem.

I was sceptical that my hard drive had issues. But (slightly alarmed) I thought
I'd give the message the benefit of the doubt and investigate further.

First thing to check was, are there any other signs of hard drive issues?
S.M.A.R.T.? No problems. Chkdsk? A-OK. Any different class of messages about
hard drive/storage related problems in the Event Log? Nope.

So, as sure as one could be that my hardware was OK I took a closer look at the
messages themselves. The first thing that stuck out was the times quoted: 13930
and 30928 seconds. Hmm, that's a long time - in fact respectively 4 and 8.5
hours!

The plot thickened: the messages seemed to be following a pattern - they were
all straight after resuming from standby. Yes, it was painfully obvious by now
but those 4 / 8.5 hours were how long the laptop was in standby. I didn't need
to contact my hardware vendor to work that out, either.

Conclusion? I don't know: probably that if you are going to blame hardware, make
damn sure you're right in the first place. (I can only begin to imagine what the
conversation with my hardware vendor might have actually gone like...)
