---
title: "Computer woes continued"
slug: computer-woes-continued
date: 2008-11-03T18:24:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-327
excerpt: |-
  It seems my suspicions of the nVidia SATA controller driver being bugged were
  in
  fact correct
  [http://seagate.custhelp.com/cgi-bin/seagate.cfg/php/enduser/std_adp.php?p_faqid=5344&p_created=1219870913&p_sid=k88Y1-hj&p_accessibility=0&p_redirect=&p_lva=&p_li=&p_topview=1]
  . So if you are using the Seagate ST31500341AS or another affected drive (one
  with enough sectors) on an nVidia chipset, make sure you have the latest SATA
  controller driver. (It may have been designed like that rather than bein
---

[It seems my suspicions of the nVidia SATA controller driver being bugged were in fact correct](http://seagate.custhelp.com/cgi-bin/seagate.cfg/php/enduser/std_adp.php?p_faqid=5344&p_created=1219870913&p_sid=k88Y1-hj&p_accessibility=0&p_redirect=&p_lva=&p_li=&p_topview=1).
So if you are using the Seagate ST31500341AS or another affected drive (one with
enough sectors) on an nVidia chipset, make sure you have the latest SATA
controller driver. (It may have been designed like that rather than being a bug,
but then it is poor design instead anyway).

As it turns out, it seems my hard drive has let me down afterall. Since today,
shortly after logging in to Windows the drive stops responding (well, any app
attempting to access the drive does) and emits a continous ticking sound. Nasty.
The drive is only two weeks old :/ And, it passes the drive short self test in
SeaTools (!) All seems very odd. There are a few similar reports in the reviews
on NewEgg, and I've read a few reports that said Seagate themselves have said
the SD17 firmware has issues. But the drive was working great up until now so I
don't know, I've reluctantly gone for a replacement, so we will see what
happens. Some more googling reveals there is in fact a new SD37 firmware. For
now, I need to try and get my data off the thing :/
