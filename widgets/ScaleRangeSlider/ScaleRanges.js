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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../core/Accessor","../../core/accessorSupport/decorators"],function(e,n,t,r,a,i,c,o){function l(e,n){var t,r=p,a=r.length,i=[],c=e;e=e>=0?e:0,n=n>0?n:r[a-1].minScale;for(var o=0;o<a;o++){var l=Math.min(r[o].minScale,n);t=Math.min(l,n),e<=l&&c<n&&i.push({id:r[o].id,maxScale:Math.max(c,e),minScale:t}),c=t+1}return i.reverse(),s(i)}function s(e){if(0===e.length)return e;var n=e[0],t=e[e.length-1];return n.minScale===n.maxScale&&(e.shift(),n.minScale+=1),t.minScale===t.maxScale&&(e.pop(),t.maxScale-=1),e}var p=[{id:"room",minScale:100},{id:"rooms",minScale:400},{id:"smallBuilding",minScale:800},{id:"building",minScale:1999},{id:"buildings",minScale:3999},{id:"street",minScale:7499},{id:"streets",minScale:14999},{id:"neighborhood",minScale:29999},{id:"town",minScale:59999},{id:"city",minScale:119999},{id:"cities",minScale:249999},{id:"metropolitanArea",minScale:499999},{id:"county",minScale:999999},{id:"counties",minScale:1999999},{id:"stateProvince",minScale:3999999},{id:"statesProvinces",minScale:6999999},{id:"countriesSmall",minScale:14999999},{id:"countriesBig",minScale:34999999},{id:"continent",minScale:99999999},{id:"world",minScale:147914382}];return function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return n.ranges=[],n}t(n,e),c=n,n.fromScaleRange=function(e){var n=e.maxScale,t=e.minScale;return new c({ranges:l(n,t)})},n.fromLayer=function(e){return i(this,void 0,void 0,function(){var n,t,r,i;return a(this,function(a){switch(a.label){case 0:return[4,e.when()];case 1:return a.sent(),n=e.get("tileInfo.lods"),n?(r=n[n.length-1].scale,i=n[0].scale,t=l(r,i)):t=l(0,0),[2,new c({ranges:t})]}})})},Object.defineProperty(n.prototype,"firstRange",{get:function(){return this.ranges[0]},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"lastRange",{get:function(){var e=this.ranges;return e[e.length-1]},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"length",{get:function(){return this.ranges.length},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"maxScale",{get:function(){return this.lastRange.maxScale},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"minScale",{get:function(){return this.firstRange.minScale},enumerable:!0,configurable:!0}),n.prototype.isMinScaleEdge=function(e){var n=this.firstRange,t=n.minScale,r=c.RecommendedScales[n.id]||n.maxScale;return e<=t&&e>=r},n.prototype.isMaxScaleEdge=function(e){var n=this.lastRange,t=n.maxScale;return e<=(c.RecommendedScales[n.id]||n.minScale)&&e>=t},n.prototype.findScaleRange=function(e){var n,t=this.ranges;if(e>=t[0].maxScale)return t[0];if(e<=t[t.length-1].minScale)return t[t.length-1];for(var r=0;r<t.length;r++){var a=t[r];if(e>=a.maxScale&&e<=a.minScale){n=a;break}}return n},n.prototype.findScaleRangeByIndex=function(e){return this.ranges[this._clampScaleRangeIndex(e)]},n.prototype.scaleToRangeIndex=function(e){return this.ranges.indexOf(this.findScaleRange(e))},n.prototype.clampScale=function(e){return Math.min(this.minScale,Math.max(this.maxScale,e))},n.prototype.clampMinScale=function(e){return 0===e?this.minScale:this.clampScale(e)},n.prototype.clampMaxScale=function(e){return this.clampScale(e)},n.prototype.contains=function(e){for(var n=this.ranges,t=!1,r=0;r<n.length;r++){var a=n[r],i=a.maxScale,c=a.minScale;if(e>=i&&e<=c){t=!0;break}}return t},n.prototype._clampScaleRangeIndex=function(e){if(e<=0)return 0;var n=this.ranges.length-1;return e>n?n:Math.floor(e)};var c;return n.RecommendedScales=Object.freeze({world:147914382,continent:5e7,countriesBig:25e6,countriesSmall:12e6,statesProvinces:6e6,stateProvince:3e6,counties:15e5,county:75e4,metropolitanArea:32e4,cities:16e4,city:8e4,town:4e4,neighborhood:2e4,streets:1e4,street:5e3,buildings:2500,building:1250,smallBuilding:800,rooms:400,room:100}),r([o.property({dependsOn:["ranges"]})],n.prototype,"firstRange",null),r([o.property({dependsOn:["ranges"]})],n.prototype,"lastRange",null),r([o.property({dependsOn:["ranges"]})],n.prototype,"length",null),r([o.property({dependsOn:["lastRange"]})],n.prototype,"maxScale",null),r([o.property({dependsOn:["firstRange"]})],n.prototype,"minScale",null),r([o.property()],n.prototype,"ranges",void 0),n=c=r([o.subclass("esri.widgets.ScaleRangeSlider.ScaleRanges")],n)}(o.declared(c))});