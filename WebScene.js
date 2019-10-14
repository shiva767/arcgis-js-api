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

define(["require","exports","./core/tsSupport/declareExtendsHelper","./core/tsSupport/decorateHelper","./core/tsSupport/paramHelper","./core/tsSupport/assignHelper","./core/tsSupport/generatorHelper","./core/tsSupport/awaiterHelper","./kernel","./Map","./Viewpoint","./core/asyncUtils","./core/Collection","./core/Error","./core/Handles","./core/has","./core/JSONSupport","./core/lang","./core/Loadable","./core/loadAll","./core/Logger","./core/Promise","./core/promiseUtils","./core/urlUtils","./core/accessorSupport/decorators","./core/accessorSupport/originUtils","./core/accessorSupport/read","./geometry/Extent","./geometry/HeightModelInfo","./geometry/SpatialReference","./geometry/support/heightModelInfoUtils","./geometry/support/jsonUtils","./portal/Portal","./portal/PortalItem","./support/webSceneUtils","./views/3d/support/projectionUtils","./views/support/spatialReferenceSupport","./webdoc/support/thumbnailUtils","./webscene/ApplicationProperties","./webscene/Environment","./webscene/InitialViewProperties","./webscene/Presentation","./webscene/Version"],function(e,t,r,i,n,o,a,s,p,l,u,c,d,h,y,f,v,m,w,g,b,S,A,I,_,L,R,M,V,U,O,P,j,E,C,T,N,G,W,x,J,F,B){var k=b.getLogger("esri.WebScene"),K=f("dojo-debug-messages"),H=new B.default(1,17);return function(t){function l(e){var r=t.call(this)||this;return r._handles=new y,r.applicationProperties=null,r.clippingArea=null,r.clippingEnabled=!1,r.heightModelInfo=null,r.sourceVersion=null,r.supportsHeightModelInfo=!0,r.presentation=new F,r.initialViewProperties=new J,r.portalItem=null,r.resourceInfo=null,r.authoringApp=null,r.authoringAppVersion=null,r._isAuthoringAppSetByUser=!1,r._isAuthoringAppVersionSetByUser=!1,r}return r(l,t),l.prototype.initialize=function(){var e=this;if(this.when().catch(function(e){k.error("#load()","Failed to load web scene",e)}),this.resourceInfo){var t=void 0;try{t=this._validateJSON(this.resourceInfo)}catch(e){return void this.addResolvingPromise(A.reject(e))}this.read(t),this.addResolvingPromise(this._validateSpatialReference()),this.addResolvingPromise(this._validateHeightModelInfo())}this._handles.add(this.allLayers.on("change",function(){return e._scheduleLayersIdGC()}))},l.prototype.destroy=function(){this._unscheduleLayersIdGC(),this._handles.destroy()},l.prototype.writeClippingArea=function(e,t){t.clippingArea||(t.clippingArea={}),t.clippingArea.geometry=e.toJSON()},l.prototype.readClippingEnabled=function(e,t){return!!t.clippingArea&&!!t.clippingArea.clip},l.prototype.writeClippingEnabled=function(e,t){this.clippingArea&&(t.clippingArea||(t.clippingArea={}),t.clippingArea.clip=e)},l.prototype.writeLayers=function(e,t,r,i){var n=this,a=o({},i,{layerContainerType:"operational-layers"}),s=e.map(function(e){return n.verifyWriteLayer(e,i)?e.write(null,a):null}).filter(function(e){return!!e});t[r]=s.toArray()},l.prototype.verifyWriteLayer=function(e,t){return"write"in e||(t&&t.messages&&t.messages.push(new h("layer:unsupported","Layers ("+e.title+", "+e.id+") of type '"+e.declaredClass+"' cannot be persisted in web scenes",{layer:e})),!1)},l.prototype.readSourceVersion=function(e,t){var r=t.version.split("."),i=r[0],n=r[1];return new B.default(parseInt(i,10),parseInt(n,10))},l.prototype.writeSourceVersion=function(e,t,r){t[r]=H.major+"."+H.minor},Object.defineProperty(l.prototype,"thumbnailUrl",{get:function(){return this.portalItem&&this.portalItem.thumbnailUrl||null},set:function(e){e?this._override("thumbnailUrl",e):this._clearOverride("thumbnailUrl")},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"authoringApp",{set:function(e){this._isAuthoringAppSetByUser=!0,this._set("authoringApp",e)},enumerable:!0,configurable:!0}),l.prototype.writeAuthoringApp=function(e,t){e&&this._isAuthoringAppSetByUser?t.authoringApp=e:t.authoringApp="ArcGIS API for JavaScript"},Object.defineProperty(l.prototype,"authoringAppVersion",{set:function(e){this._isAuthoringAppVersionSetByUser=!0,this._set("authoringAppVersion",e)},enumerable:!0,configurable:!0}),l.prototype.writeAuthoringAppVersion=function(e,t){e&&this._isAuthoringAppVersionSetByUser?t.authoringAppVersion=e:t.authoringAppVersion=p.version},l.prototype.writeGround=function(e,t,r,i){t[r]=e?e.write(null,i):{transparency:0,layers:[]}},l.prototype.readInitialViewProperties=function(e,t){var r={};return t.initialState&&t.initialState.environment&&(r.environment=x.fromJSON(t.initialState.environment)),t.spatialReference?r.spatialReference=U.fromJSON(t.spatialReference):r.spatialReference=U.WebMercator,r.viewingMode=t.viewingMode||"global",t.initialState&&t.initialState.viewpoint&&(r.viewpoint=u.fromJSON(t.initialState.viewpoint)),new J(r)},l.prototype.writeInitialViewProperties=function(e,t,r,i){if(e){var n={};e.environment&&(n.environment=e.environment.write({},i)),e.viewpoint&&(n.viewpoint=e.viewpoint.write({},i)),0!==Object.keys(n).length&&(t.initialState=n),t.spatialReference=e.spatialReference?e.spatialReference.write({},i):U.WebMercator.toJSON(),t.viewingMode=null!=e.viewingMode?e.viewingMode:"global"}},l.prototype.load=function(e){return this.addResolvingPromise(this._loadFromSource()),this.when()},l.prototype.loadAll=function(){var e=this;return c.safeCast(g.default(this,function(t){var r=e.presentation&&e.presentation.slides;t(e.ground,e.basemap,e.layers,r&&r.map(function(e){return e.basemap}))}))},l.prototype.read=function(e,t){var r=this;t=o({},t,{origin:"web-scene"});var i=this._isAuthoringAppVersionSetByUser,n=this._isAuthoringAppSetByUser,a=arguments;if(R.readLoadable(this,e,function(t){return r.inherited(a,[e,t])},t),n||(this._isAuthoringAppSetByUser=!1),i||(this._isAuthoringAppVersionSetByUser=!1),e.baseMap&&Array.isArray(e.baseMap.elevationLayers)&&this.sourceVersion.supportsVisibleElevationLayersInSlides){var s=e.baseMap.elevationLayers.map(function(e){return{id:e.id}}),p=this.presentation.slides,l=function(e,t){return e.visibleLayers.some(function(e){return e.id===t})},u=s.filter(function(e){return!p.some(function(t){return l(t,e.id)})});p.forEach(function(e){e.visibleLayers.addMany(u)})}},l.prototype._writeBasemapElevationLayers=function(e){var t=e.ground&&e.ground.layers;!e.baseMap&&t&&t.length&&(e.baseMap={title:"Basemap",baseMapLayers:[]}),e.baseMap&&(e.baseMap.elevationLayers=m.clone(t))},l.prototype.write=function(e,t){if("loaded"!==this.loadStatus){var r=new h("webscene:not-loaded","Web scene must be loaded before it can be serialized");throw k.error("#toJSON()","Web scene must be loaded before it can be serialized",this.loadError||this.loadStatus),r}this._runLayersIdGC(),t=o({},t,{origin:"web-scene"});var i=this.inherited(arguments,[e,t]);return this._writeBasemapElevationLayers(i),i},l.prototype.save=function(e){return s(this,void 0,void 0,function(){var t,r,i;return a(this,function(n){switch(n.label){case 0:return this.portalItem?[3,2]:(k.error("save(): requires the .portalItem property to be set"),[4,A.reject(new h("webscene:portal-item-not-set","Portal item to save to has not been set on the WebScene"))]);case 1:n.sent(),n.label=2;case 2:return"Web Scene"===this.portalItem.type?[3,4]:[4,A.reject(new h("webscene:portal-item-wrong-type",'Portal item needs to have type "Web Scene"'))];case 3:n.sent(),n.label=4;case 4:return t=this._updateFromPromise,[4,this.load()];case 5:return n.sent(),[4,this._loadObjectsWithLayers()];case 6:return n.sent(),r=this._enableVerifyItemRelativeUrls({origin:"web-scene",url:this.portalItem.itemUrl&&I.urlToObject(this.portalItem.itemUrl),messages:[],portal:this.portalItem.portal||j.getDefault(),writtenProperties:[],blockedRelativeUrls:[]}),i=this.write(null,r),[4,this._verifySave(i,r,e)];case 7:return n.sent(),this._updateTypeKeywords(this.portalItem),[4,this.portalItem.update({data:i})];case 8:return n.sent(),L.updateOrigins(r),t?[4,t]:[3,10];case 9:n.sent(),n.label=10;case 10:return[4,this._saveThumbnail()];case 11:return n.sent(),[2,this.portalItem]}})})},l.prototype.saveAs=function(e,t){return s(this,void 0,void 0,function(){var r,i,n,o,s;return a(this,function(a){switch(a.label){case 0:return e?[3,2]:(k.error("saveAs(portalItem): requires a portal item parameter"),[4,A.reject(new h("webscene:portal-item-required","saveAs requires a portal item to save to"))]);case 1:a.sent(),a.label=2;case 2:return e.id&&(e=e.clone(),e.id=null),r=e.portal||j.getDefault(),[4,this.load()];case 3:return a.sent(),[4,this._loadObjectsWithLayers()];case 4:return a.sent(),i=this._enableVerifyItemRelativeUrls({origin:"web-scene",url:null,messages:[],portal:r,writtenProperties:[],blockedRelativeUrls:[]}),n=this.write(null,i),[4,this._verifySaveAs(n,i,t)];case 5:return a.sent(),[4,r._signIn()];case 6:return a.sent(),o=this.thumbnailUrl,s=!this._isOverridden("thumbnailUrl"),e.type="Web Scene",e.portal=r,this._updateTypeKeywords(e),[4,r.user.addItem({item:e,folder:t&&t.folder,data:n})];case 7:return a.sent(),this.portalItem=e,v.JSONSupport.prototype.read.call(this,{version:n.version,authoringApp:n.authoringApp,authoringAppVersion:n.authoringAppVersion},{name:"web-scene",ignoreDefaults:!0,url:e.itemUrl&&I.urlToObject(e.itemUrl)}),L.updateOrigins(i),o&&(this.thumbnailUrl=s?I.addQueryParameter(o,"w","8192"):o),[4,this._saveThumbnail()];case 8:return a.sent(),[2,e]}})})},l.prototype._saveThumbnail=function(){return s(this,void 0,void 0,function(){return a(this,function(e){switch(e.label){case 0:return this._isOverridden("thumbnailUrl")?[4,this.portalItem.updateThumbnail({thumbnail:this.thumbnailUrl})]:[3,2];case 1:e.sent(),this._clearOverride("thumbnailUrl"),e.label=2;case 2:return[2]}})})},l.prototype._verifySave=function(t,r,i,n){void 0===n&&(n=!1);var o=r.messages.filter(function(e){return"error"===e.type}).map(function(e){return new h(e.name,e.message,e.details)});r.blockedRelativeUrls&&(o=o.concat(r.blockedRelativeUrls.map(function(e){return new h("url:unsupported","Relative url '"+e+"' is not supported in Web Scene")}))),i&&i.ignoreUnsupported&&(o=o.filter(function(e){return"layer:unsupported"!==e.name&&"symbol:unsupported"!==e.name&&"symbol-layer:unsupported"!==e.name&&"property:unsupported"!==e.name&&"url:unsupported"!==e.name})),i&&i.strictSchemaValidationEnabled||(o=o.filter(function(e){return"web-document-write:property-required"!==e.name}));var a,s=i&&i.strictSchemaValidationEnabled;return a=K||s?A.create(function(t){return e(["./webscene/validator"],t)}).then(function(e){var r=e.validate(t);if(r.length>0){var i="webscene did not validate:\n"+r.join("\n");k.error((n?"saveAs":"save")+"(): "+i)}return r.map(function(e){return new h("webscene:schema-validation",e)})}).then(function(e){if(s&&e.length>0){var t=C.createSchemaValidationError(e.concat(o));return A.reject(t)}return o}):A.resolve(o),a.then(function(e){if(e.length>0)return A.reject(new h("webscene:save","Failed to save webscene due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:e}))})},l.prototype._verifySaveAs=function(e,t,r){return this.canSaveAs(t)?A.reject(C.createCopyError()):this._verifySave(e,t,r,!0)},l.prototype.verifySaveAs=function(e){var t=this._enableVerifyItemRelativeUrls({origin:"web-scene",messages:[]}),r=this.write(null,t);return this._verifySaveAs(r,t,e)},l.prototype.canSaveAs=function(e){return e||(e=this._enableVerifyItemRelativeUrls({origin:"web-scene",messages:[]}),this.write(null,e)),e.verifyItemRelativeUrls&&e.verifyItemRelativeUrls.writtenUrls.length>0},l.prototype.updateFrom=function(e,t){return void 0===t&&(t={}),s(this,void 0,void 0,function(){var r,i;return a(this,function(n){switch(n.label){case 0:return r=this._updateFromInternal(e,t),this._updateFromPromise=r,[4,r];case 1:return n.sent(),i=this._updateFromPromise===r,i&&(this._updateFromPromise=null),[2]}})})},l.prototype._updateFromInternal=function(e,t){return void 0===t&&(t={}),s(this,void 0,void 0,function(){return a(this,function(r){switch(r.label){case 0:return[4,e.whenReady()];case 1:return r.sent(),!t.environmentExcluded&&e.environment&&(this.initialViewProperties.environment=x.prototype.clone.apply(e.environment)),!t.viewpointExcluded&&e.viewpoint&&(this.initialViewProperties.viewpoint=e.viewpoint.clone()),this.initialViewProperties.spatialReference=e.spatialReference.clone(),this.initialViewProperties.viewingMode=e.viewingMode,e.clippingArea?e.clippingArea!==this.clippingArea&&(this.clippingArea=e.clippingArea.clone(),this.clippingEnabled=!0):this.clippingEnabled=!1,e.heightModelInfo&&(this.heightModelInfo=e.heightModelInfo.clone()),e.map===this&&e.allLayerViews.forEach(function(e){e.layer.visible=e.visible}),!1===t.thumbnailExcluded||null==t.thumbnailExcluded&&!t.viewpointExcluded?[4,this._updateFromThumbnail(e,t.thumbnailSize||void 0)]:[3,3];case 2:r.sent(),r.label=3;case 3:return[2]}})})},l.prototype._updateFromThumbnail=function(e,t){return s(this,void 0,void 0,function(){var r,i;return a(this,function(n){switch(n.label){case 0:return r=G.getOptimalThumbnailSize(e,t),[4,e.takeScreenshot({format:"jpg",width:r.width,height:r.height,disableSlice:!0})];case 1:return i=n.sent(),this.thumbnailUrl=i.dataUrl,[2]}})})},l.prototype._loadFromSource=function(){return this.resourceInfo?this._loadFromJSON(this.resourceInfo,{origin:"web-scene"}):this.portalItem&&this.portalItem.id?this._loadFromItem(this.portalItem):this._loadObjectsWithLayers()},l.prototype._readAndLoadFromJSON=function(e,t){var r=this._validateJSON(e);return this.read(r,t),this._loadFromJSON(r,t)},l.prototype._extractOperationalLayers=function(e){var t=this,r=[];if(!this.sourceVersion.supportsGround&&e.baseMap&&Array.isArray(e.baseMap.elevationLayers))for(var i=0,n=e.baseMap.elevationLayers;i<n.length;i++){var o=n[i];r.push(o)}var a=[],s=function(e){return e.layers&&(e.layers=e.layers.filter(s)),"ArcGISTiledElevationServiceLayer"!==e.layerType||(t.sourceVersion.supportsGround||a.push(e),!1)};return{operationalLayers:e.operationalLayers?e.operationalLayers.filter(s):[],operationalElevationLayers:a,basemapElevationLayers:r}},l.prototype._loadFromJSON=function(t,r){var i=this,n=new d;return this._validateSpatialReference().then(function(){return i._validateHeightModelInfo()}).then(function(){return A.create(function(t){return e(["./portal/support/layersCreator"],t)})}).then(function(e){var a=i._extractOperationalLayers(t),s=a.operationalLayers,p=a.operationalElevationLayers,l=a.basemapElevationLayers,u=[],d={context:o({},r,{layerContainerType:"operational-layers"})};if(i.portalItem&&(d.context.portal=i.portalItem.portal||j.getDefault()),l.length>0){var h=o({},d,{context:o({},d.context,{layerContainerType:"ground"})});h.defaultLayerType="ArcGISTiledElevationServiceLayer",u.push(c.safeCast(e.populateOperationalLayers(i.ground.layers,l,h)))}if(p.length>0){var h=o({},d,{context:o({},d.context,{layerContainerType:"ground"})});h.defaultLayerType="ArcGISTiledElevationServiceLayer",u.push(c.safeCast(e.populateOperationalLayers(n,p,h)))}return s&&s.length>0&&u.push(c.safeCast(e.populateOperationalLayers(i.layers,s,d))),A.eachAlways(u).then(function(){})}).then(function(){return i._loadObjectsWithLayers()}).then(function(){i.ground.layers.addMany(n)})},l.prototype._loadObjectsWithLayers=function(){var e=[];return this.ground&&e.push(this.ground.load()),this.basemap&&e.push(this.basemap.load()),this.presentation.slides.forEach(function(t){t.basemap&&e.push(t.basemap.load())}),A.eachAlways(e).then(function(){})},l.prototype._loadFromItem=function(e){var t=this;return e.load().catch(function(e){throw new h("webscene:load-portal-item","Failed to load portal item",{error:e})}).then(function(){if("Web Scene"!==e.type)throw new h("webscene:invalid-portal-item","Invalid portal item type '${type}', expected 'Web Scene'",{type:e.type})}).then(function(){return e.fetchData()}).then(function(r){return t.resourceInfo=r,t._readAndLoadFromJSON(r,{origin:"web-scene",url:I.urlToObject(e.itemUrl),portal:e.portal||j.getDefault()})})},l.prototype._validateSpatialReference=function(){var e,t=this.initialViewProperties,r=this._sceneSpatialReference,i="local"!==t.viewingMode;if(i){if(!N.isSpatialReferenceSupported(r,"global"))return A.reject(new h("webscene:unsupported-spatial-reference","Unsupported spatial reference (${spatialReference.wkid}) in global mode, only Web Mercator, WGS84 GCS or CGCS2000 are supported",{spatialReference:r,viewingMode:t.viewingMode}));e=function(e){return!e||T.canProject(e,r)}}else{if(!N.isSpatialReferenceSupported(r,"local"))return A.reject(new h("webscene:unsupported-spatial-reference","Unsupported spatial reference (${spatialReference.wkid}) in local mode, only projected coordinate systems are supported",{spatialReference:r,viewingMode:t.viewingMode}));e=function(e){return!e||e.equals(r)}}var n=function(e){return e&&(e.camera&&e.camera.position&&e.camera.position.spatialReference||e.targetGeometry&&e.targetGeometry.spatialReference)},o=t.viewpoint,a=n(o);if(a&&!e(a))return A.reject(new h("webscene:incompatible-camera-spatial-reference","Camera spatial reference (${cameraSpatialReference.wkid}) is incompatible with the scene spatial reference (${sceneSpatialReference.wkid})",{cameraSpatialReference:a,sceneSpatialReference:r,viewingMode:t.viewingMode}));var s=this.presentation.slides.find(function(t){return!e(n(t.viewpoint))});if(s){var p=n(s.viewpoint);return A.reject(new h("webscene:incompatible-slide-spatial-reference","Slide spatial reference (${slideSpatialReference.wkid}) is incompatible with the scene spatial reference (${sceneSpatialReference.wkid})",{slideSpatialReference:p,sceneSpatialReference:r,viewingMode:t.viewingMode}))}return A.resolve()},l.prototype._validateHeightModelInfo=function(){var e=this._sceneSpatialReference,t=O.validateWebSceneError(this.heightModelInfo,e);return t?A.reject(t):A.resolve()},l.prototype._validateJSON=function(e){var t=B.default.parse(e.version||"","webscene");return H.validate(t),e.version=t.major+"."+t.minor,1===t.major&&t.minor<=2&&(e.spatialReference=U.WebMercator.toJSON()),e},l.prototype._updateTypeKeywords=function(e){"local"===this.initialViewProperties.viewingMode?e.typeKeywords?-1===e.typeKeywords.indexOf("ViewingMode-Local")&&e.typeKeywords.push("ViewingMode-Local"):e.typeKeywords=["ViewingMode-Local"]:"global"===this.initialViewProperties.viewingMode&&e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(function(e){return"ViewingMode-Local"!==e})),e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(function(e,t,r){return r.indexOf(e)===t}))},Object.defineProperty(l.prototype,"_sceneSpatialReference",{get:function(){return this.initialViewProperties.spatialReference||U.WebMercator},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_verifyItemRelativeRootPath",{get:function(){return this.portalItem&&this.portalItem.itemUrl?I.urlToObject(this.portalItem.itemUrl).path:null},enumerable:!0,configurable:!0}),l.prototype._enableVerifyItemRelativeUrls=function(e){var t=this._verifyItemRelativeRootPath;return t&&(e.verifyItemRelativeUrls={rootPath:t,writtenUrls:[]}),e},l.prototype._unscheduleLayersIdGC=function(){this._layersIdGCTimeoutId&&(clearTimeout(this._layersIdGCTimeoutId),this._layersIdGCTimeoutId=0)},l.prototype._scheduleLayersIdGC=function(){var e=this;this._unscheduleLayersIdGC(),this._layersIdGCTimeoutId=setTimeout(function(){e._layersIdGCTimeoutId=0,e._runLayersIdGC()},3e3)},l.prototype._runLayersIdGC=function(){var e=this;this._unscheduleLayersIdGC();var t=this.applicationProperties&&this.applicationProperties.viewing&&this.applicationProperties.viewing.search,r=function(t){return!!e.allLayers.find(function(e){return e.id===t})};t&&t.layers&&(t.layers=t.layers.filter(function(e){return r(e.id)}));var i=this.presentation&&this.presentation.slides;i&&i.forEach(function(e){e.visibleLayers&&(e.visibleLayers=e.visibleLayers.filter(function(e){return r(e.id)}))})},l.fromJSON=function(e){if(!e)throw new h("webscene:empty-resource","Expected a JSON resource but got nothing");return new this({resourceInfo:e})},l.VERSION=H,i([_.property({type:W,json:{write:!0}})],l.prototype,"applicationProperties",void 0),i([_.property({json:{read:{source:"baseMap"},write:{target:"baseMap"}}})],l.prototype,"basemap",void 0),i([_.property({type:M,json:{read:{source:"clippingArea.geometry",reader:P.fromJSON},write:{target:"clippingArea.geometry"}}})],l.prototype,"clippingArea",void 0),i([_.writer("clippingArea")],l.prototype,"writeClippingArea",null),i([_.property({type:Boolean,json:{write:{target:"clippingArea.clip"}}})],l.prototype,"clippingEnabled",void 0),i([_.reader("clippingEnabled",["clippingArea"])],l.prototype,"readClippingEnabled",null),i([_.writer("clippingEnabled")],l.prototype,"writeClippingEnabled",null),i([_.property({type:V,json:{write:!0}})],l.prototype,"heightModelInfo",void 0),i([_.property({json:{write:{target:"operationalLayers"}}})],l.prototype,"layers",void 0),i([_.writer("layers")],l.prototype,"writeLayers",null),i([_.property({readOnly:!0,type:B.default,json:{type:String,write:{allowNull:!0,target:"version",isRequired:!0}}})],l.prototype,"sourceVersion",void 0),i([_.reader("sourceVersion",["version"])],l.prototype,"readSourceVersion",null),i([_.writer("sourceVersion")],l.prototype,"writeSourceVersion",null),i([_.property({dependsOn:["portalItem.thumbnailUrl"]})],l.prototype,"thumbnailUrl",null),i([_.property({type:String,json:{write:{allowNull:!0}}})],l.prototype,"authoringApp",null),i([_.writer("authoringApp")],l.prototype,"writeAuthoringApp",null),i([_.property({type:String,json:{write:{allowNull:!0}}})],l.prototype,"authoringAppVersion",null),i([_.writer("authoringAppVersion")],l.prototype,"writeAuthoringAppVersion",null),i([_.property({json:{write:{isRequired:!0,allowNull:!0,enabled:!0}}})],l.prototype,"ground",void 0),i([_.writer("ground")],l.prototype,"writeGround",null),i([_.property({type:F,nonNullable:!0,json:{write:function(e,t,r,i){if(e.slides&&e.slides.length>0){var n=o({},i,{isPresentation:!0});t.presentation=e.write(null,n)}}}})],l.prototype,"presentation",void 0),i([_.property({type:J,nonNullable:!0,json:{default:function(){return new J({viewingMode:"global",spatialReference:U.WebMercator})}}})],l.prototype,"initialViewProperties",void 0),i([_.reader("initialViewProperties",["initialState.environment","spatialReference","viewingMode","initialState.viewpoint"])],l.prototype,"readInitialViewProperties",null),i([_.writer("initialViewProperties",{"initialState.environment":{type:x},spatialReference:{type:U},viewingMode:{type:String},"initialState.viewpoint":{type:u}})],l.prototype,"writeInitialViewProperties",null),i([_.property({type:E})],l.prototype,"portalItem",void 0),i([_.property()],l.prototype,"resourceInfo",void 0),i([n(0,_.cast(E))],l.prototype,"saveAs",null),i([_.property()],l.prototype,"_sceneSpatialReference",null),i([_.property()],l.prototype,"_verifyItemRelativeRootPath",null),l=i([_.subclass("esri.WebScene")],l)}(_.declared(w.LoadableMixin(S.EsriPromiseMixin(v.JSONSupportMixin(l)))))});