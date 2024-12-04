---
title: "The bug that bites me"
slug: the-bug-that-bites-me
date: 2016-05-20T12:13:28.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-368
tags:
  - Ubuntu
  - EC2
excerpt: |-
  I briefly mentioned [https://blog.yuo.be/2016/01/01/a-change-of-web-host/] that, at
  the end of last year, I moved my website to Amazon's Elastic Compute Cloud
  (EC2). I picked Ubuntu as my OS, initially using an official Ubuntu 15.10 (Wily
  Werewolf) AMI [https://cloud-images.ubuntu.com/locator/ec2/], and recently
  upgrading to 16.04 LTS (Xenial Xerus).

  Unfortunately, I soon ran into a problem – my wiki suddenly became really slow.
  Running a few commands on the server revealed that kswapd0 was stu
---

I briefly [mentioned](/2016/01/01/a-change-of-web-host/) that, at the end of
last year, I moved my website to Amazon's Elastic Compute Cloud (EC2). I picked
Ubuntu as my OS, initially using an
[official Ubuntu 15.10 (Wily Werewolf) AMI](https://cloud-images.ubuntu.com/locator/ec2/),
and recently upgrading to 16.04 LTS (Xenial Xerus).

Unfortunately, I soon ran into a problem – my wiki suddenly became really slow.
Running a few commands on the server revealed that kswapd0 was stuck at 100%
CPU. Not sure what was going on, I rebooted the server (which also took a
while). When it came back up, everything was fine.

‘Fine’, I thought. Until the same symptoms arose again a few weeks later. At
this point I thought I was doing something wrong. Something fairly basic. But, a
few web searches led me to
[a thread on the Amazon Web Services (AWS) forums](https://forums.aws.amazon.com/thread.jspa?threadID=222223),
and then the following bug report on the Ubuntu bug tracker:

https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1518457

The reporter of the bug had a very similar environment to me: Ubuntu 15.10 on an
EC2 t2.micro instance. In fact, most of the other comments in the bug report are
from people on EC2 (though there are some that aren't).

At that time, someone was bisecting the kernel, so all seemed in hand.
Fast-forward another five months and there appears to be no resolution in sight.
Hard to believe that to be the case for what can't be described as a minor bug.
(It was at least tracked down to have been revealed by a configuration change
that enabled memory hot adds for Xen virtual machines, but that’s not the
underlying cause, though does provide the workaround of disabling hot adds.)

I actually _haven't_ seen this so far since upgrading to Ubuntu 16.04, but that
may well be related to the lower memory usage of the PHP 7.0 used for my wiki
(compared to PHP 5) and the fact there is nothing too demanding going on on the
server. There are reports coming in of it happening on 16.04, so I fully expect
to hit it again at some point (unless it gets fixed first!)

**Update – 25 May 2016**

I obviously spoke too soon. Just got hit by it on Ubuntu 16.04 while upgrading
this very blog. Perhaps it's time to apply the configuration workaround.
