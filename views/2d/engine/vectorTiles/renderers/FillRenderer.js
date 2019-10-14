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

define(["require","exports","../../../../../core/libs/gl-matrix-2/mat3","../../../../../core/libs/gl-matrix-2/mat3f32","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f32","../../../../../core/libs/gl-matrix-2/vec3f32","../../../../../core/libs/gl-matrix-2/vec4f32","../../../../webgl","../GeometryUtils","./rendererUtils"],function(t,e,r,i,o,a,n,l,s,f,u){s.enums.DataType,s.enums.PrimitiveType,s.enums.TextureSamplingMode;return function(){function t(t){this._viewProjMat=a.mat4f32.create(),this._offsetVector=n.vec3f32.create(),this._patternMatrix=i.mat3f32.create(),this._color=l.vec4f32.create(),this._outlineColor=l.vec4f32.create(),this._initialized=!1,this._fillProgramOptions={id:!1,dd:!1,pattern:!1},this._outlineProgramOptions={id:!1,dd:!1},this._programCache=t}return t.prototype.dispose=function(){},t.prototype.render=function(t,e,r,i,a,n,l,s,m,_,c){if(0===e.triangleElementCount)return 0;this._initialized||this._initialize(t);var h=l.getPaintValue("fill-pattern",r),d=void 0!==h,g=l.hasDataDrivenColor?[1,1,1,1]:l.getPaintValue("fill-color",r),p=l.hasDataDrivenOpacity?1:l.getPaintValue("fill-opacity",r),v=p*g[3]*c;this._color[0]=v*g[0],this._color[1]=v*g[1],this._color[2]=v*g[2],this._color[3]=v;var x,y=4===a;y&&(x=u.int32To4Bytes(e.layerID));var V=n.tileTransform.transform,b=n.coordRange/512,D=l.getPaintValue("fill-translate",r);if(0!==D[0]||0!==D[1]){o.mat4.copy(this._viewProjMat,n.tileTransform.transform);var A=D[0],O=D[1],C=0,P=0,j=(1<<n.key.level)/Math.pow(2,r)*b;if(1===l.getPaintValue("fill-translate-anchor",r)){var M=-f.C_DEG_TO_RAD*i,z=Math.sin(M),U=Math.cos(M);C=j*(A*U-O*z),P=j*(A*z+O*U)}else C=j*A,P=j*O;this._offsetVector[0]=C,this._offsetVector[1]=P,this._offsetVector[2]=0,o.mat4.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),V=this._viewProjMat}var w=this._drawFill(t,e,r,a,n,l,s,V,_,c,y,x);if(!(l.getPaintValue("fill-antialias",r)&&!d&&e.outlineElementCount>0)||2!==a&&4!==a)return w;var E=l.hasDataDrivenOutline;if(l.outlineUsesFillColor){if(1!==this._color[3])return e.triangleElementCount/3;this._outlineColor[0]=this._color[0],this._outlineColor[1]=this._color[1],this._outlineColor[2]=this._color[2],this._outlineColor[3]=this._color[3]}else{var T=l.hasDataDrivenOutlineColor?[1,1,1,1]:l.getPaintValue("fill-outline-color",r),B=p*T[3]*c;this._outlineColor[0]=B*T[0],this._outlineColor[1]=B*T[1],this._outlineColor[2]=B*T[2],this._outlineColor[3]=B}var F=.75/_,I=this._getOutlineVAO(t,n,E);if(!I)return w;t.bindVAO(I);var R=(y?1:0)<<1|(E?1:0),S=this._outlineProgramOptions;S.id=y,S.dd=E;var G=this._programCache.getProgram(2,R,S);return t.bindProgram(G),G.setUniformMatrix4fv("u_transformMatrix",V),G.setUniformMatrix4fv("u_extrudeMatrix",m),G.setUniform2fv("u_normalized_origin",n.tileTransform.displayCoord),G.setUniform1f("u_depth",l.z+1/65536),G.setUniform1f("u_outline_width",F),G.setUniform4fv("u_color",this._outlineColor),y&&G.setUniform4f("u_id",x[0],x[1],x[2],x[3]),t.drawElements(4,e.outlineElementCount,5125,12*e.outlineElementStart),t.bindVAO(),w+=e.outlineElementCount/3},t.prototype._initialize=function(t){return!!this._initialized||(this._fillVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:4,normalized:!1,divisor:0}]},this._fillVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:4,stride:8,normalized:!0,divisor:0}]},this._outlineVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:8,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:8,normalized:!1,divisor:0}]},this._outlineVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:12,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:8,stride:12,normalized:!0,divisor:0}]},this._initialized=!0,!0)},t.prototype._drawFill=function(t,e,i,o,a,n,l,s,f,m,_,c){var h=n.getPaintValue("fill-pattern",i),d=void 0!==h,g=n.hasDataDrivenOpacity?1:m*n.getPaintValue("fill-opacity",i),p=n.hasDataDrivenColor?[1,1,1,1]:n.getPaintValue("fill-color",i),v=g*p[3]*m;this._color[0]=v*p[0],this._color[1]=v*p[1],this._color[2]=v*p[2],this._color[3]=v;var x=n.hasDataDrivenFill,y=d||v<1||x;if(y&&1===o)return 0;if(!y&&2===o)return 0;var V=this._getFillVAO(t,a,x);if(!V)return 0;t.bindVAO(V);var b=(_?1:0)<<2|(x?1:0)<<1|(d?1:0),D=this._fillProgramOptions;D.id=_,D.dd=x,D.pattern=d;var A=this._programCache.getProgram(1,b,D);if(t.bindProgram(A),d){var O=l.getMosaicItemPosition(h,!0);if(!O)return t.bindVAO(),void t.bindProgram();var C=f>u.HIGH_RES_CUTOFF?2:1,P=Math.max(Math.pow(2,Math.round(i)-a.key.level),1),j=a.coordRange/(512*C*P);r.mat3.identity(this._patternMatrix);var M=1/(O.size[0]*j),z=1/(O.size[1]*j);this._patternMatrix[0]=M,this._patternMatrix[4]=z,l.bind(t,9729,O.page,5),A.setUniformMatrix3fv("u_pattern_matrix",this._patternMatrix),A.setUniform2f("u_pattern_tl",O.tl[0],O.tl[1]),A.setUniform2f("u_pattern_br",O.br[0],O.br[1]),A.setUniform1i("u_texture",5)}return A.setUniformMatrix4fv("u_transformMatrix",s),A.setUniform2fv("u_normalized_origin",a.tileTransform.displayCoord),A.setUniform1f("u_depth",n.z+1/65536),A.setUniform4fv("u_color",this._color),_&&A.setUniform4f("u_id",c[0],c[1],c[2],c[3]),t.drawElements(4,e.triangleElementCount,5125,12*e.triangleElementStart),t.bindVAO(),e.triangleElementCount/3},t.prototype._getFillVAO=function(t,e,r){if(r){if(e.fillDDVertexArrayObject)return e.fillDDVertexArrayObject;var i=e.fillDDVertexBuffer,o=e.fillIndexBuffer;return i&&o?(e.fillDDVertexArrayObject=new s.VertexArrayObject(t,this._programCache.getProgramAttributes(1),this._fillVertexAttributesDD,{geometry:i},o),e.fillDDVertexArrayObject):null}if(e.fillVertexArrayObject)return e.fillVertexArrayObject;var i=e.fillVertexBuffer,o=e.fillIndexBuffer;return i&&o?(e.fillVertexArrayObject=new s.VertexArrayObject(t,this._programCache.getProgramAttributes(1),this._fillVertexAttributes,{geometry:i},o),e.fillVertexArrayObject):null},t.prototype._getOutlineVAO=function(t,e,r){if(r){if(e.outlineDDVertexArrayObject)return e.outlineDDVertexArrayObject;var i=e.outlineDDVertexBuffer,o=e.outlineIndexBuffer;return i&&o?(e.outlineDDVertexArrayObject=new s.VertexArrayObject(t,this._programCache.getProgramAttributes(2),this._outlineVertexAttributesDD,{geometry:i},o),e.outlineDDVertexArrayObject):null}if(e.outlineVertexArrayObject)return e.outlineVertexArrayObject;var i=e.outlineVertexBuffer,o=e.outlineIndexBuffer;return i&&o?(e.outlineVertexArrayObject=new s.VertexArrayObject(t,this._programCache.getProgramAttributes(2),this._outlineVertexAttributes,{geometry:i},o),e.outlineVertexArrayObject):null},t}()});