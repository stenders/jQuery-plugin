/*
 * jQuery accordion plugin
 * Author : Luck Chang
 * Email : chunhang@networking.io
 * Date : 2012.12.25 10:29
 */
;(function($,window){
	$.fn.accordion = function(configs){
		var that = this,
		bool = $.browser.msie && $.browser.version < 10;

		configs = $.extend({
			title : true
		}, configs);
		$.each(that, function(i){
			if(configs.title){
				var imgs = that[i].getElementsByTagName('img');
				$.each(imgs, function(j){
					var div = document.createElement('div'),
					title = imgs[j].getAttribute('title'),
					txt = document.createTextNode(title);
					div.appendChild(txt);
					imgs[j].parentNode.insertBefore(div, imgs[j]);
				});
			}
			if(bool){
				var ul = that[i].getElementsByTagName('ul')[0],
				li = ul.getElementsByTagName('li');
				ul.attachEvent('onmouseout', function(){
					$(li).stop(true).animate({'width' : '160px'}, 500);
				});
				$.each(li, function(j){
					li[j].attachEvent('onmouseover', function(){
						$(li[j]).stop(true).animate({'width' : '640px'}, 500)
						.siblings().stop(true).animate({'width' : '40px'}, 500);
					});
				});
				if($.browser.version == 9){
					ul.className = 'ie9';
				}
			}
		});
	};
})(jQuery, window);
$(function(){
	$('.accordion').accordion({
		title : true
	});
});