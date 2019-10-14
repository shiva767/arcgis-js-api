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

define(["../Color","./ColorPicker/HexPalette","./support/colorUtils","./Widgette","../intl","@dojo/framework/shim/array","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/a11yclick","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on","dojo/i18n!./ColorPicker/nls/ColorPicker","dojo/text!./ColorPicker/templates/ColorPicker.html","dojo/NodeList-dom"],function(t,e,s,o,r,i,a,l,n,c,h,d,u,_,p){var g={root:"esri-color-picker",container:"esri-container",header:"esri-menu__header",footer:"esri-footer",middle:"esri-middle",swatch:"esri-swatch",swatchRow:"esri-swatch-row",swatchEmpty:"esri-swatch-empty",swatchPreview:"esri-swatch-preview",swatchTransparencyBackground:"esri-swatch-transparency-background",palette:"esri-palette",paletteOptions:"esri-palette-options",paletteToggle:"esri-palette-toggle",label:"esri-label",hexInput:"esri-hex-input",recent:"esri-recent",suggested:"esri-suggested",selected:"esri-selected",disabled:"esri-disabled",section:"esri-section",transparencySlider:"esri-transparency-slider",ticks:"esri-color-picker-ticks",alt:"esri-alt",hidden:"esri-hidden"};return o.createSubclass([a,l],{declaredClass:"esri.widgets.ColorPicker",templateString:p,labels:_,baseClass:g.root,css:g,constructor:function(t){t=t||{},this._brightsPalette=new e({colors:t.palette}),this._pastelsPalette=new e({colors:this._toPastels(this._brightsPalette.colors)}),this._activePalette=this._brightsPalette,this._swatches={}},postCreate:function(){this._createPalettes(),this.required||(this._noColorSwatchNode=h.create("div",{className:g.swatch+" "+g.swatchEmpty},this.dap_hexInput,"after")),this._addTicks(this.dap_ticks),c.toggle(this.dap_transparencySection,g.hidden,!this.showTransparencySlider),c.toggle(this.dap_recentColorSection,g.hidden,!this.showRecentColors),c.toggle(this.dap_suggestedColorSection,g.hidden,!this.showSuggestedColors),this.inherited(arguments),this._addListeners(),this._selectColor()},_activePalette:null,_brightsPalette:null,_pastelsPalette:null,_swatches:null,_noColorSwatchNode:null,_previousColor:null,properties:{color:{value:null,get:function(){var e=this._get("color");return null===e?null:new t(e)},set:function(e,o){e=e||null,o=o||void 0===o;var r=this._noColorSwatchNode;if(!this.required){if(null===e)return this._set("color",null),this._previousColor=null,this.dap_transparencySlider.value=0,this._disableTransparencySlider(),this._clearSelection(),this._updateHexInput(null),this._updatePreviewSwatch(e),r&&r.classList.add(g.selected),void(o&&this.emit("color-change",{color:null}));this._enableTransparencySlider(),r&&r.classList.remove(g.selected)}var i,a=s.normalizeColor(e),l=this._previousColor;if(l){if(s.equal(l,a))return;var n=this._findColorSwatch(l);n&&(c.remove(n,g.selected),d.set(n,"borderColor",""))}i=new t(a),this._set("color",i),this._previousColor=a,this.dap_transparencySlider.value=1-i.a,this._updatePreviewSwatch(i),this._checkSelection(),this._updateHexInput(i),this.trackColors&&this._addRecentColor(i.toHex()),o&&this.emit("color-change",{color:new t(i)})}},colorsPerRow:{value:13,set:function(t){var e=t>0?t:13;this._set("colorsPerRow",e)}},palette:{set:function(t){var e=this._activePalette===this._brightsPalette;this._brightsPalette.colors=t,this._pastelsPalette.colors=this._toPastels(this._brightsPalette.colors),this._activePalette=e?this._brightsPalette:this._pastelsPalette,this._createPalettes(),this._togglePalette(!e)}},recentColors:{value:[],get:function(){return this._get("recentColors").map(function(t){return s.normalizeColor(t)})},set:function(t){var e=t||[];this.showRecentColors&&(e=e.map(function(t){return s.normalizeColor(t).toHex()})),this._set("recentColors",e),0===e.length?this._clearRecentSwatches():this._renderRecentSwatches()}},required:!1,showRecentColors:!0,showSuggestedColors:!1,showTransparencySlider:!0,suggestedColors:{value:null,get:function(){return this._get("suggestedColors").map(function(t){return s.normalizeColor(t)})},set:function(t){if(this.showSuggestedColors){this._clearSuggestedSwatches();var e=t||[];e=e.map(function(t){return s.normalizeColor(t).toHex()}),this._set("suggestedColors",e),e.length>0&&this._renderSuggestedSwatches()}}},trackColors:!0},addRecentColor:function(t){t&&null!==t&&this._addRecentColor(s.normalizeColor(t).toHex())},saveRecentColors:function(t){localStorage.setItem(t,JSON.stringify(this.get("recentColors")))},loadRecentColors:function(t){this.set("recentColors",JSON.parse(localStorage.getItem(t)))},_addTicks:function(t){var e=[0,.5,1],s=document.createDocumentFragment();e.forEach(function(t){h.create("span",{innerHTML:r.formatNumber(t,{style:"percent"})},s)}),t.appendChild(s)},_toPastels:function(e){var s=new t([238,238,238]);return e.map(function(e){return t.blendColors(new t(e),s,.2)})},_createSwatch:function(t){var e=t.className,s=t.hexColor||"transparent",o=t.paletteNode;return h.create("span",{className:e,style:{backgroundColor:s}},o)},_createSwatches:function(t,e){var s;e.colors.forEach(function(e,o){var r;o%this.colorsPerRow==0&&(s=h.create("div",{className:g.swatchRow},t)),r=this._createSwatch({className:g.swatch,hexColor:e,paletteNode:s}),this._swatches[e]=r},this)},_selectColor:function(){this.set("color",this.required?this.color||this._activePalette.colors[0]:this.color)},_setColorWithCurrentAlpha:function(t){null!==t&&null!==this.color&&(t=s.normalizeColor(t),t.a=this.color.a),this.set("color",t)},_updatePreviewSwatch:function(t){var e,o=this.dap_previewSwatch;if(null===t)return c.add(o,g.swatchEmpty),void d.set(o,{backgroundColor:"",borderColor:""});e=s.getContrastingColor(t),c.remove(o,g.swatchEmpty),d.set(o,{backgroundColor:t.toCss(!0),borderColor:e.toCss(!0)})},_showBrights:function(){c.remove(this.dap_paletteContainer,g.alt),this._activePalette=this._brightsPalette},_showPastels:function(){c.add(this.dap_paletteContainer,g.alt),this._activePalette=this._pastelsPalette},_setColorFromSwatch:function(t){var e=d.get(t,"backgroundColor");this._setColorWithCurrentAlpha(e)},_checkSelection:function(){var t=this.get("color");this._activePalette.contains(t)?this._highlightColor(t):this._clearSelection()},_addListeners:function(){var t="."+g.swatch;this.own(u(this.dap_paletteContainer,u.selector(t,"click"),function(t){this._setColorFromSwatch(t.target)}.bind(this)),u(this.dap_recentColorPalette,u.selector(t,"click"),function(t){this._setColorFromSwatch(t.target)}.bind(this)),u(this.dap_suggestedColorPalette,u.selector(t,"click"),function(t){this._setColorFromSwatch(t.target)}.bind(this))),this.required||this.own(u(this._noColorSwatchNode,"click",function(){this.set("color",null)}.bind(this)));var e=this.dap_hexInput;u(e,"blur",function(){var t=s.normalizeHex(e.value);if(s.isShorthandHex(t))return void this._setColorWithCurrentAlpha(t);this._updateHexInput(this.color)}.bind(this)),u(e,"change",function(){var t=s.normalizeHex(e.value);s.isLonghandHex(t)&&this.color.toHex()!==t&&this._setColorWithCurrentAlpha(t)}.bind(this)),u(this.dap_transparencySlider,"change, input",function(t){var e,o=this.get("color");null!==o&&(e=s.normalizeColor(o),e.a=1-t.target.value,this._updatePreviewSwatch(e),this._updateHexInput(e),this.set("color",e))}.bind(this)),u(this.dap_paletteToggle,n,function(t){var e="true"===t.target.getAttribute("aria-pressed");this._togglePalette(!e)}.bind(this))},_togglePalette:function(t){this.dap_paletteToggle.setAttribute("aria-pressed",t),t?this._showPastels():this._showBrights(),this._checkSelection()},_createPalettes:function(){this._swatches={},h.empty(this.dap_primaryPalette),h.empty(this.dap_secondaryPalette),this._createSwatches(this.dap_primaryPalette,this._brightsPalette),this._createSwatches(this.dap_secondaryPalette,this._pastelsPalette)},_updateHexInput:function(t){this.dap_hexInput.value=null===t?"":t.toHex()},_addRecentColor:function(t){if(t){var e=this.recentColors,s=e.indexOf(t);s>-1&&e.splice(s,1),e.unshift(t),e.length>this.colorsPerRow&&e.pop(),this._renderRecentSwatches()}},_renderRecentSwatches:function(){if(this.recentColors){var t=i.from(this.dap_recentColorPalette.getElementsByClassName(g.recent+" "+g.swatch));this.recentColors.forEach(function(e,s){if(s<this.colorsPerRow){if(s+1>t.length){var o=this._createSwatch({hexColor:e,className:g.swatch+" "+g.recent,paletteNode:this.dap_recentColorPalette});t.push(o)}d.set(t[s],"backgroundColor",e)}},this)}},_renderSuggestedSwatches:function(){if(this.suggestedColors){var t=i.from(this.dap_recentColorPalette.getElementsByClassName(g.suggested+" "+g.swatch));this.suggestedColors.forEach(function(e,s){if(s<this.colorsPerRow){if(s+1>t.length){var o=this._createSwatch({hexColor:e,className:g.swatch+" "+g.suggested,paletteNode:this.dap_suggestedColorPalette});t.push(o)}d.set(t[s],"backgroundColor",e)}},this)}},_clearRecentSwatches:function(){h.empty(this.dap_recentColorPalette)},_clearSuggestedSwatches:function(){h.empty(this.dap_suggestedColorPalette)},_clearSelection:function(){var t=this.dap_paletteContainer.getElementsByClassName(g.selected)[0];t&&t.classList.remove(g.selected)},_highlightColor:function(t){var e,o=this._findColorSwatch(t);o&&(t=s.normalizeColor(t),e=s.getContrastingColor(t),c.add(o,g.selected),d.set(o,"borderColor",e.toHex()))},_findColorSwatch:function(t){var e,o=this._activePalette.colors,r=s.toHex(t);return o.indexOf(r)>-1&&(e=this._swatches[r]),e},_enableTransparencySlider:function(){this.dap_transparencySlider.disabled=!1},_disableTransparencySlider:function(){this.dap_transparencySlider.disabled=!0}})});