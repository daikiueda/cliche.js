/**
 * jquery.inPageLink.js
 * ページ内リンクに、目標位置へのスクロール演出を追加する。
 */
( function(){
	/* 
	 * 設定項目
	 */
	/** 1ms秒毎の移動距離（px） */
	var SCROLL_VELOCITY =  0.6;

	/** スクロール時間の最短（ms） */
	var MIN_DURATION =  750;

	/** スクロール時間の最長（ms） */
	var MAX_DURATION = 1500;


	/**
	 * $.easingの拡張
	 * @see http://gsgd.co.uk/sandbox/jquery/easing/
	 */
	$.extend( $.easing,
		{
			easeOutQuint: function (x, t, b, c, d) {
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			}
		}
	);

	/**
	 * 初期表示処理
	 */
	$( function(){
		if( !$("html,body").animate ){
			return this;
		}
		
		$( "body" ).on( "click", "a[href]", function( event ){
			
			var targetId = this.href.match(/#.+$/)[0];

			var targetElm = $(targetId);
			if( targetElm.length !== 1 ) return true;
			if( targetElm.css("display") == "none" ) return false;

			var targetPos = targetElm.offset().top;
			var targetDistance = Math.abs( $( 'html, body' ).scrollTop() - targetPos );

			var animateTime = targetDistance / SCROLL_VELOCITY;
			animateTime = Math.max( animateTime, MIN_DURATION );
			animateTime = Math.min( animateTime, MAX_DURATION );

			$("html,body").animate({ scrollTop: targetPos }, animateTime, "easeOutQuint", function(){
				setTimeout( function(){
					location.href = location.href.replace(/(#.+|)$/,targetId);
				}, 100 );
			});
			
			return false;
		} );
	} );
} )();
