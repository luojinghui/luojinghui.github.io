---
title: React-Native开发之原生模块向JavaScript发送事件
tags:
- React-Native
- android
date: 2017/8/02 15:20:25
reward: true
keywords: React—Native开发之原生模块向JavaScript发送事件 luojinghui luojh的博客 
description: React—Native开发之原生模块向JavaScript发送事件 | luojh的博客 | 前端骚年一枚
---

JavaScript端接收来自原生模块发送的事件，实现了前端与原生模块之间的通信
<!--more    -->
本品博文的内容主要介绍的是原生安卓向js发送事件,并传递消息给react-native。
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

前两种方式相对于原生模块来说,是一种较为被动的方式,但是第三种则是比较主动的机制,当原生执行到任何一步时,都可以主动地给rn发送消息。前端则需要监听该事件,当前端收到某确定事件时，则可准确获知原生函数目前执行的状态以及得到原生函数的返回值等。这样前端可以进行下一步的操作，如更新UI等。

接下来我们看一下如何由原生模块向JavaScript前端发送事件:

<span style="font-size: 18px;color: red;">1.首先你需要定一个发送事件的方法,如代码所示:</span>
```java
//Demo.java
public class Demo {
    public static ReactContext myContext;
    
    public void sendEvent(ReactContext reactContext, String eventName, String params) {
        reactContext
                .getJSMo`dule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }   
}
```
其中方法名可以任意，但是参数不可改变。该方法可以放在你要复用的原生类中（demo将定义一个原生类`Demo`在`Demo.java`文件中）
需要注意的是，由于版本问题，该函数中的参数reactContext有可能为null，此时会报NullPointException的错误。所以我们需要手动给reactContext赋值，见步骤2.

<span style="font-size: 18px;color: red;">2.获取reactContext的值</span>
我们在原生类`Demo`中，定义变量`public static ReactContext  MyContext`,然后在我们自定义的继承至`ReactContextBaseJavaModule`的类中给reactContext赋值。
```java
public class MyModule extends ReactContextBaseJavaModule {  
  
    public MyModule(ReactApplicationContext reactContext) {  
        super(reactContext);  
  
        Demo.MyContext=reactContext;  
    }  
    
    //以下写被@ReactNative所标注的方法  
    ...
}  
```
此时，reactContext将不会是null。也就不会报错。

<span style="font-size: 18px;color: red;">3.在原生类中向RN发送事件</span>
```java
    //    myContext是当前的上下文,即上边步骤定义的变量
    //    第二个参数代表事件变量名,需要在rn端用到
    //    第三个参数代表需要传递的数据
    sendEvent(myContext, "pushData", "这里是你想要发送的数据,可以是任何数据类型的字符串格式");
```

<span style="font-size: 18px;color: red;">4.在RN端进行监听</span>
在RN前端监听事件。首先导入DeviceEventEmitter，即:`import{ DeviceEventEmitter } from 'react-native'`,然后使用componentWillMount建立监听。
```js
      DeviceEventEmitter.addListener('pushData', function (msg) {
        ToastAndroid.show("DeviceEventEmitter收到消息:" + "\n" + msg, ToastAndroid.SHORT)
      });
```

---

条理还是很清晰吧,下面提供一个完整的Demo,功能如下:
（1）JavaScript端在监听一个事件。
（2）点击前端某行文字，调用原生方法。
（3）在原生方法中，延迟3s后向前端发送对应事件。
（4）前端接收到事件后，给出alert提示。

ManiActivity.Java
```java
package com.luojh;  
 
import com.facebook.react.ReactActivity;  
  
public class MainActivity extends ReactActivity {  
  
    /** 
     * Returns the name of the main component registered from JavaScript. 
     * This is used to schedule rendering of the component. 
     */  
    @Override  
    protected String getMainComponentName() {  
        return "luojh";  
    }  
} 
```

ManiApplication.java
```java
package com.luojh;  
  
import android.app.Application;  
import android.util.Log;  
  
import com.facebook.react.ReactApplication;  
import com.facebook.react.ReactInstanceManager;  
import com.facebook.react.ReactNativeHost;  
import com.facebook.react.ReactPackage;  
import com.facebook.react.shell.MainReactPackage;  
  
import java.util.Arrays;  
import java.util.List;  
  
public class MainApplication extends Application implements ReactApplication {  
  
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {  
    @Override  
    protected boolean getUseDeveloperSupport() {  
      return BuildConfig.DEBUG;  
    }  
  
    @Override  
    protected List<ReactPackage> getPackages() {  
      return Arrays.<ReactPackage>asList(  
          new MainReactPackage(),  
              new MyPackage()  
      );  
    }  
  };  
  
  @Override  
  public ReactNativeHost getReactNativeHost() {  
      return mReactNativeHost;  
  }  
} 
```

MyModule.java
```java
package com.luojh;  
  
import com.facebook.react.bridge.ReactApplicationContext;  
import com.facebook.react.bridge.ReactContextBaseJavaModule;  
import com.facebook.react.bridge.ReactMethod;  
  
/** 
 * Created by Administrator on 2016/10/30. 
 */  
  
public class MyModule extends ReactContextBaseJavaModule {  
  
    public MyModule(ReactApplicationContext reactContext) {  
        super(reactContext);
          
        //给上下文对象赋值  
        Test.myContext=reactContext;  
    }  
  
    @Override  
    public String getName() {  
        return "MyModule";  
    }  
  
  
    @ReactMethod  
    public void  NativeMethod() {  
        //调用Test类中的原生方法。  
        new Test().fun();  
    }  
}  
```

MyPackage.java
```java
package com.luojh;  
  
import com.facebook.react.ReactPackage;  
import com.facebook.react.bridge.JavaScriptModule;  
import com.facebook.react.bridge.NativeModule;  
import com.facebook.react.bridge.ReactApplicationContext;  
import com.facebook.react.uimanager.ViewManager;  
  
import java.util.ArrayList;  
import java.util.Collections;  
import java.util.List;  
  
/** 
 * Created by Administrator on 2016/10/30. 
 */  
  
public class MyPackage implements ReactPackage {  
    @Override  
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {  
  
        List<NativeModule> modules=new ArrayList<>();  
        modules.add(new MyModule(reactContext));  
  
        return modules;  
    }  
  
    @Override  
    public List<Class<? extends JavaScriptModule>> createJSModules() {  
        return Collections.emptyList();  
    }  
  
    @Override  
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {  
        return Collections.emptyList();  
    }  
}  
```

Test.java
```java
package com.ywq;  
  
import android.provider.Settings;  
import android.support.annotation.Nullable;  
  
import com.facebook.react.bridge.Arguments;  
import com.facebook.react.bridge.ReactContext;  
import com.facebook.react.bridge.WritableMap;  
import com.facebook.react.modules.core.DeviceEventManagerModule;  
  
/** 
 * Created by Administrator on 2016/10/30. 
 */  
  
public class Test {  
     //定义上下文对象  
    public static ReactContext myContext;  
  
    //定义发送事件的函数  
    public void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {  
        System.out.println("reactContext="+reactContext);  
  
        reactContext  
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)  
                .emit(eventName,params);  
    }  
  
    public void fun() {  
        //在该方法中开启线程，并且延迟3秒，然后向JavaScript端发送事件。  
        new Thread(new Runnable() {  
            @Override  
            public void run() {  
  
                try {  
                    Thread.sleep(3000);  
                } catch (InterruptedException e) {  
                    e.printStackTrace();  
                }  
  
               //发送事件,事件名为EventName  
                WritableMap et= Arguments.createMap();  
                sendEvent(myContext,"EventName",et);  
            }  
        }).start();  
    }  
}  
```
    
前端index.Android.js代码如下：
```js
import React, { Component } from 'react';  
import {  
 AppRegistry,  
  StyleSheet,  
  Text,  
  DeviceEventEmitter,  
  NativeModules,  
  View  
} from 'react-native';  
  
export default class Luojh extends Component {
  componentWillMount() {
    //监听事件名为EventName的事件  
    DeviceEventEmitter.addListener('EventName', () => {
      alert("send success");
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      content: '这个是预定的接受信息',
    }
  }

  callNative() {
    NativeModules.MyModule.NativeMethod();
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}
                onPress={this.callNative.bind(this)}
          >
            当你点我的时候会调用原生方法，原生方法延迟3s后会向前端发送事件。
            前端一直在监听该事件，如果收到，则给出alert提示!
          </Text>

          <Text style={styles.welcome}>
            {this.state.content}
          </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('luojh', () => Luojh);
```

至此,今天的教程到这里就结束了,大家有什么疑问,可以在评论中留言。