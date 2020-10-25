module.exports = {
    base: '/blog/',
    title: 'Think More',
    description: 'Think More, Code Less',
    serviceWorker: true,
    markdown: {
        lineNumbers: true
    },
    // head: [
    //     ['link', { rel: 'stylesheet', href: 'https://unpkg.com/nes.css@latest/css/nes.min.css' }]
    // ],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            {
                text: 'Blog', items: [
                    { text: 'Algorithm', link: '/pages/algorithm/' },
                    { text: 'C++', link: '/pages/cpp/' },
                    { text: 'Network', link: '/pages/network/' },
                    { text: 'OS', link: '/pages/os/' },
                    { text: 'Design', link: '/pages/design/' },
                    { text: 'collection', link: '/pages/collection/' }
                ]
            },
            { text: 'Github', link: 'https://github.com/RickyWei' },
            { text: 'LinkedIn', link: 'https://www.linkedin.com/in/ruiji-wei' }
        ],
        lastUpdated: 'Last Updated'
    },
    plugins: [
        'vuepress-plugin-mathjax',
        'vuepress-plugin-zooming',
        'vuepress-plugin-mermaidjs',
        'vuepress-plugin-auto-sidebar',
        '@vuepress/nprogress',
        // '@vuepress/back-to-top',
        'copyright', {
            minLength: 100,
            authorName: 'RickyWei'
        }
    ]
}
