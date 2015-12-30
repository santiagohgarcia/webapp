/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./FormLayout','./GridContainerData','./GridElementData','sap/ui/layout/library'],function(q,F,G,a,l){"use strict";var b=F.extend("sap.ui.layout.form.GridLayout",{metadata:{library:"sap.ui.layout",properties:{singleColumn:{type:"boolean",group:"Misc",defaultValue:false}}}});(function(){b.prototype.toggleContainerExpanded=function(c){this.invalidate();};b.prototype.onAfterRendering=function(){var f=this.getParent();if(f){var c=f.getFormContainers();for(var i=0;i<c.length;i++){var C=c[i];if(C.getExpandable()){C._oExpandButton.$().attr("tabindex","-1");}}}};b.prototype.contentOnAfterRendering=function(f,c){F.prototype.contentOnAfterRendering.apply(this,arguments);if(c.getMetadata().getName()!="sap.ui.commons.Image"){c.$().css("width","100%");}};b.prototype.onLayoutDataChange=function(e){if(this.getDomRef()){this.rerender();}};b.prototype.onsaptabnext=function(e){this.tabForward(e);};b.prototype.onsaptabprevious=function(e){this.tabBack(e);};b.prototype.findFieldOfElement=function(e,s,L){if(!L){return F.prototype.findPrevFieldOfElement.apply(this,arguments);}if(!e.getVisible()){return null;}var f=e.getFields();var n;var I=f.length;s=I-1;for(var i=s;i>=0;i--){var o=f[i];var c=o.$().offset().left;if(L<c&&i!=0){continue;}var d=this._getDomRef(o);if((!o.getEnabled||o.getEnabled())&&d){n=d;break;}}return n;};b.prototype.findFieldBelow=function(c,e){var C=e.getParent();var d=C.indexOfFormElement(e);var n;if(C.getVisible()){var E=C.getFormElements();var m=E.length;var i=d+1;var L=c.$().offset().left;while(!n&&i<m){var N=E[i];n=this.findFieldOfElement(N,0,L);i++;}}if(!n){var f=C.getParent();d=f.indexOfFormContainer(C);n=this.findFirstFieldOfFirstElementInNextContainer(f,d+1);}return n;};b.prototype.findFieldAbove=function(c,e){var C=e.getParent();var d=C.indexOfFormElement(e);var n;if(C.getVisible()){var E=C.getFormElements();var i=d-1;var L=c.$().offset().left;while(!n&&i>=0){var N=E[i];n=this.findFieldOfElement(N,0,L);i--;}}if(!n){var f=C.getParent();d=f.indexOfFormContainer(C);n=this.findLastFieldOfLastElementInPrevContainer(f,d-1);}return n;};b.prototype.getContainerRenderedDomRef=function(c){return null;};b.prototype.getElementRenderedDomRef=function(e){if(this.getDomRef()){var s=this.getSingleColumn();var c=e.getParent();var C=this.getLayoutDataForElement(c,"sap.ui.layout.form.GridContainerData");var t=this;if((s||!C||!C.getHalfGrid())&&!this.getRenderer().checkFullSizeElement(t,e)){return q.sap.domById(e.getId());}}return null;};}());return b;},true);
