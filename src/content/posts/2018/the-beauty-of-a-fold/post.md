---
title: "The beauty of a fold"
slug: the-beauty-of-a-fold
date: 2018-03-03T13:40:18.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-5a9a6ef66a352c2ff1a77a88
tags:
  - C++
excerpt: |-
  I previously wrote
  [https://blog.yuo.be/2016/05/11/columns-ui-can-now-be-compiled-using-clang/] about how
  the following:

  console::formatter() << "some text" << 15 << a_variable << and so on...;


  was a common pattern in and when using the foobar2000 SDK, but wasn't
  standards-compliant C++, as it made use of a Visual C++ language extension
  allowing rvalues to bind to non-const lvalues. Clang, and now Visual C++ in
  standards-conforming (/permissive-) mode
  [https://docs.microsoft.com/en-us/cpp/bu
---

[I previously wrote](/2016/05/11/columns-ui-can-now-be-compiled-using-clang/)
about how the following:

```cpp
console::formatter() << "some text" << 15 << a_variable << and so on...;
```

was a common pattern in and when using the foobar2000 SDK, but wasn't
standards-compliant C++, as it made use of a Visual C++ language extension
allowing rvalues to bind to non-const lvalues. Clang, and now Visual C++ in
[standards-conforming (/permissive-) mode](https://docs.microsoft.com/en-us/cpp/build/reference/permissive-standards-conformance),
both reject such code.

The workaround I used at the time was simple – just use a non-temporary object:

```cpp
console::formatter formatter;
formatter << "some text" << 15 << a_variable << and so on...;
```

(As the destructor of `console::formatter` calls `console::print()`, a
persistent instance of `console::formatter` won't work. Console viewers
automatically append a newline to messages that don't end with one, so multiple
calls to `console::print()` won't work.)

C++17, however, gives us another solution in the form of
[fold expressions](http://en.cppreference.com/w/cpp/language/fold). C++11 gave
us a safe way to pass a variable number of arguments of differing type to a
function by using
[parameter packs](http://en.cppreference.com/w/cpp/language/parameter_pack).
However, it was difficult to iterate over a parameter pack. C++17 fold
expressions, however, allow you to reduce (or fold) a parameter pack in various
ways. Using a template parameter pack and a fold expression, we can define a
function that takes a varying number of arguments (each potentially of a
different type) and then reduces the arguments using `console::formatter`'s `<<`
operator:

```cpp
template <typename... Args>
void print_to_console(Args&&... args)
{
    console::formatter formatter;
    (formatter << ... << args);
}
```

The expression `(formatter << ... << args)` may look a bit odd, but effectively
it expands out to `formatter << arg1 <<  arg2 << ... << argN`. (Note that the
round brackets in the expression are required.)

Using the helper function is simple. For example:

```cpp
print_to_console("some text", "text", 15, variable_1, variable_2, variable_3);
```

Other operators and types of folding are also possible, as outlined in the
article on [cppreference.com](http://en.cppreference.com/w/cpp/language/fold).
For example, a similar helper function can be written using the `,` operator and
`console::formatter::add_string()`:

```cpp
template <typename... Args>
void print_to_console(Args&&... args)
{
    console::formatter formatter;
    (formatter.add_string(args), ...);
}
```

(Note that this is not a direct replacement for the previous helper function,
because `console::formatter::add_string()` only accepts strings and does not
have the same overloads as the `<<` operator.)

While the Visual Studio docs say that
[Visual Studio 2017 15.5 supports fold expressions](https://docs.microsoft.com/en-us/cpp/visual-cpp-language-conformance),
only the second form of the helper function compiles in Visual Studio 2017 15.5.
The first form compiles under Visual Studio 2017 15.6, however.

(Using a string-formatting library such as [fmt](https://github.com/fmtlib/fmt)
would, of course, be another solution. However, I'm happy with my helper
function for now 🙂)
