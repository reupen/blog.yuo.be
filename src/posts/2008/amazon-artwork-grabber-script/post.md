---
title: "Amazon artwork grabber script"
slug: amazon-artwork-grabber-script
date: 2008-03-07T17:32:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-335
excerpt: |-
  If you're like me and you like storing all your album art in a single folder I
  made a quick and dirty Windows Powershell script that automatically grabs
  artwork from Amazon for all tracks in your foobar2000 Media Library (using
  foo_comserver2). It works pretty well for me, I only got one wrong artwork that
  was due to tagging issues, but this will probably vary depending on what is in
  your media library.

  You'll need to modify the script a bit for your own needs. You'll need to set
  $AWSAccessKeyI
---

If you're like me and you like storing all your album art in a single folder I
made a quick and dirty Windows Powershell script that automatically grabs
artwork from Amazon for all tracks in your foobar2000 Media Library (using
foo_comserver2). It works pretty well for me, I only got one wrong artwork that
was due to tagging issues, but this will probably vary depending on what is in
your media library.

You'll need to modify the script a bit for your own needs. You'll need to set
$AWSAccessKeyId (you either find one from e.g. some other software or failing
that register at Amazon yourself).

I would have made it a proper Powershell script but I was put off by the
restrictions in place by default on executing those so you'll just have to copy
and paste it to the prompt and press enter a couple times if needed.

Update: Script moved [here](http://yuo.be/wiki/misc:powershell).
