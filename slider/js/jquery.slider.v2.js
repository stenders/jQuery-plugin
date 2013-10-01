/*
 *	jQuery slider plugin v2.0
 *	author : Luck Chang
 *	email  : chunhang@networking.io
 *	data   : 2012.06.18 19:28
 */

 ;(function($){
 	$.fn.slider = function(configs){
 
 		var $this = this,
 		len = $this.children().length;
		if(len <= 1) return;

		configs = $.extend({
			styles   : 'none',	//'none','fade','slide','vertical'
			speed    : 400,
			duration : 3000,
			pause    : true,	//pause on hover
			prev     : '.slider_prev',
			next     : '.slider_next',
			buttons  : true,
			mouse    : 'click', //'mouseover' or 'click'
			autoplay : true,
			easing   : 'swing'	//see below
		},configs);

		var html = $this.html(),
		tmp = '',
		button = '',
		slide = configs.styles == 'slide',
		vertical = configs.styles == 'vertical',
		fade = configs.styles == 'fade',
		none = configs.styles == 'none';
		fadenone = fade || none;

		if(configs.buttons && !vertical){
			button = '<a href="javascript:;" class="slider_prev"></a><a href="javascript:;" class="slider_next"></a>';
		}
		for(var i = 2; i <= len; i ++){
			tmp += '<li>' + i + '</li>';
		}
		if(fadenone){
			tmp = html + '<ul><li class="curr">1</li>' + tmp + '</ul>' + button;
		}
		else{
			tmp = '<div class="slider_bin_container">' + html + html + '</div><ul><li class="curr">1</li>' + tmp + '</ul>' + button;
		}

		$this.html(tmp);
		html = null;
		button = null;
		tmp = null;

		var $li = $this.find('li'),
		$img = $this.children('img'),
		sliding,
		pager = 1,
		now = 0;

		if(fadenone){
			$img.css('position','absolute')
			.filter(function(index){
				return index;
			}).hide();

			$(configs.prev,this).click(function(){
				fades(pager - 1);
			});

			$(configs.next,this).click(function(){
				fades(pager + 1);
			});
			$li[configs.mouse](function(){
				var num = $li.index(this) + 1;
				fades(num);
			});
		}
		else{
			var	$bin = $this.children('.slider_bin_container'),
			w = $this.width(),
			h = $this.height();

			if(vertical){
				$bin.css({'width':w+'px','height':'99999px'});
			}

			var dirs = vertical ?'top':'left',
			scroll = vertical ? h : w,
			param1 = {},
			param2 = {},
			param3 = {};
			param1[dirs] = '+=' + scroll + 'px';
			param2[dirs] = '-=' + scroll + 'px';

			$(configs.prev,this).click(function(){
				play(pager - 1);
			});
			$(configs.next,this).click(function(){
				play(pager + 1);
			});
			$li[configs.mouse](function(){
				var num = $li.index(this);
				mouse(num);
			});
		}

		if(configs.autoplay){
			autoplay();
			if(configs.pause){
				$this.hover(function(){
					clearInterval(sliding);
				},autoplay);
			}
		}

		function autoplay(){
			clearInterval(sliding);
			sliding = setInterval(function(){
				if(fadenone){
					fades(pager + 1);
				}
				else{
					play(pager + 1);
				}
			},configs.duration);
		}
		function fades(num){
			if(num > len){ num = 0;}
			else if(num <= 0) {num = len-1;}
			else num = num -1;
			if(fade){
				$img.eq(now).fadeOut().end().eq(num).stop(true).fadeIn();
			}
			if(none){
				$img.eq(now).hide().end().eq(num).show();
			}
			now = num;
			pager = num + 1;
			makeDots(pager);
		}
		function play(page){
			if(!$bin.is(':animated')){
				param3[dirs]  = (1-page) * scroll + 'px';
				if(page == 0){
					$bin.css(dirs,- scroll * len + 'px').animate(param1,configs.speed,configs.easing);
					pager = len;
				}
				else if(page == len + 2){
					$bin.css(dirs,'0').animate(param2,configs.speed,configs.easing);
					pager = 2;
				}
				else{
					$bin.animate(param3,configs.speed,configs.easing);
					pager = page;
				}
				makeDots(pager);
			}
		}
		function mouse(num){
			param3[dirs]  = -num * scroll + 'px';
			if(pager == len && num == 0){
				$bin.stop().animate(param2,configs.speed,configs.easing);
			}
			else if(pager == 1 && num == len-1){
				$bin.stop().css(dirs,- scroll * len + 'px')
				.animate(param1,configs.speed,configs.easing);
			}
			else{
				$bin.stop().animate(param3,configs.speed,configs.easing);
			}
			pager = num + 1 ;
			makeDots(pager);
		}
		function makeDots(index){
			index = (index == len + 1) ? 1 : index;
			$li.eq(index - 1).addClass('curr').siblings().removeClass();
		}
	}
})(jQuery);

/*
 * jQuery Easing plugin
 */

jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'swing',
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	}
});