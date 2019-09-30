/************************************************

@PC - common.js

(c) ULM Co.,Ltd. - https://www.ulm-design.com
************************************************/
/**************************************************

global

**************************************************/
const WINDOW   = $(window),
      WRAPPER  = $('#wrapper'),
      DOCUMENT = $(document);

var DEF_W = 1024,//ブラウザの最小横幅(px)
    DEF_H = 650; //ブラウザの最小縦幅(px)

const BREAK_POINT = 900;


/*
初回モーダル
--------------------------*/
//動画再生のフラグ
var _isPlayingMovie = false;

/*
testモード
--------------------------*/
const IS_TEST = false;//TESTモードにする場合はtrueに

if(IS_TEST) {
  //stats.js
  var script2 = document.createElement('script');
  script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r8/Stats.min.js';
  document.body.appendChild(script2);
  script2.onload = (function(){ Common.initStats(); });

  //開発者ツール表示
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/eruda';
  document.body.appendChild(script);
  script.onload = (function(){ eruda.init(); });
}//endif


/**************************************************

@cookie

**************************************************/
const COOKIE       = 'pripri_movie',
      COOKIE_VALUE = 'v0';


/**************************************************

movie設定

**************************************************/
const MODAL_CONTAINER_NAME = 'modal-iframe',
      MODAL_CONTAINER      = '#' + MODAL_CONTAINER_NAME,
      MOVIE_W              = 853, //デフォルトの横幅
      MOVIE_H              = 480, //デフォルトの縦幅
      MOVIE_MARGIN         = 50,  //左右のマージン
      MOVIE_NAVI_BTN_H     = 40,  //ナビのボタンの高さ
      MOVIE_NAVI_BTN_LINE  = 0,   //何行か
      MOVIE_NAVI_H         = MOVIE_NAVI_BTN_H * MOVIE_NAVI_BTN_LINE, //ナビの高さ(デフォルト50)
      MOVIE_CLOSE_H        = 60,  //閉じるボタンの高さ
      MOVIE_URL           = 'modal_movie/';

/*
@getMovieParams
-------------------------------*/
function getMovieParams() {
  
  var w    = (WINDOW.width() - MOVIE_MARGIN) >> 0,
      h    = MOVIE_H * (w / MOVIE_W) + MOVIE_NAVI_H + MOVIE_CLOSE_H >> 0,
      maxH = (WINDOW.height() - MOVIE_MARGIN) >> 0;

  if(h > maxH) {
    h = maxH;
    w = MOVIE_W * ((h - MOVIE_NAVI_H - MOVIE_CLOSE_H) / MOVIE_H) >> 0;
  }

  return {
    'w'     : w,
    'h'     : h,
    'movieW': MOVIE_W,
    'movieH': MOVIE_H,
    'closeH': MOVIE_CLOSE_H,
    'url'   : MOVIE_URL
  }

}//getMovieParams


/**************************************************

navi設定

**************************************************/
const NAVI_DATA = [];


/**************************************************

snsボタン設定

**************************************************/
const SNS_URL  = ''; //サイトURL
const SNS_DATA = [];


/*******************************************************

banner設定

*******************************************************/
const BANNER_IMG_PATH = 'assets/img/common/bnr/';
const BANNER_DATA     = [];



/**************************************************************************************************************


Common


***************************************************************************************************************/
const Common = ( function() {
	
	//IEチェック
	var _isIE = checkIE(); // 返り値(true or false)

  /*******************************************************

  @init

  ********************************************************/
  function init() {

		//右クリック禁止(bodyに.protectがある場合)
		if($('body').hasClass('protect')) {
			$('body').on('contextmenu',function(e){
        return false;
    	});
		}

    /*
    SNS小窓
    ----------------------------------*/
    openSnsWindow('.share-link-btn');

    /*
    loadImg 
    ----------------------------------*/
    var images = $('img');
    var txt    = $('#progress-txt');
    var _imgLoadedNum = 0;
    _allImgNum = images.length;

    images.each(function() {
      $(this).imagesLoaded(function() {
        _imgLoadedNum++;
        txt.text(String(Math.floor((_imgLoadedNum/_allImgNum)*100)+'%'));
      });
    });
    
  }//init

  /*******************************************************

  hidePreloader

  ********************************************************/
  function hidePreloader() {

    $('#preloader').delay(100).animate({'opacity':0}, 500, 'linear', function() {
      $('#preloader').remove();
      Contents.setConfig();
    });
    
  }//hidePreloader


  /*******************************************************

  @showMovie

  ********************************************************/
  function showMovie(__id, __target,__baseurl) {
    
		if( !checkSP() ) {
      
      console.log('click')
      
      if(_isPlayingMovie){ return; }//再生中の場合、処理を止める

      _isPlayingMovie = true;//再生中のフラグ立てる
      
      //バグ回避
      $(MODAL_CONTAINER).remove();
      
      if(!$(MODAL_CONTAINER).length) {
        var modalHtml = '<div id="'+MODAL_CONTAINER_NAME+'"><div class="modal-iframe-close"><a data-izimodal-close=""></a></div></div>';
        $('body').append(modalHtml);
      }

      //movieの設定
      var params = getMovieParams(),
          url    = __baseurl + params.url;

			if(__id != null) {
				url += '?id=' + __id;
			}

      $(MODAL_CONTAINER).iziModal({
        iframe       : true, //iframeを利用
        width        : params.w, //横幅
        iframeHeight : params.h-params.closeH, //iframeの高さ
        closeButton  : true,
        iframeURL    : url, //iframe内に表示するurl
        background   : 'none',
        overlayColor : 'rgba(0,0,0,.9)',
        zindex       : 100000,
        transitionIn : "comingIn",//「comingIn」「bounceInDown」「bounceInUp」「fadeInDown」「fadeInUp」「fadeInLeft」「fadeInRight」「flipInX」
        transitionOut: "comingOut",//「comingOut」「bounceOutDown」「bounceOutUp」「fadeOutDown」「fadeOutUp」「fadeOutLeft」「fadeOutRight」「flipOutX」
        onResize: function(){},onClosed: function() {
          onCompleteMovie();
        }
      });

      $(MODAL_CONTAINER).iziModal('open');
      
    } else {
			var pv = '<iframe class="youtube" width="560" height="315" src="https://www.youtube.com/embed/'+__id+'?rel=0" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>';
			
			$(__target).html(pv).attr({'onClick':''})
			
			_isPlayingMovie = false;
    }

  }//showMovie


  /*******************************************************

  @onCompleteMovie

  ********************************************************/
  function onCompleteMovie() {
    $(MODAL_CONTAINER).iziModal('close');
    _isPlayingMovie = false;
  }//onCompleteMovie

  /*---------------------------------------------
  PRIVATE
  ---------------------------------------------*/
  function render(){
    window.requestAnimationFrame(render);
    if(_stats){ _stats.update(); }
  }


  /*---------------------------------------------
  @STATS
  ---------------------------------------------*/
  function initStats(){
    _stats = new Stats();
    _stats.domElement.style.position = 'fixed';
    _stats.domElement.style.left = '0px';
    _stats.domElement.style.top = '0px';
    document.body.appendChild(_stats.domElement);
		
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		window.requestAnimationFrame = requestAnimationFrame;
    
		render();
	}
	
  return{
    init:init,
		hidePreloader:hidePreloader,
		showMovie:showMovie,
		onCompleteMovie:onCompleteMovie,
    initStats:initStats
  }

})();

/*******************************************************

@checkSP

********************************************************/
function checkSP(){

  if( $(window).width() >= BREAK_POINT ) {
    //PCの時はfalseを返す
    _isSP = false;
  }else{
    //スマホの時はtrueを返す
    _isSP = true;
  }

  return _isSP;

}


/*******************************************************

Navi

********************************************************/
var Navi = (function(){

  var _scrollPosition;
  var _isOpenDrawer = false;
  var _isTop;
  
  var drawerContainer = $("#drawer-container");

  /*******************************************************

  init

  ********************************************************/
  function init(){
    
    //topページかどうか
    /*_isTop = Common.getIsTop();*/

    $("#drawer-btn").on('click', function(){
      if(!_isOpenDrawer){
        showDrawer();
      }else{
        hideDrawer();
      }
    });

    $(window).on('load', function(){

      //固定メニュー
      $('#nav-trailer').on('click', function(){
        watchMovie();
      });//click

    });//load

  }//init


  /*******************************************************

  watchTrailer

  ********************************************************/
  function watchMovie(){
    
    if(!_isTop){

    }else{
      scrollTopMovie();
      hideDrawer();
    }
    
  }//watchMovie



  /*******************************************************

  showDrawer

  ********************************************************/
  function showDrawer(){

    //アニメーションが終わるまでtouchイベントを禁止する
    $(window).on('touchmove.noScroll', function(e) {
      e.preventDefault();
    });

    //naviを開いたときのスクロール量を取得
    _scrollPosition = $(window).scrollTop();

    //drawer-btnにclassをふってアニメーションさせる
    $(".drawer-line").addClass("open");

    //drawer全体のアニメーション
    drawerContainer.css({"display":"block"}).stop().animate({"opacity" : 1},600,'easeOutQuart',function(){

      //touchイベント禁止解除
      $(window).off('.noScroll');
      
      onShowDrawer();

    });

  }//showDrawer


  function onShowDrawer(){
    
    _isOpenDrawer = true;
    
  }


  /*******************************************************

  hideDrawer

  ********************************************************/
  function hideDrawer(){

    //アニメーションが終わるまでtouchイベントを禁止する
    $(window).on('touchmove.noScroll', function(e) {
      e.preventDefault();
    });

    //naviを開いたときの場所までスクロール
    $(window).scrollTop(_scrollPosition);

    //drawer-btnにclassをふってアニメーションさせる
    $(".drawer-line").removeClass("open");

    //naviアニメーション
    drawerContainer.stop().animate({"opacity" : 0},600,'easeOutQuart',function(){
      
      $(this).css({"display":"none"});
      
      //touchイベント禁止解除
      $(window).off('.noScroll');
      
      onHideDrawer();
      
    });

  }//hideDrawer

  function onHideDrawer(){
    
    _isOpenDrawer = false;
    
  }
  
	/*******************************************************
	
	scrollTopMovie(指定位置にページをスクロール)
	
	********************************************************/
	function scrollTopMovie(){
		
		var movieTop = $("#movie-container").offset().top - 60;
    _scrollPosition = movieTop;
    
	}


  return{
    init:init
  }


})();


/*******************
@ready
*******************/
Navi.init();



/*******************
@ready
*******************/
Common.init();

/*******************
動画再生終了後modalを閉じる
*******************/
function closeModalBox() {
  Common.onCompleteMovie();
}