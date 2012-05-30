/**
 * cliche.js
 *
 * @author Daiki UEDA
 * @version 0.0.1
 */
(function(){
	var THIS_FILE_CONTEXT = "js/cliche.js";

	/* Do not change the variable name */
	var required = [
		"source/env/jquery.jsCapability.js",
		"source/env/jquery.uaDetection.js",
		
		"source/ui/jquery.inPageLink.js",
		"source/ui/jquery.imgRollOver.js",
		
		"source/event/jquery.triggerOnFontSizeChange.js",
		"source/style/jquery.displayBox.js",
		"source/style/jquery.fixTableMarginForFx.js"
	];

	(function(){
		var testElm, testElms = document.getElementsByTagName("script");
		for( var i=0; testElm = testElms[i]; i++ ){
			if( testElm.src.indexOf(THIS_FILE_CONTEXT) >= 0 ) break;
			testElm = null;
		}
		if( !testElm ) return;

		var pre_pathname = testElm.src.replace(/[^/\\]+$/,"");
		for( var i in required ){
			document.write('<script type="text/javascript" src="' + pre_pathname + required[i] + '"></script>');
		}
	})();
})();
