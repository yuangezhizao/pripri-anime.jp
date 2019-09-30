/*
* Utils.js v3.0.2
* Copyright (c) ULM design Co.,Ltd. - http://www.ulm-design.com
* Last update 140724
* Author: mitsut
*/

/*--//////////////////////////////////////////
	
@getDocumentSize

return w,h

//////////////////////////////////////////--*/	
function getDocumentSize(){
	
   return{
	   w:document.documentElement.scrollWidth || document.body.scrollWidth,
	   h:document.documentElement.scrollHeight || document.body.scrollHeight
   };
}




/*--//////////////////////////////////////////
	
@getWindowSize

return w,h

//////////////////////////////////////////--*/	
function getWindowSize(){
	
   if(document.documentElement){
	   return {w:document.documentElement.clientWidth,h:document.documentElement.clientHeight};
   }
   
   if(document.body){
	   return {w:document.body.clientWidth,h:document.body.clientHeight};
   }
   
   if(window.innerWidth){
	   return{w:window.innerWidth,h:window.innerHeight};
   }
   
   return null;
}




/*--//////////////////////////////////////////
	
@getScrollLocation

return left,top

//////////////////////////////////////////--*/
function getScrollLocation(){
   return {
	   left:document.documentElement.scrollLeft || document.body.scrollLeft,
	   top:document.documentElement.scrollTop || document.body.scrollTop
	}
}



/*--//////////////////////////////////////////
	
browser
	
//////////////////////////////////////////--*/
function getUA(){
	var param = {
		'iOS': false,
		'name':"",
		'tablet':false,
		'version':""
	};
		
	var ua = navigator.userAgent;
	var name = navigator.appName;
	var version = navigator.appVersion;
	
	if(ua.indexOf("MSIE 6.") !=-1){
		param.name ="IE6";
		param.version =6;
	}else if(ua.indexOf('MSIE 7.') != -1){
		param.name ="IE7";
		param.version =7;
	}else if(ua.indexOf('MSIE 8.') != -1){
		param.name ="IE8";
		param.version =8;
	}else if(ua.indexOf('MSIE 9.') != -1){
		param.name ="IE9";
		param.version =9;
	}else if(ua.indexOf('MSIE 10.') != -1){
		param.name ="IE10";
		param.version =10;
	}
	
	
	if(ua.indexOf('iPhone') != -1){
		
		param.iOS = true;
		param.name ="iPhone";
		
	}else if(ua.indexOf('iPad') != -1){
		
		param.iOS = true;
		param.tablet =true;
		param.name ="iPad";
		
	}else if(ua.indexOf('Android') != -1){
		
		param.name ="Android";
		
		if(ua.indexOf("mobile") ==-1){
			param.tablet =true;
		}
		
	}else if( name.indexOf("Opera") != -1){
		
		param.name ="Opera";
  	}else{
		
		if ( version.indexOf("Safari") != -1){
			if( version.indexOf("Chrome") != -1){
				param.name ="Chrome";
			}else{
				param.name ="safari";
			}
		}else{
			if( ua.indexOf("Firefox") != -1 ){
				param.name ="FireFox";
			}else{
			}
		
		}
	}
		
	return param;
}






/*--//////////////////////////////////////////
	
hash
	
//////////////////////////////////////////--*/
function getHash(){
	var hash = window.location.hash.replace('#', '');
	if(hash ==""){
		return null;
	}else{
		return hash;
	}
	
}



function getQueryString () {
	
    var arr = new Array();
 
    var searchStr = window.location.search;
    if ( searchStr == "" ) {return null;}
	
	
    var params = searchStr.substring( 1 ).split( "&" );
    for ( var i = 0; i < params.length; i++ ) {
		
        var val = params[i].split( "=" );
 
        // ハッシュに値を登録する
        if ( val.length == 1 ) {
            arr[ val[0] ] = "";
        } else {
            arr[ val[0] ] = val[1];
        }
    }
    return arr;
}





/*--//////////////////////////////////////////
	
trace
	
//////////////////////////////////////////--*/
function tracer(__txt,__value){
	try{
		if(__value){
			console.log(__txt+": "+__value);
		}else{
			console.log(__txt)
		}
	}catch(n){}
}





/*--//////////////////////////////////////////
	
openwindow
	
//////////////////////////////////////////--*/
function openWindow(__url,__name){
	
	var _loc2;
	if(__name=="undefined"){
		_loc2 ="window";
	}else{
		_loc2 =__name;
	}
	
	window.open(__url,_loc2);
};





/*--//////////////////////////////////////////
	
checkSP
	
//////////////////////////////////////////--*/
function checkSP(browser){
	
	if( browser.name=="iPad" || browser.name=="iPhone" || browser.name=="Android") {
		return true;
	}else{
		return false;
	}
};




/*--//////////////////////////////////////////
	
changeImage
	
//////////////////////////////////////////--*/
function changeImg(){
		
	var image_cache = new Object();
//	$("img[src *='_off.'],input[type=image],._onoff").not().each(function () {
	$("input[type=image],._changeImg").not().each(function () {
		
		var imgsrc = $(this).attr("src");
		var imgsrc_ov = imgsrc.replace('_off.','_on.');
			
		$(this).hover(function () {
			if($(this).hasClass("no-change")){return;}
			this.src = imgsrc_ov;
			
		}, function () {
			if($(this).hasClass("no-change")){return;}
			this.src = imgsrc;
		});
	});
};




/*--//////////////////////////////////////////
	
isSp
	
//////////////////////////////////////////--*/
function isSphone(browser){
	if( browser.name=="iPhone" || browser.name=="Android") {
		return true;
	}else{
		return false;
	}
};




/*--//////////////////////////////////////////
	
importJS
	
//////////////////////////////////////////--*/
function importJS(_arg) {
	
    if (! new Array().push) return false;
	
	if(typeof(_arg) == "object"){
		
		for (var i=0; i< _arg.length; i++) {
			document.write('<script type=\"text/javascript\" src=\"' + _arg[i] + '\"></script>');
    	}
	}else{
		tracer("importJS:::: arg is not object");
	}
}




var Utils = (function(){
	
	var browser;
	var scrollTarget;
	var isVisited = false;
	
	
	/*--//////////////////////////////////////////
	
	public
	
	//////////////////////////////////////////--*/
	function init(){
		
		//console.log("utils.init");
		//
		browser = getUA();
		
		/*
		//cookie
		var _cookieName = Config.getCookie();
		if($.cookie(_cookieName)){
			isVisited =true;
		}else{
			$.cookie(_cookieName, "visited", { expires: 30 });
			if(window.location.hash){
				isVisited =true;
			}else{
			}
		};
		*/
		
	};
	
	
	function getBrowser(){
		return browser;
	};
	
	
	function getIsVisited(){
		return isVisited;
	}
	
	function setIsVisited(__flg){
		isVisited =__flg;
	}
	
	
	
	
	
	
	
	/*--//////////////////////////////////////////
	
	scroll
	
	//////////////////////////////////////////--*/
	function getScrollTarget(){
		
		if( scrollTarget ==null){
			scrollTarget = $($.browser.webkit ? 'body' : 'html');
		}
		return scrollTarget;
		
	}
	
	
	
	/*--//////////////////////////////////////////
	
	hashScroll
	
	//////////////////////////////////////////--*/
	function hashScroll(){
		
		$("a[href*=#]").click(function() {
									  
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				
			$(this).blur();
				
			var t = navigator.appName.match(/Opera/) ? "html" : "html,body";
				
			$(t).queue([]).stop();
				
			var $targetElement = $(this.hash);
			
			var scrollPos = $targetElement.offset().top;
			
			var maxScroll = document.documentElement.scrollHeight || document.body.scrollHeight;	
			if (scrollPos > maxScroll){
				scrollPos = maxScroll;
			}//end if
			
			var time = 800;
			var easing = "easeOutQuad";
			
			$(t).animate({ scrollTop: scrollPos }, time, easing);
			return false;
		}//end if
	 });//end of function
	};
	
	
	/*-------------------------------
	
    smoothScroll
	
    --------------------------------*/
	function smoothScroll(__pos, __callback, __time){
		
		var SCROLL_TIME =1000;
		var EASING ="easeOutCubic";
		
		if (typeof __time == 'undefined') __time = SCROLL_TIME;
		if(!__callback) __callback = function() {};
		
		//var pos = __target.position ? __target.position().top : __target;
		
		var _scrollTarget = getScrollTarget();
		
		_scrollTarget.stop().animate(
			{'scrollTop': __pos}, {duration:__time, easing:EASING, complete:__callback}
		);
		return false;
	};
	
	
	
	
	
	return {
		init:init,
		getScrollTarget:getScrollTarget,
		getBrowser:getBrowser,
		getIsVisited: getIsVisited,
		setIsVisited : setIsVisited,
		hashScroll:hashScroll,
		smoothScroll:smoothScroll
	}
	
})();