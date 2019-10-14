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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","dojo/i18n!../../nls/smartMapping","../..","../../../pointCloudRenderers","../../../core/Error","../../../core/lang","../../../core/maybe","../../../core/promiseUtils","./support/utils","../heuristics/outline","../statistics/uniqueValues","../support/utils","../symbology/type","../../support/LegendOptions","../../support/utils"],function(e,r,t,l,n,a,o,i,s,u,c,d,p,m,y,f,v,b,h){function g(e){return n(this,void 0,void 0,function(){var r,n,a,o,i,c;return l(this,function(l){switch(l.label){case 0:if(!e||!e.layer||!e.field&&!e.valueExpression)throw new s("type-renderer:missing-parameters","'layer' and 'field' or 'valueExpression' parameters are required");if(e.valueExpression&&!e.view)throw new s("type-renderer:missing-parameters","View is required when 'valueExpression' is specified");if(r=t({},e),r.symbolType=r.symbolType||"2d",r.numTypes=null==r.numTypes?10:r.numTypes,r.defaultSymbolEnabled=null==r.defaultSymbolEnabled||r.defaultSymbolEnabled,r.sortBy=null==r.sortBy?"count":r.sortBy,r.sortEnabled=null==r.sortEnabled||r.sortEnabled,r.statistics=u.clone(r.statistics),n=[0,2,1,3],a=f.createLayerAdapter(r.layer,n),r.layer=a,!a)throw new s("type-renderer:invalid-parameters","'layer' must be one of these types: "+f.getLayerTypeLabels(n).join(", "));return[4,a.load()];case 1:if(l.sent(),o=a.geometryType,r.outlineOptimizationEnabled="polygon"===o&&r.outlineOptimizationEnabled,"mesh"===o)r.symbolType="3d-volumetric",r.colorMixMode=r.colorMixMode||"replace",r.edgesType=r.edgesType||"none";else{if("3d-volumetric-uniform"===r.symbolType&&"point"!==o)throw new s("type-renderer:not-supported","3d-volumetric-uniform symbols are supported for point layers only");if(r.symbolType.indexOf("3d-volumetric")>-1&&(!r.view||"3d"!==r.view.type))throw new s("type-renderer:invalid-parameters","'view' parameter should be an instance of SceneView when 'symbolType' parameter is '3d-volumetric' or '3d-volumetric-uniform'")}return[4,f.getFieldsList({field:r.field,valueExpression:r.valueExpression})];case 2:if(i=l.sent(),c=p.verifyBasicFieldValidity(a,i,"type-renderer:invalid-parameters"))throw c;return[2,r]}})})}function w(e){return n(this,void 0,void 0,function(){var r,n,a,o,i;return l(this,function(l){switch(l.label){case 0:if(!(e&&e.layer&&e.field))throw new s("type-point-cloud-class-renderer:missing-parameters","'layer' and 'field' parameters are required");if(r=t({},e),r.statistics=u.clone(r.statistics),n=[4],a=f.createLayerAdapter(r.layer,n),r.layer=a,r.density=r.density||25,r.size=r.size||"100%",!p.isValidPointSize(r.size))throw new s("type-point-cloud-class-renderer:invalid-parameters","Invalid 'size' parameter. It should be a string of the form '100%'");if(!a)throw new s("type-point-cloud-class-renderer:invalid-parameters","'layer' must be one of these types: "+f.getLayerTypeLabels(n).join(", "));return[4,a.load()];case 1:return l.sent(),[4,f.getFieldsList({field:r.field})];case 2:if(o=l.sent(),i=p.verifyBasicFieldValidity(a,o,"type-point-cloud-class-renderer:invalid-parameters"))throw i;return[2,r]}})})}function T(e){return n(this,void 0,void 0,function(){var r,t,n,a,o;return l(this,function(l){switch(l.label){case 0:return r=e.typeScheme,t=null,n=null,[4,p.getBasemapInfo(e.basemap,e.view)];case 1:return a=l.sent(),(t=c.isSome(a.basemapId)?a.basemapId:null,n=c.isSome(a.basemapTheme)?a.basemapTheme:null,r)?[2,{scheme:v.cloneScheme(r),basemapId:t,basemapTheme:n}]:(o=v.getSchemes({basemap:t,basemapTheme:n,geometryType:e.geometryType,theme:e.theme,worldScale:e.worldScale,view:e.view}),o&&(r=o.primaryScheme,t=o.basemapId,n=o.basemapTheme),[2,{scheme:r,basemapId:t,basemapTheme:n}])}})})}function S(e,r){return e.label<r.label?-1:e.label>r.label?1:0}function x(e,r){return e.value<r.value?-1:e.value>r.value?1:0}function E(e,r){var t=r.count-e.count;return 0===t&&(t=S(e,r)),t}function V(e,r){var t=r.count-e.count;return 0===t&&(t=x(e,r)),t}function I(e,r,t){var l;"count"===r?(l=V,t&&t.codedValues&&(l=E)):"value"===r&&(l=x,t&&t.codedValues&&(l=S)),l&&e.sort(l)}function M(e,r,i){return n(this,void 0,void 0,function(){var n,s,u,c,d,m,y,f,g,w,S,x,E,V,M,q,z,L,O,F,U,B,P,F;return l(this,function(l){switch(l.label){case 0:return n=e.uniqueValueInfos,s=r.layer,u=r.field,c=u?s.getField(u):null,d=c?s.getFieldDomain(c.name):null,m=-1===r.numTypes?n.length:r.numTypes,y=s.geometryType,[4,T({basemap:r.basemap,geometryType:y,typeScheme:r.typeScheme,worldScale:r.symbolType.indexOf("3d-volumetric")>-1,view:r.view})];case 1:for(f=l.sent(),g=f.scheme,w=new o.UniqueValueRenderer({field:u}),S=-1,E={value:null,domain:d,fieldInfo:c},n.forEach(function(e,r){E.value=e.value,e.label=h.createUniqueValueLabel(E),null===e.value&&(S=r)}),S>-1&&(x=n.splice(S,1)[0]),!1!==r.sortEnabled&&I(n,r.sortBy,d),c&&c.type===C&&(V=n.filter(function(e,r){return r<m}),M=V.map(function(e){return e.value}),E.dateFormatInterval=h.calculateDateFormatInterval(M)),q=i&&i.opacity,z=p.createColors(g.colors,n.length),L=p.getSymbolSizeFromScheme(g,y),O=p.getSymbolOutlineFromScheme(g,y,q),n.forEach(function(e,t){E.value=e.value,e.label=h.createUniqueValueLabel(E),e.symbol=p.createSymbol(y,{type:r.symbolType,color:z[t],size:L,outline:O,meshInfo:{colorMixMode:r.colorMixMode,edgesType:r.edgesType}})}),r.valueExpression&&(w.valueExpression=r.valueExpression,w.valueExpressionTitle=r.valueExpressionTitle),r.legendOptions&&(w.legendOptions=new b.LegendOptions(r.legendOptions)),z=p.createColors(g.colors,m),F=0;F<m;F++)(U=n[F])&&w.addUniqueValueInfo({value:U.value,label:U.label,symbol:p.createSymbol(y,{type:r.symbolType,color:z[F],size:L,outline:O,meshInfo:{colorMixMode:r.colorMixMode,edgesType:r.edgesType}})});if(r.defaultSymbolEnabled&&(w.defaultSymbol=p.createSymbol(y,{type:r.symbolType,color:g.noDataColor,size:L,outline:O,meshInfo:{colorMixMode:r.colorMixMode,edgesType:r.edgesType}}),w.defaultLabel=a.other),x&&(x.symbol=p.createSymbol(y,{type:r.symbolType,color:g.noDataColor,size:L,outline:O,meshInfo:{colorMixMode:r.colorMixMode,edgesType:r.edgesType}}),n.push(x)),B=[],P=w.uniqueValueInfos.length===n.length?-1:w.uniqueValueInfos.length,P>-1)for(F=P;F<n.length;F++)B.push(t({},n[F]));return i&&i.visualVariables&&i.visualVariables.length&&(w.visualVariables=i.visualVariables.map(function(e){return e.clone()})),[2,{renderer:w,uniqueValueInfos:n,excludedUniqueValueInfos:B,typeScheme:v.cloneScheme(g),basemapId:f.basemapId,basemapTheme:f.basemapTheme}]}})})}function q(e,r){return n(this,void 0,void 0,function(){var t,n,a,o,i;return l(this,function(l){switch(l.label){case 0:return t=e.uniqueValueInfos,[4,T({basemap:"gray",theme:"point-cloud-class",geometryType:"point",typeScheme:r})];case 1:return n=l.sent(),a=n&&n.scheme,o="point-cloud-class"===a.theme,i=o?a.colors:p.createColors(a.colors,t.length),I(t,"value"),[2,t.map(function(e,r){var t=e.value,l=null;return o?(l=i[t])||(l=i[i.length-1]):l=i[r],{values:[t],color:l,label:e.label}})]}})})}function z(e){return n(this,void 0,void 0,function(){var r,t,n,a,o,i;return l(this,function(l){switch(l.label){case 0:return[4,g(e)];case 1:return r=l.sent(),t={layer:r.layer,field:r.field,valueExpression:r.valueExpression,returnAllCodedValues:r.returnAllCodedValues,view:r.view},n={layer:r.layer,view:r.view},[4,d.all([null!=r.statistics?r.statistics:y(t),r.outlineOptimizationEnabled?m(n):null])];case 2:return a=l.sent(),o=a[0],i=a[1],[2,M(o,r,i)]}})})}function L(e){return n(this,void 0,void 0,function(){var r,t,n,a,o,s;return l(this,function(l){switch(l.label){case 0:return[4,w(e)];case 1:return r=l.sent(),null==r.statistics?[3,2]:(n=r.statistics,[3,4]);case 2:return[4,y({layer:r.layer,field:r.field})];case 3:n=l.sent(),l.label=4;case 4:return t=n,o=i.PointCloudUniqueValueRenderer.bind,s={field:r.field,pointsPerInch:r.density,pointSizeAlgorithm:p.getPointSizeAlgorithm(r.size)},[4,q(t,r.typeScheme)];case 5:return a=new(o.apply(i.PointCloudUniqueValueRenderer,[void 0,(s.colorUniqueValueInfos=l.sent(),s)])),[2,{renderer:a}]}})})}Object.defineProperty(r,"__esModule",{value:!0});var C="date";r.createRenderer=z,r.createPCClassRenderer=L});