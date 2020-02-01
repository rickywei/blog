---
title: github,hexo搭建博客
date: 2019-12-25 20:01:43
update:
tags: [Git,github,hexo,Next,Node.js]
categories: Tool
description: 使用github，hexo搭建个人blog
---

## github

1. github pages分为个人，组织和项目页面（前两个有数量限制，这里采取项目页面）
2. new repository
3. 创建新分支 gh-pages

## hexo

[hexo docs](https://hexo.io/zh-cn/docs/)

### install

1. install nodejs
2. install hexo

```bash
npm install -g hexo-cli
```

### 建站

```bash
hexo init <folder>
# folder中包含
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

### 配置

[配置参考](https://hexo.io/zh-cn/docs/configuration)

### 部署

1. install [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)

   ```bash
   npm install hexo-deployer-git --save
   ```

2. add following configurations to _config.yml

   ```yml
   deploy:
     type: git
     repo: https://github.com/<username>/<project>
     # example, https://github.com/hexojs/hexojs.github.io
     branch: gh-pages
   ```

   **gh-pages 分支用来存放静态网页，同时可使用master分支来存放整个blog源文件**

3. run

   ```bash
   hexo clean && hexo deploy
   ```

### 使用主题

1. 将主题放置与 themes 文件夹内，修改 _config.yml 内的 theme 设定
2. 这里使用[hexo-theme-next](https://github.com/theme-next/hexo-theme-next)

   ```bash
   git clone https://github.com/theme-next/hexo-theme-next.git
   # delete .git .github docs folders
   ```

3. 美化和添加功能
   > [参考1](http://eternalzttz.com/hexo-next.html)

   > [参考2](http://shenzekun.cn/hexo%E7%9A%84next%E4%B8%BB%E9%A2%98%E4%B8%AA%E6%80%A7%E5%8C%96%E9%85%8D%E7%BD%AE%E6%95%99%E7%A8%8B.html)

   > [参考3](https://io-oi.me/tech/hexo-next-optimization/)
