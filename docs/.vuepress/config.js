module.exports = {
    base: '/blog/',
    title: 'Think More',
    description: 'Think More, Code Less',
    serviceWorker: true,
    markdown: {
        lineNumbers: true
    },
    head: [
        ['link', { rel: 'icon', href: '/icon.png' }]
    ],
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            {
                text: 'Blog', items: [
                    { text: 'GoLang', link: '/pages/000golang/' },
                    { text: 'Interview', link: '/pages/999interview/' },
                ]
            },
            { text: 'Github', link: 'https://github.com/RickyWei' },
            { text: 'LinkedIn', link: 'https://www.linkedin.com/in/ruiji-wei' },
            { text: 'WeChat', link: '' }
        ],
        lastUpdated: 'Last Updated'
    },
    plugins: [
        [
            'vuepress-plugin-comment',
            {
                choosen: 'valine',
                options: {
                    el: '#valine-vuepress-comment',
                    appId: '5vYpoEcm1zNKf8pzduje2U2i-gzGzoHsz',
                    appKey: 'L3PN5qv7hmFXHF6RkTlAOLUG'
                }
            }
        ],
        'vuepress-plugin-mathjax',
        'vuepress-plugin-zooming',
        'vuepress-plugin-mermaidjs',
        'vuepress-plugin-auto-sidebar',
        '@vuepress/nprogress',
        'copyright', {
            minLength: 100,
            authorName: 'RickyWei'
        }
    ]
}
