;define(function(require,exports,module){
	//点击导航滚动
	exports.roll = function(obj,obj2,fn){
		var oScroll = document.documentElement.scrollTop || document.body.scrollTop;
		var start  = obj.offsetTop+oScroll;
		var end = obj2.offsetTop;
		var dis = end -start;
		var n = 0;
		var count = Math.floor(1000/30);
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			n++;
			var a = 1-n/count;
			var cur = start+dis*(1-Math.pow(a,3));
			document.documentElement.scrollTop = document.body.scrollTop = cur;
			if (n == count) {
				clearInterval(obj.timer);
				fn && fn();
			};
		},30)
	};
})