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

define(["require","exports","../../../../../core/tsSupport/extendsHelper","../../../../../core/tsSupport/generatorHelper","../../../../../core/tsSupport/awaiterHelper","../../../../../core/Logger","../../../../../core/promiseUtils","../../../../../support/arcadeOnDemand","../../../../../symbols/support/cimSymbolUtils","../../../arcade/utils"],function(e,t,r,T,s,n,p,w,x,l){Object.defineProperty(t,"__esModule",{value:!0});var o=n.getLogger("esri/views/2d/engine/webgl/util/Matcher"),i=function(){function o(){this._defaultResult=null}return o.fromBasicRenderer=function(i,a,l){return s(this,void 0,void 0,function(){var t,r,n;return T(this,function(e){switch(e.label){case 0:return[4,x.expandSymbols(i.getSymbols())];case 1:return t=e.sent(),r=new o,t.length?[4,a.createTemplateGroup(t[0],null,i,l)]:[3,3];case 2:n=e.sent(),r.setDefault(n),e.label=3;case 3:return[2,r]}})})},o.prototype.size=function(){return 1},o.prototype.getDefault=function(){return this._defaultResult},o.prototype.setDefault=function(e){this._defaultResult=e},o.prototype.match=function(e,t,r,n,i){return this.getDefault()},o.prototype.analyze=function(e,t,r,n,i){return s(this,void 0,void 0,function(){return T(this,function(e){return[2]})})},o}(),a=function(a){function M(e,t,r,n){var i=a.call(this)||this;return i._intervals=[],i._isMaxInclusive=t,n?i._getValue=l.callWithFeature.bind(null,n):e&&e.length?i._getValue="function"==typeof e?(i._field=null,e):(i._field=e,i._normalizationInfo=r,i._getValueFromField.bind(i)):i._field=null,i}return r(M,a),M.fromCBRenderer=function(g,y,z){return s(this,void 0,void 0,function(){var t,r,n,i,a,l,o,s,u,c,f,p,h,d,m,_,v,b;return T(this,function(e){switch(e.label){case 0:return t=g.isMaxInclusive,r=g.normalizationField,n=g.normalizationTotal,i=g.normalizationType,a=g.field,l={normalizationField:r,normalizationTotal:n,normalizationType:i},o=g.valueExpression,(s=o)?[4,w.createRendererExpression(o,z.spatialReference,z.fields)]:[3,2];case 1:s=e.sent(),e.label=2;case 2:return u=new M(a,t,l,s),[4,x.expandSymbol(g.backgroundFillSymbol)];case 3:c=e.sent(),f=0,p=g.classBreakInfos,e.label=4;case 4:return f<p.length?(h=p[f],[4,x.expandSymbol(h.symbol)]):[3,8];case 5:return d=e.sent(),[4,y.createTemplateGroup(d,c,g,z)];case 6:m=e.sent(),_={min:h.minValue,max:h.maxValue},u.add(_,m),e.label=7;case 7:return f++,[3,4];case 8:return[4,x.expandSymbol(g.defaultSymbol)];case 9:return(v=e.sent())?[4,y.createTemplateGroup(v,c,g,z)]:[3,11];case 10:b=e.sent(),u.setDefault(b),e.label=11;case 11:return[2,u]}})})},M.prototype.add=function(e,t){this._intervals.push({interval:e,result:t}),this._intervals.sort(function(e,t){return e.interval.min-t.interval.min})},M.prototype.size=function(){return a.prototype.size.call(this)+this._intervals.length},M.prototype.match=function(e,t,r,n,i){if(!this._getValue)return this.getDefault();var a=this._getValue(t,{$view:i},r,n);if(!a&&(null==a||isNaN(a)))return this.getDefault();for(var l=0;l<this._intervals.length;l++){var o=this._intervals[l],s=o.interval,u=o.result,c=a>=s.min,f=this._isMaxInclusive?a<=s.max:a<s.max;if(c&&f)return u}return this.getDefault()},M.prototype._needsNormalization=function(){var e=this._normalizationInfo;return e&&(e.normalizationField||e.normalizationTotal||e.normalizationType)},M.prototype._getValueFromField=function(e){var t=e.attributes[this._field];if(!this._needsNormalization())return t;var r=this._normalizationInfo,n=r.normalizationField,i=r.normalizationTotal,a=r.normalizationType,l=!!n&&e.attributes[n];if(a)switch(a){case"field":return l?t/l:void 0;case"log":return Math.log(t)*Math.LOG10E;case"percent-of-total":return t/i*100;default:return void o.error("Found unknown normalization type: "+a)}else o.error("Normalization is required, but no type was set!")},M}(t.FeatureMatcher=i);t.IntervalMatcher=a;var u=function(i){function v(e,t,r){var n=i.call(this)||this;return n._resultsMap=new Map,r?n._getValue=l.callWithFeature.bind(null,r):e&&e.length?"function"==typeof e[0]?(n._fields=null,n._getValue=e[0]):(n._fields=e,n._seperator=t||"",n._getValue=n._getValueFromFields.bind(n)):n._fields=null,n}return r(v,i),v.fromUVRenderer=function(d,m,_){return s(this,void 0,void 0,function(){var t,r,n,i,a,l,o,s,u,c,f,p,h;return T(this,function(e){switch(e.label){case 0:return t=d.uniqueValueInfos,r=d.fieldDelimiter,n=[d.field],i=d.valueExpression,d.field2&&n.push(d.field2),d.field3&&n.push(d.field3),[4,x.expandSymbol(d.backgroundFillSymbol)];case 1:return a=e.sent(),(l=i)?[4,w.createRendererExpression(i,_.spatialReference,_.fields)]:[3,3];case 2:l=e.sent(),e.label=3;case 3:o=new v(n,r,l),s=0,u=t,e.label=4;case 4:return s<u.length?(c=u[s],[4,x.expandSymbol(c.symbol)]):[3,8];case 5:return f=e.sent(),[4,m.createTemplateGroup(f,a,d,_)];case 6:p=e.sent(),o.add(c.value,p),e.label=7;case 7:return s++,[3,4];case 8:return[4,x.expandSymbol(d.defaultSymbol)];case 9:return e.sent()?[4,m.createTemplateGroup(d.defaultSymbol,a,d,_)]:[3,11];case 10:h=e.sent(),o.setDefault(h),e.label=11;case 11:return[2,o]}})})},v.prototype.add=function(e,t){this._resultsMap.set(e.toString(),t)},v.prototype.size=function(){return i.prototype.size.call(this)+this._resultsMap.size},v.prototype.match=function(e,t,r,n,i){if(!this._getValue)return this.getDefault();var a=this._getValue(t,{$view:i},r,n);if(!a&&null==a)return this.getDefault();var l=a.toString();return this._resultsMap.has(l)?this._resultsMap.get(l):this.getDefault()},v.prototype._getValueFromFields=function(e){for(var t=[],r=0,n=this._fields;r<n.length;r++){var i=n[r],a=e.attributes[i];t.push(a)}return t.join(this._seperator)},v}(i);t.MapMatcher=u;var c=function(i){function a(e,t,r){var n=i.call(this)||this;return n._fidToAttributeHash=new Map,n._attributeHashToGroup=new Map,n._renderer=e,n._fieldMap=e.fieldMap,n._templates=t,n._info=r,n}return r(a,i),a.fromDictionaryRenderer=function(t,r,n){return s(this,void 0,void 0,function(){return T(this,function(e){return t.fetchResources({spatialReference:n.spatialReference,fields:n.fields}),[2,new a(t,r,n)]})})},a.prototype.analyze=function(u,a,e,c,f){return s(this,void 0,void 0,function(){var l,t,o,r,n,i,s=this;return T(this,function(e){switch(e.label){case 0:for(l=[],t=function(e){var t=e.attributes[u],r=o._fidToAttributeHash.get(t),n=o._hashAttributes(e);if(r===n)return"continue";if(o._fidToAttributeHash.set(t,n),!o._attributeHashToGroup.has(n)){var i={scale:c&&c.scale,viewingMode:c&&c.viewingMode,spatialReference:o._info.spatialReference,abortOptions:f,fields:o._info.fields},a=o._renderer.getSymbolAsync(e,i).then(function(e){return s._templates.createTemplateGroup(e,null,s._renderer,s._info).then(function(e){return s._attributeHashToGroup.set(n,e)})});l.push(a)}},o=this,r=0,n=a;r<n.length;r++)i=n[r],t(i);return[4,p.all(l)];case 1:return e.sent(),[2]}})})},a.prototype.match=function(e,t,r,n,i){var a=t.attributes[e],l=this._fidToAttributeHash.get(a);return this._attributeHashToGroup.get(l)},a.prototype._hashAttributes=function(e){var t="";for(var r in this._fieldMap)t+=". "+e.attributes[this._fieldMap[r]];return t},a}(i);t.DictionaryMatcher=c});