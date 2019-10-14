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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","dojo/i18n!../../nls/smartMapping","../../../core/Error","../../../core/lang","../../../core/maybe","../../../core/promiseUtils","./type","./support/utils","../support/utils","../symbology/relationship","../../support/AuthoringInfo","../../support/AuthoringInfoClassBreakInfo","../../support/AuthoringInfoFieldInfo","../../../symbols/support/utils"],function(e,n,r,a,i,l,s,o,t,u,d,f,m,p,c,h,v,y){function b(e){return i(this,void 0,void 0,function(){var n,i,l,o,t,u,d,p,c;return a(this,function(a){switch(a.label){case 0:if(!(e&&e.layer&&e.view&&e.field1&&e.field2))throw new s("relationship-renderer:missing-parameters","'layer', 'view', 'field1' and 'field2' parameters are required");if(n=r({},e),n.symbolType=n.symbolType||"2d",n.defaultSymbolEnabled=null==n.defaultSymbolEnabled||n.defaultSymbolEnabled,n.classificationMethod=n.classificationMethod||"quantile",n.numClasses=n.numClasses||3,n.focus=n.focus||null,-1===k.indexOf(n.classificationMethod))throw new s("relationship-renderer:invalid-parameters","classification method "+n.classificationMethod+" is not supported");if(n.numClasses<2||n.numClasses>4)throw new s("relationship-renderer:invalid-parameters","'numClasses' must be 2, 3 or 4");if(e.focus&&-1===z.indexOf(e.focus))throw new s("relationship-renderer:invalid-parameters","'focus' must be 'HH', 'HL', 'LH', 'LL' or null");if(i=[0,2,1,3],l=m.createLayerAdapter(n.layer,i),n.layer=l,!l)throw new s("relationship-renderer:invalid-parameters","'layer' must be one of these types: "+m.getLayerTypeLabels(i).join(", "));return[4,l.load()];case 1:if(a.sent(),o=l.geometryType,t=n.symbolType.indexOf("3d")>-1,n.outlineOptimizationEnabled="polygon"===o&&n.outlineOptimizationEnabled,"mesh"===o)n.symbolType="3d-volumetric",n.colorMixMode=n.colorMixMode||"replace",n.edgesType=n.edgesType||"none";else{if("3d-volumetric-uniform"===n.symbolType&&"point"!==o)throw new s("relationship-renderer:not-supported","3d-volumetric-uniform symbols are supported for point layers only");if(t&&"polygon"===o)throw new s("relationship-renderer:not-supported","3d symbols are not supported for polygon layers");if(n.symbolType.indexOf("3d-volumetric")>-1&&(!n.view||"3d"!==n.view.type))throw new s("relationship-renderer:invalid-parameters","'view' parameter should be an instance of SceneView when 'symbolType' parameter is '3d-volumetric' or '3d-volumetric-uniform'")}if(u=n.field1,d=n.field2,p=[u.field,d.field],u.normalizationField&&p.push(u.normalizationField),d.normalizationField&&p.push(d.normalizationField),c=f.verifyBasicFieldValidity(l,p,"relationship-renderer:invalid-parameters"))throw c;return[2,n]}})})}function w(e){return i(this,void 0,void 0,function(){var n,r,i,l,o,t;return a(this,function(a){if(!(e&&e.renderer&&e.numClasses))throw new s("update-relationship-renderer:missing-parameters","'renderer' and 'numClasses' parameters are required");if(n=e.field1,r=e.field2,i=e.renderer,l=e.numClasses,o=e.colors,t=Math.pow(l,2),(n||r)&&!(n&&r&&n.field&&r.field))throw new s("update-relationship-renderer:missing-parameters","'field1' and 'field2' parameters are required");if(n&&!n.classBreakInfos||r&&!r.classBreakInfos)throw new s("update-relationship-renderer:missing-parameters","'field1.classBreakInfos' and 'field2.classBreakInfos' are required");if(!i.authoringInfo)throw new s("update-relationship-renderer:missing-parameters","'renderer.authoringInfo' is required");if(i.uniqueValueInfos.length!==t)throw new s("update-relationship-renderer:invalid-parameters","Renderer must have "+t+" unique value infos to support "+l+" classes");if(o&&o.length!==t)throw new s("update-relationship-renderer:invalid-parameters","The scheme must have "+t+" colors");return[2,e]})})}function g(e){return i(this,void 0,void 0,function(){var n,r,i,l,s;return a(this,function(a){switch(a.label){case 0:return n=e.relationshipScheme,r=null,i=null,[4,f.getBasemapInfo(e.basemap,e.view)];case 1:return l=a.sent(),(r=t.isSome(l.basemapId)?l.basemapId:null,i=t.isSome(l.basemapTheme)?l.basemapTheme:null,n)?[2,{scheme:p.cloneScheme(n),basemapId:r,basemapTheme:i}]:(s=p.getSchemes({basemap:r,basemapTheme:i,geometryType:e.geometryType,theme:e.theme,worldScale:e.worldScale,view:e.view}),s&&(n=s.primaryScheme,r=s.basemapId,i=s.basemapTheme),[2,{scheme:n,basemapId:r,basemapTheme:i}])}})})}function I(e,n){var r=o.clone(S[e]);return p.flatten2DArray(r,n)}function M(e,n){return I(e,n).map(function(e){return{value:e,count:0}})}function F(e,n,r,a){var i=e.field,l=e.normalizationField,s=n.field,o=n.normalizationField,t=r.map(function(e){return[e.minValue,e.maxValue]}),u=a.map(function(e){return[e.minValue,e.maxValue]}),d=t.length,f=x[d];return"\n  var field1 = $feature['"+i+"'];\n  var field2 = $feature['"+s+"'];\n  var hasNormField1 = "+(l?"true":"false")+";\n  var hasNormField2 = "+(o?"true":"false")+";\n  var normField1 = "+(l?"$feature['"+l+"']":"null")+";\n  var normField2 = "+(o?"$feature['"+o+"']":"null")+";\n\n  if (\n    IsEmpty(field1) ||\n    IsEmpty(field2) ||\n    (hasNormField1 && (IsEmpty(normField1) || normField1 == 0)) ||\n    (hasNormField2 && (IsEmpty(normField2) || normField2 == 0))\n  ) {\n    return null;\n  }\n\n  var value1 = IIf(hasNormField1, (field1 / normField1), field1);\n  var value2 = IIf(hasNormField2, (field2 / normField2), field2);\n\n  var breaks1 = "+JSON.stringify(t)+";\n  var breaks2 = "+JSON.stringify(u)+";\n  var classCodes = "+JSON.stringify(f)+";\n\n  function getClassCode(value, breaks) {\n    var code = null;\n\n    for (var i in breaks) {\n      var info = breaks[i];\n      if (value >= info[0] && value <= info[1]) {\n        code = classCodes[i];\n        break;\n      }\n    }\n\n    return code;\n  }\n\n  var code1 = getClassCode(value1, breaks1);\n  var code2 = getClassCode(value2, breaks2);\n\n  var classValue = IIf(IsEmpty(code1) || IsEmpty(code2), null, code1 + code2);\n  return classValue;\n  "}function T(e,n,o){return i(this,void 0,void 0,function(){var i,t,u,f,m,h,v,y,b,w,I,T,H,L,V,C,k,z,S,x,B;return a(this,function(a){switch(a.label){case 0:if(i=e.basemap,t=e.classificationMethod,u=e.field1,f=e.field2,m=e.focus,h=e.numClasses,v=e.layer,y=n.classBreakInfos,b=o.classBreakInfos,h!==y.length||y.length!==b.length)throw new s("relationship-renderer:error","incompatible class breaks");return w=M(h,m),I=F(e.field1,e.field2,y,b),[4,g({basemap:i,geometryType:v.geometryType,theme:"default",relationshipScheme:e.relationshipScheme,worldScale:e.symbolType.indexOf("3d-volumetric")>-1,view:e.view})];case 1:return T=a.sent(),H=T.scheme,[4,d.createRenderer({layer:v,basemap:i,valueExpression:I,valueExpressionTitle:l.relationship.legendTitle,numTypes:-1,sortEnabled:!1,defaultSymbolEnabled:e.defaultSymbolEnabled,typeScheme:r({colors:p.getColors(H,h,m)},H),statistics:{uniqueValueInfos:w},legendOptions:e.legendOptions,outlineOptimizationEnabled:e.outlineOptimizationEnabled,symbolType:e.symbolType,colorMixMode:e.colorMixMode,edgesType:e.edgesType,view:e.view})];case 2:for(L=a.sent(),V=L.renderer,C=V.uniqueValueInfos,k=l.relationship,z=0,S=C;z<S.length;z++)x=S[z],x.label=k[x.value];return B=new c({type:"relationship",classificationMethod:t,numClasses:h,focus:m,field1:{field:u.field,normalizationField:u.normalizationField,classBreakInfos:y.map(E)},field2:{field:f.field,normalizationField:f.normalizationField,classBreakInfos:b.map(E)}}),V.authoringInfo=B,[2,{renderer:V,classBreaks:{field1:n,field2:o},uniqueValueInfos:L.uniqueValueInfos,relationshipScheme:H,basemapId:L.basemapId,basemapTheme:L.basemapTheme}]}})})}function H(e,n,r){var a=I(n,r);e.sort(function(e,n){var r=a.indexOf(e.value),i=a.indexOf(n.value),l=0;return r<i?l=-1:r>i&&(l=1),l})}function L(e,n){var r=e.authoringInfo;r.numClasses=n.numClasses,r.focus=n.focus||null,r.focus||delete r.focus;var a=n.field1,i=n.field2;r.field1=new v.default({field:a.field,normalizationField:a.normalizationField,classBreakInfos:a.classBreakInfos.map(function(e){return new h.default(E(e))})}),r.field2=new v.default({field:i.field,normalizationField:i.normalizationField,classBreakInfos:i.classBreakInfos.map(function(e){return new h.default(E(e))})}),e.authoringInfo=r}function V(e){return i(this,void 0,void 0,function(){var n,r,i,l,s,o,t,u,d;return a(this,function(a){switch(a.label){case 0:return[4,w(e)];case 1:return n=a.sent(),r=n.field1,i=n.field2,l=n.renderer,s=n.numClasses,o=n.focus,t=n.colors,u=l.clone(),u.valueExpression=F(r,i,r.classBreakInfos,i.classBreakInfos),H(u.uniqueValueInfos,s,o),t&&(d=f.createColors(t,t.length),u.uniqueValueInfos.forEach(function(e,n){return y.applyColorToSymbol(e.symbol,d[n])})),L(u,n),[2,u]}})})}function C(e){return i(this,void 0,void 0,function(){var n,r,i,l,o,t,d,m,p,c,h,v;return a(this,function(a){switch(a.label){case 0:return[4,b(e)];case 1:return n=a.sent(),r=n.layer,i=n.classificationMethod,l=n.field1,o=n.field2,t=n.numClasses,d=n.view,m={layer:r,classificationMethod:i,field:l.field,normalizationField:l.normalizationField,normalizationType:l.normalizationField?"field":null,minValue:l.minValue,maxValue:l.maxValue,analyzeData:!(null!=l.minValue&&null!=l.maxValue),numClasses:t,view:d},p={layer:r,classificationMethod:i,field:o.field,normalizationField:o.normalizationField,normalizationType:o.normalizationField?"field":null,minValue:o.minValue,maxValue:o.maxValue,analyzeData:!(null!=o.minValue&&null!=o.maxValue),numClasses:t,view:d},[4,u.all([f.getClassBreaks(m),f.getClassBreaks(p)])];case 2:if(c=a.sent(),h=c[0],v=c[1],!h||!v)throw new s("relationship-renderer:error","error when calculating class breaks");return[2,T(n,h.result,v.result)]}})})}Object.defineProperty(n,"__esModule",{value:!0});var k=["equal-interval","natural-breaks","quantile"],z=["HH","HL","LH","LL"],S={2:[["HL","HH"],["LL","LH"]],3:[["HL","HM","HH"],["ML","MM","MH"],["LL","LM","LH"]],4:[["HL","HM1","HM2","HH"],["M2L","M2M1","M2M2","M2H"],["M1L","M1M1","M1M2","M1H"],["LL","LM1","LM2","LH"]]},x={2:["L","H"],3:["L","M","H"],4:["L","M1","M2","H"]},E=function(e){return{minValue:e.minValue,maxValue:e.maxValue}};n.updateRenderer=V,n.createRenderer=C});