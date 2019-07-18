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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../../geometry","../../Graphic","../../core/compilerUtils","../../core/lang","../../core/maybe","../../core/typedArrayUtil","../../geometry/SpatialReference","../../geometry/support/aaBoundingBox","../../geometry/support/aaBoundingRect","../../geometry/support/jsonUtils","../../geometry/support/quantizationUtils","../support/Field","./dehydratedFeatureComparison"],function(e,t,r,a,n,i,s,o,l,u,h,c,p,m,y){function f(e){return s.isSome(e.geometry)}function d(e){return r.isFeatureGeometryType(e.type)}function g(e){return"point"===e.type}function x(e){var t=r.featureGeometryTypeKebabDictionary.fromJSON(e.geometryType),a=l.fromJSON(e.spatialReference),i=e.transform,s=e.features.map(function(r){var s=b(r,t,a,e.objectIdFieldName),o=s.geometry;if(o&&i)switch(o.type){case"point":s.geometry=p.hydratePoint(i,o,o,o.hasZ,o.hasM);break;case"multipoint":s.geometry=p.hydrateMultipoint(i,o,o,o.hasZ,o.hasM);break;case"polygon":s.geometry=p.hydratePolygon(i,o,o,o.hasZ,o.hasM);break;case"polyline":s.geometry=p.hydratePolyline(i,o,o,o.hasZ,o.hasM);break;default:n.neverReached(o)}return s});return{geometryType:t,features:s,spatialReference:a,fields:e.fields?e.fields.map(function(e){return m.fromJSON(e)}):null,objectIdFieldName:e.objectIdFieldName,globalIdFieldName:e.globalIdFieldName,geohashFieldName:e.geohashFieldName,geometryProperties:e.geometryProperties,hasZ:e.hasZ,hasM:e.hasM,exceededTransferLimit:e.exceededTransferLimit,transform:null}}function b(e,t,r,n){return{uid:a.generateUID(),objectId:n&&e.attributes?e.attributes[n]:null,attributes:e.attributes,geometry:v(e.geometry,t,r),visible:!0}}function v(e,t,r){if(!e)return null;switch(t){case"point":var a=e,n={x:a.x,y:a.y,z:a.z,m:a.m,hasZ:null!=a.z,hasM:null!=a.m,type:"point",spatialReference:r};return n;case"polyline":var i=e,n={paths:i.paths,hasZ:!!i.hasZ,hasM:!!i.hasM,type:"polyline",spatialReference:r};return n;case"polygon":var s=e,n={rings:s.rings,hasZ:!!s.hasZ,hasM:!!s.hasM,type:"polygon",spatialReference:r};return n;case"multipoint":var o=e,n={points:o.points,hasZ:!!o.hasZ,hasM:!!o.hasM,type:"multipoint",spatialReference:r};return n}}function Z(e,t,r,a){return{x:e,y:t,z:r,hasZ:null!=r,hasM:!1,spatialReference:a,type:"point"}}function M(e){return"declaredClass"in e}function R(e){return"declaredClass"in e}function N(e){return"declaredClass"in e}function A(e,t){if(!e||N(e))return e;var r=new a({layer:t,sourceLayer:t});return r.visible=e.visible,r.symbol=i.clone(e.symbol),r.attributes=i.clone(e.attributes),r.geometry=z(e.geometry),r}function z(e){return s.isNone(e)?null:M(e)?e:c.fromJSON(j(e))}function F(e,t){if(!e)return null;var r;if(R(e)){if(null==t)return e.clone();if(R(t))return t.copy(e)}return null!=t?(r=t,r.x=e.x,r.y=e.y,r.spatialReference=e.spatialReference,e.hasZ?(r.z=e.z,r.hasZ=e.hasZ):(r.z=null,r.hasZ=!1),e.hasM?(r.m=e.m,r.hasM=!0):(r.m=null,r.hasM=!1)):(r=Z(e.x,e.y,e.z,e.spatialReference),e.hasM&&(r.m=e.m,r.hasM=!0)),r}function k(e){for(var t=32,r=0,a=Object.keys(e.attributes);r<a.length;r++){var n=a[r];t+=n.length;var i=e.attributes[n];switch(typeof i){case"string":t+=i.length;break;default:case"number":t+=8}}return t+12*(s.isSome(e.geometry)?"mesh"===e.geometry.type?0:I(e.geometry):0)}function I(e){if(s.isNone(e))return 0;switch(e.type){case"point":return 1;case"polyline":for(var t=0,r=0,a=e.paths;r<a.length;r++){t+=a[r].length}return t;case"polygon":for(var t=0,i=0,o=e.rings;i<o.length;i++){t+=o[i].length}return t;case"multipoint":return e.points.length;case"extent":return 2;case"mesh":var l=e.vertexAttributes&&e.vertexAttributes.position;return l?l.length/3:0;default:n.neverReached(e)}}function S(e){if(!e)return!1;switch(e.type){case"extent":case"point":return!0;case"polyline":for(var t=0,r=e.paths;t<r.length;t++){if(r[t].length>0)return!0}return!1;case"polygon":for(var a=0,i=e.rings;a<i.length;a++){if(i[a].length>0)return!0}return!1;case"multipoint":return e.points.length>0;case"mesh":return e.vertexAttributes&&e.vertexAttributes.position&&e.vertexAttributes.position.length>0;default:n.neverReached(e)}}function j(e){var t=e.spatialReference.toJSON();switch(e.type){case"point":return{x:e.x,y:e.y,z:e.z,m:e.m,spatialReference:t};case"polygon":var r=e.rings,a=e.hasZ,i=e.hasM;return{rings:P(r),hasZ:a,hasM:i,spatialReference:t};case"polyline":var s=e.paths,a=e.hasZ,i=e.hasM;return{paths:P(s),hasZ:a,hasM:i,spatialReference:t};case"extent":var o=e.xmin,l=e.xmax,u=e.ymin,h=e.ymax,c=e.zmin,p=e.zmax,m=e.mmin,y=e.mmax,a=e.hasZ,i=e.hasM;return{xmin:o,xmax:l,ymin:u,ymax:h,zmin:c,zmax:p,mmin:m,mmax:y,hasZ:a,hasM:i,spatialReference:t};case"multipoint":var f=e.points,a=e.hasZ,i=e.hasM;return{points:w(f)?G(f):f,hasZ:a,hasM:i,spatialReference:t};default:n.neverReached(e)}}function P(e){return O(e)?e.map(function(e){return G(e)}):e}function G(e){return e.map(function(e){return o.toArray(e)})}function O(e){for(var t=0,r=e;t<r.length;t++){var a=r[t];if(0!==a.length)return w(a)}return!1}function w(e){return e.length&&(o.isFloat32Array(e[0])||o.isFloat64Array(e[0]))}function B(e,t){switch(u.empty(t),"mesh"===e.type&&(e=e.extent),e.type){case"point":t[0]=t[3]=e.x,t[1]=t[4]=e.y,e.hasZ&&(t[2]=t[5]=e.z);break;case"polyline":for(var r=0;r<e.paths.length;r++)u.expandWithNestedArray(t,e.paths[r],e.hasZ);break;case"polygon":for(var r=0;r<e.rings.length;r++)u.expandWithNestedArray(t,e.rings[r],e.hasZ);break;case"multipoint":u.expandWithNestedArray(t,e.points,e.hasZ);break;case"extent":t[0]=e.xmin,t[1]=e.ymin,t[3]=e.xmax,t[4]=e.ymax,null!=e.zmin&&(t[2]=e.zmin),null!=e.zmax&&(t[5]=e.zmax);break;default:n.neverReached(e)}}function T(e,t){B(e,q),u.expand(t,q)}function J(e,t){switch(h.empty(t),"mesh"===e.type&&(e=e.extent),e.type){case"point":t[0]=t[2]=e.x,t[1]=t[3]=e.y;break;case"polyline":for(var r=0;r<e.paths.length;r++)h.expandWithNestedArray(t,e.paths[r]);break;case"polygon":for(var r=0;r<e.rings.length;r++)h.expandWithNestedArray(t,e.rings[r]);break;case"multipoint":h.expandWithNestedArray(t,e.points);break;case"extent":t[0]=e.xmin,t[1]=e.ymin,t[2]=e.xmax,t[3]=e.ymax;break;default:n.neverReached(e)}}function C(e,t){J(e,L),h.expand(t,L)}function W(e,t){return null!=e.objectId?e.objectId:e.attributes&&t?e.attributes[t]:null}Object.defineProperty(t,"__esModule",{value:!0}),t.equals=y.equals;var D=function(){function e(e,t,r){this.uid=e,this.geometry=t,this.attributes=r,this.visible=!0,this.objectId=null,this.centroid=null}return e}();t.DehydratedFeatureClass=D,t.hasGeometry=f,t.isFeatureGeometry=d;var U=function(){function e(){this.exceededTransferLimit=!1,this.features=[],this.fields=[],this.hasM=!1,this.hasZ=!1,this.geometryType=null,this.objectIdFieldName=null,this.globalIdFieldName=null,this.geometryProperties=null,this.geohashFieldName=null,this.spatialReference=null,this.transform=null}return e}();t.DehydratedFeatureSetClass=U,t.isPoint=g,t.fromFeatureSetJSON=x,t.fromJSONGeometry=v,t.makeDehydratedPoint=Z,t.isHydratedGeometry=M,t.isHydratedPoint=R,t.isHydratedGraphic=N,t.hydrateGraphic=A,t.hydrateGeometry=z,t.clonePoint=F,t.estimateSize=k,t.numVertices=I,t.hasVertices=S,t.computeAABB=B,t.expandAABB=T,t.computeAABR=J,t.expandAABR=C,t.getObjectId=W;var q=u.create(),L=h.create()});