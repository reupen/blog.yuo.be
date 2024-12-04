---
title: "People's failures at using COM"
slug: peoples-failures-at-using-com
date: 2010-01-13T19:29:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-296
excerpt: |-
  What does MSDN say about the ppvObject parameter in IUnknown::QueryInterface?

  > ppvObject [out]

  The address of a pointer variable that receives the interface pointer requested
  in the riid parameter. Upon successful return, *ppvObject contains the requested
  interface pointer to the object. If the object does not support the interface,
  *ppvObject is set to NULL.


  I made the relevant bit a bit more prominent.

  We now have the following code, written by X:

  #define COM_QI_BEGIN() HRESULT STDMETHO
---

What does MSDN say about the **_ppvObject_** parameter in
IUnknown::QueryInterface?

> _ppvObject_ \[out]
>
> The address of a pointer variable that receives the interface pointer
> requested in the riid parameter. Upon successful return, \*ppvObject contains
> the requested interface pointer to the object. **If the object does not
> support the interface, \*ppvObject is set to NULL.**

I made the relevant bit a bit more prominent.

We now have the following code, written by X:

```cpp
#define COM_QI_BEGIN() HRESULT STDMETHODCALLTYPE QueryInterface(REFIID iid,void ** ppvObject) { if (ppvObject == NULL) return E_INVALIDARG;
#define COM_QI_ENTRY(IWhat) { if (iid == IID_##IWhat) {IWhat * temp = this; temp->AddRef(); * ppvObject = temp; return S_OK;} }
#define COM_QI_END() return E_NOINTERFACE; }

COM_QI_BEGIN()
COM_QI_ENTRY(IUnknown)
COM_QI_ENTRY(IDataObject)
COM_QI_END()
```

This expands to:

```cpp
HRESULT STDMETHODCALLTYPE QueryInterface(REFIID iid,void ** ppvObject)
{
    if (ppvObject == NULL) return E_INVALIDARG;
    { if (iid == IID_IUnknown) {IUnknown * temp = this; temp->AddRef(); * ppvObject = temp; return S_OK;} }
    { if (iid == IID_IDataObject) {IDataObject * temp = this; temp->AddRef(); * ppvObject = temp; return S_OK;} }
    return E_NOINTERFACE;
}
```

Does that look like it sets _**\*ppvObject**_ to NULL on failure?

More on the general subject
[here](https://web.archive.org/web/20100104230327/http://blogs.msdn.com/oldnewthing/archive/2009/12/31/9942465.aspx).
