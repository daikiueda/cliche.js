/**
 * env/jquery.uaDetection.js
 * UA�𔻕ʂ��A���L��class��body�v�f�ɕt�^���܂��B
 * - body.ua_iOS
 * - body.ua_PC
 * - body.ua_Mac
 * - body.ua_Win
 */

(function(){

	/**
	 * �����\������
	 */
	$( function(){
		var ua =navigator.userAgent;

		if( ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1 ){
			$("body").addClass("ua_iOS");
		}
		else {
			$("body").addClass("ua_PC");
		}

		if( ua.indexOf('Mac OS X') > -1 ){
			$("body").addClass("ua_Mac");
		}
		else {
			$("body").addClass("ua_Win");
		}
	});

})();
