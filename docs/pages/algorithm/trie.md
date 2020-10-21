# Trie

## When

1. To seach string in a dictionary

## Issue

## Template

```cpp
class Trie {
   public:
    struct TrieNode {
        bool is_word;
        vector<TrieNode *> next;
        TrieNode() : is_word(false), next(26, nullptr) {}
    };

    TrieNode *root;

    Trie() : root(new TrieNode) {}

    void insert(string s) {
        TrieNode *p = root;
        for (int i = 0; i < s.size(); ++i) {
            if (p->next[s[i] - 'a'] == nullptr)
                p->next[s[i] - 'a'] = new TrieNode;
            p = p->next[s[i] - 'a'];
        }
        p->is_word = true;
    }

    bool search(string s) {
        TrieNode *p = root;
        for (int i = 0; i < s.size() && p; ++i) {
            p = p->next[s[i] - 'a'];
        }
        return p && p->is_word;
    }

    bool startsWith(string s) {
        TrieNode *p = root;
        int i = 0;
        for (; i < s.size() && p; ++i) {
            p = p->next[s[i] - 'a'];
        }
        return p && i == s.size();
    }
};
```
