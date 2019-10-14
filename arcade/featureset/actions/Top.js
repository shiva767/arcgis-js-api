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

define(["require","exports","../../../core/tsSupport/extendsHelper","../support/FeatureSet","../support/IdSet","../support/shared","../../../core/promiseUtils"],function(t,e,n,r,s,a,o){var i=function(t){function e(e){var n=t.call(this,e)||this;return n._topnum=0,n.declaredClass="esri.arcade.featureset.actions.Top",n._countedin=0,n._maxProcessing=100,n._topnum=e.topnum,n._parent=e.parentfeatureset,n}return n(e,t),e.prototype._getSet=function(t){var e=this;return null===this._wset?this._ensureLoaded().then(function(){return e._parent._getSet(t)}).then(function(t){return e._wset=new s(t._candidates.slice(0),t._known.slice(0),!1,e._clonePageDefinition(t.pagesDefinition)),e._setKnownLength(e._wset)>e._topnum&&(e._wset._known=e._wset._known.slice(0,e._topnum)),e._setKnownLength(e._wset)>=e._topnum&&(e._wset._candidates=[]),e._wset}):o.resolve(this._wset)},e.prototype._setKnownLength=function(t){return t._known.length>0&&"GETPAGES"===t._known[t._known.length-1]?t._known.length-1:t._known.length},e.prototype._isInFeatureSet=function(t){var e=this._parent._isInFeatureSet(t);if(e===a.IdState.NotInFeatureSet)return e;var n=this._idstates[t];return n===a.IdState.InFeatureSet||n===a.IdState.NotInFeatureSet?n:e===a.IdState.InFeatureSet&&void 0===n?this._countedin<this._topnum?(this._idstates[t]=a.IdState.InFeatureSet,this._countedin++,a.IdState.InFeatureSet):(this._idstates[t]=a.IdState.NotInFeatureSet,a.IdState.NotInFeatureSet):a.IdState.Unknown},e.prototype._expandPagedSet=function(t,e,n,r,s){var a=this;if(null===this._parent)return o.reject(new Error("Parent Paging not implemented"));if(e>this._topnum&&(e=this._topnum),this._countedin>=this._topnum&&t.pagesDefinition.internal.set.length<=t.pagesDefinition.resultOffset){var i=t._known.length;return i>0&&"GETPAGES"===t._known[i-1]&&(t._known.length=i-1),i=t._candidates.length,i>0&&"GETPAGES"===t._candidates[i-1]&&(t._candidates.length=i-1),o.resolve("success")}return this._parent._expandPagedSet(t,e,n,r,s).then(function(e){return a._setKnownLength(t)>a._topnum&&(t._known.length=a._topnum),a._setKnownLength(t)>=a._topnum&&(t._candidates.length=0),e})},e.prototype._getFeatures=function(t,e,n,r){var a=this,i=[],u=this._maxQueryRate();if(!0===this._checkIfNeedToExpandKnownPage(t,u,r))return this._expandPagedSet(t,u,0,0,r).then(function(s){return a._getFeatures(t,e,n,r)});-1!==e&&void 0===this._featureCache[e]&&i.push(e);for(var _=0,h=t._lastFetchedIndex;h<t._known.length&&(_++,_<=n&&(t._lastFetchedIndex+=1),!(void 0===this._featureCache[t._known[h]]&&(t._known[h]!==e&&i.push(t._known[h]),i.length>u-1)));h++);if(0===i.length)return o.resolve("success");var d=new s([],i,!1,null),p=Math.min(i.length,n);return this._parent._getFeatures(d,-1,p,r).then(function(t){for(var e=0;e<p;e++){var n=a._parent._featureFromCache(i[e]);void 0!==n&&(a._featureCache[i[e]]=n)}return"success"})},e.prototype._getFilteredSet=function(t,e,n,r,a){var o=this;return this._ensureLoaded().then(function(){return o._getSet(a)}).then(function(t){return new s(t._candidates.slice(0).concat(t._known.slice(0)),[],!1,o._clonePageDefinition(t.pagesDefinition))})},e.prototype._refineKnowns=function(t,e){for(var n=0,r=null,s=[],o=0;o<t._candidates.length;o++){var i=this._isInFeatureSet(t._candidates[o]);if(i===a.IdState.InFeatureSet){if(t._known.push(t._candidates[o]),n+=1,null===r?r={start:o,end:o}:r.end===o-1?r.end=o:(s.push(r),r={start:o,end:o}),t._known.length>=this._topnum)break}else if(i===a.IdState.NotInFeatureSet)null===r?r={start:o,end:o}:r.end===o-1?r.end=o:(s.push(r),r={start:o,end:o}),n+=1;else if(i===a.IdState.Unknown)break;if(n>=e)break}null!==r&&s.push(r);for(var u=s.length-1;u>=0;u--)t._candidates.splice(s[u].start,s[u].end-s[u].start+1);this._setKnownLength(t)>this._topnum&&(t._known=t._known.slice(0,this._topnum)),this._setKnownLength(t)>=this._topnum&&(t._candidates=[])},e.prototype._stat=function(t,e,n,r,s,a,i){return o.resolve({calculated:!1})},e.prototype._canDoAggregates=function(t,e,n,r,s){return o.resolve(!1)},e}(r);return r._featuresetFunctions.top=function(t){return new i({parentfeatureset:this,topnum:t})},i});