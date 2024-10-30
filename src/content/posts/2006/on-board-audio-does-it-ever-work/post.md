---
title: "On-board audio - does it ever work?"
slug: on-board-audio-does-it-ever-work
date: 2006-10-13T10:45:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-360
excerpt: |-
  I am more and more regretting my purchase of the M2N32-SLI Deluxe motherboard
  (over the Gigabyte GA-M59SLI-S5). Since I have started to use the on-board
  ADI1988b audio (after having to pull my Audigy out of the computer) I have
  noticed a slight intermittent problem: no sound. Yes, randomly (after boot-up)
  the rear line-out is not outputting any sound (although turning up my speakers
  to full volume yields some faint resemblance of what I should be hearing).
  However, plugging my speaker cable into
---

I am more and more regretting my purchase of the M2N32-SLI Deluxe motherboard
(over the Gigabyte GA-M59SLI-S5). Since I have started to use the on-board
ADI1988b audio (after having to pull my Audigy out of the computer) I have
noticed a slight intermittent problem: no sound. Yes, randomly (after boot-up)
the rear line-out is not outputting any sound (although turning up my speakers
to full volume yields some faint resemblance of what I should be hearing).
However, plugging my speaker cable into the headphone socket on the front of my
tower gets me sound again. Then plugging it back into the rear of my tower, and
restarting the computer would also get me my sound back - as well as a "New
audio device connected message" straight after boot-up from the AudioESP
feature. Great...

So, judging by the message, I thought (naturally) that it was AudioESP at fault
for this. I disabled it, but alas the problem has continued since. So for now I
am stuck with plugging my speakers into the headphone socket, until I find a
solution.

Also quite funny is how they include a file in the sound driver with the
following line repeated again and again: "This is a "dummy" CAT file to take up
space and pretend it is not useless". Hmmm... inspires confidence, doesn't it?
;)

**Update:** Seems to be a bug in the 4560 version of the driver. Reverting to
4530 fixed it.
