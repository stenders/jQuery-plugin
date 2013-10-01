jQuery(function($){
	var	alterClass = function(ele, clsName, siblings, add){
			ele[add ? add : 'addClass'](clsName).siblings(siblings).removeClass(clsName);
		},
		alterHide = function(ele){
			ele.show().siblings().hide();
		};

	// index tabs
	;(function($){
		var	tab = $('.nio-tabs li'),
			list = $('.nio-list'),
			index;
		
		// index tabs && mini tabs
		tab.on('click', function(){
			var that = $(this);
			index = that.index();
			
			if(that.hasClass('nio-active') && cases.height() > 0) return;
			alterClass(that, 'nio-active', '.nio-active');
			alterHide(list.children().eq(index));
		});

	}($));
});