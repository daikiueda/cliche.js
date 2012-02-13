/**
 * env/jquery.uaDetection.js
 * UAを判別し、下記のclassをbody要素に付与します。
 * - body.ua_iOS
 * - body.ua_PC
 * - body.ua_Mac
 * - body.ua_Win
 */

(function(){

	/**
	 * 初期表示処理
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
