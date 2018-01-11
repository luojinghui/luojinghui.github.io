---
title: React-Native开发之原生回调RN发送消息
tags:
- React-Native
- android
date: 2017/8/07 14:20:25
reward: true
keywords: React-Native开发之原生回调RN发送消息 luojinghui luojh的博客 
description: React-Native开发之原生回调RN发送消息 | luojh的博客 | 前端骚年一枚
---

RN和原生之间的消息传递,方法在上期介绍了三种,并且详细的介绍了其中的一种,即原生向RN发送事件传递消息,另外还有另外两种方式是通过RN向原生请求数据。在今天的这篇文章里面,就好好聊聊这两种情况。
<!--more    -->

---
<span style="color: red; font-size: 18px;">回顾:</span>
在rn官网,可以看到关于原生模块(android)向rn发送消息,即原生与rn相通信,FB实现了自己的一套交互体系:
- **使用回调函数Callback，它提供了一个函数来把返回值传回JavaScript**
- **使用Promise来实现**
- **RCTDeviceEventEmitter 事件方式**
三种方式各具有不同的优缺点:

| 方式        | 优点    |  缺点  |
| :--------:   | :-----:   | :---: |
| Callback    | js调用，Native返回      |   CallBack为异步操作，原生还在执行操作时,callback已经执行了,返回时机不确定    |
| Promise     | JS调用，Native返回     |   每次使用需要JS调用一次    |
| RCTDeviceEventEmitter        | 可任意时刻传递，Native主导控制    |   无    |

<span style="color: red; font-size: 18px;">开始:</span>
这篇文章主要介绍通过Promise方式给RN回调对应的数据,Promise是一种很常见的传递数据的方式,在rn端微信,支付宝支付,分享等功能,都应用了Promise进行传递数据。所以,很有必要好好深入研究一下,从而自己能够实现对原生SDK的操作。

### Promise
Promise 是 ES6 中增加的对于异步编程和回调更加友好的 API。
原生模块是在 com.facebook.react.bridge 中定义的 Promise 接口，实现了 resolve 和 reject 方法，resolve 用来处理正确结果，reject 用来处理异常。
```js
//要导出一个方法给 JavaScript 使用，Java 方法需要使用注解 @ReactMethod，方法的返回类型必须为 void
@ReactMethod
public void login(String name, String password, Promise promise) {
    try {
        if (TextUtils.isEmpty(name)) {
            promise.reject("-1", "name is empty");
            return;
        }
        if (new LoginTask().login(name, password)) {
            WritableMap map = Arguments.createMap();
            map.putString("name", name);
            promise.resolve(map);
        } else {
            promise.reject("-3", "login failure");
        }
    } catch (Exception e) {
        e.printStackTrace();
        promise.reject(e);
    }
}
```
在 JavaScript 中可以这样调用:
```js
NativeModules.LoginModule.login('name', 'password')
    .then(
      (map) => {
        alert(map.name)
      }
    )
    .catch(
      (code, err) => {
        alert(err)
      }
    )

```
或者用 async/await 来修饰，以同步方式调用原生模块:
```js
async login() => {
    try {
      let { ame } = await NativeModules.LoginModule.login('name', 'password');
      console.log(name);
    }
    catch (code, err) {
      alert(err)
    }
}

```

### Callback
Callback 是 com.facebook.react.bridge 中的一个接口，作为 ReactMethod 的一个传参，用来映射 JavaScript 的回调函数（function）。
Callback 接口只定义了一个方法 invoke，invoke 接受多个参数，这个参数必须是 com.facebook.react.bridge 中支持的参数。
```js
@ReactMethod
public void login(String name, String password, Callback success, Callback failure) {
    try {
        if (TextUtils.isEmpty(name)) {
            failure.invoke("name is empty");
            return;
        }
        if (new LoginTask().login(name, password)) {
            success.invoke(name);
        } else {
            failure.invoke("login failure");
        }
    } catch (Exception e) {
        e.printStackTrace();
        failure.invoke(e.getMessage());
    }
}
```
在 JavaScript 中可以这样调用
```js
NativeModules.LoginModule.login('name', 'password', (name) => {
    alert(name)
  }, (err) => {
    alert(err)
  })
```

恩。。。今天的分享就是这些啦,有疑问可以在评论处留言。
分享三篇相关博文:
-  React Native基于最新版本实现JsBundle预加载，解决白屏等待，界面秒开优化。<a style="color: red;" href="http://blog.csdn.net/u013718120/article/details/71538263">传送门</a>
-  React Native与Android通信交互 <a style="color: red;" href="http://blog.csdn.net/u013718120/article/details/55506238">传送门</a>
-  Android布局加载React Native视图 <a style="color: red;" href="http://blog.csdn.net/u013718120/article/details/73985790#comments">传送门</a>

