---
title: Hexo搭建个人博客 
tags: 
- Blog
- Personal
- 教程
date: 2017/2/08 12:20:25
reward: true
keywords: luojinghui luo Hexo+github搭建博客 罗晶辉的博客 罗晶辉
description: 罗晶辉的个人博客,luo's secret
---
过完新年,在公司闲来无事,便索性想搭建自己的博客系统,其实这个想法很早就有了,不过16年太过于忙碌,生活工作节奏太乱,没有好好沉静,反思和沉淀。<!--more-->
其实好多事情,在没有经历过,会觉得那些东西看起来如此牛逼,但是真正经历了,自己做了之后,会发现,牛逼的不仅是那些事,还有自己~~此篇教程是纪念我花费在博客上面的所有逝去的时间🌺 ,并且帮助那些想要建立博客的同学们☀️。
那么,现在直接奉上搭建步骤:

### Hexo?
> Hexo is a fast, simple and powerful blog framework. You write posts in Markdown (or other languages) and Hexo generates static files with a beautiful theme in seconds.

大致解释是:Hexo是一个快速，简单和强大的博客框架。你写的Markdown（或其他语言）的帖子Hexo在几秒钟内就能生成静态文件;

### 环境配置
安装Hexo非常容易。但是，你需要先安装几个其他的东西：

`Node.js`
作用：用来生成静态页面的 到Node.js[官网](https://nodejs.org/en/)下载相应平台的最新版本，一路安装即可。[官网入口](https://nodejs.org/en/)

`Github账号`
作用：用来做博客的远程创库、域名、静态资源服务器。怎么申请github的账号和ssh key等,请大家自行搜索,网络上资源还是很丰富的。

### 正式安装Hexo
nodejs和git都安装好后，可执行如下命令安装hexo：
```
sudo npm install -g hexo
```

### 初始化
创建一个文件夹，如：Blog，进入到Blog里分别执行init命令和安装依赖命令：
```
hexo init
npm install
```

### 生成静态页面
继续再Blog目录下执行如下命令，生成静态页面:
```
hexo generate （hexo g  也可以）
```

### 安装hexo-server插件
```
sudo npm install hexo-server
```

### 本地启动
启动本地服务，进行文章预览调试，命令：
```
hexo server   (hexo s  也可以)
```
浏览器输入localhost:4000进行预览博客网站,是不是很简陋呢,但是好歹有一个自己的家园了,也是很兴奋呢。但是现在都是在本地进行的,需要和github进行关联。

### 配置Github
建立与你用户名对应的仓库，仓库名必须为【your_user_name.github.io】，固定写法 然后建立关联,例如我的是:luojinghui.github.io,此时,你的目录应该是这样子:
> Blog 
  　｜ 
  　｜－－ _config.yml 
  　｜－－ node_modules 
  　｜－－ public 
  　｜－－ source 
  　｜－－ db.json	
  　｜－－ package.json 
  　｜－－ scaffolds 
  　｜－－ themes 　
  
  现在我们需要修改_config.yml文件，用编辑器打开,翻到最后,改成这个样子(注意冒号后面的空格):
  ```
  deploy:
    type: git
    repository: https://github.com/luojinghui/luojinghui.github.io
    branch: master
  ```
  执行如下命才能使用git部署(只需要执行一次):
  ```
  npm install hexo-deployer-git --save
  ```
  执行这个命令进行部署:
  ```
  hexo deploy
  ```
  然后再浏览器中输入 http://luojinghui.github.io 就行了，我的 github 的账户叫 luojinghui ,把这个改成你 github 的账户名就行了
  
  ### 备注
  每次部署的步骤，可按以下三步来进行:
  ```
  hexo clean
  hexo generate
  hexo deploy
  ```
  
  简写:
  ```
  hexo clean
  hexo g -d
  ```
  
  一些常用命令：
  ```
  hexo new "postName" #新建文章
  hexo new page "pageName" #新建页面
  hexo generate #生成静态页面至public目录
  hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
  hexo deploy #将.deploy目录部署到GitHub
  hexo help  #查看帮助
  hexo version  #查看Hexo的版本
  ```
  
  ### 主题
  这里面有很多主题,可以参考: [入口](https://github.com/hexojs/hexo/wiki/Themes)
  
  ### 图片路径
  1.文章在 source/_posts下新建以.md为结尾的文件，编辑器可以用Webstrom、Sublime，支持 markdown 语法
  2.修改头像可以直接在主题里的 _config.yml 文件里面修改，友情链接，之类的都在这里
  3.创建文章的文件开头格式,可以用我现用的格式去写:
  ```
  ---
  title: 填写标题
  tags: 
  - tag1
  - tag2
  date: 2016/6/06 12:20:25
  reward: 是否支持打赏,填写true或者false
  keywords: 关键词1 关键词2...
  description: 填写描述
  ---
  ```
  4.如果想引用本地图片路径,以根路径作为起始点,就可以了。例如: `/img/logo.png`
  开始打理你的博客吧，有什么问题下面留言,我会回复的。
  
  ### Q&A
  > 问：如何让文章想只显示一部分和一个 阅读全文 的按钮？ 
    答：在文章中加一个 `<!--more-->` ， `<!--more-->` 后面的内容就不会显示出来了。 
    
---

  > 问：如何添加多说评论? 
    答：在主题里的 _config.yml中找到`duoshuo:  `,冒号后面填写你在多说申请用的域名,例如,我申请的是`luojinghui.duoshuo.com`,那么,在这里就填写luojinghui,就好了
  
  转载请注明原地址，luojh的博客：http://luojh.me 谢谢！
<br />
---
<br />
<center>一生最重 不过饱餐与被爱</center>
