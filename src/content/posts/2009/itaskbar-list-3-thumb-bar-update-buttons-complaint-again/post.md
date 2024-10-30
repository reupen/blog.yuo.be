---
title: "ITaskbarList3::ThumbBarUpdateButtons complaint again"
slug: itaskbar-list-3-thumb-bar-update-buttons-complaint-again
date: 2009-11-29T22:08:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-299
excerpt: |-
  I'm going to complain about it again. I recently saw a crash log where the user
  had right-clicked on our application's notification area icon around the same
  time as my call to ThumbBarUpdateButtons - the result was a modal TrackPopupMenu
  call within the ThumbBarUpdateButtons call.. !!

  What a complete mess - so make sure you only call ThumbBarUpdateButtons from a
  posted message/equivale
---

I'm going to complain about it again
([first time](http://whyiseverytitletaken.blogspot.com/2009/08/fun-with-itaskbarlist3thumbbarupdatebut.html)).
I recently saw a crash log where the user had right-clicked on our application's
notification area icon around the same time as my call to
ThumbBarUpdateButtons - the result was a modal TrackPopupMenu call within the
ThumbBarUpdateButtons call.. !!

What a complete mess - so make sure you only call ThumbBarUpdateButtons from a
posted message/equivalent specifically for that purpose (at least in Windows 7
RTM). Unless you like strange (though rare) crashes, and the possibility thumb
buttons being in the wrong state..
