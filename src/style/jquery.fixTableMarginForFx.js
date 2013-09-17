/**
 * style/jquery.fixTableMarginForFx.js
 * firefoxにおける、tableのmargin相殺に関するバグの手当て
 */
( function(){
	/* 
	 * 設定項目
	 */
	/** デフォルトで処理する対象の指定（セレクター） */
	var DEFAULT_TARGET =  "table.general";


	/* tableのmargin相殺に関するバグの手当て */
	$.fn.fixTableMarginForFx = function(){
		if( !$.browser.mozilla ){
			return this;
		}

		return this.each( function(){
			
			var targetTable = $( this );
			
			targetTable.wrap('<div class="fn_fixTableMarginforFx" />');
			targetTable.parent().css( {
				marginTop:    targetTable.css( "marginTop" ),
				marginBottom: targetTable.css( "marginBottom" )
			} );
			
			targetTable.css( {
				marginTop:    0,
				marginBottom: 0
			} );
		});
	};


	/*
	 * 初期表示処理
	 */
	$( function(){
		if( $.browser.mozilla ){
			$( DEFAULT_TARGET ).fixTableMarginForFx();
		}
	} );
} )();
