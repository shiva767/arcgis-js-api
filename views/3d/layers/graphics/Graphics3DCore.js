// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/4.1/esri/copyright.txt for details.

define(["require","exports","../../../../core/watchUtils","../../../../core/arrayUtils","../../../../core/Error","../../../../core/Logger","../../../../core/promiseUtils","../../support/projectionUtils","../../../../renderers/support/rendererConversion","../../../../geometry/Point","../../../../geometry/Extent","../../webgl-engine/Stage","../../webgl-engine/lib/Util","../../webgl-engine/lib/Layer","../../webgl-engine/lib/FloatingBoxLocalOriginFactory","../../../../symbols/WebStyleSymbol","../../../../symbols/support/symbolConversion","../../lib/glMatrix","./Graphics3DGraphic","./Graphics3DSymbol","./Graphics3DWebStyleSymbol","./graphicUtils","../../support/aaBoundingBox","../../support/mathUtils","dojo/Deferred"],function(e,i,t,a,r,s,n,l,h,o,p,c,y,d,u,g,m,b,f,v,w,C,D,G,S){function x(e){return"point"===e.type}function V(e){return"polygon"===e.type||"polyline"===e.type||"multipoint"===e.type}var R=b.vec3d,I=!1,E="VISIBILITY_GRAPHIC",L=new o,F=R.create(),B=s.getLogger("esri.views.3d.LayerView3D"),H=function(){function e(){this.sharedResources=null,this.streamDataSupplier=null,this.elevationProvider=null,this.renderer=null,this.stage=null,this.layerOrder=null,this.clippingExtent=null,this.renderSpatialReference=null,this.renderCoordsHelper=null,this.overlaySR=null,this.layer=null,this.localOriginFactory=null}return e}(),T=function(){function e(){this.graphics={},this.graphicsDrapedIds={},this.graphicsBySymbol={},this.graphicsKeys=[],this.symbols={},this.computedExtent=null,this.symbolCreationContext=new H,this.hasDraped=!1,this.updatingGraphicIds={},this.tilingSchemeHandle=null,this.stageLayer=null,this.labelStageLayer=null,this.stage=null,this.onComputedExtentChange=null,this.graphicTransformFunc=null,this.eventHandles=[],this.viewSR=null,this.layerView=null,this.layer=null,this.elevation=null,this.scaleVisibility=null,this.spatialIndex=null,this.labeling=null,this.whenGraphics3DGraphicRequests={}}return e.prototype.initialize=function(i,a,r,s,n,l,h,o,p){var c=this;this.layerView=i,this.layer=a,this.viewSR=i.view.spatialReference,this.elevation=r,this.scaleVisibility=s,this.spatialIndex=n,this.labeling=l,this.onComputedExtentChange=h,this.graphicTransformFunc=o,this.initializeStage(this.layerView.view,this.layer.id),this.symbolCreationContext.sharedResources=this.layerView.view.sharedSymbolResources,this.symbolCreationContext.renderer=this.layer.renderer,this.symbolCreationContext.stage=this.stage,this.symbolCreationContext.streamDataSupplier=this.layerView.view.sharedSymbolResources.streamDataSupplier,this.symbolCreationContext.renderSpatialReference=this.layerView.view.renderSpatialReference,this.symbolCreationContext.renderCoordsHelper=this.layerView.view.renderCoordsHelper,this.symbolCreationContext.layer=this.layer,this.symbolCreationContext.layerView=this.layerView,this.symbolCreationContext.layerOrder=0,this.symbolCreationContext.localOriginFactory=e.createLocalOriginFactory(),this.symbolCreationContext.elevationProvider=p,this.tilingSchemeHandle=t.when(p,"tilingScheme",function(e){e.spatialReference.equals(c.symbolCreationContext.overlaySR)||(c.symbolCreationContext.overlaySR=p.spatialReference,c.recreateAllGraphics())}),this.eventHandles.push(this.layerView.watch("suspended",function(){return c.suspendedChange()})),this.eventHandles.push(t.on(i,"loadedGraphics","change",function(e){return c.graphicsCollectionChanged(e)},function(){c.clearSymbolsAndGraphics(),c.graphicsCollectionChanged({added:c.layerView.loadedGraphics.toArray(),removed:[]})})),this.validateRenderer(this.layer.renderer)},e.prototype.destroy=function(){var e=this;if(this.clear(),this.stage){var i=[this.stageLayer.getId()];this.labelStageLayer&&i.push(this.labelStageLayer.getId()),this.stage.removeFromViewContent(i),i.forEach(function(i){return e.stage.remove(c.ModelContentType.LAYER,i)}),this.stageLayer=null,this.labelStageLayer=null,this.stage=null}this.tilingSchemeHandle&&(this.tilingSchemeHandle.remove(),this.tilingSchemeHandle=null),this.eventHandles.forEach(function(e){return e.remove()}),this.eventHandles=null,this.onComputedExtentChange=null,this.viewSR=null,this.scaleVisibility=null,this.labeling=null,this.layerView=null;for(var t in this.whenGraphics3DGraphicRequests)this.whenGraphics3DGraphicRequests[t].reject(new r("graphic:layer-destroyed","Layer has been destroyed"));this.whenGraphics3DGraphicRequests=null},e.prototype.clear=function(){var e=!1;for(var i in this.graphics){var t=this.graphics[i];t&&(e=e||t.isDraped(),t.destroy())}this.graphics={},this.graphicsKeys=null;for(var a in this.symbols){var r=this.symbols[a];r&&r.destroy()}this.symbols={},this.graphicsBySymbol={},this.hasDraped=!1,e&&this.layerView._notifyDrapedDataChange()},e.prototype.initializeStage=function(e,i){this.stage=e._stage,this.stageLayer=new d(i,{state:this.layerView.suspended?"HIDDEN":"VISIBLE"},i),this.stage.add(c.ModelContentType.LAYER,this.stageLayer);var t=[this.stageLayer.getId()];this.labeling&&(this.labelStageLayer=new d(i,{state:this.layerView.suspended?"HIDDEN":"IGNORED"},i+"_labels"),this.stage.add(c.ModelContentType.LAYER,this.labelStageLayer),t.push(this.labelStageLayer.getId())),this.stage.addToViewContent(t)},e.prototype.setDrawingOrder=function(e){this.symbolCreationContext.layerOrder=e;var i={},t={};for(var a in this.graphics){var r=this.graphics[a];r.setDrawOrder(e,i,t)}for(var s in t){var n=this.symbols[s];n.setDrawOrder(e,i)}y.objectEmpty(i)||(this.stage.getTextureGraphicsRenderer().updateRenderOrder(i),this.layerView._notifyDrapedDataChange())},e.prototype.suspendedChange=function(){this.layerView.suspended===!0?(this.stageLayer.setState("HIDDEN"),this.labelStageLayer&&this.labelStageLayer.setState("HIDDEN"),this.hideAllGraphics()):this.layerView.suspended===!1&&(this.stageLayer.setState("VISIBLE"),this.labelStageLayer&&this.labelStageLayer.setState("IGNORED"),this.updateAllGraphicsVisibility())},e.prototype.getGraphics3DGraphics=function(){return this.graphics},e.prototype.getGraphics3DGraphicById=function(e){return this.graphics[e]},e.prototype.getGraphics3DGraphicsKeys=function(){return null===this.graphicsKeys&&(this.graphicsKeys=Object.keys(this.graphics)),this.graphicsKeys},e.prototype.numNodesUpdating=function(){return Object.keys(this.updatingGraphicIds).length},e.prototype.whenGraphics3DGraphic=function(e){var i=this.graphics[e.uid];if(i)return n.resolve(i);var t=this.whenGraphics3DGraphicRequests[e.uid];return t||(t=new S,this.whenGraphics3DGraphicRequests[e.uid]=t),t.promise},e.prototype.boundsForGraphics3DGraphic=function(e,i){void 0===i&&(i=D.create());var t=this.layerView.view.spatialReference,a=this.layerView.view.renderSpatialReference,r=this.layerView.view.basemapTerrain.spatialReference,s=function(e,i,r){return l.bufferToBuffer(e,a,i,e,t,i,r)},n=function(e,i,a){return l.bufferToBuffer(e,r,i,e,t,i,a)},h=e.getProjectedBoundingBox(s,n,i);if(!h)return null;var o=e.isDraped(),p=this.symbolCreationContext.elevationProvider;if(o&&p){D.center(h,F),L.x=F[0],L.y=F[1],L.z=void 0,L.spatialReference=t;var c=p.getElevation(L)||0;h[2]=Math.min(h[2],c),h[5]=Math.max(h[5],c)}return h},e.prototype.whenGraphicBounds=function(e){var i=this;return t.whenOnce(this.layerView,"loadedGraphics").then(function(){if(i.layerView.loadedGraphics.some(function(i){return i===e}))return i.whenGraphics3DGraphic(e);throw new r("internal:graphic-not-part-of-view","Graphic is not part of this view")}).then(function(e){return i.boundsForGraphics3DGraphic(e)})},e.prototype.graphicsCollectionChanged=function(e){var i=this.graphicTransformFunc?this.graphicTransformFunc(e.added):e.added;this.add(i),this.remove(e.removed)},e.prototype.graphicUpdateHandler=function(e){var i=this.graphics[e.graphic.uid];if(i)switch(e.property){case"visible":var t=i.setVisibilityFlag(E,e.newValue);t&&(i.isDraped()&&this.layerView._notifyDrapedDataChange(),this.labeling&&this.layerView.view.labelManager.setDirty())}},e.prototype.beginGraphicUpdate=function(e){this.updatingGraphicIds[e.uid]=!0,this.layerView.get("symbols-updating")||this.layerView.set("symbols-updating",!0),this.layerView._evaluateUpdatingState()},e.prototype.endGraphicUpdate=function(e){e&&delete this.updatingGraphicIds[e.uid],this.layerView.get("symbols-updating")&&y.objectEmpty(this.updatingGraphicIds)&&(this.layerView.view.flushDisplayModifications(),this.layerView.set("symbols-updating",!1)),this.layerView._evaluateUpdatingState()},e.prototype.expandComputedExtent=function(i){var t,a,r,s,n,h;if(x(i))t=a=i.x,r=s=i.y,i.z&&(n=h=i.z);else if(V(i)){var o=i.extent;if(!o)return;t=o.xmin,a=o.xmax,r=o.ymin,s=o.ymax,n=o.zmin,h=o.zmax}var c=this.viewSR,y=e.tmpVec;if(!i.spatialReference.equals(c))if(l.xyzToVector(t,r,0,i.spatialReference,y,c))t=y[0],r=y[1],l.xyzToVector(a,s,0,i.spatialReference,y,c),a=y[0],s=y[1];else if(I)throw new Error("Geometry has incompatible spatial reference");if(G.isFinite(t)&&G.isFinite(a)&&G.isFinite(r)&&G.isFinite(s)){var d=this.computedExtent;d?(d.xmin=Math.min(t,d.xmin),d.xmax=Math.max(a,d.xmax),d.ymin=Math.min(r,d.ymin),d.ymax=Math.max(s,d.ymax)):(d=new p(t,r,a,s,i.spatialReference),this.computedExtent=d),G.isFinite(n)&&!G.isFinite(h)&&(d.zmin=null!=d.zmin?Math.min(n,d.zmin):n,d.zmax=null!=d.zmax?Math.max(h,d.zmax):h),this.onComputedExtentChange&&this.onComputedExtentChange()}},e.prototype.updateHasDraped=function(){this.hasDraped=!1;for(var e in this.graphicsDrapedIds)if(this.graphicsDrapedIds.hasOwnProperty(e)){this.hasDraped=!0;break}},e.prototype.elevationInfoChange=function(){this.labeling&&this.labeling.elevationInfoChange();for(var e in this.graphicsBySymbol){var i=this.symbols[e],t=this.graphicsBySymbol[e];if(i&&i.layerPropertyChanged("elevationInfo",t))for(var a in t)for(var r=t[a],s=r.graphic,n=r._labelGraphics,l=0;l<n.length;l++){var h=n[l],o=h.graphics3DSymbolLayer;o.updateGraphicElevationInfo(s,h)}else this.recreateSymbol(e)}},e.prototype.clearSymbolsAndGraphics=function(){this.clear(),this.elevation&&this.elevation.clear(),this.labeling&&this.labeling.clear()},e.prototype.recreateAllGraphics=function(){this.clearSymbolsAndGraphics(),this.computedExtent=null,this.onComputedExtentChange&&this.onComputedExtentChange(),this.layerView.loadedGraphics&&this.layerView.view.basemapTerrain.tilingScheme&&this.add(this.layerView.loadedGraphics.toArray())},e.prototype.recreateSymbol=function(e){var i=this.graphicsBySymbol[e],t=[],a=!1;for(var r in i){var s=i[r],n=s.isDraped();n&&(delete this.graphicsDrapedIds[r],a=!0),t.push(s.graphic),s.destroy(),this.graphics[r]=null}this.graphicsBySymbol[e]={};var l=this.symbols[e];l&&l.destroy(),this.symbols[e]=void 0,this.updateHasDraped(),a&&this.layerView._notifyDrapedDataChange(),this.add(t)},e.prototype.add=function(e){if(this.layerView.view.basemapTerrain&&this.layerView.view.basemapTerrain.tilingScheme){for(var i=e.length,t=new Array(i),a=new Array(i),r=new Array(i),s=0;i>s;s++){var n=e[s],l=n.geometry;if(l){this.expandComputedExtent(l);var h=this.layerView.getRenderingInfo?this.layerView.getRenderingInfo(n):{symbol:n.symbol};if(h&&h.symbol){a[s]=h.symbol,r[s]=h;var o=this.getOrCreateGraphics3DSymbol(a[s],h.renderer);o&&(t[s]=o,this.beginGraphicUpdate(n))}}}for(var s=0;i>s;s++)this.waitForSymbol(t[s],a[s],e[s],r[s])}},e.prototype.waitForSymbol=function(e,i,t,a){var r=this;e&&e.then(function(){r.graphicsBySymbol[i.id]||(r.graphicsBySymbol[i.id]={}),r.createGraphics3DGraphic(e,t,a),r.endGraphicUpdate(t),r.labeling&&r.layerView.view.labelManager.setDirty()},function(){r.endGraphicUpdate(t)})},e.prototype.remove=function(e){for(var i=!1,t=e.length,a=0;t>a;a++){var r=e[a].uid,s=this.graphics[r];if(s){var n=s.isDraped();n&&(delete this.graphicsDrapedIds[r],i=!0);var l=s.graphics3DSymbol.symbol.id;s.destroy(),delete this.graphics[r],delete this.graphicsBySymbol[l][r],this.graphicsKeys=null}}this.updateHasDraped(),i&&this.layerView._notifyDrapedDataChange(),this.labeling&&this.layerView.view.labelManager.setDirty()},e.prototype.createGraphics3DSymbol=function(e,i){var t=m.to3D(e,!0,!1);if(t.symbol){var a=void 0;if(i&&i.backgroundFillSymbol){var r=m.to3D(i.backgroundFillSymbol,!1,!0);r.symbol&&(a=r.symbol.symbolLayers)}return new v(t.symbol,this.symbolCreationContext,a)}return null},e.prototype.getOrCreateGraphics3DSymbol=function(e,i){var t=this,a=this.symbols[e.id];return void 0===a&&(a=e instanceof g?new w(e,function(e){return t.createGraphics3DSymbol(e,i)}):this.createGraphics3DSymbol(e,i),this.symbols[e.id]=a),a},e.prototype.createGraphics3DGraphic=function(e,i,t){if(!this.graphics[i.uid]){var a=e.createGraphics3DGraphic(i,t);this.labeling&&this.labeling.layerLabelsEnabled()&&(a=this.labeling.createLabelsForGraphic(i,a)),this.graphics[i.uid]=a,this.graphicsKeys=null,this.graphicsBySymbol[e.symbol.id][i.uid]=a,a.initialize(this.stageLayer,this.labelStageLayer,this.stage);var r=a.isDraped();r&&(this.graphicsDrapedIds[i.uid]=!0,this.hasDraped=!0,this.layerView._notifyDrapedDataChange()),a.centroid=null,"point"!==i.geometry.type&&a instanceof f&&(a.centroid=C.computeCentroid(i.geometry,this.viewSR));var s=this.scaleVisibility&&this.scaleVisibility.scaleRangeActive();this.spatialIndex&&this.spatialIndex.shouldAddToSpatialIndex(i,a,s)&&this.spatialIndex.addGraphicToSpatialIndex(i,a),s&&this.scaleVisibility.updateGraphicScaleVisibility(i,a),a.setVisibilityFlag(E,i.visible&&!this.layerView.suspended);var n=this.whenGraphics3DGraphicRequests[i.uid];n&&(n.resolve(a),delete this.whenGraphics3DGraphicRequests[i.uid])}},e.prototype.rendererChange=function(e){this.validateRenderer(e),this.symbolCreationContext.renderer=e,this.recreateAllGraphics()},e.prototype.opacityChange=function(){var e=!1;for(var i in this.graphicsBySymbol){var t=this.symbols[i],a=this.graphicsBySymbol[i];if(t.layerPropertyChanged("opacity"),!e)for(var r in a)if(a[r].isDraped()){this.layerView._notifyDrapedDataChange(),e=!0;break}}},e.prototype.setClippingExtent=function(e,i){var t=this.symbolCreationContext.clippingExtent,r=[];return l.extentToBoundingRect(e,r,i)?this.symbolCreationContext.clippingExtent=[r[0],r[1],-(1/0),r[2],r[3],1/0]:this.symbolCreationContext.clippingExtent=null,!a.equals(this.symbolCreationContext.clippingExtent,t)},e.prototype.updateAllGraphicsVisibility=function(){var e=this;if(this.layerView.loadedGraphics){var i=!1;this.layerView.loadedGraphics.forEach(function(t){var a=e.getGraphics3DGraphicById(t.uid);if(a){var r=a.setVisibilityFlag(E,t.visible);if(e.scaleVisibility){var s=e.scaleVisibility.updateGraphicScaleVisibility(t,a);r=r||s}r&&a.isDraped()&&(i=!0)}}),i&&this.layerView._notifyDrapedDataChange(),this.layerView.view.labelManager.setDirty()}},e.prototype.hideAllGraphics=function(){var e=this;if(this.layerView.loadedGraphics){var i=!1;this.layerView.loadedGraphics.forEach(function(t){var a=e.getGraphics3DGraphicById(t.uid);if(a){var r=a.setVisibilityFlag(E,!1);r&&a.isDraped()&&(i=!0)}}),i&&this.layerView._notifyDrapedDataChange(),this.layerView.view.labelManager.setDirty()}},e.prototype.validateRenderer=function(e){var i=h.validateTo3D(e);if(i){var t="Renderer for layer '"+(this.layer.title?this.layer.title+", ":"")+", id:"+this.layer.id+"' is not supported in a SceneView";B.warn(t,i.message)}},e.createLocalOriginFactory=function(){return new u(5e6,16)},e.tmpVec=b.vec3d.create(),e}();return T});