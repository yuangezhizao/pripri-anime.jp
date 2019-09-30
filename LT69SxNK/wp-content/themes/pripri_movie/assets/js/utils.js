/************************************************

@utils.js 

*initNavi - ナビの出力
*initSNS - SNSボタンの出力
*initBanner - バナーデータの出力
*openSnsWindow - SNS用の小窓表示
*checkIE - IEかどうかをチェック
*getParam - URLのパラメーター取得

(c) ULM Co.,Ltd. - https://www.ulm-design.com
************************************************/
(function($) {

  /*--//////////////////////////////////////////	

  initNavi

  //////////////////////////////////////////--*/
  $.fn.initNavi = function(options){

    //デフォルト値
		var setting = $.extend({
      contents  : '', //現在のページのID名(NAVI_DATAのidと合わせる)
      img: {
        isImg   : false, //ボタンを画像にするか。デフォルトはfalse
        imgPath : '' //画像フォルダまでのパス。最後にスラッシュ(/)必須。
      }
		},options);

    var _navData = NAVI_DATA,
        len      = _navData.length,
        txt      = ''; 

    for(var i = 0; i < len; i++){

      var list = '',
          data = _navData[i];

      list +='<li id="nav-' + data.id + '" class="nav-box" itemprop="name">';//リスト開始タグ

        //リンク開始タグ
        var link_url = data.href;

        if(data.isComing) {
          link_url = 'javascript:void(0);'
        }

        list += '<a href="' + link_url + '" class="nav-btn';
        if(data.isComing) {
          list += ' coming';
        }
        if(data.id == setting.contents) {
          list += ' selected';
        }
        list += '"';

        if(data.target == '_blank') {
          list += ' target="_blank" rel="noopener"';
        }

        list += ' itemprop="url">';

          //テキスト or 画像
          if(!setting.img.isImg) {
            list += data.name;
          } else {
            if(data.id !== setting.contents) {
              list += '<img src="' + setting.img.imgPath + data.id + '_off.png" alt="' + data.name + '" class="nav-img">';
            } else {
              list += '<img src="' + setting.img.imgPath + data.id + '_on.png" alt="' + data.name + '" class="nav-img">';
            }
          }

        list += '</a>';//リンク閉じタグ

      list += '</li>';//リスト閉じタグ

      txt += list;

    }//endfor

    this.html(txt);

  }//initNavi


  /*--//////////////////////////////////////////

  initSNS

  //////////////////////////////////////////--*/
  $.fn.initSNS = function(options){
    
    //デフォルト値
    var target = this,
        len    = SNS_DATA.length;

    for(var i =0; i < len; i++){

      var list = '',
          data = SNS_DATA[i];

      switch(data.id){

        case 'twitter':
          list +='<li id="twitter-btn" class="sns-btn"></li>';
          target.append(list);
          generateTweetBtn(SNS_URL,data.text,data.hash);
        break;

        case 'facebook-like':
          list +='<li id="facebook-like" class="sns-btn"></li>';
          target.append(list);
          generateFbLikeBtn(SNS_URL);
        break;

        case 'line-share':
          list +='<li id="line-share" class="sns-btn"></li>';
          target.append(list);
          generateLineShareBtn(SNS_URL);
        break;

        default:
        break;

      }//endswitch

    }//endfor
    
    /*--------------------
    generateTweetBtn
    --------------------*/
    function generateTweetBtn(__url,__txt,__hash) {

      var tweetElm = document.createElement('div');
      var html =  '<a href="https://twitter.com/share?url=' + __url + '&text=' + __txt + '&hashtags=' + __hash + '" class="share-link-btn custom-twitter-btn" target="_blank" rel="noopener">';
          html += '<span class="share-link-btn-icon"><i class="icon-twitter share-icon"></i></span>';
          html += '</a>';
      tweetElm.innerHTML = html;
      document.querySelector('#twitter-btn').appendChild(tweetElm);

    }

    /*--------------------
    generateFbLikeBtn
    --------------------*/
    function generateFbLikeBtn(__url) {

      var likeElm = document.createElement('div');
      var html =  '<a href="https://www.facebook.com/sharer.php?u=' + __url + '" class="share-link-btn custom-facebook-btn" target="_blank" rel="noopener">';
          html += '<span class="share-link-btn-icon"><i class="icon-facebook2 share-icon"></i></span>';
          html += '</a>';
      likeElm.innerHTML = html;
      document.querySelector('#facebook-like').appendChild(likeElm);

    }

    /*--------------------
    generateLineShareBtn
    --------------------*/
    function generateLineShareBtn(__url) {

      var lineElm = document.createElement('div');
      var html =  '<a href="https://timeline.line.me/social-plugin/share?url=' + __url + '" class="share-link-btn custom-line-btn" target="_blank" rel="noopener">';
          html += '<span class="share-link-btn-icon"><i class="icon-line share-icon"></i></span>';
          html += '</a>';
      lineElm.innerHTML = html;
      document.querySelector('#line-share').appendChild(lineElm);

    }

  }//initSNS

	/*--//////////////////////////////////////////

  initBanner

  //////////////////////////////////////////--*/
  $.fn.initBanner = function(options){
    
		var bnrData = BANNER_DATA,
				len     = bnrData.length,
				txt     = ''; 

		for(var i = 0; i < len; i++){

			var list = '',
					data = bnrData[i];

			list += '<li class="bnr-item">';
			list += '<a href="' + data.href + '" target="_blank" rel="noopener">';
			list += '<img src="'+ BANNER_IMG_PATH + data.src + '" alt="' + data.alt + '" class="bnr-img">';
			list += '</a>';
			list += '</li>';

      txt += list;
		}

		this.html(txt);

  }//initBanner

})(jQuery);


/*--//////////////////////////////////////////

@openSnsWindow

//////////////////////////////////////////--*/
function openSnsWindow(__target) {

  var widthHalf         = window.screen.width / 2,
      heightHalf        = window.screen.height / 2,
      blankWindowWidth  = 510,   // 別窓の横幅
      blankWindowHeight = 510,  // 別窓の縦幅
      options = { // 後ほど記載する window.open の第３引数で使用する
        left  : Math.floor(widthHalf - (blankWindowWidth / 2)),   // 別窓の X座標
        top   : Math.floor(heightHalf - (blankWindowHeight / 2)), // 別窓の Y座標
        width : blankWindowWidth,
        height: blankWindowHeight
      };

  $(document).on('click', __target, function(event) {
   // if(window.innerWidth < 768) return;
    event.preventDefault();
    var thisHref = $(this).attr('href'),
        arg      = 'left=' + options.left + ',top=' + options.top + ',width=' + options.width + ',height=' + options.height;

    window.open(thisHref, 'blankShareWindow', arg);
  });

}

/*--//////////////////////////////////////////

@checkIE

//////////////////////////////////////////--*/
function checkIE() {

  var _isIE;
  const ua = window.navigator.userAgent.toLowerCase();

  if(ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0){
    _isIE = true;
  }else{
    _isIE = false;
  }

  return _isIE;

}

/*--//////////////////////////////////////////

@getParam

//////////////////////////////////////////--*/
function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
