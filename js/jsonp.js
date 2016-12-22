;define(function(require,exports,module){
	//jsonp
	var json2Url = require('fnMethod.js')
	exports.jsonp = function(json){
		//判断是否有url
		if (!json.url) {
			alert('没有ur');
			return;
		};

		json.data = json.data || {};
		json.cbName = json.cbName || 'cb';
		//函数随机 房主ie 缓存
		var fnName = 'show'+Math.random();
		fnName = fnName.replace('.','');
		window[fnName] = function(json2){
			json.success && json.success(json2);
			oHead.removeChild(oS);
		}
		var oS = document.createElement('script');
		// ?wd='+oT.value+'&cb=
		json.data[json.cbName] = fnName;
		oS.src=json.url+'?'+json2Url.json2Url(json.data);
		var oHead = document.getElementsByTagName('head')[0];
		oHead.appendChild(oS);
	};
});