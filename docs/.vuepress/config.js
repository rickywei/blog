module.exports = {
    base: '/blog/',
    title: 'Think More',
    description: 'Think More, Code Less',
    serviceWorker: true,
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Github', link: 'https://github.com/RickyWei' },
            { text: 'LinkedIn', link: 'https://www.linkedin.com/in/ruiji-wei' }
        ],
        sidebar: {
            sidebarDepth: 2,
            '/': [
                {
                    title: 'Fight',
                    path: '/pages/fight/',
                    children: [
                        'fight/fight'
                    ]
                },
                {
                    title: 'Algorithm',
                    path: '/pages/algorithm/',
                    children: [
                        '/pages/algorithm/leetcodeTimeComplex',
                        '/pages/algorithm/STL',
                        '/pages/algorithm/math',
                        '/pages/algorithm/stack',
                        '/pages/algorithm/priorityQueue',
                        '/pages/algorithm/hashMap',
                        '/pages/algorithm/tree',
                        '/pages/algorithm/twoPointer',
                        '/pages/algorithm/binarySearch',
                        '/pages/algorithm/divideConquer',
                        '/pages/algorithm/unionFind',
                        '/pages/algorithm/trie',
                        '/pages/algorithm/BFSDFS',
                        '/pages/algorithm/greedy',
                        '/pages/algorithm/dynamicProgramming',
                    ]
                },
                {
                    title: 'C/C++',
                    path: '/pages/cpp/',
                    children: [
                        '/pages/cpp/compile',
                        '/pages/cpp/macro',
                        '/pages/cpp/polymorphism',
                        '/pages/cpp/RAIIsmartpointer',
                        '/pages/cpp/cpp11singleton'
                    ]
                },
                {
                    title: 'Network',
                    path: '/pages/network/',
                    children: [
                        '/pages/network/applicationLayer',
                        '/pages/network/transportLayer',
                        '/pages/network/networkLayer',
                        '/pages/network/linkLayer',
                        '/pages/network/physicalLayer',
                    ]
                },
                {
                    title: 'OS',
                    path: '/pages/os/',
                    children: [
                        '/pages/os/process',
                        '/pages/os/thread',
                    ]
                },
                {
                    title: 'Design',
                    path: '/pages/design/',
                    children: [
                        '/pages/design/designPattern',
                        '/pages/design/logger',
                        '/pages/design/fastdfs',
                        '/pages/design/lsmtree',
                    ]
                },
            ]
        },
        lastUpdated: 'Last Updated'
    },
    plugins: [
        'vuepress-plugin-mathjax',
        'vuepress-plugin-zooming',
        'vuepress-plugin-nprogress',
        'vuepress-plugin-mermaidjs',
        'copyright', {
            minLength: 100,
            authorName: 'RickyWei'
        }
    ]
}