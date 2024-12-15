---
title: "Getting Windows 11 24H2 to install"
slug: getting-windows-11-24h2-to-install
date: 2024-12-15
tags:
  - windows
excerpt: |-
  Error 0xC1900101-0x40017, you say?
---

I updated my laptop to Windows 11 24H2 without problem (albeit using the
[Windows 11 Installation Assistant](https://www.microsoft.com/en-gb/software-download/windows11),
as Windows Update wasn’t offering it).

It was a different story on my desktop, however. Whether the update was
attempted through Windows Update or Installation Assistant, the installation
would get relatively far along and then fail and roll back.

The failure would occur after rebooting, just after when progress reaches 66%.
Windows would then reboot again (I get the impression this reboot was not
intended). Just as the installation resumes, my PC would shut down and reboot
again. That would repeat once more, and then the installation would start
rolling back.

(None of those last three reboots sounded healthy: my PC would click, and my
speakers would emit a thud.)

When the installation was attempted through Windows Update, it would report
error `0xc1900101`. I ran
[SetupDiag](https://learn.microsoft.com/en-gb/windows/deployment/upgrade/setupdiag)
to try and get more detail about the failure. It reported the following:

```
Error: 0xc1900101-0x40017 SetupDiag reports rollback failure found.
Last Phase = Post First Boot
Last Operation = Ensure suspended services are stopped
Error = 0xC1900101-0x40017
```

(Incidentally, SetupDiag refused to do anything unless I provided the `/Verbose`
argument.)

Sadly, while SetupDiag gave me a better error code, it didn’t tell me anything I
could act on, and I only found red herrings in the logs.

Nonetheless, I spent some time fiddling around uninstalling old drivers using
[DriverStoreExplorer](https://github.com/lostindark/DriverStoreExplorer),
getting rid of some VMWare virtual network adaptors, and trying other vague
things I found suggested online. None of those helped.

Today, though, I did two new things:

- disabled a bunch of old, unneeded drivers using
  [Autoruns](https://learn.microsoft.com/en-gb/sysinternals/downloads/autoruns)
- fixed a problem with a network card I had installed
  [not having Secure Boot-compliant firmware](/2021/03/19/official-asus-xg-c100c-firmware-update-available/#15-december-2024-update)

After doing those things, I tried the installation again. It finally completed
without problem. (I didn’t watch the whole process, but it also seemed to
complete more quickly after rebooting as well.)

I’m more inclined to believe it was a driver causing the installation failure
(rather than the Secure Boot compliance problem). I won’t know which specific
driver it was now, but at least this post gives anyone else encountering the
same error some additional things to check and try.
