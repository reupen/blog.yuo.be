---
title: "What do all the recent NTDDI_VERSION values mean?"
date: 2025-02-12
tags:
  - win32
excerpt: |-
  The answer isn’t always straightforward, as it turns out.
---

If you’ve looked through semi-recent Windows SDK headers, you might’ve noticed
preprocessor directives such as this:

```c
#if (NTDDI_VERSION >= NTDDI_WIN10_CU)
```

But what does `NTDDI_WIN10_CU` mean in this context? Google isn’t much help, and
[Microsoft’s own documentation](https://learn.microsoft.com/en-gb/windows/win32/winprog/using-the-windows-headers#macros-for-conditional-declarations)
is conspicuously missing these more recent macros:

- `NTDDI_WIN10_VB`
- `NTDDI_WIN10_MN`
- `NTDDI_WIN10_FE`
- `NTDDI_WIN10_CO`
- `NTDDI_WIN10_NI`
- `NTDDI_WIN10_CU`
- `NTDDI_WIN11_ZN`
- `NTDDI_WIN11_GA`
- `NTDDI_WIN11_GE`

You may recognise some of those suffixes as chemical elements. And, in fact,
they all are apart from `VB`. (`VB` is apparently
[Vibranium](https://en.wikipedia.org/wiki/Vibranium), used as a substitute for
chromium to avoid confusion.[^1])

What Windows version those chemical elements relate to can be found from
[a list of Windows code names on Wikipedia](https://en.wikipedia.org/wiki/List_of_Microsoft_codenames#Windows_platform_engineering_milestones)
(as well as from other sources). (Note that some of the chemical elements don’t
refer to stable versions of Windows.)

If you want to know what Windows 10 or 11 version a function, interface or
similar became available in, however, trying to go off the `NTDDI_VERSION`
preprocessor directive used doesn’t always give you the correct answer in my
experience – I’ve found that the relevant bit of documentation on
[learn.microsoft.com](https://learn.microsoft.com) is usually a better
guide[^2].

(On that last point, `dwrite_3.h` currently contains this gem:

```c
#if NTDDI_VERSION >= NTDDI_WIN10_CU // TODO - set correct DDI version
```

)

[^1]:
    [List of Microsoft codenames – Wikipedia](https://en.wikipedia.org/wiki/List_of_Microsoft_codenames#Windows_platform_engineering_milestones)

[^2]:
    When the documentation is actually available. Some newer DirectWrite
    interfaces are only documented for DWriteCore, for some reason.
