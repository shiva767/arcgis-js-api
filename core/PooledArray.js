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

define(["require","exports","./tsSupport/generatorHelper","./arrayUtils","./HeapSort"],function(t,e,i,a,h){return function(){function t(t){var e=this;this.data=[],this._length=0,this._allocator=null,this._deallocator=function(){},this._shrink=function(){},this._hint=new a.RemoveHint,t&&(t.initialSize&&(this.data=new Array(t.initialSize)),t.allocator?(this._allocator=t.allocator,this._deallocator=t.deallocator):"deallocator"in t&&(this._deallocator=t.deallocator),t.shrink&&(this._shrink=function(){e.data.length>1.5*e.length&&(e.data.length=Math.floor(1.1*e.length))}))}return t.prototype.toArray=function(){return this.data.slice(0,this.length)},t.prototype.getItemAt=function(t){if(!(t<0||t>=this._length))return this.data[t]},Object.defineProperty(t.prototype,"length",{get:function(){return this._length},set:function(t){if(t>this._length){if(this._allocator){for(;this._length<t;)this.data[this._length++]=this._allocator(this.data[this._length]);return}return void(this._length=t)}if(this._deallocator)for(var e=t;e<this._length;++e)this.data[e]=this._deallocator(this.data[e]);this._length=t,this._shrink()},enumerable:!0,configurable:!0}),t.prototype.clear=function(){this.length=0},t.prototype.prune=function(){this.clear(),this.data=[]},t.prototype.equal=function(t){return a.equals(this.data,t.data)},t.prototype.push=function(t){return this.data[this._length++]=t,t},t.prototype.pushArray=function(t,e){void 0===e&&(e=t.length);for(var i=0;i<e;i++)this.data[this._length++]=t[i];return this.back()},t.prototype.pushNew=function(){return this._allocator&&(this.data[this.length]=this._allocator(this.data[this.length])),++this._length,this.back()},t.prototype.pop=function(){if(0!==this.length){var t=this.data[this.length-1];return this.length=this.length-1,this._shrink(),t}},t.prototype.iterableRemoveMany=function(t){var e,a;return i(this,function(i){switch(i.label){case 0:e=[],a=0,i.label=1;case 1:return a<this.length?a>=this.length?[3,4]:(t.indexOf(this.data[a])<0&&e.push(this.data[a]),[4]):[3,4];case 2:i.sent(),i.label=3;case 3:return++a,[3,1];case 4:return this.data=e,this._length=this.data.length,[2]}})},t.prototype.removeUnordered=function(t){var e=a.removeUnordered(this.data,t,this.length,this._hint);return void 0!==e&&(this.length=this.length-1),e},t.prototype.removeUnorderedIndex=function(t){if(!(t>=this.length||t<0))return this.swapElements(t,this.length-1),this.pop()},t.prototype.removeUnorderedMany=function(t,e,i){void 0===e&&(e=t.length),this.length=a.removeUnorderedMany(this.data,t,this.length,e,this._hint,i)},t.prototype.front=function(){if(0!==this.length)return this.data[0]},t.prototype.back=function(){if(0!==this.length)return this.data[this.length-1]},t.prototype.swapElements=function(t,e){var i;t>=this.length||e>=this.length||t===e||(i=[this.data[e],this.data[t]],this.data[t]=i[0],this.data[e]=i[1])},t.prototype.sort=function(t){h.sort(this.data,0,this.length,t)},t.prototype.iterableSort=function(t){return h.iterableSort(this.data,0,this.length,t)},t.prototype.some=function(t,e){for(var i=0;i<this.length;++i)if(t.call(e,this.data[i],i,this.data))return!0;return!1},t.prototype.find=function(t,e){for(var i=0;i<this.length;++i){var a=this.data[i];if(t.call(e,a,i,this.data))return a}},t.prototype.filterInPlace=function(t,e){for(var i=0,a=0;a<this._length;++a){var h=this.data[a];t.call(e,h,a,this.data)&&(this.data[a]=this.data[i],this.data[i]=h,i++)}if(this._deallocator)for(var a=i;a<this._length;a++)this.data[a]=this._deallocator(this.data[a]);return this._length=i,this},t.prototype.forEach=function(t,e){for(var i=this.length,a=0;a<Math.min(this.length,i);++a)t.call(e,this.data[a],a,this.data)},t.prototype.iterableForEach=function(){var t;return i(this,function(e){switch(e.label){case 0:t=0,e.label=1;case 1:return t<this.length?[4,this.data[t]]:[3,4];case 2:e.sent(),e.label=3;case 3:return++t,[3,1];case 4:return[2]}})},t.prototype.map=function(t,e){for(var i=new Array(this.length),a=0;a<this.length;++a)i[a]=t.call(e,this.data[a],a,this.data);return i},t}()});