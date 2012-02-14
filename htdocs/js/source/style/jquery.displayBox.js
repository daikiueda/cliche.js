/**
 * style/jquery.displayBox.js
 * 横に並んだカラムの高さを、最長の要素に揃えます。
 */

(function(){
	
	
	function adjustHeight( myTargetElms, myOption ){
		
		
		if( myOption && myOption.inner ){
			if( $.isArray( myOption.inner ) ){
				for( var i = 0, last = myOption.inner.length; i < last; i++ ){
					adjustHeight( $(myTargetElms).find( myOption.inner[i].selector ), myOption.inner[i].option );
				}
			}
			else if( $.isPlainObject( myOption.inner ) ){
				adjustHeight( $(myTargetElms).find( myOption.inner.selector ), myOption.inner.option );
			}
		}
		
		var testElm, maxHeight = 0, calculatedHeight;
		
		$.each( myTargetElms, function(){
			testElm = $( this );
			
			testElm.css( "height", "auto" );
			$( "> div.positionAdjuster", testElm ).css( "paddingTop", 0 );
			
			maxHeight = Math.max( maxHeight, testElm.outerHeight() );
		} );
	
		$.each( myTargetElms, function(){
			testElm = $( this );
			calculatedHeight = maxHeight - ( testElm.outerHeight() - testElm.height() );
			testElm.css( "height", calculatedHeight + "px" );

			if( myOption && myOption.verticalAlign ){
				var positionAdjuster = $( "> div.positionAdjuster", testElm );
				if( !positionAdjuster.length ){
					testElm.wrapInner( $( '<div class="positionAdjuster"></div>' ) );
					positionAdjuster = $( "> div.positionAdjuster", testElm );
				}
				
				positionAdjuster.css( "paddingTop", ( calculatedHeight - positionAdjuster.height() ) / 2 + "px" );
			}
		} );
	}
	
	
	function setAutoAdjust( myTargetElms, myOption ){
		
		$( document.body ).bind( "fontSizeChange", function(){
			adjustHeight( myTargetElms, myOption );
		} );
		
		adjustHeight( myTargetElms, myOption );
	}
	
	
	/* 対象要素の初期化 */
	$.fn.displayBox = function( myOption ){
		
		var childElms = $( "> *", this );
		
		var testElm, targetElms = [], testOffsetTop;
		
		var currentPos = $( childElms.get( 0 ) ).offset().top;
		
		for( var i = 0; testElm = childElms.get( i ); i++ ){
			
			testOffsetTop = $( testElm ).offset().top;
			
			if( currentPos === testOffsetTop ){
				targetElms.push( testElm );
			}
			else {
				setAutoAdjust( targetElms, myOption );
				
				targetElms = [];
				targetElms.push( testElm );
				currentPos = testOffsetTop;
			}
		}
		setAutoAdjust( targetElms, myOption );
		
		
		return this;
	}


	/**
	 * 初期表示処理
	 */
	$( function(){
		$( ".displayBox" ).displayBox();
	} );
})();
