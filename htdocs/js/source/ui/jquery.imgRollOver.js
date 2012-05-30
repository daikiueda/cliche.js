/**
 * ui/jquery.imgRollOver.js
 * <a>の子要素の画像に、ロールオーバー効果を追加します。
 */

(function(){

	/* 画像のロールオーバー */
	$.fn.imgRollOver = function(){
		if( !$("html,body").animate ){
			return this;
		}

		return this.each( function(){
			var targetImgs =
				$(this)
					.find("img")
					.filter( function(){
						return (/_off.(gif|jpg|png)/).test( this.src );
					} );
			
			if( targetImgs.length == 0 ){
				return this;
			}
			
			targetImgs.each( function(){
				var hoverImg =
					$("<img>")
						.attr( "src", this.src.replace( "_off.", "_on." ) )
						.addClass("hover")
						.css( { position: "absolute", opacity: 0 } );
				
				$(this)
					.addClass("default")
					.after( hoverImg );
				
				hoverImg.css( {
					marginTop:  $(this).offset().top  - hoverImg.offset().top  + "px",
					marginLeft: $(this).offset().left - hoverImg.offset().left + "px"
				} );
			});
			
			$(this)
				.mouseenter( function(){
					$( "img.hover", this ).animate( { opacity: 1 }, 150 );
					$( "img.default", this ).animate( { opacity: 0 }, 150 );
				} )
				.mouseleave( function(){
					$( "img.hover", this ).animate( { opacity: 0 }, 150 );
					$( "img.default", this ).animate( { opacity: 1 }, 150 );
				} );
			
			return this;
		})
	}


	/*
	 * 初期表示処理
	 */
	$( function(){
		$( "a[href], button" ).imgRollOver();
	} );
})();
