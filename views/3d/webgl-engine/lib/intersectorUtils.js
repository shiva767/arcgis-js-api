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

define(["require","exports","../../../../core/maybe","../../../../core/libs/gl-matrix-2/mat3","../../../../core/libs/gl-matrix-2/mat3f64","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4","../../../../core/libs/gl-matrix-2/vec4f64","../../support/geometryUtils","../../support/geometryUtils/boundedPlane","./Object3D"],function(t,e,r,i,n,a,s,o,c,l,u,h,p,f){function m(t){return function(e,r,i){return o.vec3.lerp(j,e,r,i),!p.extrusionContainsPoint(t,j)}}function d(t,e){return r.isNone(t)||null==t.layerUid?null:r.isSome(e.graphicsView)&&t.layerUid===e.graphicsView.mockLayerId?e.graphics:e.map.findLayerByUid(t.layerUid)}function y(t,e,i){if(r.isNone(t))return null;var n=d(t,e);if(r.isNone(n))return null;if(n===e.graphics)return r.isSome(e.graphicsView)?r.expect(e.graphicsView.getGraphicFromGraphicUid(t.graphicUid)):null;var a=e.allLayerViews.find(function(t){return t.layer===n});return a?g(a,t,i):null}function g(t,e,i){return!t||t.suspended?null:r.isSome(i)&&"getGraphicFromStageObject"in t?t.getGraphicFromStageObject(i.obj,i.triangleNr):"getGraphicFromGraphicUid"in t&&null!=e.graphicUid?t.getGraphicFromGraphicUid(e.graphicUid):null}function v(t,e){var r=t.metadata.layerUid;return null!=r?e.map.findLayerByUid(r):null}function b(t,e){return t.metadata.createGraphic()}Object.defineProperty(e,"__esModule",{value:!0}),e.sliceFilterPredicate=m;var _=function(){function t(){this.hud=!0,this.selectOpaqueTerrainOnly=!0,this.invisibleTerrain=!1,this.backfacesTerrain=!0,this.storeTerrainResults=!0,this.storeAll=!0}return t}();e.EnableIntersectorOptions=_;var I=function(){function t(){this._transform=s.mat4f64.create(),this._transformInverse=new O({value:this._transform},a.mat4.invert,s.mat4f64.create),this._transformInverseTranspose=new O(this._transformInverse,a.mat4.transpose,s.mat4f64.create),this._transformTranspose=new O({value:this._transform},a.mat4.transpose,s.mat4f64.create),this._transformInverseRotation=new O({value:this._transform},i.mat3.normalFromMat4Legacy,n.mat3f64.create)}return t.prototype.invalidateLazyTransforms=function(){this._transformInverse.invalidate(),this._transformInverseTranspose.invalidate(),this._transformTranspose.invalidate(),this._transformInverseRotation.invalidate()},Object.defineProperty(t.prototype,"transform",{get:function(){return this._transform},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inverse",{get:function(){return this._transformInverse.value},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inverseTranspose",{get:function(){return this._transformInverseTranspose.value},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inverseRotation",{get:function(){return this._transformInverseRotation.value},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"transpose",{get:function(){return this._transformTranspose.value},enumerable:!0,configurable:!0}),t.prototype.setTransformMatrix=function(t){a.mat4.copy(this._transform,t)},t.prototype.multiplyTransform=function(t){a.mat4.multiply(this._transform,this._transform,t)},t.prototype.set=function(t){a.mat4.copy(this._transform,t),this.invalidateLazyTransforms()},t.prototype.setAndInvalidateLazyTransforms=function(t,e){this.setTransformMatrix(t),this.multiplyTransform(e),this.invalidateLazyTransforms()},t}();e.IntersectorTransform=I;var O=function(){function t(t,e,r){this.original=t,this.update=e,this.dirty=!0,this.transform=r()}return t.prototype.invalidate=function(){this.dirty=!0},Object.defineProperty(t.prototype,"value",{get:function(){return this.dirty&&(this.update(this.transform,this.original.value),this.dirty=!1),this.transform},enumerable:!0,configurable:!0}),t}(),T=function(){function t(){this.min=new L,this.max=new L,this.hud=new L,this.terrain=new L}return t.prototype.init=function(t){this.min.init(t),this.max.init(t),this.hud.init(t),this.terrain.init(t),this.all=[]},t}();e.IntersectorResults=T;var L=function(){function t(t){this.normal=c.vec3f64.create(),this.transformation=s.mat4f64.create(),this._ray=h.ray.create(),this.init(t)}return Object.defineProperty(t.prototype,"ray",{get:function(){return this._ray},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hasIntersectionPoint",{get:function(){return null!=this.dist},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"distanceInRenderSpace",{get:function(){if(null!=this.dist)return o.vec3.scale(w,this.ray.direction,this.dist),o.vec3.length(w)},enumerable:!0,configurable:!0}),t.prototype.getIntersectionPoint=function(t){return!!this.hasIntersectionPoint&&(o.vec3.scale(w,this.ray.direction,this.dist),o.vec3.add(t,this.ray.origin,w),!0)},t.prototype.getTransformedNormal=function(t){return o.vec3.copy(P,this.normal),P[3]=0,l.vec4.transformMat4(P,P,this.transformation),o.vec3.copy(t,P),o.vec3.normalize(t,t),t},t.prototype.set=function(t,e,r,i,n,s,l,u,h,p){t instanceof f&&(t={type:"stage",obj:t}),this.dist=r,o.vec3.copy(this.normal,i),a.mat4.copy(this.transformation,n),this.target=t,this.name=e,this.drapedLayerOrder=s,this.center=l?c.vec3f64.clone(l):null,this.geometryId=u,this.triangleNr=h,this.drapedLayerGraphicOrder=p},t.prototype.copyFrom=function(t){h.ray.copy(t._ray,this._ray),this.dist=t.dist,this.target=t.target,this.name=t.name,this.drapedLayerOrder=t.drapedLayerOrder,this.center=t.center?c.vec3f64.clone(t.center):null,this.geometryId=t.geometryId,this.triangleNr=t.triangleNr,this.intersector=t.intersector,this.drapedLayerGraphicOrder=t.drapedLayerGraphicOrder,o.vec3.copy(this.normal,t.normal),a.mat4.copy(this.transformation,t.transformation)},t.prototype.init=function(t){this.dist=void 0,this.target=void 0,this.name=void 0,this.drapedLayerOrder=void 0,this.drapedLayerGraphicOrder=void 0,this.center=null,this.geometryId=null,this.triangleNr=null,this.intersector="Stage",t?h.ray.copy(t,this._ray):this._ray=h.ray.create()},t.prototype.toOwner=function(t){if(!this.target)return null;switch(this.target.type){case"stage":return d(this.target.obj.getMetadata(),t);case"external":switch(this.intersector){case"PointRenderer":return v(this.target,t);case"LodRenderer":case"DrapedRenderer":return d(this.target.metadata,t);case"TerrainRenderer":return t.map&&t.map.ground}}return null},t.prototype.toGraphic=function(t){if(!this.target)return null;switch(this.target.type){case"stage":var e=this.target.obj,r=this.triangleNr;return y(e.getMetadata(),t,{obj:e,triangleNr:r});case"external":switch(this.intersector){case"PointRenderer":return b(this.target,t);case"LodRenderer":case"DrapedRenderer":return y(this.target.metadata,t,null)}}return null},t}();e.IntersectorResult=L,e.TERRAIN_ID="terrain";var j=c.vec3f64.create(),w=c.vec3f64.create(),P=u.vec4f64.create()});