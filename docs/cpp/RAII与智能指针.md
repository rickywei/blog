# RAII与智能指针

## RAII

资源获取即初始化（Resource Acquisition Is Initialization），利用**栈**上的**局部对象**离开作用域后，自动调用析构函数，管理资源（在析构函数中delete资源）

1. 将每个资源封装进一个类
   1. 构造函数：请求资源，或在它无法完成时抛出异常
   2. 析构函数：释放资源，并绝不抛出异常
2. 始终经由RAII类的实例使用资源
   1. 自身拥有自动存储期或临时生存期
   2. 具有自动或临时对象的生存期绑定的生存期

## 智能指针

智能指针是一种RAII，利用引用计数，自动管理资源

### shared_ptr

1. 强引用，引用计数为0时释放资源
2. 成员函数
   ![shared_ptr function](./imgs/sharedptrfunc.jpg)
::: tip
3. 应使用 weak_ptr 避免循环引用
4. 如果容器类型为shared_ptr,如vector<shared_ptr>，那么必须手动从vector中删除shared_ptr才能调用让计数枧减为0，应使用weak_ptr，这样当其他地方没有引用时，所指资源可以调用析构函数释放掉
5. boost::bind()会把参数copy一份，如果参数为share_ptr则对象生命期不会短于boost::fuction对象
:::

### weak_ptr

1. 弱引用，不增加引用计数
2. 可以提升为shared_ptr
::: tip
3. 弱回调指，若对象存在调用对应的方法，否则什么也不做，通过尝试提升weak_ptr为shared_ptr可判断对象是否存在
:::

### unique_ptr

1. 唯一
