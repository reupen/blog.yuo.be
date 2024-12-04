---
title: "The freezing Dell U2720Q monitor"
slug: the-freezing-dell-u2720q-monitor
date: 2020-08-05T20:36:47.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-5f21dcf93beb750cc5cd9bb0
tags:
  - tech
excerpt: |-
  I recently bought a Dell U2720Q 4k monitor. However, I had a curious problem: when using my desktop PC, the monitor would occasionally lock up. The screen would turn black and the monitor would become unresponsive to anything other than the power button. Pressing the power button twice (i.e. turning the monitor off and on again) would get the monitor working again.

  The desktop PC was connected to the monitor via HDMI, and the problem didn’t occur when I was using laptops connected via DisplayPo
---

I recently bought a Dell u2720Q 4k monitor. However, I had a curious problem:
when using my desktop PC, the monitor would occasionally lock up. The screen
would turn black and the monitor would become unresponsive to anything other
than the power button. Pressing the power button twice (i.e. turning the monitor
off and on again) would get the monitor working again.

The desktop PC was connected to the monitor via HDMI, and the problem didn’t
occur when I was using laptops connected via DisplayPort or USB-C. All devices
were outputting 4k 60Hz, so my first thought was that there might be a problem
related to the HDMI input on the monitor, the HDMI cable or the HDMI signal
output by my PC. I was sceptical that any of these could be the problem, but I
also couldn’t find any other similar complaints about the monitor online. I
tried swapping out the HDMI cable and updating my graphics card driver as an
attempt to rule out things out, but, to my continued puzzlement, the problem
persisted.

I started to think about other possible causes of the problem. It occurred to me
that there was a pattern to the failures – it would tend to happen late in the
day, and once it had happened, it would reoccur frequently for the rest of the
day. At first, I struggled to understand why.

I also noted that I had installed Dell Display Manager (DDM) on the desktop PC
but had stopped it from starting automatically on boot. I was using DDM with
command-line arguments to easily switch monitor inputs without using the
physical buttons on the monitor (which, incidentally, are a bit of a pain to use
to switch inputs quickly). I had created shortcuts on my desktop that run DDM
with these command-line arguments to switch monitor inputs and would tend to use
these shortcuts in the afternoon.

The next time the problem occurred, I noticed something that I wasn’t expecting:
the DDM icon was in the Windows notification area (and so it was running).
According to
[Autoruns](https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns) and
my own testing, DDM wasn’t starting at boot, so it must’ve been started at some
other point during the day. My input switching shortcuts immediately came to
mind – were they leaving DDM running in the background? This wasn’t obvious when
using them, but I did a quick test, and they were.

I started manually closing DDM after using those shortcuts, and the
(monitor-freezing) problem seemed to go away. Alas, this relied on me
remembering to do that, so I looked for an alternative to DDM that would also
let me switch monitor inputs using the command-line.
[NirSoft ControlMyMonitor](https://www.nirsoft.net/utils/control_my_monitor.html)
is capable of exactly that, so I starting using it and stopped using DDM
completely. The problem hasn’t reoccurred once.

(If you’re wondering, a similar program for Linux is
[ddccontrol](https://github.com/ddccontrol/ddccontrol).)
