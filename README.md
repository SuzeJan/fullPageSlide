# fullPageSlide
作简历用的全屏滚动插件

>基本依赖文件，由于所需依赖js都是在node里维护，比如jquery、reset等，需要安装node服务

- npm install
- 或者在dist目录手动copy依赖,然后链接下

``` html
<link rel="stylesheet" type="text/css" href="./css/fullpageslide.css">
<script src="./node_modules/jquery/dist/jquery.min.js"></script>
<script src="./script/fullpageslide.js"></script>
```

>基本DOM布局

``` html
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
- J-fullPageSlide: 必须,插件的对象
- .fullPageSlide: 必须,CSS基本样式,布局
- .section-wrapper: 必须,section容器
- .section: 一个section表示一个屏
- .section1[2,3,4,5]: 可无,这是css定义的默认背景色,可以在参数中自定义背景色


>基本实现

- 支持鼠标滚动
- 支持前进后退和键盘控制
- 支持竖屏、横屏展示
- 支持 CSS3 动画
- 支持滚动回调函数
- 支持窗口缩放,窗口缩放时自动调整
- 可设置菜单导航、背景颜色、滚动速度、循环选项、回调等等

> 插件参数
``` javascript
$(document).ready(function() {
    $('#J-fullPageSlide').FullPageSlide({
        //接收一个数组,定义导航菜单的值,并会自动生成DOM
        navMenu: [],
        //接收一个字符串,显示此项目名或者作者,只有在有navmenu的条件下才会生成
        author: '',            
        //菜单高亮的类名.active,用户可自定义active的类名
        active: 'active',       
        //自定义每个屏的背景色
        sectionColor: [],     
        //默认进去显示第几屏
        index: 0,               
         //默认为ease,动画效果[linear、ease、ease-in...]等等css3transition的运动曲线
        easing: 'ease',     
        //默认500,动画执行时间,单位ms
        duration: 500,         
        //默认垂直滚动,horizontal为水平方向,值[vertical, horizontal]
        direction: 'vertical',
        //默认false,是否循环切换滚动
        isLoop: false,
        //默认true,是否全屏滚动,若为true则浏览器默认的滚动方式
        isScrolling: true,
        //默认true,是否键盘控制切换
        isKeyboard: true,
        //当内容超过可视区是否显示滚动条(需要引入slimscroll.js)(暂时为实现)
        isSlimscroll: false,
        //滚动到某一屏后的回调函数
        afterLoad: function(index) {
            console.log("当前页: ", index);
        },
        //滚动前的回调函数
        onLeave: function(leaveIndex, nextIndex) {
            console.log('离开: ', leaveIndex, ', 进入: ', nextIndex);
        }
    });
})
```
