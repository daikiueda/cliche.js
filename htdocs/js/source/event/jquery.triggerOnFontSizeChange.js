/**
 * event/jquery.triggerOnFontSizeChange.js
 * �t�H���g�T�C�Y�̕ύX�����m���Abody�v�f��fontSizeChange�C�x���g�𔭍s���܂��B
 */

(function(){
	/**
	 * �ݒ荀��
	 */
	/** ���m�̊Ԋu�ims�j */
	var TEST_INTERVAL =  200;


	/**
	 * �����\������
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
