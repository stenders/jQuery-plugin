(function($){
$.fn.showBox = function(options){
	function Show(btn){
		this.isVisible = false;
		this.btn = $(btn);
		this.box = this.btn.next();
		this.none = this.box.find('.none');
		this.current = this.none.first();
		this.running = null;
		this.closeBtn = this.box.find('a.close-btn');
		this.init();
	}
	Show.prototype = {
		init : function(){
			var that = this;
			this.btn.on('click', function(){
				that.isVisible ? that.close() : that.open();
			});
			this.closeBtn.on('click', $.proxy(this,'close'));
		},
		open : function(){
			this.box.stop(true).animate({'right':0}, 'normal', 'easeOutExpo', $.proxy(this,'dialogOpen'));
			this.isVisible = true;
		},
		close : function(){
			this.box.stop(true).animate({'right':'-440px'}, 'normal', 'easeOutExpo', $.proxy(this, 'dialogClose'));
			this.isVisible = false;
		},
		dialogOpen: function(){
			this.running = setTimeout($.proxy(this,'showNext'), options.duration);
		},
		dialogClose: function(){
			clearTimeout(this.running);
			this.none.hide();
			this.current = this.none.first();
		},
		showNext: function(){
			var that = this;
			if(!this.current.length) return;
			this.current.fadeIn(options.speed, function(){
				that.current = that.current.next();
				if(that.current.length)
				that.running = setTimeout($.proxy(that,'showNext'), options.duration);
			});
		}
	};

	options = $.extend({
		speed : 1000,	//	fading speed
		duration: 1500 	//	fading duration
	}, options);

	return this.each(function(){
		return new Show(this);
	});
};
$(document).ready(function(){
	$('a.show-archor').showBox();
});
}(jQuery));
