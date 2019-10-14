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

define(["require","exports","../../../../core/Logger","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec4","../../../../core/libs/gl-matrix-2/vec4f64","../../support/imageUtils","./glUtil3D","./Util","../shaders/SSAOPrograms","../../../webgl/FramebufferObject","../../../webgl/renderState","../../../webgl/Texture","../../../webgl/Util"],function(e,t,r,i,s,o,n,a,h,u,l,p,f,_,m){var c=r.getLogger("esri.views.3d.webgl-engine.lib.SSAOHelper"),d=function(){function t(e,t,r){this._enabled=!1,this._BLUR_F=2,this._attenuation=.5,this._radius=3,this._samples=16,this._viewportToRestore=n.vec4f64.create(),this._rctx=t,this._programRep=e,this._requestRender=r,this._emptyTexture=h.createEmptyTexture(t)}return t.prototype.dispose=function(){this._emptyTexture.dispose(),this._emptyTexture=null},Object.defineProperty(t.prototype,"isSupported",{get:function(){var e=this._rctx,t=-1!==e.parameters.versionString.indexOf("WebGL 0.93"),r=-1!==e.parameters.versionString.indexOf("WebGL 0.94");return!(t||r)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"enabled",{get:function(){return this._enabled},set:function(e){e?this.enable():this.disable()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"attenuation",{get:function(){return this._attenuation},set:function(e){this._attenuation=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"radius",{get:function(){return this._radius},set:function(e){this._radius=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterRadius",{get:function(){return 4},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"samples",{get:function(){return this._samples},set:function(e){this._samples=e,this._enabled&&this.selectPrograms()},enumerable:!0,configurable:!0}),t.prototype.computeSSAO=function(e,t,r){if(this._noiseTexture){u.assert(this.enabled);var i=this._rctx,n=e.fullViewport,a=n[2],l=n[3],p=a/this._BLUR_F,f=l/this._BLUR_F;this._ssaoFBO.resize(a,l),this._blur0FBO.resize(p,f),this._blur1FBO.resize(p,f);var _=1*a,c=1*l;i.bindFramebuffer(this._ssaoFBO),o.vec4.copy(this._viewportToRestore,e.fullViewport),i.setViewport(0,0,a,l);var d=this._ssaoProgram,x=this._blurProgram;d.setUniform2f("rnmScale",a/this._noiseTexture.descriptor.width,l/this._noiseTexture.descriptor.height),d.setUniform3fv("pSphere",this._samples<=8?this._data.random8:this._samples<=16?this._data.random16:this._samples<=32?this._data.random32:this._data.random64),i.bindProgram(d),i.setPipelineState(this._pipelineState);var v=this._data.minDiscrepancy,U=this._samples<v.length?v[this._samples]:5779;d.setUniform1f("numSpiralTurns",U);var y=g,F=b;u.inverseProjectionInfo(e.projectionMatrix,e.fullWidth,e.fullHeight,y,F),d.setUniform4fv("projInfo",y),d.setUniform2fv("zScale",F),d.setUniform2f("nearFar",e.near,e.far);var O=1/e.computeRenderPixelSizeAtDist(1);d.setUniform1f("projScale",1*O),d.setUniform2f("screenDimensions",_,c);var T=2*this._radius,w=s.vec3.distance(e.eye,e.center);T=20*e.computeRenderPixelSizeAtDist(w),T=Math.max(.1,T),d.setUniform1f("radius",T),d.setUniform1f("intensity",4*this._attenuation/Math.pow(T,6)),d.setUniform1i("rnm",0),d.setUniform1i("normalMap",1),d.setUniform1i("depthMap",2),i.bindTexture(this._noiseTexture,0),i.bindTexture(r,1),i.bindTexture(t,2);var B=h.createQuadVAO(this._rctx);i.bindVAO(B),i.drawArrays(5,0,m.vertexCount(B,"geometry"));i.bindTexture(this._ssaoFBO.colorTexture,0),i.setViewport(0,0,_/this._BLUR_F,c/this._BLUR_F),i.bindFramebuffer(this._blur0FBO),x.setUniform2f("screenDimensions",_,c),x.setUniform1i("tex",0),x.setUniform1i("normalMap",1),x.setUniform1i("depthMap",2),x.setUniform2f("blurSize",0,1*this._BLUR_F/c),x.setUniform1i("radius",4),x.setUniform1f("g_BlurFalloff",.08),x.setUniform2f("nearFar",e.near,e.far),w>5e4&&(O=Math.max(0,O-(w-5e4))),x.setUniform1f("projScale",O),x.setUniform2f("zScale",1,0),i.drawArrays(5,0,m.vertexCount(B,"geometry")),x.setUniform2f("blurSize",1*this._BLUR_F/_,0),i.bindFramebuffer(this._blur1FBO),i.bindTexture(this._blur0FBO.colorTexture,0),i.drawArrays(5,0,m.vertexCount(B,"geometry")),i.setViewport(this._viewportToRestore[0],this._viewportToRestore[1],this._viewportToRestore[2],this._viewportToRestore[3])}},t.prototype.setUniforms=function(e){var t=this.enabled&&this._noiseTexture,r=this._rctx;r.bindTexture(t?this._blur1FBO.colorTexture:this._emptyTexture,6),r.setActiveTexture(0),e.setUniform1i("ssaoTex",6),t?e.setUniform4f("viewportPixelSz",this._viewportToRestore[0],this._viewportToRestore[1],1/this._ssaoFBO.width,1/this._ssaoFBO.height):e.setUniform4f("viewportPixelSz",-1,-1,-1,-1)},t.prototype.bindAll=function(e){for(var t=e.getProgramsUsingUniform("viewportPixelSz"),r=0;r<t.length;r++)this.setUniforms(t[r])},t.prototype.selectPrograms=function(){var e=this._samples<=8?8:this._samples<=16?16:this._samples<=32?32:64;this._ssaoProgram=this._programRep.getProgram(l.ssaoPass,{samples:e}),this._blurProgram=this._programRep.getProgram(l.blurPass,{radius:4}),this._pipelineState=f.makePipelineState({colorWrite:f.defaultColorWriteParams})},t.prototype.enable=function(){var e=this;if(!this.enabled){if(!this.isSupported)return void c.warn("SSAO is not supported for this browser or hardware");this._enabled=!0,this.loadResources(function(){e._enabled&&e.initialize()})}},t.prototype.loadResources=function(t){var r=this;this._data?t():e(["./SSAOHelperData"],function(e){r._data=e,t()})},t.prototype.initialize=function(){var e=this,t={target:3553,pixelFormat:6408,dataType:5121,samplingMode:9729,wrapMode:33071,width:0,height:0},r={colorTarget:0,depthStencilTarget:0};this._ssaoFBO=p.createWithAttachments(this._rctx,t,r),this._blur0FBO=p.createWithAttachments(this._rctx,t,r),this._blur1FBO=p.createWithAttachments(this._rctx,t,r),a.requestImage(this._data.noiseTexture).then(function(t){e._enabled&&(e._noiseTexture=new _(e._rctx,{target:3553,pixelFormat:6408,dataType:5121,hasMipmap:!0,width:t.width,height:t.height},t),e._requestRender())}),this.selectPrograms()},t.prototype.disable=function(){this.enabled&&(this._enabled=!1,this._noiseTexture&&(this._noiseTexture.dispose(),this._noiseTexture=null),this._blur1FBO&&(this._blur1FBO.dispose(),this._blur1FBO=null),this._blur0FBO&&(this._blur0FBO.dispose(),this._blur0FBO=null),this._ssaoFBO&&(this._ssaoFBO.dispose(),this._ssaoFBO=null))},t.prototype.getGpuMemoryUsage=function(){return m.getGpuMemoryUsage(this._blur0FBO)+m.getGpuMemoryUsage(this._blur1FBO)+m.getGpuMemoryUsage(this._ssaoFBO)},t}(),b=i.vec2f64.create(),g=n.vec4f64.create();return d});