# Unix Thread

## Thread Control

1. Each thread indicated by tid, tid has is context in a process
2. New thread start from its function's address, no promise on new thread or call thread run firstly
3. Can use join() to let call thread wait(blocked) new thread finish, use detach() to let new thread be controled by OS
4. New thread must be join() or detach() to promise rousource is released
5. thread end
   1. Return from function, return value is thread's exit code
   2. Cancled by other thread in the same process
   3. Thread's stack can be resued when it finish
   4. Thread can set a function which will be called when exit.
6. A process has limitation on thread number
7. Reentrancy
   1. thread safe means a function can be called by many thread and run correctly
   2. POSIX provide some thread safe version function, named by funcname_r
   3. Many function is not thread safe since they put return value in static memory
8. thread-private data
9. thread call fork()
   1. Child get copy of both space and mutex, condition
   2. Child only has one thread, its the copy of thread of parent who calls fork()

## Thread Synchronization

1. Non-atom operation can be interrupted at any time
2. Mutex(lock)
   1. Normal lock
      1. Lock need to be initialized
   2. lock with timer
   3. Read-write lock
      1. 3 status, read lock, write lock, no lock
      2. Only one thread can occupy write lock, but read lock can be occupied by many thread
      3. The write lock will block any r/w lock
   4. Spine lock
      1. block thread by busy-wait rather than sleep
   5. Condition variable
      1. Condition variable need to be initialized
   6. barrier

## Dead lock

1. when happens
   1. Mutual Exclusion
   2. Hold and Wait
   3. No Preemption
   4. Circular Wait
