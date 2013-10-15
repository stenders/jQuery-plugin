// counter plugin

var $ = $ || {}
$.counter = function(config){
  if(!(this instanceof $.counter)){
    return new $.counter(config)
  }
  var noop = function(){}
  
  this.from = +config.from
  this.to = +config.to
  
  this.day = config.day
  this.hours1 = config.hours1
  this.hours2 = config.hours2
  this.minutes1 = config.minutes1
  this.minutes2 = config.minutes2
  this.seconds1 = config.seconds1
  this.seconds2 = config.seconds2

  this.finished = config.finished || noop
  this.beforeStart = config.beforeStart || noop
  this.progress = config.progress || noop
  
  this.init(this)
}
$.counter.prototype = {
  constructor : $.counter,

  init : function(that){
    var now = +new Date

    if(now >= that.to){ // finished
      return that.finished.call(that)
    } else if(now < that.from){ // not start yet
      that.beforeStart.call(that)
    } else {  // in time
      that.set( that.calc( that.to - now ) ).progress.call(that)
    }
    setTimeout(function(){
      that.init(that)
    },1000)
  },
  set : function(o){
    o.hours = this.fix(o.fullHours)
    o.minutes = this.fix(o.minutes)
    o.seconds = this.fix(o.seconds)

    this.hours1.innerText = o.hours[0]
    this.hours2.innerText = o.hours[1]
    this.minutes1.innerText = o.minutes[0]
    this.minutes2.innerText = o.minutes[1]
    this.seconds1.innerText = o.seconds[0]
    this.seconds2.innerText = o.seconds[1]
    return this
  },
  fix : function(n){
    return (n < 10 ? '0' : '') + n
  },
  calc : function(t){
    return {
      day : Math.floor( t / (1000*60*60*24) ),
      fullHours: Math.floor( t / (1000*60*60) ),
      hours : Math.floor( t / (1000*60*60)%24 ),
      minutes : Math.floor( t / (1000*60)%60 ),
      seconds : Math.floor( t / (1000)%60 )
    };
  }
}
window.onload = function(){
  var $id = function(id){
    return document.getElementById(id)
  }
  $.counter({
    from    : new Date(2013, 9, 22),
    to      : new Date(2013, 9, 24),
    hours1  : $id('jos-hours-1'),
    hours2  : $id('jos-hours-2'),
    minutes1: $id('jos-minutes-1'),
    minutes2: $id('jos-minutes-2'),
    seconds1: $id('jos-seconds-1'),
    seconds2: $id('jos-seconds-2')
  })
}