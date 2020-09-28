# Tree

## Travse

1. Preorder (Root, Left, Right)
2. Inorder (Left, Root, Right)
3. Postorder (Left, Right, Root)
4. Travse by level

```cpp
void PreOrder(Node* root) {
    Node* p = root;
    stack<Node*> s;
    while (p || !s.empty()) {
        while (p) {
            cout << p->val << " ";
            s.push(p);
            p = p->left;
        }
        if (!s.empty()) {
            p = s.top();
            s.pop();
            p = p->right;
        }
    }
}

void InOrder(Node* root) {
    Node* p = root;
    stack<Node*> s;
    while (p || !s.empty()) {
        while (p) {
            s.push(p);
            p = p->left;
        }
        if (!s.empty()) {
            p = s.top();
            s.pop();
            cout << p->val << " ";
            p = p->right;
        }
    }
}

void PostOrder(Node* root) {
    Node *p = nullptr, *pre = root;
    stack<Node*> s;
    s.push(root);
    while (!s.empty()) {
        p = s.top();
        if ((!p->left && !p->right) || pre == p->right ||
            (pre == p->left && !p->right)) {
            cout << p->val << " ";
            s.pop();
            pre = p;
        } else {
            if (p->right) s.push(p->right);
            if (p->left) s.push(p->left);
        }
    }
}

void levelTravse(Node *root) {
    if (!root) return;
    queue<Node *> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        for (int i = 0; i < sz; ++i) {
            Node *cur = q.front();
            q.pop();
            if (cur) cout << cur->val << " ";
            if (cur->left) q.push(cur->left);
            if (cur->right) q.push(cur->right);
        }
    }
}
```
