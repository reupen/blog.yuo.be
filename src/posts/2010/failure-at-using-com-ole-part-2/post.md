---
title: "Failure at using COM/OLE: Part 2"
slug: failure-at-using-com-ole-part-2
date: 2010-01-26T19:59:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-293
excerpt: |-
  Last time we just touched on a small issue, as a precursor to the important one.

  Consider an application that populates an STGMEDIUM structure as follows:

   * Sets tymed to TYMED_ISTREAM
   * Sets pstm to a pointer to an IStream object
   * Sets pUnkForRelease as a pointer to the IUnknown interface of the same
     IStream object
   * This IStream object has a reference count of 1.

  What's wrong? Let's read the documentation for ReleaseStgMedium
  [http://msdn.microsoft.com/en-us/library/ms693491%28VS.8
---

Last time we just touched on a small issue, as a precursor to the important one.

Consider an application that populates an STGMEDIUM structure as follows:

- Sets tymed to TYMED_ISTREAM
- Sets pstm to a pointer to an IStream object
- Sets pUnkForRelease as a pointer to the IUnknown interface of the same IStream
  object
- This IStream object has a reference count of 1.

What's wrong? Let's read the documentation for
**[ReleaseStgMedium](http://msdn.microsoft.com/en-us/library/ms693491%28VS.85%29.aspx):**

> **When the original provider of the medium is responsible for freeing the
> medium, the provider calls ReleaseStgMedium, specifying the medium and the
> appropriate IUnknown pointer as the punkForRelease structure member. Depending
> on the type of storage medium being freed, one of the following actions is
> taken, followed by a call to the IUnknown::Release method on the specified
> IUnknown pointer.**
>
> |               |     |     |     |     |     |     |                         |
> | ------------- | --- | --- | --- | --- | --- | --- | ----------------------- |
> | Medium        |     |     |     |     |     |     | ReleaseStgMedium Action |
> | TYMED_ISTREAM |     |     |     |     |     |     | Calls IStream::Release. |

**_(My emphasis, irrelevant parts of table omitted)_**

In other words, calling ReleaseStgMedium on that STGMEDIUM structure will end up
in the IStream object being released twice, and unsurprisingly things like to
blow up the second time.

Sad thing is it didn't really take much time to look up the problem - all of 30
seconds once I found out that freeing TYMED_ISTREAM STGMEDIUMs was the issue.
You'd better allocate more time for "convincing person X that the problem
exists".
