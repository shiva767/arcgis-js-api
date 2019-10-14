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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../Graphic","../../../../core/arrayUtils","../../../../core/asyncUtils","../../../../core/Error","../../../../core/promiseUtils","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","../../../../layers/support/fieldUtils","../../statistics/support/utils","./FeatureLayerAdapter","./LayerAdapter","./support/utils","../../../../tasks/support/FeatureSet"],function(e,t,r,a,s,i,n,o,u,l,c,p,d,m,h,f,y,v,F,g){return function(e){function t(t){return e.call(this,t)||this}return a(t,e),t.prototype._hasCachedStatistics=function(e){return this.layer.hasCachedStatistics(e)},t.prototype._fetchFeaturesFromMemory=function(e,t){return e?e.whenLayerView(this.layer).then(function(e){var r=d.whenFalseOnce(e,"updating").then(function(){return e.queryFeatures(t)}).then(function(e){return"esri.tasks.support.FeatureSet"===e.declaredClass?e.features:e});return p.timeout(r,1e4,null)}):p.reject(new c("scene-layer-adapter:insufficient-data","view is required to fetch the features from layerView"))},t.prototype._generateFeatureSetForCachedHistogram=function(e,t,r,a){void 0===t&&(t=e.minimum),void 0===r&&(r=e.maximum);for(var s=[],i=0;i<a;i++)s[i]=0;for(var n=e.counts.length,u=e.minimum,l=e.maximum,i=0;i<n;i++){var c=(i+.5)/n,p=(1-c)*u+c*l,d=(p-t)/(r-t)*a;d>=0&&d<=a&&(s[d===a?a-1:Math.floor(d)]+=e.counts[i])}var m=[];s.forEach(function(e,t){var r=new o({attributes:{}});r.attributes.EXPR_1=t+1,r.attributes.countOFExpr=e,m.push(r)});var h=new g;return h.features=m,h},t.prototype._getCachedStatistics=function(e,t){var r=this.layer;return e.valueExpression||e.sqlExpression||e.sqlWhere||e.minValue||e.maxValue?p.reject(new c("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression', 'sqlExpression', 'sqlWhere', 'minValue' or 'maxValue' is specified")):l.safeCast(r.queryCachedStatistics(t&&t.name)).then(function(e){var t=e.stats,r=t.min,a=t.max,s=t.avg,i=t.stddev,n=t.sum,o=t.variance,u=t.count;return 0===r&&0===a||(s=0===s?null:s,n=0===n?null:n,i=0===i?null:i,o=0===o?null:o,u=0===u?null:u),null==u&&null!=n&&null!=s&&(u=Math.round(n/s)),{avg:s,count:u,max:a,min:r,stddev:i,sum:n,variance:o}})},t.prototype._getSummaryStatisticsFromMemory=function(e,t){return n(this,void 0,void 0,function(){var a,s,n,o,u,l,p,d;return i(this,function(i){switch(i.label){case 0:return e.features?(s=e.features,[3,3]):[3,1];case 1:return[4,this._fetchFeaturesFromMemory(e.view)];case 2:s=i.sent(),i.label=3;case 3:if(a=s,!(n=a&&a.length))throw new c("scene-layer-adapter:insufficient-data","No features are available to calculate statistics");return o=h.isDateField(t),u=r({},e),"percent-of-total"!==u.normalizationType?[3,5]:[4,F.calculateStatsFromMemory({field:u.field},a)];case 4:if(l=i.sent(),null==(p=l.sum))throw new c("scene-layer-adapter:invalid","invalid normalizationTotal");u.normalizationTotal=p,i.label=5;case 5:return[4,F.calculateStatsFromMemory(u,a,o)];case 6:return d=i.sent(),[2,F.processSummaryStatisticsResult(d)]}})})},t.prototype._getCachedStatisticsForUniqueValues=function(e,t){var r=this,a=this.layer,s=t&&t.name,i=t&&this.getFieldDomain(e.field);return e.valueExpression||e.sqlExpression||e.sqlWhere?p.reject(new c("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression', 'sqlExpression' or 'sqlWhere' is specified")):l.safeCast(a.queryCachedStatistics(s)).then(function(i){var n=i.stats,u=i.labels&&i.labels.labels,l={},c=[];if(n.mostFrequentValues){var p="countOF"+s;n.mostFrequentValues.forEach(function(e){var r=new o({attributes:{}});r.attributes[s]=t&&t.name!==a.objectIdField&&(h.isNumericField(t)||h.isDateField(t))?Number(e.value):e.value,r.attributes[p]=e.count,c.push(r)}),u&&u.forEach(function(e){l[e.value]=e.label})}var d=new g;return d.features=c,F.getUniqueValuesFromFeatureSet(d,r,e.field,l)}).then(function(t){return F.createUVResult(t,"service-cached-query",i,e.returnAllCodedValues)})},t.prototype._getUniqueValuesFromMemory=function(e,t){var r=t&&this.getFieldDomain(e.field);return(e.features?p.resolve(e.features):this._fetchFeaturesFromMemory(e.view)).then(function(t){return l.safeCast(F.calculateUniqueValuesFromMemory(e,t,r))})},t.prototype._getCachedStatisticsForHistogram=function(e,t){var r=this,a=this.layer;return e.valueExpression||e.sqlExpression||e.sqlWhere||e.normalizationType?p.reject(new c("scene-layer-adapter:not-supported","This Layer does not support calculating statistics when 'valueExpression' or 'sqlExpression' or 'sqlWhere' or 'normalizationType' is specified")):l.safeCast(a.queryCachedStatistics(t&&t.name)).then(function(t){var a=t.stats,s=e.minValue,i=e.maxValue,n=null!=s?s:a.min,o=null!=i?i:a.max,u=e.numBins||10,l=r._generateFeatureSetForCachedHistogram(a.histogram,n,o,u);return F.getHistogramFromFeatureSet(l,n,o,u)})},t.prototype._getClassBreaksFromMemory=function(e){return n(this,void 0,void 0,function(){var t,a,s,n,o,u;return i(this,function(i){switch(i.label){case 0:return e.features?(a=e.features,[3,3]):[3,1];case 1:return[4,this._fetchFeaturesFromMemory(e.view)];case 2:a=i.sent(),i.label=3;case 3:if(t=a,!(s=t&&t.length))throw new c("scene-layer-adapter:insufficient-data","No features are available to calculate statistics");return n=r({},e),"percent-of-total"!==n.normalizationType?[3,5]:[4,F.calculateStatsFromMemory({field:n.field},t)];case 4:if(o=i.sent(),null==(u=o.sum))throw new c("scene-layer-adapter:invalid","invalid normalizationTotal");n.normalizationTotal=u,i.label=5;case 5:return[2,F.calculateClassBreaksFromMemory(n,t)]}})})},t.prototype._getHistogramFromMemory=function(e){var t=this;return(e.features?p.resolve(e.features):this._fetchFeaturesFromMemory(e.view)).then(function(a){if(!a||!a.length)return p.reject(new c("scene-layer-adapter:insufficient-data","No features are available to calculate histogram"));var s=e.field,i=e.normalizationType,n=e.valueExpression,o=e.classificationMethod,u=e.minValue,d=e.maxValue,m=e.view,h=!o||"equal-interval"===o,f=null!=u&&null!=d,y=null;if(h&&!i)y=f?p.resolve({min:u,max:d}):t.summaryStatistics({field:s,valueExpression:n,features:a,view:m}).then(function(e){return e.count?{min:e.min,max:e.max}:p.reject(new c("feature-layer-adapter:insufficient-data","No features are available to calculate histogram"))});else{var v=r({},e);v.features=a,y=l.safeCast(t._getBinParamsFromMemory(v))}return y.then(function(t){return l.safeCast(F.calculateHistogramFromMemory(e,t,a))})})},t.prototype._getBinParamsFromMemory=function(e){return n(this,void 0,void 0,function(){var t,r,a,s,n,o,u,l,c,p;return i(this,function(i){return t=e.field,r=e.valueExpression,a=e.classificationMethod,s=e.standardDeviationInterval,n=e.normalizationType,o=e.normalizationField,u=e.minValue,l=e.maxValue,c=e.features,p=e.view,[2,this._getClassBreaksFromMemory({field:t,valueExpression:r,normalizationType:n,normalizationField:o,classificationMethod:a,standardDeviationInterval:s,minValue:u,maxValue:l,numClasses:e.numBins,features:c,view:p}).then(function(e){var r=e.normalizationTotal,a=e.classBreakInfos,s=f.getSQLFilterForNormalization({field:t,normalizationType:n,normalizationField:o});return F.generateBinParams({field:t,normalizationType:n,normalizationField:o,normalizationTotal:r,classBreaks:a,where:s})})]})})},t.prototype.getField=function(e){return void 0===e&&(e=""),this.layer.getField(e)},t.prototype.getFieldUsageInfo=function(e){var t=this.getField(e);if(!t)return null;var r=this.layer.getFieldUsageInfo(t.name);return{supportsLabelingInfo:r.supportsLabelingInfo,supportsPopupTemplate:r.supportsPopupTemplate,supportsRenderer:r.supportsRenderer,supportsLayerQuery:r.supportsLayerQuery,supportsStatistics:!0}},t.prototype.getFieldDomain=function(e,t){return this._featureLayerAdapter?this._featureLayerAdapter.getFieldDomain(e,t):null},t.prototype.summaryStatistics=function(e){var t=this,r=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.summaryStatistics(e):this._hasCachedStatistics(r&&r.name)?this._getCachedStatistics(e,r).catch(function(a){return l.safeCast(t._getSummaryStatisticsFromMemory(e,r))}):l.safeCast(this._getSummaryStatisticsFromMemory(e,r))},t.prototype.uniqueValues=function(e){var t=this,r=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.uniqueValues(e):this._hasCachedStatistics(r&&r.name)?this._getCachedStatisticsForUniqueValues(e,r).catch(function(a){return t._getUniqueValuesFromMemory(e,r)}):this._getUniqueValuesFromMemory(e,r)},t.prototype.histogram=function(e){var t=this,r=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.histogram(e):this._hasCachedStatistics(r&&r.name)?this._getCachedStatisticsForHistogram(e,r).catch(function(r){return t._getHistogramFromMemory(e)}):this._getHistogramFromMemory(e)},t.prototype.classBreaks=function(e){var t=this.getField(e.field);return this._featureLayerAdapter?this._featureLayerAdapter.classBreaks(e):this._hasCachedStatistics(t&&t.name)?p.reject(new c("scene-layer-adapter:not-supported","Cached stats not supported")):l.safeCast(this._getClassBreaksFromMemory(e))},t.prototype.queryFeatureCount=function(e){return this._featureLayerAdapter?this._featureLayerAdapter.queryFeatureCount(e):p.reject(new c("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support count query"))},t.prototype.generateRenderer=function(e){return this._featureLayerAdapter?this._featureLayerAdapter.generateRenderer(e):p.reject(new c("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support generateRenderer operation"))},t.prototype.heatmapStatistics=function(e){return this._featureLayerAdapter?this._featureLayerAdapter.heatmapStatistics(e):p.reject(new c("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support heatmapStatistics operation"))},t.prototype.predominantCategories=function(e){return n(this,void 0,void 0,function(){return i(this,function(t){if(this._featureLayerAdapter)return[2,this._featureLayerAdapter.predominantCategories(e)];throw new c("scene-layer-adapter:not-supported","SceneLayer without associated FeatureLayer does not support predominantCategories")})})},t.prototype.getSampleFeatures=function(e){return n(this,void 0,void 0,function(){var t,a,s,n,o,l,p,d;return i(this,function(i){switch(i.label){case 0:if("mesh"===this.layer.geometryType)throw new c("scene-layer-adapter:not-supported","getSampleFeatures does not support scene layer with mesh geometry type");t=e.view,a=e.sampleSize,s=1,n=this.layer.createQuery(),n.outFields=null,n.returnGeometry=!0,n.where=null,n.num=a,o=[],i.label=1;case 1:return i.trys.push([1,3,,4]),[4,this._fetchFeaturesFromMemory(t,n)];case 2:return o=i.sent(),o.length&&a>0&&a<=o.length?[2,u.pickRandom(o,a,s)]:[3,4];case 3:return l=i.sent(),[3,4];case 4:return p=null,this._featureLayerAdapter?(d=r({},e),delete d.view,[4,this._featureLayerAdapter.getSampleFeatures(d)]):[3,6];case 5:p=i.sent(),i.label=6;case 6:return p&&p.length?[2,p]:[2,u.pickRandom(o,o.length,s)]}})})},t.prototype.load=function(e){var t=this,r=this.layer.load(e).then(function(r){var a=r.associatedLayer;if(t.geometryType=r.geometryType,a){t._featureLayerAdapter=new y({layer:a});return t._featureLayerAdapter.load(e).then(function(){t.objectIdField=t._featureLayerAdapter.objectIdField,t.supportsSQLExpression=t._featureLayerAdapter.supportsSQLExpression,t.minScale=t._featureLayerAdapter.minScale,t.maxScale=t._featureLayerAdapter.maxScale,t.fullExtent=t._featureLayerAdapter.fullExtent})}t.objectIdField=r.objectIdField,t.supportsSQLExpression=!1,t.hasQueryEngine=!1,t.fullExtent=r.fullExtent});return this.addResolvingPromise(r),this.when()},s([m.property({constructOnly:!0})],t.prototype,"layer",void 0),t=s([m.subclass("esri.renderers.smartMapping.support.adapters.SceneLayerAdapter")],t)}(m.declared(v))});