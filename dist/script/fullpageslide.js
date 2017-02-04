(function($) {
    var privateFun = function() {
        //私有方法
    };
    var fullPageSlide = (function() {
        function FullPageSlide(element, options) {
            this.setting = $.extend(true, $.fn.FullPageSlide.defaults, options || {}); //深拷贝把用户自定义的参数与插件默认的参数合并，也就是扩展到setting
            this.element = element;
            this.init();
        }
        console.log(this);
        FullPageSlide.prototype = {
            /*初始化DOM结构，布局，分页及绑定事件*/
            init: function() {
                    console.log('init over');
                }
                //其它功能
        };
        return FullPageSlide;
    })();
    //让jQuery对象也能使用此方法，继承jQuery的对象
    $.fn.FullPageSlide = function(options) {
        //实现单例模式
        this.each(function() {
            var me = $(this),
                instance = me.data('FullPageSlide');
            if (!instance) {
                // me.data('FullPageSlide', (instance = new FullPageSlide()));
                instance = new fullPageSlide(me, options);
                me.data('FullPageSlide', instance);
            }
            if ($.type(options) === 'string') {
                return instance[options]();
            }
        })
    };
    //对插件定义默认属性值
    $.fn.FullPageSlide.defaults = {
        selectors: {
            sections: '.sections',
            section: '.section',
            page: '.page',
            active: '.active'
        },
        index: 0,
        easing: 'ease',
        duration: 500,
        loop: false,
        pagination: true,
        keyboard: true,
        direction: 'vertical', //horizontal
        callback: ''
    }
})(jQuery); //闭包，传递jQuery对象
//通过自定义HTML属性data-fullpageslide来调用插件
$(function() {
    $('[data-fullpageslide]').FullPageSlide();
});