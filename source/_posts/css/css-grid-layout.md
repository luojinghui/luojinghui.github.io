---
title: CSS3之Grid布局
tags: 
- css3
- grid-layout
date: 2017/7/13 12:20:25
reward: true
keywords: Css3 grid grid-layout
description: grid-layout布局
---
    
CSS Grid布局出来已经很久了,在今年3月份正式得到所有浏览器的支持,也正因为此,今后的html布局也将要以grid布局为基础,进行开发。它是继flexbox布局之后又一个强大的布局系统,可以完成flexbox布局完成不了的复杂,智能,响应式布局。
<!--more    -->
所以,很有必要去认真的学习一下。


### 专业术语
在学习这个属性之前,很有必要熟悉一下对应这个属性的一些专业术语,在整个网格中常用的术语有:
* 网格线(Grid lines)
* 水平或纵向网格轨道(Grid tracks)
* 行(Rows) 
* 列(Columns)
* 间距(Gutters) 轨道行和列之间的间距
* 单元格(Grid cells) 轨道相交产生的内容区域,相当于table中的单元格
<img src="http://ol5l1z7pa.bkt.clouddn.com/grid/h-3.svg" alt="术语" style="max-width: 600px;" />
`1`表示Grid lines,  `2`表示Columns,  `3`表示Rows,  `4`表示Cells

#### 间距
对于网格布局,两个轨道之间的区域称之为间距(gutters)
<img src="http://ol5l1z7pa.bkt.clouddn.com/grid/h-4.svg" alt="术语" style="max-width: 600px;" />

#### 网格区域(Grid area)
网格区域是由任何四个网格线组成的区域，它可以包含任意数量的网格单元格。
<img src="http://ol5l1z7pa.bkt.clouddn.com/grid/h-5.svg" alt="术语" style="max-width: 600px;" />

相信这些术语能够更好地帮组我们理解Grid布局,接下来花点时间让我们创建一个网格，并且在浏览器能看到其效果。

### 网格容器
通过设置css属性`display: grid`或者`display: inline-grid`可以创建一个网格容器,网格容器中的所有子元素就会自动变成网格项目(grid item)
网格项目默认放在行中,并且跨网格容器的全宽,在codePen中切换grid Or inline-grid 进行体验。
<iframe height='265' scrolling='no' title='vZPYQv' src='//codepen.io/LeoJingHui/embed/vZPYQv/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/LeoJingHui/pen/vZPYQv/'>vZPYQv</a> by Leojh (<a href='https://codepen.io/LeoJingHui'>@LeoJingHui</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
> column, float, clear, 和 vertical-align 元素对网格容器不起作用。

接下来需要定义网格样式风格,也就是设置网格行和列,我们可以通过`grid-template-columns`和`grid-template-rows`来设置。

<div style="margin: 5px 0px;font-size: 20px;font-weight: bold;font-family: sans-serif;">属性1: grid-template-rows | grid-template-columns :</div>

利用以空格分隔的值定义网格的列和行。值的大小代表轨道的大小，并且它们之间的空格表示网格线。
```css
.container {
    display: grid;
    grid-template-columns: <track-size> ... | <line-name> <track-size> ... | subgrid;
    grid-template-rows: <track-size> ... | <line-name> <track-size> ... | subgrid;
}
```
track-size: 可以是一个长度、百分比或者是网格中自由空间的一小部分(使用fr单位)
line-name: 你选择的任意名称
subgrid: 如果你的网格容器本身就是一个网格项(即嵌套网格)，你可以使用此属性指定行和列的大小继承于父元素而不是自身指定。
示例:
当你在值之间留有空格时，网络线就会自动分配数值名称:
```css
.container{
    grid-template-columns: 40px 50px auto 50px 40px;
    grid-template-rows: 25% 100px auto;
}
```
<img src="http://ol5l1z7pa.bkt.clouddn.com/grid/h-6.PNG" alt="术语" style="width: 90;%max-width: 600px;" />

但是你也可以显示命名，请参考下面括号语法中的名称命名方式:
```css
.grid {
    display: grid;
    height: 300px;
    grid-template-rows: [row1-start] 20% [row1-end] 40% [third-line] auto [last-line];
    grid-template-columns: repeat(3, 20% [row1-end]) 1fr;
}
```
<iframe height='265' scrolling='no' title='EXMjPB' src='//codepen.io/LeoJingHui/embed/EXMjPB/?height=265&theme-id=0&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/LeoJingHui/pen/EXMjPB/'>EXMjPB</a> by Leojh (<a href='https://codepen.io/LeoJingHui'>@LeoJingHui</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
请注意，一条网格线可以具有有多个名称。例如，这里的第二行将有两个名字: row1-end 和 row2-start
如果你的定义中包含重复的部分，你可以使用 repeat() 表示法进行精简:
```css
grid-template-columns: repeat(3, 20% [row1-end]) 1fr;
```
等效于:
```css
grid-template-columns: 20% [row1-end] 20% [row1-end] 20% [row1-end] 1fr;
```
fr 单位允许你将一个轨道大小设置为网格容器内自由空间的一小部分。如下所示，每个网格项就会占据网格容器宽度的三分之一:
```css
.container{
    grid-template-columns: 1fr 1fr 1fr;
}
```
这里自由空间表示除去非弹性项以后剩余的空间。在此示例中的 fr 单位的可用空间表示减去50px以后的空间大小:
```css
.container{
    grid-template-columns: 1fr 50px 1fr 1fr;
}
```

<div style="margin: 5px 0px;font-size: 20px;font-weight: bold;font-family: sans-serif;">属性2: grid-template-areas :</div>