---
title: "Careful with SHAutoComplete"
slug: careful-with-shauto-complete
date: 2011-02-27T00:24:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-287
excerpt: |-
  If you call it with a NULL HWND, it will return E_INVALIDARG but leak six GDI
  handles (seen under Windows 7 SP1).

  Yes, you can blame the caller, but 'tis just something to note.
---

If you call it with a NULL HWND, it will return E_INVALIDARG but leak six GDI
handles (seen under Windows 7 SP1).

Yes, you can blame the caller, but ’tis just something to note.
