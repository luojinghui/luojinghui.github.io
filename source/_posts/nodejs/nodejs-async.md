---
title: Node.js之async-await使用
tags:
- nodejs
- nodejs-fs
date: 2017/4/17 16:20:25
reward: true
keywords: luojinghui luojh的博客 nodejs-async
description: nodejs async | luojh的博客 | 前端骚年一枚
---
Node.js 7 night中引入了async/await用法，但是在Node.js 8和Javascript V8才可能正式激活async/await函数。
<!--more-->
###   what's async
JavaScript 里面处理异步调用一直是非常恶心的一件事情。以前只能通过回调函数，后来渐渐又演化出来很多方案，最后 Promise 以简单、易用、兼容性好取胜，但是仍然有非常多的问题。其实 JavaScript 一直想在语言层面彻底解决这个问题，在 ES6 中就已经支持原生的 Promise，还引入了 Generator 函数，
终于在 ES7 中决定支持 async 和 await。
![nodejs async](https://blog.leancloud.cn/wp-content/uploads/2015/11/async_image03.png)

### 基本语法
async/await 究竟是怎么解决异步调用的写法呢？简单来说，就是将异步操作用同步的写法来写。先来看下最基本的语法（ES7 代码片段）：
```js
const f = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
    }, 2000);
  });
};

const testAsync = async () => {
  const t = await f();
  console.log(t);
};

testAsync();
```
首先定义了一个函数<span style="color: #2bb874"> f </span>，这个函数返回一个<span style="color: #2bb874"> Promise </span>，并且会延时 2 秒，<span style="color: #2bb874"> resolve </span> 并且传入值 <span style="color: #2bb874"> 123 </span>。<span style="color: #2bb874"> testAsync </span>函数在定义时使用了关键字 <span style="color: #2bb874"> async </span>，然后函数体中配合使用了 <span style="color: #2bb874"> await </span>，最后执行 <span style="color: #2bb874"> testAsync </span>。整个程序会在 <span style="color: #2bb874"> 2 </span> 秒后输出 <span style="color: #2bb874"> 123 </span>，也就是说 <span style="color: #2bb874"> testAsync </span> 中常量 <span style="color: #2bb874"> t </span> 取得了 <span style="color: #2bb874"> f </span> 中 <span style="color: #2bb874"> resolve </span> 的值，并且通过 <span style="color: #2bb874"> await </span> 阻塞了后面代码的执行，直到 <span style="color: #2bb874"> f </span> 这个异步函数执行完。
### 对比 Promise
```js
const f = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
    }, 2000);
  });
};

const testAsync = () => {
  f().then((t) => {
    console.log(t);
  });
};

testAsync();
```
下面案例是展示如何使用Promise和Fetch API抓取数据的：
```js
function getTrace () {
  return fetch('http://www.luojh.me', {
    method: 'get'
  })
}

getTrace()
  .then()
  .catch()
```
### 异常处理
使用async/await，能以非堵塞方式暂停执行，一直等待结果返回，如果promise返回的是拒绝不成功，拒绝值将抛出，能够被try/catch捕获。上面案例可使用async/await写成如下：
```js
function async getTrace () {
  let pageContent
  try {
    pageContent = await fetch('https://www.jdon.com', {
      method: 'get'
    })
  } catch (ex) {
    console.error(ex)
  }
  return pageContent
}

getTrace().then();
```
如果 <span style="color: #2bb874">try</span> 范围内包含多个 <span style="color: #2bb874"> await </span>，那么 <span style="color: #2bb874"> catch </span> 会返回第一个 <span style="color: #2bb874"> reject </span> 的值或错误。

###   async
使用async读取文件：
```js
var fs = require('fs');

var readFile = () => (new Promise((resolve, reject) => {
  fs.readFile(__dirname + '/test.txt', {flag: 'r+', encoding: 'utf8'}, (err,data) => {
    if(err) {
      reject();
      console.log(err);
      return ;
    }

    resolve(data);
  })
}));

(async () => {
  let files = await readFile();
  console.log('result: ' + files);
})();
```

### Note
如果不能运行，可能是nodejs是nightly版本，未正式支持 async/await，命令行该为：
```
node --harmony-async-await app.js
```
