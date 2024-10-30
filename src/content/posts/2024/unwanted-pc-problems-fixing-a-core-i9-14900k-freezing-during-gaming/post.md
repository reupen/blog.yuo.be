---
title: "Unwanted PC problems: fixing a Core i9-14900K freezing during gaming"
slug: unwanted-pc-problems-fixing-a-core-i9-14900k-freezing-during-gaming
date: 2024-01-28T00:00:18.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-65b530e01fe2ea7fd10d1612
tags:
  - hardware
excerpt: |-
  I recently upgraded my CPU to a Core i9-14900K. However, it came with an unwanted problem: freezes during gaming.

  These freezes occurred only when XMP was enabled. They were complete lock-ups, requiring the power button to be held down to turn off the computer. The freezes only really became a problem after a BIOS update (after which playing Alan Wake 2 for a few hours would be enough to trigger a freeze).

  A quick search online suggested that the problem may be caused by the system agent (SA)
---

[I recently upgraded my CPU to a Core i9-14900K](/2023/12/19/i-upgraded-my-i9-13900-to-an-i9-14900k/).
However, it came with an unwanted problem: freezes during gaming.

These freezes occurred only when XMP was enabled. They were complete lock-ups,
requiring the power button to be held down to turn off the computer. The freezes
only really became a problem after a BIOS update (after which playing Alan Wake
2 for a few hours would be enough to trigger a freeze).

A quick search online suggested that the problem may be caused by the system
agent (SA) voltage being too high. With XMP disabled, my Asus ROG STRIX Z790-F
GAMING WIFI motherboard would set the SA voltage to around 0.79V. With XMP
enabled, it sets it much higher at 1.35V.

My RAM is a Corsair 2x16GB 6400MT/s C32 kit. It didn’t seem particularly
extravagant, so I hoped I could reduce the SA voltage a reasonable amount. With
XMP still enabled, I set the SA voltage to 1.15V and ran some memory (and
stress) tests to check my RAM was still stable. It was.

A month on from that, I’ve had no further freezes while playing games. Perhaps
Raptor Lake Refresh likes lower SA voltages than Raptor Lake does.
