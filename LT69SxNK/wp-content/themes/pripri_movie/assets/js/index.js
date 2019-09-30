/************************************************

@PC - index.js

version: 6.0

(c) ULM Co.,Ltd. - https://www.ulm-design.com
************************************************/
const Contents = (function(){

  const contentsName = 'top';

  /*--------------------------
  userAgent
  --------------------------*/
  const ua = window.navigator.userAgent.toLowerCase();

  /*--------------------------
  cookie
  --------------------------*/
  var _isVisited = false;

  /*--------------------------
  loadImg
  --------------------------*/
  var _allImgNum = 0;
  var _imgLoadedNum = 0;

  /*--------------------------
  params
  --------------------------*/
  var _isInit = false;
  var _isOpenContents = false;
	
  var _stats;
	

	/*******************************************************

	init

	********************************************************/
  function init(){
    

    /*----------------------------------
    コンテンツごとに処理分け
    ----------------------------------*/
    var contents_name = $('#main').data('id');
    
    console.log(contents_name);
    
    switch(contents_name) {
        
      case 'top':
        topInit();
      break;
      case 'news':
        newsInit();
      break;
      case 'staffcast':
        staffcastInit();
      break;
      case 'story':
        storyInit();
      break;
      case 'character':
        characterInit();
      break;
      case 'special':
        specialInit();
      break;
      default:
      break;
    }
    

    /*----------------------------------
    onLoadImg
    ----------------------------------*/
    $(window).on('load', function() {
      
      //objectFitImages('img.object-fit-img');

      if(!IS_TEST){
        //読み込みが完了したらhidePreloaderを呼ぶ。
        $('#progress-txt').text('100%');
        Common.hidePreloader();
      }else{
        //TESTモードの場合。
        $('#preloader').css({'display':'none'});
        setConfig();
      }

    });//load

	}//init
	
	
  /*******************************************************

  setConfig

  ********************************************************/
  function setConfig() {

    onInit();

  }//setConfig

  
  /*******************************************************

  @onClosedMovie

  ********************************************************/
  function onClosedMovie() {

  }//onClosedMovie

  
  /*******************************************************

  @onInit

  ********************************************************/
  function onInit() {
    
    _isInit = true;

  }//onInit

	
	/*******************************************************
	
	@topInit
	
	********************************************************/
  function topInit() {
		
    console.log('topInit');
    
    var pvBoxLength = $('.top-pv-box').length;
    
    if(pvBoxLength > 1) {

      var swiper = new Swiper('#top-pv-box-container', {
        speed: 500,
        slidesPerView: 2.8,
        spaceBetween: 20,
        centeredSlides : true,
        loop: true,
        initialSlide: 0,
        paginationClickable: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
          900: {
            slidesPerView: 1.2,
            spaceBetween: 10
          }
        }
      });
      
    } else {
      
      $('.swiper-pagination').remove();
      $('.swiper-button-prev').remove();
      $('.swiper-button-next').remove();
      
      $('#top-pv-box-container-inner').addClass('flex-wrap-center').removeClass('swiper-wrapper');
      $('.top-pv-box').removeClass('swiper-slide');
      
    }
  }//topInit
  
	/*******************************************************
	
	@newsInit
	
	********************************************************/
  function newsInit() {
		
    console.log('newsInit')
  
  }//newsInit
	
	/*******************************************************
	
	@staffcastInit
	
	********************************************************/
  function staffcastInit() {
		
    console.log('staffcastInit')
  
  }//staffcastInit
	
	/*******************************************************
	
	@storyInit
	
	********************************************************/
  function storyInit() {
		
    console.log('storyInit')
  
  }//storyInit
	
	/*******************************************************
	
	@characterInit
	
	********************************************************/
  function characterInit() {
		
    console.log('characterInit')
    
    /*----------------------------------
    param
    ----------------------------------*/
    var charaBox = $('.character-box')
    var _currentCharaNum = 0;
    var _currentCharaImgNum = 0;
    
    /*----------------------------------
    init
    ----------------------------------*/
    changeChara(0);
    
    //キャラ切り替え
    $('#character-nav-list').find('.character-nav-btn').each(function(i) {
      $(this).on('click', function() {
        
        if( $(this).hasClass('act') ) { return; }
        
        changeChara(i);
      })
    });
    
    /*******************************************************

    @changeChara

    ********************************************************/
    function changeChara(__id) {

      //Boxのセット
      charaBox.css({'display':'none','opacity':0}).eq(__id).css({'display':'block'});

      //画像の読み込み(1枚目のみ)
      var charaImg = charaBox.eq(__id).find('.character-img-box').find('.character-img').eq(0);
      var charaImgData = charaImg.data('src');
      charaImg.attr({'src':charaImgData});

      //画像の初期化
      charaBox.eq(__id).find('.character-img-box').find('.character-img').css({'opacity':0,'display':'none'});
      charaImg.css({'opacity':1,'display':'block'});

      //画像切り替えナビの初期化
      charaBox.eq(__id).find('.character-change-nav').find('.character-change-nav-btn').removeClass('act').eq(0).addClass('act');

      //画像の読み込みが完了したらフェードイン
      $(charaImg).imagesLoaded(function() {
        charaBox.stop().animate({'opacity':1},1000,'easeOutQuart');
      });

      //ナビのactive切り替え
      $('#character-nav-list').find('.character-nav-btn').each(function(i){
        if(i == __id) {
          $(this).addClass('act');
        } else {
          $(this).removeClass('act');
        }
      });

      //キャラ画像切り替え
      charaBox.eq(__id).find('.character-change-nav').find('.character-change-nav-btn').unbind('click').each(function(i) {
        $(this).on('click', function() {

          if( $(this).hasClass('act') ) { return; }

          changeCharaImg(i,this);
        })
      });

    }//changeChara

    /*******************************************************

    @changeCharaImg

    ********************************************************/
    function changeCharaImg(__id,__this) {
      
      var targetCurrent = $(__this).data('current');
      
      console.log(targetCurrent)
      
      var target = $(__this).parents('.character-txt-box');
      //var target = __this.closest('.character-txt-box');
      var targetBox = $(target).prev('.character-img-box');
      targetBox.find('.character-img').css({'opacity':0,'display':'none'});

      //画像の読み込み
      var targetImg = targetBox.find('.character-img').eq(__id);
      var targetImgData = targetImg.data('src');
      targetImg.attr({'src':targetImgData});

      //画像の読み込みが完了したらフェードイン
      $(targetImg).imagesLoaded(function() {
        targetImg.css({'display':'block'}).stop().animate({'opacity':1},1000,'easeOutQuart');
      });

      var nav_btn = $(__this).parents('.character-change-nav');
      
      $(nav_btn).find('.character-change-nav-box').each(function(i) {
        
        if(i == __id) {
          $(this).find('.character-change-nav-btn').addClass('act');
        } else {
          $(this).find('.character-change-nav-btn').removeClass('act');
        }
        
      });
      
    }
    
  
  }//characterInit
	
	/*******************************************************
	
	@specialInit
	
	********************************************************/
  function specialInit() {
		
    console.log('specialInit')
  
  }//specialInit
	
	return {
		init:init,
		setConfig:setConfig,
		onClosedMovie:onClosedMovie
	}
	
})();


/*******************
@ready
*******************/
Contents.init();