module.exports = {
    base: '/blog/',
    title: 'Want to be STRONG',
    description: 'need to learn',
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
                    title: 'Algorithm',
                    path: '/algorithm/',
                    children: [
                        '/algorithm/leetcodeTimeComplex',
                        '/algorithm/STL',
                        '/algorithm/math',
                        '/algorithm/stack',
                        '/algorithm/priorityQueue',
                        '/algorithm/hashMap',
                        '/algorithm/twoPointer',
                        '/algorithm/binarySearch',
                        '/algorithm/unionFind',
                        '/algorithm/trie',
                        '/algorithm/BFSDFS',
                        '/algorithm/greedy',
                        '/algorithm/dynamicProgramming',
                    ]
                },
                {
                    title: 'C/C++',
                    path: '/cpp/',
                    children: [
                        'cpp/编译',
                        'cpp/宏定义',
                        'cpp/RAII与智能指针',
                        'cpp/opencv',
                        'cpp/进程备份库CRIU',
                        'cpp/cpp11singleton'
                    ]
                },
                {
                    title: 'Network',
                    path: '/network/',
                    children: [
                        '/network/应用层',
                        '/network/传输层',
                        '/network/网络层',
                        '/network/链路层',
                        '/network/物理层',
                    ]
                },
                {
                    title: 'OS',
                    path: '/os/',
                    children: [
                        '/os/UnixIO',
                        '/os/Unix文件系统',
                        '/os/Unix进程',
                        '/os/Unix线程',
                        '/os/Unix信号',
                    ]
                },
                {
                    title: 'Design',
                    path: '/design/',
                    children: [
                        '/design/designPattern',
                        '/design/logger',
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