---
title: "Kaspersky vs Visual Studio and the rest of my computer"
slug: kaspersky-vs-visual-studio-and-the-rest-of-my-computer
date: 2009-04-19T21:13:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-312
excerpt: |-
  I thought I would try Kaspersky Internet Security 2009, since someone else in
  this household uses a certain bank gives out free licences.

  I did face some issues though:
   * I only wanted the anti-virus part of it: not the firewall and other bits. Of
     course the options in the installer are so obtuse, it became a game of trial
     and error.
   * It refused to install with Spybot Search & Destroy installed - well actually,
     it said it would be automatically uninstalled if you continued. That is
---

I thought I would try Kaspersky Internet Security 2009, since someone else in
this household uses a certain bank gives out free licences.

I did face some issues though:

- I only wanted the anti-virus part of it: not the firewall and other bits. Of
  course the options in the installer are so obtuse, it became a game of trial
  and error.
- It refused to install with Spybot Search & Destroy installed - well actually,
  it said it would be automatically uninstalled if you continued. That is
  despite the fact I didn't have any of the real-time scanning features of
  Spybot enabled.
- After installing Kaspersky, I noticed that in the Windows Vista Network &
  Discovery Center, network discovery was set to 'Custom' and couldn't be turned
  on. A little bit of digging around, I found out this is because Kaspersky
  takes it upon itself to disable the DNS Client service.
- The next problem was that I was getting build errors in Visual Studio. I have
  VS set to generate .cod listing files for my projects, and it was randomly
  giving access denied errors on those. Disabling the real-time protection
  sorted that problem: it seems hard to believe modern anti-virus software has
  this kind of problem, who would want real-time AV protection if it randomly
  breaks your applications?
- I then found out that it took it upon itself to break
  [Internet Explorer 64-bit](http://www.neowin.net/forum/index.php?showtopic=749242).
- Finally, sometime later I realised that Autoplay/Autorun had stopped working
  for all types of media (USB flash drives, CDs, ...). I didn't link this to
  Kaspersky initially, but after some (virtual) digging it seems like it had
  something to do with it. If you are wondering, the fix was to sort out the
  NoDriveTypeAutoRunregistry key (which had been set to 0xFF) described in this
  [Microsoft KB article](http://support.microsoft.com/kb/967715/) in the "How to
  selectively disable specific Autorun features" section. I think this was
  followed by a log-off & on (or otherwise maybe a reboot).

Not to worry - even if it was a journey of fun, it didn't cost me anything.
