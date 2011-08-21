/*
  foundation.js
  �T�C�g���ʋ@�\
*/

(function(){
	/**
	 * �ݒ荀��
	 */

	// �{���̈�̕�
	var WIDTH_CONTENT_BODY = 636;

	// �t�@�[�X�g�r���[�̍����Ɋւ��钲����臒l
	var HEIGHT_FIRSTVIEW_THRESHOLD = 700;

	/* ����J�����̍������킹�̓K�p�N���X */
	var CLASS_PANEL_LOOK_ELMS = "div.unit-container";

	/* ����J�����̌��o���̍������킹�̓K�p�N���X */
	var CLASS_TARGET_HEADING_ELMS = "div.heading";



	/**
	 * �萔��`
	 */

	// �t�H���g�T�C�Y�ύXUI
	var HTML_FONT_SIZE_SWITCH_UI =
		'<ol id="fontSizeSwitchUI">' +
		'  <li class="setterS"><a href="#">S</a></li>' +
		'  <li class="setterM"><a href="#">M</a></li>' +
		'  <li class="setterL"><a href="#">L</a></li>' +
		'</ol>';

	// ���[�U�[�ݒ�t�H���g�T�C�Y��cookie�ۊǗp�L�[��
	var STR_FONTSIZE_COOKIEKEY = 'fontsizeSetting';

	// ���[�U�[�ݒ�t�H���g�T�C�Y��cookie�ۊǗp�L�[��
	var STR_BANDWIDTH_COOKIEKEY = 'bandwidthSetting';

	// �e���T�C�g�ւ̃����N�̓W�JUI�̃N���X��
	var CLASS_COUNTRY_LINKS_TOGGLE = 'countrySpecificLinksTrigger';



	/**
	 * �ėp�֐���`
	 */
	var atomjs = window.atomjs = {};

	/* �N�b�L�[���� */
	atomjs.setCookie = function( myKey, myVal ){
		/* max-age�́Asafari1�n�ŕs���Ƃ�����񂪂���̂ŁAexpiresDate�ő�� */
		var expiresDateObj = new Date();
		if( arguments.length == 3 ){
			expiresDateObj = arguments[2];
		} else {
			expiresDateObj.setYear( expiresDateObj.getFullYear() + 1 );
		}
		var expiresDate = expiresDateObj.toGMTString().replace(/UTC/, "GTM");
		var tempStr = myKey + "=" + myVal + "; ";
		tempStr +="path=/;";
		tempStr +="expires=" + expiresDate + "; ";
		document.cookie = tempStr;
	}
	atomjs.getCookie = function( myKey ){
		var cookies = [];
		if( document.cookie ){
			var cookiesStr = document.cookie.split(";");
			for( var i=0; i < cookiesStr.length; i++ ){
				var cookiePair = cookiesStr[i].split("=");
				if( cookiePair.length != 2 ) continue;
				cookies[cookiePair[0].replace( /^ *| *$/g, "" )] = cookiePair[1].replace( /^ *| *$/g, "" );
			}
			return cookies[myKey];
		}
	}

	/* �t�H���g�T�C�Y�ύX�̌��n */
	atomjs.fontSizeWatcher = function(){
		this.elm = $( '<div id="fontSizeWatcher">&nbsp;</div>' );
		$(document.body).append( this.elm );
		this.lastHeight = this.elm.height();
	}
	atomjs.fontSizeWatcher.prototype = {
		elm: null,
		lastHeight: 0,
		timer: null,
		test: function(){
			if( this.elm.height() !== this.lastHeight ){
				this.lastHeight = this.elm.height();
				this.elm.trigger("fontSizeChange");
			}
		},
		start: function(){
			var that = this;
			this.timer = setInterval( function(){that.test()}, 200 );
		},
		toString: function(){ return "atomjs.fontSizeWatcher" }
	}


	/* �y�[�W�������N */
	$.fn.inPageLink = function(){
		if( !$("html,body").animate ){
			return this;
		}

		return this.each( function(){
			if( !this.href.match(/#.+$/) ) return;

			$(this).click( function(){
				var targetId = this.href.match(/#.+$/)[0];

				var targetElm = $(targetId);
				if( targetElm.length !== 1 ) return true;
				if( targetElm.css("display") == "none" ) return false;

				var currentPos = $('body').scrollTop() || $('html').scrollTop();
				var targetPos = targetElm.offset().top;
				var targetDistance = Math.abs( currentPos - targetPos );

				var animateTime = targetDistance * 0.8;
				animateTime = Math.max( animateTime,  600 );
				animateTime = Math.min( animateTime, 1800 );

				$("html,body").animate({ scrollTop: targetPos }, animateTime, "swing", function(){
					location.href = location.href.replace(/(#.+|)$/,targetId);
				});
				return false;
			} );
		})
	}


	/* ����J�����̍������킹 */
	$.fn.adjustPanelHeight = function(){
		var targetPanels = this.find("> *");

		if(
			/* �J������1���Ȃ��ꍇ */
			!targetPanels.get(0) ||

			/* �������́A�J������2�ȏ�Ȃ��ꍇ */
			!targetPanels.get(1) ||

			/* �������́A2�̃J�����̕����قȂ�ꍇ */
			$(targetPanels.get(0)).width() !== $(targetPanels.get(1)).width()
		){
			/* �������킹��K�p���Ȃ� */
			return;
		}

		var turnCount = Math.floor(WIDTH_CONTENT_BODY / $(targetPanels.get(0)).width());

		var rowMaxHeight, headingMaxHeight, calcedValue, testElm;
		for( var i=0; i<targetPanels.length/turnCount; i++ ){
			rowMaxHeight = 0;
			headingMaxHeight = 0;

			for( var j=0; j<turnCount && i*turnCount+j < targetPanels.length; j++ ){
				testElm = $(CLASS_TARGET_HEADING_ELMS,targetPanels.get(i*turnCount+j));
				testElm.removeClass("adjusted");
				headingMaxHeight = Math.max( testElm.css("height","auto").height(), headingMaxHeight );
			}
			for( var j=0; j<turnCount && i*turnCount+j < targetPanels.length; j++ ){
				testElm = $(CLASS_TARGET_HEADING_ELMS,targetPanels.get(i*turnCount+j));
				testElm.height(headingMaxHeight).addClass("adjusted");
			}
			for( var j=0; j<turnCount && i*turnCount+j < targetPanels.length; j++ ){
				testElm = $(targetPanels.get(i*turnCount+j));
				rowMaxHeight = Math.max( testElm.css("height","auto").height(), rowMaxHeight );
			}
			for( var j=0; j<turnCount && i*turnCount+j < targetPanels.length; j++ ){
				testElm = $(targetPanels.get(i*turnCount+j));
				testElm.height(rowMaxHeight);
			}
		}
		return this;
	}

	/* ����J�����̍������킹������ */
	$.fn.initPanelLinks = function(){
		return this.each(function(){
			var that = $(this);
			$("#fontSizeWatcher").bind("fontSizeChange",function(){that.adjustPanelHeight()});
			$(this).adjustPanelHeight();
		});
	}



	/* OL���h������ */
	$.fn.dressOL = function(){
		return this.each( function(){
			$(this).addClass("dressed")
			.find("> li").wrapInner(document.createElement("div"))
			.find("> div").addClass("dressed-inner")
		})
	}



	/**
	 * �����\������
	 */
	$(document).ready( function(){

		/* �t�H���g�T�C�Y�ύX�̌��o */
		//var fSWatcher = new atomjs.fontSizeWatcher();
		//fSWatcher.start();


		/* ���[�U�[�ݒ�t�H���g�T�C�Y�̓K�p */
		/*
		switch( atomjs.getCookie(STR_FONTSIZE_COOKIEKEY) ){
			case "s":
				$(document.body).addClass("fontsizeS");
				break;
			case "l":
				$(document.body).addClass("fontsizeL");
				break;
		}
		*/


		/* �t�H���g�T�C�Y�ύXUI�̏����� */
		/*
		$("#contents-header").append( HTML_FONT_SIZE_SWITCH_UI );
		$("#contents-header .setterS a").click( function(){
			$(document.body)
				.removeClass("fontsizeL")
				.addClass("fontsizeS");
			atomjs.setCookie(STR_FONTSIZE_COOKIEKEY,"s");
			return false;
		} );
		$("#contents-header .setterM a").click( function(){
			$(document.body)
				.removeClass("fontsizeS")
				.removeClass("fontsizeL");
			atomjs.setCookie(STR_FONTSIZE_COOKIEKEY,"m");
			return false;
		} );
		$("#contents-header .setterL a").click( function(){
			$(document.body)
				.removeClass("fontsizeS")
				.addClass("fontsizeL");
			atomjs.setCookie(STR_FONTSIZE_COOKIEKEY,"l");
			return false;
		} );
		*/

		/* �y�[�W�������N�̓���ݒ� */
		$("a[href]").inPageLink();

		/* OL.general�̕��� */
		$("ol.general").dressOL();

		/* ����J�����̍������킹 */
		//$( CLASS_PANEL_LOOK_ELMS ).initPanelLinks();

		/* �t�@�[�X�g�r���[�̍����Ɋւ��钲�� */
		//if( $(document.body).height() > HEIGHT_FIRSTVIEW_THRESHOLD ){
		//
		//	/* PageTop�{�^���\�� */
		//	$("#contents-footer .toPageTop").css("display","block")
		//}
		//else {
		//
		//	/* PageTop�{�^����\�� */
		//	$("#contents-footer .toPageTop").css("display","none")
		//}

	});



	/**
	 * JS�ǂݍ��ݎ�����
	 */

	/* CSS�`�����Ή� */
	try {
		document.execCommand('BackgroundImageCache', false, true);
	} catch( myEx ) {}


})();
