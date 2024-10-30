---
title: "Retrieving data from the dead hard drive"
slug: retrieving-data-from-the-dead-hard-drive
date: 2008-11-03T23:29:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-326
excerpt: |-
  The process I followed is relatively funny really:

   1. Unplug hard drive SATA power lead & boot into Windows. Wait until it has
      finished loading.


   2. Connect SATA power lead, copy as many files possible (using Robocopy) before
      hard drive starts persistently clicking loudly and stops responding (in
      practice was about 2.3GB worth of files).


   3. Remove SATA power lead, wait a little bit until the drive spins down. Then
      go back to step 2.



  That was fun,
---

The process I followed is relatively funny really:

1. Unplug hard drive SATA power lead & boot into Windows. Wait until it has
   finished loading.

2. Connect SATA power lead, copy as many files possible (using Robocopy) before
   hard drive starts persistently clicking loudly and stops responding (in
   practice was about 2.3GB worth of files).

3. Remove SATA power lead, wait a little bit until the drive spins down. Then go
   back to step 2.

That was fun, I can assure you. Handily Robocopy does not recopy files that is
already copied sucessfully when you re-run it with the same command, so it was
actually very useful.

I also tried formatting the larger partition after I had recovered the files,
which of course forces all handles to the partition to be closed. It did about
70GB before it started clicking, which tells me the background things Vista was
doing were not helping when I was copying files off the drive. BUT if you have a
look around on the internet this drive appears to have issues when running under
most other operating systems for some reason (the firmware issues, apparently).
Booting a command prompt through the Vista DVD would probably normally be a good
option - but I wouldn't have been able to address the >1.1TB part of the drive
without loading the new SATA controller driver. It could most likely be done but
I just wanted to get my data back ASAP, and I didn't think of this at the time.
If my replacement drive goes the same fate I may be trying this method, however.

The most ridiculous thing about this was that I managed to check the S.M.A.R.T.
values for the drive whilst I was copying my data from it. And NONE of the
values were below their thresholds! It had been through so much clicking at the
point, I was expecting something bad, but nope.
