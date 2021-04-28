# python根据一个列表排序另一个列表

```python
value = [3, 5, 2, 1, 4]
key = ['a', 'b', 'c', 'd', 'e']

s = sorted(key, key=lambda x: value[key.index(x)])
print(s)
# ['d', 'c', 'a', 'e', 'b']
```
