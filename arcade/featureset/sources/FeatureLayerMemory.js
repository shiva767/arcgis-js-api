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

define(["require","exports","../../../core/tsSupport/extendsHelper","../../../Graphic","../support/FeatureSet","../support/IdSet","../support/shared","../support/sqlUtils","../../../core/promiseUtils","../../../geometry/Geometry","../../../layers/FeatureLayer","../../../layers/support/Field","../../../tasks/support/Query"],function(e,t,r,i,a,s,n,o,l,u,p,c,h){return function(e){function t(t){var r=e.call(this,t)||this;return r.declaredClass="esri.arcade.featureset.sources.FeatureLayerMemory",r._removeGeometry=!1,r._overrideFields=null,r._forceIsTable=!1,t.spatialReference&&(r.spatialReference=t.spatialReference),r._transparent=!0,r._maxProcessing=1e3,r._layer=t.layer,r._wset=null,!0===t.isTable&&(r._forceIsTable=!0),void 0!==t.outFields&&(r._overrideFields=t.outFields),void 0!==t.includeGeometry&&(r._removeGeometry=!1===t.includeGeometry),r}return r(t,e),t.prototype._maxQueryRate=function(){return n.defaultMaxRecords},t.prototype.end=function(){return this._layer},t.prototype.optimisePagingFeatureQueries=function(e){},t.prototype.load=function(){var e=this;return null===this._loadPromise&&(this._loadPromise=l.create(function(t,r){if(!0===e._layer.loaded)return e._initialiseFeatureSet(),void t(e);e._layer.when().then(function(){try{e._initialiseFeatureSet(),t(e)}catch(e){r(e)}},r),e._layer.load()})),this._loadPromise},t.prototype._initialiseFeatureSet=function(){if(null==this.spatialReference&&(this.spatialReference=this._layer.spatialReference),this.geometryType=this._layer.geometryType,this.fields=this._layer.fields.slice(0),this._layer.outFields)if(1===this._layer.outFields.length&&"*"===this._layer.outFields[0]);else{for(var e=[],t=0,r=this.fields;t<r.length;t++){var i=r[t];if("oid"===i.type)e.push(i);else for(var a=0,s=this._layer.outFields;a<s.length;a++){var o=s[a];if(o.toLowerCase()===i.name.toLowerCase()){e.push(i);break}}}this.fields=e}else;if(null!==this._overrideFields)if(1===this._overrideFields.length&&"*"===this._overrideFields[0])this._overrideFields=null;else{for(var e=[],l=[],u=0,p=this.fields;u<p.length;u++){var i=p[u];if("oid"===i.type)e.push(i),l.push(i.name);else for(var c=0,h=this._overrideFields;c<h.length;c++){var o=h[c];if(o.toLowerCase()===i.name.toLowerCase()){e.push(i),l.push(i.name);break}}}this.fields=e,this._overrideFields=l}this.objectIdField=this._layer.objectIdField,this.hasM=this._layer.supportsM,this.hasZ=this._layer.supportsZ,this._databaseType=n.FeatureServiceDatabaseType.Standardised,this.typeIdField=this._layer.typeIdField,this.types=this._layer.types},t.prototype.isTable=function(){return this._forceIsTable||this._layer.isTable||"table"===this._layer.type||!this._layer.geometryType},t.prototype._isInFeatureSet=function(e){return n.IdState.InFeatureSet},t.prototype._transformSetWithIdChanges=function(e){},t.prototype._candidateIdTransform=function(e){return e},t.prototype._getSet=function(e){var t=this;return null===this._wset?this._ensureLoaded().then(function(){return t._getFilteredSet("",null,null,null,e)}).then(function(e){return t._wset=e,e}):l.resolve(this._wset)},t.prototype._changeFeature=function(e){for(var t={},r=0,a=this.fields;r<a.length;r++){var s=a[r];t[s.name]=e.attributes[s.name]}return new i({geometry:!0===this._removeGeometry?null:e.geometry,attributes:t})},t.prototype._getFilteredSet=function(e,t,r,i,a){var u=this,p="",c=!1;if(null!==i&&(p=i.constructClause(),c=!0),this.isTable()&&t&&null!==e&&""!==e){var f=new s([],[],!0,null);return l.resolve(f)}var y=new h;return y.where=null===r?null===t?"1=1":"":o.toWhereClause(r,n.FeatureServiceDatabaseType.Standardised),y.spatialRelationship=this._makeRelationshipEnum(e),y.outSpatialReference=this.spatialReference,y.orderByFields=""!==p?p.split(","):null,y.geometry=null===t?null:t,y.returnGeometry=!0,y.relationParameter=this._makeRelationshipParam(e),this._layer.queryFeatures(y).then(function(e){if(null===e)return new s([],[],c,null);u._checkCancelled(a);var t=[];return e.features.forEach(function(e){var r=e.attributes[u._layer.objectIdField];t.push(r),u._featureCache[r]=u._changeFeature(e)}),new s([],t,c,null)})},t.prototype._makeRelationshipEnum=function(e){if(e.indexOf("esriSpatialRelRelation")>=0)return"relation";switch(e){case"esriSpatialRelRelation":return"relation";case"esriSpatialRelIntersects":return"intersects";case"esriSpatialRelContains":return"contains";case"esriSpatialRelOverlaps":return"overlaps";case"esriSpatialRelWithin":return"within";case"esriSpatialRelTouches":return"touches";case"esriSpatialRelCrosses":return"crosses";case"esriSpatialRelEnvelopeIntersects":return"envelope-intersects"}return e},t.prototype._makeRelationshipParam=function(e){return e.indexOf("esriSpatialRelRelation")>=0?e.split(":")[1]:""},t.prototype._queryAllFeatures=function(){var e=this;if(this._wset)return l.resolve(this._wset);var t=new h;return t.where="1=1",this._ensureLoaded().then(function(){if(e._layer.source&&e._layer.source.items){var r=[];return e._layer.source.items.forEach(function(t){var i=t.attributes[e._layer.objectIdField];r.push(i),e._featureCache[i]=e._changeFeature(t)}),e._wset=new s([],r,!1,null),e._wset}return e._layer.queryFeatures(t).then(function(t){var r=[];return t.features.forEach(function(t){var i=t.attributes[e._layer.objectIdField];r.push(i),e._featureCache[i]=e._changeFeature(t)}),e._wset=new s([],r,!1,null),e._wset})})},t.prototype._getFeatures=function(e,t,r,i){var a=[];-1!==t&&void 0===this._featureCache[t]&&a.push(t);for(var s=e._lastFetchedIndex;s<e._known.length&&(e._lastFetchedIndex+=1,!(void 0===this._featureCache[e._known[s]]&&(e._known[s]!==t&&a.push(e._known[s]),a.length>r)));s++);return 0===a.length?l.resolve("success"):l.reject(new Error("Unaccounted for Features. Not in Feature Collection"))},t.prototype._refineSetBlock=function(e,t,r){return l.resolve(e)},t.prototype._stat=function(e,t,r,i,a,s,n){return l.resolve({calculated:!1})},t.prototype._canDoAggregates=function(e,t,r,i,a){return l.resolve(!1)},t.prototype.relationshipMetaData=function(){return[]},t._cloneAttr=function(e){var t={};for(var r in e)t[r]=e[r];return t},t.prototype.nativeCapabilities=function(){return{title:this._layer.title,canQueryRelated:!1,source:this,capabilities:this._layer.capabilities,databaseType:this._databaseType,requestStandardised:!0,maxRecordCount:this._layer.maxRecordCount}},t.create=function(e,r){var i=e.layerDefinition.objectIdField,a=e.layerDefinition.geometryType;void 0===a&&(a=e.featureSet.geometryType||"");var s=e.featureSet.features,n=r.toJSON();if(""===i||void 0===i){for(var o=!1,l=0,h=e.layerDefinition.fields;l<h.length;l++){var f=h[l];if("oid"===f.type||"esriFieldTypeOID"===f.type){i=f.name,o=!0;break}}if(!1===o){for(var y="FID",d=!0,_=0;d;){for(var v=!0,m=0,F=e.layerDefinition.fields;m<F.length;m++){var f=F[m];if(f.name===y){v=!1;break}}!0===v?d=!1:(_++,y="FID"+_.toString())}e.layerDefinition.fields.push({type:"esriFieldTypeOID",name:y,alias:y});for(var g=[],b=0;b<s.length;b++)g.push({geometry:e.featureSet.features[b].geometry,attributes:e.featureSet.features[b].attributes?this._cloneAttr(e.featureSet.features[b].attributes):{}}),g[b].attributes[y]=b;s=g,i=y}}for(var S=[],w=0,R=e.layerDefinition.fields;w<R.length;w++){var f=R[w];f instanceof c?S.push(f):S.push(c.fromJSON(f))}var I=a;switch(I){case"esriGeometryPoint":I="point";break;case"esriGeometryPolyline":I="polyline";break;case"esriGeometryPolygon":I="polygon";break;case"esriGeometryExtent":I="extent";break;case"esriGeometryMultipoint":I="multipoint"}for(var T=0,C=s;T<C.length;T++){var f=C[T];f.geometry&&f.geometry instanceof u==!1&&(f.geometry.type=I,void 0===f.geometry.spatialReference&&(f.geometry.spatialReference=n))}var k={outFields:["*"],source:s,fields:S,objectIdField:i,spatialReference:r};return k.geometryType=I||"point",new t({layer:new p(k),spatialReference:r,isTable:null===I||""===I})},t.prototype.queryAttachments=function(e,t,r,i){return l.resolve([])},t.prototype.getFeatureByObjectId=function(e,t){var r=new h;return r.where=this.objectIdField+"="+e.toString(),this._layer.queryFeatures(r).then(function(e){return 1===e.features.length?e.features[0]:null})},t}(a)});