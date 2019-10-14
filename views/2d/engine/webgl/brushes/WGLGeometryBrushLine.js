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

define(["require","exports","../../../../../core/tsSupport/extendsHelper","../../../../webgl","../enums","../Utils","./WGLGeometryBrush","../materialKey/MaterialKey"],function(e,t,i,a,o,V,n,x){Object.defineProperty(t,"__esModule",{value:!0});a.enums.DataType,a.enums.PrimitiveType,a.enums.Face,a.enums.CullMode;var r=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i(t,e),t.prototype.dispose=function(){},t.prototype.getGeometryType=function(){return o.WGLGeometryType.LINE},t.prototype.drawGeometry=function(e,t,i,a,o){var n,r=e.context,l=e.painter,u=e.rendererInfo,s=e.requiredLevel,v=i.indexFrom,c=i.indexCount,m=i.materialKey,p=x.LineMaterialKey.load(m),f=(n=p,V.createProgramDescriptor(n.data,{geometry:[{location:0,name:"a_pos",count:2,type:5122},{location:1,name:"a_id",count:4,type:5121},{location:2,name:"a_color",count:4,type:5121,normalized:!0},{location:3,name:"a_offsetAndNormal",count:4,type:5120},{location:4,name:"a_accumulatedDistanceAndHalfWidth",count:2,type:5123},{location:5,name:"a_tlbr",count:4,type:5123},{location:6,name:"a_segmentDirection",count:4,type:5120},{location:7,name:"a_aux",count:2,type:5123}]})),d=f.bufferLayouts,y=f.attributes,S=l.materialManager.getMaterialProgram(e,p,"materials/line",y,o),_=this._getVAO(r,d,y,a),z=1/e.pixelRatio;r.bindProgram(S),r.bindVAO(_),this._setSharedUniforms(S,e,t),p.textureBinding&&l.textureManager.bindTextures(r,S,p);var U=Math.pow(2,s-t.key.level)/e.pixelRatio;S.setUniform1f("u_zoomFactor",U),S.setUniform1f("u_blur",0+z),S.setUniform1f("u_antialiasing",z),p.vvSizeMinMaxValue&&S.setUniform4fv("u_vvSizeMinMaxValue",u.vvSizeMinMaxValue),p.vvSizeScaleStops&&S.setUniform1f("u_vvSizeScaleStopsValue",u.vvSizeScaleStopsValue),p.vvSizeFieldStops&&(S.setUniform1fv("u_vvSizeFieldStopsValues",u.vvSizeFieldStopsValues),S.setUniform1fv("u_vvSizeFieldStopsSizes",u.vvSizeFieldStopsSizes)),p.vvSizeUnitValue&&S.setUniform1f("u_vvSizeUnitValueWorldToPixelsRatio",u.vvSizeUnitValueToPixelsRatio),p.vvColor&&(S.setUniform1fv("u_vvColorValues",u.vvColorValues),S.setUniform4fv("u_vvColors",u.vvColors)),p.vvOpacity&&(S.setUniform1fv("u_vvOpacityValues",u.vvOpacityValues),S.setUniform1fv("u_vvOpacities",u.vvOpacities)),r.setFaceCullingEnabled(!0),r.setFrontFace(2305),r.setCullFace(1029),r.drawElements(4,c,5125,4*v),r.setFaceCullingEnabled(!1),r.bindVAO(null)},t}(n.default);t.default=r});