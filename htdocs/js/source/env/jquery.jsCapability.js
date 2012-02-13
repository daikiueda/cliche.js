/**
 * env/jquery.jsCapability.js
 * JavaScriptが有効な環境の場合に、下記のclassをbody要素に付与します。
 * - body.jsCapable
 */

(function(){

	/**
	 * 初期表示処理
	 */
	$( function(){
		$( "body" ).addClass( "jsCapable" );
	});
})();
