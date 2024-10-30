---
title: "Migrating a Windows 10 installation from MBR to GPT/UEFI"
slug: migrating-a-windows-10-installation-from-mbr-to-gpt-uefi
date: 2016-01-17T21:46:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-278
excerpt: |-
  I recently updated to Windows 10 on a Z170-based motherboard, but my Windows
  installation was an MBR-based one rather than a modern UEFI one. I wanted to
  switch to a UEFI installation for the marginally fast boot time – without losing
  data during the switch – but most of the information online about doing that
  involved either purchasing software to do it or dubious use of command-line
  utilities.

  Somewhere, though, I came across the strategy of backing up the current Windows
  installation, making
---

I recently updated to Windows 10 on a Z170-based motherboard, but my Windows
installation was an MBR-based one rather than a modern UEFI one. I wanted to
switch to a UEFI installation for the marginally fast boot time – without losing
data during the switch – but most of the information online about doing that
involved either purchasing software to do it or dubious use of command-line
utilities.

Somewhere, though, I came across the strategy of backing up the current Windows
installation, making a clean one in UEFI mode in order to create the relevant
boot partitions etc., and then restoring the Windows partition from the backup.
I was upgrading my system drive to a larger SSD so it seemed like a good time to
give it a go. And indeed, it worked fine, so I thought I'd document the steps I
followed here in case it helps anyone else.

The process requires some spare space on another drive in order to save an image
of your system drive. Naturally, if you follow these steps and something goes
wrong, I don't take any responsibility – it goes without saying that you should
make doubly-sure you have everything backed up.

The steps are roughly as follows:

1. [Download the Windows 10 Media Creation Tool.](https://www.microsoft.com/en-gb/software-download/windows10)
2. Use the tool to create a Windows 10 installation image on either a flash
   drive or a DVD. I used a flash drive.
3. Back up your system drive using drive imaging software.
   [Macrium Reflect](http://www.macrium.com/reflectfree.aspx) (free) should do,
   but I used the bootable version of Acronis True Image 2016 (not free) as I
   already had it. The software you use should allow you to selectively restore
   partitions from the backup to a partition of a GPT drive. If you are not
   using a bootable version of the imaging software, then it also needs to be
   able to restore backups to the system drive. Make sure you validate your
   backup to make sure there is nothing wrong with it.
4. At this point, I installed Windows 10 in UEFI mode to my new disk drive. It
   took minutes to install to a decent SSD from a decent USB 3.0 flash drive
   (surprisingly fast when compared to how long the upgrade from Windows 7 to 10
   took). I disconnected all the other drives in my PC out of an abundance of
   caution. To install Windows in UEFI mode you need to boot from the Windows 10
   installation media in UEFI mode. For me this was achieved by pressing F8 when
   on my BIOS splash screen and then selecting the entry for my flash drive that
   was prefixed with UEFI. If you're reusing your existing drive for the UEFI
   installation, you will need to delete all the partitions on it. You should be
   able to do this in Windows 10 setup, but I haven't tried that.
5. When prompted for a product key, select the option saying you don't have one,
   and then select the relevant Windows edition.
6. A couple of screens later, you'll need to select your disk drive and create a
   partition. If you booted the installer in UEFI mode correctly, another three
   partitions (recovery/system/MSR) should be automatically created when you
   create the one to install Windows to, leaving you with four in total. If that
   doesn't happen, you might not have booted in UEFI mode.
7. You can click through the remaining setup options – they don't matter much as
   we are just going to overwrite the Windows installation.
8. Once installation is complete, you need to restore the Windows partition from
   your backup to your drive using your drive imaging software. You need to only
   overwrite the current Windows partition with the one from the backup – take
   care not to restore the whole disk which will wipe your GPT layout.
9. Reboot and if everything worked as planned your old Windows installation
   should be back!
10. You should now be able to disable CSM in your BIOS, which should reduce POST
    time a bit.

Hopefully that helps someone else – doing this and disabling CSM did indeed make
a reasonable improvement to my boot times.
