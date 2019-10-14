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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/assignHelper","../../../../core/Logger","../../../../core/mathUtils","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/vec2","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../support/geometryUtils","../../support/buffer/InterleavedLayout","../lib/ComponentUtils","../lib/GLMaterial","../lib/Material","../lib/Util","./VisualVariableMaterialParameters","./internal/MaterialUtil","./renderers/InstancedRenderer","./renderers/MergedRenderer","../shaders/RibbonLinePrograms","../../../webgl/renderState"],function(e,t,r,i,a,n,s,o,p,c,l,v,f,m,u,d,h,g,S,b,y,P){function A(e,t){t.vvSizeEnabled&&(e.setUniform3fv("vvSizeMinSize",t.vvSizeMinSize),e.setUniform3fv("vvSizeMaxSize",t.vvSizeMaxSize),e.setUniform3fv("vvSizeOffset",t.vvSizeOffset),e.setUniform3fv("vvSizeFactor",t.vvSizeFactor)),t.vvColorEnabled&&(e.setUniform1fv("vvColorValues",t.vvColorValues),e.setUniform4fv("vvColorColors",t.vvColorColors)),t.vvOpacityEnabled&&(e.setUniform1fv("vvOpacityValues",t.vvOpacityValues),e.setUniform1fv("vvOpacityOpacities",t.vvOpacityOpacities))}var C=a.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial"),x=function(e){function t(t,r){var i=e.call(this,r)||this;return i.params=g.copyParameters(t,L),"miter"!==i.params.join&&(i.params.miterLimit=0),i.params.transparent=i.params.color[3]<1||i.params.transparent,i.canBeMerged=null==i.params.stippleLength,i.layout=i.createLayout(),i}return r(t,e),t.prototype.dispose=function(){},t.prototype.setParameterValues=function(e){for(var t in e)d.assert("cap"!==t,"RibbonLineMaterial: cap cannot be changed after creation"),d.assert("stippleLength"!==t||null!=e[t]==(null!=this.params[t]),"RibbonLineMaterial: stippleLength on/off cannot be changed after creation"),this.params[t]=e[t];"miter"!==this.params.join&&(this.params.miterLimit=0),this.notifyDirty("matChanged")},t.prototype.getParameters=function(){return this.params},t.prototype.intersect=function(e,t,r,i,a,n,s,o,p){p?g.intersectDrapedRenderLineGeometry(e,t,r,i,a,n,this.params.width,s):this.intersectLineGeometry(e,t,r,i,a,n,this.params.width,s)},t.prototype.intersectLineGeometry=function(e,t,r,i,a,s,c,v,m){if(i.enable.selectionMode&&!f.isAllHidden(t.componentVisibilities,e.componentOffsets)){if(!d.isTranslationMatrix(r))return void C.error("intersection assumes a translation-only matrix");var u=e.data,h=u.getVertexAttr(),g=h[y.VertexAttrConstants.POSITION].data,S=c;if(this.params.vvSizeEnabled){var b=h[y.VertexAttrConstants.SIZEFEATUREATTRIBUTE].data[0];S*=n.clamp(this.params.vvSizeOffset[0]+b*this.params.vvSizeFactor[0],this.params.vvSizeMinSize[0],this.params.vvSizeMaxSize[0])}else h[y.VertexAttrConstants.SIZE]&&(S*=h[y.VertexAttrConstants.SIZE].data[0]);var P=i.camera,A=D;o.vec2.copy(A,i.point);var x=S*P.pixelRatio,E=4*P.pixelRatio,U=x/2+E;p.vec3.set(H[0],A[0]-U,A[1]+U,0),p.vec3.set(H[1],A[0]+U,A[1]+U,0),p.vec3.set(H[2],A[0]+U,A[1]-U,0),p.vec3.set(H[3],A[0]-U,A[1]-U,0);for(var L=0;L<4;L++)P.unprojectPoint(H[L],X[L]);l.plane.fromPoints(P.eye,X[0],X[1],q),l.plane.fromPoints(P.eye,X[1],X[2],Y),l.plane.fromPoints(P.eye,X[2],X[3],_),l.plane.fromPoints(P.eye,X[3],X[0],K);for(var O=Number.MAX_VALUE,L=0;L<g.length-5;L+=3)if(T[0]=g[L]+r[12],T[1]=g[L+1]+r[13],T[2]=g[L+2]+r[14],M[0]=g[L+3]+r[12],M[1]=g[L+4]+r[13],M[2]=g[L+5]+r[14],!(l.plane.signedDistance(q,T)<0&&l.plane.signedDistance(q,M)<0||l.plane.signedDistance(Y,T)<0&&l.plane.signedDistance(Y,M)<0||l.plane.signedDistance(_,T)<0&&l.plane.signedDistance(_,M)<0||l.plane.signedDistance(K,T)<0&&l.plane.signedDistance(K,M)<0)){if(P.projectPoint(T,B),P.projectPoint(M,F),B[2]<0&&F[2]>0){p.vec3.subtract(w,T,M);var V=P.frustum,I=-l.plane.signedDistance(V.planes[4],T),R=I/p.vec3.dot(w,V.planes[4]);p.vec3.scale(w,w,R),p.vec3.add(T,T,w),P.projectPoint(T,B)}else if(B[2]>0&&F[2]<0){p.vec3.subtract(w,M,T);var V=P.frustum,I=-l.plane.signedDistance(V.planes[4],M),R=I/p.vec3.dot(w,V.planes[4]);p.vec3.scale(w,w,R),p.vec3.add(M,M,w),P.projectPoint(M,F)}else if(B[2]<0&&F[2]<0)continue;B[2]=0,F[2]=0;var k=l.lineSegment.distance2(l.lineSegment.fromPoints(B,F,W),A);k<O&&(O=k,p.vec3.copy(j,T),p.vec3.copy(N,M))}var G=i.rayBeginPoint,J=i.rayEndPoint;if(O<U*U){var Q=Number.MAX_VALUE;if(l.lineSegment.closestLineSegmentPoint(l.lineSegment.fromPoints(j,N,W),l.lineSegment.fromPoints(G,J,Z),z)){p.vec3.subtract(z,z,G);var $=p.vec3.length(z);p.vec3.scale(z,z,1/$),Q=$/p.vec3.distance(G,J)}v(Q,z)}}},t.prototype.createLayout=function(){var e=v.newLayout().vec3f(y.VertexAttrConstants.POSITION).f32(y.VertexAttrConstants.SUBDIVISIONFACTOR).vec2f(y.VertexAttrConstants.UV0).vec3f(y.VertexAttrConstants.AUXPOS1).vec3f(y.VertexAttrConstants.AUXPOS2);return this.params.vvSizeEnabled?e.f32(y.VertexAttrConstants.SIZEFEATUREATTRIBUTE):e.f32(y.VertexAttrConstants.SIZE),this.params.vvColorEnabled?e.f32(y.VertexAttrConstants.COLORFEATUREATTRIBUTE):e.vec4f(y.VertexAttrConstants.COLOR),this.params.vvOpacityEnabled&&e.f32(y.VertexAttrConstants.OPACITYFEATUREATTRIBUTE),e},t.prototype.createBufferWriter=function(){return new O(this.layout,this.params)},t.prototype.createRenderer=function(e,t){return this.canBeMerged?new b(e,t,this,y.vertexAttributeLocations):new S(e,t,this,y.vertexAttributeLocations)},t.prototype.getGLMaterials=function(){return{color:E,depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:U}},t}(u.Material),E=function(e){function t(t){var r=e.call(this,t)||this;return r.updateParameters(),r}return r(t,e),t.prototype.updateParameters=function(){this.params=g.copyParameters(this.material.getParameters()),this.selectProgram()},t.prototype.beginSlot=function(e){return e===(this.params.writeDepth?7:10)},t.prototype.getProgram=function(){return this.program},t.prototype.selectProgram=function(){var e=this.params;this.program=this.programRep.getProgram(y.colorPass,{stipple:null!=e.stippleLength,slice:e.slicePlaneEnabled,join:e.join,cap:e.cap,vvSize:e.vvSizeEnabled,vvColor:e.vvColorEnabled,vvOpacity:e.vvOpacityEnabled}),this.pipelineState=P.makePipelineState({blending:P.separateBlendingParams(770,1,771,771),polygonOffset:e.polygonOffset&&V,depthTest:{func:513},depthWrite:!e.transparent&&e.writeDepth&&P.defaultDepthWriteParams,colorWrite:P.defaultColorWriteParams})},t.prototype.bind=function(e,t){var r=this,i=r.program,a=r.params;if(e.bindProgram(i),e.setPipelineState(this.pipelineState),i.setUniform1f("symbolLineWidth",a.width),i.setUniform4fv("symbolColor",a.color),i.setUniform1f("miterLimit",a.miterLimit),i.setUniform1f("nearPlane",t.nearFar[0]),i.setUniform1f("pixelRatio",t.pixelRatio),i.setUniform2fv("screenSize",[t.viewport[2],t.viewport[3]]),null!=a.stippleLength){var n=a.stippleLength?1/(2*a.stippleLength):0;i.setUniform1f("stippleLengthDoubleInv",n)}A(i,a)},t.prototype.release=function(e){},t.prototype.bindView=function(e,t){var r=this.program,i=this.params;g.bindView(t.origin,t.view,r),i.slicePlaneEnabled&&g.bindSlicePlane(t.origin,t.slicePlane,r)},t.prototype.bindInstance=function(e,t){this.program.setUniformMatrix4fv("model",t.transformation)},t.prototype.getDrawMode=function(){return 5},t}(m),U=function(e){function t(t){var r=e.call(this,t)||this;return r.updateParameters(),r}return r(t,e),t.prototype.updateParameters=function(){this.params=g.copyParameters(this.material.getParameters()),this.selectProgram()},t.prototype.beginSlot=function(e){return 5===e},t.prototype.getProgram=function(){return this.program},t.prototype.selectProgram=function(){var e=this.params;this.program=this.programRep.getProgram(y.highlightPass,{stipple:null!=e.stippleLength,slice:e.slicePlaneEnabled,join:e.join,cap:e.cap,vvSize:e.vvSizeEnabled,vvColor:e.vvColorEnabled,vvOpacity:e.vvOpacityEnabled}),this.pipelineState=P.makePipelineState({polygonOffset:e.polygonOffset&&V,depthTest:{func:513},depthWrite:!e.transparent&&e.writeDepth&&P.defaultDepthWriteParams,colorWrite:P.defaultColorWriteParams})},t.prototype.bind=function(e,t){var r=this,i=r.program,a=r.params;if(e.bindProgram(i),e.setPipelineState(this.pipelineState),g.bindHighlightRendering(e,t,i),i.setUniform1f("symbolLineWidth",a.width),i.setUniform4fv("symbolColor",a.color),i.setUniform1f("miterLimit",a.miterLimit),i.setUniform1f("nearPlane",t.nearFar[0]),i.setUniform1f("pixelRatio",t.pixelRatio),i.setUniform2fv("screenSize",[t.viewport[2],t.viewport[3]]),null!=a.stippleLength){var n=a.stippleLength?1/(2*a.stippleLength):0;i.setUniform1f("stippleLengthDoubleInv",n)}A(i,a)},t.prototype.release=function(e){},t.prototype.bindView=function(e,t){var r=this.program,i=this.params;g.bindView(t.origin,t.view,r),i.slicePlaneEnabled&&g.bindSlicePlane(t.origin,t.slicePlane,r)},t.prototype.bindInstance=function(e,t){this.program.setUniformMatrix4fv("model",t.transformation)},t.prototype.getDrawMode=function(){return 5},t}(m),L=i({width:0,color:[1,1,1,1],join:"miter",cap:"butt",miterLimit:5,writeDepth:!0,polygonOffset:!1,stippleLength:null,slicePlaneEnabled:!1,vvFastUpdate:!1,transparent:!1},h.Default),O=function(){function e(e,t){switch(this.parms=t,this.numCapSubdivisions=0,this.numJoinSubdivisions=0,this.canBeMerged=!1,this.vertexBufferLayout=e,this.canBeMerged=null==this.parms.stippleLength,this.parms.cap){case"butt":this.numCapSubdivisions=0;break;case"square":this.numCapSubdivisions=1;break;case"round":this.numCapSubdivisions=I}switch(this.parms.join){case"miter":case"bevel":this.numJoinSubdivisions=0;break;case"round":this.numJoinSubdivisions=R}}return e.prototype.allocate=function(e){return this.vertexBufferLayout.createBuffer(e)},e.prototype.elementCount=function(e){var t=2*this.numCapSubdivisions+2,r=e.indices[y.VertexAttrConstants.POSITION].length/2+1,i=2*t;if(e.vertexAttr[y.VertexAttrConstants.SUBDIVISIONS])for(var a=e.vertexAttr[y.VertexAttrConstants.SUBDIVISIONS].data,n=1;n<r-1;++n){var s=a[n];i+=4+2*s}else{i+=(r-2)*(2*this.numJoinSubdivisions+4)}return this.canBeMerged&&(i+=2),i},e.prototype.write=function(e,t,r,i){var a=this,n=k,s=G,o=J,c=t.vertexAttr[y.VertexAttrConstants.POSITION].data,l=t.indices&&t.indices[y.VertexAttrConstants.POSITION];l&&l.length!==2*(c.length/3-1)&&console.warn("RibbonLineMaterial does not support indices");var v=null;t.vertexAttr[y.VertexAttrConstants.SUBDIVISIONS]&&(v=t.vertexAttr[y.VertexAttrConstants.SUBDIVISIONS].data);var f=1,m=0;this.parms.vvSizeEnabled?m=t.vertexAttr[y.VertexAttrConstants.SIZEFEATUREATTRIBUTE].data[0]:t.vertexAttr[y.VertexAttrConstants.SIZE]&&(f=t.vertexAttr[y.VertexAttrConstants.SIZE].data[0]);var u=[1,1,1,1],d=0;this.parms.vvColorEnabled?d=t.vertexAttr[y.VertexAttrConstants.COLORFEATUREATTRIBUTE].data[0]:t.vertexAttr[y.VertexAttrConstants.COLOR]&&(u=t.vertexAttr[y.VertexAttrConstants.COLOR].data);var h=0;this.parms.vvOpacityEnabled&&(h=t.vertexAttr[y.VertexAttrConstants.OPACITYFEATUREATTRIBUTE].data[0]);var g=c.length/3,S=e.transformation,b=new Float32Array(r.buffer),P=0,A=this.vertexBufferLayout.stride/4,C=i*A,x=C,E=function(e,t,r,i,n,s){b[C++]=t[0],b[C++]=t[1],b[C++]=t[2],b[C++]=i,b[C++]=n,b[C++]=s,b[C++]=e[0],b[C++]=e[1],b[C++]=e[2],b[C++]=r[0],b[C++]=r[1],b[C++]=r[2],a.parms.vvSizeEnabled?b[C++]=m:b[C++]=f,a.parms.vvColorEnabled?b[C++]=d:(b[C++]=u[0],b[C++]=u[1],b[C++]=u[2],b[C++]=u[3]),a.parms.vvOpacityEnabled&&(b[C++]=h)};this.canBeMerged&&(C+=A),p.vec3.set(n,c[0],c[1],c[2]),S&&p.vec3.transformMat4(n,n,S),p.vec3.set(o,c[3],c[4],c[5]),S&&p.vec3.transformMat4(o,o,S),p.vec3.copy(s,n);for(var U=0;U<this.numCapSubdivisions;++U){var L=1-U/this.numCapSubdivisions;E(n,s,o,L,P,-4),E(n,s,o,L,P,4)}E(n,s,o,0,P,-4),E(n,s,o,0,P,4),p.vec3.copy(n,s),p.vec3.copy(s,o);for(var U=1;U<g-1;U++){var O=3*U;p.vec3.set(o,c[O+3],c[O+4],c[O+5]),S&&p.vec3.transformMat4(o,o,S),P+=p.vec3.distance(n,s),E(n,s,o,0,P,-1),E(n,s,o,0,P,1);for(var V=v?v[U]:this.numJoinSubdivisions,I=0;I<V;++I){var L=(I+1)/(V+1);E(n,s,o,L,P,-2),E(n,s,o,L,P,2)}E(n,s,o,1,P,-2),E(n,s,o,1,P,2),p.vec3.copy(n,s),p.vec3.copy(s,o)}P+=p.vec3.distance(n,s),E(n,s,o,0,P,-5),E(n,s,o,0,P,5);for(var U=0;U<this.numCapSubdivisions;++U){var L=(U+1)/this.numCapSubdivisions;E(n,s,o,L,P,-5),E(n,s,o,L,P,5)}if(this.canBeMerged){for(var U=x;U<x+A;U++)b[U]=b[U+A];for(var R=C-A,U=0;U<A;U++)b[C++]=b[R++]}},e}(),V={factor:0,units:-4},I=3,R=1,T=c.vec3f64.create(),M=c.vec3f64.create(),w=c.vec3f64.create(),z=c.vec3f64.create(),D=c.vec3f64.create(),B=s.createRenderScreenPointArray3(),F=s.createRenderScreenPointArray3(),j=c.vec3f64.create(),N=c.vec3f64.create(),W=l.lineSegment.create(),Z=l.lineSegment.create(),k=c.vec3f64.create(),G=c.vec3f64.create(),J=c.vec3f64.create(),H=[s.createRenderScreenPointArray3(),s.createRenderScreenPointArray3(),s.createRenderScreenPointArray3(),s.createRenderScreenPointArray3()],X=[c.vec3f64.create(),c.vec3f64.create(),c.vec3f64.create(),c.vec3f64.create()],q=l.plane.create(),Y=l.plane.create(),_=l.plane.create(),K=l.plane.create();return x});