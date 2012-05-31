/**
 * ui/jquery.setActiveImage.js
 * <a>の子要素の画像に、アクティブ表示を追加します。
 */
( function(){

	/* 画像のアクティブ表示 */
	$.fn.setActiveImage = function(){
		
		return this.each( function(){
			var targetImgs =
				$(this)
					.find("img")
					.filter( function(){
						return (/_off.(gif|jpg|png)/).test( this.src );
					} );
			
			if( targetImgs.length == 0 ) return;
			
			targetImgs.each( function(){
				if( $( "body" ).hasClass( "ua_iOS" ) ){
					$( this ).parents( "a" ).css( "-webkit-tap-highlight-color", "rgba( 0, 0, 0 , 0)" );
				}
				
				var activeImg =
					$("<img>")
						.attr( "src", this.src.replace( "_off.", "_active." ) )
						.css( { position: "absolute", zIndex: 2 } );
				
				$( this )
					.after( activeImg );
				
				activeImg
					.css( {
						marginTop:  $( this ).offset().top  - activeImg.offset().top  + "px",
						marginLeft: $( this ).offset().left - activeImg.offset().left + "px"
					} )
					.addClass( "fn_active" );
			} );
		} );
	};


	/*
	 * 初期表示処理
	 */
	$( function(){
		
		var cssStr = [
			'a img.fn_active {',
			' opacity: 0;',
			' filter: alpha( opacity=0 );',
			' -ms-filter: alpha( opacity=0 );',
			'}',
			'a:active img.fn_active,',
			'body.ua_iOS a:hover img.fn_active {',
			' opacity: 1;',
			' filter: alpha( opacity=100 );',
			' -ms-filter: alpha( opacity=100 );',
			'}'
		].join( "" );
		$( '<style type="text/css">' + cssStr + '</style>' ).appendTo( $( "html > head" ) );
	
		$( "#nav ul.global a, #siteTopContents .procedure a" ).setActiveImage();
	} );
} )();
