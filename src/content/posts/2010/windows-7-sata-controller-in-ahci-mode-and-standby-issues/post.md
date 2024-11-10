---
title: "Windows 7: SATA controller in AHCI mode and standby issues"
slug: windows-7-sata-controller-in-ahci-mode-and-standby-issues
date: 2010-01-20T20:30:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-294
excerpt: |-
  I recently decided to switch my SATA controller into AHCI mode. With this
  information that was easy enough.

  What followed though were "BSODs"/stop errors, mainly on resuming from standby.
  Sadly, minidumps weren't created for these - but the errors were either
  KERNEL_STACK_INPAGE_ERROR or KERNEL_DATA_INPAGE_ERROR (I didn't note which).
  Additionally, some applications crashed when resuming from standby with
  exception code C0000006 (STATUS_IN_PAGE_ERROR).
---

I recently decided to switch my SATA controller into AHCI mode. With
[this](http://support.microsoft.com/kb/922976) information that was easy enough.

What followed though were "BSODs"/stop errors, mainly on resuming from standby.
Sadly, minidumps weren't created for these - but the errors were either
KERNEL_STACK_INPAGE_ERROR or KERNEL_DATA_INPAGE_ERROR (I didn't note which).
Additionally, some applications crashed when resuming from standby with
exception code C0000006 (STATUS_IN_PAGE_ERROR).

The problem apparently was
[KB977178 - "You receive various Stop error messages in Windows 7 or in Windows Server 2008 R2 when you try to resume a computer that has a large SATA hard disk"](http://support.microsoft.com/kb/977178).
I noted that it only appears to update the Microsoft AHCI driver.

I have a large page file on another large non-system drive (and a small one on
my system drive), so it fits the problem description (no access to the large
page file until the drive spun up causing the errors). Indeed, after installing
the hot fix the problem stopped.

So, just a hint in case anyone else runs into the same unfortunate issue..
