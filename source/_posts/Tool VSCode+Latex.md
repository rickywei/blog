---
title: Tool VSCode+Latex
date: 2019-12-27 20:21:19
update:
tags: [Latex,VSCode,Tool]
categories: [Tool]
description: You do not need to be a martyr to MS Word.
---

## 下载与安装

### Tex Live

1. 下载[Tex Live](https://www.tug.org/texlive/)的[镜像文件](http://mirror.las.iastate.edu/tex-archive/systems/texlive/Images/)
2. 安装，可一路默认

### VSCode

1. 下载[VS Code](https://code.visualstudio.com/)
2. 安装，一路默认
3. 安装插件 Latex Workshop
4. 配置编译设置 file-> preference -> 搜索latex，可根据自己需要勾选
   这里给出如何配置编译命令，recipes规定如何编译，tools对应每种编译方法的参数

   *latex通常需要多次编译（如获得正确目录通常需要2次），中文推荐使用xelatex*

   ![settings](https://s2.ax1x.com/2019/12/29/lnY3Xd.png)

   ```json
   "latex-workshop.latex.recipes": [
        {
            "name": "pdflatex*2",
            "tools": [
                "pdflatex",
                "pdflatex"
            ]
        },
        {
            "name": "xelatex*2",
            "tools": [
                "xelatex",
                "xelatex"
            ]
        },
        {
            "name": "pdflatex ➞ bibtex ➞ pdflatex × 2",
            "tools": [
                "pdflatex",
                "bibtex",
                "pdflatex",
                "pdflatex"
            ]
        },
        {
            "name": "xelatex ➞ bibtex ➞ xelatex × 2",
            "tools": [
                "xelatex",
                "bibtex",
                "xelatex",
                "xelatex"
            ]
        }
    ],
    "latex-workshop.latex.tools": [
        {
            "name": "xelatex",
            "command": "xelatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOC%"
            ],
            "env": {}
        },
        {
            "name": "latexmk",
            "command": "latexmk",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-pdf",
                "-outdir=%OUTDIR%",
                "%DOC%"
            ],
            "env": {}
        },
        {
            "name": "pdflatex",
            "command": "pdflatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOC%"
            ],
            "env": {}
        },
        {
            "name": "bibtex",
            "command": "bibtex",
            "args": [
                "%DOCFILE%"
            ],
            "env": {}
        }
    ],
   ```

## .tex 源文件

### 基本规则

1. 空格和制表符等空白字符再$\Latex$中看作相同空白距离，连续多个空白字符视为一个
2. 特殊字符 `# $ % ^ & _ {} \`具有特殊含义，要表示这些字符本身在前面加反斜杠`\#`
3. latex命令以 \ 开始
4. latex环境`\begin{environment} ... \end{environment}`
5. % 后接注释

### 源文件的结构

```tex
% 文档类型
\documentclass[options]{class}

% 需要的宏包
\usepackage[options]{class}

\title{example}
\author{author}
\date{date}

\begin{document}
    \maketitle %
    \tableofcontents % 目录

    % 文档内容

    \part{}
    \chapter{}
    \section{}
    \subsection{}

    \include{filename} % 用来包含其他tex文件，会另起新的一页
    \input{filename} % 简单插入
\end{document}
```

### 常用文档类型

1. article / ctexart ,ctex前缀类型支持中文
2. report / ctexrep
3. book / ctexbook

### 常用命令与环境

#### 换行、缩进、空格

```tex
a \quad\quad\quad\quad\quad b

\noindent % 无缩进

\newline

\newpage
```

#### 列表

```tex
% 无序列表
\begin{itemize}
    \item item 1
    \item[a] item a % 可以规定前面的标号
\end{itemize}

% 有序列表
\begin{enumerate}
    \item item 1
\end{enumerate}
```

#### 表格

```tex
\begin{tabular}{|l|c|r|} % | 为表格中的竖线，lcr为表格内容居左中或右
    \hline
    l & c & r \\
    \hline
\end{tabular}
```

#### 等式和多行等式

```tex
\begin{equation} % euqation* ，*号一般表示不需要序号
    1+1=2
\end{equation}

\begin{align}
    x&=1\\ % & 表明对齐点
    y&=2
\end{align}
```

#### 图片

```tex
\begin{figure}[H]
    \centering
    \includegraphics[width=\textwidth]{img.jpg}
    \caption{caption}
    \label{Fig 1.}
\end{figure}
```

#### 引用

```tex
% 文章中引用
\cite{ref1}

% 在文章末尾添加引用文献详情
\begin{thebibliography}{10}
  \bibitem{ref1} Dean, Jeffrey, and Sanjay Ghemawat. "MapReduce: simplified data processing on large clusters." Communications of the ACM 51.1 (2008): 107-113.
\end{thebibliography}
```

#### 数学

```tex
% 段内数学文本
$...$ or \(...\)
% 段间
$$...$$ or \[...\]

% example
$$
\hat{x}_{down}^{up}=\frac{\alpha\times\sum_{0}^{n}i}{\infty}
$$
```

$$
\hat{x}_{down}^{up}=\frac{\alpha\times\sum_{0}^{n}i}{\infty}
$$

### 常用宏包

#### 设置页边距

```tex
\usepackage{geometry}
\geometry{top=3cm,bottom=3cm,left=1cm,right=1cm}
```

#### 设置页码形式

```tex
\pagenumbering{arabic}
% arabic - 阿拉伯数字
% roman - 小写的罗马数字
% Roman - 大写的罗马数字
% alph - 小写的字符形式
% Alph -大写的字符形式
```

#### 定制页眉和页脚

```tex
\usepackage{fancyhdr}
\pagestyle{fancy} % change the style from “plain” to “fancy”
% Latex预设的页眉页脚
% empty 没有页眉页脚；
% plain 没有页眉，页脚是居中的页码；
% heading 没有页脚，页眉是章节名称的页码；
% myheading 没有页脚，页眉是页码和用户自定义的内容
\fancyhead[LO]{\leftmark}
\fancyhead[R]{\rightmark}
\fancyfoot[C]{\thepage}
% E: Even page
% O: Odd page
% L: Left field
% C: Center field
% R: Right field
% \thepage	number of the current page
% \leftmark	current chapter name printed like "CHAPTER 3. THIS IS THE CHAPTER TITLE"
% \rightmark	current section name printed like "1.6. THIS IS THE SECTION TITLE"
% \chaptername	the name chapter in the current language. If this is English, it will display "Chapter"
% \thechapter	current chapter number
% \thesection	current section number
```

#### 目录点击可达

```tex
\usepackage{hyperref}
```

#### 使用图片

```tex
\usepackage{graphicx}

\includegraphics[scale=.5\textwidth]{xxx.img}
```

#### 数学包

```tex
\usepackage{amsmath}
\usepackage{amssymb} % 包含常用数学字符运算符
```

#### 颜色

```tex
\usepackage{color}

\definecolor{ColorName}{RGB}{0,123,255} % 可自己定义颜色
\textcolor{red}{123} % red blue 等颜色已被默认定义
```

#### 双栏

```tex
\documentclass[twocolumn]{article} % method 1 直接设置文档,所有文档都双栏

\usepackage{multicol} % method 2 可具体控制
\begin{multicols}[2]
\end{multicols}
```

### 自定义命令和环境

```tex
% \newcommand{name}[num]{definition}
\newcommand{\textbfsl}[1]{
    \textbf{\textsl{#1}}
}

% \newenvironment{name}[num]{before}{after}
% 在before 中的内容将在此环境包含的文本之前处理，
% 而在after 中的内容将在遇到\end{name} 命令时处理。
\newenvironment{textslbf}[1]{do before}{do after}
```

### 编写 .cls 文件

可以自己编写 .cls 文件，提供一个文档类型，方便以后使用， .cls 文件放在与 .tex 文件同目录下

```tex
% Example
% My document class for note

\ProvidesClass{note} % .tex 中使用，\documentclass{note}

\LoadClass[a4paper,UTF8]{ctexbook}

%Layout
\RequirePackage{hyperref,fancyhdr,geometry}
\geometry{
    left=1cm,
    right=1cm,
    top=1cm,
    bottom=1cm
}
\setlength\parindent{0pt}

%Language
\RequirePackage{ctex,fontspec}
%Color
\RequirePackage{xcolor}
%Math
\RequirePackage{amsmath,amsthm,amsfonts,amssymb}
%graph
\RequirePackage{graphicx}
%Item
\RequirePackage{enumerate}
%tabularx
\RequirePackage{tabularx,booktabs}
%Code
\RequirePackage{listings}

%define color
\definecolor{termgreen}{RGB}{0,100,0}

% New Command
\newcommand*{\cover}[1]{
    \title{#1}
    \author{Ruiji Wei}
    \maketitle
    \tableofcontents
}

\newcommand*{\centergpaph}[2]{
    \begin{center}
        \includegraphics[scale=#1]{#2}
    \end{center}
}

\newcommand*{\term}[2]{
    \textcolor{termgreen}{\textbf{#1(#2)}} %Chinese and Engilish
}

\newcommand{\ra}{
    \(\rightarrow\)
}

\newcommand{\la}{
    \(\leftarrow\)
}


% New Environment
\newenvironment{pros}{\paragraph{\emph{Pros:}}\begin{itemize}}{\end{itemize}}
\newenvironment{cons}{\paragraph{\emph{Cons:}}\begin{itemize}}{\end{itemize}}
```
