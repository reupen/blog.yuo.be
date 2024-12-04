---
title: "Columns UI can now be compiled using Clang"
slug: columns-ui-can-now-be-compiled-using-clang
date: 2016-05-11T20:54:34.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-367
tags:
  - C++
  - Columns UI
  - foobar2000
excerpt: |-
  After a fair bit of work, release builds of Columns UI can now be compiled with
  Clang[1] (and the builds produced seem to work 🙌).

  Clang attempts to be compatible with Visual C++
  [http://clang.llvm.org/docs/MSVCCompatibility.html] – in terms of ABI, some
  Microsoft language extensions and supporting the same compiler options (not all
  are implemented, though). It also integrates with Visual Studio and can be used
  from both the IDE and using MSBuild (by changing the project platform toolset to
  e.
---

After a fair bit of work, release builds of Columns UI can now be compiled with
Clang[^1] (and the builds produced _seem_ to work 🙌).

Clang
[attempts to be compatible with Visual C++](http://clang.llvm.org/docs/MSVCCompatibility.html)
– in terms of ABI, some Microsoft language extensions and supporting the same
compiler options (not all are implemented, though). It also integrates with
Visual Studio and can be used from both the IDE and using MSBuild (by changing
the project platform toolset to e.g. `LLVM-vs2014`).

The Columns UI code base would not compile as is, because Clang is far stricter
on C++ compliance. I encountered problems both in the foobar2000 SDK and in
Columns UI code.

The bulk of errors were due to:

**Visual C++ allowing rvalues to bind to non-const lvalues**

That often presented itself when working with the foobar2000 in code following
patterns like `pfc::string_formatter() << ... << ...` and
`console::formatter() << ... << ...`.

It also presented itself when temporary objects were used as function arguments
when the parameter type was an lvalue, e.g.
`run_v2(..., abort_callback_dummy());` (Here, the type of the last parameter is
`abort_callback&`.)

The fix I took in instances of this was just to use a non-temporary object:

```cpp
pfc::string_formatter formatter;
formatter << ... << ...;
```

This class of problem is actually logged by Visual C++ under
[warning C4239](https://msdn.microsoft.com/en-us/library/186yxbac.aspx), but you
have to use at least warning level 4 (/W4) or explicitly turn the warning on.
(Apparently,
[the default warning level is 1](https://msdn.microsoft.com/en-us/library/thxezb7y.aspx)...)

**Taking the address of rvalues**

Not dissimilar to the previous problem, this often cropped up in function
arguments with temporary objects:
`run(&titleformat_hook_impl_file_info(...), ...);`

This one appears to be
[warning C4238](https://msdn.microsoft.com/en-us/library/7zyb9yb4.aspx) in
Visual C++.

[These](https://github.com/reupen/foobar2000-sdk/commit/acfe19797c35f26154dcee3eb93b7de1d04bed3f)
are examples of some of the changes I made to the foobar2000 SDK to get it
compiling with Clang.

## What was the point of doing this?

I don’t intend to switch from the Visual C++ compiler for releases. However, the
Clang compiler revealed various code-related errors that were previously unknown
to me. This is partly due to it being better at picking up problematic code, and
partly due to better C++ compliance.

In general terms, I have more confidence in the code base, and reassurance that
it won't take too much effort to get it to work with new tools in the future.

## It only compiles in release configurations and using Clang 3.9.0 pre-release builds

Trying to compile with Clang 3.8.0 64-bit in release mode results in the
following:

```
         Unwind edges out of a funclet pad must have the same unwind dest
           %94 = cleanuppad within none [], !dbg !787
           cleanupret from %100 unwind to caller, !dbg !839
           cleanupret from %94 unwind label %ehcleanup101, !dbg !787
    10>CL : fatal error : error in backend: Broken function found, compilation aborted! [F:\foobar2000\columns_ui\foo_ui_columns\foo_ui_columns.vcxproj]
```

A quick search on their bug tracker throws up
[Clang/LLVM bug 26698](https://llvm.org/bugs/show_bug.cgi?id=26698). That was
marked as fixed only in February, and, indeed, the
[current snapshot build of Clang 3.9.0 (r268958)](http://llvm.org/builds/) works
fine for release builds.

Debug builds with both 3.8.0 and snapshot build r268958 yield the following,
though:

```
CL : fatal error : error in backend: assembler label 'L?query_cpu_feature_set@pfc@@YA_NI@Z$parent_frame_offset' can not be undefined [F:\foobar2000\columns_ui\pfc\pfc.vcxproj]
```

I haven't worked out as yet why that only happens for debug builds.

## Compiling using Clang

Rather than faffing about with my project files, I am just overriding the
platform toolset using MSBuild in a VS2015 x86 Native Tools command prompt.

For example, running:

```
msbuild /m /p:PlatformToolset=LLVM-vs2014 /p:Platform=Win32 /p:Configuration=Release /t:Rebuild vc14\columns_ui-public.sln
```

One other problem I ran into is that if _Inherit from project or project
defaults_ isn't turned on in Visual Studio for _Additional Options_ in
_C/C++/Command Line_ in your project properties, you will encounter various
problems such as compiler errors in Windows SDK headers (about e.g. `char16_t`
and `char32_t` not being defined). (This happens because having that option off
stops certain options like `-fmsc-version=1900` and `-m32`/`-m64` from being
passed to `clang-cl`.)

It's worth noting that building Columns UI using Clang is far slower than the
Visual C++ compiler build (\~9 minutes vs \~33 seconds on my PC). The Clang
build is not using precompiled headers (it only supports them if using
[/FI](https://msdn.microsoft.com/en-us/library/8c5ztk84.aspx) at present).

## clang-tidy

Another benefit of the code being compilable with clang is that it opens up the
possibility of using [clang-tidy](http://clang.llvm.org/extra/clang-tidy/).

Apart from checking code for possible errors, clang-tidy can modernise code by,
for example,
[replacing null constants (e.g. `NULL` and `0`) with `nullptr`](http://clang.llvm.org/extra/clang-tidy/checks/modernize-use-nullptr.html)
and adding the
[`override` specifier](http://clang.llvm.org/extra/clang-tidy/checks/modernize-use-override.html)
to member functions that override virtual functions of a base class.

A full list of checks available in clang-tidy can be found
[here](http://clang.llvm.org/extra/clang-tidy/checks/list.html).

Here's an example command for running it (from a VS2015 x86 Native Tools command
prompt, under Clang 3.9.0 build r268958):

```
clang-tidy foo_ui_columns/main_window.cpp -checks=-*,modernize-* -fix -- -fmsc-version=1900 -DUNICODE -D_UNICODE -DNDEBUG -DWIN32_WINNT=0x0600 -DWIN32 -D_WINDOWS -D_WINDLL -D_USRDLL -m32
```

`-checks=-*,modernize-*` enables code-modernisation checks (and disables the
default checks), and `-fix` applies any available fixes.

It _almost_ works:

```
C:\Program Files (x86)\Windows Kits\10\include\10.0.10586.0\um\winnt.h:935:5: error: MS-style inline assembly is not available: Unable to find target for this triple (no targets are registered) [clang-diagnostic-error]
    __asm    {
    ^
C:\Program Files (x86)\Windows Kits\10\include\10.0.10586.0\um\winnt.h:951:5: error: MS-style inline assembly is not available: Unable to find target for this triple (no targets are registered) [clang-diagnostic-error]
    __asm {
    ^
C:\Program Files (x86)\Windows Kits\10\include\10.0.10586.0\um\winnt.h:967:5: error: MS-style inline assembly is not available: Unable to find target for this triple (no targets are registered) [clang-diagnostic-error]
    __asm    {
    ^
F:\foobar2000\columns_ui\foo_ui_columns/../foobar2000/SDK/../../pfc/audio_sample.h:48:4: error: MS-style inline assembly is not available: Unable to find target for this triple (no targets are registered) [clang-diagnostic-error]
                        _asm {
                        ^
F:\foobar2000\columns_ui\foo_ui_columns/../foobar2000/SDK/../../pfc/audio_sample.h:56:4: error: MS-style inline assembly is not available: Unable to find target for this triple (no targets are registered) [clang-diagnostic-error]
                        _asm {
                        ^
```

I've tried specifying a target triple using `--target`, but that either breaks
things completely, or it doesn't help. Perhaps I ought to post about this on
their mailing list.

However, despite those errors, clang-tidy does carry on and perform the
requested checks on the input file specified, but stops short of applying the
fixes. You can additionally supply `-fix-errors` to make it apply fixes in spite
of errors, though (so I am still able to use it).

**Update 17 September 2016**

As it turns out, someone has already
[submitted a patch](https://reviews.llvm.org/D17981) for the clang-tidy MS-style
inline assembly problem. However, it hasn't been accepted as yet, unfortunately.

## What's next

It wasn't easy, but getting Columns UI compiling with Clang was a worthwhile
effort. When I get some time, I'll have a look at the checks available in
clang-tidy in more detail.

Another thing worth mentioning is that
[ReSharper C++](https://www.jetbrains.com/resharper-cpp/) has been invaluable
throughout all this, but perhaps I'll write about that another time.

[^1]:
    There are a large number of warnings, which are still to be looked at in
    detail.
