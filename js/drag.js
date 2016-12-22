;define(function(require,exports,module){
	exports.drag = function(obj,obj2){
		obj.onmousedown = function(ev){
			var oEvent = ev || event;
			//鼠标点到obj 边缘的距离
			var disx = oEvent.clientX-obj.offsetLeft;
			var disy = oEvent.clientY-obj.offsetTop;
			document.onmousemove = function(ev){
				var oEvent = ev || event;
				var x = oEvent.clientX-disx;
				var y = oEvent.clientY-disy;

				obj.style.left = x+'px';
				obj.style.top = y+'px';
			};
			document.onmouseup = function(){
			//不允许 超出屏幕
			if (obj.offsetTop < obj.offsetHeight/3) {
				obj.style.top = -obj.offsetHeight*3/4+'px';
				obj2.innerHTML = '拉我出来！';
				obj2.style.right = '-80px';
				obj2.style.top = '55px';
			}else if (obj.offsetLeft < obj.offsetWidth/2) {
				obj.style.left = -obj.offsetWidth*3/4+'px';
				obj2.innerHTML = '拉我出来！';
				obj2.style.right = '-80px';
			}else if (obj.offsetLeft > document.documentElement.clientWidth-obj.offsetWidth*2) {
				obj.style.left = document.documentElement.clientWidth-obj.offsetHeight/4+'px';
				obj2.innerHTML = '拉我出来！';
				obj2.style.right = '80px';
			}else{
				obj2.innerHTML = '碍事就扔在角落里吧！';
				obj2.removeAttribute('style');
			};
			//释放内存
				obj.releaseCapture && obj.releaseCapture();
				document.onmousemove = document.onmouseup = null;
			};
			//阻止默认浏览器行为
			obj.setCapture && obj.setCapture();
			return false;
		};
	};
});