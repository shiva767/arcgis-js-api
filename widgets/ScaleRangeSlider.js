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

define(["require","exports","../core/tsSupport/decorateHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/assignHelper","dojo/i18n!./ScaleRangeSlider/nls/ScaleRangeSlider","../intl","../core/domUtils","../core/events","../core/HandleOwner","../core/watchUtils","../core/accessorSupport/decorators","../libs/sanitizer/Sanitizer","./Slider","./Widget","./ScaleRangeSlider/scalePreviewUtils","./ScaleRangeSlider/ScaleRanges","./ScaleRangeSlider/ScaleRangeSliderViewModel","./support/Popover","./support/widget"],function(e,a,l,t,n,i,r,c,s,o,u,d,p,m,v,S,_,h,g,M){var f={base:"esri-scale-range-slider",scaleIndicator:"esri-scale-range-slider__scale-indicator",scaleIndicatorIcon:"esri-scale-range-slider__scale-indicator-icon",scaleIndicatorContainer:"esri-scale-range-slider__scale-indicator-container",scaleMenuContainer:"esri-scale-range-slider__scale-menu-container",scaleMenuToggle:"esri-scale-range-slider__scale-menu-toggle",scaleMenuToggleIcon:"esri-scale-range-slider__scale-menu-toggle-icon",scaleMenuToggleActive:"esri-scale-range-slider__scale-menu-toggle--active",scaleMenu:"esri-scale-range-slider__scale-menu",scaleMenuList:"esri-scale-range-slider__scale-menu-list",scaleMenuListItem:"esri-scale-range-slider__scale-menu-item",scaleMenuListItemActive:"esri-scale-range-slider__scale-menu-item--active",scaleMenuScroller:"esri-scale-range-slider__scale-menu-scroller",scaleItemLabel:"esri-scale-range-slider__scale-item-label",scaleItemValue:"esri-scale-range-slider__scale-item-value",scaleItemValueEditable:"esri-scale-range-slider__scale-item-value--editable",scalePreview:"esri-scale-range-slider__scale-preview",scalePreviewThumbnail:"esri-scale-range-slider__scale-preview-thumbnail",slider:"esri-slider",expandIcon:"esri-icon-down",heading:"esri-widget__heading",hidden:"esri-hidden",input:"esri-input",button:"esri-button",disabled:"esri-disabled",widget:"esri-widget"},y=new p,w={preview:!0},b=function(e){return"1:"+r.formatNumber(e)},x=function(e){var a=/[^0-9.\s]/g,l=y.sanitize(e).replace(/.*\(/,"").replace(/\).*$/,"").replace(/.*:/,"").replace(a,"");return parseFloat(l)};return function(e){function a(a){var l=e.call(this,a)||this;return l._activeMenu=null,l._activeMenuNode=null,l._activeMenuToggleNode=null,l._activeThumb=null,l._customMaxScale=-1,l._customMinScale=-1,l._focusedMenuItemIndex=-1,l._previewAutoCloseTimeoutId=null,l._previewPopover=new g({owner:l,placement:"top",anchorElement:function(){return 0===l._activeThumb?l._minThumbNode:l._maxThumbNode},renderContentFunction:l.renderScalePreview}),l._maxScaleMenuPopover=new g({owner:l,placement:"bottom-end",anchorElement:function(){return l._activeMenuToggleNode},renderContentFunction:l.renderMaxScaleMenu}),l._minScaleMenuPopover=new g({owner:l,placement:"bottom-start",anchorElement:function(){return l._activeMenuToggleNode},renderContentFunction:l.renderMinScaleMenu}),l._scaleMenuNode=null,l._slider=new m({thumbCreatedFunction:function(e,a,t){0===e&&(l._minThumbNode=t),1===e&&(l._maxThumbNode=t),l.own([s.on(t,"mouseenter",function(){l._activeThumb=e,l._previewPopover.open=!0,l.scheduleRender()}),s.on(t,"mouseleave",function(){l._previewAutoCloseTimeoutId||(l._activeThumb=null,l._previewPopover.open=!1,l.scheduleRender())})])}}),l.disabled=!1,l.label=i.widgetLabel,l.layer=null,l.maxScale=null,l.maxScaleLimit=null,l.minScale=null,l.minScaleLimit=null,l.region="US",l.view=null,l.viewModel=new h,l.visibleElements=w,l._handleScaleMenuToggleClick=function(e){var a=e.currentTarget,t=a.getAttribute("data-type"),n="menu-closing-click-handle";if(l.handles.remove(n),t===l._activeMenu)return l._setActiveMenu(null),void(l._activeMenuToggleNode=null);l._setActiveMenu(t),l._activeMenuToggleNode=a,l.handles.add(s.on(document,"mousedown",function(e){var a=e.target,t=c.closest(a,"."+f.scaleMenuToggle),i=t&&t.getAttribute("data-type");t&&i===l._activeMenu||!i&&l._scaleMenuNode&&!l._scaleMenuNode.contains(a)&&(l._setActiveMenu(null),l.handles.remove(n),l.scheduleRender())}),n)},l._afterMenuListCreate=function(e){l._activeMenuNode=e,e.children[0].focus({preventScroll:!0})},l._handleCustomScaleEntry=function(e){l._setScaleFromMenuSelection(e),l._customMaxScale=-1,l._customMinScale=-1},l._handleCustomScaleInputBlur=function(){"max"===l._activeMenu?l._customMaxScale=-1:l._customMinScale=-1},l.handleCustomScaleInputKeyDown=function(e){var a=e.currentTarget,t=a["data-render-props"].handleCustomScaleSelect,n=e.key,i=l.viewModel.scaleRanges;if("Enter"===n){var r=x(a.value);t(isNaN(r)?-1:i.clampScale(r)),e.preventDefault(),e.stopPropagation()}},l._handleScaleMenuKeyDown=function(e){var a=s.eventKey(e);if("Escape"===a||"Tab"===a)return l._setActiveMenu(null),void l._activeMenuToggleNode.focus();if("ArrowUp"===a||"ArrowDown"===a){var t=l._activeMenuNode.children,n=l._focusedMenuItemIndex,i="ArrowUp"===a?(0===n?t.length:n)-1:(n+1)%t.length;e.preventDefault(),e.stopPropagation(),t[i].focus(),l._focusedMenuItemIndex=i}},l}return t(a,e),a.prototype.postInitialize=function(){var e=this;this.own([u.init(this,"viewModel",function(a){return e._slider.viewModel=a?a.sliderViewModel:null}),u.init(this,"_interactive",function(a){e._slider.disabled=!a,a||e._setActiveMenu(null)}),this._slider.on("thumb-drag",function(a){var l=a.index;e._activeThumb=l,e._previewPopover.open=!0,clearTimeout(e._previewAutoCloseTimeoutId);e._previewAutoCloseTimeoutId=setTimeout(function(){e._previewAutoCloseTimeoutId=null,e._activeThumb=null,e._previewPopover.open=!1,e.scheduleRender()},250)}),u.whenTrue(this,"view.stationary",function(){return e.scheduleRender()})])},a.prototype.destroy=function(){this._previewPopover.destroy(),this._previewPopover=null,this._maxScaleMenuPopover.destroy(),this._maxScaleMenuPopover=null,this._minScaleMenuPopover.destroy(),this._minScaleMenuPopover=null,this._slider.destroy(),this._slider=null},Object.defineProperty(a.prototype,"_effectiveMaxScale",{get:function(){return 0===this.maxScale?this.maxScaleLimit:this.maxScale},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"_effectiveMinScale",{get:function(){return 0===this.minScale?this.minScaleLimit:this.minScale},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"_interactive",{get:function(){return"disabled"!==this.get("viewModel.state")&&!this.disabled},enumerable:!0,configurable:!0}),a.prototype.castVisibleElements=function(e){return n({},w,e)},a.prototype.render=function(){var e=this,a=e._interactive,l=e._slider,t=e.label,n=e.view,r=e.viewModel,c=r.scaleRanges,s=r.state,o=i.scaleRangeLabels[c.findScaleRangeByIndex(l.values[0]).id],u=i.scaleRangeLabels[c.findScaleRangeByIndex(l.values[1]).id];return l.layout=M.isRTL()?"horizontal-reversed":"horizontal",M.tsx("div",{"aria-label":t,class:this.classes(f.base,f.widget,a?null:f.disabled)},"ready"===s&&n?this.renderCurrentScaleIndicator():null,l.render(),M.tsx("div",{class:f.scaleMenuContainer,key:"scale-menu-toggles"},this.renderScaleMenuToggle("min",o),this.renderScaleMenuToggle("max",u)))},a.prototype.renderMinScaleMenu=function(){var e=this,a=e._effectiveMaxScale,l=e.minScaleLimit,t=e.view,n=e.viewModel.scaleRanges,i=t?t.scale:void 0;return this.renderScaleMenu({type:"min",min:l,max:n.findScaleRange(a).minScale,map:i})},a.prototype.renderMaxScaleMenu=function(){var e=this,a=e._effectiveMinScale,l=e.maxScaleLimit,t=e.view,n=e.viewModel.scaleRanges,i=t?t.scale:void 0;return this.renderScaleMenu({type:"max",min:n.findScaleRange(a).maxScale,max:l,map:i})},a.prototype.renderScalePreview=function(){var e=this,a=e._activeThumb,l=e._slider,t=e.region,n=e.viewModel.scaleRanges,i=0===a?l.values[0]:l.values[1],r=Object.keys(_.RecommendedScales).indexOf(n.findScaleRangeByIndex(i).id),c={backgroundImage:S.getScalePreviewSource(t),backgroundPosition:S.getScalePreviewSpriteBackgroundPosition(r)};return M.tsx("div",{class:f.scalePreview},M.tsx("div",{class:f.scalePreviewThumbnail,styles:c}))},a.prototype.renderScaleMenu=function(e){var a=this,l=e.map,t=e.min,n=e.max,r=e.type,c=_.fromScaleRange({minScale:t,maxScale:n}),s=i.featuredScaleLabels,o=_.RecommendedScales,u=Object.keys(o).filter(function(e){return c.contains(o[e])}).map(function(e){return a.renderScaleMenuItem({scaleLabel:s[e],scaleValue:o[e],valueVisible:"world"!==e,handleNamedScaleSelect:a._handleRecommendedScaleClick})}),d=this,p=d._customMaxScale,m=d._customMinScale,v="max"===r?p:m;return M.tsx("div",{bind:this,class:f.scaleMenu,"data-type":r,id:this.id+"__scale-menu--"+r,key:r+"-scale-menu",afterCreate:M.storeNode,"data-node-ref":"_scaleMenuNode",onkeydown:this._handleScaleMenuKeyDown},M.tsx("div",{class:f.scaleMenuScroller},M.tsx("ul",{class:f.scaleMenuList,afterCreate:this._afterMenuListCreate},this.renderScaleMenuItem({scaleValue:v,scaleLabel:i.featuredScaleLabels.custom,valueVisible:!1,handleNamedScaleSelect:this._handleScaleSelection,handleCustomScaleSelect:this._handleCustomScaleEntry}),null!=l?this.renderScaleMenuItem({scaleValue:l,scaleLabel:i.featuredScaleLabels.current,valueVisible:!0,handleNamedScaleSelect:this._handleRecommendedScaleClick}):null,u)))},a.prototype._handleScaleSelection=function(){"max"===this._activeMenu?this._customMaxScale=this._effectiveMaxScale:this._customMinScale=this._effectiveMinScale},a.prototype.renderScaleMenuToggle=function(e,a){var l=this,t=l._activeMenu,n=l._interactive,i=t===e;return M.tsx("button",{"aria-controls":i?this.id+"__scale-menu--"+e:"","aria-pressed":i?"true":"false",class:this.classes(f.scaleMenuToggle,i?f.scaleMenuToggleActive:null),"data-type":e,key:e+"-scale-menu-toggle",onclick:this._handleScaleMenuToggleClick,disabled:!n},a,M.tsx("span",{class:this.classes(f.scaleMenuToggleIcon,f.expandIcon),"aria-hidden":"true"}))},a.prototype.renderScaleMenuItem=function(e){var a=e.scaleValue,l=e.scaleLabel,t=e.valueVisible,n=e.handleNamedScaleSelect,i=e.handleCustomScaleSelect,r=void 0===i?null:i,c=this.id,s=c+"__custom-scale-input";return M.tsx("li",{bind:this,class:f.scaleMenuListItem,"data-scale":a,key:l,onclick:n,onkeydown:n,tabIndex:-1},M.tsx("label",{class:f.scaleItemLabel,for:s},l),a>-1?r?M.tsx("input",{afterCreate:this.focusAndSelectInputOnCreate,class:this.classes(f.scaleItemValue,f.scaleItemValueEditable),"data-render-props":e,id:s,key:"value",value:b(a),onkeydown:this.handleCustomScaleInputKeyDown,onblur:this._handleCustomScaleInputBlur}):t?M.tsx("div",{class:f.scaleItemValue,key:"value"},b(a)):null:null)},a.prototype.focusAndSelectInputOnCreate=function(e){e.focus(),e.select()},a.prototype.renderCurrentScaleIndicator=function(){var e=this,a=e._slider,l=e.view,t=e.viewModel.scaleRanges,n=t.clampScale(l.scale),c=this.viewModel.mapScaleToSlider(n),s=c/a.max,o=i.scaleRangeLabels[t.findScaleRangeByIndex(c).id],u=r.substitute(i.currentScaleTooltip,{scaleLabel:o});return M.tsx("div",{class:f.scaleIndicatorContainer,key:"scale-indicator"},M.tsx("div",{"aria-label":u,class:f.scaleIndicator,styles:{left:(M.isRTL()?-1:1)*s*100+"%"},title:u},this.renderCurrentScaleIndicatorIcon()))},a.prototype.renderCurrentScaleIndicatorIcon=function(){return M.tsx("svg",{class:f.scaleIndicatorIcon,height:"8",width:"8",viewBox:"0 0 8 8",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},M.tsx("polygon",{points:"4 0 8 8 0 8"}))},a.prototype._handleRecommendedScaleClick=function(e){var a=e.currentTarget,l=Number(a["data-scale"]);this._setScaleFromMenuSelection(l)},a.prototype._setScaleFromMenuSelection=function(e){"max"===this._activeMenu?this.maxScale=Math.min(e,this._effectiveMinScale-1):this.minScale=Math.max(e,this._effectiveMaxScale+1),this._setActiveMenu(null)},a.prototype._setActiveMenu=function(e){this._activeMenu=e,this._maxScaleMenuPopover.open="max"===e,this._minScaleMenuPopover.open="min"===e,this._focusedMenuItemIndex=e?0:-1},l([d.property()],a.prototype,"_slider",void 0),l([d.property({dependsOn:["viewModel.maxScaleLimit","viewModel.maxScale"]})],a.prototype,"_effectiveMaxScale",null),l([d.property({dependsOn:["viewModel.minScaleLimit","viewModel.minScale"]})],a.prototype,"_effectiveMinScale",null),l([d.property({dependsOn:["disabled","viewModel.state"],readOnly:!0})],a.prototype,"_interactive",null),l([d.property(),M.renderable()],a.prototype,"disabled",void 0),l([d.property()],a.prototype,"label",void 0),l([d.property({aliasOf:"viewModel.layer"})],a.prototype,"layer",void 0),l([d.property({aliasOf:"viewModel.maxScale"})],a.prototype,"maxScale",void 0),l([d.property({aliasOf:"viewModel.maxScaleLimit"})],a.prototype,"maxScaleLimit",void 0),l([d.property({aliasOf:"viewModel.minScale"})],a.prototype,"minScale",void 0),l([d.property({aliasOf:"viewModel.minScaleLimit"})],a.prototype,"minScaleLimit",void 0),l([d.property(),M.renderable()],a.prototype,"region",void 0),l([d.property({aliasOf:"viewModel.view"})],a.prototype,"view",void 0),l([d.property(),M.renderable("viewModel.state")],a.prototype,"viewModel",void 0),l([d.property(),M.renderable()],a.prototype,"visibleElements",void 0),l([d.cast("visibleElements")],a.prototype,"castVisibleElements",null),l([M.accessibleHandler()],a.prototype,"_handleScaleMenuToggleClick",void 0),l([M.accessibleHandler()],a.prototype,"_handleScaleSelection",null),l([M.accessibleHandler()],a.prototype,"_handleRecommendedScaleClick",null),a=l([d.subclass("esri.widgets.ScaleRangeSlider")],a)}(d.declared(o.HandleOwnerMixin(v)))});