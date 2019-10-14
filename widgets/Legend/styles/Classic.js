// COPYRIGHT © 2019 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/next/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","dojo/i18n!../../Legend/nls/Legend","../../../intl","../../../core/accessorSupport/decorators","../../Widget","./support/utils","../support/styleUtils","../../support/widget"],function(e,r,t,l,a,s,i,n,o,d,p){var y={widget:"esri-widget",base:"esri-legend esri-widget--panel",service:"esri-legend__service",label:"esri-legend__service-label",layer:"esri-legend__layer",groupLayer:"esri-legend__group-layer",groupLayerChild:"esri-legend__group-layer-child",layerTable:"esri-legend__layer-table",layerTableSizeRamp:"esri-legend__layer-table--size-ramp",layerChildTable:"esri-legend__layer-child-table",layerCaption:"esri-legend__layer-caption",layerBody:"esri-legend__layer-body",layerRow:"esri-legend__layer-row",layerCell:"esri-legend__layer-cell",layerInfo:"esri-legend__layer-cell esri-legend__layer-cell--info",imageryLayerStretchedImage:"esri-legend__imagery-layer-image--stretched",imageryLayerCellStretched:"esri-legend__imagery-layer-cell--stretched",imageryLayerInfoStretched:"esri-legend__imagery-layer-info--stretched",symbolContainer:"esri-legend__layer-cell esri-legend__layer-cell--symbols",symbol:"esri-legend__symbol",rampContainer:"esri-legend__ramps",sizeRamp:"esri-legend__size-ramp",colorRamp:"esri-legend__color-ramp",opacityRamp:"esri-legend__opacity-ramp",borderlessRamp:"esri-legend__borderless-ramp",rampTick:"esri-legend__ramp-tick",rampFirstTick:"esri-legend__ramp-tick-first",rampLastTick:"esri-legend__ramp-tick-last",rampLabelsContainer:"esri-legend__ramp-labels",rampLabel:"esri-legend__ramp-label",message:"esri-legend__message",header:"esri-widget__heading",hidden:"esri-hidden"};return function(e){function r(r){var t=e.call(this)||this;return t.activeLayerInfos=null,t.type="classic",t}return t(r,e),r.prototype.render=function(){var e=this,r=this.activeLayerInfos,t=this.classes(y.base,y.widget),l=r&&r.toArray().map(function(r){return e._renderLegendForLayer(r)}).filter(function(e){return!!e});return p.tsx("div",{class:t},l&&l.length?l:p.tsx("div",{class:y.message},a.noLegend))},r.prototype._renderLegendForLayer=function(e){var r,t=this;if(!e.ready)return null;var l=!!e.children.length,a="esri-legend__"+e.layer.uid+"-version-"+e.version,s=e.title?p.tsx("h3",{class:this.classes(y.header,y.label)},e.title):null;if(l){var i=e.children.map(function(e){return t._renderLegendForLayer(e)}).toArray();return p.tsx("div",{key:a,class:this.classes(y.service,y.groupLayer)},s,i)}var n=e.legendElements;if(n&&!n.length)return null;var o=n.map(function(r){return t._renderLegendForElement(r,e.layer)}).filter(function(e){return!!e});if(!o.length)return null;var d=(r={},r[y.groupLayerChild]=!!e.parent,r);return p.tsx("div",{key:a,class:this.classes(y.service,d)},s,p.tsx("div",{class:y.layer},o))},r.prototype._renderLegendForElement=function(e,r,t){var l,a=this,s="color-ramp"===e.type,i="opacity-ramp"===e.type,n="size-ramp"===e.type,c=null;if("symbol-table"===e.type||n){var g=e.infos.map(function(t){return a._renderLegendForElementInfo(t,r,n,e.legendType)}).filter(function(e){return!!e});g.length&&(c=p.tsx("div",{class:y.layerBody},g))}else"color-ramp"===e.type||"opacity-ramp"===e.type||"heatmap-ramp"===e.type||"stretch-ramp"===e.type?c=this._renderLegendForRamp(e,r.opacity):"relationship-ramp"===e.type&&(c=o.renderRelationshipRamp(e,this.id,r.opacity));if(!c)return null;var m=e.title,_=null;if("string"==typeof m)_=m;else if(m){var u=d.getTitle(m,s||i);_=d.isRendererTitle(m,s||i)&&m.title?m.title+" ("+u+")":u}var h=t?y.layerChildTable:y.layerTable,v=_?p.tsx("div",{class:y.layerCaption},_):null,f=(l={},l[y.layerTableSizeRamp]=n||!t,l);return p.tsx("div",{class:this.classes(h,f)},v,c)},r.prototype._renderLegendForRamp=function(e,r){var t=this,l=e.infos,s="opacity-ramp"===e.type,i="heatmap-ramp"===e.type,n="stretch-ramp"===e.type,o=e.preview,c=s?y.opacityRamp:"";o.className=y.colorRamp+" "+c,null!=r&&(o.style.opacity=r.toString());var g=l.map(function(e){return p.tsx("div",{class:e.label?y.rampLabel:null},i?a[e.label]:n?t._getStretchStopLabel(e):e.label)}),m={width:"24px"},_={height:o.style.height};return p.tsx("div",{class:y.layerRow},p.tsx("div",{class:y.symbolContainer,styles:m},p.tsx("div",{class:y.rampContainer,bind:o,afterCreate:d.attachToNode})),p.tsx("div",{class:y.layerInfo},p.tsx("div",{class:y.rampLabelsContainer,styles:_},g)))},r.prototype._getStretchStopLabel=function(e){return e.label?a[e.label]+": "+s.formatNumber(e.value,{style:"decimal"}):""},r.prototype._renderLegendForElementInfo=function(e,r,t,l){var a,s;if(e.type)return this._renderLegendForElement(e,r,!0);var i=null,n=d.isImageryStretchedLegend(r,l);if(e.symbol&&e.preview?i=p.tsx("div",{class:y.symbol,bind:e.preview,afterCreate:d.attachToNode}):e.src&&(i=this._renderImage(e,r,n)),!i)return null;var o=(a={},a[y.imageryLayerInfoStretched]=n,a),c=(s={},s[y.imageryLayerInfoStretched]=n,s[y.sizeRamp]=!n&&t,s);return p.tsx("div",{class:y.layerRow},p.tsx("div",{class:this.classes(y.symbolContainer,c)},i),p.tsx("div",{class:this.classes(y.layerInfo,o)},d.getTitle(e.label,!1)||""))},r.prototype._renderImage=function(e,r,t){var l,a=e.label,s=e.src,i=e.opacity,n=(l={},l[y.imageryLayerStretchedImage]=t,l[y.symbol]=!t,l),o={opacity:""+(null!=i?i:r.opacity)};return p.tsx("img",{alt:d.getTitle(a,!1),src:s,border:0,width:e.width,height:e.height,class:this.classes(n),styles:o})},l([p.renderable(),i.property()],r.prototype,"activeLayerInfos",void 0),l([i.property({readOnly:!0})],r.prototype,"type",void 0),r=l([i.subclass("esri.widgets.Legend.styles.Classic")],r)}(i.declared(n))});