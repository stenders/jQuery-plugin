/*
 * jQuery.counter.js for jQuery
 * Author : Mos luck Chang
 * Email : chunhang@networking.io
 * Date : 2012.8.8 10:00
 */
;(function($){
	$.fn.counter = function(configs){
		var that = this,
		obj = {
			$counter : that.find('.tuan_counter'),
			$archors : that.find('a'),
			starts : configs.starts ? configs.starts.getTime() : 0,
			deadline : configs.deadline ? configs.deadline.getTime() : 0,

			adjust : function(time){
				return time < 10 ? '0' + time : time;
			},
			calc : function(value){
				return {
					day : Math.floor(value/(1000*60*60*24)),
					hour : Math.floor(value/(1000*60*60)%24),
					minute : Math.floor(value/(1000*60)%60),
					second : Math.floor(value/(1000)%60)
				};
			},
			setText : function(arr){
				configs.day.text(obj.adjust(arr.day));
				configs.hour.text(obj.adjust(arr.hour));
				configs.minute.text(obj.adjust(arr.minute));
				configs.second.text(obj.adjust(arr.second));
			},
			togClass : function(add){
				obj.$counter[add ? 'addClass' : 'removeClass']('tuan_start');
				obj.$archors[add ? 'addClass' : 'removeClass']('tuan_archors');
			},
			check : function(o){
				if(o.hour < configs.from){
					obj.togClass();
					return new Date(o.year,o.month,o.date,configs.from,0,0).getTime();
				} else if(o.hour >= configs.to){
					obj.togClass();
					return new Date(o.year,o.month,o.date+1,configs.from,0,0).getTime();
				} else {
					obj.togClass(1);
					return new Date(o.year,o.month,o.date,configs.to,0,0).getTime();
				}
			},
			count : function(){

				var arr = [],
				now = new Date(),
				my = {
					year : now.getFullYear(),
					month : now.getMonth(),
					date : now.getDate(),
					hour : now.getHours(),
					times : now.getTime()
				};
				if(obj.starts != 0 && my.times < obj.starts){
					return;
				}
				if(obj.deadline != 0 && my.times > obj.deadline){
					obj.togClass();
					return;
				}
				arr[0] = obj.check(my) - my.times;
				arr = obj.calc(arr[0]);
				obj.setText(arr);
				setTimeout(arguments.callee,1000);
			}
		};
		obj.count();
	}
})(jQuery);