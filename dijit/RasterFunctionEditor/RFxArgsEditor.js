// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.28/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","dojo/string","dojo/i18n!../../nls/jsapi","dojo/dom-style","dojo/dom-class","dojo/dom-construct","dojo/store/Memory","dojo/data/ObjectStore","dojo/json","../../lang","../../kernel","../../layers/RasterFunction","dojo/text!../../layers/support/rasterFunctionSchema.json","dojo/text!../../layers/support/rasterFunctionResources.json","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/form/TextBox","dijit/form/CheckBox","dijit/form/NumberTextBox","dijit/form/Select","dijit/TitlePane","dijit/Tooltip","./RFxArgSlider","./RFxBandMatrix","./RFxRasterArrayEditor","./RFxRasterInputArray","./RFxStatisticsGrid","./RFxBandIndexPicker","./RFxRasterInput","./RFxFeatureSelect","./RFxFieldSelect","./RFxCellSizeInput","./RFxScalesInput","./RFxFieldNumberSwitchable","./RFxLinearUnit","./RFxPropertySet","./utils","../ColorRampSelector","../../renderers/colorRampUtils"],function(e,t,r,i,a,n,s,o,u,l,c,d,h,g,f,p,m,v,_,y,A,b,x,R,w,F,T,S,I,E,C,O,N,j,k,L,U,W,D,V,P,B){var z,H,M,q,K={argsTable:"esriRFxArgsEditor__table",argTableRow:"esriRFxArgsEditor__tr",argNameTableRow:"esriRFxArgsEditor__tr--arg-name",argWidgetTableRow:"esriRFxArgsEditor__tr--arg-widget",fxDesc:"esriRFxArgsEditor__label--fx-desc",warningIcon:"esriRFxArgsEditor__icon--warning"},G="RasterFunctionTemplate",$="RasterFunctionVariable",J=[38,39,40,41,42,43,47,54,55,58,66,67,68,69,70,71,72,73,74,75],Q=e([v,_],{declaredClass:"esri.dijit.RasterFunctionEditor.RFxArgsEditor",widgetsInTemplate:!0,templateString:"<div class='esriRFxArgsEditor'><div data-dojo-attach-point='_argsContainterNode'></div></div>",showVariableNames:!0,_inputWidgets:[],_supportedDataTypes:["raster","long","double","string","longarray","stringarray","doublearray","rasterarray","colorramp","boolean","rasterstatisticsarray","arrayofrasterstatistics","cellsize","featureclass","rasterinfo","table","propertyset"],constructor:function(r){e.safeMixin(this,r),this._i18n=n.widgets.rasterFunctionEditor.rfxArgsEditor,this._rfxTemplate=t.clone(this.rfxTemplate),z=d.parse(a.substitute(p,n,t.hitch(this,this._substituteString))),H=d.parse(a.substitute(m,n,t.hitch(this,this._substituteString))),M=H&&H.enums,q=H&&H.dataTypes},startup:function(e){this.inherited(arguments)},postCreate:function(e){this.inherited(arguments),this.rfxTemplate&&(this._honorIsPublic=this._getHonorIsPublic(this.rfxTemplate),this._populateUI())},destroy:function(){this._destroyInputWidgets(),this.inherited(arguments)},reset:function(){},getName:function(){return this._rfxTemplate&&this._rfxTemplate.name},getUpdatedRFTWithValues:function(){var e=this._getUpdatedRFTWithValues(this._rfxTemplate);return this._cloneRFT(e,["input","uxBlocks"])},_getUpdatedRFTWithValues:function(e){if(e){var t=e.arguments,r=this._getFunctionSchema(e);return t&&(this._isRFxArg(t)?e.arguments=this._getUpdatedRFxArg(t,"Raster",r):Object.keys(t).forEach(function(e){if("type"!==e){var i=t[e];i&&(t[e]=this._getUpdatedRFxArg(i,e,r))}},this)),e}},_getRFT:function(e){if(e){var t=e.arguments,r=this._getFunctionSchema(e);return t&&(this._isRFxArg(t)?e.arguments=this._getUpdatedRFxArg(t,"Raster",r):Object.keys(t).forEach(function(e){if("type"!==e){var i=t[e];i&&(t[e]=this._getUpdatedRFxArg(i,e,r))}},this)),e}},_isRFxArg:function(e){if(e){var t=e.type;return[G,$].indexOf(t)>=0||this._isColorRamp(e)||this._isRecordSet(e)}},_getUpdatedRFxArg:function(e,t,i){if(!e||!this._isRFxArg(e))return e;var a=V.getArgRFT(e),n=i&&i.rasterFunctionArguments,s=this._getCaseInsenstitiveArg(t,n);if(s&&(s.key=t),a)return e.type===$?(e.value=this._getUpdatedRFTWithValues(a),e):this._getUpdatedRFTWithValues(a);if(this._hasRFTElements(e)&&!this._isShown(e)){var o=e.value&&e.value.elements?e.value.elements:e.value;return r.forEach(o,function(e,t){e&&(V.isReferencedObject(e)||(a=V.getArgRFT(e),a?o[t]=this._getUpdatedRFTWithValues(a):e.type===$?e.value=this._getArgumentValue(e,s):o[t]=this._getArgumentValue(e,s)))},this),e}return e.type===$?(e.value=this._getArgumentValue(e,s),e):this._isRecordSet(e)?e:void 0},_substituteString:function(e,t){if(void 0===e)throw new Error(" RFxArgsEditor: "+t);return null===e?"":this._escapeValue(String(e))},_getHonorIsPublic:function(e){var i=e&&e.arguments;if(!e||!i)return!1;if(e.aliases)return!0;var a=t.hitch(this,function(e){if(!e)return!1;if(e.isPublic)return!0;if(this._hasRasterElements(e)){var t=e.value&&e.value.elements?e.value.elements:e.value;return r.some(t,function(e){return a(e)},this)}return this._getHonorIsPublic(V.getArgRFT(e))});return this._isRFxArg(i)?a(i):r.some(Object.keys(i),function(e){var t=i[e];if(this._isRFxArg(t))return a(t)},this)},_hasRFTElements:function(e){if(!e||!e.value)return!1;var t=e.value.elements?e.value.elements:e.value;return Array.isArray(t)?t.some(function(e){return e&&e.type===G}):void 0},_hasRasterElements:function(e){if(!e||!e.value)return!1;var t=e.value.elements?e.value.elements:e.value,r=t[0];return r&&(r.isDataset||r.type===G)},_isRecordSet:function(e){return e.type&&e.type.toLowerCase().indexOf("recordset")>=0},_isColorRamp:function(e){return!!e&&(!!(e.type&&e.type.toLowerCase().indexOf("colorramp")>=0)||(!!(e.value&&e.value.type&&e.value.type.toLowerCase().indexOf("colorramp")>=0)||void 0))},_cloneRFT:function(e,i){var a={};if("object"==typeof e&&null!==e&&!Array.isArray(e)){for(var n in e)e.hasOwnProperty(n)&&r.indexOf(i,n)<0&&(a[n]=this._cloneRFT(e[n],i));return a}return Array.isArray(e)?e.map(t.hitch(this,function(e){return this._cloneRFT(e,i)})):t.clone(e)},_populateUI:function(){this._destroyInputWidgets(),u.empty(this._argsContainterNode),this._buildRFxTemplateUI(this._rfxTemplate)},_buildRFxTemplateUI:function(e,t){var r,i=e.arguments;if(e.function&&e.name&&i&&(r=this._buildRFxUI(e,t)),i)if(this._isRFxArg(i))this._buildArgRFTUI(i);else{var a,n=this._getFunctionSchema(e),s={};n&&Object.keys(n.rasterFunctionArguments).forEach(function(e){var t=this._getCaseInsenstitiveArg(e,i);a=this._buildArgRFTUI(t,a)||a,s[e.toLowerCase()]=!0},this),Object.keys(i).forEach(function(e){if(!s[e.toLowerCase()]&&"type"!==e){var t=i[e];a=this._buildArgRFTUI(t,a)||a}},this)}return r},_buildArgRFTUI:function(e,t){if(this._isRFxArg(e)){var i=V.getArgRFT(e);if(i)return this._buildRFxTemplateUI(i,t);if(this._hasRasterElements(e)){var a=e&&e.value.elements?e.value.elements:e.value,n=t;return r.forEach(a,function(e){(i=V.getArgRFT(e))&&(n=this._buildRFxTemplateUI(i,n)||n)},this),n}}},_getFunctionSchema:function(e){if(e&&e.function&&e.function.type){var t,r,i=e.function.type,a=V.functionTypes;if(i.toLowerCase()===a.local.toLowerCase()){var n=e&&e.arguments&&e.arguments.Operation,s=n&&n.value;if(J.indexOf(s)>=0)return z.CellStatisticsFunction}return i.toLowerCase()===a.gpAdapter.toLowerCase()?(t=e&&e.arguments&&e.arguments.ToolName,t=t.value&&t.value.replace("_sa",""),z[t]):i.toLowerCase()===a.pythonAdapter.toLowerCase()?(r=e&&e.arguments&&e.arguments.ClassName,"object"==typeof r?z[r.value]:z[r]):z[i]}},_getSchemaArgKey:function(e,t){if(e){var i,a=Object.keys(e);return void 0===t&&1===a.length?a[0]:(r.some(a,function(e){e.toLowerCase()===(t&&t.toLowerCase())&&(i=e)}),i)}},_buildRFxArgUI:function(e){e=e||{};var t,i,a=[],n=e.rfxArg,s=e.rfxArgName,o=e.functionSchemaArgs,u=e.schemaEditorOverrides,l=e.rfxArgs,c=e.container,d=e.overriddenArgNames,h=e.triggerArgs;if(n)return o&&(t=this._getSchemaArgKey(o,s),(i=o[t])&&(i.key=t)),u&&r.some(u,function(e){r.indexOf(e.argumentNames,t)>=0&&this._isOverrideWidgetShown(e.argumentNames,l)&&r.indexOf(d,t)<0&&(d=d.concat(e.argumentNames),this._buildOverrideWidgetLayout(e,l,c,o))},this),r.indexOf(d,t)<0&&n.type&&n.type!==G&&this._isShown(n,i)&&(i&&r.indexOf(this._supportedDataTypes,i.dataType)<0?a.push(n.name||i.displayName):this._buildRFxArgLayout(n,c,i,l)),i&&i.editorStateTrigger&&i.editorStateTrigger.active&&h.push({rfxArg:n,schemaArgDef:i}),{overriddenArgNames:d,unsupportedDataTypeArgs:a}},_buildRFxUI:function(e,i){function a(e){if(e){var t=e.overriddenArgNames,r=e.unsupportedDataTypeArgs;t&&(l=l.concat(t),y.overriddenArgNames=l),r&&(c=c.concat(r),y.unsupportedDataTypeArgs=c)}}function n(e){Object.keys(e).forEach(function(e){var r=this._getCaseInsenstitiveArg(e,o);r&&this._isRFxArg(r)&&!r.uxBlocks&&(s=this._buildRFxArgUI(t.mixin({rfxArg:r,rfxArgName:e},y)),a(s))},this)}i=i||this._argsContainterNode;var s,o=e.arguments,l=[],c=[],d=[],h=this._getFunctionSchema(e),g=h&&h.rasterFunctionArguments,f=h&&h.editorArgumentOverride&&h.editorArgumentOverride.active?h.editorArgumentOverride.overrides:null,p=u.create("table",{class:K.argsTable}),m=u.create("tbody",null,p),v=i===this._argsContainterNode?"first":"after",_=u.create("div",null,i,v),y={functionSchema:h,functionSchemaArgs:g,schemaEditorOverrides:f,rfxArgs:o,container:m,triggerArgs:d,overriddenArgNames:l};if(o&&(this._isRFxArg(o)?(s=this._buildRFxArgUI(t.mixin({rfxArg:o},y)),a(s)):(g&&t.hitch(this,n)(g),t.hitch(this,n)(o)),Object.keys(o).forEach(function(e){var t=o[e];t&&t.input&&t.input.declaredClass.indexOf("RFxFieldSelect")>0&&t.input.setFieldOptions()}),r.forEach(d,function(e){var t=e.rfxArg,r=t&&t.value;this._handleEditorStateTriggers(o,r,e.schemaArgDef)},this)),m.childNodes&&m.childNodes.length)return this._buildTitlePane(p,_,e.function,c)},_isOverrideWidgetShown:function(e,t){var i;return r.some(e,function(e){if(i=this._getCaseInsenstitiveArg(e,t),this._isShown(i))return!0},this)},_hasVisibleElements:function(e){if(e&&!V.isReferencedObject(e)){var t=e.value&&e.value.elements;return t&&r.some(t,function(e){return this._isShown(e)},this)}},_isShown:function(e,t){return!!e&&(this._honorIsPublic?!!e.isPublic||!!this._hasVisibleElements(e):!t||!t.hidden)},_buildTitlePane:function(e,r,i,a){var n=new R({title:i&&i.name,content:e},r);n.startup();var s=t.hitch(this,function(e,t){this.own(new w({connectId:[e],label:"<div class='"+K.fxDesc+"'>"+t+"</div>"})),e.onclick=function(e){e.stopPropagation()}});if(n.titleNode){if(s(u.create("a",{class:"esriFloatTrailing helpIcon",style:"float: right; margin-right: -6px;"},n.titleNode),i&&i.description),a&&a.length){s(u.create("a",{class:K.warningIcon},n.titleNode),this._i18n.unsupportedDataTypeWarning+"<br><br><strong>"+a.join(", ")+"</strong>")}}return n.domNode},_buildRFxArgLayout:function(e,t,r,i){var a,n,s,o;return n=(r&&r.dataType)===q.boolean,s=this._useRFxArgWidget(r),o=r&&r.domain,(s||n)&&(a=u.create("tr",{class:K.argTableRow},t),e.uxBlocks=[a]),s?this._buildRFxWidgetLayout(a,e,r,i):n&&!o?this._buildBooleanLayout(a,e,r,i):this._buildStdTwoRowLayout(t,e,r,i)},_useRFxArgWidget:function(e){return e&&(e.domain&&"range"===e.domain.type||e.elementInfos&&e.dataType===q.rasterArray||e.dataType===q.table)},_createInputWidget:function(e,t,r,i){var a=this._getWidget(e,t,r,i);a.startup(),e.input=a,this._inputWidgets.push(a)},_createOverrideWidget:function(e,i,a){var n=new e(i,a),s=i&&i.inputArgs;n.startup(),this._inputWidgets.push(n),n.on("drawtool-activate",t.hitch(this,function(e){this.emit("drawtool-activate",e)})),n.on("drawtool-deactivate",t.hitch(this,function(e){this.emit("drawtool-deactivate",e)})),n.on("add-layer",t.hitch(this,function(e){this.emit("add-ready-to-use-layer",e)})),n.on("zoom-to-extent",t.hitch(this,function(e){this.emit("zoom-to-extent",e)})),n.domNode&&s&&r.forEach(Object.keys(s),function(e){var t=s[e];t&&(t.uxBlocks=[n.domNode])})},_buildOverrideWidgetLayout:function(e,i,a,n){if(e){var s,o,l={},c={};r.forEach(e.argumentNames,function(e){s=this._getCaseInsenstitiveArg(e,i);var t=n[e];t&&(t.key=e),s&&(s.displayName=this._getArgDisplayName(s.name,t),c[e]=s)},this),r.forEach(Object.keys(n),function(e){o=n[e],o.dataType===q.raster&&(s=this._getCaseInsenstitiveArg(e,i))&&(l[e]=s)},this);try{require([e.widget.path],t.hitch(this,function(e){var r,n,s=u.create("tr",{class:K.argTableRow},a);r=u.create("td",null,s),n=u.create("div",null,r),this._createOverrideWidget(e,{rasterFunctionEnums:M,rasterFunctions:z,rasterArgs:l,rfxArgs:i,inputArgs:c,inputLayers:this.inputLayers,getRFT:t.hitch(this,this._getUpdatedRFTWithValues),browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf},allowScalar:!1,isShownFx:t.hitch(this,this._isShown)},n)}))}catch(e){console.error(e),r.forEach(Object.keys(c),function(e){s=c[e],o=this._getCaseInsenstitiveArg(e,n),this._buildRFxArgLayout(s,a,o,i)},this)}}},_buildBooleanLayout:function(e,t,r,i){var a,n;a=u.create("td",{innerHTML:this._getArgDisplayName(t.name,r)},e),n=u.create("div",null,a,"first"),this._createInputWidget(t,n,r,i)},_buildStdTwoRowLayout:function(e,t,r,i){var a,n,s,o;a=u.create("tr",{class:K.argNameTableRow},e),u.create("td",{innerHTML:this._getArgDisplayName(t.name,r)},a),n=u.create("tr",{class:K.argWidgetTableRow},e),o=u.create("td",null,n),s=u.create("div",null,o),t.uxBlocks=[a,n],this._createInputWidget(t,s,r,i)},_getArgDisplayName:function(e,t){if(!t||!t.displayName)return e;if(this.showVariableNames){var r=t.key;return h.isDefined(e)&&""!==e&&e.toLowerCase()!==r.toLowerCase()?e:t.displayName}return t.displayName},_buildRFxWidgetLayout:function(e,t,r,i){var a,n;a=u.create("td",null,e),n=u.create("div",null,a),this._createInputWidget(t,n,r,i)},_getDatasetOptions:function(){if(this.inputLayers)return this._inputLayerStore=new c(new l({data:this.inputLayers})),this._inputLayerStore},_destroyInputWidgets:function(){var e=this._inputWidgets;r.forEach(e,function(e){if(e&&e.destroy)try{e.destroy()}catch(e){console.log(e)}}),this._inputWidgets=[]},_getWidget:function(e,r,i,a){if(e){var n,s=i&&i.dataType,o=h.isDefined(e.value)?e.value:i&&i.defaultValue,u=i&&i.domain,l=i&&i.dataTypeAttributes;return e.isDataset&&!n&&(n=new O({inputLayers:this.inputLayers,value:o,allowScalar:!i||i.allowScalar,selectDefault:i&&i.required,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},r)),n||(n=u?this._getDomainBasedWidget(u,e,a,r,o):this._getDataTypeBasedWidget(s,l,e,a,r,i)),n&&(n.on("change",t.partial(t.hitch(this,this._onArgumentValueChange),e,i,a)),n.on("add-layer",t.hitch(this,function(e){this.emit("add-ready-to-use-layer",e)})),n.on("zoom-to-extent",t.hitch(this,function(e){this.emit("zoom-to-extent",e)}))),n}},_getDataTypeBasedWidget:function(e,r,i,a,n,s){var o,u=i.value;if(r&&"bandmatrix"===r.type)return this._getDataTypeAttributeBasedWidget(e,r,i,a,n);switch(e){case q.raster:i.isDataset||(o=new b({value:u&&u.length?u[0]:void 0},n));break;case q.rasterArray:var l,c=s&&s.elementInfos;c&&(l=this._getRasterArrayInputArgs(s,a)),o=l?new I({inputLayers:this.inputLayers,value:u,getRFT:t.hitch(this,this._getUpdatedRFTWithValues),allowScalar:s.allowScalar,schemaElementInfos:l,isShown:t.hitch(this,this._isShown),browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},n):new S({inputLayers:this.inputLayers,value:u,getRFT:t.hitch(this,this._getUpdatedRFTWithValues),allowScalar:s.allowScalar,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},n);break;case q.string:o=new y({value:u},n);break;case q.double:o=new b({value:u},n);break;case q.long:o=new b({constraints:{places:0},value:u},n);break;case q.colorRamp:var h=V.getColorRampFromArg(i);o=new P({style:"text-indent: 0; height: 2.2em;",maxHeight:200,includeDefault:!1,colorRamp:h},n);break;case q.boolean:o=new A({checked:u},n);break;case q.stringArray:case q.doubleArray:case q.longArray:u&&u.length&&(u=u.join(",")),o=new y({value:u},n);break;case q.rasterStatisticsArray:case q.arrayOfRasterStatistics:o=new E({value:u},n);break;case q.cellSize:o=new k({value:u},n);break;case void 0:o=new y({},n);try{"string"==typeof u?o.set("value",u):o.set("value",d.stringify(u))}catch(e){o.set("value",u)}break;case q.featureClass:o=new N({inputLayers:this.featureLayers,geometryType:r?r.type:null,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},n);break;case q.propertySet:o=new D({value:u},n);break;default:o=new y({value:String(u)},n)}return o},_getDomainBasedWidget:function(e,t,r,i,a){if(e&&t){var n,s=e&&e.type;if("numlist"===s){var o=new c(new l({idProperty:"key",data:this._getNumListData(e)}));n=new x({store:o,labelAttr:"key"},i),h.isDefined(a)&&n.set("value",a.toString())}else if("list"===s){var u=V.getEnumData(M[e.enum]),d=new c(new l({idProperty:"key",data:u}));n=new x({store:d,labelAttr:"label",maxHeight:200},i),h.isDefined(a)&&n.set("value",a.toString())}else if("range"===s)n=new F({min:e.min,max:e.max,label:t.name,value:a},i);else if("bandIndex"===s){var g=this._getCaseInsenstitiveArg(e.argumentName,r);n=new C({nBandsArg:g,value:a},i)}else if("fields"===s){var f=this._getCaseInsenstitiveArg(e.argumentName,r);n=new j({layerArg:f},i)}else if("switchable"===s){f=this._getCaseInsenstitiveArg(e.argumentName,r);var p=this._parseSwitchableDomainArguments(e.attributes,r);n=new U({attributes:p,value:a},i)}else"linearUnit"===s&&(u=V.getEnumData(M[e.enum]),d=new c(new l({idProperty:"key",data:u})),n=new W({enumStore:d,value:a},i));return n}},_parseSwitchableDomainArguments:function(e,t){return e.forEach(function(e){if("field"===e.type)e.argumentName=this._getCaseInsenstitiveArg(e.argumentName,t);else if("list"===e.type||"linearUnit"===e.type){var r=V.getEnumData(M[e.enum]);e.enumStore=new c(new l({idProperty:"key",data:r}))}},this),e},_getDataTypeAttributeBasedWidget:function(e,t,r,i,a){var n=this._getCaseInsenstitiveArg(t.nBands,i);return new T({nBandsArg:n,nCols:t.cols,displayNames:t.displayNames,value:r.value},a)},_getRasterArrayInputArgs:function(e,t){var i,a=this._getCaseInsenstitiveArg(e.nElementsArgument,t),n=a&&a.value,s=e.elementInfos;return void 0!==a&&void 0!==n||1!==s.length?(r.some(s,function(e){var t=e.values;if(r.indexOf(t,n)>-1)return i=e.inputArgs,!0},this),i):s[0].inputArgs},_getNumListData:function(e){if(e){for(var t=[],r=e.start,i=0;i<e.count;r+=e.inc,i++)t.push({key:r.toString()});return t}},_onArgumentValueChange:function(e,r,i,a){var n=e&&e.input;n instanceof x&&r&&r.dataType===q.long&&(a=parseInt(a,10)),n instanceof x&&r&&r.dataType===q.boolean&&(a="true"===a),Object.keys(i).forEach(function(t){var r=i[t]&&i[t].input;r&&(r.declaredClass.indexOf("RFxFieldSelect")>0||r.declaredClass.indexOf("RFxFieldNumberSwitchable")>0)&&r.layerArg&&r.layerArg.name===e.name&&r.setFieldOptions()}),this._handleEditorStateTriggers(i,a,r),this._handleEditorValueTriggers(i,a,r),setTimeout(t.hitch(this,function(){this._started=!0,this.emit("update-preview")}),1e3)},_handleEditorStateTriggers:function(e,t,i){i&&i.editorStateTrigger&&i.editorStateTrigger.active&&e&&r.forEach(i.editorStateTrigger.triggers,function(i){var a,n,o,u,l,c,d,h=i.autoRevert;Object.keys(e).forEach(function(g){a=e[g],l=a.uxBlocks,c=a.input,l&&(n=r.indexOf(i.values,t)>=0,o=this._containsArgName(i.active,g),u=this._containsArgName(i.inactive,g),(o&&n||u&&!n&&h)&&(d=l&&l[0]&&"TR"===l[0].tagName?"table-row":"block",c&&c.onChange&&c.onChange(c.value)),(u&&n||o&&!n&&h)&&(d="none"),r.forEach(l,function(e){e&&d&&s.set(e,"display",d)}),d=null)},this)},this)},_handleEditorValueTriggers:function(e,t,i){i&&i.editorValueTrigger&&i.editorValueTrigger.active&&e&&r.forEach(i.editorValueTrigger.triggers,function(i){var a,n,s,o;(n=r.indexOf(i.values,t)>=0)&&Object.keys(e).forEach(function(t){a=e[t],(s=a.input)&&(o=this._getTriggerArgValue(i.changedArgs,t),h.isDefined(o)&&s.set("value",o))},this)},this)},_getTriggerArgValue:function(e,t){var i;return r.some(e,function(e){for(var r in e)if(e.hasOwnProperty(r)&&r.toLowerCase()===t.toLowerCase())return i=e[r],!0}),i},_containsArgName:function(e,t){if(!e||!t)return!1;var i=t.toLowerCase();return r.some(e,function(e){return e.toLowerCase()===i})},_getArgumentValue:function(e,t){function i(e){return r.some(e,function(e){if(u instanceof e)return!0})}if(e){var a,n,s,o,u=e.input,l=t&&t.dataType;if(!u)return e.value;var c=[b,x,y],h=[A],g=[F,T,S,E,O,C,N,I,k,L,U,j,W,D];if(i([P]))return V.getRFxArgColorRampValue(u.colorRamp);if(i(g))return u.get("value");if(i(c))switch(n=u.value,l&&l.indexOf("array")>=0&&n&&"string"==typeof n&&(a=n.indexOf(",")>=0?n.split(","):n.split(" ")),l&&l===q.boolean&&"string"==typeof n&&(n="true"===u.value),l){case q.raster:if(!e.isDataset)return{value:n,type:"Scalar"};break;case q.longArray:return r.forEach(a,function(e,t){a[t]=parseInt(e,10)}),a;case q.doubleArray:return r.forEach(a,function(e,t){a[t]=parseFloat(e)}),a;case q.stringArray:case q.rasterArray:return r.forEach(a,function(e,t){a[t]=e.trim()}),a;case q.long:return parseInt(n,10);case q.cellSize:try{return d.parse(n)}catch(e){return n}return n;case void 0:return n=n&&n.trim(),s=/^[+-]?(\d+)?(\.\d+)?$/.test(n),o=r.indexOf(["true","false"],n)>=0,s?parseFloat(n):o?"true"===n:n;default:return n}else if(i(h))return u.checked}},_getCaseInsenstitiveArg:function(e,t){if(e&&t)return r.some(Object.keys(t),function(t){if(t.toLowerCase()===e.toLowerCase())return e=t,!0}),t[e]},_selectInputDataset:function(e,t){if(e&&e.options.length&&t){var i=t,a=null;"object"==typeof t&&(i=t.url,a=t.name);var n=h.isDefined(a);r.forEach(e.options,function(e){e.selected=e.item.url===i&&(!n||n&&a===e.item.name)},this)}}});return i("extend-esri")&&t.setObject("dijit.RasterFunctionEditor.RFxArgsEditor",Q,g),Q});