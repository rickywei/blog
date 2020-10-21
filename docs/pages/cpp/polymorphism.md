# Polymorphism

## Type

1. Compile: template, overload
2. Run-time: dynamic bind

## Why run-time polymorphism only work with pointer and reference

1. In C++, an object always has a fixed type and size known at compile-time and
   (if it can and does have its address   taken) always exists at a fixed address for the duration of its lifetime
2. If use `Base b = Derived()`, the copy constructor of class Base will be used,
   the object b is a slicing of Derived().
3. A pointer or reference, like `Base *b = new Derived()` only points to a memory

## How

1. The size of each pointer is same, 64bit or 32bit
2. The type of pointer indicate how many byte to read
3. Each class has a vtable pointer, which points to a talbe has all virtual functions
