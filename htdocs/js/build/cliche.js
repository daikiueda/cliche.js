(function(){$(function(){$("body").addClass("jsCapable");});})();(function(){$(function(){var ua=navigator.userAgent;if(ua.indexOf('iPhone')>-1||ua.indexOf('iPad')>-1){$("body").addClass("ua_iOS");}
else{$("body").addClass("ua_PC");}
if(ua.indexOf('Mac OS X')>-1){$("body").addClass("ua_Mac");}
else{$("body").addClass("ua_Win");}});})();(function(){var SCROLL_VELOCITY=0.6;var MIN_DURATION=750;var MAX_DURATION=2000;$.extend($.easing,{easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;}});$.fn.inPageLink=function(){if(!$("html,body").animate){return this;}
return this.each(function(){if(!this.href.match(/#.+$/))return;$(this).click(function(){var targetId=this.href.match(/#.+$/)[0];var targetElm=$(targetId);if(targetElm.length!==1)return true;if(targetElm.css("display")=="none")return false;var targetPos=targetElm.offset().top;var targetDistance=Math.abs($('html, body').scrollTop()-targetPos);var animateTime=targetDistance/SCROLL_VELOCITY;animateTime=Math.max(animateTime,MIN_DURATION);animateTime=Math.min(animateTime,MAX_DURATION);$("html,body").animate({scrollTop:targetPos},animateTime,"easeOutQuint",function(){setTimeout(function(){location.href=location.href.replace(/(#.+|)$/,targetId);},100);});return false;});});};$(function(){$("a[href]").inPageLink();});})();(function(){$.fn.imgRollOver=function(){if(!$("html,body").animate){return this;}
return this.each(function(){var targetImgs=$(this).find("img").filter(function(){return(/_off.(gif|jpg|png)/).test(this.src);});if(targetImgs.length==0)return;targetImgs.each(function(){var hoverImg=$("<span>").css({display:"block",width:$(this).width()+"px",height:$(this).height()+"px",backgroundImage:"url('"+this.src.replace("_off.","_on.")+"')",position:"absolute",opacity:0}).addClass("fn_hover")
$(this).addClass("fn_default").after(hoverImg);hoverImg.css({marginTop:$(this).offset().top-hoverImg.offset().top+"px",marginLeft:$(this).offset().left-hoverImg.offset().left+"px"});});$(this).mouseenter(function(){$("span.fn_hover",this).animate({opacity:1},150);$("img.fn_default",this).animate({opacity:0},150);}).mouseleave(function(){$("span.fn_hover",this).animate({opacity:0},150);$("img.fn_default",this).animate({opacity:1},150);});});};$(function(){$("a[href], button").imgRollOver();});})();(function(){var TEST_INTERVAL=200;$(function(){var fontSizeWatcher=$('<div class="fontSizeWatcher">&nbsp;</div>').css({position:"absolute",top:"0px",left:"-9999px",width:"100px"}).appendTo(document.body);fontSizeWatcher.data("lastHeight",fontSizeWatcher.height());setInterval(function(){if(fontSizeWatcher.height()!==fontSizeWatcher.data("lastHeight")){fontSizeWatcher.data("lastHeight",fontSizeWatcher.height());$(document.body).trigger("fontSizeChange");}},TEST_INTERVAL);});})();(function(){function adjustHeight(myTargetElms,myOption){if(myOption&&myOption.inner){if($.isArray(myOption.inner)){for(var i=0,last=myOption.inner.length;i<last;i++){adjustHeight($(myTargetElms).find(myOption.inner[i].selector),myOption.inner[i].option);}}
else if($.isPlainObject(myOption.inner)){adjustHeight($(myTargetElms).find(myOption.inner.selector),myOption.inner.option);}}
var testElm,maxHeight=0,calculatedHeight;$.each(myTargetElms,function(){testElm=$(this);testElm.css("height","auto");$("> div.positionAdjuster",testElm).css("paddingTop",0);maxHeight=Math.max(maxHeight,testElm.outerHeight());});$.each(myTargetElms,function(){testElm=$(this);calculatedHeight=maxHeight-(testElm.outerHeight()-testElm.height());testElm.css("height",calculatedHeight+"px");if(myOption&&myOption.verticalAlign){var positionAdjuster=$("> div.positionAdjuster",testElm);if(!positionAdjuster.length){testElm.wrapInner($('<div class="positionAdjuster"></div>'));positionAdjuster=$("> div.positionAdjuster",testElm);}
positionAdjuster.css("paddingTop",(calculatedHeight-positionAdjuster.height())/2+"px");}});}
function setAutoAdjust(myTargetElms,myOption){$(document.body).bind("fontSizeChange",function(){adjustHeight(myTargetElms,myOption);});adjustHeight(myTargetElms,myOption);}
$.fn.displayBox=function(myOption){if(!this.length){return this;}
var childElms=$("> *",this);var testElm,targetElms=[],testOffsetTop;var currentPos=$(childElms.get(0)).offset().top;for(var i=0;testElm=childElms.get(i);i++){testOffsetTop=$(testElm).offset().top;if(Math.abs(currentPos-testOffsetTop)<1){targetElms.push(testElm);}
else{setAutoAdjust(targetElms,myOption);targetElms=[];targetElms.push(testElm);currentPos=testOffsetTop;}}
setAutoAdjust(targetElms,myOption);return this;};$(function(){$(".displayBox").displayBox();});})();(function(){var DEFAULT_TARGET="table.general";$.fn.fixTableMarginForFx=function(){if(!$.browser.mozilla){return this;}
return this.each(function(){var targetTable=$(this);targetTable.wrap('<div class="fn_fixTableMarginforFx" />');targetTable.parent().css({marginTop:targetTable.css("marginTop"),marginBottom:targetTable.css("marginBottom")});targetTable.css({marginTop:0,marginBottom:0});});};$(function(){if($.browser.mozilla){$(DEFAULT_TARGET).fixTableMarginForFx();}});})();