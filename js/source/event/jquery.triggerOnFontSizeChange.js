/**
 * event/jquery.triggerOnFontSizeChange.js
 * フォントサイズの変更を検知し、body要素のfontSizeChangeイベントを発行します。
 */

(function(){
	/**
	 * 設定項目
	 */
	/** 検知の間隔（ms） */
	var TEST_INTERVAL =  200;


	/**
	 * 初期表示処理
	 */
	$( function(){
		var fontSizeWatcher =
			$( '<div class="fontSizeWatcher">&nbsp;</div>' )
				.css( {
					position: "absolute",
					top: "0px",
					left: "-9999px",
					width: "100px"
				} )
				.appendTo( document.body );
		
		fontSizeWatcher.data( "lastHeight", fontSizeWatcher.height() );
		
		setInterval( function(){
			if( fontSizeWatcher.height() !== fontSizeWatcher.data( "lastHeight" ) ){
				fontSizeWatcher.data( "lastHeight", fontSizeWatcher.height() );
				$( document.body ).trigger( "fontSizeChange" );
			}
		}, TEST_INTERVAL );
	} );
})();
