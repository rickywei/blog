# Design Pattern

## Princple

1. Single Responsibility Principle
2. Open-Closed Principle
3. Liskov Substitution Principle
4. Interface Segregation Principle
5. Dependency Inversion Principle

## Pimpl Idiom

```cpp
struct Person {
    Person();
    ~Person();
    void greet();

    class PersonImpl;
    PersonImpl* impl_;
};
// PersonImpl is implemented in cpp file
// Therefore, include Person does not induce other headers needed by PersonImpl
struct Person::PersonImpl {
    void greet();
};

Person::Person() : impl_(new PersonImpl()) {}

void Person::greet() { impl_->greet(); }

void Person::PersonImpl::greet() {}
```
