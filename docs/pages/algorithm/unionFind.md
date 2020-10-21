# Union Find

## When

1. To judge if two element belong to the same set
2. To judge connectivity
3. To find common parent

## Issue

## Template

```cpp
struct UF {
    int count;
    int *root;

    // to be balance
    int *size;

    UF(int n) {
        count = n;
        root = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) {
            root[i] = i;
            size[i] = 1;
        }
    }

    int find(int x) {
        while (root[x] != x) {
            // path compression
            root[x] = root[root[x]];
            x = root[x];
        }
        return x;
    }

    void un(int p, int q) {
        int rootp = find(p);
        int rootq = find(q);
        if (rootp == rootq) return;

        // to be balance
        if (size[rootp] > size[rootq]) {
            root[rootq] = rootp;
            size[rootp] += size[rootq];
        } else {
            root[rootp] = rootq;
            size[rootq] += size[rootp];
        }
        count--;
    }
};
```
