/**
 * ui/jquery.inPageLink.js
 * ページ内リンクに、目標位置へのスクロール効果を追加します。
 */

(function(){
	/**
	 * 設定項目
	 */
	/** 1ms秒毎の移動距離（px） */
	var SCROLL_VELOCITY =  0.6;

	/** スクロール時間の最短（ms） */
	var MIN_DURATION =  400;

	/** スクロール時間の最長（ms） */
	var MAX_DURATION = 1000;


	/* ページ内リンク */
	$.fn.inPageLink = function(){
		if( !$("html,body").animate ){
			return this;
		}

		return this.each( function(){
			if( !this.href.match(/#.+$/) ) return;
			
			/* ページ内リンクがクリックされた際の処理 */
			$(this).click( function(){
				var targetId = this.href.match(/#.+$/)[0];

				var targetElm = $(targetId);
				if( targetElm.length !== 1 ) return true;
				if( targetElm.css("display") == "none" ) return false;

				var targetPos = targetElm.offset().top;
				var targetDistance = Math.abs( $('html, body').scrollTop() - targetPos );

				var animateTime = targetDistance * SCROLL_VELOCITY;
				animateTime = Math.max( animateTime, MIN_DURATION );
				animateTime = Math.min( animateTime, MAX_DURATION );

				$("html,body").animate({ scrollTop: targetPos }, animateTime, "swing", function(){
					location.hash = targetId;
				});
				
				return false;
			} );
		});
	}


	/**
	 * 初期表示処理
	 */
	$( document ).ready( function(){
		$( "a[href]" ).inPageLink();
	});
})();
