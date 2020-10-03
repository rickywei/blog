# Inherit

## C++ Object Model

1. Usually, object model layout as, base class, vtbl, field, function
2. There are padding between each fieldd, the padding size = next field size's smallest multiple - pre-field's size.
   eg. short int -> padding 4-2, int double -> padding 8-4
3. The entries for virtual destructors are actually pairs of entries. The first destructor, called the complete object destructor, performs the destruction without calling delete() on the object. The second destructor, called the deleting destructor, calls delete() after destroying the object. Both destroy any virtual bases; a separate, non-virtual function, called the base object destructor, performs destruction of the object but not its virtual base subobjects, and does not call delete().

```cpp
class Base {
   public:
    virtual void say() {}
    virtual ~Base() {}

   protected:
    int b;
};

class Derived : public Base {
   public:
    virtual void say() {}
    virtual ~Derived() {}

   private:
    double d;
};

// clang -Xclang -fdump-record-layouts -stdlib=libc++ -c cpp.cc
// nm cpp.o
// clang -Xclang -fdump-vtable-layouts -stdlib=libc++ -c cpp.cc

Vtable for 'Base' (5 entries).
   0 | offset_to_top (0)
   1 | Base RTTI
       -- (Base, 0) vtable address --
   2 | void Base::say()
   3 | Base::~Base() [complete]
   4 | Base::~Base() [deleting]

VTable indices for 'Base' (3 entries).
   0 | void Base::say()
   1 | Base::~Base() [complete]
   2 | Base::~Base() [deleting]


Vtable for 'Derived' (5 entries).
   0 | offset_to_top (0)
   1 | Derived RTTI
       -- (Base, 0) vtable address --
       -- (Derived, 0) vtable address --
   2 | void Derived::say()
   3 | Derived::~Derived() [complete]
   4 | Derived::~Derived() [deleting]

VTable indices for 'Derived' (3 entries).
   0 | void Derived::say()
   1 | Derived::~Derived() [complete]
   2 | Derived::~Derived() [deleting]

*** Dumping AST Record Layout
         0 | class Base
         0 |   (Base vtable pointer)
         8 |   int b
           | [sizeof=16, dsize=12, align=8,
           |  nvsize=12, nvalign=8]

*** Dumping AST Record Layout
         0 | class Derived
         0 |   class Base (primary base)
         0 |     (Base vtable pointer)
         8 |     int b
        16 |   double d
           | [sizeof=24, dsize=24, align=8,
           |  nvsize=24, nvalign=8]
```
