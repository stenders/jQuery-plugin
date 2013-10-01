/*
 * 自定义化input type=file的按钮
 * author : luck chang
 * email : chunhang@networking.io
 */

;(function($){
	$.fn.files = function(config){
		var defaults = {
			btnClass : 'file_btn',
			btnText  : '选择文件',
			spanClass: 'file_name',
			spanText : '未选择文件',
			callback : function(e){}
		};
		defaults = $.extend(defaults, config);
		return this.each(function(){
			var $this = $(this),
				btn = $('<button class="' + defaults.btnClass + '">' + defaults.btnText + '</button><span class="' + defaults.spanClass + '">' + defaults.spanText + '</span>');
			$this.hide().after(btn).change(function(){
				var value = this.value.split('\\').pop();
				if(value)
					$(this).siblings('.' + defaults.spanClass).html(value);
			});
			btn.click(function(e){
				$this.click();
				defaults.callback.apply(this, arguments);
				return false;
			});
		});
	};
}(jQuery));