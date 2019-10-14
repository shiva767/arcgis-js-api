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

define(["require","exports","../../../../core/compilerUtils","../../../../core/Logger","../../../../core/mathUtils","../../../../core/mathUtils","../../../../core/typedArrayUtil","../../support/imageUtils","./DDSUtil","./DefaultVertexBufferLayouts","./glUtil3D","./IdGen","./Util","../shaders/MiscPrograms","../../../webgl/FramebufferObject","../../../webgl/renderState","../../../webgl/Texture","../../../webgl/Util","../../../webgl/capabilities/isWebGL2Context"],function(e,t,i,a,r,s,o,n,p,h,m,d,l,u,w,f,c,g,T){var x=a.getLogger("esri.views.3d.webgl-engine.lib.Texture"),y=function(){function e(t,i,a){this.data=t,this.id=e.idGen.gen(i),this.unloadFunc=void 0,this.params=a||{},this.params.mipmap=!1!==this.params.mipmap,this.params.noUnpackFlip=this.params.noUnpackFlip||!1,this.params.preMultiplyAlpha=this.params.preMultiplyAlpha||!1,this.params.wrap=this.params.wrap||{s:10497,t:10497},this.params.powerOfTwoResizeMode=this.params.powerOfTwoResizeMode||1,this.estimatedTexMemRequired=e.estimateTexMemRequired(this.data,this.params)}return e.estimateTexMemRequired=function(e,t){return null==e?0:o.isArrayBuffer(e)||o.isUint8Array(e)?e.byteLength:e instanceof Image||e instanceof ImageData||e instanceof HTMLCanvasElement?(t.mipmap?4/3:1)*e.width*e.height*(t.components||4):(t.mipmap?4/3:1)*t.width*t.height*(t.components||4)||0},e.prototype.getEstimatedTexMemRequired=function(){return this.estimatedTexMemRequired},e.prototype.dispose=function(){this.data=void 0},e.prototype.deferredLoading=function(){return"string"==typeof this.data},e.prototype.getWidth=function(){return this.params.width},e.prototype.getHeight=function(){return this.params.height},e.prototype.initializeThroughUpload=function(t,i,a,r,s){var n=this.data;if(i.flipped=!this.params.noUnpackFlip,i.samplingMode=this.params.mipmap?9987:9729,i.hasMipmap=this.params.mipmap,i.wrapMode=this.params.wrap,i.preMultiplyAlpha=this.params.preMultiplyAlpha,"string"==typeof n)this.loadTextureFromUri(t,n,i,a,r,s);else if(n instanceof Image||n instanceof ImageData||n instanceof HTMLCanvasElement)this.loadTextureFromImageData(t,n,i,a,r,s);else if(o.isArrayBuffer(n)&&this.params.encoding===e.DDS_ENCODING){var h=p.createDDSTexture(t,i,n,this.params.mipmap);t.bindTexture(h),s(h)}else if(o.isUint8Array(n)&&this.params.encoding===e.DDS_ENCODING){var h=p.createDDSTexture(t,i,n.buffer,this.params.mipmap);t.bindTexture(h),s(h)}else if(o.isUint8Array(n)){l.assert(this.params.width>0&&this.params.height>0),i.pixelFormat=1===this.params.components?6409:3===this.params.components?6407:6408,i.width=this.params.width,i.height=this.params.height;var h=new c(t,i,n);t.bindTexture(h),s(h)}else{if(null!==n)throw console.warn("Unsupported image data"),new Error("Unsupported image data");var h=new c(t,i,null);t.bindTexture(h),s(h)}this.data=void 0},e.prototype.loadTextureFromImageData=function(e,t,i,a,r,o){this.params.width=t.width,this.params.height=t.height,i.pixelFormat=3===this.params.components?6407:6408;var n=33071===this.params.wrap.s&&33071===this.params.wrap.t;if(T.default(e.gl)||!this.params.mipmap&&n||s.isPowerOfTwo(t.width)&&s.isPowerOfTwo(t.height)){i.width=t.width,i.height=t.height;var p=new c(e,i,t);e.bindTexture(p),o(p)}else{var p=this.makePowerOfTwoTexture(e,t,i,a,r);e.bindTexture(p),o(p)}},e.prototype.loadTextureFromUri=function(e,t,i,a,r,o){var p=this,h=!1!==this.params.mipmap;n.requestImage(t).then(function(t){if(l.assert(t.width>=1&&t.height>=1),i.samplingMode=h?9987:9729,i.hasMipmap=h,!(h||33071!==i.wrapMode)||s.isPowerOfTwo(t.width)&&s.isPowerOfTwo(t.height)){i.width=t.width,i.height=t.height;var n=new c(e,i,t);e.bindTexture(n),o(n)}else{var n=p.makePowerOfTwoTexture(e,t,i,a,r);e.bindTexture(n),o(n)}}).catch(function(e){var i=t.length>200?t.slice(0,100)+"..."+t.slice(t.length-100):t;x.error("Failed to load image from uri",i,e),o(null)})},e.prototype.makePowerOfTwoTexture=function(e,t,a,s,o){var n=t.width,p=t.height,h=r.nextHighestPowerOfTwo(n),m=r.nextHighestPowerOfTwo(p);a.width=h,a.height=m;var d;switch(this.params.powerOfTwoResizeMode){case 2:a.textureCoordinateScaleFactor=[n/h,p/m],d=new c(e,a),d.updateData(0,0,0,n,p,t);break;case 1:case null:case void 0:d=this.stretchToPowerOfTwo(e,t,a,s,o);break;default:i.neverReached(this.params.powerOfTwoResizeMode)}return a.hasMipmap&&d.generateMipmap(),d},e.prototype.stretchToPowerOfTwo=function(e,t,i,a,r){var s=new c(e,i),o=w.createWithAttachments(e,s,{colorTarget:0,depthStencilTarget:0}),n=new c(e,{target:3553,pixelFormat:i.pixelFormat,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!!i.flipped,maxAnisotropy:8,preMultiplyAlpha:i.preMultiplyAlpha},t);if(e.bindFramebuffer(o),void 0===r){var p=e.getViewport();r=[p.x,p.y,p.width,p.height]}e.setViewport(0,0,i.width,i.height);var d=a.getProgram(u.texOnly);e.bindProgram(d),d.setUniform4f("color",1,1,1,1),d.setUniform1i("tex",0);var l=m.createQuadVAO(e,h.Pos3Tex);return e.bindTexture(n,0),e.bindVAO(l),e.setPipelineState(v),e.drawArrays(5,0,g.vertexCount(l,"geometry")),e.bindFramebuffer(null),e.setViewport(r[0],r[1],r[2],r[3]),l.dispose(!0),n.dispose(),e.bindFramebuffer(null),o.detachColorTexture(),o.dispose(),s},e.prototype.setUnloadFunc=function(e){this.unloadFunc=e},e.prototype.unload=function(){void 0!==this.unloadFunc&&(this.unloadFunc(this.id),this.unloadFunc=void 0)},e.createEmpty=function(t){return void 0===t&&(t="emptyTexture"),new e(new Uint8Array([0,0,0,0]),t,{width:1,height:1,wrap:{s:33071,t:33071}})},e.idGen=new d.IdGen,e.DDS_ENCODING="image/vnd-ms.dds",e}(),v=f.makePipelineState({colorWrite:f.defaultColorWriteParams});return y});