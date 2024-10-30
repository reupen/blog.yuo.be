---
title: "A Win32 tree view scrolling oddity"
slug: a-new-win32-tree-view-oddity
date: 2023-08-26T23:00:34.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-64ea3e2454598e1f167b0f54
tags:
  - Windows
excerpt: |-
  It turns out the Win32 tree view control has a novel way of selecting items. If you hold down Shift and scroll your mouse wheel up (but not down!) it will select the item underneath the pointer.


  This even works in the Windows 10 File Explorer. Hover over the text of an item in the left-hand pane (so the hand pointer appears), hold Shift and scroll the mouse wheel up. The folder will be opened.


  There may be some method to this madness. If you instead hover over the expand or collapse icon for
---

It turns out the Win32 tree view control has a novel way of selecting items. If
you hold down Shift and scroll your mouse wheel up (but not down!) it will
select the item underneath the pointer.

This even works in the Windows 10 File Explorer. Hover over the text of an item
in the left-hand pane (so the hand pointer appears), hold Shift and scroll the
mouse wheel up. The folder will be opened.

There may be some method to this madness. If you instead hover over the expand
or collapse icon for an item, scrolling the mouse wheel down will collapse the
item, and scrolling the mouse wheel up will expand it (which is backwards if you
ask me, but never mind).

The behaviour is present in Windows 7 (as long as the tree view is focused or
otherwise receiving mouse wheel messages), so it’s been there for a while. (Of
course, none of this works on the new Windows App SDK-based File Explorer
rolling out for Windows 11, but it still works in the Registry Editor there.)
