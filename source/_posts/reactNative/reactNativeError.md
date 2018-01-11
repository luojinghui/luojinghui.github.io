---
title: React-Native踩过的坑---分享篇
tags:
- react-native
- react-native-wechat
date: 2017/3/17 16:20:25
reward: true
keywords: luojinghui luojh的博客 react-native-wechat rn分享
description: react-native-wechat制作分享功能 | luojh的博客 | 前端骚年一枚
---

年前开发React-native没有做分享,这几天在完善整个App,记录一下分享功能的一些坑。
<!--more-->

1. 错误信息:
```shell
com.android.build.api.transform.TransformException: java.util.zip.ZipException:
duplicate entry: com/tencent/mm/sdk/a/a$a.class
```

是由于微信和umeng重复的引入相同的jar包引起的,解决方法是: 在项目根目录搜索`SocialSDK_WeiXin_1.jar`,删除此jar包即可。

2. 错误信息:
```shell
UNEXPECTED TOP-LEVEL EXCEPTION:
com.android.dex.DexException: Multiple dex files define Landroid/support/v7/appcompat/R$anim;

Execution failed for task ':app:dexDebug'.
> com.android.ide.common.process.ProcessException: org.gradle.process.internal.ExecException: Process 'command '/Library/Java/JavaVirtualMachines/jdk1.8.0_40.jdk/Contents/Home/bin/java'' finished with non-zero exit value 2
```

未知原因,google了好久,终于在我大神奇github网站的某一篇文章中找到了解决方法。
只需要在项目根目录,执行命令:
```shell
cd android && ./gradlew clean
```

3. 错误信息：
```shell
** BUILD FAILED **


The following build commands failed:
    CompileC /Users/tveloso/Library/Developer/Xcode/DerivedData/ABC-dbvlmexxbrkpqubvzgqzuzdlxptp/Build/Intermediates/Pods.build/Debug-iphoneos/Pods-ABC-Realm.build/Objects-normal/armv7/external_commit_helper.o Realm/Realm/ObjectStore/impl/apple/external_commit_helper.cpp normal armv7 c++ com.apple.compilers.llvm.clang.1_0.compiler
(1 failure)
None
```
解决方法：
Simply switch off Enable Modules (C and Objective-C) in the target for 'Realm'.

4. 错误信息：
```shell
RCTRootView.h file not found
```
如果确定文件一定安装，那么请尝试以下方法：

需要把 Building Setting 里的Header Search Paths属性的值 "${PODS_ROOT}/Headers/Public/React"  - not-recursive 改为 recursive 就可以了，由于Pods里的React结构改变了，但配置没有改过来，所以出现找不到文件的问题。

5. 错误信息：
```shell
'React/RCTBridgeModule.h' file not found
or
fatal error: 'React/RCTBridgeModule.h' #390
```
解决方法：
* Open `ios/[project-name].xcodeproj` with XCode
* In the left panel (Project Navigator), navigate to `Libraries/RNVectorIcons.xcodeproj/RNVectorIconsManager`
* In `RNVectorIconsManager.h` and `RNVectorIconsManager.m`, remove the React/ prefix from all includes, for example: `#import <React/RCTConvert.h> => #import <RCTConvert.h>`

6. 报错信息：
```
RCTBridgeModule.h' file not found
```
解决方法：
change `RCTWebChat.xcodeproj` → `Build Settings` → `Search Paths` → `Header Search Paths` to
`$(SRCROOT)/../../react-native/React` and
`$(SRCROOT)/../../react-native/Libraries`


中间陆续也踩了好多坑哎,最后实现了效果。
<img src="http://ol5l1z7pa.bkt.clouddn.com/share1.jpeg" width="300px" height: "500px"/>
<img src="http://ol5l1z7pa.bkt.clouddn.com/share2.jpeg" width="300px" height: "500px"/>
<img src="http://ol5l1z7pa.bkt.clouddn.com/share3.jpeg" width="300px" height: "500px"/>
