/**
 * ui/jquery.imgRollOver.js
 * <a>の子要素の画像に、ロールオーバー効果を追加します。
 */
( function(){

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
			
			if( targetImgs.length == 0 ) return;
			
			targetImgs.each( function(){
				var hoverImg =
					$("<span>")
						.css({
							display: "block",
							
							width: $( this ).width() + "px",
							height: $( this ).height() + "px",
							backgroundImage: "url('" + this.src.replace( "_off.", "_on." ) + "')",
							
							position: "absolute",
							opacity: 0
						})
						.addClass("fn_hover")
				
				$(this)
					.addClass("fn_default")
					.after( hoverImg );
				
				hoverImg.css( {
					marginTop:  $(this).offset().top  - hoverImg.offset().top  + "px",
					marginLeft: $(this).offset().left - hoverImg.offset().left + "px"
				} );
			});
			
			$(this)
				.mouseenter( function(){
					$( "span.fn_hover", this ).animate( { opacity: 1 }, 150 );
					$( "img.fn_default", this ).animate( { opacity: 0 }, 150 );
				} )
				.mouseleave( function(){
					$( "span.fn_hover", this ).animate( { opacity: 0 }, 150 );
					$( "img.fn_default", this ).animate( { opacity: 1 }, 150 );
				} );
		});
	};


	/*
	 * 初期表示処理
	 */
	$( function(){
		$( "a[href], button" ).imgRollOver();
	} );
} )();
