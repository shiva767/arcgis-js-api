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

define(["require","exports","../../../../../core/tsSupport/assignHelper","../../../../../core/tsSupport/extendsHelper","../../../../../core/mathUtils","../../../../../core/PooledArray","../../../../../core/libs/gl-matrix-2/mat3","../../../../../core/libs/gl-matrix-2/mat3f64","../../materials/internal/MaterialUtil","../../shaders/EdgeRendererPrograms"],function(e,t,r,i,s,o,n,a,l,d){Object.defineProperty(t,"__esModule",{value:!0}),t.LINE_WIDTH_FRACTION_FACTOR=8,t.EXTENSION_LENGTH_OFFSET=128;var p={type:"uber",slicePlaneEnabled:!1,strokesTexture:null},u=function(){function e(){this._value=0}return Object.defineProperty(e.prototype,"value",{get:function(){return this._value},enumerable:!0,configurable:!0}),e.prototype.increment=function(){this._value++},e.prototype.decrement=function(){this._value--},e}(),h=function(){function e(t,i,s){var n,l,d;this.rctx=t,this.programRepository=i,this.refCount=new u,this.renderables=new Set,this.sortedRenderables=(n={},n[1]=(l={},l[1]=new o,l[2]=new o,l),n[2]=(d={},d[1]=new o,d[2]=new o,d),n),this.renderablesDirty=!1,this.depthBiasZ=-4e-4,this.depthBiasXY=.5,this.tmpViewToWorldNormalMatrix=a.mat3f64.create(),this.settings=r({},p,s),this.key=e.getKey(this.settings.type,this.settings.slicePlaneEnabled);var h=this.settings.strokesTexture.variants;this.writerSettings={variants:h},this.createPrograms()}return e.prototype.dispose=function(){for(var e in this.programs){var t=this.programs[e];t&&(this.programRepository.decreaseRefCount(t),this.programs[e]=null)}},e.prototype.addRenderable=function(e){this.renderables.add(e),this.renderablesDirty=!0},e.prototype.removeRenderable=function(e){this.renderables.delete(e),this.renderablesDirty=!0},e.prototype.setRenderablesDirty=function(){this.renderablesDirty=!0},e.prototype.forEachRenderable=function(e,t){this.renderablesDirty&&this.sortRenderables(),this.sortedRenderables[t][1].forEach(e),this.sortedRenderables[t][2].forEach(e)},e.prototype.bindRegularEdges=function(e,t){this.bind(this.programs.regular,e,t)},e.prototype.bindSilhouetteEdges=function(e,t){this.bind(this.programs.silhouette,e,t)},e.prototype.bind=function(e,t,r){this.rctx.bindProgram(e),e.setUniformMatrix4fv("uProj",t.proj),e.setUniform2f("uDepthBias",this.depthBiasXY,this.depthBiasZ),e.setUniform2f("uPixelToNDC",2/t.viewport[2],2/t.viewport[3]),e.setUniform2f("uNDCToPixel",t.viewport[2]/2,t.viewport[3]/2),e.setUniform1f("uDistanceFalloffFactor",r.distanceFalloffFactor),e.setUniform2f("uViewportDimInv",1/t.viewport[2],1/t.viewport[3]),e.setUniform1f("uPixelRatio",t.pixelRatio||1)},e.prototype.renderRegularEdges=function(e,t,r){this.render(this.programs.regular,e,e.regular.vao,t,r)},e.prototype.renderSilhouetteEdges=function(e,t,r){this.render(this.programs.silhouette,e,e.silhouette.vao,t,r)},e.prototype.render=function(e,t,r,i,s){this.setUniforms(e,t,i),this.rctx.bindVAO(r),this.rctx.capabilities.instancing.drawArraysInstanced(6,0,4,s)},e.prototype.setUniforms=function(e,r,i){r.components.buffer.textureBuffer.bind(e,t.componentDataBindParameters),e.setUniformMatrix4fv("uView",i.view),e.setUniformMatrix4fv("uModel",r.transform.modelMatrix);var s=i.viewInvTransp,o=n.mat3.fromMat4(this.tmpViewToWorldNormalMatrix,s);e.setUniform3f("uCameraPosition",s[3],s[7],s[11]),e.setUniformMatrix3fv("uViewToWorldNormalMatrix",o),"uber"!==this.settings.type&&"sketch"!==this.settings.type||this.setSketchUniforms(e),e.setUniform1f("uWorldLineRadiusPerDistance",Math.tan(i.fovY/2)/(i.viewport[3]/2)),e.setUniform3fv("uLocalOrigin",r.transform.origin.vec3),this.settings.slicePlaneEnabled&&l.bindSlicePlane(r.transform.origin.vec3,i.slicePlane,e)},e.prototype.setSketchUniforms=function(e){var t=this.settings.strokesTexture,r=t.texture;this.rctx.bindTexture(r,0),e.setUniform1i("uStrokesTexture",0),e.setUniform2f("uStrokesTextureScale",1/r.descriptor.width,1/r.descriptor.height),e.setUniform1f("uStrokesLog2Resolution",s.log2(t.resolution)),e.setUniform1f("uStrokesNormalizationScale",t.normalizationScale),e.setUniform1f("uStrokesAmplitude",t.amplitude),e.setUniform1f("uStrokeVariants",t.variants)},e.prototype.getOptions=function(e){return r({},e,{antialiasing:!!this.rctx.capabilities.blendMinMax,mode:this.settings.type,slice:this.settings.slicePlaneEnabled})},e.prototype.createPrograms=function(){var e=this.programRepository.getProgram(d.program,this.getOptions({silhouette:!1})),t=this.programRepository.getProgram(d.program,this.getOptions({silhouette:!0}));this.programRepository.increaseRefCount(e),this.programRepository.increaseRefCount(t),this.programs={regular:e,silhouette:t}},e.prototype.sortRenderables=function(){var e=this;this.renderablesDirty=!1,this.sortedRenderables[1][1].clear(),this.sortedRenderables[1][2].clear(),this.sortedRenderables[2][1].clear(),this.sortedRenderables[2][2].clear(),this.renderables.forEach(function(t){switch(t.objectTransparency){case 1:case 2:switch(t.edgeTransparency){case 1:case 2:e.sortedRenderables[t.objectTransparency][t.edgeTransparency].push(t)}}});var t=function(e,t){return e.transform.origin.id<t.transform.origin.id?-1:e.transform.origin.id>t.transform.origin.id?1:0};this.sortedRenderables[1][1].sort(t),this.sortedRenderables[1][2].sort(t),this.sortedRenderables[2][1].sort(t),this.sortedRenderables[2][2].sort(t)},e.getKey=function(e,t){return"edges-t:"+e+":"+t},e}();t.EdgeRenderer=h,t.componentDataBindParameters={texName:"uComponentDataTex",invDimName:"uComponentDataTexInvDim",unit:2}});