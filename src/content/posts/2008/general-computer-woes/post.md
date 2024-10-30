---
title: "General computer woes"
slug: general-computer-woes
date: 2008-10-28T23:12:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-328
excerpt: |-
  This is what happens when I decide to upgrade some parts of my computer:

  1. Seagate 7200.11 1.5TB hard drive

  It turns out the nForce 590 (AMD) SATA driver on Windows Update (version
  5.10.2600.998; it was a new install of Windows Vista, the previous version
  included with Vista SP1 also didn't work) has some issues with this drive and/or
  1.5TB drives in general. Windows Experience Index benchmarking fails ("Cannot
  complete assessment"); running the command-line WinSAT tool in verbose mode
  reveal
---

This is what happens when I decide to upgrade some parts of my computer:

1\. Seagate 7200.11 1.5TB hard drive

It turns out the nForce 590 (AMD) SATA driver on Windows Update (version
5.10.2600.998; it was a new install of Windows Vista, the previous version
included with Vista SP1 also didn't work) has some issues with this drive and/or
1.5TB drives in general. Windows Experience Index benchmarking fails ("Cannot
complete assessment"); running the command-line WinSAT tool in verbose mode
reveals some scary errors in the hard drive benchmark (when it reaches close to
the end of the disk).

I was doubtful something was actually wrong with the drive, and things seemed OK
with SeaTools etc. I ran a long drive test in SeaTools DOS overnight just in
case. To my annoyance, when I returned in the morning SeaTools had decided to
quit to the screen where it tells you how to read the log. Checking the log only
showed a start time of the test, and nothing else, so no idea what happened
there.

Moving on, the next thing I decided to try was booting the previous install of
Vista and running the WinSAT tool against the 1.5TB drive. Strange, no errors.
So I wondered what could be different and the only thing that sprung to mind was
possibly the SATA controller driver. So I checked and indeed, the new install
was running a fairly older 5.10.2600.998 version compared to the 10.3.0.42
version on the old install which I had got from the latest nForce driver pack.

So I proceeded to install the latest nForce pack on my new install.. and for
some reason it didn't want to install the SATA drivers. So I did them manually
through device manager. Finally, that cleared up the WEI/WinSAT problem. No idea
if there was any other problems evident as Windows was installed to a 300GB
partition.

2\. Update motherboard BIOS (M2N32-SLI Deluxe) to prepare for new CPU.

My current BIOS didn't support the CPU I had ordered so I had to update the BIOS
in preparation. Given the past woes experienced in updating the BIOS on this
board, I had put this off until now.

Rightfully so, it seems. Updated BIOS to version 2101... no boot, just graphics
card fan whirring at full speed (?). Reset CMOS and it boots again. A bit of
investigation and hassle and it appears enabling SLI memory support causes this
(which was fine in the previous version). It may be related to the 2.2V voltage
set in the EPP profile of my RAM, but anyway it was working fine before. Several
people have reported the same on the Asus forums. Anyway I manually set the
timings at 2.0V and that was stable.

3\. Actually install new CPU.

Well, physically installing the CPU was easy. But it was running hotter than I
expected for a 65W CPU. A bit of investigation and it seemed that the CPU core
voltage (as reported by the motherboard) was a bit high at 1.39V. The CPU was
rated at 1.30/1.35V (side question: what is the slash meant to mean here? The
CPU is AMD ADO5600DOBOX). So I tried manually setting it at 1.35V, but it was
still reported at 1.39V. So I then tried seting it at 1.30V and it was now
reported at 1.34V. It shaved about 5 degrees C off the reported temperature so a
result it seems.

Conclusion: I knew it already, but this motherboard sucks.
