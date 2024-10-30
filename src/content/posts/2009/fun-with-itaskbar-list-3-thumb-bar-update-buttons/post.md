---
title: "Fun with ITaskbarList3::ThumbBarUpdateButtons"
slug: fun-with-itaskbar-list-3-thumb-bar-update-buttons
date: 2009-08-03T21:38:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-302
excerpt: |-
  This issue just cropped up:

  -We are in function A (a callback function)
  -We call ITaskbarList3::ThumbBarUpdateButtons
  -It calls SendMessageTimeout with the SMTO_NORMAL flag and not SMTO_BLOCK
  -Another instance of our process does a SendMessage to the first instance (for
  command line processing in this case)
  -That results in function B being called. But its not legal to call function B
  within function A!!

  We end up with a boom of kinds.

  The end result is that I will have to make all calls to
  I
---

This issue just cropped up:

- We are in function A (a callback function)
- We call ITaskbarList3::ThumbBarUpdateButtons
- It calls SendMessageTimeout with the SMTO_NORMAL flag and not SMTO_BLOCK
- Another instance of our process does a SendMessage to the first instance (for
  command line processing in this case)
- That results in function B being called. But its not legal to call function B
  within function A!!

We end up with a boom of kinds.

The end result is that I will have to make all calls to
ITaskbarList3::ThumbBarUpdateButtons from a custom message posted by
PostMessage - because in any other case it can open up holes I don't want (even
if they are rare holes....)

**Update:** As far as I can see, Shell_NotifyIcon does use the SMTO_BLOCK flag.
So why ThumbBarUpdateButtons doesn't I don't know..
