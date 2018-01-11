---
title: Canvas贝塞尔曲线总结
tags:
- canvas
- html
date: 2017/3/7 16:20:25
reward: true
keywords: luojinghui luojh的博客 canvas 二次贝塞尔曲线
description: canvas贝塞尔曲线总结 | luojh的博客 | 前端骚年一枚
---

最近在学习canvas,记录一下贝塞尔曲线的两个使用方法:
<!--more-->
   1. quadraticCurveTo();
   2. bezierCurveTo();

#### 定义和用法
quadraticCurveTo() 方法通过使用表示二次贝塞尔曲线的指定控制点，向当前路径添加一个点。
<span style="color: orange">提示</span>：二次贝塞尔曲线需要两个点。
    第一个点是用于二次贝塞尔计算中的控制点。
    第二个点是曲线的结束点。曲线的开始点是当前路径中最后一个点。
    如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点。

<div style="margin: 20px;"> ![标注](/img/quadraticcurve.gif) </div>

* 开始点：moveTo(20,20)
* 控制点：quadraticCurveTo(<span style="color: #f65131">20</span>,<span style="color: #f65131">100</span>,200,20)
* 结束点：quadraticCurveTo(20,100,<span style="color: #f65131">200</span>,<span style="color: #f65131">20</span>)

#### 语法
```
context.quadraticCurveTo(cpx,cpy,x,y);
```

#### 参数值
| 参数        | 描述          |
|:---------------|:---------------|
| cpx        | 贝塞尔控制点的 x 坐标 |
| cpy        | 贝塞尔控制点的 y 坐标 |
| x          | 结束点的 x 坐标 |
| y          | 结束点的 y 坐标 |

#### 定义和用法
bezierCurveTo() 方法通过使用表示三次贝塞尔曲线的指定控制点，向当前路径添加一个点。
<span style="color: orange">提示</span>：三次贝塞尔曲线需要三个点。前两个点是用于三次贝塞尔计算中的控制点，第三个点是曲线的结束点。曲线的开始点是当前路径中最后一个点。如果路径不存在，那么请使用 beginPath() 和 moveTo() 方法来定义开始点。
<div style="margin: 20px;"> ![标注](/img/beziercurve.gif) </div>

* 开始点：moveTo(20,20)
* 控制点 1：bezierCurveTo(<span style="color: #f65131">20</span>,<span style="color: #f65131">100</span>,200,100,200,20)
* 控制点 2：bezierCurveTo(20,100,<span style="color: #f65131">200</span>,<span style="color: #f65131">100</span>,200,20)
* 结束点：bezierCurveTo(20,100,200,100,<span style="color: #f65131">200</span>,<span style="color: #f65131">20</span>)

#### 语法
```
context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
```
### 参数值
| 参数        | 描述          |
|:---------------|:---------------|
| cp1x        | 第一个贝塞尔控制点的 x 坐标 |
| cp1y        | 第一个贝塞尔控制点的 y 坐标 |
| cp2x        | 第二个贝塞尔控制点的 x 坐标 |
| cp2y        | 第二个贝塞尔控制点的 y 坐标 |
| x          | 结束点的 x 坐标 |
| y          | 结束点的 y 坐标 |

#### 实践
基本语法学习完了,就开始自己动手画图啦。首先,来个简单一点的,两个C字母组合吧:
```
        context.lineWidth = 5;
        context.strokeStyle = "green";

        context.moveTo(50, 50);
        context.bezierCurveTo(50, 50, 150, 50, 150, 150);
        context.stroke();
        context.quadraticCurveTo(150, 250, 50, 250);
        context.stroke();

        context.beginPath();
        context.strokeStyle = "red";
        context.moveTo(260, 50);
        context.quadraticCurveTo(155, 50, 155, 155);
        context.stroke();
        context.bezierCurveTo(155, 155, 155, 250, 250, 250);
        context.stroke();
```
效果如图:
![cc](/img/cc.png)

恩,感觉还不错,接着画一个😊的表情吧:
```
        context.beginPath();
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.moveTo(300, 80);
        context.quadraticCurveTo(312, 40, 360, 50);
        context.stroke();

        context.moveTo(500, 80);
        context.quadraticCurveTo(490, 40, 445, 50);
        context.stroke();

        context.beginPath();
        context.lineJoin = "round";
        context.moveTo(340, 150);
        context.quadraticCurveTo(405, 230, 470, 150);
        context.quadraticCurveTo(405, 200, 340, 150);
        context.stroke();
```
![cc](/img/smail.png)
丑到爆的微笑表情😔,耐着性子看吧~~
至此,Canvas简单的曲线方法使用就结束了,也是难以理解,只有一步一步的写例子,才能加深理解,这就是个人的学习方式吧。