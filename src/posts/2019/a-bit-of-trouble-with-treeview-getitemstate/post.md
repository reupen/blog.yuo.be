---
title: "A bit of trouble with TreeView_GetItemState"
slug: a-bit-of-trouble-with-treeview-getitemstate
date: 2019-03-03T20:58:52.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-5c49b13a82a70122297abfc0
tags:
  - Win32
  - C++
excerpt: |-
  Recently, I had a bit of trouble with TreeView_GetItemState
  [https://docs.microsoft.com/en-gb/windows/desktop/api/Commctrl/nf-commctrl-treeview_getitemstate]
   [archive [http://archive.is/xGy7o]] and TVM_GETITEMSTATE
  [https://docs.microsoft.com/en-gb/windows/desktop/Controls/tvm-getitemstate]
  [archive [http://archive.is/uyz5j]].

  The TreeView_GetItemState macro is a simple convenience wrapper around the
  TVM_GETITEMSTATE message. Hence, they should do the same thing: retrieve certain
  state value
---

Recently, I had a bit of trouble with
[TreeView_GetItemState](https://docs.microsoft.com/en-gb/windows/desktop/api/Commctrl/nf-commctrl-treeview_getitemstate)
[\[archive](http://archive.is/xGy7o)] and
[TVM_GETITEMSTATE](https://docs.microsoft.com/en-gb/windows/desktop/Controls/tvm-getitemstate)
[\[archive](http://archive.is/uyz5j)].

The TreeView_GetItemState macro is a simple convenience wrapper around the
TVM_GETITEMSTATE message. Hence, they should do the same thing: retrieve certain
state values for a tree-view item.

However, the documentation for TreeView_GetItemState (and all other tree-view
macros I checked) curiously states:

> **Return Value**\
> \
> None

Clearly, that cannot be correct, as the state is not returned via the macro
arguments either. One would expect the return value of the macro to be the same
as the return value of the message, so let’s have a look at the documentation
for TVM_GETITEMSTATE instead.

That one states:

> **Return value**\
> \
> Returns a **UINT** value with the appropriate state bits set to **TRUE**. Only
> those bits that are specified by **lParam** and that are **TRUE** will be set.
> This value is equivalent to the **state** member of
> [**TVITEMEX**](https://archive.is/o/uyz5j/https://docs.microsoft.com/en-us/windows/desktop/api/Commctrl/ns-commctrl-tagtvitemexa).

I took that to mean that bits not specified in lParam will not be set (I’m not
sure how else it could be interpreted). However, in reality, it does set bits
that aren’t specified by lParam (in some cases, at least).

If you manage to find an old copy of the docs for the TreeView_GetItemState
macro on MSDN, you’ll find they say:

> Returns a **UINT** value that is equivalent to the state member of
> [**TVITEMEX**](<https://msdn.microsoft.com/en-us/ie/bb773459(v=vs.100)>). The
> state bits that are both true and were specified in **stateMask** will be set.

The equivocality of that statement at least means that it’s not false (as it
makes no guarantee about the bits not requested in the macro arguments).

If you don’t want unrequested bits to be set, discard the bits of the return
value that you aren’t interested in. That’s as simple as:

```
const auto state = TreeView_GetItemState(wnd, item, mask) & mask
```

(I did attempt to report the problems with the documentation for both the macro
and the message via the ‘Is this page helpful?’ link at the bottom of the
respective pages but, alas, that was some time ago, and both pages currently
remain unchanged...)
