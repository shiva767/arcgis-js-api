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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dgrid/OnDemandGrid","./ColorRampSelector","dijit/TitlePane","dijit/form/CheckBox","dijit/form/FilteringSelect","dijit/form/NumberSpinner","dijit/form/NumberTextBox","dojo/i18n!./RasterSymbologyEditor/nls/RasterSymbologyEditor","dojo/store/Memory","../core/lang","../core/accessorSupport/decorators","./Widget","./RasterSymbologyEditor/RasterSymbologyEditorViewModel","./support/widget"],function(e,t,s,i,n,a,o,l,r,c,d,u,p,h,m,_,y,b){var S={base:"esri-raster-symbology-editor",filteringSelect:"esri-raster-symbology-editor__filtering-select",stretchColorSchemeRow:"esri-raster-symbology-editor__stretch-color-ramp-row",percentClipOptionsRow:"esri-raster-symbology-editor__percent-clip-row",stdDeviationOptionsRow:"esri-raster-symbology-editor__std-deviation-row",stretchOptionsBlock:"esri-raster-symbology-editor__stretch-options",stretchGammaBlock:"esri-raster-symbology-editor__stretch-gamma-row",stretchDraBlock:"esri-raster-symbology-editor__stretch-dra-row",displayHidden:"esri-raster-symbology-editor--hidden",displayBlock:"esri-raster-symbology-editor--block",table:"esri-raster-symbology-editor__table",thumbnailImage:"esri-raster-symbology-editor__thumbnail-image",bandCombinationPresetNaturalColorIcon:"esri-raster-symbology-editor__band-combination-icon--natural-color",bandCombinationPresetLanduseIcon:"esri-raster-symbology-editor__band-combination-icon--landuse",bandCombinationPresetLandWaterIcon:"esri-raster-symbology-editor__band-combination-icon--land-water",bandCombinationPresetVegetationIcon:"esri-raster-symbology-editor__band-combination-icon--vegetation",bandCombinationPresetShallowBathymetricIcon:"esri-raster-symbology-editor__band-combination-icon--bathymetric",bandCombinationPresetColorInfraredIcon:"esri-raster-symbology-editor__band-combination-icon--color-infrared",minMaxStretchTypeIcon:"esri-raster-symbology-editor__stretch-type-icon--min-max",noneStretchTypeIcon:"esri-raster-symbology-editor__stretch-type-icon--none",standardDeviationStretchTypeIcon:"esri-raster-symbology-editor__stretch-type-icon--standard-deviation",percentClipStretchTypeIcon:"esri-raster-symbology-editor__stretch-type-icon--percent-clip",rgbSymbologyTypeIcon:"esri-raster-symbology-editor__symbology-type-icon--rgb",stretchSymbologyTypeIcon:"esri-raster-symbology-editor__symbology-type-icon--stretch",uniqueValueSymbologyTypeIcon:"esri-raster-symbology-editor__symbology-type-icon--unique-value",discreteSymbologyTypeIcon:"esri-raster-symbology-editor__symbology-type-icon--discrete",menuItemTd:"esri-raster-symbology-editor__menu-item-td",dgridSymbolCell:"esri-raster-symbology-editor__dgrid-symbol-cell",menuItemText:"esri-raster-symbology-editor__menu-item-text",checkbox:"esri-raster-symbology-editor__checkbox"};return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.layer=null,t.defaultParams=null,t.viewModel=new y,t.stretchType=0,t.symbologyType="",t._components=[],t._symbologySelect=null,t._supportsBandPresets=!1,t}return s(t,e),t.prototype.postInitialize=function(e){this.defaultParams=this.viewModel.getDefaultRenderParameters(),this._createUIComponents()},t.prototype.destroy=function(){this._components.forEach(function(e){e&&(e.destroy(),e=null)})},t.prototype.render=function(){var e,t,s,i,n,a,o,l,r,c,d,p,h=this,m=h.symbologyType,_=h.stretchType,g=y.SymbologyTypes,C=g.stretch,f=g.rgb,x=g.uniqueValue,v=g.discrete,I=this.viewModel.isStretchColorRampApplicable(_),T=this.viewModel.getStretchFilterType(y.StretchTypeNames.percentClip),B=this.viewModel.getStretchFilterType(y.StretchTypeNames.none),P=this.viewModel.getStretchFilterType(y.StretchTypeNames.standardDeviation),D=b.tsx("div",null,b.tsx("div",{afterCreate:this._placeSymbologySelect,bind:this})),N=b.tsx("div",{class:this.classes((e={},e[S.displayBlock]=m===C,e[S.displayHidden]=m!==C,e))},b.tsx("div",{afterCreate:this._createColorSchemeTitlePane,bind:this},b.tsx("table",{class:S.table},b.tsx("tr",null,b.tsx("td",null,b.tsx("label",null,u.bandSelectionLabel)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeBandSelect,bind:this}))),b.tsx("tr",{class:this.classes((t={},t[S.stretchColorSchemeRow]=I,t[S.displayHidden]=!I,t))},b.tsx("td",null,b.tsx("label",null,u.colorSchemeLabel)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeColorRampSelect,bind:this})))))),V=b.tsx("div",{class:this.classes((s={},s[S.displayBlock]=m===C||m===f,s[S.displayHidden]=m!==C,s))},b.tsx("div",{afterCreate:this._createNoDataTitlePane,bind:this},b.tsx("table",{class:S.table},b.tsx("tr",null,b.tsx("td",null,b.tsx("label",null,u.noDataLabel)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeNoDataInput,bind:this})))))),q=b.tsx("div",{afterCreate:this._placeStretchTypeSelect,bind:this}),w=b.tsx("tr",{class:this.classes((i={},i[S.percentClipOptionsRow]=_===T,i[S.displayHidden]=_!==T,i))},b.tsx("td",null,b.tsx("label",null,u.minLabel)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeMinPercentInput,bind:this})),b.tsx("td",null,b.tsx("label",null,u.maxLabel)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeMaxPercentInput,bind:this}))),R=b.tsx("tr",{class:this.classes((n={},n[S.stdDeviationOptionsRow]=_===P,n[S.displayHidden]=_!==P,n))},b.tsx("td",{colSpan:2},b.tsx("label",null,u.nStdDeviationsLabel)),b.tsx("td",{colSpan:2},b.tsx("div",{afterCreate:this._placeStandardDeviationsInput,bind:this}))),k=b.tsx("div",{class:this.classes((a={},a[S.displayBlock]=m===C||m===f,a[S.displayHidden]=m!==C,a))},b.tsx("div",{afterCreate:this._createStretchTitlePane,bind:this},b.tsx("table",{class:S.table},b.tsx("tr",{class:S.stretchOptionsBlock},b.tsx("td",{colSpan:2},b.tsx("label",null,u.stretchTypeLabel)),b.tsx("td",{colSpan:2},q)),w,R,b.tsx("tr",{class:this.classes((o={},o[S.stretchGammaBlock]=_!==B,o[S.displayHidden]=_===B,o))},b.tsx("td",{colSpan:2},b.tsx("label",null,u.gammaLabel)),b.tsx("td",{colSpan:2},b.tsx("div",{afterCreate:this._placeGammaInput,bind:this}))),b.tsx("tr",{class:this.classes((l={},l[S.stretchDraBlock]=_!==B,l[S.displayHidden]=_===B,l))},b.tsx("td",{colSpan:4},b.tsx("div",{class:S.checkbox,afterCreate:this._placeStretchStatisticsCheckbox,bind:this}),b.tsx("label",null,u.draStatisticsTitle)))))),U=b.tsx("div",{class:this.classes((r={},r[S.displayBlock]=m===f,r[S.displayHidden]=m!==f,r))},b.tsx("div",{afterCreate:this._createBandCombinationTitlePane,bind:this},b.tsx("table",{class:S.table},b.tsx("tr",{class:this.classes((c={},c[S.stdDeviationOptionsRow]=this._supportsBandPresets,c[S.displayHidden]=!this._supportsBandPresets,c))},b.tsx("td",null,b.tsx("label",null,u.bandCombinationPresetLabel)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeBandCombinationPresetSelect,bind:this}))),b.tsx("tr",null,b.tsx("td",null,b.tsx("label",null,u.redBandTitle)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeRedBandSelect,bind:this}))),b.tsx("tr",null,b.tsx("td",null,b.tsx("label",null,u.greenBandTitle)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeGreenBandSelect,bind:this}))),b.tsx("tr",null,b.tsx("td",null,b.tsx("label",null,u.blueBandTitle)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeBlueBandSelect,bind:this})))))),G=b.tsx("div",{class:this.classes((d={},d[S.displayBlock]=m===x,d[S.displayHidden]=m!==x,d))},b.tsx("table",{class:S.table},b.tsx("tr",null,b.tsx("td",null,b.tsx("label",null,u.valueFieldTitle)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeUniqueValueFieldSelect,bind:this}))),b.tsx("tr",null,b.tsx("td",null,b.tsx("label",null,u.colorSchemeLabel)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeUniqueValueColorSchemeSelect,bind:this}))),b.tsx("tr",null,b.tsx("td",null,b.tsx("label",null,u.noDataLabel)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeUniqueValueNoDataInput,bind:this})))),b.tsx("div",{afterCreate:this._placeUniqueValuesGrid,bind:this})),M=b.tsx("div",{class:this.classes((p={},p[S.displayBlock]=m===v,p[S.displayHidden]=m!==v,p))},b.tsx("table",{class:S.table},b.tsx("tr",null,b.tsx("td",null,b.tsx("label",null,u.colorSchemeLabel)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeDiscreteColorSchemeSelect,bind:this}))),b.tsx("tr",null,b.tsx("td",null,b.tsx("label",null,u.numberOfColors)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeDiscreteNColorsInput,bind:this}))),b.tsx("tr",null,b.tsx("td",null,b.tsx("label",null,u.noDataLabel)),b.tsx("td",null,b.tsx("div",{afterCreate:this._placeDiscreteNoDataInput,bind:this})))));return b.tsx("div",null,D,N,U,V,k,G,M)},t.prototype._createUIComponents=function(){this._createSymbologySelect(),this._createStretchStatisticsCheckbox(),this._createBandSelect(),this._createStretchTypeSelect(),this._createColorRampSelect(),this._createBandCombinationPresetSelect(),this._createRedBandSelect(),this._createGreenBandSelect(),this._createBlueBandSelect(),this._createNoDataInput(),this._createMinPercentInput(),this._createMaxPercentInput(),this._createStandardDeviationsInput(),this._createGammaInput(),this._createUniqueValueFieldSelect(),this._createUniqueValueColorSchemeSelect(),this._createUniqueValueNoDataInput(),this._createUniqueValuesGrid(),this._createDiscreteColorSchemeSelect(),this._createDiscreteNoDataInput(),this._createDiscreteNColorsInput()},t.prototype._createSymbologySelect=function(){var e=this;this._symbologySelect=new r({store:this._getSymbologyStore(),class:S.filteringSelect,labelAttr:"label",labelType:"html",onChange:function(t){return e._updateSymbologyType(t)},value:this.defaultParams.symbologyType}),this._symbologySelect.startup(),this._components.push(this._symbologySelect)},t.prototype._createStretchStatisticsCheckbox=function(){var e=this;this._stretchStatisticsCheckBox=new l({onChange:function(){return e._updateSymbology()}}),this._stretchStatisticsCheckBox.startup(),this._components.push(this._stretchStatisticsCheckBox)},t.prototype._createColorSchemeTitlePane=function(e){this._colorSchemeTitlePane=new o({title:u.colorRampTitle},e),this._colorSchemeTitlePane.startup(),this._components.push(this._colorSchemeTitlePane)},t.prototype._createNoDataTitlePane=function(e){this._noDataTitlePane=new o({title:u.backgroundTitle},e),this._noDataTitlePane.startup(),this._components.push(this._noDataTitlePane)},t.prototype._createStretchTitlePane=function(e){this._stretchTitlePane=new o({title:u.stretchTitle},e),this._stretchTitlePane.startup(),this._components.push(this._stretchTitlePane)},t.prototype._createBandCombinationTitlePane=function(e){this._bandCombinationTitlePane=new o({title:u.bandCombinationTitle},e),this._bandCombinationTitlePane.startup(),this._components.push(this._bandCombinationTitlePane)},t.prototype._createBandSelect=function(){var e=this;this._bandSelect=new r({class:S.filteringSelect,onChange:function(){return e._updateSymbology()}}),this._bandSelect.startup(),this._populateBandSelect(),this._components.push(this._bandSelect)},t.prototype._createStretchTypeSelect=function(){var e=this;this._stretchTypeSelect=new r({class:S.filteringSelect,onChange:function(t){return e._onStretchTypeChange(t)},labelAttr:"label",labelType:"html"}),this._stretchTypeSelect.startup(),this._populateStretchTypeSelect(),this._components.push(this._stretchTypeSelect)},t.prototype._createColorRampSelect=function(){var e=this;this._stretchColorRampSelect=new a({class:S.filteringSelect,maxHeight:300}),this._stretchColorRampSelect.on("change",function(){return e._updateSymbology()}),this._stretchColorRampSelect.startup(),this._stretchColorRampSelect.set("value",this.defaultParams.colorRamp),this._components.push(this._stretchColorRampSelect)},t.prototype._createBandCombinationPresetSelect=function(){var e=this;this._bandCombinationPresetSelect=new r({class:S.filteringSelect,onChange:function(t){return e._updateBandCombination(t)},labelType:"html",labelAttr:"label",maxHeight:350}),this._bandCombinationPresetSelect.startup(),this._components.push(this._bandCombinationPresetSelect)},t.prototype._createRedBandSelect=function(){var e=this;this._redBandSelect=new r({class:S.filteringSelect,onChange:function(){return e._bandCombinationChanged()}}),this._redBandSelect.startup(),this._populateBandLists(),this._components.push(this._redBandSelect)},t.prototype._createGreenBandSelect=function(){var e=this;this._greenBandSelect=new r({class:S.filteringSelect,onChange:function(){return e._bandCombinationChanged()}}),this._greenBandSelect.startup(),this._populateBandLists(),this._components.push(this._greenBandSelect)},t.prototype._createBlueBandSelect=function(){var e=this;this._blueBandSelect=new r({class:S.filteringSelect,onChange:function(){return e._bandCombinationChanged()}}),this._blueBandSelect.startup(),this._populateBandLists(),this._components.push(this._blueBandSelect)},t.prototype._createNoDataInput=function(){var e=this;this._noDataInput=new d({class:S.filteringSelect,onChange:function(){return e._updateSymbology()}}),this._noDataInput.startup(),this._components.push(this._noDataInput)},t.prototype._createMinPercentInput=function(){var e=this;this._minPercentInput=new d({class:S.filteringSelect,onChange:function(){return e._updateSymbology()},value:this.defaultParams.minPercent}),this._minPercentInput.startup(),this._components.push(this._minPercentInput)},t.prototype._createMaxPercentInput=function(){var e=this;this._maxPercentInput=new d({class:S.filteringSelect,onChange:function(){return e._updateSymbology()},value:this.defaultParams.maxPercent}),this._maxPercentInput.startup(),this._components.push(this._maxPercentInput)},t.prototype._createStandardDeviationsInput=function(){var e=this;this._standardDeviationsInput=new d({class:S.filteringSelect,onChange:function(){return e._updateSymbology()},value:this.defaultParams.numberOfStandardDeviations}),this._standardDeviationsInput.startup(),this._components.push(this._standardDeviationsInput)},t.prototype._createGammaInput=function(){var e=this;this._gammaInput=new c({class:S.filteringSelect,onChange:function(){return e._updateSymbology()},value:this.defaultParams.gamma,smallDelta:.1}),this._gammaInput.startup(),this._components.push(this._gammaInput)},t.prototype._createUniqueValueFieldSelect=function(){var e=this;this._uniqueValueFieldSelect=new r({class:S.filteringSelect,onChange:function(){return e._updateUniqueValueGrid()}}),this._populateUniqueValueFieldSelect(),this._components.push(this._uniqueValueFieldSelect)},t.prototype._createUniqueValueColorSchemeSelect=function(){var e=this;this._uniqueValueColorSchemeSelect=new a({class:S.filteringSelect,maxHeight:300}),this._uniqueValueColorSchemeSelect.on("change",function(){return e._updateUniqueValueGrid()}),this._uniqueValueColorSchemeSelect.startup(),this.defaultParams.uniqueValuesColorRamp&&(this.defaultParams.uniqueValuesColorRamp.name=u.uniqueValuesColorRampTitle,this._uniqueValueColorSchemeSelect.addColorRamp(this.defaultParams.uniqueValuesColorRamp,!0)),this._components.push(this._uniqueValueColorSchemeSelect)},t.prototype._createUniqueValueNoDataInput=function(){var e=this;this._uniqueValueNoDataInput=new d({class:S.filteringSelect,onChange:function(){return e._updateSymbology()}}),this._components.push(this._uniqueValueNoDataInput),this._uniqueValueNoDataInput.startup()},t.prototype._createDiscreteColorSchemeSelect=function(){var e=this;this._discreteColorSchemeSelect=new a({class:S.filteringSelect,maxHeight:300}),this._discreteColorSchemeSelect.on("change",function(){e._updateSymbology()}),this._discreteColorSchemeSelect.startup(),this._discreteColorSchemeSelect.set("value",this.defaultParams.colorRamp),this._components.push(this._discreteColorSchemeSelect)},t.prototype._createDiscreteNoDataInput=function(){var e=this;this._discreteNoDataInput=new d({class:S.filteringSelect,onChange:function(){return e._updateSymbology()}}),this._discreteNoDataInput.startup(),this._components.push(this._discreteNoDataInput)},t.prototype._createDiscreteNColorsInput=function(){var e=this;this._discreteNColorsInput=new d({class:S.filteringSelect,onChange:function(){return e._updateSymbology()},value:this.defaultParams.discreteNColors}),this._discreteNColorsInput.startup(),this._components.push(this._discreteNColorsInput)},t.prototype._createUniqueValuesGrid=function(){this._uniqueValuesGrid=new n({columns:[{field:"esriRasterSymbologyEditorUniqueValueSymbol",renderCell:function(e,t,s){s.innerHTML="<div class = "+S.dgridSymbolCell+'\n          style = "background: rgb( '+e.esriRasterSymbologyEditorUniqueValueSymbol.r+",\n          "+e.esriRasterSymbologyEditorUniqueValueSymbol.g+",\n          "+e.esriRasterSymbologyEditorUniqueValueSymbol.b+'");></div>'},label:u.symbolLabel},{field:"esriRasterSymbologyEditorUniqueValueValue",label:u.valueLabel}]}),this._uniqueValuesGrid.startup(),this._components.push(this._uniqueValuesGrid)},t.prototype._placeSymbologySelect=function(e){this._symbologySelect&&e.appendChild(this._symbologySelect.domNode)},t.prototype._placeStretchStatisticsCheckbox=function(e){this._stretchStatisticsCheckBox&&e.appendChild(this._symbologySelect.domNode)},t.prototype._placeBandSelect=function(e){this._bandSelect&&e.appendChild(this._bandSelect.domNode)},t.prototype._placeStretchTypeSelect=function(e){this._stretchTypeSelect&&e.appendChild(this._stretchTypeSelect.domNode)},t.prototype._placeColorRampSelect=function(e){this._stretchColorRampSelect&&e.appendChild(this._stretchColorRampSelect.domNode)},t.prototype._placeBandCombinationPresetSelect=function(e){this._bandCombinationPresetSelect&&e.appendChild(this._bandCombinationPresetSelect.domNode)},t.prototype._placeRedBandSelect=function(e){this._redBandSelect&&e.appendChild(this._redBandSelect.domNode)},t.prototype._placeGreenBandSelect=function(e){this._colorSchemeTitlePane&&e.appendChild(this._greenBandSelect.domNode)},t.prototype._placeBlueBandSelect=function(e){this._blueBandSelect&&e.appendChild(this._blueBandSelect.domNode)},t.prototype._placeNoDataInput=function(e){this._noDataInput&&e.appendChild(this._noDataInput.domNode)},t.prototype._placeMinPercentInput=function(e){this._minPercentInput&&e.appendChild(this._minPercentInput.domNode)},t.prototype._placeMaxPercentInput=function(e){this._maxPercentInput&&e.appendChild(this._maxPercentInput.domNode)},t.prototype._placeStandardDeviationsInput=function(e){this._standardDeviationsInput&&e.appendChild(this._standardDeviationsInput.domNode)},t.prototype._placeGammaInput=function(e){this._gammaInput&&e.appendChild(this._gammaInput.domNode)},t.prototype._placeUniqueValueFieldSelect=function(e){this._uniqueValueFieldSelect&&e.appendChild(this._uniqueValueFieldSelect.domNode)},t.prototype._placeUniqueValueColorSchemeSelect=function(e){this._uniqueValueColorSchemeSelect&&e.appendChild(this._uniqueValueColorSchemeSelect.domNode)},t.prototype._placeUniqueValueNoDataInput=function(e){this._uniqueValueNoDataInput&&e.appendChild(this._uniqueValueNoDataInput.domNode)},t.prototype._placeUniqueValuesGrid=function(e){this._uniqueValuesGrid&&e.appendChild(this._uniqueValuesGrid.domNode)},t.prototype._placeDiscreteColorSchemeSelect=function(e){this._discreteColorSchemeSelect&&e.appendChild(this._discreteColorSchemeSelect.domNode)},t.prototype._placeDiscreteNoDataInput=function(e){this._discreteNoDataInput&&e.appendChild(this._discreteNoDataInput.domNode)},t.prototype._placeDiscreteNColorsInput=function(e){this._discreteNColorsInput&&e.appendChild(this._discreteNColorsInput.domNode)},t.prototype._bandCombinationChanged=function(){this._redBandSelect&&this._redBandSelect.validate()&&this._greenBandSelect&&this._greenBandSelect.validate()&&this._blueBandSelect&&this._blueBandSelect.validate()&&this._updateSymbology()},t.prototype._updateBandCombination=function(e){if("custom"===e)return this._redBandSelect.set("disabled",!1),this._greenBandSelect.set("disabled",!1),void this._blueBandSelect.set("disabled",!1);var t,s=this._bandCombinationPresetSelect.store.data;s.some(function(s){e===s.id&&(t=s.combination)}),t&&(this._redBandSelect.set({value:t[0]-1,disabled:!0}),this._greenBandSelect.set({value:t[1]-1,disabled:!0}),this._blueBandSelect.set({value:t[2]-1,disabled:!0}),this._updateSymbology())},t.prototype._updateSymbologyType=function(e){this.symbologyType=e,this._updateSymbology()},t.prototype._updateUniqueValueGrid=function(){var e=this.viewModel.getUniqueValueGridData(this._uniqueValueColorSchemeSelect.colorRamp,this._uniqueValueFieldSelect.value);e&&(this._uniqueValuesGrid.refresh(),this._uniqueValuesGrid.renderArray(e),this._uniqueValuesSymbolData=e,this._updateSymbology())},t.prototype._populateUniqueValueFieldSelect=function(){var e=this.viewModel.getUniqueValueFields(),t=new p({data:e,idProperty:"name"});this._uniqueValueFieldSelect.set({store:t,labelAttr:"alias",value:this.defaultParams.uniqueValuesField})},t.prototype._populateStretchTypeSelect=function(){var e,t,s,i=h.clone(this.viewModel.stretchTypes);i.forEach(function(i){e=u[i.name+"StretchTypeDescription"]||u[i.name+"TypeDescription"],s=S[i.name+"StretchTypeIcon"],t=u[i.name+"StretchTitle"],i.id=i.filterType.toString(),i.label="<html><body><section>\n        <h4>"+t+"</h4>\n        <table><tr>\n          <td class="+S.menuItemTd+'>\n            <img class="'+s+" "+S.thumbnailImage+'" />\n          </td>\n          <td class='+S.menuItemTd+">\n            <p class="+S.menuItemText+"><i>"+e+"</i></p>\n          </td>\n          </tr></table>\n        </section></body></html>",i.name=t}),this._stretchTypeSelect.set({store:new p({data:i}),value:this.defaultParams.stretchType.toString(),labelAttr:"label",labelType:"html"})},t.prototype._populateBandSelect=function(){var e,t=this;this.viewModel.getBandData().then(function(s){e=new p({data:s.lists[0],idProperty:"index"}),t._bandSelect.set("store",e),1===s.lists[0].length&&t._bandSelect.set({value:s.lists[0][0].index,disabled:!0})})},t.prototype._populateBandLists=function(){var e=this;if(this._redBandSelect&&this._greenBandSelect&&this._blueBandSelect&&this._bandCombinationPresetSelect){var t,s,i,n,a,o,l,r=[this._redBandSelect,this._greenBandSelect,this._blueBandSelect],c=[];this.viewModel.getBandData().then(function(d){d.lists.forEach(function(e,t){e.some(function(e){return!!e.selected&&(s=e.index,!0)}),i=new p({data:e,idProperty:"index"}),r[t].set({store:i,value:s})}),d.presets&&d.presets.length?(e._supportsBandPresets=!0,d.presets.forEach(function(e,s){t=Object.keys(e)[0],a=u["bandComboName"+t],o=u["bandComboDesc"+t],l=S["bandCombinationPreset"+t+"Icon"],c.push({name:u["bandComboName"+t],label:"<html><body><section>\n              <h4>"+a+"</h4>\n              <table><tr>\n                <td class="+S.menuItemTd+'>\n                  <img class= "'+l+" "+S.thumbnailImage+'" />\n                </td>\n                <td class='+S.menuItemTd+">\n                  <p class="+S.menuItemText+"><i>"+o+"</i></p>\n                </td>\n              </tr></table>\n            </section></body></html>",combination:e[t],id:t})}),c.push({name:u.bandComboNameCustom,combination:null,id:"custom",label:"<html><body><section>\n            <h4> "+u.bandComboNameCustom+":</h4>\n            <table cellspacing='5'>\n              <tr>\n                <td class="+S.menuItemTd+">\n                  <p class="+S.menuItemText+"><i>"+u.bandComboNameCustom+"</i></p>\n                </td>\n              </tr>\n            </table>\n          </section></body></html>"}),n=new p({data:c}),e._bandCombinationPresetSelect.set({store:n,value:"custom"})):e._supportsBandPresets=!1,e.scheduleRender()})}},t.prototype._onStretchTypeChange=function(e){var t;this._stretchTypeSelect.store.data.forEach(function(s){s.id===e&&(t=s.filterType)}),this.stretchType=t,this.scheduleRender(),this._updateSymbology()},t.prototype._updateSymbology=function(){if(this._symbologySelect&&this._stretchTypeSelect&&this._stretchColorRampSelect&&this._noDataInput&&this._minPercentInput&&this._maxPercentInput&&this._stretchTypeSelect&&this._gammaInput&&this._standardDeviationsInput){var e=this._getProperties();this.viewModel.updateRendering(e)}},t.prototype._getProperties=function(){var e={};return e.symbologyType=this._symbologySelect.value,e.stretchType=this.stretchType,e.minPercent=this._minPercentInput.value,e.maxPercent=this._maxPercentInput.value,e.numberOfStandardDeviations=this._standardDeviationsInput.value,this.symbologyType===y.SymbologyTypes.uniqueValue?e.noData=this._uniqueValueNoDataInput.value:this.symbologyType===y.SymbologyTypes.discrete?e.noData=this._discreteNoDataInput.value:e.noData=this._noDataInput.value,e.gamma=this._gammaInput.value,e.colorRampName=this._stretchColorRampSelect.colorRampName,e.dra=this._stretchStatisticsCheckBox.checked,e.selectedBand=this._bandSelect.value,e.bandIds=[this._redBandSelect.value,this._greenBandSelect.value,this._blueBandSelect.value],e.uniqueValuesColorRamp=this._uniqueValueColorSchemeSelect.colorRamp,e.uniqueValuesSymbolData=this._uniqueValuesSymbolData,e.discreteColorRamp=this._discreteColorSchemeSelect.colorRamp,e.discreteNColors=this._discreteNColorsInput.value,e},t.prototype._getSymbologyStore=function(){var e,t,s,i=this.viewModel.getSymbologyTypes(),n=[];return i.forEach(function(i){e=u[i+"Title"],t=u[i+"Description"]||u[i+"Title"],s=S[i+"SymbologyTypeIcon"],n.push({id:i,name:e,label:"<html><body><section>\n          <h4>"+e+"</h4>\n          <table><tr>\n            <td class="+S.menuItemTd+"><img class= "+s+" /></td>\n            <td class="+S.menuItemTd+">\n              <p class="+S.menuItemText+"><i>"+t+"</i></p>\n            </td>\n          </tr></table>\n        </section></body></html>"})},this),new p({data:n})},i([m.property(),b.renderable()],t.prototype,"layer",void 0),i([m.property()],t.prototype,"defaultParams",void 0),i([m.property({type:y})],t.prototype,"viewModel",void 0),i([m.property(),b.renderable()],t.prototype,"stretchType",void 0),i([m.property(),b.renderable()],t.prototype,"symbologyType",void 0),t=i([m.subclass("esri.widgets.RasterSymbologyEditor")],t)}(m.declared(_))});