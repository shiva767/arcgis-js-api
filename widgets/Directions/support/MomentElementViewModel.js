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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../moment","../../../core/Accessor","../../../core/accessorSupport/decorators"],function(e,t,r,o,p,c,s){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.value=p(),t}return r(t,e),t.prototype.castValue=function(e){return p(e)},o([s.property()],t.prototype,"state",void 0),o([s.property()],t.prototype,"value",void 0),o([s.cast("value")],t.prototype,"castValue",null),t=o([s.subclass("esri.widgets.Directions.MomentElementViewModel")],t)}(s.declared(c))});