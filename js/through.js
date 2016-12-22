;define(function(require,exports,module){
	//判断方位
	;function getDir(obj,ev){
		var x = obj.getBoundingClientRect().left+obj.offsetWidth/2-ev.clientX;
		var y = obj.getBoundingClientRect().top+obj.offsetHeight/2-ev.clientY;
		return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
	}
//through-wall 修改
exports.through = function (obj){
	var obj2 = obj.children[0];
	var W = obj2.offsetWidth;
	var H = obj.offsetHeight;
	obj.onmouseenter = function(ev){
		var oEvent = ev || event;
		var dir = getDir(this,oEvent);
		//判断四个方向
		switch(dir){
			case 0:
			obj2.style.left = W+'px';
			obj2.style.top = 0+'px';
			break;
			case 1:
			obj2.style.left = 0+'px';
			obj2.style.top = H+'px';
			break;
			case 2:
			obj2.style.left = -W+'px';
			obj2.style.top = 0+'px';
			break;
			case 3:
			obj2.style.left = 0+'px';
			obj2.style.top = -H+'px';
			break;
		}
		obj2.style.left = 0;
		obj2.style.top = 0
		obj2.style.transform = 'rotateX(180deg) scale(-1,-1)';
	}
	obj.onmouseleave = function(ev){
		var oEvent = ev || event;
		var dir = getDir(this,oEvent);
		//以Y轴旋转离开 缩放倍数
		switch(dir){
			case 0:
			obj2.style.left = W+'px';
			obj2.style.top = 0;
			obj2.style.transform = 'rotateY(180deg) scale(-1,-1)';
			break;
			case 1:
			obj2.style.left = 0+'px';
			obj2.style.top = H+'px';
			obj2.style.transform = 'rotateY(180deg) scale(-1,-1)';
			break;
			case 2:
			obj2.style.left = -W+'px';
			obj2.style.top = 0;
			obj2.style.transformOrgin = 'center'
			obj2.style.transform = 'rotateY(180deg) scale(-1,-1)';
			break;
			case 3:
			obj2.style.left = 0+'px';
			obj2.style.top = -H+'px';
			obj2.style.transform = 'rotateY(180deg) scale(-1,-1)';
			break;
		}
	}
};
})