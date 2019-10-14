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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/generatorHelper","../core/tsSupport/awaiterHelper","../core/Collection","../core/CollectionFlattener","../core/Error","../core/maybe","../core/MultiOriginJSONSupport","../core/promiseUtils","../core/accessorSupport/decorators","../geometry/SpatialReference","./Layer","./mixins/OperationalLayer","./mixins/PortalLayer","./mixins/RefreshableLayer","./mixins/ScaleRangeLayer","./support/KMLSublayer","./support/kmlUtils"],function(e,r,t,o,i,s,n,l,a,p,u,y,c,d,f,b,h,v,S,g,m,L){return function(r){function y(e,t){var o=r.call(this)||this;return o._visibleFolders=[],o.allSublayers=new a({root:o,rootCollectionNames:["sublayers"],getChildrenFunction:function(e){return e.sublayers}}),o.outSpatialReference=f.WGS84,o.path=null,o.operationalLayerType="KML",o.sublayers=null,o.type="kml",o.url=null,o.watch("sublayers",function(e,r){r&&r.forEach(function(e){e.parent=null,e.layer=null}),e&&e.forEach(function(e){e.parent=o,e.layer=o})},!0),o}return o(y,r),y.prototype.normalizeCtorArgs=function(e,r){return"string"==typeof e?t({url:e},r):e},y.prototype.readSublayersFromItemOrWebMap=function(e,r,t){this._visibleFolders=r.visibleFolders},y.prototype.readSublayers=function(e,r,t){return L.sublayersFromJSON(m,r,t,this._visibleFolders)},y.prototype.writeSublayers=function(e,r,t,o){for(var i=e,s=[],n=i.toArray();n.length;){var l=n[0];l.networkLink||(l.visible&&s.push(l.id),l.sublayers&&n.push.apply(n,l.sublayers.toArray())),n.shift()}r.visibleFolders=s},Object.defineProperty(y.prototype,"title",{get:function(){if(this._get("title")&&"defaults"!==this.originOf("title"))return this._get("title");if(this.url){var e=this.url.substring(this.url.lastIndexOf("/")+1,this.parsedUrl.path.lastIndexOf("."));return 0===e.length&&(e="KML"),e}return this._get("title")||""},set:function(e){this._set("title",e)},enumerable:!0,configurable:!0}),Object.defineProperty(y.prototype,"visibleSublayers",{get:function(){var e=this.sublayers,r=[],t=function(e){e.visible&&(r.push(e),e.sublayers&&e.sublayers.forEach(t))};return e&&e.forEach(t),r},enumerable:!0,configurable:!0}),y.prototype.load=function(e){var r=this,t=u.isSome(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["KML"]},e).then(function(){return r._fetchService(t)})),this.when()},y.prototype.importLayerViewModule=function(r){return n(this,void 0,void 0,function(){return s(this,function(t){switch(r.type){case"2d":return[2,c.create(function(r){return e(["../views/2d/layers/KMLLayerView2D"],r)})];case"3d":return[2,c.reject(new p("kml-layer:view-not-supported","KMLLayer is only supported in 2D"))]}return[2]})})},y.prototype._fetchService=function(e){return n(this,void 0,void 0,function(){var r,t,o=this;return s(this,function(i){switch(i.label){case 0:return[4,c.resolve().then(function(){return o.resourceInfo?{ssl:!1,data:o.resourceInfo}:L.fetchService(o.url,o.outSpatialReference,o.refreshInterval,e)})];case 1:return r=i.sent(),t=L.parseKML(r.data),t&&this.read(t,{origin:"service"}),[2]}})})},i([d.property({readOnly:!0})],y.prototype,"allSublayers",void 0),i([d.property({type:f})],y.prototype,"outSpatialReference",void 0),i([d.property({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],y.prototype,"path",void 0),i([d.property({type:["show","hide"]})],y.prototype,"listMode",void 0),i([d.property({type:["KML"]})],y.prototype,"operationalLayerType",void 0),i([d.property({type:l.ofType(m),json:{write:{ignoreOrigin:!0}}})],y.prototype,"sublayers",void 0),i([d.reader(["web-map","portal-item"],"sublayers",["visibleFolders"])],y.prototype,"readSublayersFromItemOrWebMap",null),i([d.reader("service","sublayers",["sublayers"])],y.prototype,"readSublayers",null),i([d.writer("sublayers")],y.prototype,"writeSublayers",null),i([d.property({readOnly:!0,json:{read:!1}})],y.prototype,"type",void 0),i([d.property({json:{origins:{"web-map":{read:{source:"title"}}},write:{ignoreOrigin:!0}},dependsOn:["url","parsedUrl"]})],y.prototype,"title",null),i([d.property()],y.prototype,"url",void 0),i([d.property({readOnly:!0,dependsOn:["sublayers"]})],y.prototype,"visibleSublayers",null),y=i([d.subclass("esri.layers.KMLLayer")],y)}(d.declared(S.RefreshableLayer(g.ScaleRangeLayer(h.OperationalLayer(v.PortalLayer(y.MultiOriginJSONMixin(b)))))))});