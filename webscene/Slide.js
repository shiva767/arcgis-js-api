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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/generatorHelper","../core/tsSupport/awaiterHelper","../Basemap","../Viewpoint","../core/asyncUtils","../core/Collection","../core/collectionUtils","../core/JSONSupport","../core/Logger","../core/promiseUtils","../core/accessorSupport/decorators","../core/accessorSupport/ensureType","../core/libs/gl-matrix-2/vec3","../core/libs/gl-matrix-2/vec3f64","../layers/Layer","../support/basemapUtils","../views/3d/support/mathUtils","../webdoc/support/Thumbnail","./Environment","./Lighting","./support/Description","./support/SlideGround","./support/SlideVisibleLayer","./support/Title"],function(e,t,n,i,r,o,s,a,l,p,u,c,d,h,y,f,v,m,g,b,w,T,L,_,S,C,U,j,V){function x(e){if("building-scene"===e.type||"map-image"===e.type)return e.allSublayers}function E(e){var t=x(e);if(t)return t.filter(function(e){return e.visible}).map(function(e){return e.id}).toArray()}function q(e,t){var n=t-e;return n>M&&(n-=I),n<-M&&(n+=I),n}function A(e,t){return T.moduloPositive(e+t,I)}var D=0,H=u.ofType(j.default),O=h.getLogger("esri.webscene.Slide"),R=function(e){function t(t){var n=e.call(this,t)||this;return n._applyToController=null,n.id=Date.now().toString(16)+"-slide-"+D++,n.title=new V.default,n.description=new C.default,n.thumbnail=new L.default,n.viewpoint=null,n.basemap=null,n.ground=null,n.environment=new _,n.visibleLayers=new H,n}return i(t,e),t.prototype.castTitle=function(e){return"string"==typeof e?new V.default({text:e}):v.ensureType(V.default,e)},t.prototype.castDescription=function(e){return"string"==typeof e?new C.default({text:e}):v.ensureType(C.default,e)},t.prototype.castThumbnail=function(e){return"string"==typeof e?new L.default({url:e}):v.ensureType(L.default,e)},t.prototype.castBasemap=function(e){return w.ensureType(e)},Object.defineProperty(t.prototype,"visibleLayers",{set:function(e){this._set("visibleLayers",c.referenceSetter(e,this._get("visibleLayers"),H))},enumerable:!0,configurable:!0}),t.prototype.castVisibleLayers=function(e){return e&&"function"==typeof e.map?e.map(function(e){if("string"==typeof e)return{id:e};if(e instanceof b){var t=E(e);return{id:e.id,sublayerIds:t}}return e.id?{id:e.id,sublayerIds:e.sublayerIds}:(O.warn('Invalid visible layer, expected { id }, Layer or "id"'),e)}):null},t.prototype.clone=function(){return new(0,this.constructor)({id:this.id,title:this.title.clone(),thumbnail:this.thumbnail.clone(),description:this.description&&this.description.clone()||null,viewpoint:this.viewpoint&&this.viewpoint.clone()||null,basemap:this.basemap&&this.basemap.clone()||null,ground:this.ground&&this.ground.clone()||null,visibleLayers:this.visibleLayers.clone(),environment:this.environment&&this.environment.clone()||null})},t.prototype._updateVisibleLayersFrom=function(e){var t=this,n=[];return y.eachAlways(this._allLayers(e.map).map(function(t){return e.whenLayerView(t).then(function(e){if(e.visible){var i=E(t);n.push(new j.default({id:e.layer.id,sublayerIds:i}))}})}).toArray()).then(function(){t.visibleLayers.removeAll(),t.visibleLayers.addMany(n)})},t.prototype.updateFrom=function(e,t){var i=this;return t={screenshot:n({format:"jpeg",quality:80,width:120,height:75,disableSlice:!0},t&&t.screenshot)},e.when(function(){return i.viewpoint=e.viewpoint.clone(),i.environment.lighting=S.prototype.clone.apply(e.environment.lighting),i.basemap=e.map.basemap&&e.map.basemap.clone()||null,i.ground=e.map.ground?U.default.fromGround(e.map.ground):null,i._updateVisibleLayersFrom(e)}).then(function(){return e.takeScreenshot(t.screenshot)}).then(function(e){return i.thumbnail=new L.default({url:e.dataUrl}),i})},t.prototype.applyTo=function(e,t){return s(this,void 0,void 0,function(){var i,r,s;return o(this,function(o){return this._applyToController&&this._applyToController.abort(),i=y.createAbortController(),this._applyToController=i,y.onAbortOrThrow(t,function(){return i.abort()}),r=n({animate:!0},t,{signal:this._applyToController.signal}),s=y.createDeferred(function(){i.abort()}),this._applyTo(e,r,i).then(s.resolve,s.reject),[2,s.promise]})})},t.prototype._applyTo=function(e,t,n){return s(this,void 0,void 0,function(){var i,r=this;return o(this,function(a){switch(a.label){case 0:return[4,p.result(function(){return s(r,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return[4,this._applyBasemap(e,t)];case 1:return n.sent(),this._applyLayerVisibility(e),this._applyGround(e),[4,this._applyViewpoint(e,t)];case 2:return n.sent(),[2]}})})}())];case 1:if(i=a.sent(),this._applyToController===n&&(this._applyToController=null),!1===i.ok)throw i.error;return[2,this]}})})},t.prototype._applyBasemap=function(e,t){return s(this,void 0,void 0,function(){var n;return o(this,function(i){switch(i.label){case 0:if(!this.basemap)return[3,5];i.label=1;case 1:return i.trys.push([1,3,,4]),[4,this.basemap.load(t)];case 2:return i.sent(),[3,4];case 3:if(n=i.sent(),y.isAbortError(n))throw n;return[3,4];case 4:e.map.basemap=w.clonePreservingTiledLayers(this.basemap,e.map.basemap),i.label=5;case 5:return[2]}})})},t.prototype._applyGround=function(e){this.ground&&(e.map.ground=this.ground.cloneAndApplyTo(e.map.ground))},t.prototype._allLayers=function(e){var t=new u;return this._collectLayers(e,t),this._collectLayers(e.ground,t),t},t.prototype._collectLayers=function(e,t){var n=this;e.layers.forEach(function(e){t.add(e);var i=e;i.layers&&n._collectLayers(i,t)})},t.prototype._applyLayerVisibility=function(e){var t=this;if(this.visibleLayers){this._allLayers(e.map).forEach(function(e){var n=t.visibleLayers.find(function(t){return t.id===e.id});e.visible=null!=n;var i=n&&n.sublayerIds,r=x(e);i&&r&&r.forEach(function(e){return e.visible=i.indexOf(e.id)>=0})})}},t.prototype._applyViewpoint=function(e,t){return s(this,void 0,void 0,function(){return o(this,function(n){switch(n.label){case 0:return!this.viewpoint||t.ignoreViewpoint?[3,5]:(this.viewpoint.camera.fov=e.camera.fov,t.animate?this.get("environment.lighting.date")?[4,this._animateToLighting(e,t)]:[3,2]:[3,4]);case 1:return n.sent(),[2];case 2:return e.environment.lighting=this.environment.lighting.clone(),[4,e.goTo(this.viewpoint,t)];case 3:n.sent(),n.label=4;case 4:return e.viewpoint=this.viewpoint,e.environment.lighting=this.environment.lighting.clone(),[3,6];case 5:e.environment.lighting=this.environment.lighting.clone(),n.label=6;case 6:return[2]}})})},t.prototype._animateToLighting=function(e,t){return s(this,void 0,void 0,function(){var n,i,r,s=this;return o(this,function(o){return n=null,"global"===e.viewingMode&&(n=this._animateLightingWithCamera(e)),e.environment.lighting.cameraTrackingEnabled=!1,e.environment.lighting.directShadowsEnabled=this.environment.lighting.directShadowsEnabled,null!=this.environment.lighting.displayUTCOffset&&(e.environment.lighting.displayUTCOffset=this.environment.lighting.displayUTCOffset),i=e.goTo(this.viewpoint,t),i.then(function(){e.environment.lighting=s.environment.lighting.clone()}),r=function(){n&&n.remove(),e.environment.lighting.cameraTrackingEnabled=!0},i.catch(function(e){throw r(),e}).then(r),[2,i]})})},t.prototype._getTime=function(e){return[e.getTime(),3600*e.getUTCHours()+60*e.getUTCMinutes()+e.getUTCSeconds()]},t.prototype._setTime=function(e,t,n){return e.setTime(t),e.setUTCHours(n/3600),e.setUTCMinutes(n%3600/60),e.setUTCSeconds(n%3600%60),e},t.prototype._animateLightingWithCamera=function(e){var t=this,n=new Date(e.environment.lighting.date.toString()),i=this._getTime(n),r=i[0],o=i[1],s=this._getTime(this.environment.lighting.date),a=s[0],l=s[1],p=q(o,l),u=e.renderCoordsHelper,c=g.vec3f64.create();u.toRenderCoords(e.camera.position,c);var d=g.vec3f64.create();u.toRenderCoords(this.viewpoint.camera.position,d);var h=g.vec3f64.create(),y=new Date;return e.watch("camera",function(n){u.toRenderCoords(n.position,h);var i=m.vec3.squaredDistance(c,h),s=m.vec3.squaredDistance(d,h),l=0;i+s!==0&&(l=i/(i+s));var f=r+(a-r)*l,v=A(o,p*l);e.environment.lighting.date=t._setTime(y,f,v)})},t.createFrom=function(e,t){return(new this).updateFrom(e,t)},r([f.property({type:String,json:{write:{isRequired:!0}}})],t.prototype,"id",void 0),r([f.property({type:V.default,json:{default:function(){return new V.default({text:""})},write:{isRequired:!0}}})],t.prototype,"title",void 0),r([f.cast("title")],t.prototype,"castTitle",null),r([f.property({type:C.default,json:{write:{overridePolicy:function(e){return{enabled:!(!e||!e.text)}}}}})],t.prototype,"description",void 0),r([f.cast("description")],t.prototype,"castDescription",null),r([f.property({type:L.default,json:{default:function(){return new L.default({url:""})},write:{isRequired:!0}}})],t.prototype,"thumbnail",void 0),r([f.cast("thumbnail")],t.prototype,"castThumbnail",null),r([f.property({type:l,nonNullable:!0,json:{write:{isRequired:!0}}})],t.prototype,"viewpoint",void 0),r([f.property({type:a,json:{read:{source:"baseMap"},write:{target:"baseMap"}}})],t.prototype,"basemap",void 0),r([f.cast("basemap")],t.prototype,"castBasemap",null),r([f.property({type:U.default,json:{write:!0}})],t.prototype,"ground",void 0),r([f.property({type:H,json:{write:{isRequired:!0}}})],t.prototype,"visibleLayers",null),r([f.cast("visibleLayers")],t.prototype,"castVisibleLayers",null),r([f.property({type:_,json:{write:!0}})],t.prototype,"environment",void 0),t=r([f.subclass("esri.webscene.Slide")],t)}(f.declared(d.JSONSupport)),I=86400,M=43200;return R});