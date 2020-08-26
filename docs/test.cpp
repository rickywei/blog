#include <algorithm>
#include <iostream>
#include <stack>
#include <vector>

using namespace std;

int func(string s) {
    int n = s.size();
    vector<vector<int>> dp(n, vector<int>(n, 1e9));
    for (int i = 0; i < n; ++i) dp[i][i] = 1;

    for (int len = 1; len < n; ++len) {
        for (int i = 0; i < n - len; ++i) {
            dp[i][i + len] = dp[i][i + len - 1] + 1;
            if (s[i + len] == ')') {
                for (int j = i; j < i + len; ++j) {
                    if (s[j] == '(') {
                        if (i < j && j < i + len - 1) {
                            dp[i][i + len] =
                                min(dp[i][i + len],
                                    dp[i][j - 1] + dp[j + 1][i + len - 1]);
                        } else if (i < j) {
                            dp[i][i + len] = min(dp[i][i + len], dp[i][j - 1]);
                        } else if (j < i + len - 1) {
                            dp[i][i + len] =
                                min(dp[i][i + len], dp[j + 1][i + len - 1]);
                        } else {
                            dp[i][i + len] = 0;
                        }
                    }
                }
            } else if (s[i + len] == ']') {
                for (int j = i; j < i + len; ++j) {
                    if (s[j] == '[') {
                        if (i < j && j < i + len - 1) {
                            dp[i][i + len] =
                                min(dp[i][i + len],
                                    dp[i][j - 1] + dp[j + 1][i + len - 1]);
                        } else if (i < j) {
                            dp[i][i + len] = min(dp[i][i + len], dp[i][j - 1]);
                        } else if (j < i + len - 1) {
                            dp[i][i + len] =
                                min(dp[i][i + len], dp[j + 1][i + len - 1]);
                        } else {
                            dp[i][i + len] = 0;
                        }
                    }
                }
            } else if (s[i + len] == '}') {
                for (int j = i; j < i + len; ++j) {
                    if (s[j] == '{') {
                        if (i < j && j < i + len - 1) {
                            dp[i][i + len] =
                                min(dp[i][i + len],
                                    dp[i][j - 1] + dp[j + 1][i + len - 1]);
                        } else if (i < j) {
                            dp[i][i + len] = min(dp[i][i + len], dp[i][j - 1]);
                        } else if (j < i + len - 1) {
                            dp[i][i + len] =
                                min(dp[i][i + len], dp[j + 1][i + len - 1]);
                        } else {
                            dp[i][i + len] = 0;
                        }
                    }
                }
            }
        }
    }
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j)
            cout << i << " " << j << " " << dp[i][j] << endl;

    return dp[0][n - 1];
}

int main() {
    string s = "([[)]]";
    // string s = "[)]";
    cout << func(s) << endl;

    return 0;
}

// int main() {
//     string str = "([[)]]";
//     // cin>>str;
//     const unsigned int size = str.size();
//     int **arr = new int *[size];
//     for (unsigned int i = 0; i < size; i++) {
//         arr[i] = new int[size];
//     }

//     for (unsigned int i = 0; i < size; i++) {
//         for (unsigned int j = 0; j < size; j++) {
//             arr[i][j] = 10000000;
//         }
//     }

//     for (unsigned int i = 0; i < size; i++) {
//         arr[i][i] = 1;
//     }

//     for (int z = 1; z < size; z++) {
//         for (int i = 0; i < size - z; i++) {
//             arr[i][i + z] = arr[i][i + z - 1] + 1;
//             int aa = i + z;
//             if (str[aa] == ')') {
//                 for (int j = i; j < i + z; j++) {
//                     if (str[j] == '(') {
//                         if (i <= (j - 1) && (j + 1) <= (i + z - 1)) {
//                             if ((arr[i][j - 1] + arr[j + 1][i + z - 1]) <
//                                 arr[i][i + z]) {
//                                 arr[i][i + z] =
//                                     arr[i][j - 1] + arr[j + 1][i + z - 1];
//                             }
//                         } else if (i <= (j - 1)) {
//                             if ((arr[i][j - 1]) < arr[i][i + z]) {
//                                 arr[i][i + z] = arr[i][j - 1];
//                             }
//                         } else if ((j + 1) <= (i + z - 1)) {
//                             if ((arr[j + 1][i + z - 1]) < arr[i][i + z]) {
//                                 arr[i][i + z] = arr[j + 1][i + z - 1];
//                             }
//                         } else {
//                             arr[i][i + z] = 0;
//                         }
//                     }
//                 }
//             }
//             if (str[aa] == ']') {
//                 for (int j = i; j < i + z; j++) {
//                     if (str[j] == '[') {
//                         if (i <= (j - 1) && (j + 1) <= (i + z - 1)) {
//                             if ((arr[i][j - 1] + arr[j + 1][i + z - 1]) <
//                                 arr[i][i + z]) {
//                                 arr[i][i + z] =
//                                     arr[i][j - 1] + arr[j + 1][i + z - 1];
//                             }
//                         } else if (i <= (j - 1)) {
//                             if ((arr[i][j - 1]) < arr[i][i + z]) {
//                                 arr[i][i + z] = arr[i][j - 1];
//                             }
//                         } else if ((j + 1) <= (i + z - 1)) {
//                             if ((arr[j + 1][i + z - 1]) < arr[i][i + z]) {
//                                 arr[i][i + z] = arr[j + 1][i + z - 1];
//                             }
//                         } else {
//                             arr[i][i + z] = 0;
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     cout << arr[0][size - 1] << endl;
//     return 0;
// }