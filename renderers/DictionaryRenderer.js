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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","../core/tsSupport/generatorHelper","../core/tsSupport/awaiterHelper","../Color","../request","../core/Error","../core/iteratorUtils","../core/lang","../core/Logger","../core/LRUCache","../core/promiseUtils","../core/accessorSupport/decorators","./Renderer","./mixins/VisualVariablesMixin","../support/arcadeOnDemand","../symbols/CIMSymbol"],function(e,t,r,i,n,o,s,a,l,u,c,p,h,f,y,d,m,b,g,v){var S=h.getLogger("esri.renderers.DictionaryRenderer");return function(e){function t(t){var r=e.call(this)||this;return r._ongoingRequests=new Map,r._symbolCache=new f(100),r.config=null,r.description=null,r.fieldMap=null,r.label=null,r.url=null,r.type="dictionary",r}r(t,e),h=t,t.prototype.clone=function(){return new h({config:p.clone(this.config),description:p.clone(this.description),fieldMap:p.clone(this.fieldMap),label:p.clone(this.label),url:p.clone(this.url),visualVariables:p.clone(this.visualVariables)})},t.prototype.collectRequiredFields=function(e,t){return s(this,void 0,void 0,function(){var r,i;return o(this,function(n){switch(n.label){case 0:return[4,this.collectVVRequiredFields(e,t)];case 1:n.sent(),r=t.map(function(e){return e.name});for(i in this.fieldMap)r.indexOf(this.fieldMap[i])<0||e.add(this.fieldMap[i]);return[2]}})})},t.prototype.fetchResources=function(e){return s(this,void 0,void 0,function(){var t,r,i,s,a,p,h,f,d,m,f,b,v,_,w,M,f,R,j;return o(this,function(o){switch(o.label){case 0:return this.url?(t=e&&e.abortOptions,r=l(this.url+"/resources/styles/dictionary-info.json",n({responseType:"json",query:{f:"json"}},t)),[4,y.all([r,g.loadArcade()])]):(S.error("no valid URL!"),[2,void 0]);case 1:if(!(i=o.sent()[0].data))throw new u("esri.renderers.DictionaryRenderer","Bad dictionary data!");if(s=i.expression,a=i.authoringInfo,this._refSymbolUrlTemplate=this.url+"/"+i.cimRefTemplateUrl,this._itemNames=c.SetFromValues(i.itemsNames),this._symbolAttributes=a.symbol,p={},this.config){h=this.config;for(f in h)p[f]=h[f]}for(d=0,m=a.configuration;d<m.length;d++)f=m[d],p.hasOwnProperty(f.name)||(p[f.name]=f.value);if(b=[],e&&e.fields)for(v=function(t){var r=_.fieldMap[t],i=e.fields.filter(function(e){return e.name===r});i.length>0&&b.push(n({},i[0],{name:t}))},_=this,w=0,M=this._symbolAttributes;w<M.length;w++)f=M[w],v(f);return[4,g.createDictionaryExpression(s,e.spatialReference,b,p)];case 2:return R=o.sent(),j={scale:0},[2,function(e,t){var r=R.repurposeFeature({geometry:null,attributes:e});return j.scale=t&&t.scale,R.evaluate({$feature:r,$view:j})}]}})})},t.prototype.getSymbol=function(e,t){return null},t.prototype.getSymbolAsync=function(e,t){return s(this,void 0,void 0,function(){var r,i,n,s,l,u,c,p,h,f,y,d,m,b,g,v,S,_,w,M,R,j,N,V,C;return o(this,function(o){switch(o.label){case 0:return this._dictionaryPromise||(this._dictionaryPromise=this.fetchResources(t)),[4,this._dictionaryPromise];case 1:for(r=o.sent(),i={},n=0,s=this._symbolAttributes;n<s.length;n++)l=s[n],u=this.fieldMap[l],u&&null!==e.attributes[u]&&void 0!==e.attributes[u]?(c=""+e.attributes[u],i[l]=c):i[l]="";if(!(p=r(i,t))||"string"!=typeof p)return[2,null];for(h=p.split(";"),f=[],y=[],d=0,m=h;d<m.length;d++)if((b=m[d])&&0!==b.length)if(-1===b.indexOf("po:"))if(-1!==b.indexOf("|"))for(M=0,R=b.split("|");M<R.length;M++)j=R[M],this._itemNames.has(j)&&f.push(j);else this._itemNames.has(b)&&f.push(b);else g=b.substr(3).split("|"),3===g.length&&(v=g[0],S=g[1],_=g[2],"DashTemplate"===S?_=_.split(" ").map(function(e){return Number(e)}):"Color"===S?(w=new a(_).toRgba(),_=[w[0],w[1],w[2],255*w[3]]):_=Number(_),y.push({primitiveName:v,propertyName:S,value:_}));return N=f.join(";")+y.map(function(e){return e.primitiveName+";"+e.propertyName+";"+e.value}),(V=this._symbolCache.get(N))?[2,V]:(C=this._cimPartsToCIMSymbol(f,y,t),this._symbolCache.put(N,C,1),[2,C])}})})},t.prototype.getSymbols=function(){return[]},t.prototype.getAttributeHash=function(){return this.visualVariables&&this.visualVariables.reduce(function(e,t){return e+t.getAttributeHash()},"")},t.prototype.getMeshHash=function(){return this.url+"-"+JSON.stringify(this.fieldMap)},t.prototype._getSymbolPart=function(e,t){return s(this,void 0,void 0,function(){var r,i,s;return o(this,function(o){switch(o.label){case 0:return this._ongoingRequests.has(e)?[2,this._ongoingRequests.get(e).then(function(e){return e.data})]:(r=this._refSymbolUrlTemplate.replace(/\{itemName\}/gi,e),i=l(r,n({responseType:"json",query:{f:"json"}},t)),this._ongoingRequests.set(e,i),[4,i]);case 1:return s=o.sent(),[2,s.data]}})})},t.prototype._combineSymbolParts=function(e,t){var r;if(!e||0===e.length)return null;if(1===e.length)return{type:"CIMSymbolReference",symbol:e[0],primitiveOverrides:t};var i=n({},e[0]);i.symbolLayers=[];for(var o=0,s=e;o<s.length;o++){var a=s[o],l=a;(r=i.symbolLayers).unshift.apply(r,l.symbolLayers)}return{type:"CIMSymbolReference",symbol:i,primitiveOverrides:t}},t.prototype._cimPartsToCIMSymbol=function(e,t,r){return s(this,void 0,void 0,function(){var i,n,s;return o(this,function(o){switch(o.label){case 0:for(i=new Array(e.length),n=0;n<e.length;n++)i[n]=this._getSymbolPart(e[n],r);return[4,y.eachAlwaysValues(i)];case 1:return s=o.sent(),[2,new v({data:this._combineSymbolParts(s,t)})]}})})};var h;return i([d.property({type:Object,json:{write:!0}})],t.prototype,"config",void 0),i([d.property({type:String,json:{write:!0}})],t.prototype,"description",void 0),i([d.property({type:Object,json:{write:!0}})],t.prototype,"fieldMap",void 0),i([d.property({type:String,json:{write:!0}})],t.prototype,"label",void 0),i([d.property({type:String,json:{write:!0}})],t.prototype,"url",void 0),t=h=i([d.subclass("esri.renderers.DictionaryRenderer")],t)}(d.declared(b.VisualVariablesMixin(m)))});