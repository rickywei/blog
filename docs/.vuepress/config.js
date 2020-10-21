module.exports = {
    base: '/blog/',
    title: 'Want to be STRONG',
    description: 'need to learn',
    serviceWorker: true,
    markdown: {
        lineNumbers: true
    },
    // themeConfig: {
    //     nav: [
    //         { text: 'Home', link: '/' },
    //         { text: 'Github', link: 'https://github.com/RickyWei' },
    //         { text: 'LinkedIn', link: 'https://www.linkedin.com/in/ruiji-wei' }
    //     ],
    //     sidebar: {
    //         sidebarDepth: 2,
    //         '/': [
    //             {
    //                 title: 'Fight',
    //                 path: '/fight/',
    //                 children: [
    //                     'fight/fight'
    //                 ]
    //             },
    //             {
    //                 title: 'Algorithm',
    //                 path: '/algorithm/',
    //                 children: [
    //                     '/algorithm/leetcodeTimeComplex',
    //                     '/algorithm/STL',
    //                     '/algorithm/math',
    //                     '/algorithm/stack',
    //                     '/algorithm/priorityQueue',
    //                     '/algorithm/hashMap',
    //                     '/algorithm/tree',
    //                     '/algorithm/twoPointer',
    //                     '/algorithm/binarySearch',
    //                     '/algorithm/divideConquer',
    //                     '/algorithm/unionFind',
    //                     '/algorithm/trie',
    //                     '/algorithm/BFSDFS',
    //                     '/algorithm/greedy',
    //                     '/algorithm/dynamicProgramming',
    //                 ]
    //             },
    //             {
    //                 title: 'C/C++',
    //                 path: '/cpp/',
    //                 children: [
    //                     'cpp/compile',
    //                     'cpp/macro',
    //                     'cpp/polymorphism',
    //                     'cpp/RAIIsmartpointer',
    //                     'cpp/cpp11singleton'
    //                 ]
    //             },
    //             {
    //                 title: 'Network',
    //                 path: '/network/',
    //                 children: [
    //                     '/network/applicationLayer',
    //                     '/network/transportLayer',
    //                     '/network/networkLayer',
    //                     '/network/linkLayer',
    //                     '/network/physicalLayer',
    //                 ]
    //             },
    //             {
    //                 title: 'OS',
    //                 path: '/os/',
    //                 children: [
    //                     '/os/process',
    //                     '/os/thread',
    //                 ]
    //             },
    //             {
    //                 title: 'Design',
    //                 path: '/design/',
    //                 children: [
    //                     '/design/designPattern',
    //                     '/design/logger',
    //                     '/design/fastdfs',
    //                     '/design/lsmtree',
    //                 ]
    //             },
    //         ]
    //     },
    //     lastUpdated: 'Last Updated'
    // },
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