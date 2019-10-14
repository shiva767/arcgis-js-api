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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/tsSupport/assignHelper","../../../../core/Error","../../../../core/maybe","../../../../core/libs/earcut/earcut","../../../../core/libs/gl-matrix-2/mat3","../../../../core/libs/gl-matrix-2/mat3f64","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../layers/graphics/dehydratedFeatures","../../../../renderers/support/renderingInfoUtils","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolCommonCode","./Graphics3DSymbolLayer","./graphicUtils","../support/edgeUtils","../../support/projectionUtils","../../support/buffer/BufferView","../../support/buffer/math/vec3","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryData","../../webgl-engine/lib/Object3D","../../webgl-engine/lib/Util","../../webgl-engine/materials/DefaultMaterial","../../webgl-engine/materials/internal/MaterialUtil"],function(e,t,r,a,n,i,o,s,l,c,p,u,h,f,d,y,m,g,v,b,_,E,x,S,P,A,w,C,L,D,M){function R(e,t,r,a,n,i,o,s,l,c,p,u,h,f){var d=r.length/3,y=0;p+=2*a.count,G(e,t,a.index,a.count,r,0,d,n,i,o,s,l,c,p,u,h,f),l+=2*a.count,p+=2*d,p-=2*a.count+2*d,V(n,i,s,o,y,a.pathLengths[0],a.count,l,c,p,u),l+=4*a.pathLengths[0],p+=2*a.pathLengths[0],y+=a.pathLengths[0];for(var m=1;m<a.pathLengths.length;++m)V(n,i,s,o,y,a.pathLengths[m],a.count,l,c,p,u),l+=4*a.pathLengths[m],p+=2*a.pathLengths[m],y+=a.pathLengths[m]}function G(e,t,r,a,n,i,o,s,l,c,p,u,h,d,y,m,g){f.vec3.copy(I,m);for(var v=y>0?1:-1,b=3*r,_=u,E=3*_,x=u+a,S=3*x,P=0;P<a;++P)g&&(I[0]=e[b+0],I[1]=e[b+1],I[2]=e[b+2],f.vec3.normalize(I,I)),s[E+0]=e[b+0],s[E+1]=e[b+1],s[E+2]=e[b+2],l[E+0]=t[b+0],l[E+1]=t[b+1],l[E+2]=t[b+2],c[E+0]=-v*I[0],c[E+1]=-v*I[1],c[E+2]=-v*I[2],p[_]=0,s[S+0]=e[b+0]+y*I[0],s[S+1]=e[b+1]+y*I[1],s[S+2]=e[b+2]+y*I[2],l[S+0]=t[b+0],l[S+1]=t[b+1],l[S+2]=t[b+2],c[S+0]=v*I[0],c[S+1]=v*I[1],c[S+2]=v*I[2],p[x]=y,E+=3,S+=3,b+=3,_+=1,x+=1;b=3*i,E=3*d,S=3*(d+o);E=3*(d+o),S=3*d;var A=U,w=F;y<0&&(A=F,w=U);for(var P=0;P<o;++P)h[E+0]=n[b+A[0]],h[E+1]=n[b+A[1]],h[E+2]=n[b+A[2]],h[S+0]=n[b+w[0]]+a,h[S+1]=n[b+w[1]]+a,h[S+2]=n[b+w[2]]+a,E+=3,S+=3,b+=3}function O(e,t,r,a,n,i,o){a[i]=a[o],o*=3,i*=3,e[i+0]=e[o+0],e[i+1]=e[o+1],e[i+2]=e[o+2],t[i+0]=t[o+0],t[i+1]=t[o+1],t[i+2]=t[o+2],r[i+0]=n[0],r[i+1]=n[1],r[i+2]=n[2]}function V(e,t,r,a,n,i,o,s,l,c,p){var u=n,h=n+1,f=n+o,d=n+o+1,y=s,m=s+1,g=s+2*i,v=s+2*i+1;p<0&&(u=n+o+1,d=n),c*=3;for(var b=0;b<i;++b)b===i-1&&(p>0?(h=n,d=n+o):(h=n,u=n+o)),B(e,u,h,f,Y),O(e,t,a,r,Y,y,u),O(e,t,a,r,Y,m,h),O(e,t,a,r,Y,g,f),O(e,t,a,r,Y,v,d),l[c++]=y,l[c++]=g,l[c++]=v,l[c++]=y,l[c++]=v,l[c++]=m,u++,h++,f++,d++,y+=2,m+=2,g+=2,v+=2}function B(e,t,r,a,n){t*=3,r*=3,a*=3,f.vec3.set(Z,e[t++],e[t++],e[t++]),f.vec3.set(k,e[r++],e[r++],e[r++]),f.vec3.set(q,e[a++],e[a++],e[a++]),f.vec3.subtract(W,k,Z),f.vec3.subtract(J,q,Z),f.vec3.cross(n,J,W),f.vec3.normalize(n,n)}function T(e,t,r,a){var n=e.stageObject;N.spatialReference=r.spatialReference;for(var i=n.geometryRecords,o=i.length,s="absolute-height"!==t.mode,l=0,c=n.objectTransformation,p=u.mat4.invert(h.mat4f64.create(),c),d=0;d<o;d++){var y=i[d].geometry;y.invalidateBoundingInfo();for(var m=y.data.getVertexAttr(),g=m[L.VertexAttrConstants.POSITION].data,b=m[L.VertexAttrConstants.SIZE].data,_=m.mapPos.data,E=g.length/3,x=0,S=0,P=!1,A=0,w=0;w<E;w++){N.x=_[S],N.y=_[S+1],N.z=_[S+2],K[0]=g[x],K[1]=g[x+1],K[2]=g[x+2];var C=v.computeElevation(r,N,t,a,s?H:null);s&&(A+=H.terrainElevation),f.vec3.set(z,g[x+0],g[x+1],g[x+2]),f.vec3.transformMat4(z,z,c),a.setAltitude(C+b[x/3],z),f.vec3.transformMat4(z,z,p),g[x]=z[0],g[x+1]=z[1],g[x+2]=z[2];var D=.01/a.unitInMeters;(Math.abs(K[0]-g[x])>D||Math.abs(K[1]-g[x+1])>D||Math.abs(K[2]-g[x+2])>D)&&(P=!0),S+=3,x+=3}P&&n.geometryVertexAttrsUpdated(d),l+=A/E}return l/o}Object.defineProperty(t,"__esModule",{value:!0});var z=d.vec3f64.create(),I=d.vec3f64.create(),U=[0,2,1],F=[0,1,2],N=y.makeDehydratedPoint(0,0,0,null),H={verticalDistanceToGround:0,terrainElevation:0},j=function(e){function t(t,r,a,n){return e.call(this,t,r,a,n)||this}return r(t,e),t.prototype.doLoad=function(){return n(this,void 0,void 0,function(){var e,t,r,n,l,c;return a(this,function(a){if(!this._isPropertyDriven("size")&&(e=_.validateSymbolLayerSize(this._getSymbolSize())))throw new o("graphics3dextrudesymbollayer:invalid-size",e);return t=s.get(this.symbolLayer,"material","color"),r=this._getCombinedOpacityAndColor(t),n=d.vec3f64.fromArray(r),l=r[3],c={diffuse:n,ambient:n,opacity:l,transparent:l<1||this._isPropertyDriven("opacity"),vertexColors:!0,slicePlaneEnabled:this._context.slicePlaneEnabled,castShadows:this.symbolLayer.castShadows},this._material=new D(i({},c,M.returnDefaultPBRMaterialParameters(this._context.physicalBasedRenderingEnabled),{offsetTransparentBackfaces:!0}),this._getIdHint("_3dlinemat")),this._context.stage.add(3,this._material),[2]})})},t.prototype.destroy=function(){e.prototype.destroy.call(this),this._material&&this._context.stage.remove(3,this._material.id)},t.prototype.createGraphics3DGraphic=function(e){var r=e.graphic;if(!this._validateGeometryType(r.geometry,t.validGeometryTypes,this.symbolLayer.type))return null;if(!this._validateGeometry(r.geometry))return null;var a="graphic"+r.uid,n=this._getVertexOpacityAndColor(e.renderingInfo,Float32Array,255),i=this.getGraphicElevationContext(r);return this._createAs3DShape(r,e.renderingInfo,n,i,a,r.uid)},t.prototype.layerOpacityChanged=function(e,t){var r=this,a=s.get(this.symbolLayer,"material","color"),n=this._getCombinedOpacity(a),i=n<1||this._isPropertyDriven("opacity");this._material.setParameterValues({opacity:n,transparent:i});var o=this._getLayerOpacity();return e.forEach(function(e){var a=t(e);s.isSome(a)&&a.layerOpacityChanged(o,r._context.isAsync)}),!0},t.prototype.layerElevationInfoChanged=function(e,t){return this.updateGraphics3DGraphicElevationInfo(e,t,v.needsElevationUpdates3D)},t.prototype.slicePlaneEnabledChanged=function(e,t){var r=this;return this._material.setParameterValues({slicePlaneEnabled:this._context.slicePlaneEnabled}),e.forEach(function(e){var a=t(e);s.isSome(a)&&a.slicePlaneEnabledChanged(r._context.slicePlaneEnabled,r._context.isAsync)}),!0},t.prototype.physicalBasedRenderingChanged=function(e,t){return this._material.setParameterValues(M.returnDefaultPBRMaterialParameters(this._context.physicalBasedRenderingEnabled)),!0},t.prototype.pixelRatioChanged=function(e,t){return!0},t.prototype._getExtrusionSize=function(e){var t;return t=e.size&&this._isPropertyDriven("size")?m.getDriverAxisSizeValue(e.size,2):this._getSymbolSize(),t/=this._context.renderCoordsHelper.unitInMeters},t.prototype._getSymbolSize=function(){return this.symbolLayer.size||1},t.prototype._createAs3DShape=function(e,t,r,a,n,i){var o=v.getGeometryAsPolygon(e.geometry),f=o.rings,y=[],m=[],b=[],E=new Array(6),w=this._context.renderSpatialReference===x.SphericalECEFSpatialReference,L=this._getExtrusionSize(t),D=d.vec3f64.create();w||this._context.renderCoordsHelper.worldUpAtPosition(null,D);var M=v.getGeometryVertexData3D(f,o.hasZ,o.spatialReference,this._context.renderSpatialReference,this._context.elevationProvider,this._context.renderCoordsHelper,a);if(this._logGeometryCreationWarnings(M,f,"rings","ExtrudeSymbol3DLayer"),0===f.length||!f.some(function(e){return e.length>0}))return null;var G=_.computeCentroid(o);if(s.isNone(G))return null;var O=h.mat4f64.create();x.computeLinearTransformation(o.spatialReference,[G.x,G.y,0],O,this._context.renderSpatialReference);var V=h.mat4f64.create();u.mat4.invert(V,O);var B=p.mat3f64.create();c.mat3.normalFromMat4(B,V);for(var z=M.geometryData.polygons,I=M.eleVertexData,U=M.vertexData,F=U.length/3,N=new Float64Array(3*F*6),H=new Float64Array(3*F*6),j=new Float64Array(3*F*6),Y=new Float64Array(1*F*6),Z=0,k=this,q=0;q<z.length;++q)!function(e){var t=z[e],a=t.count,i=t.index;if(k._context.clippingExtent&&(v.computeBoundingBox(I,i,a,E),v.boundingBoxClipped(E,k._context.clippingExtent)))return"continue";var o=new Float64Array(I.buffer,3*i*N.BYTES_PER_ELEMENT,3*a),s=t.holeIndices.map(function(e){return e-i}),c=l(o,s,3);if(0===c.length)return"continue";var p=3*a*2+2*c.length,u=new Uint32Array(p),f=6*a,d=3*N.BYTES_PER_ELEMENT,g=new S.BufferViewVec3f64(N.buffer,Z*d,d,(Z+f)*d),_=3*H.BYTES_PER_ELEMENT,x=new S.BufferViewVec3f64(H.buffer,Z*_,_,(Z+f)*_),C=new Float64Array(j.buffer,3*Z*j.BYTES_PER_ELEMENT,3*f),M=new Float64Array(Y.buffer,1*Z*Y.BYTES_PER_ELEMENT,1*f);R(U,I,c,t,g.typedBuffer,C,x.typedBuffer,M,0,u,0,L,D,w),P.transformMat4(g,g,V),P.transformMat3(x,x,B),Z+=6*a;var G=k._createExtrudeGeometry(u,{positions:g.typedBuffer,elevation:C,normals:x.typedBuffer,heights:M},r),O=new A(G,n+"path"+e);O.singleUse=!0,y.push(O),m.push(k._material),b.push(h.mat4f64.create())}(q);if(0===y.length)return null;var W=new C({geometries:y,materials:m,transformations:b,castShadow:!0,metadata:{layerUid:this._context.layer.uid,graphicUid:i,isElevationSource:!0},idHint:n});W.objectTransformation=O;var J=T,K=this._createEdgeMaterial(),Q=s.isSome(K)?{baseMaterial:this._material,edgeMaterials:[K],slicePlaneEnabled:this._context.slicePlaneEnabled}:null,X=new g(this,W,y,null,null,J,a,Q);return X.alignedTerrainElevation=M.terrainElevation,X.needsElevationUpdates=v.needsElevationUpdates3D(a.mode),X},t.prototype._createExtrudeGeometry=function(e,t,r){for(var a=e.length,n=e,i=new Uint32Array(a),o=0;o<a;o++)i[o]=0;var s={},l={};return s[L.VertexAttrConstants.POSITION]=n,s[L.VertexAttrConstants.NORMAL]=n,s[L.VertexAttrConstants.COLOR]=i,l[L.VertexAttrConstants.POSITION]={size:3,data:t.positions},l[L.VertexAttrConstants.NORMAL]={size:3,data:t.normals},l[L.VertexAttrConstants.COLOR]={size:4,data:r},l[L.VertexAttrConstants.SIZE]={size:1,data:t.heights},t.elevation&&(l.mapPos={size:3,data:t.elevation},s.mapPos=n),new w.GeometryData(l,s)},t.prototype._createEdgeMaterial=function(){var e={opacity:this._getLayerOpacity()};return E.createMaterial(this.symbolLayer,e)},t.validGeometryTypes=["polygon","extent"],t}(b.default);t.Graphics3DExtrudeSymbolLayer=j;var Y=d.vec3f64.create(),Z=d.vec3f64.create(),k=d.vec3f64.create(),q=d.vec3f64.create(),W=d.vec3f64.create(),J=d.vec3f64.create(),K=d.vec3f64.create();t.default=j});