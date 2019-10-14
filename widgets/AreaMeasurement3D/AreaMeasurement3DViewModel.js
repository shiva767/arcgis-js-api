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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Handles","../../core/Logger","../../core/unitUtils","../../core/watchUtils","../../core/accessorSupport/decorators","../../views/3d/interactive/measurementTools/areaMeasurement3D/AreaMeasurement3DTool","../support/commonProperties","../support/InteractiveToolViewModel"],function(e,t,r,n,i,o,s,l,a,u,p,d){var c=o.getLogger("esri.widgets.AreaMeasurement3D.AreaMeasurement3DViewModel");return function(e){function t(t){var r=e.call(this,t)||this;return r.supportedViewType="3d",r._handles=new i,r._userUnitOptions=null,r._userUnit=null,r.tool=null,r}return r(t,e),t.prototype.initialize=function(){var e=this;this._handles.add([l.init(this,"unit",function(t){e.tool&&(e.tool.unit=t)})])},Object.defineProperty(t.prototype,"state",{get:function(){return this.isDisabled?"disabled":this.tool.state},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"measurement",{get:function(){if(this.isDisabled)return null;var e=this.tool.model,t=e.measurementMode,r=e.measurementData,n=e.validMeasurement,i="euclidean"===t?r.intersectingSegments:r.geodesicIntersectingSegments,o=0===i.size,s=o?n?"available":"unavailable":"invalid";return{mode:t,area:{text:o&&n?e.areaLabel:null,state:s},perimeterLength:{text:o&&n?e.perimeterLengthLabel:null,state:s}}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"unitOptions",{get:function(){return this._filteredOrAllUnits(this._userUnitOptions)},set:function(e){this._userUnitOptions=e,this._set("unitOptions",this._filteredOrAllUnits(this._userUnitOptions))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"unit",{get:function(){return this._userUnit?(this._userUnit=this._findSelectableUnit(this._userUnit,this.defaultUnit),this._userUnit):this._findSelectableUnit(this.defaultUnit)},set:function(e){this._userUnit=e?this._findSelectableUnit(e,this._userUnit):null,this.notifyChange("unit")},enumerable:!0,configurable:!0}),t.prototype.newMeasurement=function(){this.tool&&this.tool.newMeasurement()},t.prototype.clearMeasurement=function(){this.tool&&this.tool.clearMeasurement()},t.prototype.createToolParams=function(){return{toolConstructor:u,constructorArguments:{unit:this.unit}}},t.prototype.logUnsupportedError=function(){c.error("AreaMeasurement3D widget is not implemented for MapView")},t.prototype.logError=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];c.error.apply(c,e)},t.prototype._findSelectableUnit=function(e,t){var r=this.unitOptions;return-1!==r.indexOf(e)?e:t?this._findSelectableUnit(t):r[0]},t.prototype._filteredOrAllUnits=function(e){if(!e)return s.measurementAreaUnits.slice();var t=e.filter(function(e){return-1!==s.measurementAreaUnits.indexOf(e)});return 0===t.length?s.measurementAreaUnits.slice():t},n([a.property({dependsOn:["view.ready","isDisabled","tool.state"],readOnly:!0})],t.prototype,"state",null),n([a.property({dependsOn:["view.ready","tool.area","tool.geodesicArea","tool.areaLabel","tool.perimeterLength","tool.geodesicPerimeterLength","tool.model.perimeterLengthLabel","tool.model.measurementMode","tool.model.measurementData"],readOnly:!0})],t.prototype,"measurement",null),n([a.property({constructOnly:!0})],t.prototype,"tool",void 0),n([a.property(p.defaultUnitPropertyMetadata)],t.prototype,"defaultUnit",void 0),n([a.property({dependsOn:["view.spatialReference"]})],t.prototype,"unitOptions",null),n([a.property({dependsOn:["unitOptions","defaultUnit"]})],t.prototype,"unit",null),n([a.property()],t.prototype,"clearMeasurement",null),t=n([a.subclass("esri.widgets.AreaMeasurement3D.AreaMeasurement3DViewModel")],t)}(a.declared(d))});