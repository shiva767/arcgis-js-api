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

define(["require","exports","../../../../core/Handles","../../../../core/maybe","../../../../core/TimeProfiler","../../../../core/watchUtils","../../../../core/libs/gl-matrix-2/vec2f64","../../support/debugFlags","./BoundingInfo","./depthRange","./depthRangeUtils","./FxaaRenderPass","./HighlightHelper","./OffscreenRenderingHelper","./RenderContext","./RenderPluginManager","./renderStats","./ShadowMap","./SliceHelper","./SmaaRenderPass","./SSAOHelper","./Util","./edgeRendering/EdgeView","../lighting/SceneLighting","../materials/HUDMaterial","../materials/internal/waterMaterialUtils","../../../webgl/Profiling","../../../webgl/Texture"],function(e,r,t,n,i,s,a,o,d,h,l,p,u,c,g,_,f,m,R,b,y,x,P,v,w,T,H,M){function S(e,r){for(var t=new Map,n=null,i=null,s=function(e){if(e===n)return i;var r=t.get(e);return r||(r={toAdd:[],numToAdd:-1,toRemove:[],numToRemove:-1,toUpdate:[],numToUpdate:-1},t.set(e,r)),n=e,i=r,r},a=0;a<e.numToAdd;a++){var o=e.toAdd[a];if(D(o)){var d=s(o.material);d.toAdd.push(o)}}for(var a=0;a<e.numToRemove;a++){var o=e.toRemove[a];if(D(o)){var d=s(o.material);d.toRemove.push(o)}}for(var h=0,a=0;a<e.numToUpdate;a++){var l=e.toUpdate[a];if(D(l.renderGeometry)){var d=s(l.renderGeometry.material);d.toUpdate.push(l),h|=l.updateType}}return r&&(r.updateTypes=h),t}function D(e){return E(e.data)>=1}function E(e){return!1===e.preinterleaved?x.getFirstObjectValue(e.indices).length:e.indexCount}function O(e,r){return e.isVisible()&&e.isVisibleInPass(r.pass)&&0!=(e.renderOccluded&r.renderOccludedMask)}var C=function(){function e(e,r,n,i,a,d,h){var l=this;this.requestRender=d,this._materialRenderers=new Map,this._orderedMaterialRenderers=new Array,this._hasHighlights=!1,this._lighting=new v.SceneLighting,this._content=new Map,this._isRendering=!1,this._fallbackDepthStencilTexture=null,this._stats={scene:new f.RenderStatsAggregator,draped:new f.RenderStatsAggregator},this._edgeView=null,this._handles=new t,this.renderOptions={antialiasing:"smaa"},this.renderHiddenTransparentEdges=function(){},this._programRep=e,this._materialRep=r,this._rctx=i,this._mode=a,this._stage=h,this._fxaaPass=new p(i),this._smaaPass=new b(i),this._bindParameters={view:null,proj:null,viewInvTransp:null,fovY:0,nearFar:null,viewport:null,shadowMappingEnabled:!1,ssaoEnabled:!1,origin:null,pixelRatio:null,slicePlane:null},this._offscreenRendering=new c(e,this._rctx),this._sliceHelper=new R,"scene"===this._mode&&(this._shadowMap=new m(this._rctx),this._ssaoHelper=new y(e,this._rctx,function(){return l.requestRender()}),this._highlightHelper=new u(e,this._rctx)),this._renderPlugins=new _.RenderPluginManager({rctx:i,programRep:e,textureRep:n,materialRep:r,requestRender:this.requestRender}),this._renderContext=new g(i,this._offscreenRendering,this._lighting,this._shadowMap,this._ssaoHelper,this._sliceHelper),this._handles.add(s.init(o,"EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES",function(e){l.renderHiddenTransparentEdges=e?function(){return l.renderEdges(1)}:function(){},l.requestRender()}))}return e.prototype.dispose=function(){this._handles.destroy(),this._materialRenderers.forEach(function(e){e.dispose()}),this._materialRenderers=null,this._orderedMaterialRenderers=null,this._edgeView&&(this._edgeView.destroy(),this._edgeView=null),this._offscreenRendering.enabled=!1,this._fallbackDepthStencilTexture&&(this._fallbackDepthStencilTexture.dispose(),this._fallbackDepthStencilTexture=null),this._shadowMap&&(this._shadowMap.enabled=!1,this._shadowMap.dispose()),this._ssaoHelper&&(this._ssaoHelper.enabled=!1,this._ssaoHelper.dispose()),this._highlightHelper&&(this._highlightHelper.enabled=!1),d.tmpIndices.prune(),this._content.clear(),this._content=null},Object.defineProperty(e.prototype,"updating",{get:function(){return"smaa"===this.renderOptions.antialiasing&&this._smaaPass.isLoadingResources||T.waterTextureRepo.loading()},enumerable:!0,configurable:!0}),e.prototype.ensureEdgeView=function(){var e=this;return null==this._edgeView&&(this._edgeView=new P.EdgeView(this._rctx,this._programRep,{setNeedsRender:function(){return e.requestRender()}}),this._edgeView.initialize()),this._edgeView},Object.defineProperty(e.prototype,"edgeView",{get:function(){return this._edgeView},enumerable:!0,configurable:!0}),e.prototype.setLighting=function(e){this._lighting.set(e)},e.prototype.setRenderParams=function(e){void 0!==e.shadowMapResolution&&!1===this._shadowMap.enabled&&(this._shadowMap.textureResolution=e.shadowMapResolution),void 0!==e.shadowMap&&(this._shadowMap.enabled=e.shadowMap),void 0!==e.shadowMapMaxCascades&&(this._shadowMap.maxCascades=e.shadowMapMaxCascades),this._highlightHelper.enabled=!0,void 0!==e.ssao&&(this._ssaoHelper.enabled=e.ssao),void 0!==e.ssaoAttenuation&&(this._ssaoHelper.attenuation=e.ssaoAttenuation),void 0!==e.ssaoRadius&&(this._ssaoHelper.radius=e.ssaoRadius),void 0!==e.ssaoFilterRadius&&console.error("The property ssaoFilterRadius is no longer supported as a render parameter."),void 0!==e.ssaoSamples&&(this._ssaoHelper.samples=e.ssaoSamples),e.background&&(this._offscreenRendering.background=e.background),void 0!==e.antialiasingEnabled&&(this.renderOptions.antialiasing=e.antialiasingEnabled?"smaa":"none"),void 0!==e.defaultHighlightOptions&&this._highlightHelper.setDefaultOptions(e.defaultHighlightOptions),void 0!==e.slicePlane&&(this._sliceHelper.plane=e.slicePlane),this.requestRender()},Object.defineProperty(e.prototype,"hasSlicePlane",{get:function(){return!!this._sliceHelper.plane},enumerable:!0,configurable:!0}),e.prototype.getRenderParams=function(){var e={};return this._shadowMap&&(e.shadowMap=this._shadowMap.enabled,e.shadowMapResolution=this._shadowMap.textureResolution,e.shadowMapMaxCascades=this._shadowMap.maxCascades),this._ssaoHelper&&this._ssaoHelper.isSupported&&(e.ssao=this._ssaoHelper.enabled,e.ssaoAttenuation=this._ssaoHelper.attenuation,e.ssaoRadius=this._ssaoHelper.radius,e.ssaoFilterRadius=this._ssaoHelper.filterRadius,e.ssaoSamples=this._ssaoHelper.samples),e},Object.defineProperty(e.prototype,"renderPlugins",{get:function(){return this._renderPlugins},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"canRender",{get:function(){return!0},enumerable:!0,configurable:!0}),e.prototype.getCombinedStats=function(){return{draped:this._stats.draped.getAggregatedStats(),scene:this._stats.scene.getAggregatedStats()}},e.prototype.getFramebufferTexture=function(e){switch(e){case"color":return this._offscreenRendering.colorTexture;case"hudVisibility":return this._offscreenRendering.hudVisibilityTexture;case"shadowMap":return this._shadowMap&&this._shadowMap.getDepthTexture();case"linearDepth":return this._offscreenRendering.linearDepthTexture;case"normals":return this._offscreenRendering.normalTexture;case"highlight":return this._offscreenRendering.highlightTexture}return null},Object.defineProperty(e.prototype,"hasHighlights",{get:function(){return this._hasHighlights},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hasWater",{get:function(){return this._orderedMaterialRenderers.some(function(e){return e.hasWater()})},enumerable:!0,configurable:!0}),e.prototype.isEmpty=function(){return 0===this._materialRenderers.size},e.prototype.modify=function(e,r,t,n,i,s,a){var o=this;void 0===r&&(r=e?e.length:0),void 0===n&&(n=t?t.length:0),void 0===s&&(s=i?i.length:0),this._isRendering&&console.warn("Renderer.modify called while rendering");for(var d=0;d<n;++d)this._content.delete(t[d].uniqueName);for(var d=0;d<r;++d)this._content.set(e[d].uniqueName,e[d]);if(r||n||s){var h=S({toAdd:e,numToAdd:r,toRemove:t,numToRemove:n,toUpdate:i,numToUpdate:s}),l=!1;h.forEach(function(e,r){var t=o._materialRenderers.get(r);!t&&e.toAdd.length>0&&(t=r.createRenderer(o._rctx,o._materialRep),o._materialRenderers.set(r,t),o._orderedMaterialRenderers.push(t),o.sortOrderedMaterialRenderers()),t&&(t.modify(e),t.isEmpty&&(l=!0))}),l&&this._materialRenderers.forEach(function(e,r){e.isEmpty&&(o._materialRenderers.delete(r),o._orderedMaterialRenderers.splice(o._orderedMaterialRenderers.indexOf(e),1),e.dispose())});var p=!1;this._materialRenderers.forEach(function(e){p=p||e.hasHighlights}),p!==this._hasHighlights&&(this.onHasHighlightsChanged&&this.onHasHighlightsChanged(p),this._hasHighlights=p),this.requestRender()}a&&(a.forEach(function(e){o._materialRep.updateMaterialParameters(e)}),this.requestRender())},e.prototype.modifyRenderOrder=function(e){"draped"===this._mode&&(this.sortOrderedMaterialRenderers(),this.requestRender())},e.prototype.updateLogic=function(e){var r=!1;return this._orderedMaterialRenderers.forEach(function(t){t.updateLogic&&(r=t.updateLogic(e)||r)}),r},e.prototype.render=function(e){switch(this._mode){case"scene":this.renderScene(e);break;case"draped":this.renderDraped(e)}this.onPostRender&&this.onPostRender()},e.prototype.renderPass=function(e,r){this.renderGeometryPass(e,r)},e.prototype.renderScene=function(e){var r=this;this._isRendering=!0;var t=this._rctx,n=this._offscreenRendering,i=e.camera,s=e.fbo,a=this._sliceHelper.plane;e.disableSlice&&(this._sliceHelper.plane=null),this._renderPlugins.prepareRender(i),this.renderShadowMap(e),n.enabled=!0,n.initializeFrame(i,s),this.renderLinearDepth(e),this.renderNormal(e),this._ssaoHelper.enabled&&this._ssaoHelper.computeSSAO(i,n.linearDepthTexture,n.normalTexture),this._ssaoHelper.bindAll(this._programRep),this._stats.scene.reset(),this.updateGlobalUniforms(i.projectionMatrix),this._renderContext.pass=0,this._renderContext.camera=i,this._renderContext.options=this.renderOptions,n.bindTarget(n.mainColor,n.mainDepth),this._renderPlugins.render(0,this._renderContext),this.renderOpaqueGeometry(this._renderContext),this.renderEdges(2),this.renderHiddenTransparentEdges(),this.renderTransparentGeometry(this._renderContext),this.renderEdges(1);var o={hudVisibility:!1,transparentTerrain:!1};o.hudVisibility=this.renderHUDVisibility(this._renderContext),this.renderInternalSlot(18,this._renderContext),o.transparentTerrain=this.renderTransparentTerrain(this._renderContext),o.transparentTerrain&&o.hudVisibility&&(n.compositeTransparentTerrainOntoHUDVisibility(),n.renderToTargets(function(){return r.renderHUD("occluded")},n.mainColor,n.tmpDepth,void 0,!0)),o.transparentTerrain&&n.compositeTransparentTerrainOntoMain(),n.renderToTargets(function(){r.renderInternalSlot(10,r._renderContext),r._renderPlugins.render(14,r._renderContext),r._renderPlugins.render(15,r._renderContext)},n.mainColor,n.mainDepth),this.renderOccluded(),this.renderAntiAliasing(s),t.bindFramebuffer(s),t.clearSafe(256),this.renderHUD("notOccluded"),this.renderHighlights(e,s),this._sliceHelper.plane=a,this._isRendering=!1},e.prototype.renderEdges=function(e){var r=this,t=this._edgeView;t&&t.shouldRender()&&this._offscreenRendering.renderAndComposite(function(){return t.render(r._bindParameters,e)},"alpha")},e.prototype.renderDraped=function(e){this._stats.draped.reset(),this.renderGeometryPass(0,e)},e.prototype.renderShadowMap=function(e){var r=this._shadowMap,t=e.camera,n=e.fbo,s=e.lightDirection;if(r.enabled){o.ENABLE_PROFILE_DEPTH_RANGE&&i.begin("depthRange");var a=this.computeDepthRange(t);o.ENABLE_PROFILE_DEPTH_RANGE&&i.end("depthRange"),r.prepare(t,s,a);for(var d=r.getCascades(),h=0;h<d.length;++h){var l=d[h];l.camera.setGLViewport(this._rctx),e.camera=l.camera,this.renderGeometryPass(3,e)}e.camera=t,r.finish(n),t.setGLViewport(this._rctx)}r.bindAll(this._programRep)},e.prototype.renderLinearDepth=function(e){var r=this;this._ssaoHelper.enabled||this._renderPlugins.needsLinearDepth()?this._offscreenRendering.renderToTargets(function(){r.renderGeometryPass(1,e)},this._offscreenRendering.linearDepth,this._offscreenRendering.tmpDepth,[0,0,0,0],!0):this._offscreenRendering.disposeTarget(this._offscreenRendering.linearDepth)},e.prototype.renderNormal=function(e){var r=this;this._ssaoHelper.enabled?this._offscreenRendering.renderToTargets(function(){r.renderGeometryPass(2,e)},this._offscreenRendering.normal,this._offscreenRendering.tmpDepth,[0,0,0,0],!0):this._offscreenRendering.disposeTarget(this._offscreenRendering.normal)},e.prototype.computeDepthRange=function(e){var r=l.depthRangeFromScene(e,this._content,this._stage.getLayers());return h.union(r,this.renderPlugins.queryDepthRange(e)),r.near=Math.max(e.near,r.near),r.far=Math.min(e.far,r.far),r},e.prototype.renderGeometryPass=function(e,r){this._isRendering=!0;var t=r.camera;this.updateGlobalUniforms(t.projectionMatrix),this._renderContext.pass=e,this._renderContext.camera=t,"draped"===this._mode?this.renderGeometryPassDraped(this._renderContext):this.renderGeometryPassScene(this._renderContext),this._isRendering=!1},e.prototype.renderGeometryPassDraped=function(e){var r=this,t=e.camera;this._bindParameters.view=t.viewMatrix,this._bindParameters.proj=t.projectionMatrix,this._bindParameters.viewInvTransp=t.viewInverseTransposeMatrix,U[0]=t.near,U[1]=t.far,this._bindParameters.nearFar=U,this._bindParameters.viewport=t.fullViewport,this._bindParameters.pixelRatio=t.pixelRatio,this._bindParameters.slicePlane=e.sliceHelper&&e.sliceHelper.plane,this._bindParameters.highlightDepthTexture=this.getFallbackDepthTexture(),this._orderedMaterialRenderers.forEach(function(t){var n=r._stats.draped.getMaterialRenderStatsObject(t.type);t.render(null,e,r._bindParameters,n)})},e.prototype.renderGeometryPassScene=function(e){this.renderGeometry(e),this.renderTransparentTerrain(e)},e.prototype.renderGeometry=function(e){this.renderOpaqueGeometry(e),this.renderTransparentGeometry(e)},e.prototype.renderOpaqueGeometry=function(e){this._renderPlugins.render(1,e),this.renderInternalSlot(2,e),this.renderInternalSlot(3,e),this._renderPlugins.render(4,e),this.renderInternalSlot(5,e),this._renderPlugins.render(6,e),e.ssaoHelper&&e.ssaoHelper.bindAll(this._programRep),this._renderPlugins.render(13,this._renderContext)},e.prototype.renderTransparentGeometry=function(e){this.renderInternalSlot(7,e),this._renderPlugins.render(8,e),e.ssaoHelper&&e.ssaoHelper.bindAll(this._programRep)},e.prototype.renderTransparentTerrain=function(e){return this._renderPlugins.render(9,e)},e.prototype.renderHUDVisibility=function(e){var r=this,t=w.shouldRenderVisibilityDuringRenderPass(e.pass),n=e.offscreenRenderingHelper&&e.offscreenRenderingHelper.enabled,i=!1;return t&&n&&e.offscreenRenderingHelper.renderHUDVisibility(function(){i=r.renderInternalSlot(11,e)}),i},e.prototype.renderHUD=function(e){this._bindParameters.renderTransparentlyOccludedHUD=e,this.renderInternalSlot(19,this._renderContext),this.renderInternalSlot(16,this._renderContext),this.renderInternalSlot(17,this._renderContext)},e.prototype.renderHighlights=function(e,r){var t=this,n=this._highlightHelper;if(!n||!n.enabled||!this.hasHighlights&&!this._renderPlugins.needsHighlight())return void this._offscreenRendering.disposeTarget(this._offscreenRendering.highlight);var i=null;n.profilingCallback&&(i=H.startMeasurement(this._renderContext.rctx));var s=this._offscreenRendering;this._renderContext.highlightDepthTexture=this._bindParameters.highlightDepthTexture;var a=s.renderToTargets(function(){t.renderGeometryPass(4,e),t._rctx.clearSafe(256),t.renderHUD("both")},s.highlight,s.tmpDepth,[0,0,0,0],!0);n.render(e.camera,a,r),null!==i&&n.profilingCallback&&i.stop(function(e){n.profilingCallback&&n.profilingCallback(e)})},e.prototype.renderOccluded=function(){var e=this;if(this._materialRenderers.forEach(function(e,r){r&&r.isVisible()&&1!==r.renderOccluded&&G.push(r)}),0!==G.length){var r=this._offscreenRendering,t=this._renderContext,n=function(n,i){t.renderOccludedMask=i,r.renderToTargets(function(){e.renderInternalSlot(5,t,G),e.renderInternalSlot(7,t,G),e.renderInternalSlot(10,t,G)},r.tmpColor,r.tmpDepth,[0,0,0,0],!0),t.resetRenderOccludedMask(),r.compositeOccludedOntoMain(n)};t.pass=0,n(.4,4),n(.5,2),n(1,8),G.length=0}},e.prototype.renderAntiAliasing=function(e){var r=this;switch(this.renderOptions.antialiasing){case"smaa":this._smaaPass.loadResources(function(){return r.requestRender()}),this._smaaPass.enable()?(this._fxaaPass.disable(),this._smaaPass.render({colorTexture:this._offscreenRendering.colorTexture},e)):this._offscreenRendering.composite();break;case"fxaa":this._fxaaPass.enable()?(this._smaaPass.disable(),this._fxaaPass.render({colorTexture:this._offscreenRendering.colorTexture},e)):this._offscreenRendering.composite();break;default:this._offscreenRendering.composite(),this._fxaaPass.disable(),this._smaaPass.disable()}},e.prototype.renderInternalSlot=function(e,r,t){this._bindParameters.view=r.camera.viewMatrix,this._bindParameters.proj=r.camera.projectionMatrix,this._bindParameters.viewInvTransp=r.camera.viewInverseTransposeMatrix,this._bindParameters.cameraAboveGround=r.camera.aboveGround,this._bindParameters.fovY=r.camera.fovY,U[0]=r.camera.near,U[1]=r.camera.far;var n=this._renderContext.offscreenRenderingHelper;return this._bindParameters.nearFar=U,this._bindParameters.viewport=r.camera.fullViewport,this._bindParameters.shadowMap=r.shadowMap,this._bindParameters.shadowMappingEnabled=!!r.shadowMap&&r.shadowMap.enabled,this._bindParameters.ssaoEnabled=!!r.ssaoHelper&&r.ssaoHelper.enabled,this._bindParameters.pixelRatio=r.camera.pixelRatio,this._bindParameters.slicePlane=r.sliceHelper&&r.sliceHelper.plane,this._bindParameters.hudVisibilityTexture=n?n.hudVisibilityTexture:null,this._bindParameters.highlightDepthTexture=n&&n.depthTexture||this.getFallbackDepthTexture(),this.renderInternalSlotMaterials(e,r,t)},e.prototype.renderInternalSlotMaterials=function(e,r,t){var i=this,s=0===r.pass?this._stats.scene:null,a=!1;return n.isSome(t)?t.forEach(function(t){if(O(t,r)){var n=i._materialRenderers.get(t);a=n.render(e,r,i._bindParameters)||a}}):this._materialRenderers.forEach(function(t,n){if(O(n,r)){var o=s?s.getMaterialRenderStatsObject(t.type):null;a=t.render(e,r,i._bindParameters,o)||a}}),a},e.prototype.updateGlobalUniforms=function(e){for(var r=this._programRep.getProgramsUsingUniform("proj"),t=0;t<r.length;t++)r[t].setUniformMatrix4fv("proj",e);if(this._lighting){r=this._programRep.getProgramsUsingUniform("lightingMainDirection");for(var t=0;t<r.length;t++)this._lighting.setUniforms(r[t]);r=this._programRep.getProgramsUsingUniform("lightDirection");for(var t=0;t<r.length;t++)this._lighting.setUniforms(r[t])}},e.prototype.sortOrderedMaterialRenderers=function(){"draped"===this._mode&&this._orderedMaterialRenderers.sort(function(e,r){return r.renderPriority()-e.renderPriority()})},e.prototype.getFallbackDepthTexture=function(){return this._fallbackDepthStencilTexture||(this._fallbackDepthStencilTexture=new M(this._rctx,{target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728,width:1,height:1},new Uint8Array([255,255,255,255]))),this._fallbackDepthStencilTexture},e.prototype.getGpuMemoryUsage=function(){return{offscreen:this._offscreenRendering?this._offscreenRendering.getGpuMemoryUsage():0,highlights:this._highlightHelper?this._highlightHelper.getGpuMemoryUsage():0,shadows:this._shadowMap?this._shadowMap.getGpuMemoryUsage():0,ssao:this._ssaoHelper?this._ssaoHelper.getGpuMemoryUsage():0}},e.prototype.forEachRenderGeometry=function(e){this._content.forEach(function(r,t){e(r)})},Object.defineProperty(e.prototype,"test",{get:function(){return{orderedMaterialRenderers:this._orderedMaterialRenderers}},enumerable:!0,configurable:!0}),e}(),U=a.vec2f64.create(),G=[];return C});