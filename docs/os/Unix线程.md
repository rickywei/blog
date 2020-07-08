# Unix线程

## 线程控制

```cpp
int pthread_create(pthread_t *thread, const pthread_attr_t *attr,
                   void *(*start_routine)(void *), void *arg);
pthread_t pthread_self(void);
int pthread_equal(pthread_t t1, pthread_t t2);

int pthread_join(pthread_t thread, void **retval);
int pthread_detach(pthread_t thread);

void pthread_exit(void *retval);
int pthread_cancel(pthread_t thread);

void pthread_cleanup_push(void (*routine)(void *), void *arg);
void pthread_cleanup_pop(int execute);
```

1. 每个线程使用tid标识，但tid只有在所属进程的上下文中才有意义
2. 新创建的线程从start_rtn函数的地址开始运行，并不保证是新建线程或调用线程先运行
3. 若新建线程使用join则调用线程等待直到子线程结束，detach分离线程后，线程的底层资源在线程结束时可被立即收回
4. 线程终止
   1. 从启动例程中返回，返回值是线程退出码
   2. 被同一进程的其他线程取消
   3. 调用pthread_exit
   4. 线程终止后，其栈空间可能被覆写
   5. 线程可以安排它退出时需要调用的函数，一个线程可建立多个清理函数，安排在栈中，执行顺序和注册顺序相反
      1. 在线程函数中pthread_cleanup_push和pop
5. 线程限制
   1. 如单进程最大线程数等
6. 重入（线程安全）
   1. 如果一个函数在相同的时间点可以被多个线程安全地调用，就称该函数是线程安全的
   2. 操作系统实现支持线程安全函数这个特性时，对POSIX.1中的一些非线程安全函数，它会提供可替代的线程安全版本。这些函数的命名方式与它们的非线程安全版本的名字相似，只不过在名字最后加了_r，表明这些版本是可重入的。很多函数并不是线程安全的，因为它们返回的数据存放在静态的内存缓冲区中
7. 线程特定数据
   1. 线程特定数据（thread-specific data），也称为线程私有数据（thread-private data），是存储和查询某个特定线程相关数据的一种机制。我们把这种数据称为线程特定数据或线程私有数据的原因是，我们希望每个线程可以访问它自己单独的数据副本，而不需要担心与其他线程的同步访问问题
8. 每个线程都有自己的信号屏蔽字
9. 当线程调用fork时
   1. 子进程通过继承整个地址空间的副本，还从父进程那儿继承了每个互斥量、读写锁和条件变量的状态
   2. 如果父进程包含一个以上的线程，子进程在fork返回以后，如果紧接着不是马上调用exec的话，就需要清理锁状态
   3. 在子进程内部，只存在一个线程，它是由父进程中调用fork的线程的副本构成的

## 线程同步

```cpp
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;       // static
int pthread_mutex_init(pthread_mutex_t *restrict mutex,  // dynamic alloc
                       const pthread_mutexattr_t *restrict attr);
int pthread_mutex_destroy(pthread_mutex_t *mutex);

int pthread_mutex_lock(pthread_mutex_t *mutex);
int pthread_mutex_trylock(pthread_mutex_t *mutex);
int pthread_mutex_unlock(pthread_mutex_t *mutex);

int pthread_mutex_timedlock(pthread_mutex_t *restrict mutex,
                            const struct timespec *restrict abstime);

pthread_rwlock_t rwlock = PTHREAD_RWLOCK_INITIALIZER;
int pthread_rwlock_init(pthread_rwlock_t *restrict rwlock,
                        const pthread_rwlockattr_t *restrict attr);
int pthread_rwlock_destroy(pthread_rwlock_t *rwlock);

int pthread_rwlock_rdlock(pthread_rwlock_t *rwlock);
int pthread_rwlock_wrlock(pthread_rwlock_t *rwlock);
int pthread_rwlock_unlock(pthread_rwlock_t *rwlock);

int pthread_spin_init(pthread_spinlock_t *lock, int pshared);
int pthread_spin_destroy(pthread_spinlock_t *lock);

pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
int pthread_cond_init(pthread_cond_t *restrict cond,
                      const pthread_condattr_t *restrict attr);
int pthread_cond_destroy(pthread_cond_t *cond);

int pthread_cond_wait(pthread_cond_t *restrict cond,
                      pthread_mutex_t *restrict mutex);
int pthread_cond_timedwait(pthread_cond_t *restrict cond,
                           pthread_mutex_t *restrict mutex,
                           const struct timespec *restrict abstime);
int pthread_cond_signal(pthread_cond_t *cond);
int pthread_cond_broadcast(pthread_cond_t *cond);

int pthread_barrier_init(pthread_barrier_t *restrict barrier,
                         const pthread_barrierattr_t *restrict attr,
                         unsigned count);
int pthread_barrier_destroy(pthread_barrier_t *barrier);
int pthread_barrier_wait(pthread_barrier_t *barrier);
```

1. 线程中的非原子操作可在任何时候因为调度而被打断或重新开始
2. 互斥量（锁）
   1. 普通锁
      1. 互斥量必须初始化
   2. 带计时器的锁
   3. 读写锁
      1. 三种状态：读模式加锁，写模式加锁，不加锁
      2. 一次只有一个线程可以占有写模式的读写锁，但多个线程可以同时占有读模式的锁
      3. 当写加锁时，后续不论想写加锁或读加锁都会被阻塞
   4. 自旋锁
      1. 自旋锁与互斥量类似，但它不是通过休眠使进程阻塞，而是在获取锁之前一直处于忙等（自旋）阻塞状态
      2. 适合于锁被持有的时间短，而且线程并不希望在重新调度上花费太多的成本
   5. 条件变量
      1. 条件变量与互斥量一起使用时，允许线程以无竞争的方式等待特定的条件发生
      2. 在使用条件变量之前，必须先对它进行初始化
   6. 屏障
      1. 屏障（barrier）是用户协调多个线程并行工作的同步机制。屏障允许每个线程等待，直到所有的合作线程都到达某一点，然后从该点继续执行，join是一种屏障

## 死锁

1. 条件
   1. 互斥条件
   2. 占有并等待
   3. 不可强行占有
   4. 循环等待条件