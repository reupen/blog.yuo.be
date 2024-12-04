---
title:
  "__init_subclass__ – a simpler way to implement class registries in Python"
slug: __init_subclass__-a-simpler-way-to-implement-class-registries-in-python
date: 2018-08-16T20:34:46.000Z
is_auto_excerpt: true
is_imported: true
comment_id: ghost-5b0d3d718c60d71d1497e1d5
tags:
  - Python
excerpt: |-
  I overlooked that fact that Python 3.6 added a new class method to object called
  __init_subclass__
  [https://docs.python.org/3/reference/datamodel.html#object.__init_subclass__].

  Once use case where it shines is class registries. Put simply, this is keeping
  track (in a global or equivalent object) of the subclasses of a class that have
  been defined (so that they can be easily accessed later on for some other
  purpose). Previously, this would have been done using metaclasses, but now there
  is a mu
---

I overlooked that fact that Python 3.6 added
[a new class method to object called `__init_subclass__`](https://docs.python.org/3/reference/datamodel.html#object.__init_subclass__).

Once use case where it shines is class registries. Put simply, this is keeping
track (in a global or equivalent object) of the subclasses of a class that have
been defined (so that they can be easily accessed later on for some other
purpose). Previously, this would have been done using metaclasses, but now there
is a much cleaner way to do it.

## A simple example

```python
_registry = []

class AbstractAnimal:
    @classmethod
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        _registry.append(cls)

class Dog(AbstractAnimal):
    pass
```

After running this, `_registry` will contain the class `Dog`. It’s important to
note that the code in `AbstractAnimal.__init_subclass__()` runs when the module
containing a subclass such as `Dog` is imported. If `Dog` was in a separate
module which was never imported, it would never get added to `_registry`.

(Although I defined `_registry` outside of the class, you can define it as a
class attribute if you prefer.)

## Customising behaviour per class using keyword arguments

You can also pass keyword arguments to the _class_ which are then forwarded to
`__init__subclass__()`. One use of this is to be able to define subclasses of
your base class that will be excluded from your registry (for example,
subclasses with abstract methods). Here’s an example:

```python
_registry = []

class AbstractAnimal:
    @classmethod
    def __init_subclass__(cls, is_abstract=False, **kwargs):
        super().__init_subclass__(**kwargs)
        if not is_abstract:
            _registry.append(cls)

class AbstractPet(AbstractAnimal, is_abstract=True):
    pass

class Dog(AbstractPet):
    pass
```

After running this, `_registry` will still only contain `Dog`. This is because
when `AbstractAnimal.__init_subclass__()` is called for `AbstractPet`, it is
passed `is_abstract=True` which is then used to exclude it from the registry.

When `AbstractAnimal.__init_subclass__()` is called for `Dog`, it is _not_
passed `is_abstract=True`, and hence it picks up the default of
`is_abstract=False` and is added to the class registry. In other words,
subclasses do not inherit their base classes’ keyword arguments, making class
keyword arguments perfect for this use.

(As an aside, if you did want them to be inherited, you could simply use class
attributes for that.)

If you wanted a class keyword argument to be required, you can simply leave off
the default value in your `__init_subclass__()` definition. (Note that you must
still use the keyword argument syntax in subclasses, otherwise your argument
will be interpreted as a base class.)

## What are all the super calls for?

Why is `super().__init_subclass__` called, and why is `is_abstract` not passed
to it? This simply ensures the correct behaviour when multiple inheritance is
used. Here’s another example:

```python
class BaseA:
    @classmethod
    def __init_subclass__(cls, a_arg, **kwargs):
        print("BaseA.__init_subclass__", a_arg, kwargs)
        super().__init_subclass__(**kwargs)

class BaseB:
    @classmethod
    def __init_subclass__(cls, b_arg, **kwargs):
        print("BaseB.__init_subclass__", b_arg, kwargs)
        super().__init_subclass__(**kwargs)

class SubAB(BaseA, BaseB, a_arg='a', b_arg='b'):
    pass
```

This prints:

```
BaseA.__init_subclass__ a {'b_arg': 'b'}
BaseB.__init_subclass__ b {}
```

(Of course, things will still break if two base classes use the same class
keyword arguments, so you still need to be careful.)

The last call to `super().__init_subclass__()` calls the default implementation
of `__init_subclass__()` (which is `object.__init_subclass__()`). This raises an
error if any keyword arguments are passed to it. For example, if we add another
argument to `SubAB`:

```python
class SubAB(BaseA, BaseB, a_arg='a', b_arg='b', d_arg='d'):
    pass
```

we get an exception:

```
TypeError: __init_subclass__() takes no keyword arguments
```

So, typos and similar be picked up _as long as your `__init_subclass__()` is
written correctly_.

## Subclasses must be imported

As mentioned earlier, for `__init_subclass__ ()` to be called for a particular
subclass the module containing that submodule must be imported. You can do that
using normal `import` statements. However, if you want to build some kind of
auto-discovery logic or a configuration-based system, I would recommend looking
at
[`importlib.import_module()`](https://docs.python.org/3/library/importlib.html#importlib.import_module).

## Other uses

Although I’ve used `__init_subclass__()` for class registries, its use is not
limited to that. You can manipulate `cls` in any valid way in that method (e.g.
set class attributes which affect the behaviour of other methods). Nonetheless,
you will probably want to keep any logic in `__init_subclass__ ()` relatively
simple, so that it doesn’t make it too difficult for others (or future you) to
understand.

## A note on @classmethod

`__init_subclass__()` is a class method, and as such I have decorated it with
`@classmethod`. Technically, using the decorator is optional in this case, but I
would still recommend that you do use it to make it clear that it is a class
method to those less familiar with it.

## Further reading

For further information on `__init_subclass__()` I would recommend reading the
relevant PEP: https://www.python.org/dev/peps/pep-0487/
