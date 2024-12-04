---
title: "Shortcut menu, or context menu?"
slug: shortcut-menu-vs-context-menu
date: 2016-06-13T21:04:14.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-371
excerpt: |-
  When the Windows Vista UX guidelines were released, I distinctly remember it
  calling right-click menus shortcut menus. So, I’ve always stuck with that on the
  assumption it was the preferred nomenclature.

  Recently, though, I noticed that Microsoft had starting referring to them as
  ‘context menus’ rather than ‘shortcut menus’. Perturbed, I set about
  investigating. I quickly found that the current UX guidelines indeed say to call
  it a context menu, and not a shortcut menu. But, I remained convince
---

When the Windows Vista UX guidelines were released, I distinctly remember it
calling right-click menus shortcut menus. So, I’ve always stuck with that on the
assumption it was the preferred nomenclature.

Recently, though, I noticed that Microsoft had starting referring to them as
‘context menus’ rather than ‘shortcut menus’. Perturbed, I set about
investigating. I quickly found that the current UX guidelines indeed say to call
it a context menu, and not a shortcut menu. But, I remained convinced that it
previously did not say that.

The Internet Archive Wayback Machine is perfect for situations like this. The
history of the context menu article on Wikipedia also proved useful for getting
the URL of the MSDN UX guidelines menu page as of a few years ago.

I soon found that,
[in May 2008](https://web.archive.org/web/20080506103725/http://msdn.microsoft.com/en-us/library/aa511502.aspx#documentation),
the UX guidelines did indeed refer to right-click menus as shortcut menus. It in
fact contained the statement:

> Refer to shortcut menus as shortcut menus in user documentation. Refer to them
> as context menus only in programming and other technical documentation.

However,
[in December 2008](https://web.archive.org/web/20081220003042/http://msdn.microsoft.com/en-us/library/aa511502.aspx#documentation),
all instances of shortcut menu were replaced with context menu, in a somewhat
slapdash manner. The same statement became:

> Refer to context menus as context menus in user documentation. Refer to them
> as context menus only in programming and other technical documentation.

And then
[in the July 2009 snapshot](https://web.archive.org/web/20090721080413/http://msdn.microsoft.com/en-us/library/aa511502.aspx#documentation),
we see that the same statement has been corrected:

> Refer to context menus as context menus, not shortcut menus.

And, that
[remains the case today](https://msdn.microsoft.com/en-us/windows/desktop/dn742392.aspx#documentation)
\[[archive](http://archive.is/6aB3u)].

The somewhat ironic thing is that most of the technical documentation I looked
at prefers shortcut menu.

From
[the WM_CONTEXTMENU documentation](<https://msdn.microsoft.com/en-gb/library/windows/desktop/ms647592(v=vs.85).aspx>)
\[[archive](https://archive.is/oDNbC)]:

> A window can process this message by displaying a shortcut menu using the
> TrackPopupMenu or TrackPopupMenuEx functions. To obtain the horizontal and
> vertical positions, use the following code.

From
[the TrackPopupMenuEx docs](https://msdn.microsoft.com/en-gb/library/windows/desktop/ms648003%28v=vs.85%29.aspx)
\[[archive](http://archive.is/i7K3N)]:

> Displays a shortcut menu at the specified location and tracks the selection of
> items on the shortcut menu. The shortcut menu can appear anywhere on the
> screen.

And there's loads
[here](<https://msdn.microsoft.com/en-us/library/windows/desktop/cc144169(v=vs.85).aspx>)
\[[archive](http://archive.is/CL40f)].

Maybe I'm just looking at the old stuff. It was certainly current in December
2008, though.
