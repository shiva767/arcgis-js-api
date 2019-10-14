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

define(["require","exports","../../../../core/mathUtils","../../../../core/maybe","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4","../../../../core/libs/gl-matrix-2/vec4f64","../../../../geometry/support/aaBoundingBox","../../../../geometry/support/aaBoundingRect","../../../../geometry/support/centroid","../../../../geometry/support/coordsUtils","../../../../layers/graphics/dehydratedFeatures","../../support/projectionUtils"],function(e,t,r,n,i,o,a,l,u,c,s,m,f,v,d,h){function p(e,t){if("point"===e.type)return b(e,t,!1);if(d.isHydratedGeometry(e))switch(e.type){case"extent":return b(e.center,t,!1);case"polygon":return b(e.centroid,t,!1);case"polyline":return b(g(e),t,!0);case"mesh":return b(e.extent.center,t,!1)}else switch(e.type){case"extent":return b(y(e),t,!0);case"polygon":return b(x(e),t,!0);case"polyline":return b(g(e),t,!0)}}function g(e){var t=e.paths[0];if(!t||0===t.length)return null;var r=v.getPointOnPath(t,v.getPathLength(t)/2);return d.makeDehydratedPoint(r[0],r[1],r[2],e.spatialReference)}function y(e){var t=r.isFinite(e.zmin);return d.makeDehydratedPoint(.5*(e.xmax+e.xmin),.5*(e.ymax+e.ymin),t?.5*(e.zmax+e.zmin):void 0,e.spatialReference)}function x(e){var t=e.rings[0];if(!t||0===t.length)return null;var r=f.ringsCentroid(e.rings,e.hasZ);return d.makeDehydratedPoint(r[0],r[1],r[2],e.spatialReference)}function b(e,t,r){if(!t||!e)return e;var n=r?e:d.clonePoint(e);return h.pointToPoint(e,n,t)?n:null}function P(e,t,r){if(e){t||(t=m.create());var n=e,i=.5*n.width*(r-1),o=.5*n.height*(r-1);return n.width<1e-7*n.height?i+=o/20:n.height<1e-7*n.width&&(o+=i/20),u.vec4.set(t,n.xmin-i,n.ymin-o,n.xmax+i,n.ymax+o),t}return null}function V(e,t){for(var r=0;r<e.geometries.length;++r){var n=e.geometries[r].data,i=n.vertexAttributes.auxpos1;i&&i.data[3]!==t&&(i.data[3]=t,e.geometryVertexAttrsUpdated(r))}}function S(e,t){var r=c.vec4f64.clone(c.vec4f64.ONES);return n.isSome(e)&&(r[0]=e[0],r[1]=e[1],r[2]=e[2]),n.isSome(t)?r[3]=t:n.isSome(e)&&e.length>3&&(r[3]=e[3]),r}function A(e,t,r,n,i,o){void 0===o&&(o=[0,0,0,0]);for(var a=0;a<3;++a)e&&null!=e[a]?o[a]=e[a]:r&&null!=r[a]?o[a]=r[a]:o[a]=i[a];return o[3]=null!=t?t:null!=n?n:i[3],o}function R(e,t,r,n){void 0===e&&(e=l.vec3f64.ONES),void 0===n&&(n=1);var i=new Array(3);if(null==t||null==r)i[0]=1,i[1]=1,i[2]=1;else{for(var o=void 0,a=0,u=2;u>=0;u--){var c=e[u],s=void 0,m=null!=c,f=0===u&&!o&&!m,v=r[u];"symbolValue"===c||f?s=0!==v?t[u]/v:1:m&&"proportional"!==c&&isFinite(c)&&(s=0!==v?c/v:1),null!=s&&(i[u]=s,o=s,a=Math.max(a,Math.abs(s)))}for(var u=2;u>=0;u--)null==i[u]?i[u]=o:0===i[u]&&(i[u]=.001*a)}for(var u=2;u>=0;u--)i[u]/=n;return l.vec3f64.fromArray(i)}function w(e,t){var r=t.isPrimitive,n=t.width,i=t.depth,o=t.height,a=r?10:1;if(null==n&&null==o&&null==i)return[a*e[0],a*e[1],a*e[2]];for(var u,c=l.vec3f64.fromValues(n,i,o),s=0;s<3;s++){var m=c[s];if(null!=m){u=m/e[s];break}}for(var s=0;s<3;s++)null==c[s]&&(c[s]=e[s]*u);return c}function z(e){return null!=e.isPrimitive}function D(e){return z(e)&&(e=[e.width,e.depth,e.height]),M(e)?null:"Symbol sizes may not be negative values"}function M(e){if(Array.isArray(e)){for(var t=0,r=e;t<r.length;t++){if(!M(r[t]))return!1}return!0}return null==e||e>=0}function O(e,t,r,n){void 0===n&&(n=o.mat4f64.create());var a=e||0,l=t||0,u=r||0;return 0!==a&&i.mat4.rotateZ(n,n,-a/180*Math.PI),0!==l&&i.mat4.rotateX(n,n,l/180*Math.PI),0!==u&&i.mat4.rotateY(n,n,u/180*Math.PI),n}function B(e,t){return null!=t.minDemResolution?t.minDemResolution:s.isPoint(e)?t.minDemResolutionForPoints:.01*s.maximumDimension(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.computeCentroid=p,t.enlargeExtent=P,t.updateVertexAttributeAuxpos1w=V,t.mixinColorAndOpacity=S,t.overrideColor=A,t.computeObjectScale=R,t.computeSizeWithResourceSize=w,t.validateSymbolLayerSize=D,t.isValidSize=M,t.computeObjectRotation=O,t.demResolutionForBoundingBox=B,t.namedAnchorToHUDMaterialAnchorPos={"bottom-left":a.vec2f64.fromValues(0,0),bottom:a.vec2f64.fromValues(.5,0),"bottom-right":a.vec2f64.fromValues(1,0),left:a.vec2f64.fromValues(0,.5),center:a.vec2f64.fromValues(.5,.5),right:a.vec2f64.fromValues(1,.5),"top-left":a.vec2f64.fromValues(0,1),top:a.vec2f64.fromValues(.5,1),"top-right":a.vec2f64.fromValues(1,1)}});