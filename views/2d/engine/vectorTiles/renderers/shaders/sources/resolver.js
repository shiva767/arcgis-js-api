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

define(["require","exports","../../../../../../webgl","./shaderRepository"],function(e,r,n,o){function t(e){var r=o;return e.split("/").forEach(function(e){r&&(r=r[e])}),r}function u(e){return i.resolveIncludes(e)}Object.defineProperty(r,"__esModule",{value:!0});var i=new n.ShaderCompiler(t);r.resolveIncludes=u});