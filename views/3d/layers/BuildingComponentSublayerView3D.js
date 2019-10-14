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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../Graphic","../../../core/Error","../../../core/Logger","../../../core/maybe","../../../core/promiseUtils","../../../core/accessorSupport/decorators","../../../core/sql/WhereClause","../../../layers/support/fieldUtils","./BuildingSublayerView3D","./I3SMeshView3D","./i3s/I3SUtil","./support/DefinitionExpressionSceneLayerView","./support/fieldProperties","../../layers/support/popupUtils"],function(e,r,i,t,s,n,o,l,a,p,d,u,c,h,y,f,F,g,v,x,E){var w=p.getLogger("esri.views.3d.layers.BuildingComponentSublayerView3D"),b=x.defineFieldProperties();return function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.layerView=null,r._elevationContext="scene",r._isIntegratedMesh=!1,r.lodFactor=1,r.progressiveLoadFactor=1,r}return t(r,e),r.prototype.initialize=function(){var e=this;this._layerUid=this.layer.layer.uid,this.updatingHandles.add(this,"layer.renderer",function(){return e._updateRequiredFields()}),this.updatingHandles.add(this,"definitionExpressionFields",function(){return e._updateRequiredFields()}),this.updatingHandles.add(this,"filterExpressionFields",function(){return e._updateRequiredFields()}),this.updatingHandles.add(this.layer,"renderer",function(r){return e._rendererChange(r)},2),this.updatingHandles.add(this,"parsedDefinitionExpression",function(){return e._filterChange()}),this.updatingHandles.add(this,"parsedFilterExpression",function(){return e._filterChange()}),this.addResolvingPromise(this._updateRequiredFields())},Object.defineProperty(r.prototype,"parsedFilterExpression",{get:function(){if("Overview"===this.layer.modelName)return null;if(d.isNone(this.layerView.filterExpression))return null;var e;try{e=h.WhereClause.create(this.layerView.filterExpression,this.layer.fieldsIndex)}catch(e){return w.error("Failed to parse filterExpression: "+e),null}if(!e.isStandardized)return w.error("filterExpression is using non standard function"),null;var r=[],i=e.fieldNames;return g.findFieldsCaseInsensitive(i,this.layer.fields,{missingFields:r}),r.length>0?(w.error("filterExpression references unknown fields: "+r.join(", ")),null):e},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"filterExpressionFields",{get:function(){if(this.parsedFilterExpression){var e=this.parsedFilterExpression.fieldNames;return g.findFieldsCaseInsensitive(e,this.layer.fields)}return null},enumerable:!0,configurable:!0}),r.prototype._createLayerGraphic=function(e){var r=new l(null,null,e);return r.layer=this.layer.layer,r.sourceLayer=this.layer,r},r.prototype.canResume=function(){return this.inherited(arguments)&&(!this._controller||this._controller.rootNodeVisible)},r.prototype.isUpdating=function(){return this.updatingMeshView3D},r.prototype.fetchPopupFeatures=function(e,r){return o(this,void 0,void 0,function(){var e,i,t,s,o,l,a,p,c;return n(this,function(n){switch(n.label){case 0:return(e=this._validateFetchPopupFeatures(r))?[2,u.reject(e)]:d.isSome(r)&&r.clientGraphics&&0!==r.clientGraphics.length?(i=[],t=[],o=y.unpackFieldNames,l=[this.layer.fields],[4,E.getRequiredFields(this.layer,E.getFetchPopupTemplate(this.layer,r))]):[2,[]];case 1:for(s=o.apply(void 0,l.concat([n.sent()])),a=0,p=r.clientGraphics;a<p.length;a++)c=p[a],y.featureHasFields(s,c)?i.push(c):t.push(c);return 0===t.length?[2,u.resolve(i)]:[2,this.whenGraphicAttributes(t,s).catch(function(){return t}).then(function(e){return i.concat(e)})]}})})},r.prototype._updateRequiredFields=function(){return o(this,void 0,void 0,function(){var e,r,i,t;return n(this,function(s){switch(s.label){case 0:return r=y.fixFields,i=[this.layer.fields],this.layer.renderer?[4,this.layer.renderer.getRequiredFields(this.layer.fields)]:[3,2];case 1:return t=s.sent(),[3,3];case 2:t=[],s.label=3;case 3:return e=r.apply(void 0,i.concat([t.concat(this.definitionExpressionFields||[],this.filterExpressionFields||[])])),this._set("requiredFields",e),[2]}})})},r.prototype._validateFetchPopupFeatures=function(e){var r=this.layer;return r.popupEnabled?E.getFetchPopupTemplate(r,e)?void 0:new a("buildingscenelayerview3d:fetchPopupFeatures","Layer does not define a popup template",{layer:r}):new a("buildingscenelayerview3d:fetchPopupFeatures","Popups are disabled",{layer:r})},r.prototype.getFilters=function(){var e=this.inherited(arguments);return this.addSqlFilter(e,this.parsedFilterExpression,this.filterExpressionFields,this.logError),this.addSqlFilter(e,this.parsedDefinitionExpression,this.definitionExpressionFields,this.logError),e},s([c.property()],r.prototype,"layer",void 0),s([c.property()],r.prototype,"layerView",void 0),s([c.property({dependsOn:["updatingMeshView3D"]})],r.prototype,"updating",void 0),s([c.property({dependsOn:["_controller.rootNodeVisible"]})],r.prototype,"suspended",void 0),s([c.property({readOnly:!0,aliasOf:"view.qualitySettings.sceneService.3dObject.lodFactor"})],r.prototype,"lodFactor",void 0),s([c.property({readOnly:!0,dependsOn:["layerView.filterExpression","layer.fieldsIndex"]})],r.prototype,"parsedFilterExpression",null),s([c.property({type:[String],readOnly:!0,dependsOn:["parsedFilterExpression"]})],r.prototype,"filterExpressionFields",null),s([c.property(b.requiredFields)],r.prototype,"requiredFields",void 0),s([c.property(b.availableFields)],r.prototype,"availableFields",void 0),r=s([c.subclass("esri.views.3d.layers.BuildingComponentSublayerView3D")],r)}(c.declared(v.DefinitionExpressionSceneLayerView(F.I3SMeshView3D(f))))});