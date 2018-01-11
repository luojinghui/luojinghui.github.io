---
title: Node.js的文件系统Api
tags:
- nodejs
- nodejs-fs
date: 2017/4/17 16:20:25
reward: true
keywords: luojinghui luojh的博客 nodejs-fs
description: nodejs fs 文件系统api | luojh的博客 | 前端骚年一枚
---
Node.js的文件系统fs的Api
<!--more-->
```js
//公共引用
var fs = require('fs'),
path = require('path');
```

### 1、读取文件readFile函数
```js
//readFile(filename,[options],callback);

/**
 * filename, 必选参数，文件名
 * [options],可选参数，可指定flag（文件操作选项，如r+ 读写；w+ 读写，文件不存在则创建）及encoding属性
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */

var fs = require('fs');

// fs.readFile(__dirname + '/test.txt', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
//   if(err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

//es7 async写法
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

### 2、写文件
```js
// fs.writeFile(filename,data,[options],callback);
var w_data = '这是一段通过fs.writeFile函数写入的内容；\r\n';
var w_data = new Buffer(w_data);

/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */

fs.writeFile(__dirname + '/test.txt', w_data, {flag: 'a'}, function (err) {
   if(err) {
    console.error(err);
    } else {
       console.log('写入成功');
    }
});
```
### 3、以追加方式写文件
```js
// fs.appendFile(filename,data,[options],callback);

fs.appendFile(__dirname + '/test.txt', '使用fs.appendFile追加文件内容', function () {
  console.log('追加内容完成');
});
```
### 4、打开文件
```js
// fs.open(filename, flags, [mode], callback);

/**
 * filename, 必选参数，文件名
 * flags, 操作标识，如"r",读方式打开
 * [mode],权限，如777，表示任何用户读写可执行
 * callback 打开文件后回调函数，参数默认第一个err,第二个fd为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄
 */

fs.open(__dirname + '/test.txt', 'r', '0666', function (err, fd) {
  console.log(fd);
});
```
### 5、创建目录
```js
//使用fs.mkdir创建目录
//fs.mkdir(path, [mode], callback);

/**
 * path, 被创建目录的完整路径及目录名；
 * [mode], 目录权限，默认0777
 * [callback(err)], 创建完目录回调函数,err错误对象
 */

fs.mkdir(__dirname + '/fsDir', function (err) {
  if(err)
    throw err;
  console.log('创建目录成功')
});
```

### 6、查看文件与目录的是否存在
```js
//fs.exists(path, callback);

/**
 * path, 要查看目录/文件的完整路径及名；
 * [callback(exists)], 操作完成回调函数；exists true存在，false表示不存在
 */

fs.exists(__dirname + '/te', function (exists) {
  var retTxt = exists ? retTxt = '文件存在' : '文件不存在';
  console.log(retTxt);
});
```

### 7、修改文件访问时间与修改时间
```js
//fs.utimes(path, atime, mtime, callback);

/**
 * path, 要查看目录/文件的完整路径及名；
 * atime, 新的访问时间
 * ctime, 新的修改时间
 * [callback(err)], 操作完成回调函数；err操作失败对象
 */

fs.utimes(__dirname + '/test.txt', new Date(), new Date(), function (err) {
  if(err) {
    console.error(err);
    return;
  }
  fs.stat(__dirname + '/test.txt', function (err, stat) {
    console.log('访问时间: ' + stat.atime.toString() + '; \n修改时间：' + stat.mtime);
    console.log(stat.mode);
  })
});
```
### 8、创建读取流
```js
//fs.createReadStream(path, [options])
/**
 * path 文件路径
 * [options] flags:指定文件操作，默认'r',读操作；encoding,指定读取流编码；autoClose, 是否读取完成后自动关闭，默认true；start指定文件开始读取位置；end指定文件开始读结束位置
 */

var rs = fs.createReadStream(__dirname + '/test.txt', {start: 0, end: 2});
  //open是ReadStream对象中表示文件打开时事件，
rs.on('open', function (fd) {
  console.log('开始读取文件');
});

rs.on('data', function (data) {
  console.log(data.toString());
});

rs.on('end', function () {
  console.log('读取文件结束')
});
rs.on('close', function () {
  console.log('文件关闭');
});

rs.on('error', function (err) {
  console.error(err);
});

//暂停和回复文件读取；
rs.on('open', function () {
  console.log('开始读取文件');
});

rs.pause();

rs.on('data', function (data) {
  console.log(data.toString());
});

setTimeout(function () {
  rs.resume();
}, 2000);
```
