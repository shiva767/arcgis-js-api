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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/assignHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../core/asyncUtils","../../../core/compilerUtils","../../../core/Error","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../layers/graphics/dehydratedFeatures","../../../layers/graphics/controllers/FeatureTileController3D","./FeatureLikeLayerView3D","./LayerView3D","./support/FeatureTileFetcher3DLayerViewContext","./support/layerViewUpdatingProperties","../support/EventedSet","../../layers/FeatureLayerView","../../layers/LayerView","../../layers/RefreshableLayerView"],function(e,t,r,i,o,a,s,n,u,l,p,c,h,d,y,m,f,g,v,F,b,x,C){return function(e){function t(t){var r=e.call(this)||this;return r._controllerTotal=0,r._graphicsCoreTotal=0,r.suspendResumeExtentMode="data",r}return r(t,e),t.prototype.destroy=function(){this.fetcherContext&&(this.fetcherContext.destroy(),this.fetcherContext=null)},Object.defineProperty(t.prototype,"updatingPercentageValue",{get:function(){var e=0,t=0;this.controller&&this.controller.updating&&(e+=this.controller.updatingRemaining,t=this.controller.updatingTotal);var r=0;this.graphics3d&&this.graphics3d.graphicsCore&&(e+=this.graphics3d.graphicsCore.updatingRemaining,r=this.graphics3d.graphicsCore.updatingTotal),0===t&&0===r?(this._controllerTotal=0,this._graphicsCoreTotal=0):(this._controllerTotal=Math.max(t,this._controllerTotal),this._graphicsCoreTotal=Math.max(r,this._graphicsCoreTotal));var i=this._controllerTotal+this._graphicsCoreTotal;return i?(i-e)/i*100:100},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"maximumNumberOfFeaturesExceeded",{get:function(){return!!this.controller&&!(this.suspended||!this.controller.maximumNumberOfFeaturesExceeded)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"asyncGraphicsUpdates",{get:function(){if(this.controller)switch(this.controller.mode){case"snapshot":return this.controller.serviceDataCount>5e3;case"tiles":return!0;default:u.neverReached(this.controller.mode)}return!0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hasZ",{get:function(){var e=this.layer,t=e.capabilities&&e.capabilities.data;return!(!t||!t.supportsZ)&&("returnZ"in e&&null!=e.returnZ?e.returnZ:t.supportsZ)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hasM",{get:function(){var e=this.layer,t=e.capabilities&&e.capabilities.data;return!(!t||!t.supportsM)&&"returnM"in e&&null!=e.returnM&&e.returnM},enumerable:!0,configurable:!0}),t.prototype.fetchPopupFeatures=function(e,t){return s(this,void 0,void 0,function(){var e;return a(this,function(r){return e=this.validateFetchPopupFeatures(t),e?[2,p.reject(e)]:[2,this.fetchClientPopupFeatures(t)]})})},t.prototype.setVisibility=function(e,t){this.graphics3d.graphicsCore.setObjectIdVisibility(e,t)},t.prototype.createQuery=function(){return this.inherited(arguments)},t.prototype.queryFeatures=function(e,t){var r=this,i=arguments,o=function(){return r.inherited(i)};return"mesh"===this.layer.geometryType?n.safeCast(this._queryFeaturesMesh(this._ensureQuery(e),o)):n.safeCast(o())},t.prototype.createController=function(){return s(this,void 0,void 0,function(){var e,t=this;return a(this,function(r){return this.fetcherContext=new g.FeatureTileFetcher3DLayerViewContext({layerView:this,returnZ:this.hasZ,returnM:this.hasM}),e=new y({layerView:this,context:this.fetcherContext,graphics:new F.EventedSet,extent:this.clippingExtent}),this.updatingHandles.add(e,"serviceDataExtent",function(e){t.graphics3d&&(t.graphics3d.dataExtent=e)},2),this.handles.add(c.init(this,"suspended",function(t){t?e.suspend():e.resume()},!0)),this.updatingHandles.add(this.graphics3d.graphicsCore,"displayFeatureLimit",function(){return t.updateDisplayFeatureLimit(e)},2),this.handles.add(this.view.resourceController.memoryController.events.on("quality-changed",function(){return t.updateDisplayFeatureLimit()})),[2,e]})})},t.prototype.doRefresh=function(e){return s(this,void 0,void 0,function(){return a(this,function(e){return!this.suspended&&this.controller&&this.controller.refresh(),[2]})})},t.prototype.getStats=function(){var e=this.inherited(arguments);if(this.controller&&e.features){var t=this.controller.debug;e.features+="/"+t.storedFeatures+"/"+t.totalFeatures,e.totalVertices=t.totalVertices}var r=this.controller&&this.controller.displayFeatureLimit,i=r&&r.maximumSymbolComplexity;e.numTiles=this.controller?this.controller.tileDescriptors.length:0,e.partial=this.maximumNumberOfFeaturesExceeded,e.mode=this.controller?this.controller.mode:"n/a",e.symbolComplexity=i?"f:"+i.primitivesPerFeature+",v:"+i.primitivesPerCoordinate:"n/a";var o=this.graphics3d&&this.graphics3d.graphicsCore,a=o?o.unprocessedMemoryEstimate:0,s=this.controller?this.controller.expectedFeatureDiff*o.usedMemoryPerGraphic:0,n=function(e){return""+(e/1024/1024).toFixed(1)};return e.memory="u:"+n(this.getUsedMemory())+", pc:"+n(a)+", pf:"+n(s)+" MB",e},t.prototype.getUsedMemory=function(){var e=this.graphics3d&&this.graphics3d.graphicsCore;return(e?e.usedMemory:0)+(this.controller?this.controller.memoryForUnusedFeatures:0)},t.prototype.getUnloadedMemory=function(){var e=this.graphics3d&&this.graphics3d.graphicsCore;return(e?e.unprocessedMemoryEstimate:0)+(this.controller?this.controller.expectedFeatureDiff*e.usedMemoryPerGraphic:0)},t.prototype.ignoresMemoryFactor=function(){return this.controller&&this.controller.hasMaximumNumberOfFeaturesOverride},t.prototype.updateDisplayFeatureLimit=function(e){if(void 0===e&&(e=this.controller),e&&this.graphics3d&&this.graphics3d.graphicsCore){var t=this.graphics3d.graphicsCore.displayFeatureLimit,r=this.view.resourceController.memoryController.memoryFactor;if(1===r)e.displayFeatureLimit=t;else{var i=Math.ceil(t.maximumNumberOfFeatures*r),a=Math.ceil(t.maximumTotalNumberOfFeatures*r),s=Math.ceil(t.minimumTotalNumberOfFeatures*r);e.displayFeatureLimit=o({},t,{maximumNumberOfFeatures:i,maximumTotalNumberOfFeatures:a,minimumTotalNumberOfFeatures:s})}}},t.prototype._queryFeaturesMesh=function(e,t){return s(this,void 0,void 0,function(){var r,i,o,s,n,u,l,p;return a(this,function(a){switch(a.label){case 0:return[4,this._validateQueryFeaturesMesh(e)];case 1:return a.sent(),[4,t()];case 2:if(r=a.sent(),e&&e.outStatistics)return[2,r];for(i=this.layer.objectIdField,o=this.graphics3d.graphicsCore.graphics3DGraphicsByObjectID,s=[],n=0,u=r.features;n<u.length;n++)l=u[n],l.geometry?(p=o.get(l.attributes[i]))&&(l.geometry=d.hydrateGeometry(p.graphic.geometry),s.push(l)):s.push(l);return r.features=s,[2,r]}})})},t.prototype._validateQueryFeaturesMesh=function(e){return s(this,void 0,void 0,function(){var t,r,i,o,s;return a(this,function(a){if(!e)return[2];for(t=function(e){throw new l("feature-layer-view:unsupported-query","Queries on Mesh feature collection layers do not support '"+e+"'")},r=["quantizationParameters","geometryPrecision","maxAllowableOffset"],i=0,o=r;i<o.length;i++)s=o[i],null!=e[s]&&t(s);return"returnM"in e&&e.returnM&&t("returnM"),"returnCentroid"in e&&e.returnCentroid&&t("returnCentroid"),e.outSpatialReference&&!e.outSpatialReference.equals(this.view.spatialReference)&&t("outSpatialReference"),[2]})})},i([h.property()],t.prototype,"layer",void 0),i([h.property()],t.prototype,"controller",void 0),i([h.property({readOnly:!0,dependsOn:["controller.updatingRemaining","controller.updatingTotal","graphics3d.graphicsCore.updatingRemaining","graphics3d.graphicsCore.updatingTotal"]})],t.prototype,"updatingPercentageValue",null),i([h.property({aliasOf:"controller.maximumNumberOfFeatures",set:null,get:null})],t.prototype,"maximumNumberOfFeatures",void 0),i([h.property({dependsOn:["suspended","controller.maximumNumberOfFeaturesExceeded"]})],t.prototype,"maximumNumberOfFeaturesExceeded",null),i([h.property(v.updatingPercentage)],t.prototype,"updatingPercentage",void 0),i([h.property({readOnly:!0,dependsOn:["controller.mode"]})],t.prototype,"asyncGraphicsUpdates",null),i([h.property({readOnly:!0})],t.prototype,"hasZ",null),i([h.property({readOnly:!0})],t.prototype,"hasM",null),i([h.property()],t.prototype,"suspendResumeExtentMode",void 0),t=i([h.subclass("esri.views.3d.layers.FeatureLayerView3D")],t)}(h.declared(C.RefreshableLayerView(b.FeatureLayerView(m.FeatureLikeLayerView3D(f.LayerView3D(x))))))});