# Singleton in C++ 11

## Do not need manual locking any more

1. Concurrent execution shall wait if a static local variable is already being initialized.
2. If control enters the declaration concurrently while the variable is being initialized, the concurrent execution shall wait for completion of the initialization.

```cpp
static Singleton& get() {
    static Singleton instance;
    return instance;
}
```
