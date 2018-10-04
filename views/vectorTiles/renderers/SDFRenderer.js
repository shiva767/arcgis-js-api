// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.9/esri/copyright.txt for details.

define(["require","exports","../../../core/has","../../../core/libs/gl-matrix/mat4","../../../core/libs/gl-matrix/vec3","../../../core/libs/gl-matrix/vec4","../GeometryUtils","./rendererUtils","../../webgl/VertexArrayObject"],function(e,t,r,i,o,a,s,n,f){return function(){function e(e){this._initialized=!1,this._programOptions={id:!1,dd:!1},this._programCache=e,this._viewProjMat=i.create(),this._offsetVector=o.create(),this._extrudeMat=i.create(),this._haloColor=a.create(),this._sdfColor=a.create(),this._scaleVec=o.create()}return e.prototype.dispose=function(){},e.prototype.render=function(e,t,o,a,f,l,h,_,d,u,m,c,x){var v=this;if(!r("esri-vector-tiles-avoid-text")){this._initialized||this._initialize(e);var g=s.degToByte(f),p=_.getLayoutValue("text-rotation-alignment",o);2===p&&(p=1===_.getLayoutValue("symbol-placement",o)?0:1);var y=0===p,V=_.getLayoutValue("text-keep-upright",o)&&y,D=3===a,U=.8*3/c,z=_.hasDataDrivenTextSize?1:_.getLayoutValue("text-size",o),b=_.hasDataDrivenTextColor?[1,1,1,1]:_.getPaintValue("text-color",o),C=_.hasDataDrivenTextOpacity?1:_.getPaintValue("text-opacity",o),A=b[3]*C*x;this._sdfColor[0]=A*b[0],this._sdfColor[1]=A*b[1],this._sdfColor[2]=A*b[2],this._sdfColor[3]=A,this._glyphTextureSize||(this._glyphTextureSize=new Float32Array([d.width/4,d.height/4]));var M=h.tileTransform.transform,O=_.getPaintValue("text-translate",o);if(0!==O[0]||0!==O[1]){i.copy(this._viewProjMat,h.tileTransform.transform);var P=O[0],j=O[1],w=0,T=0,S=h.coordRange/512,B=(1<<h.key.level)/Math.pow(2,o)*S;if(1===_.getPaintValue("text-translate-anchor",o)){var L=-s.C_DEG_TO_RAD*f,E=Math.sin(L),I=Math.cos(L);w=B*(P*I-j*E),T=B*(P*E+j*I)}else w=B*P,T=B*j;this._offsetVector[0]=w,this._offsetVector[1]=T,this._offsetVector[2]=0,i.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),M=this._viewProjMat}y?i.copy(this._extrudeMat,u):i.copy(this._extrudeMat,m),this._scaleVec[0]=1/24,this._scaleVec[1]=1/24,this._scaleVec[2]=1,i.scale(this._extrudeMat,this._extrudeMat,this._scaleVec);var R=_.hasDataDrivenText,G=this._getSDFVAO(e,h,R);if(G){e.bindVAO(G);var k=(D?1:0)<<1|(R?1:0),F=this._programOptions;F.id=D,F.dd=R;var q=this._programCache.getProgram(6,k,F);if(e.bindProgram(q),q.setUniformMatrix4fv("u_transformMatrix",M),q.setUniformMatrix4fv("u_extrudeMatrix",this._extrudeMat),q.setUniform2fv("u_normalized_origin",h.tileTransform.displayCoord),q.setUniform1f("u_depth",_.z+1/65536),q.setUniform2fv("u_mosaicSize",this._glyphTextureSize),q.setUniform1f("u_mapRotation",g),q.setUniform1f("u_keepUpright",V?1:0),q.setUniform1f("u_level",10*o),q.setUniform1f("u_fadeSpeed",10*l.fadeSpeed),q.setUniform1f("u_minfadeLevel",10*l.minfadeLevel),q.setUniform1f("u_maxfadeLevel",10*l.maxfadeLevel),q.setUniform1f("u_fadeChange",10*(o+l.fadeChange)),q.setUniform1i("u_texture",0),q.setUniform1f("u_size",z),q.setUniform1f("u_antialiasingWidth",U),D){var W=n.int32To4Bytes(t.layerID);q.setUniform4f("u_id",W[0],W[1],W[2],W[3])}t.glyphPerPageElementsMap.forEach(function(t,r){v._renderGlyphRange(e,t,r,_,d,q,o,C*x,3)}),e.bindVAO()}}},e.prototype._renderGlyphRange=function(e,t,r,i,o,a,s,n,f){o.bind(e,9729,r,0);var l=i.getPaintValue("text-halo-color",s),h=i.getPaintValue("text-halo-width",s);if(l[3]>0&&h>0){var _=l[3]*n;this._haloColor[0]=_*l[0],this._haloColor[1]=_*l[1],this._haloColor[2]=_*l[2],this._haloColor[3]=_;var d=i.getPaintValue("text-halo-blur",s)*f,u=h*f;a.setUniform4fv("u_color",this._haloColor),a.setUniform1f("u_halo",1),a.setUniform1f("u_edgeDistance",u),a.setUniform1f("u_edgeBlur",d),e.drawElements(4,t[1],5125,12*t[0])}this._sdfColor[3]>0&&(a.setUniform4fv("u_color",this._sdfColor),a.setUniform1f("u_halo",0),a.setUniform1f("u_edgeDistance",0),a.setUniform1f("u_edgeBlur",0),e.drawElements(4,t[1],5125,12*t[0]))},e.prototype._initialize=function(e){return!!this._initialized||(this._vertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:16,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:16,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:16,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}]},this._vertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:24,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:24,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_size",count:1,type:5126,offset:20,stride:24,normalized:!1,divisor:0}]},this._initialized=!0,!0)},e.prototype._getSDFVAO=function(e,t,r){if(r){if(t.textDDVertexArrayObject)return t.textDDVertexArrayObject;var i=t.textDDVertexBuffer,o=t.textIndexBuffer;return i&&o?(t.textDDVertexArrayObject=new f(e,this._programCache.getProgramAttributes(6),this._vertexAttributesDD,{geometry:i},o),t.textDDVertexArrayObject):null}if(t.textVertexArrayObject)return t.textVertexArrayObject;var i=t.textVertexBuffer,o=t.textIndexBuffer;return i&&o?(t.textVertexArrayObject=new f(e,this._programCache.getProgramAttributes(6),this._vertexAttributes,{geometry:i},o),t.textVertexArrayObject):null},e}()});