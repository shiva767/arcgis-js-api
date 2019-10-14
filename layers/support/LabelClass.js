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

define(["require","exports","../../core/tsSupport/decorateHelper","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../symbols","../../core/jsonMap","../../core/JSONSupport","../../core/lang","../../core/accessorSupport/decorators","./LabelExpressionInfo","./labelUtils","./types","../../symbols/support/defaults","../../symbols/support/jsonUtils"],function(e,r,t,n,o,l,s,i,a,p,c,u,b,f,v,y){function x(e){return!e||"service"!==e.origin&&(!e.layer||!f.isOfType(e.layer,"map-image"))}function m(e){var r=e.match(E);return r&&r[1].trim()||null}function w(e){if(!e)return null;var r=g.exec(e);return r&&(r[1]||r[3])||null}function S(e){return e.replace(new RegExp("\\[","g"),"{").replace(new RegExp("\\]","g"),"}")}function d(e){return e.replace(new RegExp("\\{","g"),"[").replace(new RegExp("\\}","g"),"]")}var h=new i.default({esriServerPointLabelPlacementAboveCenter:"above-center",esriServerPointLabelPlacementAboveLeft:"above-left",esriServerPointLabelPlacementAboveRight:"above-right",esriServerPointLabelPlacementBelowCenter:"below-center",esriServerPointLabelPlacementBelowLeft:"below-left",esriServerPointLabelPlacementBelowRight:"below-right",esriServerPointLabelPlacementCenterCenter:"center-center",esriServerPointLabelPlacementCenterLeft:"center-left",esriServerPointLabelPlacementCenterRight:"center-right",esriServerLinePlacementAboveAfter:"above-after",esriServerLinePlacementAboveAlong:"above-along",esriServerLinePlacementAboveBefore:"above-before",esriServerLinePlacementAboveStart:"above-start",esriServerLinePlacementAboveEnd:"above-end",esriServerLinePlacementBelowAfter:"below-after",esriServerLinePlacementBelowAlong:"below-along",esriServerLinePlacementBelowBefore:"below-before",esriServerLinePlacementBelowStart:"below-start",esriServerLinePlacementBelowEnd:"below-end",esriServerLinePlacementCenterAfter:"center-after",esriServerLinePlacementCenterAlong:"center-along",esriServerLinePlacementCenterBefore:"center-before",esriServerLinePlacementCenterStart:"center-start",esriServerLinePlacementCenterEnd:"center-end",esriServerPolygonPlacementAlwaysHorizontal:"always-horizontal"},{ignoreUnknown:!0}),E=/^\s*\{([^}]+)\}\s*$/i,g=/^\s*(?:(?:\$feature\.(\w+))|(?:\$feature\[(["'])([\w\s]+)(\2)\]))\s*$/i;return function(e){function r(r){var t=e.call(this,r)||this;return t.name=null,t.labelExpression=null,t.labelExpressionInfo=null,t.labelPlacement=null,t.maxScale=0,t.minScale=0,t.symbol=v.defaultTextSymbol2D,t.useCodedValues=void 0,t.where=null,t}n(r,e),o=r,r.evaluateWhere=function(e,r){var t=function(e,r,t){switch(r){case"=":return e==t;case"<>":return e!=t;case">":return e>t;case">=":return e>=t;case"<":return e<t;case"<=":return e<=t}return!1};try{if(null==e)return!0;var n=e.split(" ");if(3===n.length)return t(r[n[0]],n[1],n[2]);if(7===n.length){var o=t(r[n[0]],n[1],n[2]),l=n[3],s=t(r[n[4]],n[5],n[6]);switch(l){case"AND":return o&&s;case"OR":return o||s}}return!1}catch(r){console.log("Error.: can't parse = "+e)}},r.prototype.readLabelExpression=function(e,r){var t=r.labelExpressionInfo;if(!t||!t.value&&!t.expression)return e},r.prototype.writeLabelExpression=function(e,r,t,n){if(this.labelExpressionInfo&&x(n))if(null!=this.labelExpressionInfo.value)e=d(this.labelExpressionInfo.value);else if(null!=this.labelExpressionInfo.expression){var o=w(this.labelExpressionInfo.expression);o&&(e="["+o+"]")}null!=e&&(r[t]=e)},r.prototype.writeLabelExpressionInfo=function(e,r,t,n){if(null==e&&null!=this.labelExpression&&x(n))e=new u({expression:this.getLabelExpressionArcade()});else if(!e)return;var o=e.toJSON(n);o.expression&&(r[t]=o)},r.prototype.writeMaxScale=function(e,r){(e||this.minScale)&&(r.maxScale=e)},r.prototype.writeMinScale=function(e,r){(e||this.maxScale)&&(r.minScale=e)},r.prototype.getLabelExpression=function(){var e={expression:"",type:"none"};return this.labelExpressionInfo?this.labelExpressionInfo.value?(e.expression=this.labelExpressionInfo.value,e.type="conventional"):this.labelExpressionInfo.expression&&(e.expression=this.labelExpressionInfo.expression,e.type="arcade"):null!=this.labelExpression&&(e.expression=S(this.labelExpression),e.type="conventional"),e},r.prototype.getLabelExpressionArcade=function(){var e=this.getLabelExpression();if(!e)return null;switch(e.type){case"conventional":return b.convertTemplatedStringToArcade(e.expression);case"arcade":return e.expression}return null},r.prototype.getLabelExpressionSingleField=function(){var e=this.getLabelExpression();if(!e)return null;switch(e.type){case"conventional":return m(e.expression);case"arcade":return w(e.expression)}return null},r.prototype.clone=function(){return new o({labelExpression:this.labelExpression,labelExpressionInfo:p.clone(this.labelExpressionInfo),labelPlacement:this.labelPlacement,maxScale:this.maxScale,minScale:this.minScale,name:this.name,symbol:p.clone(this.symbol),where:this.where,useCodedValues:this.useCodedValues})};var o;return t([c.property({type:String,json:{write:!0}})],r.prototype,"name",void 0),t([c.property({type:String,json:{write:{allowNull:!0}}})],r.prototype,"labelExpression",void 0),t([c.reader("labelExpression")],r.prototype,"readLabelExpression",null),t([c.writer("labelExpression")],r.prototype,"writeLabelExpression",null),t([c.property({type:u,json:{write:{overridePolicy:function(e,r,t){return x(t)?{allowNull:!0}:{enabled:!1}}}}})],r.prototype,"labelExpressionInfo",void 0),t([c.writer("labelExpressionInfo")],r.prototype,"writeLabelExpressionInfo",null),t([c.property({type:h.apiValues,json:{type:h.jsonValues,read:h.read,write:h.write}})],r.prototype,"labelPlacement",void 0),t([c.property({type:Number})],r.prototype,"maxScale",void 0),t([c.writer("maxScale")],r.prototype,"writeMaxScale",null),t([c.property({type:Number})],r.prototype,"minScale",void 0),t([c.writer("minScale")],r.prototype,"writeMinScale",null),t([c.property({types:s.symbolTypesLabel,json:{origins:{"web-scene":{types:s.symbolTypesLabel3D,read:y.read,write:y.writeTarget,default:null}},read:y.read,write:y.writeTarget,default:null}})],r.prototype,"symbol",void 0),t([c.property({type:Boolean,json:{write:!0}})],r.prototype,"useCodedValues",void 0),t([c.property({type:String,json:{write:!0}})],r.prototype,"where",void 0),r=o=t([c.subclass("esri.layers.support.LabelClass")],r)}(c.declared(a.JSONSupport))});