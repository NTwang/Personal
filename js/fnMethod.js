;define(function(require,exports,module){
	// 1随机数
	exports.ran = function (n,m){
		return Math.floor(Math.random()*(m-n)+n);
	};
	//2 随机色
	exports.ranColor = function (obj){
		var r = ran(0,256);
		var g = ran(0,256);
		var b = ran(0,256);
		obj.style.background = 'rgb('+r+','+g+','+b+')';
	};
	//3 在数组中找出相同或者不同
	exports.findInArr = function (n,arr){
		for (var i = 0; i < arr.length; i++) {
			if (n == arr[i]) {
				return true;
			}
		}
		return false;
	};
	// 4获取最小数
	exports.findMinAndMax = function (arr){
		for (var i = 1; i < arr.length; i++) {
			var temp = arr[i];
			for(var j = i-1; j >= 0 && temp < arr[j]; j--){
				arr[j+1] = arr[j];
				arr[j] = temp;
			};
		};
		return {max:arr[arr.length-1],min:arr[0]};
	};
	//5 个位数添加0
	exports.toDouble = function (n){
		if (n < 10) {
			return '0'+n;
		}else{
			return ''+n;
		};
	};
	// 6获取物体绝对位置
	exports.abs = function (obj){
		var l = 0;
		var t = 0;
		while(obj){
			l+=obj.offsetLeft;
			t+=obj.offsetTop;
			obj = obj.offsetParent;
		};
		return {left:l,top:t};
	};
	//7 获取当前样式
	exports.getStyle = function (obj,name){
		return (obj.currentStyle || getComputedStyle(obj,false))[name];
	}
	//8className获取元素
	exports.getClassName = function (obj,cName){
		if (obj.getElementsByClassName) {
			return obj.getElementsByClassName(cName);
		}else{
			var elems = obj.getElementsByTagName('*');
			var arr = [];
			for (var i = 0; i < elems.length; i++) {
				var temp = elems[i].className.split(' ');
				if (findInArr(cName,temp)) {
					arr.push(elems[i]);
				};
			};
			return arr;
		};
	};
	//9 jsonTostr
	exports.json2Url = function (json){
		var arr = [];
		for(var name in json){
			arr.push(name+'='+json[name]);
		};
		return arr.join('&');
	};
	//10 strTojson
	exports.url2Json = function (str){
		var arr = str.split('&');
		var json = {};
		for (var i = 0; i < arr.length; i++) {
			var arr2 = arr[i].split('=');
			json[arr2[0]] = arr2[1]
		};
		return json;
	};
	//11 在某一个元素后面插入
	exports.insertAfter = function (obj1,obj2){
		var parent = obj2.parentNode;
		if (parent.lastChild == obj2) {
			parent.appendChild(obj1);
		}else{
			parent.insertBefore(obj1,obj2.nextSibling);
		};
	};
	//12 事件绑定 
	exports.addEvent = function (obj,event,fn){
		if (obj.addEventlistener) {
			obj.addEventlistener(event,fn,false);	
		}else{
			obj.attachEvent('on'+event,fn);
		};
	};
	//13 解除事件绑定
	exports.remove = function (obj,event,fn){
		if (obj.removeEventlistener) {
			obj.removeEventlistener(event);
		}else{
			obj.detachEvent('on'+event,fn)
		};
	};
	//14 求字节长度
	exports.getByLength = function (str,type){
		var res = 0;
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i) >= '\u4e00' && str.charAt(i) <= '\u9fa5') {
				if (type == 'gb2312') {
					res +=2
				}else{
					res+=3
				};
			}else{
				res++
			}
		}
		return res;
	}
	//15 设置cookie
	exports.setCookie = function (name,value,iDay){
		var oDate = new Date();
		oDate.setDate(oDate.getDate()+iDay);
		if (iDay) {
			document.cookie = name+'='+value+';PATH=/;EXPIRES='+oDate.toGMTString();
		}else{
			document.cookie = name+'='+value+';PATH=/;';
		};
	};
	//16 获取cookie
	exports.getCookie = function (name){
		var arr = document.cookie.split('; ');
		for (var i = 0; i < arr.length; i++) {
			var arr2 = arr[i].split('=');
			if (arr2[0] == name) {
				return arr[1];
			};
		};
	};
	//17 删除cookie
	exports.removeCookie = function (name){
		setCookie(name,'',-1);
	};
	//18 DOMReady
	exports.DOMReady = function (fn){
		if (document.addEventlistener) {
			document.addEventlistener('DOMContentLoaded',function(){
				fn && fn();
			},false)
		}else{
			document.attachEvent('readyStatechange',function(){
				if (document.readyState == 'complete') {
					fn && fn();
				};
			});
		};
	};
	//19 小数转百分数
	exports.toPercent = function(point){
		var str = Number(point*100).toFixed(2);
		if (str < 10) {
			return '0'+str+'%';
		}
		return str+'%';
	};
	//20 百分数转小数
	exports.toPoint = function(precent){
		var str = percent.replace('%','');
		return str/100;
	}
	//21 角度转弧度
	exports.d2a = function(n){
		return n*Math.PI/180;
	}
	//22 弧度转角度
	exports.a2d = function(n){
		return n*180/Math.PI;
	}
});
