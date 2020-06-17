module.exports = {
    base: '/blog/',
    title: '茴香豆有四种写法呢',
    description: 'need to learn',
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
                    title: '网络',
                    path: '/network/',
                    children: [
                        '/network/应用层',
                        '/network/传输层'
                    ]
                }
            ]
        },
        lastUpdated: 'Last Updated'
    }
}