/*
 * jQuery slider plugin
 * Author : luck
 * Date   : 2013.7.17
 */

;(function($){
$.fn.noop = function(){return this;};
$.fn.slider = function(config){
    return this.each(function(){
        config = $.extend({
            buttons : true,                 // 左右按钮
            pagers : true,                  // 显示翻页
            pagerJustify : true,            // 页码居中
            pagerText : 'number',           // 翻页文本
            auto : true,                    // 自动播放
            pause : true,                   // 悬浮暂停
            visible: false,                 // 左右可见
            mouse : 'click',                // 触发事件
            duration : 5500,                // 间隔时间
            speed : 1500,                   // 播放速度
            easing : 'easeOutExpo',         // 平滑函数
            scroll : 1,                     // 滚动个数
            callback : function(index, e){} // 回调函数 参数index:0起头的pager; e:触发滚动源
        }, config);

        var that = $(this),
            bin = that.find('.slider-container'),
            ul = bin.find('ul'),
            li = ul.find('li'),
            pages = Math.ceil(li.length / config.scroll),
            len = bin.width() / li.outerWidth(),
            odd = li.length % config.scroll,
            width = li.outerWidth() * config.scroll,
            pager = 1,
            pag = '',
            prev = '',
            next = '',
            buttons = '';
        if(pages < 2) return;

        if(config.pagers){
            if(typeof config.pagers !== 'string'){
                var arr = config.pagerText,
                    bool = arr === 'number',
                    pagli = '';
                pag = $('<ul class="slider-pager"><li class="slider-active"><a href="javascript:;">' + (bool ? 1 : arr[0]) + '</a></li>');
                for(var i = 1; i < pages; i ++){
                    pagli += '<li><a href="javascript:;">' + (bool ? (i + 1) : arr[i]) + '</a></li>';
                }
                pag.append(pagli + '</ul>');
            } else {
                pag = that.find(config.pagers);
                if(pag.length < 1) {
                    pag = $(config.pagers);
                }
            }
            pag.on(config.mouse, 'li', function(e){
                play($(this).index() + 1, e);
            });
        }
        if(config.buttons){
            prev = $('<a href="javascript:;" class="slider-prev">prev</a>');
            next = $('<a href="javascript:;" class="slider-next">next</a>');
            buttons = prev.add(next);
            prev.click(function(e){
                play(pager - 1, e);
            });
            next.click(function(e){
                play(pager + 1, e);
            });
        }
        that.append(config.pagers === true ? pag.add(buttons) : buttons);
        if(config.pagers && config.pagerJustify){
            pag.css({
                left : '50%',
                marginLeft : - pag.width() / 2 + 'px'
            });
        }
        if(odd){
            for(var i = 0; i < len - odd; i ++){
                ul.append('<li></li>');
            }
        }
        if(config.visible){
            ul.html(ul.html() + ul.html()).css('left', -pages * width);
            pager = pages + 1;
        } else {
            for(var i = 0; i < len; i ++){
                li.eq(i).clone().appendTo(ul);
            }
        }

        function play(num, e){
            if(num === 1 && config.visible){
                move(ul.css('left', -(pages + 1) * width), '+=');
                pager = pages + 1;
            } else if(num === 0) {
                move(ul.css('left', - width * pages), '+=');
                pager = pages;
            } else if(num > pages + 1){
                if(config.visible){
                    var boo = num === (pages + 2);
                    move(ul[boo ? 'noop' : 'css']('left', - width), '-=');
                    pager = boo ? num : 3;
                } else {
                    move(ul.css('left', 0), '-=');
                    pager = 2;
                }
            } else {
                ul.stop(true).animate({
                    'left' : (1 - num) * width
                }, config.speed, config.easing);
                pager = num;
            }
            setPager(pager, e);
        }

        function move(ul, dir){
            ul.stop(true).animate({
                'left' : dir + width
            }, config.speed, config.easing);
        }

        function setPager(page, e){
            page = page > pages ? 0 : page - 1;
            config.callback(page, e);
            pag && pag.find('li').eq(page).addClass('slider-active').siblings('li.slider-active').removeClass('slider-active');
        }

        var sliding;
        if(config.auto){
            that.add(pag).hover(function(){
                config.pause && clearInterval(sliding);
            }, function(){
                clearInterval(sliding);
                sliding = setInterval(function(){
                    play(pager + 1);
                }, config.duration);
            }).trigger('mouseleave');
        }
    });
};


jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
    def: 'easeOutExpo',
    swing: function (x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    }
});
}(jQuery));