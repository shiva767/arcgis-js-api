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

define(["require","exports","./core/tsSupport/assignHelper","./core/tsSupport/declareExtendsHelper","./core/tsSupport/decorateHelper","./Color","./core/asyncUtils","./core/collectionUtils","./core/compilerUtils","./core/Error","./core/JSONSupport","./core/lang","./core/Loadable","./core/loadAll","./core/Logger","./core/promiseUtils","./core/accessorSupport/decorators","./core/accessorSupport/ensureType","./ground/NavigationConstraint","./layers/BaseElevationLayer","./layers/support/LayerCollection","./layers/support/types","./webdoc/support/opacityUtils"],function(e,r,t,o,n,a,i,s,l,p,u,c,y,f,d,h,v,g,m,S,w,C,I){function E(e){return e.isInstanceOf(S)}function L(e){return"elevation"===e.type||E(e)}var b=d.getLogger("esri.Ground");return function(r){function u(e){var t=r.call(this)||this;t.opacity=1,t.surfaceColor=null,t.navigationConstraint=null,t.layers=new w.default;var o=function(e){e.parent&&e.parent!==t&&"remove"in e.parent&&e.parent.remove(e),e.parent=t,C.isOfType(e,["elevation","base-elevation"])||b.error("Layer '"+e.title+", id:"+e.id+"' of type '"+e.type+"' is not supported as a ground layer and will therefore be ignored. Only layers of type 'elevation' are supported.")},n=function(e){e.parent=null};return t.layers.on("after-add",function(e){return o(e.item)}),t.layers.on("after-remove",function(e){return n(e.item)}),t}o(u,r),y=u,u.prototype.initialize=function(){this.when().catch(function(e){b.error("#load()","Failed to load ground",e)}),this.resourceInfo&&this.read(this.resourceInfo.data,this.resourceInfo.context)},u.prototype.normalizeCtorArgs=function(e){return e&&"resourceInfo"in e&&(this._set("resourceInfo",e.resourceInfo),e=t({},e),delete e.resourceInfo),e},Object.defineProperty(u.prototype,"layers",{set:function(e){this._set("layers",s.referenceSetter(e,this._get("layers"),w.default))},enumerable:!0,configurable:!0}),u.prototype.writeLayers=function(e,r,o,n){var a=[];if(!e)return void(r.layers=a);n=t({},n,{layerContainerType:"ground"}),e.forEach(function(e){if("write"in e){var r=l.typeCast(e)(),t={};r.write(t,n)&&a.push(t)}else n&&n.messages&&n.messages.push(new p("layer:unsupported","Layers ("+e.title+", "+e.id+") of type '"+e.declaredClass+"' cannot be persisted in the ground",{layer:e}))}),r.layers=a},u.prototype.load=function(e){return this.addResolvingPromise(this._loadFromSource(e)),this.when()},u.prototype.loadAll=function(){var e=this;return i.safeCast(f.loadAll(this,function(r){r(e.layers)}))},u.prototype.queryElevation=function(e,r){var t=this;return this._importElevationQuery().then(function(o){var n=new o.ElevationQuery,a=t.layers.filter(L).toArray();return n.queryAll(a,e,r)})},u.prototype.createElevationSampler=function(e,r){var t=this.layers.filter(L).toArray();return 1===t.length?t[0].createElevationSampler(e,r):this._importElevationQuery().then(function(o){return(new o.ElevationQuery).createSamplerAll(t,e,r)})},u.prototype.clone=function(){var e={opacity:this.opacity,surfaceColor:c.clone(this.surfaceColor),navigationConstraint:c.clone(this.navigationConstraint),layers:this.layers.slice()};return this.loaded&&(e.loadStatus="loaded"),new y({resourceInfo:this.resourceInfo}).set(e)},u.prototype.read=function(e,r){this.resourceInfo||this._set("resourceInfo",{data:e,context:r}),this.inherited(arguments)},u.prototype._loadFromSource=function(e){var r=this.resourceInfo;return r?this._loadLayersFromJSON(r.data,r.context,e):h.resolve(null)},u.prototype._loadLayersFromJSON=function(r,t,o){var n=this,a=t&&t.origin||"web-scene",s=t&&t.portal||null,l=t&&t.url||null;return h.create(function(r){return e(["./portal/support/layersCreator"],r)}).then(function(e){h.throwIfAborted(o);var t=[];if(r.layers&&Array.isArray(r.layers)){var p={context:{origin:a,url:l,portal:s,layerContainerType:"ground"},defaultLayerType:"ArcGISTiledElevationServiceLayer"};t.push(i.safeCast(e.populateOperationalLayers(n.layers,r.layers,p)))}return h.eachAlways(t)}).then(function(){})},u.prototype._importElevationQuery=function(){return h.create(function(r){e(["./layers/support/ElevationQuery"],r)})};var y;return n([v.property({type:w.default,json:{read:!1}}),v.cast(s.castForReferenceSetter)],u.prototype,"layers",null),n([v.writer("layers")],u.prototype,"writeLayers",null),n([v.property({readOnly:!0})],u.prototype,"resourceInfo",void 0),n([v.property({type:Number,nonNullable:!0,range:{min:0,max:1},json:{type:g.Integer,read:{reader:I.transparencyToOpacity,source:"transparency"},write:{writer:function(e,r){r.transparency=I.opacityToTransparency(e)},target:"transparency"}}})],u.prototype,"opacity",void 0),n([v.property({type:a,json:{type:[g.Integer],write:function(e,r){r.surfaceColor=e.toJSON().slice(0,3)}}})],u.prototype,"surfaceColor",void 0),n([v.property({type:m.NavigationConstraint,json:{write:!0}})],u.prototype,"navigationConstraint",void 0),u=y=n([v.subclass("esri.Ground")],u)}(v.declared(u.JSONSupportMixin(y)))});