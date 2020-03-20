---
title: Design Pattern
date: 2020-03-19 10:49:58
update:
tags: [Design Pattern, C++]
categories: [C++]
description: Desing is Art.
---

## The SOLID Design Principles

1. Single Responsibility Principle (SRP)
   - each class has only one responsibility, and therefore has only one reason to change
2. Open-Closed Principle (OCP)
   - a type is open for extension but closed for modification
3. Liskov Substitution Principle (LSP)
   - if an interface takes an object of type Parent, it should equally take an object of type Child without anything breaking
4. Interface Segregation Principle (ISP)
   - split up interfaces so that implementors can pick and choose depending on their needs
5. Dependency Inversion Principle (DIP)
   - High-level modules should not depend on low-level modules. Both should depend on abstractions
   - Abstractions should not depend on details. Details should depend on abstractions

## Creational Patterns

### Factory Method

Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.

![Factory Method](https://s1.ax1x.com/2020/03/21/8RM26I.gif)

### Abstract Factory

Provide an interface for creating families of related or dependent objects without specifying their concrete classes.

![Abstract Factory](https://s1.ax1x.com/2020/03/21/8RMThQ.gif)

### Singleton

Ensure a class has only one instance and provide a global point of access to it.

![Singleton](https://s1.ax1x.com/2020/03/21/8RMjBV.gif)

### Prototype

Specify the kind of objects to create using a prototypical instance, and create new objects by copying this prototype

![Prototype](https://s1.ax1x.com/2020/03/21/8RMzAU.gif)

### Builder

Separate the construction of a complex object from its representation so that the same construction process can create different representations.

![Builder](https://s1.ax1x.com/2020/03/21/8RMcpd.gif)

## Structural Patterns

### Adapter

Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.

![Adapter](https://s1.ax1x.com/2020/03/21/8RQAnx.gif)

### Decorator

Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

![Decorator](https://s1.ax1x.com/2020/03/21/8RQn4e.gif)

### Proxy

Provide a surrogate or placeholder for another object to control access to it.

![Proxy](https://s1.ax1x.com/2020/03/21/8RQaCQ.gif)

### Composite

Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.

![Composite](https://s1.ax1x.com/2020/03/21/8RQDuq.gif)

### Bridge

Decouple an abstraction from its implementation so that the two can vary independently.

![Bridge](https://s1.ax1x.com/2020/03/21/8RQcUU.gif)

### Facade

Provide a unified interface to a set of interfaces in a subsystem. Façade defines a higher-level interface that makes the subsystem easier to use.

![Facade](https://s1.ax1x.com/2020/03/21/8RQIDx.gif)

### Flyweight

Use sharing to support large numbers of fine-grained objects efficiently.

![Flyweight](https://s1.ax1x.com/2020/03/21/8RQob6.gif)

## Behavioral Patterns

### Observer

Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

![Observer](https://s1.ax1x.com/2020/03/21/8RQzrt.gif)

### Strategy

Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

![Strategy](https://s1.ax1x.com/2020/03/21/8RlFPg.gif)

### State

Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.

![State](https://s1.ax1x.com/2020/03/21/8RlExs.gif)

### Iterator

Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

![Iterator](https://s1.ax1x.com/2020/03/21/8RlMIU.gif)

### Command

Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.

![Command](https://s1.ax1x.com/2020/03/21/8R8Lwt.gif)

### Chain of Responsibility

Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it.

![Chain](https://s1.ax1x.com/2020/03/21/8RG9yj.gif)

### Template Method

Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.

![Template](https://s1.ax1x.com/2020/03/21/8RG00I.gif)

### Mediator

Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently.

![Mediator](https://s1.ax1x.com/2020/03/21/8RGFwq.gif)

### Memento

Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.

![Memento](https://s1.ax1x.com/2020/03/21/8RGoNV.gif)

### Visitor

Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.

![Visitor](https://s1.ax1x.com/2020/03/21/8RGH9U.gif)

### Interpreter

Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.

![Interpreter](https://s1.ax1x.com/2020/03/21/8RGimn.gif)