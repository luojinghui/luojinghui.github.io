---
title: Scss学习笔记
tags: 
- 笔记
- Css3
- Scss
- sass
date: 2016/1/12 12:20:25
reward: true
keywords: Css3 scss sass 前端样式
description: Scss学习笔记
---

Scss的学习笔记,记录下来,以此纪念。
<!--more    -->
### 语法
* sass 有两种语法。 第一种被称为 SCSS (sassy CSS)，是一个 CSS3 语法的扩充版本，本片教程就是基于此语法。

* 第二种比较老的语法成为缩排语法（或者就称为 "sass"）， 提供了一种更简洁的 CSS 书写方式。 它不使用花括号，而是通过缩排的方式来表达选择符的嵌套层级，I 而且也不使用分号，而是用换行符来分隔属性。

任一语法都可以导入另一种语法撰写的文件中。 只要使用 `sass-convert` 命令行工具，就可以将一种语法转换为另一种语法：
```js
# 将 sass 转换为 SCSS
$ sass-convert style.sass style.scss

# 将 SCSS 转换为 sass
$ sass-convert style.scss style.sass
```

### 使用 sass
第一步需要安装sass(mac命令):
```
gem install sass
```
sass提供四个编译风格的选项：
```
nested：嵌套缩进的css代码，它是默认值。

expanded：没有缩进的、扩展的css代码。

compact：简洁格式的css代码。

compressed：压缩后的css代码。
```
如果要在命令行中运行 sass ,只要输入:
```
sass input.scss output.css
```
生产环境当中，一般使用最后一个选项: 
```
sass --style compressed test.sass test.css
```
你也可以让sass监听某个文件或目录，一旦源文件有变动，就自动生成编译后的版本:
```
// watch a file
sass --watch ./public/scss/demo1.scss:./public/css/demo1.css

// watch a directory
sass --style expanded --watch ./public/scss:./public/css
```
### 变量,计算
sass允许使用变量，所有变量以$开头:
```scss
$side : left;
$fontSize : 18px*2;
$var : 2;

body {
  margin: (14px/2);  //output: 7px
  top: 50px + 100px; //output: 150px
  right: $var * 10%; //output: 20%
}

.rounded {
　border-#{$side}-radius: 5px;  //output: border-left-radius: 5px
}

.box {
  color: #333;
  font-size: $fontSize;  //output: 36px
}
```
### 嵌套
sass允许选择器嵌套:
```scss
div {
  h1 {
    color: red;
  }
}
//output: 
div h1 {
  color: red;
}
```
属性也可以嵌套，比如border-color属性，可以写成：
```scss
p {
  border: {
    color: #ddd;
    width: 1px;
    style: solid;
  }
}

//output: 
p {
  border-color: #ddd;
  border-width: 1px;
  border-style: solid;
}
```
```scss
.funky {
  font: 2px/3px {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}

//output:
.funky {
  font: 2px/3px;
    font-family: fantasy;
    font-size: 30em;
    font-weight: bold; }
```
### 引用父选择符
```scss
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
  body.firefox & { font-weight: normal; }
}
//output:
a {
  font-weight: bold;
  text-decoration: none; }
  a:hover {
    text-decoration: underline; }
  body.firefox a {    //a标签被移到body属性之后
    font-weight: normal; }
```
### 注释: /\* \*/ and //
sass共有两种注释风格:
* 标准的CSS注释 /\* comment \*/ ，会保留到编译后的文件。(在/*后面加一个感叹号，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。)
* 单行注释 // comment，只保留在sass源文件中，编译后被省略。

### 数据类型
sassScript 支持六种主要的数据类型：
 
>1. 数字（例如 1.2、13、10px）
>2. 文本字符串，无论是否有引号（例如 "foo"、'bar'、baz）
>3. 颜色（例如 blue、#04a3f9、rgba(255, 0, 0, 0.5)）
>4. 布尔值（例如 true、false）
>5. 空值（例如 null）
>6. 值列表，用空格或逗号分隔（例如 1.5em 1em 0 2em、Helvetica, Arial, sans-serif）

sassScript 还支持所有其他 CSS 属性值类型， 例如 Unicode 范围和 !important 声明。 然而，它不会对这些类型做特殊处理。 它们只会被当做不带引号的字符串看待。
### 插入文件
sass 扩展了 CSS 的 @import 规则，让它能够引入 SCSS 和 sass 文件。 所有引入的 SCSS 和 sass 文件都会被合并并输出一个单一的 CSS 文件。 另外，被导入的文件中所定义的变量或 mixins 都可以在主文件中使用。
```scss
@import "path/filename.scss";
or
@import "path/filename";
```
也可以通过一个 @import 引入多个文件。例如：
```scss
@import "rounded-corners", "text-shadow";
```

### Mixin
Mixin可以重用的代码块,使用@mixin命令，定义一个代码块。
```scss
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}

@mixin clearfix {
  display: inline-block;
  &:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  * html & { height: 1px }
}

.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}

//output:
.page-title {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
  padding: 4px;
  margin-top: 10px; }
```
##### Mixin Arguments
```scss
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}

//Mixins还可以使用正常的变量设置语法为其参数指定默认值。然后当包含mixin时，如果它不传递参数，将使用默认值。例如：
p { @include sexy-border(blue, 1in); }
//output:
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed; }
  
@mixin sexy-border($color, $width: 1in) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue); }
//output:
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed; }

```

##### Keyword Arguments
Mixin也可以使用显式关键字参数。例如，我们上面的例子可以写:
```scss
p { @include sexy-border($color: blue); }
h1 { @include sexy-border($color: blue, $width: 2in); }
```
使用`...`获得所有参数:
```scss
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}

.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}

//output:
.shadows {
  -moz-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  -webkit-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
}
```

### 颜色函数
sass提供了一些内置的颜色函数，以便生成系列颜色:
```scss
  lighten(#cc3, 10%) // #d6d65c
  darken(#cc3, 10%) // #a3a329
  grayscale(#cc3) // #808080
  complement(#cc3) // #33c
```

### 函数
可以在sass中定义自己的函数，并在任何值或脚本上下文中使用它们。例如：
```scss
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }

//output:
#sidebar {
  width: 240px; }
  
//与mixins一样，您可以使用关键字参数调用sass定义的函数。在上面的例子中，我们可以像这样调用函数：  
#sidebar { width: grid-width($n: 5); }
```

##### @each
```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}

//output:
.puma-icon {
  background-image: url('/images/puma.png'); }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); }
.egret-icon {
  background-image: url('/images/egret.png'); }
.salamander-icon {
  background-image: url('/images/salamander.png'); }
```

看我上面的文章，大家有什么感受呢？你可以按照描述，安装好sass,然后边看边自己用记事本把上面的案例敲一遍，运行一遍，经过这一遍学习之后，相信您已经sass入门了，将来的sass进阶，请看后面的文章了！

要是您有什么问题，可以留言交流！
<br />
---
<br />
<center>一生最重 不过饱餐与被爱</center>