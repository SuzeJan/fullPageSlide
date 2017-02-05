/**
 * Created by Brain on 2017/02/04
 * 作者: Brain
 * 开发方式: 采用对象级别组件开发
 *
 * 1、对象级别组件开发: 挂在jQuery原型下的方法，通过jQuery选择器获取的对象实例也能共享该方法，成为动态方法
 *  $.fn.fullPageSlide = function(){}; $.fn === $.prototype
 *
 * 2、实现jQuery的链式调用
 *  $.fn.fullPageSlide = function(){
 *      return this.each(function(){});
 *  }
 *  each，循环实现每个元素的访问
 *  return this，表示返回当前对象，来实现插件的链式调用
 *
 * 3、单例模式（如果实例不存在则重新创建实例，利用data()来存放插件对象的实例）
 *  $.fn.fullPageSlide = function(){
 *      var me = $(this),
 *          instance = me.data('fullPageSlide');
 *      if (!instance){
 *          me.data('fullPageSlide',(instance = new fullPageSlide()));
 *      }
 *  };
 */
;
(function($) {
    var privateFun = function() {
        //私有方法
    };
    var FullPageSlide = (function() {
        function FullPageSlide(element, options) {
            this.setting = $.extend(true, $.fn.FullPageSlide.defaults, options || {}); //深拷贝把用户自定义的参数与插件默认的参数合并，也就是扩展到setting
            this.element = element;
            this.init();

        };
        FullPageSlide.prototype = {
            /*初始化DOM结构，布局，分页及绑定事件*/
            init: function() {
                // 初始化DOM，用d_前缀表示
                this.d_fullPageSlide = $('#J-fullPageSlide');
                this.d_sectionWrap = $('#J-fullPageSlide .section-wrapper');
                this.d_section = $('#J-fullPageSlide .section');

                // 初始化设置，用s_前缀表示
                this.s_navMenu = this.setting.navMenu;
                this.s_author = this.setting.author;
                this.s_isScrolling = this.setting.isScrolling;

                /*
                    设置sectionWrap的高度，如果isScrolling为false，那么设置sectionWrap的高度为section高度 * section.length；
                    若isScrolling为true，那么设置html，body，sectionWrap，section的高度都为100%，并且overflow: hidden
                */
                if (!this.s_isScrolling) {
                    $('html, body').css({
                        height: $(window).height(),
                        overflow: 'hidden'
                    });

                } else {
                    $('html, body').css({
                        height: $(window).height() * this.d_section.length
                    });
                    this.d_section.css({
                        height: $(window).height()
                    });
                }

                // 渲染导航条
                this.renderNav();

            },
            //其它功能

            // 渲染出导航条
            renderNav: function() {
                var _this = this;
                if (this.s_navMenu.length > 0) {

                    // 保存顶部导航菜单的DOM结构
                    // 在第一个section后面追加DOM
                    var topHeader = $('<header class="topHeader"><h1 class="author"><a href="#">'+this.s_author+'</a></h1><nav class="topNav"><ul></ul></nav></header>');
                    this.d_sectionWrap.children().eq(0).after(topHeader);
                    var ulList = $('.topHeader .topNav ul');

                    // 遍历用户传进来的菜单，渲染出菜单的DOM结构
                    $.each(_this.s_navMenu, function(index, data) {
                        var liItem = $('<li class="item"><a href="#">'+data+'</a></li>');
                        ulList.append(liItem);
                    });
                }
            }
        };
        return FullPageSlide;
    })();
    //让jQuery对象也能使用此方法，继承jQuery的对象
    $.fn.FullPageSlide = function(options) {
        //实现单例模式
        this.each(function() {
            var _this = $(this),
                instance = _this.data('FullPageSlide');
            if (!instance) {
                // _this.data('FullPageSlide', (instance = new FullPageSlide()));
                instance = new FullPageSlide(_this, options);
                _this.data('FullPageSlide', instance);
            }
            if ($.type(options) === 'string') {
                return instance[options]();
            }
        })
    };
    //对插件定义默认属性值
    $.fn.FullPageSlide.defaults = {
        navMenu: [],             //接收一个数组，定义导航菜单的值，并会自动生成DOM
        author: '',                 //接收一个字符串，显示此项目名或者作者，只有在有navmenu的条件下才会生成
        index: 0,                  //默认从第1屏开始索引，索引值从0开始计算
        easing: 'ease',          //默认为ease，动画效果[linear、ease、ease-in...]等等css3 transition的运动曲线
        duration: 500,          //默认500，动画执行时间，单位ms
        direction: 'vertical',   //默认垂直滚动，horizontal为水平方向，值[vertical, horizontal]
        isLoop: false,           //默认false，是否循环切换滚动
        isScrolling: true,      //默认true，是否全屏滚动，若为false则浏览器默认的滚动方式
        isKeyboard: true,     //默认true，是否键盘控制切换
        isSlimscroll: false,    //当内容超过可视区是否显示滚动条（需要引入slimscroll.js）
        afterLoad: '',           //滚动到某一屏时触发的回调函数
        onLeave: '',             //离开某一屏时触发的回调函数

    }

    //通过自定义HTML属性data-fullpageslide来调用插件
    $(function() {
        $('[data-fullpageslide]').FullPageSlide();
    });
})(jQuery); //闭包，传递jQuery对象
