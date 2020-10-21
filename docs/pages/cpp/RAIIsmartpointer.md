# RAII and Smart Pointer

## RAII

RAII(Resource Acquisition Is Initialization) uses the properity that stack lock object calls destructor automatically when leaves scope to manage resource

1. Wrap resource into a class
   1. Constructor, requests resource or throw exception
   2. Destructor, release resource and never thrw exception
2. Always use resouce through RAII class

## Smart Pointer

Smart pointer is a kind of RAII, uses reference count to manage resource

### shared_ptr

1. Strange reference, release resource when ref count == 0
2. ![shared_ptr function](./imgs/sharedptrfunc.jpg)
3. If the container, like `vector<shared_ptr>`, has element of shared_ptr, we need to delete it from container to reduce ref count to 0 or use weak_ptr
4. boost::bind() will copy the parameter. If argument has type of shared_ptr, the life time must longer than the boost::function object

### weak_ptr

1. Weak reference, dose not increate ref count
2. Can use weak_ptr to avoid circular reference
3. Can be prompted to shared_ptr
4. Weak callback means do something when object exists otherwise nothing. Try to promote weak_ptr to shared_ptr to check existence of an object.

### unique_ptr

1. 唯一
