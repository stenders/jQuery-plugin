/*
 * jQuery flash plugin
 * Author : Luck Chang , Mos
 * Emal   : chunhang@networking.io
 * Date   : 2012.8.16 15:23
 */
;(function($){
	$.fn.flash = function(options){
		var that = this,sliding,
		$a = that.find('a'),
		len = $a.length,
		pager = 1;
		if(len == 1){return;}

		var html = '<ul class="flash_list"><li class="flash_now">',
		pag = '<ul class="flash_pager pa"><li class="flash_curr"></li>';
		div ='<div class="flash_show"><div class="flash_container pr">' + that.html() + that.html() + '</div></div>';
		
		for(i = 0; i < len; i ++){
			if(i == 0){
				html += '<img alt="" src="' + $a[0].childNodes[0].getAttribute('src') + '" /></li>';
				continue;
			}

			html += '<li><img alt="" src="' + $a[i].childNodes[0].getAttribute('src') + '" /></li>';
			pag += '<li></li>';
		}

		html += '</ul><a href="javascript:;" class="bullet pa"></a>' + pag + '</ul>';
		that.html(div + html);
		div = html = pag = null;
		
		options = $.extend({
			next : that.find('.bullet'),
			bin : that.find('.flash_container'),
			li : that.find('.flash_list li'),
			pager : that.find('.flash_pager li'),
			speed : 400,
			events : 'click',
			duration : 3000,
			autoplay : true
		},options);

		var w = that.find('.flash_show').width();

		options.next.click(move);

		function move(){
			if(options.bin.is(':animated')) return;
			if(pager != len+1){
				options.bin.animate({'left':'-=' + w },options.speed);
				pager ++;
				makeDots(pager);
			} else {
				options.bin.css('left','0').animate({'left' : '-=' + w},options.speed);
				pager = 2;
				makeDots(pager);
			}
		}
		options.li[options.events](function(){
			events(options.li,this);
		});

		options.pager[options.events](function(){
			events(options.pager,this);
		});

		function events(ele,li){
			options.bin.stop(true);
			var num = ele.index(li);
			options.bin.animate({'left':'-' + num * w },options.speed);
			pager = num + 1;
			makeDots(pager);
		}

		function makeDots(num){
			num = num > len ? 0 : num -1;
			options.pager.eq(num).addClass('flash_curr').siblings().removeClass();
			options.li.eq(num).addClass('flash_now').siblings().removeClass();
		}
		if(options.autoplay){
			that.hover(function(){
				clearInterval(sliding);
			},function(){
				sliding = setInterval(move,options.duration);
			}).mouseleave();
		}
	};
})(jQuery);

jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend( jQuery.easing,
{
	def: 'easeOutExpo',
	swing: function (x, t, b, c, d) {
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	}
});

$(function(){
	$('#flash_container').flash({
	});
});