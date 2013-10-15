// counter plugin
// usage: see below

var $ = $ || {}
$.counter = function(config){
  if(!(this instanceof $.counter)){
    return new $.counter(config)
  }
  var noop = function(){}
  
  this.from = +config.from
  this.to = +config.to
  
  this.day = config.day
  this.hours = config.hours
  this.minutes = config.minutes
  this.seconds = config.seconds

  this.finished = config.finished || noop
  this.beforeStart = config.beforeStart || noop
  this.progress = config.progress || noop
  
  this.init(this)
}
$.counter.prototype = {
  constructor : $.counter,

  init : function(that){
    var now = new Date
    var time = +now

    if(time > that.to){ // finished
      return that.set().finished.call(that)
    }

    if(time < that.from){ // not start yet
      return that.set().beforeStart.call(that)
    }
    // in time
    var left = that.to - time
    that.set( that.calc( left ) )
    setTimeout(function(){
      that.init(that)
      that.progress.call(that)
    },1000)
  },
  set : function(o){
    this.day.text(o ? this.fix(o.day) : '00')
    this.hours.text(o ? this.fix(o.hours) : '00')
    this.minutes.text(o ? this.fix(o.minutes) : '00')
    this.seconds.text(o ? this.fix(o.seconds) : '00')
    return this
  },
  fix : function(n){
    return n < 10 ? '0' + n : n
  },
  calc : function(t){
    return {
      day : Math.floor( t / (1000*60*60*24) ),
      hours : Math.floor( t / (1000*60*60)%24 ),
      minutes : Math.floor( t / (1000*60)%60 ),
      seconds : Math.floor( t / (1000)%60 )
    };
  }
}

// example

$(document).ready(function(){
  var aa = $.counter({
    day: $('.day'),               // day selector
    hours: $('.hour'),            // hour selector
    minutes: $('.minute'),        // minute selector 
    seconds: $('.second'),        // seconds selector
    from: new Date(2013, 2, 22),  // start date
    to: new Date(2013, 9, 24, 12, 18),    // deadline
    beforeStart: function(){      // before-start callback
      alert('not start yet')
      console.log(this)
    },
    progress : function(){        // progress callback
      // alert('running!')
      console.log(this)
    },
    finished: function(){         // out-of-date callback
      alert('finished')
      console.log(this)
    }
  })
})