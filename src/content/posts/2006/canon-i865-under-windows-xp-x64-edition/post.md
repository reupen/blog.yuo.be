---
title: "Canon i865 under Windows XP x64 Edition?"
slug: canon-i865-under-windows-xp-x64-edition
date: 2006-10-06T19:26:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-363
excerpt: |-
  Yes, you can get the Canon i865 printer working on Windows XP x64 Edition with
  proper drivers :) It just takes some creative thinking... Here are the steps you
  can take to get this working.

   1. Download a build of Windows Vista x64 Edition. I used build 5728. Build 5600
      (RC1) is available here
      [http://download.windowsvista.com/dl/preview/rc1/en/x64/iso/vista_5600.16384.060829-2230_x64fre_client-lr1cxfre_en_dvd.iso]
      . Update: RC2 now available
      [http://download.windowsvista.com/d
---

Yes, you can get the Canon i865 printer working on Windows XP x64 Edition with
proper drivers :) It just takes some creative thinking... Here are the steps you
can take to get this working.

1. Download a build of Windows Vista x64 Edition. I used build 5728. Build 5600
   (RC1) is available
   [here](http://download.windowsvista.com/dl/preview/rc1/en/x64/iso/vista_5600.16384.060829-2230_x64fre_client-lr1cxfre_en_dvd.iso).
   Update:
   [RC2 now available](http://download.windowsvista.com/dl/preview/rc2/en/x64/iso/vista_5744.16384.061003-1945_x64fre_client-lrmcxfre_en_dvd.iso)!

2. Install it in VMware or Virtual PC under XP x64 using shared NAT networking.
   You can install it without a Product Key and it will work for a few days.
   Virtual PC and VMware server are both free to download. I used VMware, but be
   aware - you may have trouble installing this build on VMware. The solution
   for installing RC1 under VMware can be found
   [here](http://www.vmware.com/community/message.jspa?messageID=470950#470950).

3. Once Vista is up and running, open the control panel, enter classic view, and
   open the printers page. Choose Add new printer (on the top row), and select
   Local printer, on port LPT1. Now select the printer from the list
   (manufacturer: "Canon", printer: "Canon Inkjet i865"). Finally, set up the
   printer for sharing, by right clicking on it in the printers page, selecting
   "Sharing..." and tick "Share this printer".

4. You also need to set up Vista for sharing. For ease of use, from the Network
   and Sharing Center in Control Panel, its easier to turn off the "Password
   protected sharing". Make sure printer sharing is enabled too. It's also
   helpful if Vista and XP are both set on the same workgroup.

5. Next, from XP open Windows Explorer, access the Vista computer from the
   network. Right click on the printer and select "Connect..." This will install
   the printer driver locally on your XP installation. Note: Usually the Vista
   computer will be listed under "View workgroup computers" in My Network
   Places. If not, you can manually enter the name of the Vista computer in the
   form \VistaComputerName in Windows Explorer.

6. Lastly, you need to set up the printer in XP. Simply select the "Canon InkJet
   i865" driver from either the Add New Printer wizard, or the printer's
   properties page if the printer was already installed using another driver.

7. You can delete the Vista virtual machine now if you wish.

I should mention there is an easier method of using the Pixma iP4000 driver.
However, this has some disadvantages (no cartridge level monitoring etc.)

It's also not possible to just copy the driver from Vista in a more
straightforward manner, because it uses Vista's UniDrv.dll as well.

Happy printing!
