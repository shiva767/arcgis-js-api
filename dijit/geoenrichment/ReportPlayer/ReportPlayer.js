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
// See http://js.arcgis.com/3.25/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/Deferred","dojo/dom-class","dojo/on","dojo/when","dojo/promise/all","dojo/promise/Promise","dijit/_WidgetBase","dijit/_TemplatedMixin","./config","./playerSupports/_CommandSupport","./playerSupports/_KeyboardSwipeNavigationSupport","./playerSupports/_LogoSupport","./playerSupports/_MapSupport","./playerSupports/_PageNavigationSupport","./playerSupports/_PrintSupport","./playerSupports/_ReportContainersSwitcher","./playerSupports/_SmartLayoutSupport","./playerSupports/_ZoomSupport","./playerSupports/_WaitingSupport","./supportClasses/PlayerConfigurator","./supportClasses/PlayerToFullScreenAnimator","./printing/PageOptionsDialog/PageOptionsDialog","./PlayerToolbar","./ReportPlayerViewModel","./PlayerResizeModes","./PlayerZoomBehaviors","./PlayerThemes","./ReportPlayerState","./PlayerViewModes","esri/dijit/geoenrichment/utils/DelayUtil","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/async/AsyncQueue","dojo/text!./templates/ReportPlayer.html","dojo/i18n!esri/nls/jsapi","./_devConfig"],function(e,t,i,r,o,n,a,s,l,h,p,d,u,_,g,c,f,y,m,D,C,A,v,w,S,P,R,b,T,I,M,E,x,F,L,N,z){return N=N.geoenrichment.dijit.ReportPlayer.ReportPlayer,e([l,h,d,_,g,f,y,m,D,u,c,C],{templateString:L,nls:N,dataProvider:null,config:null,theme:void 0,viewMode:void 0,enableDataDrilling:void 0,showToolbarInPopup:void 0,showAreaTitle:void 0,scaleSlidesToFitWindow:void 0,showCloseButton:!1,showToFullScreenAnimation:!1,allowKeyboardNavigation:void 0,allowSwipeNavigation:void 0,resizeMode:void 0,renderMapsFromCalculators:!1,printConfig:{subtitle:N.preparedByEsri,printDialogClass:w},showProgressBar:!0,defaultZoomBehavior:void 0,_viewModel:null,_reportData:null,_analysisAreaIndex:0,_disableAnimation:!1,playerToolbar:null,postCreate:function(){this.config=t.mixin({},p,this.config),this._viewModel=new(this._getViewModelClass()),A.configurePlayer(this,this._viewModel.isMobileDevice()),this._initToolbar(),this._initContainerSwither(),this._initSmartLayout(),this._initMapBuilder(),this._initCommands(),this._initPageNavigationControls(),this._initKeyboardSwipeNavigation(),this._initZoomControls(),this._applyTheme(),this._showError(!1),this._initProgressController()},_getViewModelClass:function(){return P},_initToolbar:function(){var e=this;this.playerToolbar=new S({popupButtonDiv:this.playerAfterToolbarDiv,showToolbarInPopup:this.showToolbarInPopup,showAreaTitle:this.showAreaTitle,stretchToolbarNode:!this.showToolbarInPopup&&(this.resizeMode===R.FIT_WINDOW?document.body:this.domNode),showCloseButton:this.showCloseButton,isMobileDevice:this._viewModel.isMobileDevice(),isScrollShown:function(){var t=e.getCurrentReportContainer();return t&&t.isScrollShown&&t.isScrollShown()},onClose:function(){e._onClose()}}).placeAt(this.playerToolbarDiv),this.own(this.playerToolbar),this.playerToolbar.onShowAnalysisAreaAt=this.showAnalysisAreaAt.bind(this)},_applyTheme:function(){r.remove(this.domNode,"playerThemeDark playerThemeLight"),r.add(this.domNode,this.theme===T.DARK?"playerThemeDark":"playerThemeLight"),this.playerToolbar.setTheme(this.theme)},playReport:function(e,t){if(this.isContentLoading())return this.isContentLoading();var i=this;return this._showError(!1),this._progressController&&this._progressController.reset(),this.showToFullScreenAnimation&&this.resizeMode===R.FIT_WINDOW&&v.animateTo(this),n(this._showWaiting(this.dataProvider.getReportData(e,function(e){i._progressController&&i._progressController.setLoadDataProgress(e)})),function(e){return i.setReportData(e,t)},function(e){i._showError(e)})},_isDataBeingSetFlag:!1,setReportData:function(e,t){if(this.isContentLoading())return this.isContentLoading();var o=this;if(t=t||{},!e)return void this._showError(!0);t.disableAnimation&&(this._disableAnimation=!0),this._isDataBeingSetFlag=!0,I.isAnimationSuspended=!0,this.onSetReportDataStart();var n=new i;E.delay(0).then(function(){function i(){if(r<0)return void n.resolve();o._setReportData(e,{analysisAreaIndex:r--,rerenderContent:!1}).then(function(){setTimeout(i,100)},n.reject)}if(1===e.analysisAreas.length)this._resetLoadedFlags(),this._resetMapBuilder(),this._setReportData(e).then(n.resolve,n.reject);else{!1!==t._resetLoadedContents&&(this._resetLoadedFlags(),this._resetMapBuilder());var r=e.analysisAreas.length-1;i()}}.bind(this)),this._progressController&&this._progressController.setNumAreas(e.analysisAreas.length),this._progressController&&this._progressController.setLoadDataProgress(1);var a=n.promise.then(function(){return o._progressController&&o._progressController.finalize()}).otherwise(function(e){o._showError(e)});return this._showWaiting(a),a.always(function(){var e=o.getCurrentReportContainer();if(e&&e.domNode)return r.add(e.domNode,"esriGEReportPlayer_fadeIn1000"),E.delay(1e3).then(function(){e.domNode&&r.remove(e.domNode,"esriGEReportPlayer_fadeIn1000")}),E.delay(300).then(function(){if(o._isDataBeingSetFlag=!1,I.isAnimationSuspended=!1,o.onSetReportDataEnd(),o._emitPendingResizedEvent(),e.notifyShown(),o._progressController&&o._progressController.reset(),t.waitUntilAllContentIsReady)return o.isContentLoading()})})},refresh:function(e){return this.isContentLoading()?this.isContentLoading():this._reportData&&n(this.setReportData(this._reportData,{waitUntilAllContentIsReady:!(!e||!e.waitUntilAllContentIsReady),_resetLoadedContents:!(!e||!e.rerenderContent)}),function(){return this.showPageAt(0),this.resize()}.bind(this))},showAnalysisAreaAt:function(e,t){if(this.isContentLoading())return this.isContentLoading();var i=this._setReportData(this._reportData,{analysisAreaIndex:e,rerenderContent:!(!t||!t.rerenderContent)});return t&&t.waitUntilAllContentIsReady?this.isContentLoading():i},_setReportData:function(e,t){var i=this;t=t||{},t.analysisAreaIndex=t.analysisAreaIndex||0;var r=!1!==t.rerenderContent;if(this._reportData=e,this._analysisAreaIndex=t.analysisAreaIndex,this._showError(!this._reportData),this._reportData)return this._updateMapPortalUrl(),this._setFallbackMapImageInfos(this._reportData.mapImageInfos),n(this._viewModel.initialize(),function(){return i.playerToolbar.updateAreaSelect(i._reportData.analysisAreas,i.getCurrentAnalysisAreaIndex()),i._configureViewModel(),n(i._setReportContainer(r),function(e){return e&&i._doApplyTemplateJson(t)})})},_doApplyTemplateJson:function(e){var t=this,i=this.getCurrentReportContainer(),r=i.fromJson(this._reportData.templateJson,{waitUntilAllContentIsReady:!0,progressCallback:function(i){t._progressController&&t._progressController.setProgressForAreaAt(i,e.analysisAreaIndex)}}),o=i.getPagePromise?i.getPagePromise():r,a=i.getContentPromise?i.getContentPromise():r;return this._registerContainerLoadPromise(a),n(o,function(){return this._setCurrentContainerLoaded(),this.showPageAt(this._currentPageIndex),this.resize()}.bind(this))},_loadQueue:null,isContentLoading:function(){return this._loadQueue&&this._loadQueue.getPromise()},_registerContainerLoadPromise:function(e){var t=this;this._loadQueue||(this._loadQueue=new F({onStarted:function(){x.enableContentAbsolute(t.commandButtonsContainer,!1)},onFinished:function(){x.enableContentAbsolute(t.commandButtonsContainer,!0)}})),this._loadQueue.add(e)},getReportData:function(){return this._reportData},reportDataToJson:function(e){return this.dataProvider.reportDataToJson(this.getReportData(),e)},reportDataFromJson:function(e,t){return n(this.dataProvider.reportDataFromJson(e),function(e){return this.setReportData(e,t)}.bind(this))},updateTemplateJson:function(e){this._reportData&&e&&(this._reportData.templateJson=e)},getReportTitle:function(){return this._reportData&&this._reportData.reportTitle||""},getCurrentAnalysisAreaIndex:function(){return this._analysisAreaIndex},getCurrentAnalysisArea:function(){return this._reportData&&this._reportData.analysisAreas[this._analysisAreaIndex]},getAnalysisAreas:function(){return this._reportData&&this._reportData.analysisAreas},_configureViewModel:function(){var e=this;this._viewModel.setTheme(this._reportData.templateJson.theme);var i=this._getCurrentAnalysisAreaConfiguration();this._viewModel.enableDataDrilling=this.enableDataDrilling,this._disableAnimation&&(this._viewModel.animationAllowed=!1),this._viewModel.setDynamicReportInfo({fieldData:i.fieldData,features:i.features,actualAnalysisAreaIndex:this._analysisAreaIndex,analysisArea:i.analysisArea,infographicOptions:this._reportData.infographicOptions,attachmentsStore:this._reportData.attachmentsStore,createMapFunc:t.hitch(this,this._createMap),reportType:this._reportData.reportType,isClassic:this._reportData.isClassic,isFixedDataMode:!this._reportData.config.geoenrichmentUrl,geClient:this._reportData.geClient,templateVariableProvider:this._reportData.templateVariableProvider,countryID:this._reportData.config.countryID}),this._viewModel.getDynamicImageFunc=t.hitch(this,this._getReportLogo),this._viewModel.enrichFieldData=function(r){return e.dataProvider.enrichFieldData(r,t.mixin({analysisAreas:[i.analysisArea],fieldData:i.fieldData},e._reportData.config))}},_getCurrentAnalysisAreaConfiguration:function(){this._reportData.infographicOptions&&this._reportData.infographicOptions.setCurrentAnalysisAreaIndex(this._analysisAreaIndex),this._reportData.attachmentsStore&&this._reportData.attachmentsStore.setCurrentAnalysisAreaIndex&&this._reportData.attachmentsStore.setCurrentAnalysisAreaIndex(this._analysisAreaIndex);var e=t.mixin({},this._reportData.fieldData);e.areaData=[this._reportData.fieldData.areaData[this._analysisAreaIndex]];var i=this._reportData.analysisAreas[this._analysisAreaIndex];return{fieldData:e,analysisArea:i,features:[i.feature]}},getNumberOfPages:function(){return this.getCurrentReportContainer().getNumberOfPages()},notifyShown:function(){this._isDataBeingSetFlag||this.getCurrentReportContainer()&&this.getCurrentReportContainer().notifyShown()},_isErrorShown:!1,_showError:function(e){z.emulateErrors.playerError&&(e=!0),x[e?"hide":"show"](this.printableDivContainer),x[e?"show":"hide"](this.errorViewDiv),r[e?"add":"remove"](this.domNode,"esriGEReportPlayerError"),this._isErrorShown=!!e,e&&x.hide(this.sidePageNavigator),this.playerToolbar.setErrorShown(!!e),e&&(this._progressController&&this._progressController.reset(),console.log(e),this.onError(e))},isErrorShown:function(){return this._isErrorShown},setPrintMode:function(e){r[e?"add":"remove"](this.domNode,"esriGEReportPlayerInPrinting")},resize:function(e,t){return n(this._resize({width:e,height:t}),function(){this._updatePageNavigator(),this._updateZoomControls(),this.playerToolbar.update()}.bind(this))},_pendingResizeEvent:null,_emitResizedEvent:function(e){this._pendingResizeEvent={isPaginating:!!e},this._isDataBeingSetFlag||this._emitPendingResizedEvent()},_emitPendingResizedEvent:function(){this._pendingResizeEvent&&(this.onResized(this._pendingResizeEvent.isPaginating),this._pendingResizeEvent=null)},_onClose:function(){var e;this.showToFullScreenAnimation&&this.resizeMode===R.FIT_WINDOW&&(e=v.animateFrom(this)),n(e,function(){this.onClose()}.bind(this))},onSetReportDataStart:function(){},onSetReportDataEnd:function(){},onResized:function(e){},onClose:function(){},onError:function(e){}})});