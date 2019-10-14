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

define(["../core/lang","../core/jsonMap","../core/accessorSupport/ensureType","../geometry/Extent","../geometry/Multipoint","../geometry/Polyline","../geometry/Polygon","../geometry/support/jsonUtils","../request","./Task","./support/ProjectParameters"],function(e,t,r,n,i,s,o,a,u,N,p){var f=new t.JSONMap({MGRS:"mgrs",USNG:"usng",UTM:"utm",GeoRef:"geo-ref",GARS:"gars",DMS:"dms",DDM:"ddm",DD:"dd"}),_=r.ensureType(p),O=N.createSubclass({declaredClass:"esri.tasks.GeometryService",areasAndLengths:function(t,r){var n=e.mixin({},this.parsedUrl.query,{f:"json"},t.toJSON()),i={query:n};return(this.requestOptions||r)&&(i=e.mixin({},this.requestOptions,r,i)),u(this.parsedUrl.path+"/areasAndLengths",i).then(function(e){return e.data})},autoComplete:function(t,r,n){var i=t[0].spatialReference,s=e.mixin({},this.parsedUrl.query,{f:"json",sr:JSON.stringify(i.toJSON()),polygons:JSON.stringify(this._encodeGeometries(t).geometries),polylines:JSON.stringify(this._encodeGeometries(r).geometries)}),a={query:s};return(this.requestOptions||n)&&(a=e.mixin({},this.requestOptions,n,a)),u(this.parsedUrl.path+"/autoComplete",a).then(function(e){return(e.data.geometries||[]).map(function(e){return new o({spatialReference:i,rings:e.rings})})})},buffer:function(t,r){var n=e.mixin({},this.parsedUrl.query,{f:"json"},t.toJSON()),i=t.outSpatialReference||t.geometries[0].spatialReference,s={query:n};return(this.requestOptions||r)&&(s=e.mixin({},this.requestOptions,r,s)),u(this.parsedUrl.path+"/buffer",s).then(function(e){return(e.data.geometries||[]).map(function(e){return new o({spatialReference:i,rings:e.rings})})})},cut:function(t,r,n){var i=t[0].spatialReference,s=t.map(function(e){return e.toJSON()}),o=e.mixin({},this.parsedUrl.query,{f:"json",sr:JSON.stringify(i.toJSON()),target:JSON.stringify({geometryType:a.getJsonType(t[0]),geometries:s}),cutter:JSON.stringify(r.toJSON())}),N={query:o};return(this.requestOptions||n)&&(N=e.mixin({},this.requestOptions,n,N)),u(this.parsedUrl.path+"/cut",N).then(function(e){var t=e.data,r=t.geometries||[];return{cutIndexes:t.cutIndexes,geometries:r.map(function(e){return a.fromJSON(e).set("spatialReference",i)})}})},convexHull:function(t,r){var n=t[0].spatialReference,i=e.mixin({},this.parsedUrl.query,{f:"json",sr:JSON.stringify(n.toJSON()),geometries:JSON.stringify(this._encodeGeometries(t))}),s={query:i};return(this.requestOptions||r)&&(s=e.mixin({},this.requestOptions,r,s)),u(this.parsedUrl.path+"/convexHull",s).then(function(e){return a.fromJSON(e.data.geometry).set("spatialReference",n)})},densify:function(t,r){var n=e.mixin({},this.parsedUrl.query,{f:"json"},t.toJSON()),i=t.geometries[0].spatialReference,s={query:n};return(this.requestOptions||r)&&(s=e.mixin({},this.requestOptions,r,s)),u(this.parsedUrl.path+"/densify",s).then(function(e){return(e.data.geometries||[]).map(function(e){return a.fromJSON(e).set("spatialReference",i)})})},difference:function(t,r,n){var i=t[0].spatialReference,s=e.mixin({},this.parsedUrl.query,{f:"json",sr:JSON.stringify(i.toJSON()),geometries:JSON.stringify(this._encodeGeometries(t)),geometry:JSON.stringify({geometryType:a.getJsonType(r),geometry:r.toJSON()})}),o={query:s};return(this.requestOptions||n)&&(o=e.mixin({},this.requestOptions,n,o)),u(this.parsedUrl.path+"/difference",o).then(function(e){return(e.data.geometries||[]).map(function(e){return a.fromJSON(e).set("spatialReference",i)})})},distance:function(t,r){var n=e.mixin({},this.parsedUrl.query,{f:"json"},t.toJSON()),i={query:n};return(this.requestOptions||r)&&(i=e.mixin({},this.requestOptions,r,i)),u(this.parsedUrl.path+"/distance",i).then(this._handleDistanceResponse)},fromGeoCoordinateString:function(t,r){var n={};null!=t.sr&&"object"==typeof t.sr?n.sr=t.sr.wkid||JSON.stringify(t.sr):n.sr=t.sr,n.strings=JSON.stringify(t.strings);var i=t.conversionType||"mgrs";n.conversionType=f.toJSON(i),n.conversionMode=t.conversionMode;var s=e.mixin({},this.parsedUrl.query,{f:"json"},n),o={query:s};return(this.requestOptions||r)&&(o=e.mixin({},this.requestOptions,r,o)),u(this.parsedUrl.path+"/fromGeoCoordinateString",o).then(this._handleFromGeoCoordinateResponse)},generalize:function(t,r){var n=e.mixin({},this.parsedUrl.query,{f:"json"},t.toJSON()),i=t.geometries[0].spatialReference,s={query:n};return(this.requestOptions||r)&&(s=e.mixin({},this.requestOptions,r,s)),u(this.parsedUrl.path+"/generalize",s).then(function(e){return(e.data.geometries||[]).map(function(e){return a.fromJSON(e).set("spatialReference",i)})})},intersect:function(t,r,n){var i=t[0].spatialReference,s=e.mixin({},this.parsedUrl.query,{f:"json",sr:JSON.stringify(i.toJSON()),geometries:JSON.stringify(this._encodeGeometries(t)),geometry:JSON.stringify({geometryType:a.getJsonType(r),geometry:r.toJSON()})}),o={query:s};return(this.requestOptions||n)&&(o=e.mixin({},this.requestOptions,n,o)),u(this.parsedUrl.path+"/intersect",o).then(function(e){return(e.data.geometries||[]).map(function(e){return a.fromJSON(e).set("spatialReference",i)})})},lengths:function(t,r){var n=e.mixin({},this.parsedUrl.query,{f:"json"},t.toJSON()),i={query:n};return(this.requestOptions||r)&&(i=e.mixin({},this.requestOptions,r,i)),u(this.parsedUrl.path+"/lengths",i).then(function(e){return e.data})},labelPoints:function(t,r){var n=t.map(function(e){return e.toJSON()}),i=t[0].spatialReference,s=e.mixin({},this.parsedUrl.query,{f:"json",sr:i.wkid?i.wkid:JSON.stringify(i.toJSON()),polygons:JSON.stringify(n)}),o={query:s};return(this.requestOptions||r)&&(o=e.mixin({},this.requestOptions,r,o)),u(this.parsedUrl.path+"/labelPoints",o).then(function(e){return(e.data.labelPoints||[]).map(function(e){return a.fromJSON(e).set("spatialReference",i)})})},offset:function(t,r){var n=e.mixin({},this.parsedUrl.query,{f:"json"},t.toJSON()),i=t.geometries[0].spatialReference,s={query:n};return(this.requestOptions||r)&&(s=e.mixin({},this.requestOptions,r,s)),u(this.parsedUrl.path+"/offset",s).then(function(e){return(e.data.geometries||[]).map(function(e){return a.fromJSON(e).set("spatialReference",i)})})},project:function(t,r){t=_(t);var n=e.mixin({},t.toJSON(),this.parsedUrl.query,{f:"json"}),i=t.outSpatialReference,s=a.getJsonType(t.geometries[0]),o=this._decodeGeometries,N={query:n};return(this.requestOptions||r)&&(N=e.mixin({},this.requestOptions,r,N)),u(this.parsedUrl.path+"/project",N).then(function(e){return o(e.data,s,i)})},relation:function(t,r){var n=e.mixin({},this.parsedUrl.query,{f:"json"},t.toJSON()),i={query:n};return(this.requestOptions||r)&&(i=e.mixin({},this.requestOptions,r,i)),u(this.parsedUrl.path+"/relation",i).then(this._handleRelationResponse)},reshape:function(t,r,n){var i=t.spatialReference,s=e.mixin({},this.parsedUrl.query,{f:"json",sr:JSON.stringify(i.toJSON()),target:JSON.stringify({geometryType:a.getJsonType(t),geometry:t.toJSON()}),reshaper:JSON.stringify(r.toJSON())}),o={query:s};return(this.requestOptions||n)&&(o=e.mixin({},this.requestOptions,n,o)),u(this.parsedUrl.path+"/reshape",o).then(function(e){return a.fromJSON(e.data.geometry).set("spatialReference",i)})},simplify:function(t,r){var n=t[0].spatialReference,i=e.mixin({},this.parsedUrl.query,{f:"json",sr:n.wkid?n.wkid:JSON.stringify(n.toJSON()),geometries:JSON.stringify(this._encodeGeometries(t))}),s=a.getJsonType(t[0]),o=this._decodeGeometries,N={query:i};return(this.requestOptions||r)&&(N=e.mixin({},this.requestOptions,r,N)),u(this.parsedUrl.path+"/simplify",N).then(function(e){return o(e.data,s,n)})},toGeoCoordinateString:function(t,r){var n={};null!=t.sr&&"object"==typeof t.sr?n.sr=t.sr.wkid||JSON.stringify(t.sr):n.sr=t.sr,n.coordinates=JSON.stringify(t.coordinates);var i=t.conversionType||"mgrs";n.conversionType=f.toJSON(i),n.conversionMode=t.conversionMode,n.numOfDigits=t.numOfDigits,n.rounding=t.rounding,n.addSpaces=t.addSpaces;var s=e.mixin({},this.parsedUrl.query,{f:"json"},n),o={query:s};return(this.requestOptions||r)&&(o=e.mixin({},this.requestOptions,r,o)),u(this.parsedUrl.path+"/toGeoCoordinateString",o).then(this._handleToGeoCoordinateResponse)},trimExtend:function(t,r){var n=e.mixin({},this.parsedUrl.query,{f:"json"},t.toJSON()),i=t.sr,o={query:n};return(this.requestOptions||r)&&(o=e.mixin({},this.requestOptions,r,o)),u(this.parsedUrl.path+"/trimExtend",o).then(function(e){return(e.data.geometries||[]).map(function(e){return new s({spatialReference:i,paths:e.paths})})})},union:function(t,r){var n=t[0].spatialReference,i=e.mixin({},this.parsedUrl.query,{f:"json",sr:JSON.stringify(n.toJSON()),geometries:JSON.stringify(this._encodeGeometries(t))}),s={query:i};return(this.requestOptions||r)&&(s=e.mixin({},this.requestOptions,r,s)),u(this.parsedUrl.path+"/union",s).then(function(e){return a.fromJSON(e.data.geometry).set("spatialReference",n)})},_handleRelationResponse:function(e){return e.data.relations},_handleDistanceResponse:function(e){return(e=e.data)&&e.distance},_handleToGeoCoordinateResponse:function(e){return e.data.strings},_handleFromGeoCoordinateResponse:function(e){return e.data.coordinates},_encodeGeometries:function(e){var t,r=[],n=e.length;for(t=0;t<n;t++)r.push(e[t].toJSON());return{geometryType:a.getJsonType(e[0]),geometries:r}},_decodeGeometries:function(t,r,n){var i=a.getGeometryType(r),s=t.geometries,o=[],u={spatialReference:n.toJSON()},N=e.mixin;return s.forEach(function(e,t){o[t]=new i(N(e,u))}),o},_toProjectGeometry:function(e){var t=e.spatialReference.toJSON();return e instanceof n?new o({rings:[[[e.xmin,e.ymin],[e.xmin,e.ymax],[e.xmax,e.ymax],[e.xmax,e.ymin],[e.xmin,e.ymin]]],spatialReference:t}):new s({paths:[[].concat(e.points)],spatialReference:t})},_fromProjectedGeometry:function(e,t,r){if("extent"===t){var s=e.rings[0];return new n(s[0][0],s[0][1],s[2][0],s[2][1],r)}return new i({points:e.paths[0],spatialReference:r.toJSON()})}});return e.mixin(O,{UNIT_METER:9001,UNIT_GERMAN_METER:9031,UNIT_FOOT:9002,UNIT_SURVEY_FOOT:9003,UNIT_CLARKE_FOOT:9005,UNIT_FATHOM:9014,UNIT_NAUTICAL_MILE:9030,UNIT_SURVEY_CHAIN:9033,UNIT_SURVEY_LINK:9034,UNIT_SURVEY_MILE:9035,UNIT_KILOMETER:9036,UNIT_CLARKE_YARD:9037,UNIT_CLARKE_CHAIN:9038,UNIT_CLARKE_LINK:9039,UNIT_SEARS_YARD:9040,UNIT_SEARS_FOOT:9041,UNIT_SEARS_CHAIN:9042,UNIT_SEARS_LINK:9043,UNIT_BENOIT_1895A_YARD:9050,UNIT_BENOIT_1895A_FOOT:9051,UNIT_BENOIT_1895A_CHAIN:9052,UNIT_BENOIT_1895A_LINK:9053,UNIT_BENOIT_1895B_YARD:9060,UNIT_BENOIT_1895B_FOOT:9061,UNIT_BENOIT_1895B_CHAIN:9062,UNIT_BENOIT_1895B_LINK:9063,UNIT_INDIAN_FOOT:9080,UNIT_INDIAN_1937_FOOT:9081,UNIT_INDIAN_1962_FOOT:9082,UNIT_INDIAN_1975_FOOT:9083,UNIT_INDIAN_YARD:9084,UNIT_INDIAN_1937_YARD:9085,UNIT_INDIAN_1962_YARD:9086,UNIT_INDIAN_1975_YARD:9087,UNIT_FOOT_1865:9070,UNIT_RADIAN:9101,UNIT_DEGREE:9102,UNIT_ARCMINUTE:9103,UNIT_ARCSECOND:9104,UNIT_GRAD:9105,UNIT_GON:9106,UNIT_MICRORADIAN:9109,UNIT_ARCMINUTE_CENTESIMAL:9112,UNIT_ARCSECOND_CENTESIMAL:9113,UNIT_MIL6400:9114,UNIT_BRITISH_1936_FOOT:9095,UNIT_GOLDCOAST_FOOT:9094,UNIT_INTERNATIONAL_CHAIN:109003,UNIT_INTERNATIONAL_LINK:109004,UNIT_INTERNATIONAL_YARD:109001,UNIT_STATUTE_MILE:9093,UNIT_SURVEY_YARD:109002,UNIT_50KILOMETER_LENGTH:109030,UNIT_150KILOMETER_LENGTH:109031,UNIT_DECIMETER:109005,UNIT_CENTIMETER:109006,UNIT_MILLIMETER:109007,UNIT_INTERNATIONAL_INCH:109008,UNIT_US_SURVEY_INCH:109009,UNIT_INTERNATIONAL_ROD:109010,UNIT_US_SURVEY_ROD:109011,UNIT_US_NAUTICAL_MILE:109012,UNIT_UK_NAUTICAL_MILE:109013,UNIT_SQUARE_INCHES:"esriSquareInches",UNIT_SQUARE_FEET:"esriSquareFeet",UNIT_SQUARE_YARDS:"esriSquareYards",UNIT_ACRES:"esriAcres",UNIT_SQUARE_MILES:"esriSquareMiles",UNIT_SQUARE_MILLIMETERS:"esriSquareMillimeters",UNIT_SQUARE_CENTIMETERS:"esriSquareCentimeters",UNIT_SQUARE_DECIMETERS:"esriSquareDecimeters",UNIT_SQUARE_METERS:"esriSquareMeters",UNIT_ARES:"esriAres",UNIT_HECTARES:"esriHectares",UNIT_SQUARE_KILOMETERS:"esriSquareKilometers"}),O});