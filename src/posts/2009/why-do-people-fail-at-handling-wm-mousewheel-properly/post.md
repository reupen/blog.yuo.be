---
title: "Why do people fail at handling WM_MOUSEWHEEL properly?"
slug: why-do-people-fail-at-handling-wm-mousewheel-properly
date: 2009-02-07T23:29:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-315
excerpt: |-
  When handling this message, one of the values you receive is the value which
  expresses "the distanced the wheel is rotated" (or rather, was). I will call it
  delta1 to avoid confusion. Basically, this works on a scale where a delta1 of
  [fixed value called WHEEL_DELTA] is equal to [system wide setting] units (lines
  or whatever). With respect to that fixed value WHEEL_DELTA, it says on MSDN:

  "The delta was set to 120 to allow Microsoft or other vendors to build
  finer-resolution wheels in the futur
---

When handling this message, one of the values you receive is the value which
expresses "the distanced the wheel is rotated" (or rather, was). I will call it
delta1 to avoid confusion. Basically, this works on a scale where a delta1 of
\[fixed value called WHEEL_DELTA] is equal to \[system wide setting] units
(lines or whatever). With respect to that fixed value WHEEL_DELTA, it says on
MSDN:

"The delta was set to 120 to allow Microsoft or other vendors to build
finer-resolution wheels in the future, including perhaps a freely-rotating wheel
with no notches. The expectation is that such a device would send more messages
per rotation, but with a smaller value in each message. To support this
possibility, you should either add the incoming delta values until WHEEL_DELTA
is reached (so for a delta-rotation you get the same response), or scroll
partial lines in response to the more frequent messages. You could also choose
your scroll granularity and accumulate deltas until it is reached."

Unfortunately, many people seem to have glossed over that, and even the rest of
the content on the page.

Some of the problems I have faced when using a smooth Microsoft mouse wheel:

- Applications scrolling in the same direction whichever way you turn the wheel
  (unless you turn it exceptionally fast). I would guess the bugged code in
  question would be something like:

  ```c++
  scroll_direction = delta1 >= WHEEL_DELTA ? UP : DOWN
  ```

  Microsoft's Performance Analyzer fits this category..

- Applications not scrolling at all unless you turn the wheel really fast. The
  problem in this case would be the application ignoring |delta1| values less
  than WHEEL_DELTA. The new PerfectDisk 10 fits this one.
- Applications scrolling erratically/"too much". The problem in this case is
  that they only check the sign of the delta1 value, and ignore the magnitude.
- Applications lacking common sense with mouse wheel scrolling. For example, on
  its rotating main menu Windows Media Center generally scrolls several entries
  at a time on when turning my mouse wheel.
- Not so much a bug but a nuisance nonetheless: applications accumulating deltas
  until |delta1| >= WHEEL_DELTA is reached, when they could in fact have
  scrolled in smaller increments earlier. This affects many of the lists in the
  shell on Windows Vista, though I noticed many of those have been changed in
  Windows 7 beta.

(Click [here](http://en.wikipedia.org/wiki/Absolute_value) if you don't know
what my vertical bars mean)
