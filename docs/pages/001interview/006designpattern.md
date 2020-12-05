# Design Pattern

## 设计原则

1. 单一职责原则(Single Responsibility Principle)；就一个类而言， 应该仅有一个引起它变化的原因
2. 开放封闭原则（Open Close Principle）；类、模块、函数等应该是可以拓展的，但是不可修改
3. 里氏替换原则（Liskov Substitution Principle）；所有引用基类的地方必须能透明地使用其子类的对象
4. 依赖倒置原则（Dependence Inversion Principle）；高层模块不应该依赖于低层模块，两者都应该依赖于抽象。抽象不应该依赖于细节，细节应该依赖于抽象
5. 接口隔离原则（InterfaceSegregation Principles）；一个类对另一个类的依赖应该建立在最小的接口上
6. 迪米特原则（Law of Demeter）；一个软件实体应当尽可能少地与其他实体发生相互作用

## 单例

1. 保证一个类只能产生一个实例
2. 构造函数，拷贝构造，赋值构造函数，析构函数为private类型
3. 类里有个获取实例的静态函数，可以全局访问

```cpp
// 饿汉默认线程安全

// 懒汉加锁解决
SingleInstance *SingleInstance::GetInstance() {
  // double check
  // avoid to get mutex frequently
  if (m_SingleInstance == NULL) {
    std::unique_lock<std::mutex> lock(m_Mutex);
    if (m_SingleInstance == NULL) {
      m_SingleInstance = new (std::nothrow) SingleInstance;
    }
  }

  return m_SingleInstance;
}

// c++11 局部静态变量只初始化一次
Single &Single::GetInstance() {
  // 局部静态特性的方式实现单实例
  static Single s;
  return s;
}
```
