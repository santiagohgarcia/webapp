/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/Popup','sap/ui/core/ResizeHandler','sap/ui/core/delegate/ItemNavigation','jquery.sap.events','jquery.sap.keycodes'],function(q,l,C,P,R,I){"use strict";var S=C.extend("sap.ui.commons.Splitter",{metadata:{library:"sap.ui.commons",properties:{splitterOrientation:{type:"sap.ui.core.Orientation",group:"Behavior",defaultValue:sap.ui.core.Orientation.Vertical},splitterPosition:{type:"sap.ui.core.Percentage",group:"Behavior",defaultValue:'50%'},minSizeFirstPane:{type:"sap.ui.core.Percentage",group:"Behavior",defaultValue:'0%'},minSizeSecondPane:{type:"sap.ui.core.Percentage",group:"Behavior",defaultValue:'0%'},width:{type:"sap.ui.commons.SplitterSize",group:"Behavior",defaultValue:'100%'},height:{type:"sap.ui.commons.SplitterSize",group:"Behavior",defaultValue:'100%'},showScrollBars:{type:"boolean",group:"Behavior",defaultValue:true},splitterBarVisible:{type:"boolean",group:"Behavior",defaultValue:true}},aggregations:{firstPaneContent:{type:"sap.ui.core.Control",multiple:true,singularName:"firstPaneContent"},secondPaneContent:{type:"sap.ui.core.Control",multiple:true,singularName:"secondPaneContent"}}}});S.prototype.onBeforeRendering=function(){if(this.sResizeListenerId){R.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}if(this.sSpecialResizeListenerId){R.deregister(this.sSpecialResizeListenerId);this.sSpecialResizeListenerId=null;}};S.prototype.onAfterRendering=function(){this._recalculateInternals();this.sResizeListenerId=R.register(this.splitterDIV,q.proxy(this.onresize,this));};S.prototype._recalculateInternals=function(){this.splitterDIV=this.getDomRef();this.splitterBar=q.sap.domById(this.getId()+'_SB');this.firstPane=q.sap.domById(this.getId()+'_firstPane');this.secondPane=q.sap.domById(this.getId()+'_secondPane');this.minSizeFP=this.getMinSizeFirstPane();this.minSizeSP=this.getMinSizeSecondPane();this.minSizeFP=this.minSizeFP.substring(0,(this.minSizeFP).length-1);this.minSizeFP=parseFloat(this.minSizeFP);this.minSizeSP=this.minSizeSP.substring(0,(this.minSizeSP).length-1);this.minSizeSP=parseFloat(this.minSizeSP);this.spOrientation=this.getSplitterOrientation();this.sBarPosition=this.getSplitterPosition();this.sBarPosition=this.sBarPosition.substring(0,this.sBarPosition.length-1);this.sBarPosition=parseFloat(this.sBarPosition);if(sap.ui.getCore().getConfiguration().getTheme()=="sap_hcb"){this.sbSize=6;}else{this.sbSize=4;}this.resizeSplitterElements();var s=q(this.splitterBar).height();if(this.spOrientation==sap.ui.core.Orientation.Vertical){if(s<=0||s>q(this.splitterDIV).height()){this.fixHeight();}}else{if(s<=0||s!=this.sbSize){this.fixHeight();}}};S.prototype.onresize=function(e){this.resizeSplitterElements();};S.prototype.resizeSplitterElements=function(){var s,a,w,h,b,c;if(this.spOrientation==sap.ui.core.Orientation.Vertical){w=q(this.splitterDIV).width();if(w==0){w=100;}s=(this.sbSize*100)/w;if(this.sBarPosition>=100||this.sBarPosition+s>100){this.sBarPosition=100-s;b=0;}else{b=100-s-this.sBarPosition;}q(this.firstPane).css("width",this.sBarPosition+"%");q(this.splitterBar).css("width",s+"%");q(this.secondPane).css("width",b+"%");}else{h=q(this.splitterDIV).height();if(h==0){h=100;}a=(this.sbSize*100)/h;if(this.sBarPosition>=100||this.sBarPosition+a>100){this.sBarPosition=100-a;c=0;}else{c=100-a-this.sBarPosition;}q(this.firstPane).css("height",this.sBarPosition+"%");q(this.splitterBar).css("height",a+"%");q(this.secondPane).css("height",c+"%");}this.setProperty("splitterPosition",this.sBarPosition+"%",true);if(q(this.splitterDIV).height()==0&&!this.splitterDIV.style.height){q(this.splitterDIV).css("height","100px");q(this.splitterBar).css("height","100px");}};S.prototype.setSplitterPosition=function(p){if(this.getDomRef()){this.setProperty("splitterPosition",p,true);this._recalculateInternals();}else{this.setProperty("splitterPosition",p);}};S.prototype.setSplitterBarVisible=function(v){if(this.getDomRef()){this.setProperty("splitterBarVisible",v,true);var c=this.getSplitterOrientation()===sap.ui.core.Orientation.Vertical?"sapUiVertical":"sapUiHorizontal";if(v){q.sap.byId(this.getId()+"_SB").removeClass(c+"SplitterBarHidden").addClass(c+"SplitterBar");}else{q.sap.byId(this.getId()+"_SB").removeClass(c+"SplitterBar").addClass(c+"SplitterBarHidden");}}else{this.setProperty("splitterBarVisible",v);}};S.prototype.fixHeight=function(){var p=q(this.splitterDIV.parentNode).height();var s=q(this.splitterDIV).height();if(p>s){s=p;var c=this.getHeight();if(c&&c.toLowerCase().indexOf("px")!=-1){s=parseInt(c,10);}if(c&&c.toLowerCase().indexOf("%")!=-1){var a=parseInt(c,10);if(a<100){s=q(this.splitterDIV).height();}}if(s<=0){s=p;}}q(this.splitterDIV).css("height",s+"px");if(this.spOrientation==sap.ui.core.Orientation.Vertical){q(this.splitterBar).css("height",s+"px");}var o=this.splitterDIV.parentNode;if(o){var h=q.proxy(this.onresizespecial,this);this.sSpecialResizeListenerId=R.register(o,h);}};S.prototype.exit=function(){if(this.sResizeListenerId){R.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}if(this.sSpecialResizeListenerId){R.deregister(this.sSpecialResizeListenerId);this.sSpecialResizeListenerId=null;}};S.prototype.onresizespecial=function(e){var s=q(this.splitterDIV);var o=s.height();s.css("height","0px");var d=this.getDomRef();if(d&&window.getComputedStyle){window.getComputedStyle(d);}var p=q(e.target).height();var c=s.height();if(c!=p){s.css("height",p+"px");if(this.spOrientation==sap.ui.core.Orientation.Vertical){q(this.splitterBar).css("height",p+"px");}}if(p<=0){s.css("height",o+"px");if(this.spOrientation==sap.ui.core.Orientation.Vertical){q(this.splitterBar).css("height",o+"px");}}};S.prototype.onmousedown=function(e){if(e.target!=this.splitterBar){return;}var j=q(document.body);j.bind("selectstart",q.proxy(this.splitterSelectStart,this));var o=q(this.splitterBar).offset();var h=q(this.splitterBar).height();var w=q(this.splitterBar).width();var c;if(this.spOrientation==sap.ui.core.Orientation.Vertical){c="sapUiVSBGhost";}else{c="sapUiHSBGhost";}var z=P.getLastZIndex()+5;if(z<20){z=20;}q(document.body).append("<div id=\""+this.getId()+"_ghost\" class=\""+c+"\" style =\" height:"+h+"px; width:"+w+"px; left:"+o.left+"px; top:"+o.top+"px;z-index:"+z+"\"></div>");q(document.body).append("<div id=\""+this.getId()+"_overlay\" style =\"left: 0px;"+" right: 0px; bottom: 0px; top: 0px; position:fixed; z-index:"+z+"\" ></div>");q(document).bind("mouseup",q.proxy(this.onGhostMouseRelease,this));q(document).bind("mousemove",q.proxy(this.onGhostMouseMove,this));q(this.splitterBar).focus();e.preventDefault();e.stopPropagation();};S.prototype.splitterSelectStart=function(e){e.preventDefault();e.stopPropagation();return false;};S.prototype.onGhostMouseRelease=function(e){var n,s,a;var b=q.sap.domById(this.getId()+"_ghost");var r=sap.ui.getCore().getConfiguration().getRTL();if(this.spOrientation==sap.ui.core.Orientation.Vertical){if(!r){n=e.pageX-q(this.firstPane).offset().left;a=q(this.splitterDIV).width();n=(n*100)/a;}else{n=e.pageX-q(this.secondPane).offset().left;a=q(this.splitterDIV).width();n=((a-n)*100)/a;}}else{n=e.pageY-q(this.firstPane).offset().top;s=q(this.splitterDIV).height();n=(n*100)/s;}if(n<this.minSizeFP){n=this.minSizeFP;}else if((100-n)<this.minSizeSP){n=100-this.minSizeSP;}this.sBarPosition=n;this.resizeSplitterElements();q(b).remove();q.sap.byId(this.getId()+"_overlay").remove();var j=q(document.body);j.unbind("selectstart",this.splitterSelectStart);q(document).unbind("mouseup",this.onGhostMouseRelease);q(document).unbind("mousemove",this.onGhostMouseMove);};S.prototype.onGhostMouseMove=function(e){var s=q.sap.domById(this.getId()+"_ghost");var m;var a;var r=sap.ui.getCore().getConfiguration().getRTL();var b=q(this.firstPane).offset().left;var w=q(this.splitterDIV).width();var c=q(this.secondPane).offset().left;if(this.getSplitterOrientation()==sap.ui.core.Orientation.Vertical){if(!r){a=b+(w*this.minSizeFP)/100;m=b+(w*(100-this.minSizeSP))/100;if(e.pageX>a&&e.pageX<m){q(s).css("left",e.pageX+"px");}}else{a=c+(w*this.minSizeSP)/100;m=c+(w*(100-this.minSizeFP))/100;if(e.pageX>a&&e.pageX<m){q(s).css("left",e.pageX+"px");}}}else{var h=q(this.splitterDIV).height();a=q(this.firstPane).offset().top+(h*this.minSizeFP)/100;m=q(this.secondPane).offset().top+q(this.secondPane).height()-(h*this.minSizeSP)/100;if(e.pageY>a&&e.pageY<m){q(s).css("top",e.pageY+"px");}}};S.prototype.getCtrlKey=function(e){return!!(e.ctrlKey||e.metaKey);};S.prototype.checkModifierKey=function(e,c,a,s){return e.shiftKey==s&&e.altKey==a&&this.getCtrlKey(e)==c;};S.prototype.onsaphome=function(e){if(e.target==this.splitterBar){this.sBarPosition=this.minSizeFP;this.resizeSplitterElements();e.preventDefault();e.stopPropagation();}};S.prototype.onsapend=function(e){if(e.target==this.splitterBar){this.sBarPosition=100-this.minSizeSP;this.resizeSplitterElements();e.preventDefault();e.stopPropagation();}};S.prototype.onArrowKeys=function(e,i){var w,h,s,a,n;if(this.spOrientation==sap.ui.core.Orientation.Vertical){w=q(this.splitterDIV).width();a=q(this.firstPane).width();a=(a*100)/w;s=(10*100)/w;}else{h=q(this.splitterDIV).height();a=q(this.firstPane).height();a=(a*100)/h;s=(10*100)/h;}if(i=="false"){n=a-s;}else if(i=="true"){n=a+s;}if(n<this.minSizeFP){n=this.minSizeFP;}else if((100-n)<this.minSizeSP){n=100-this.minSizeSP;}this.sBarPosition=n;this.resizeSplitterElements();};S.prototype.onsapupmodifiers=function(e){if(this.checkModifierKey(e,false,false,true)){if(e.target==this.splitterBar){if(this.spOrientation==sap.ui.core.Orientation.Horizontal){this.onArrowKeys(e,"false");}else{this.onsapleftmodifiers(e);}}e.preventDefault();e.stopPropagation();}};S.prototype.onsapdownmodifiers=function(e){if(this.checkModifierKey(e,false,false,true)){if(e.target==this.splitterBar){if(this.spOrientation==sap.ui.core.Orientation.Horizontal){this.onArrowKeys(e,"true");}else{this.onsaprightmodifiers(e);}}e.preventDefault();e.stopPropagation();}};S.prototype.onsapleftmodifiers=function(e){if(this.checkModifierKey(e,false,false,true)){if(e.target==this.splitterBar){if(this.spOrientation==sap.ui.core.Orientation.Vertical){var r=sap.ui.getCore().getConfiguration().getRTL();if(r){this.onArrowKeys(e,"true");}else{this.onArrowKeys(e,"false");}}else{this.onsapupmodifiers(e);}}e.preventDefault();e.stopPropagation();}};S.prototype.onsaprightmodifiers=function(e){if(this.checkModifierKey(e,false,false,true)){if(e.target==this.splitterBar){if(this.spOrientation==sap.ui.core.Orientation.Vertical){var r=sap.ui.getCore().getConfiguration().getRTL();if(r){this.onArrowKeys(e,"false");}else{this.onArrowKeys(e,"true");}}else{this.onsapdownmodifiers(e);}}e.preventDefault();e.stopPropagation();}};S.prototype.ondragstart=function(e){if(e.target!=this.splitterBar){return;}e.preventDefault();e.stopPropagation();};S.prototype.getText=function(k,a){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");if(r){return r.getText(k,a);}return k;};return S;},true);
