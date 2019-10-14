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

define(["require","exports","../../../core/tsSupport/assignHelper","dojo/i18n!../nls/SymbolStyler","../../../core/domUtils","../../../core/events","../../../core/maybe","../../../core/promiseUtils","../../../core/screenUtils","../../../symbols/support/Symbol3DOutline","../../../symbols/support/symbolLayerUtils"],function(e,t,r,n,i,o,u,l,c,s,f){function a(e,t){e[t]||(e[t]={})}function d(e,t){return e.indexOf(t)>-1}function h(e){return k(e)}function p(e){return e&&"icon"===e.type}function m(e){return e&&"object"===e.type}function y(e){return e&&"line"===e.type}function v(e){return e&&"path"===e.type}function b(e){return e&&"extrude"===e.type}function g(e){return e&&"fill"===e.type}function w(e){return e&&"text"===e.type}function x(e){return D(e,"simple-line","2d")}function z(e){return D(e,"simple-marker","2d")}function S(e){return D(e,"simple-fill","2d")}function O(e){return D(e,"picture-marker","2d")}function L(e){return D(e,"fill","2d")}function k(e){return d(e.type,"3d")}function C(e){return e.symbolLayers.getItemAt(0)}function P(e,t){return D(e,"marker",t)||D(e,"point",t)}function j(e){return h(e)&&b(C(e))}function U(e){return h(e)&&w(C(e))}function D(e,t,r){var n=e&&e.type,i=d(n,t);return r?i&&("3d"===r?k(e):!k(e)):i}function F(e,t){return D(e,"line",t)}function M(e,t){return D(e,"fill",t)}function N(e){return e&&"string"==typeof e.style}function T(e){return!h(e)&&(N(e)&&d(Ne,e.style))}function A(e){return h(e)?I(e):q(e)}function I(e){var t=C(e);if("outline"in t&&u.isSome(t.outline)){var r=t.outline,n=r.color,i=r.size;if(!p(t)||xe(t))return{color:u.unwrap(n),size:c.pt2px(i)}}if(y(t)||v(t)){var o=u.get(t,"material","color");return{color:u.unwrap(o),size:c.pt2px(t.size)}}return null}function q(e){return x(e)?{color:e.color,size:e.width}:L(e)||z(e)?{color:e.get("outline.color"),size:e.get("outline.width")}:null}function E(e,t){!isNaN(t)&&e&&(h(e)?R(e,t):_(e,t))}function R(e,t){var r=C(e);p(r)||g(r)?(a(r,"outline"),u.expect(r.outline).size=c.px2pt(t)):y(r)?(a(r,"size"),r.size=c.px2pt(t)):v(r)&&(a(r,"size"),r.size=t)}function _(e,t){x(e)?e.width=t:ae(e)&&(e.outline.width=t)}function B(e,t){t&&e&&!k(e)&&(t=A(e).color?t:"none",x(e)?e.style=t:ae(e)&&(e.outline.style=t))}function H(e,t){e&&!isNaN(t)&&(h(e)?V(e,t):G(e,t))}function V(e,t){var r=C(e);p(r)||w(r)?r.size=c.px2pt(t):m(r)?W(r,t):b(r)&&(r.size=t)}function W(e,t){var r=e.width,n=e.height,i=e.depth,o=Math.max(r,n,i),u=t/o;e.set({width:r*u,height:n*u,depth:i*u})}function G(e,t){var r=e.width,n=t;if(r!==n)if(O(e)){var i=e.url,o=ee({dimensions:e,targetDimension:"width",targetSize:n});if(e.height=o.height,e.width=o.width,!i||"http://"===i||!d(i,"http://")&&!d(i,"data:"))return;if(e.xoffset||e.yoffset){var u=e.width/r;e.xoffset=Math.round(e.xoffset*u),e.yoffset=Math.round(e.yoffset*u)}}else e.size=n}function J(e){if(!h(e))return z(e)?e.size:O(e)?K(e):void 0;var t=C(e);return p(t)||w(t)?c.pt2px(t.size):m(t)?K(t):b(t)?t.size:void 0}function K(e){return Math.max(e.width,e.height,e.depth)}function Q(e,t){h(e)?pe(e,{color:t}):e.color=t}function X(e){return h(e)?Y(e):Z(e)}function Y(e){var t=C(e);return t.get("water"===t.type?"color":"material.color")}function Z(e){return e.color}function $(e,t){if(h(e)){var r=C(e);return y(r)||v(r)?void pe(e,{color:t}):(a(r,"outline"),void(r.outline.color=t))}A(e).color=t}function ee(e){var t=e.dimensions,r="height"===e.targetDimension?"height":"width",n=e.targetSize;return"height"===r?{height:n,width:t.width/t.height*n}:{height:t.height/t.width*n,width:n}}function te(e){var t,r,n,u=l.create(function(i,u){n=document.createElement("img"),t=o.on(n,"load",function(){if(0===n.width&&0===n.height)return void u("image has both width and height of 0");i({width:n.width,height:n.height})}),r=o.on(n,"error",function(e){u("error ocurred while loading image")}),n.src=e});return u.catch(function(){}).then(function(){t.remove(),r.remove(),i.remove(n)}),u}function re(e){h(e.symbol)?ne(e):ie(e)}function ne(e){H(e.symbol,e.size)}function ie(e){H(e.symbol,e.size)}function oe(e){h(e.symbol)?ue(e):le(e)}function ue(e){Q(e.symbol,e.color)}function le(e){Q(e.symbol,e.color)}function ce(e){h(e.symbol)?se(e):fe(e)}function se(e){$(e.symbol,e.color),E(e.symbol,e.size)}function fe(e){$(e.symbol,e.color),B(e.symbol,e.pattern),E(e.symbol,e.size)}function ae(e){return e&&e.outline}function de(e){if(h(e))return!1;var t=void 0;return t=ae(e)?e.outline.color:e.color,he(t)}function he(e){return e&&e.r>246&&e.g>246&&e.b>246}function pe(e,t){var n=C(e);if(t.color)return"water"===n.type?void(n.color=t.color):void(n.material=r({},n.material,t));"water"!==n.type&&(n.material=void 0)}function me(e){S(e)&&"solid"!==e.style&&"none"!==e.style&&(e.style="solid")}function ye(e,t){return void 0===t&&(t=[]),h(e)?ge(e,t):be(e,t)}function ve(e){return d(["circle","square","diamond","triangle"],e.style)}function be(e,t){var r=e.type,n=["simple-marker","picture-marker"],i=["simple-marker","simple-fill"],o=["simple-marker","simple-line","simple-fill"],u=F(e),l=M(e);return{shape:{state:d(t,"shape")||u||l?"excluded":d(n,r)?"enabled":"disabled"},fill:{state:d(t,"fill")||u?"excluded":i[0]===r&&ve(e)||i[1]===r?"enabled":"disabled"},outline:{state:d(t,"outline")?"excluded":d(o,r)?"enabled":"disabled"}}}function ge(e,t){var r=C(e),n=r.type,i=["icon","object"],o=["icon","object","fill","water","extrude","text"],u=["icon","fill","line","path"];return{shape:{state:d(t,"shape")||!d(i,n)?"excluded":"enabled"},fill:{state:d(t,"fill")||!d(o,n)?"excluded":we(r)?"disabled":"enabled"},outline:{state:d(t,"outline")||!d(u,n)?"excluded":!p(r)||xe(r)||we(r)?"enabled":"disabled"}}}function we(e){return p(e)&&d(Ne,e.get("resource.primitive"))}function xe(e){return!!p(e)&&!e.get("resource.href")}function ze(e){if(h(e)){var t=C(e).type;if("extrude"===t||"object"===t)return"meters"}return"pixels"}function Se(e){if(h(e)){if("path"===C(e).type)return"meters"}return"pixels"}function Oe(e){if(h(e)){if(P(e)){var t=C(e);return m(t)?"web-style:volumetric":p(t)?"web-style:flat":"web-style"}return"web-style"}return"symbol-set"}function Le(e){var t=C(e).type;return"object"===t||"path"===t||"extrude"===t?"volumetric":"flat"}function ke(e){if(h(e)){var t=C(e);if(p(t)&&(t.outline||(t.outline=new s.Symbol3DOutline({color:void 0,size:0})),void 0===t.size))return f.computeLayerSize(t).then(function(r){return t.size=r[0],e});if(m(t)&&void 0===t.width&&void 0===t.height&&void 0===t.depth)return f.computeLayerSize(t).then(function(r){return t.set({width:r[0],height:r[1],depth:r[2]}),e})}return l.resolve(e)}function Ce(e,t){if(h(e)&&h(t)){var r=C(e),n=C(t);return p(r)&&m(n)&&!!r.resource.href&&!n.resource.href&&!!n.resource.primitive}return O(e)&&z(t)}function Pe(e,t){if(h(e)&&h(t)){var r=C(e),n=C(t);return p(r)&&p(n)&&!r.resource.href&&!n.resource.href&&!d(Ne,r.resource.primitive)&&d(Ne,n.resource.primitive)}return Ue(e,t)}function je(e,t){return h(e)&&h(t)?Pe(t,e):Ue(t,e)}function Ue(e,t){return z(e)&&z(t)&&!T(e)&&T(t)}function De(e){if(!h(e))return"";var t=C(e);if(!p(t)&&!m(t))return"";if(e.styleOrigin)return e.styleOrigin.name;if(!Me(t))return"";var r=t.get("resource.primitive");if(p(t))return n[r];if(m(t)){return{sphere:n.sphere,cylinder:n.cylinder,"tall-cylinder":n.tallCylinder,cube:n.cube,"tall-cube":n.tallCube,cone:n.cone,"tall-cone":n.tallCone,"inverted-cone":n.invertedCone,diamond:n.diamond,tetrahedron:n.tetrahedron}[Fe(t)?"tall-"+r:r]}}function Fe(e){var t=e.depth,r=e.height,n=e.width;return n&&t&&r&&n===t&&n<r}function Me(e){return!e.get("resource.href")&&!!e.get("resource.primitive")}Object.defineProperty(t,"__esModule",{value:!0});var Ne=["x","cross"];t.is3d=k,t.getSymbolLayer=C,t.isPoint=P,t.hasExtrudeSymbolLayer=j,t.hasTextSymbolLayer=U,t.isLine=F,t.isPolygon=M,t.hasPureOutlineStyle=T,t.getOutline=A,t.setOutlineWidth=E,t.setOutlineStyle=B,t.setSize=H,t.getMarkerLength=J,t.setFillColor=Q,t.getFillColor=X,t.setOutlineColor=$,t.preserveAspectRatio=ee,t.testImageUrl=te,t.updateShape=re,t.updateFill=oe,t.updateOutline=ce,t.blendsIntoBackground=de,t.updateSymbol3DLayerColor=pe,t.ensureSupportedSimpleFillSymbolStyle=me,t.getApplicableTabs=ye,t.getSizeUnit=ze,t.getOutlineUnit=Se,t.getSymbolSource=Oe,t.getDimensionality=Le,t.ensureProps=ke,t.switchedFromRasterToVectorSymbol=Ce,t.switchedToPureOutline=Pe,t.switchedFromPureOutline=je,t.switchedSmsStyleToPureOutline=Ue,t.getSymbolName=De});