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
        'vuepress-plugin-mathjax',
        'vuepress-plugin-zooming',
        'vuepress-plugin-mermaidjs',
        'vuepress-plugin-auto-sidebar',
        '@vuepress/nprogress',
        ['@vssue/vuepress-plugin-vssue': {
            platform: 'github',
            owner: 'RickyWei',
            repo: 'blog',
            clientId: '6c63593563563a3b5f11',
            clientSecret: '488389fb136aa8b83f71d9d18bf9fe99ebd6c95f',
            autoCreateIssue: true,
        }],
        'copyright', {
            minLength: 100,
            authorName: 'RickyWei'
        }
    ]
}
