# fullPageSlide
作简历用的全屏滚动插件

>基本依赖文件，由于所需依赖js都是在node里维护，比如jquery、slimScroll等，需要安装node服务

## npm install
```
<link rel="stylesheet" type="text/css" href="./css/fullpageslide.css">
<script src="./node_modules/jquery/dist/jquery.min.js"></script>
<script src="./script/fullpageslide.js"></script>
```

>基本DOM布局

```
<section id="J-fullPageSlide" class="fullPageSlide">
    <section class="section-wrapper">
        <section class="section section1"></section>
        <section class="section section2"></section>
        <section class="section section3"></section>
        <section class="section section4"></section>
        <section class="section section5"></section>
    </section>
</section>
```
ID:J-fullPageSlide,为了让插件找到

Class:fullPageSlide,为了让CSS实现基本样式

Class: section-wrapper,所有屏的包裹层

Class: section,每一屏的类名
