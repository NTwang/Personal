;define(function(require,exports,module){
	//引入模块
	var through = require('through.js');
	var move = require('move.js');
	var fnMethod = require('fnMethod.js')
	var roll = require('scroll.js')
	var drag = require('drag.js')
	var jsonp = require('jsonp.js')
//content
	exports.init = function(){
	//第一区域
	var oS = document.getElementById('sildeshow');
	//第二区域
	var  oD = document.getElementById('displayarea')
	//第三区域
	var oW = document.getElementById('workshow')
	//第四区域
	var oContact = document.getElementById('contact');
	//导航
	var oNavigation = document.getElementById('navigation');
	//取消回弹
	 var fx = Tween.Sine.easeOut;
//全屏动画
(function(){
	var oDoc = document.getElementById('doc');
	var oScreen = document.getElementById('screen');
	var oHr = document.getElementById('crosswise');
	var oHr2 = document.getElementById('vertical-bar');
	var oHr3 = document.getElementById('crosswise-b');
	var oHr4 = document.getElementById('vertical-bar-r');

    var oH3 = oScreen.getElementsByTagName('h3')[0];
    var aDiv = oScreen.getElementsByTagName('div')
	var W = 0;
	var n = 50;
	var m = 1;
	var timer = setInterval(function(){
		W+=2;
		oHr.style.width = W+'%';
		oHr2.style.height = W+'%';
		oHr3.style.width = W+'%';
		oHr4.style.height = W+'%';

		if (W >=100) {
			clearInterval(timer)
		}
	},30)

	setTimeout(function(){
		var timer = setInterval(function(){
			oHr.style.display = 'none';
			oHr2.style.display = 'none';
			n-=2;
			m-=0.04;
			for (var i = 0; i < aDiv.length; i++) {
				// aDiv[i].style.width = n+'%';
				aDiv[i].style.height = n+'%';
				oH3.style.display = 'none';
			}
			oScreen.style.opacity = m;
			if (n < 2) {
				oDoc.style.display = 'block';
				move.move(oDoc,{opacity:1},{easing:fx,duration:1000});
			}
			if (n == 0) {
				clearInterval(timer);
				oScreen.style.display = 'none';
			};
		},30)
	},4000)
})();
// // navigation 导航
(function(){
	var oMove = document.getElementById('move');
	var aNav = fnMethod.getClassName(oNavigation,'nav');
	var oBody = document.getElementById('body');
	var oDictum = document.getElementById('dictum');
	var oRes = fnMethod.getClassName(oNavigation,'response')[0];
	var aLi = oDictum.children;

	var oTitle1 = document.getElementById('title-bar');
	var oTitle2 = document.getElementById('title-bar2');
	var oTitle3 = document.getElementById('title-bar3');
	var left = 0;
	var arr = [oS,oTitle1,oTitle2,oTitle3]
	var bOk = false;
	for (var i = 0; i < aNav.length; i++) {
		aNav[i].index=i;
		aNav[i].onmouseenter = function(){
			move.move(oMove,{left:this.offsetLeft});
		};
		aNav[i].onmouseleave = function(){
			move.move(oMove,{left:left});
		};
		aNav[i].onclick = function(){
			if (this.index == 4) return;	
			if (bOk)return;
			bOk = true;
			for (var i = 0; i < aNav.length; i++) {
				aNav[i].children[0].style.color = '#d1d39e';
			};
			this.children[0].style.color = '#d0d6d9';
			left = this.offsetLeft;
			if (oRes.offsetHeight != 0) {
				oRes.style.height = 0;
				oNavigation.style.borderRadius = '10px 10px 10px 10px';
			}
		//点击导航切换
		function botton(){
			return bOk=false;
		};
		roll.roll(aNav[this.index],arr[this.index],botton);
		
		};	
	};
	oDictum.onmouseover = function(){
		move.move(aLi[0],{marginLeft:200,opacity:0},{ duration:2200})
		move.move(aLi[2],{marginLeft:200,opacity:0},{ duration:2200})
		move.move(aLi[1],{marginRight:200,opacity:0},{ duration:2200})
	}
	oDictum.onmouseout = function(){
		move.move(aLi[0],{marginLeft:0,opacity:1},{ duration:2200})
		move.move(aLi[2],{marginLeft:0,opacity:1},{ duration:2200})
		move.move(aLi[1],{marginRight:0,opacity:1},{ duration:2200})
	}
})();
//轮播图
(function(){
	var oPicture = document.getElementById('picture');
	var oPrev = document.getElementById('prev');
	var oNext = document.getElementById('next');
	var aLi = oPicture.getElementsByTagName('li');
	var aImg = oPicture.getElementsByTagName('img')
	var oLayer = document.getElementById('layer');
	var n = 0;
	var timer = null;
	var bflag = true;
		//布局
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].style.zIndex = i;
			aLi[i].style.opacity = 0.2*(i+1);
			aLi[i].style.top = (4-i)*40+'px';
			aLi[i].style.left = 100*i+'px';

			if (i>=5) {
				n+=1;
				aLi[i].style.zIndex = 8-i;
				aLi[i].style.opacity = 1-0.2*n;
				aLi[i].style.top = (i-4)*40+'px';
				aLi[i].style.left = 100*i+n*100+'px';
			}
		}
		//获取Li和img的信息
		var arr = [];
		for (var i = 0; i < aLi.length; i++) {
			arr.push([parseInt(fnMethod.getStyle(aLi[i],'left')),parseInt(fnMethod.getStyle(aImg[i],'width')),fnMethod.getStyle(aLi[i],'zIndex'),fnMethod.getStyle(aLi[i],'opacity'),parseInt(fnMethod.getStyle(aLi[i],'top'))]);
		}
		//left
		//阻止多次点击 
		function fn(){
			return bflag = true
		};
		oPrev.onclick = function(){
			if (!bflag) return;
			bflag = false;
			arr.push(arr[0]);
			arr.shift();
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].style.zIndex = arr[i][2];
				move.move(aLi[i],{'left':arr[i][0],'opacity':arr[i][3],'top':arr[i][4]},{easing:fx,ocomplete:fn})
				move.move(aImg[i],{'width':arr[i][1]},{easing:fx,complete:fn})
			};
		};
		//right
		oNext.onclick = function(){
			if (!bflag) return;
			bflag = false;
			arr.unshift(arr[arr.length-1]);
			arr.pop();
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].style.zIndex = arr[i][2];
				move.move(aLi[i],{'left':arr[i][0],'opacity':arr[i][3],'top':arr[i][4]},{easing:fx,complete:fn})
				move.move(aImg[i],{'width':arr[i][1]},{easing:fx,complete:fn})
			};
		};
		//aotu
		function show(){
			var timer = setInterval(function(){
				if (!bflag) {
					arr.unshift(arr[arr.length-1]);
					arr.pop();
				}else{
					arr.push(arr[0]);
					arr.shift();
				}
				//var fx = Tween.Sine.easeOut;
				for (var i = 0; i < aLi.length; i++) {
					aLi[i].style.zIndex = arr[i][2];
					move.move(aLi[i],{'left':arr[i][0],'opacity':arr[i][3],'top':arr[i][4]},{easing:fx,duration:1000})
					move.move(aImg[i],{'width':arr[i][1]},{easing:fx,duration:1000})
				};
			},4000)
			oW.onmousemove = function(){
				clearInterval(timer)
			}
			oW.onmouseout = function(){
				show();
			};
		};
		show();

	})();

// & navigation & onscroll & onresize 
(function(){
	var oNavigation = document.getElementById('navigation');
	var oMove = document.getElementById('move');
	var aDiv = oContact.children;
	var oTool = document.getElementById('toolbar');
	var bflag = false;
	var n = -40;
	//var fx = Tween.Sine.easeOut;
	window.onscroll = window.onresize = function(){
		var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
		//导航吸顶
		if (scrollT >100) {
			oNavigation.style.position='fixed';
			move.move(oNavigation,{top:0})
		}else {
			oNavigation.style.position='absolute';
			move.move(oNavigation,{top:40})
		};
		//案例展示
		//添加背景图 
		var oShow = document.getElementById('show');

		function backgroundPic(){
			var aDiv = fnMethod.getClassName(oShow,'view');
			var arr = [];
			// 获取所以位置
			for (var i = 0; i < aDiv.length; i++) {
				arr[i] = {left:aDiv[i].offsetLeft,top:aDiv[i].offsetTop}
			}
			for(var i = 0; i < aDiv.length; i++){
				aDiv[i].style.position = 'absolute';
				aDiv[i].style.top = arr[i].top+'px';
				aDiv[i].style.left = arr[i].left+'px';		
				aDiv[i].style.margin = 0;
				aDiv[i].style.backgroundImage = 'url("images/bg.jpg")';
				aDiv[i].style.backgroundPosition = '-'+arr[i].left+'px -'+arr[i].top+'px';
				move.move(aDiv[i],{opacity:1})
				through.through(aDiv[i]);
			};
		};

		if (scrollT >=720 && scrollT < 1350) {
			(function(){
				var aExplain = fnMethod.getClassName(oShow,'explain');
				var oChange = document.getElementById('exchange');
				var oImg = oChange.getElementsByTagName('img')[0];
				var bflag = true;
				//调用背景图方法
				backgroundPic();
				setTimeout(function(){
					oShow.style.WebkitTransform='perspective(800px) rotateX(60deg)';
				},1500)
				//中间 放大缩小
				oImg.onmouseover = function(){
					move.move(oImg,{width:200,height:98,marginLeft:-50,marginTop:-25},{duration:1000})
				}
				oImg.onmouseout = function(){
					move.move(oImg,{width:100,height:49,marginLeft:0,marginTop:0},{duration:1000})
				}
				oChange.onclick = function(){	
					if (bflag) {
						oShow.style.transform='perspective(0px) rotateX(0deg)';
						bflag = false;
					}else{
						oShow.style.transform='perspective(800px) rotateX(60deg)';
						bflag = true;
					}
				}
			})();
		}else{
			oShow.style.transform='perspective(0px) rotateX(0deg)';
		};

		if (scrollT >= 720) {
			move.move(oTool,{opacity:1});
		};
		if (scrollT < 730) {
			move.move(oTool,{opacity:0});
			move.move(oMove,{left:0});
		};
		if (scrollT >= 730&&scrollT < 1350) {
			move.move(oMove,{left:oMove.offsetWidth});
		};
		if (scrollT >= 1380 && scrollT < 1920) {
			move.move(oMove,{left:oMove.offsetWidth*2});
		};
		if (scrollT >= 1880 ) {
			move.move(oMove,{left:oMove.offsetWidth*3});
			//个人简介左右两个模块
			move.move(aDiv[0],{opacity:1},{easing:fx,duration:2000});
			move.move(aDiv[1],{opacity:1},{easing:fx,duration:2000});
			//个人简介
			(function(){
				var oUl = oContact.getElementsByTagName('ul')[0];
				var aLi = oUl.children;
				//减速
				var iSpeedX = 0;
				var iSpeedY = 0;
				var oldX = 0;
				var oldY = 0;
				var x = 0;
				var y = 0;
				//扩散
				for (var i = 0; i < aLi.length; i++) {
					aLi[i].style.transition = '1s all ease '+(9-i)*100+'ms';
					aLi[i].style.transform = 'rotateY('+360/9*i+'deg) translateZ(200px)';	
				}
				//drag
				oUl.onmousedown = function(ev){
					var disX = ev.pageX-x;
					var disY = ev.pageY-y;

					document.onmousemove = function(ev){
						x = ev.pageX-disX;
						y = ev.pageY-disY;
						oUl.style.transform = 'perspective(800px) rotateX('+-y/5+'deg) rotateY('+x/5+'deg)';
						//实时更新
						iSpeedX = ev.pageX - oldX;
						iSpeedY = ev.pageY - oldY;

						oldX = ev.pageX;
						oldY = ev.pageY;
						return false;
					};
					document.onmouseup = function(){
						document.onmousemove = document.onmouseup = null;
						oUl.timer  = setInterval(function(){
							iSpeedX*=0.95;
							iSpeedY*=0.95;
							//减速
							x+=iSpeedX;
							y+=iSpeedY;
							oUl.style.transform = 'perspective(800px) rotateX('+-y/5+'deg) rotateY('+x/5+'deg)';

							if (Math.abs(iSpeedX)<1) iSpeedX = 0;
							if (Math.abs(iSpeedY)<1) iSpeedY = 0;

							if (iSpeedX == 0 && iSpeedY == 0) {
								clearInterval(oUl.timer)
							}
						},16)
					};
					return false;
				};
			})();
		};
		if (bflag) {
			clearInterval(oTop.timer)
		};
		bflag = true;
	
	//显示百分比
	(function(){
		var oP = document.getElementById('percent')
		var oC = document.getElementById('percent-canvas');
		var oS = oP.getElementsByTagName('span')[0];
		var H = document.body.scrollHeight;
		var clientH = document.documentElement.clientHeight;
		var scale = (scrollT+clientH)/H;
		//拖拽
		drag.drag(oP,oS)
		var gd = oC.getContext('2d');
		//公共样式
		gd.clearRect(0,0,oC.width,oC.height);
		//背景圆
		gd.beginPath();
		gd.lineWidth = 10;
		gd.strokeStyle = 'skyblue';
		gd.arc(35,35,30,fnMethod.d2a(0),fnMethod.d2a(360),false);
		gd.stroke();

		//进度圆
		gd.beginPath();
		gd.strokeStyle = 'rgb('+Math.floor(scale*255)+','+Math.floor(scale*201)+',165)';
		gd.arc(35,35,30,fnMethod.d2a(-90),fnMethod.d2a(scale*360-90),false);
		gd.stroke();

		//显示百分比
		
		gd.beginPath();
		var percent = fnMethod.toPercent(scale)
		gd.strokeStyle = '#d1d39e';
		gd.lineWidth = 2;
		gd.font = '10px Microsoft YaHei';
		gd.strokeText(percent,12,38);
	})();
}
	//Back to top
	var oToolbar = document.getElementById('toolbar')
	var oTop = document.getElementById('top');
	oTop.onclick = function(){
		var start = document.documentElement.scrollTop || document.body.scrollTop;
		var end = 0;
			var dis = end -start;//运动的距离
			var count = Math.floor(3000/30);//需要的次数
			var n = 0;//进行的次数
			clearInterval(oTop.timer);
			oTop.timer = setInterval(function(){
				n++;
				// 现在的scrollTop 值
				//var cur = start + dis*n/count(n/count * dis 实际走的距离)
				var a = 1-n/count;
				var cur = start+dis*(1-Math.pow(a,3));
				bflag = false;
				document.documentElement.scrollTop = document.body.scrollTop = cur;
				if (n == count) {
					clearInterval(oTop.timer)
				}
			},30)
		}
	})();
//max-width320
(function(){
	var oRes = fnMethod.getClassName(oNavigation,'response')[0];
	var oPar = fnMethod.getClassName(oNavigation,'pattern')[0];
	oPar.onclick = function(){
		if (parseInt(fnMethod.getStyle(oRes,'height')) == 0) {

			move(oRes,{height:175});
			oNavigation.style.borderRadius = '10px 10px 0px 0px';
		}else{
			move(oRes,{height:0})
			oNavigation.style.borderRadius = '10px 10px 10px 10px';
		}
	}
})();
//双击滚屏
(function(){
	//双击自动滚屏  
	var timer = null;  
	document.onmousedown = function () {  
		clearInterval(timer);  
	};  ;
	document.ondblclick =function () {  
  		 timer = setInterval(function(){
  		 	window.scrollBy(0, 2); 
  		 }, 30); //设置滚动的速度  
	}; 
})();
//天气数据 
(function(){
	var oT = document.getElementById('t1');
	var oDetail = document.getElementById('detail-weather');
	var aDiv = oT.getElementsByTagName('div');
	jsonp.jsonp({
		url:'http://api.map.baidu.com/telematics/v3/weather',
		//?location=北京&output=json&ak=yourkey
		data:{
			location:aDiv[0].innerHTML,
			output:'json',
			ak:'tQydkkwXfEtSNgvAEHUr1v6u0GbXUvZo',
		},
		cbName:'callback',
		success:function(json){
			var arr = json.results;
			var detail =  arr[0];
			var weather = detail.weather_data;
			//添加数据
			var oDate = new Date();
			var oH = oDate.getHours();
			//四天的天气 图片
			var lightNight = '';
			var lightNight1 = '';
			var lightNight2 = '';
			var lightNight3 = '';

			if (oH > 6 && oH < 18) {
				lightNight = weather[0].dayPictureUrl;
				lightNight1 = weather[1].dayPictureUrl;
				lightNight2 = weather[2].dayPictureUrl;
				lightNight3 = weather[3].dayPictureUrl;
			}else{
				lightNight = weather[0].nightPictureUrl;
				lightNight1 = weather[1].nightPictureUrl;
				lightNight2 = weather[2].nightPictureUrl;
				lightNight3 = weather[3].nightPictureUrl;
			}
			oT.innerHTML = '<div class="city fl">'+detail.currentCity+'</div>'+
			'<div class="weather fl"><img src="'+lightNight+'"></div>'+
			'<div class="temperature fl">'+weather[0].temperature+'<span></span></div>'+
			'<div class="air fl">空气指数：<span>'+detail.pm25+'</span></div>'+
			'<div class="more">&nbsp;&nbsp;更多</div>';
			var oDiv = oT.children[3];
			var oS = oDiv.children[0];
			//pm 值背景色
			if (detail.pm25 <= 50) {
				oS.style.background = '#01cc00';
			};
			if (detail.pm25 > 50 && detail.pm25 <= 100) {
				oS.style.background = '#ffff00';
			};
			if (detail.pm25 > 100 && detail.pm25 <=150) {
				oS.style.background = '#eb8a15';
			};
			if (detail.pm25 > 150 && detail.pm25 <= 200) {
				oS.style.background = '#fe0000';
			};
			if (detail.pm25 > 200 && detail.pm25 <= 300) {
				oS.style.background = '#993365';
			};
			if (detail.pm25 > 300 ) {
				oS.style.background = '#8f474a';
			};
			//更多天气
			oDetail.style.fontSize = '12px';
			oDetail.innerHTML = '<ul class="clearFix">'+
				'<li>'+weather[1].date+'</li>'+
				'<li><img src="'+lightNight1+'" alt="" /></li>'+
				'<li class="oDetail-tem">'+weather[1].temperature+'</li>'+
				'<li class="wind">'+weather[1].wind+'</li>'+
				'<li><span>'+weather[1].weather+'</span></li>'+     
			'</ul>'+
			'<ul class="clearFix">'+
				'<li>'+weather[2].date+'</li>'+
				'<li><img src="'+lightNight2+'" alt="" /></li>'+
				'<li class="oDetail-tem">'+weather[2].temperature+'</li>'+
				'<li class="wind">'+weather[2].wind+'</li>'+
				'<li><span>'+weather[2].weather+'</span></li>'+
			'</ul>'+
			'<ul class="clearFix">'+
				'<li>'+weather[3].date+'</li>'+
				'<li><img src="'+lightNight3+'" alt="" /></li>'+
				'<li class="oDetail-tem">'+weather[3].temperature+'</li>'+
				'<li class="wind">'+weather[3].wind+'</li>'+
				'<li><span>'+weather[3].weather+'</span></li>'+
			'</ul>'
			var oMore = oT.children[4];
			oMore.onclick = function(){
				if (parseInt(fnMethod.getStyle(oDetail,'height')) == 0) {
					oMore.innerHTML = '&nbsp;&nbsp;收起';
					oDetail.style.transition = '1s opacity ease';
					oDetail.style.opacity = '1'
					move.move(oDetail,{height:150},{duration:1000})
				 }else{
				 	oMore.innerHTML = '&nbsp;&nbsp;更多';
				 	oDetail.style.transition = '0.5s opacity ease';
					oDetail.style.opacity = '0';
				 	move.move(oDetail,{height:0},{duration:1000})
				 }
			}
		}
	})
})();
}
})