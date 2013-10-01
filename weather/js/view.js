// view for index
(function(M, $){
var niolist = {
	niolist : [
		{
			liclass : 'nio-detail',
			img : 'nio-img1',
			wea : 'nio-wea1',
			tem : 'nio-color2 nio-tem1',
			day : 'nio-day1',
			date : 'nio-date1',
			tip : 'nio-tip1'
		},{
			liclass : 'nio-detail hide',
			img : 'nio-img2',
			wea : 'nio-wea2',
			tem : 'nio-color2 nio-tem2',
			day : 'nio-day2',
			date : 'nio-date2',
			tip : 'nio-tip2'
		},{
			liclass : 'nio-detail hide',
			img : 'nio-img3',
			wea : 'nio-wea3',
			tem : 'nio-color2 nio-tem3',
			day : 'nio-day3',
			date : 'nio-date3',
			tip : 'nio-tip3'
		},{
			liclass : 'nio-detail hide',
			img : 'nio-img4',
			wea : 'nio-wea4',
			tem : 'nio-color2 nio-tem4',
			day : 'nio-day4',
			date : 'nio-date4',
			tip : 'nio-tip4'
		},{
			liclass : 'nio-detail hide',
			img : 'nio-img5',
			wea : 'nio-wea5',
			tem : 'nio-color2 nio-tem5',
			day : 'nio-day5',
			date : 'nio-date5',
			tip : 'nio-tip5'
		}
	]
};

$('ul.nio-list').html(M.render($('#nio-list').html(), niolist));

var niotabs = {
	niotab : [
		{
			active : 'nio-active',
			tab : 'nio-tab',
			img : 'nio-img1',
			day : 'nio-day1'
		},{
			tab : 'nio-tab',
			img : 'nio-img2',
			day : 'nio-day2'
		},{
			tab : 'nio-tab',
			img : 'nio-img3',
			day : 'nio-day3'
		},{
			tab : 'nio-tab',
			img : 'nio-img4',
			day : 'nio-day4'
		},{
			tab : 'nio-tab',
			img : 'nio-img5',
			day : 'nio-day5'
		}
	]
};

$('ul.nio-tabs').html(M.render($('#nio-tabs').html(), niotabs));

})(Mustache, jQuery);