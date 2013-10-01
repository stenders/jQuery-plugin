/*
 * jQuery placeholder plugin
 * Author : luck Chang
 * Email : chunhang@networking.io
 * Date : 2012.10.30 18:40
 */
;(function($, document){
	$.fn.placeholder = function(){
		return 'placeholder' in document.createElement('input') ? this : this.each(function(){
			var that = this,
			focusFunc = function(){
				if(that.value == that.defaultValue)
					that.value = '';
			},
			blurFunc = function(){
				if(that.value == '')
					that.value = that.defaultValue;
			};
			that.defaultValue = that.value = that.getAttribute('placeholder');
			if(that.attachEvent){
				that.attachEvent('onfocus', focusFunc);
				that.attachEvent('onblur', blurFunc);
			} else {
				that.addEventListener('focus', focusFunc, false);
				that.addEventListener('blur', blurFunc, false);
			}
		});
	};
	$(function(){
		$('[placeholder]').placeholder();
	});
})(jQuery, document);
