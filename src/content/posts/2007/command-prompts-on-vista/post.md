---
title: "Command Prompts on Vista"
slug: command-prompts-on-vista
date: 2007-08-23T23:13:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-346
excerpt: |-
  I learnt of a neat trick on Vista through another blog
  [http://blogs.msdn.com/oldnewthing/archive/2007/08/22/4500831.aspx] - if you
  hold down shift whilst right clicking on a folder on Vista you get an extra
  entry: "Open Command Window Here" (in general you get some extra entries, folder
  or file). Very useful - previously on XP I had to install a PowerToy (as I
  remember?) to get this in the context menu.

  It does lead me in to a bit of a rant though. When you have UAC enabled,
  sometimes you need
---

I learnt of a neat trick on Vista through
[another blog](http://blogs.msdn.com/oldnewthing/archive/2007/08/22/4500831.aspx) -
if you hold down shift whilst right clicking on a folder on Vista you get an
extra entry: "Open Command Window Here" (in general you get some extra entries,
folder or file). Very useful - previously on XP I had to install a PowerToy (as
I remember?) to get this in the context menu.

It does lead me in to a bit of a rant though. When you have UAC enabled,
sometimes you need to use elevated command prompts which start in a particular
directory. This was the case for myself one day, I wanted a reusable shortcut
for this so I created a new shortcut to cmd.exe and changed the "Start In"
directory. Opening it showed the expected behaviour - it started in the chosen
folder. Now to run it as administrator (using the context menu option).
Failure - it starts in "C:\Windows\system32" for some reason. Possibly because
it's the location of consent.exe, I don't know, but it's not the most intuitive
behaviour.
