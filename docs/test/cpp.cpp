#include <sys/time.h>

#include <cstdio>
#include <iostream>
#include <queue>
#include <stack>
#include <unordered_map>
#include <unordered_set>
#include <vector>
using namespace std;

suseconds_t diffus(timeval& tv_start, timeval& tv_end) {
    suseconds_t t1 = (int)1e6 * tv_start.tv_sec + tv_start.tv_usec;
    suseconds_t t2 = (int)1e6 * tv_end.tv_sec + tv_end.tv_usec;
    return t2 > t1 ? t2 - t1 : t1 - t2;
}

int func(int n) {
    if (n <= 1)
        return n;
    else
        return func(n - 1) + func(n - 2);
}

// "x"
#define TOSTR(x) #x
string s = TOSTR(123);  //"123"

// xy
#define CONN(x, y) x##y
int a = (123, 456);  // a=123456

// 防止重复包含
#ifndef _HEADER_H
#define _HEADER_H
// HEADER
#endif

#define DBG(fmt, ...)             \
    do {                          \
        printf(fmt, __VA_ARGS__); \
    } while (0)

int main() {
    vector<vector<int>> vv = {{2, 1}, {3, 1}, {1, 4}};
    timeval t1, t2;
    gettimeofday(&t1, nullptr);
    func(30);
    gettimeofday(&t2, nullptr);
    cout << diffus(t1, t2) << endl;
    cout << (int)1e6 << endl;

    DBG("%d%d", 1, 2);
    return 0;
}
