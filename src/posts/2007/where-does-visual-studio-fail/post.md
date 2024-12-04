---
title: "Where does Visual Studio fail?"
slug: where-does-visual-studio-fail
date: 2007-10-13T22:16:00.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-341
excerpt: |-
  When you create a new Win32 project in Visual C++ 2005, you get a message loop
  that looks like this:

  // Main message loop:
  while (GetMessage(&msg, NULL, 0, 0))
  {
      if (!TranslateAccelerator(msg.hwnd, hAccelTable, &msg))
      {
          TranslateMessage(&msg);
          DispatchMessage(&msg);
      }
  }


  So what's wrong with that? Probably the fact that the MSDN documentation for
  GetMessage [http://msdn2.microsoft.com/en-us/library/ms644936.aspx]specifically
  says not to write code that looks like th
---

When you create a new Win32 project in Visual C++ 2005, you get a message loop
that looks like this:

```cpp
// Main message loop:
while (GetMessage(&msg, NULL, 0, 0))
{
    if (!TranslateAccelerator(msg.hwnd, hAccelTable, &msg))
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
}
```

So what's wrong with that? Probably the fact that the
[MSDN documentation for GetMessage ](http://msdn2.microsoft.com/en-us/library/ms644936.aspx)specifically
says not to write code that looks like that! This is what it does say:

> **Warning**
>
> Because the return value can be nonzero, zero, or -1, avoid code like this:
>
> ```cpp
> while (GetMessage( lpMsg, hWnd, 0, 0)) ...
> ```
>
> The possibility of a -1 return value means that such code can lead to fatal
> application errors. Instead, use code like this:
>
> ```cpp
> BOOL bRet;
>
> while( (bRet = GetMessage( &msg, hWnd, 0, 0 )) != 0)
> {
>  if (bRet == -1)
>  {
>      // handle the error and possibly exit
>  }
>  else
>  {
>      TranslateMessage(&msg);
>      DispatchMessage(&msg);
>  }
> }
> ```

Perhaps it doesn't make much difference in actuality, but you would have thought
they would at least make the code in their template consistent with their own
documentation (which comes with Visual Studio in the MSDN library, I might
add..)
