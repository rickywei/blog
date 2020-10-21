# Priority Queue/Heap

## When

1. To get min/max value each time

## Note

1. Default Priority Queue is a max heap
2. Use functor to define compare function manully

## Template

```cpp
struct cmp {
    bool operator()(T a, T b) {}
};

template <class T, class Container = vector<T>,
          class Compare = less<typename Container::value_type> >
class priority_queue;
```
