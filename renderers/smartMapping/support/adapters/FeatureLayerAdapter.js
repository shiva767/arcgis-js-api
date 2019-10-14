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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../geometry","../../../../core/arrayUtils","../../../../core/asyncUtils","../../../../core/Error","../../../../core/maybe","../../../../core/promiseUtils","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","../../../../geometry/support/quantizationUtils","../../../../geometry/support/spatialReferenceUtils","../../../../layers/support/arcgisLayerUrl","../../../../layers/support/fieldUtils","../../statistics/support/predominanceUtils","../../statistics/support/utils","../utils","./LayerAdapter","./support/utils","../../../../tasks/GenerateRendererTask","../../../../tasks/support/GenerateRendererParameters","../../../../tasks/support/QuantizationParameters","../../../../tasks/support/Query","../../../../tasks/support/StatisticDefinition","../../../../tasks/support/UniqueValueDefinition"],function(e,t,r,a,n,i,s,o,u,l,c,m,p,f,d,h,y,v,F,g,S,x,w,_,z,E,q,V,L,T){return function(e){function t(t){return e.call(this,t)||this}return a(t,e),t.prototype.destroy=function(){this._hasLocalSource=null},t.prototype._isStatsSupportedOnService=function(){var e=this.layer;return!e.get("capabilities.query.supportsStatistics")||"multipatch"===this.geometryType&&!v.isHostedAgolService(e.url)&&e.version<10.5?p.reject(new c("feature-layer-adapter:not-supported","Layer does not support statistics query")):p.resolve()},t.prototype._fetchFeaturesFromMemory=function(e,t){var r=this.layer;if(this._hasLocalSource){var a=r.source;return p.resolve(a)}return e?e.whenLayerView(r).then(function(e){var r=f.whenFalseOnce(e,"updating").then(function(){return e.queryFeatures(t)}).then(function(e){return e.features});return p.timeout(r,1e4,null)}):p.reject(new c("feature-layer-adapter:insufficient-data","view is required to fetch the features from layerView"))},t.prototype._fetchFeaturesFromService=function(e){return this.layer.queryFeatures(e).then(function(e){return e&&e.features})},t.prototype._fetchFeaturesForStats=function(e){var t=this,r=this.layer;return l.safeCast(x.getFieldsList({field:e.field,normalizationField:e.normalizationField,valueExpression:e.valueExpression})).then(function(a){var n=r.createQuery();return n.returnGeometry=!1,n.outFields=a,r.queryFeatures(n).then(function(e){return e&&e.features}).catch(function(r){return t._fetchFeaturesFromMemory(e.view)})})},t.prototype._summaryStatsFromGenRend=function(e){var t=e.normalizationType,r=e.normalizationField;return this.classBreaks({field:e.field,numClasses:5,classificationMethod:"standard-deviation",standardDeviationInterval:.25,normalizationType:t,normalizationField:"field"===t?r:void 0,minValue:e.minValue,maxValue:e.maxValue}).then(function(e){var t,r,a;if(e.classBreakInfos.some(function(e){return e.hasAvg&&(t=e),!!t}),t){var n=t.maxValue-t.minValue;r=t.minValue+n/2,a=4*n}var i={min:e.minValue,max:e.maxValue,avg:r,stddev:a};return _.processSummaryStatisticsResult(i)})},t.prototype._getSummaryStatsQuery=function(e,t){var r=e.field,a=this.supportsSQLExpression&&t?_.msSinceUnixEpochSQL(this,r):e.sqlExpression,n=a||r,i=n?S.getRangeExpr(n,e.minValue,e.maxValue):null,s=S.mergeWhereClauses(e.sqlWhere,i),o=this.layer.createQuery();return o.where=S.mergeWhereClauses(o.where,s),o.sqlFormat=a?"standard":null,o.outStatistics=_.statisticTypes.map(function(e){var t=new L;return t.statisticType="variance"===e?"var":e,t.onStatisticField=n,t.outStatisticFieldName=e+"_value",t}),o},t.prototype._summaryStatsFromServiceQuery=function(e,t){var r=this;return this._isStatsSupportedOnService().then(function(){return r.layer.queryFeatures(r._getSummaryStatsQuery(e,t))}).then(function(e){return _.getSummaryStatisticsFromFeatureSet(e,t)}).then(_.processSummaryStatisticsResult)},t.prototype._summaryStatsFromClientQuery=function(e,t){var r=this,a=e.view;return a?a.whenLayerView(this.layer).then(function(a){var n=f.whenFalseOnce(a,"updating").then(function(){return a.queryFeaturesJSON(r._getSummaryStatsQuery(e,t))}).then(function(e){return _.getSummaryStatisticsFromFeatureSet(e,t)}).then(_.processSummaryStatisticsResult);return p.timeout(n,1e4,null),n}):p.reject(new c("feature-layer-adapter:insufficient-data","view is required to query stats from layerView"))},t.prototype._summaryStatsFromMemory=function(e,t){return s(this,void 0,void 0,function(){var a,n,s,o,u,l,m,p,f,d,h,y,v,F,g,S,x;return i(this,function(i){switch(i.label){case 0:return a=e.field,n="function"==typeof a,s=e.valueExpression,o=s||e.sqlExpression,u=o&&!e.sqlExpression,l=this._hasLocalSource||e.features,m=n||u,p=e.view,f={field:a,valueExpression:s,normalizationField:e.normalizationField,view:p},l||!m?[3,2]:[4,this._fetchFeaturesForStats(f)];case 1:return h=i.sent(),[3,5];case 2:return y=e.features,y?[3,4]:[4,this._fetchFeaturesFromMemory(p)];case 3:y=i.sent(),i.label=4;case 4:h=y,i.label=5;case 5:if(d=h,!(v=d&&d.length))throw new c("feature-layer-adapter:insufficient-data","No features are available to calculate statistics");return F=r({},e),"percent-of-total"!==F.normalizationType?[3,7]:[4,_.calculateStatsFromMemory({field:a},d)];case 6:if(g=i.sent(),null==(S=g.sum))throw new c("feature-layer-adapter:invalid","invalid normalizationTotal");F.normalizationTotal=S,i.label=7;case 7:return[4,_.calculateStatsFromMemory(F,d,t)];case 8:return x=i.sent(),[2,_.processSummaryStatisticsResult(x)]}})})},t.prototype._uvFromGenRenderer=function(e,t){var r=this,a=e.field,n=new T;n.attributeField=a;var i=new E;return i.classificationDefinition=n,this.generateRenderer(i).then(function(e){var t={},n=r.getField(a);return e.uniqueValues.forEach(function(e){var r=e.value;null!=r&&""!==r&&("string"!=typeof r||""!==r.trim()&&"<null>"!==r.toLowerCase())||(r=null),null==t[r]?t[r]={count:e.count,data:F.isNumericField(n)&&r?Number(r):r}:t[r].count=t[r].count+e.count}),{count:t}}).then(function(r){return _.createUVResult(r,"service-generate-renderer",t,e.returnAllCodedValues)})},t.prototype._getUVQuery=function(e){var t=e.field,r=e.sqlExpression,a="countOF"+(t||"Expr"),n=new L;n.statisticType="count",n.onStatisticField=r?"1":t,n.outStatisticFieldName=a;var i=this.layer.createQuery();return i.where=S.mergeWhereClauses(i.where,e.sqlWhere),i.sqlFormat=r?"standard":null,i.outStatistics=[n],i.groupByFieldsForStatistics=[t||r],i},t.prototype._uvFromServiceQuery=function(e,t){var r=this;return this._isStatsSupportedOnService().then(function(){return r.layer.queryFeatures(r._getUVQuery(e))}).then(function(t){return _.getUniqueValuesFromFeatureSet(t,r,e.field)}).then(function(r){return _.createUVResult(r,"service-query",t,e.returnAllCodedValues)})},t.prototype._uvFromClientQuery=function(e,t){var r=this,a=e.view;return a?a.whenLayerView(this.layer).then(function(a){var n=f.whenFalseOnce(a,"updating").then(function(){return a.queryFeaturesJSON(r._getUVQuery(e))}).then(function(t){return _.getUniqueValuesFromFeatureSet(t,r,e.field)}).then(function(r){return _.createUVResult(r,"service-query",t,e.returnAllCodedValues)});return p.timeout(n,1e4,null),n}):p.reject(new c("feature-layer-adapter:insufficient-data","view is required to query stats from layerView"))},t.prototype._uvFromMemory=function(e,t){var r=e.field,a=e.valueExpression,n=e.sqlExpression,i=e.view,s=a&&!n,o=this._hasLocalSource||e.features,u={field:r,valueExpression:a,view:i};return(!o&&s?this._fetchFeaturesForStats(u):e.features?p.resolve(e.features):this._fetchFeaturesFromMemory(i)).then(function(r){return l.safeCast(_.calculateUniqueValuesFromMemory(e,r,t))})},t.prototype._calcBinsSQL=function(e,t){var r=[],a=t.length;return t.forEach(function(t,n){var i=t[0],s=t[1],o=S.mergeWhereClauses(e+" >= "+i,e+(n===a-1?" <= ":" < ")+s);r.push("WHEN ("+o+") THEN "+(n+1))}),["CASE",r.join(" "),"ELSE 0","END"].join(" ")},t.prototype._getNormalizationTotal=function(e,t){return e&&"percent-of-total"===t?this.summaryStatistics({field:e}).then(function(e){return e.sum}):p.resolve(null)},t.prototype._getQueryParamsForExpr=function(e,t){if(!e.valueExpression&&!e.sqlExpression){var r=e.field,a=r?this.getField(r):null,n=F.isDateField(a),i={field:r,normalizationType:e.normalizationType,normalizationField:e.normalizationField,normalizationTotal:t};return{sqlExpression:n?_.msSinceUnixEpochSQL(this,r):_.getFieldExpr(i),sqlWhere:n?null:e.sqlWhere||S.getSQLFilterForNormalization(e)}}return{valueExpression:e.valueExpression,sqlExpression:e.sqlExpression,sqlWhere:e.sqlWhere}},t.prototype._getDataRange=function(e,t,r){return null!=t&&null!=r?p.resolve({min:t,max:r}):this.summaryStatistics(e).then(function(e){return{min:e.min,max:e.max}})},t.prototype._histogramForExpr=function(e){var t=this;return this._getNormalizationTotal(e.field,e.normalizationType).then(function(r){var a=t._getQueryParamsForExpr(e,r);return t._getDataRange(a,e.minValue,e.maxValue).then(function(n){var i=n.min,s=n.max,o=e.numBins||10,u=_.getEqualIntervalBins(i,s,o),l=t._calcBinsSQL(a.sqlExpression,u),c=new L({statisticType:"count",outStatisticFieldName:"countOFExpr",onStatisticField:"1"}),m=t.layer.createQuery();return m.where=S.mergeWhereClauses(m.where,a.sqlWhere),m.sqlFormat="standard",m.outStatistics=[c],m.groupByFieldsForStatistics=[l],m.orderByFields=[l],t._isStatsSupportedOnService().then(function(){return t.layer.queryFeatures(m)}).then(function(e){return _.getHistogramFromFeatureSet(e,i,s,o,r)})})})},t.prototype._histogramForField=function(e){var t=this,r=null;return r=null!=e.minValue&&null!=e.maxValue?p.resolve({min:e.minValue,max:e.maxValue}):this.summaryStatistics(e).then(function(e){return e.count?{min:e.min,max:e.max}:p.reject(new c("feature-layer-adapter:insufficient-data","Either the layer has no features or none of the features have data for the field"))}),r.then(function(r){return t._getBins({min:r.min,max:r.max},e.field,e.numBins)})},t.prototype._getBins=function(e,t,r){void 0===r&&(r=10);var a=e.min,n=e.max,i=e.normTotal,s=e.excludeZerosExpr,o=e.intervals||_.getEqualIntervalBins(a,n,r),u=e.sqlExpr||t;return this._queryBins(o,u,s).then(function(e){return{bins:e.map(function(e,t){return{minValue:o[t][0],maxValue:o[t][1],count:e.value}}),minValue:a,maxValue:n,normalizationTotal:i}})},t.prototype._queryBins=function(e,t,r){for(var a=this,n=[],i=e.length,s=0;s<i;s++){var o=S.mergeWhereClauses(r,S.mergeWhereClauses(t+" >= "+e[s][0],null!==e[s][1]?t+(s===i-1?" <= ":" < ")+e[s][1]:""));n.push(o)}return p.eachAlways(n.map(function(e){return a.queryFeatureCount(e)}))},t.prototype._binParamsFromGenRend=function(e,t){var r=e.field,a=e.normalizationType,n=e.normalizationField,i=S.getSQLFilterForNormalization({field:r,normalizationType:a,normalizationField:n}),s=new E({classificationDefinition:_.createCBDefn({field:r,normalizationType:a,normalizationField:n,classificationMethod:e.classificationMethod,standardDeviationInterval:e.standardDeviationInterval,breakCount:e.numBins||10}),where:S.mergeWhereClauses(i,t)});return this.generateRenderer(s).then(function(e){var t=e.normalizationTotal,s=e.classBreaks;return _.generateBinParams({field:r,normalizationType:a,normalizationField:n,normalizationTotal:t,classBreaks:s,where:i})})},t.prototype._histogramFromMemory=function(e){var t=this,a=e.field,n=e.normalizationField,i=e.normalizationType,s=e.valueExpression,o=e.classificationMethod,u=e.minValue,m=e.maxValue,f=e.view,d=s&&!e.sqlExpression,h=this._hasLocalSource||e.features,y={field:a,valueExpression:s,normalizationField:n,view:f};return(!h&&d?this._fetchFeaturesForStats(y):e.features?p.resolve(e.features):this._fetchFeaturesFromMemory(f)).then(function(n){if(!n||!n.length)return p.reject(new c("feature-layer-adapter:insufficient-data","No features are available to calculate histogram"));var d=!o||"equal-interval"===o,h=null!=u&&null!=m,y=null;if(d&&!i)y=h?p.resolve({min:u,max:m,source:"parameters"}):t.summaryStatistics({field:a,valueExpression:s,features:n,view:f}).then(function(e){return e.count?{min:e.min,max:e.max}:p.reject(new c("feature-layer-adapter:insufficient-data","No features are available to calculate histogram"))});else{var v=r({},e);v.features=n,y=l.safeCast(t._getBinParamsFromMemory(v))}return y.then(function(t){return l.safeCast(_.calculateHistogramFromMemory(e,t,n))})})},t.prototype._getBinParamsFromMemory=function(e){return s(this,void 0,void 0,function(){var t,r,a,n,s,o,u,l,c,m;return i(this,function(i){return t=e.field,r=e.valueExpression,a=e.classificationMethod,n=e.standardDeviationInterval,s=e.normalizationType,o=e.normalizationField,u=e.minValue,l=e.maxValue,c=e.features,m=e.view,[2,this._classBreaksFromMemory({field:t,valueExpression:r,normalizationType:s,normalizationField:o,classificationMethod:a,standardDeviationInterval:n,minValue:u,maxValue:l,numClasses:e.numBins,features:c,view:m}).then(function(e){var r=e.normalizationTotal,a=e.classBreakInfos,n=S.getSQLFilterForNormalization({field:t,normalizationType:s,normalizationField:o});return _.generateBinParams({field:t,normalizationType:s,normalizationField:o,normalizationTotal:r,classBreaks:a,where:n})})]})})},t.prototype._classBreaksFromGenRend=function(e){var t=e.field,r=e.normalizationType,a=e.normalizationField,n=e.normalizationTotal,i=S.getSQLFilterForNormalization({field:t,normalizationType:r,normalizationField:a}),s=_.getFieldExpr({field:t,normalizationType:r,normalizationField:a,normalizationTotal:n}),o=S.getRangeExpr(s,e.minValue,e.maxValue),u=_.createCBDefn({field:t,normalizationType:r,normalizationField:a,classificationMethod:e.classificationMethod,standardDeviationInterval:e.standardDeviationInterval,breakCount:e.numClasses||5}),l=new E;return l.classificationDefinition=u,l.where=S.mergeWhereClauses(i,o),this.generateRenderer(l).then(function(t){return _.resolveCBResult(e,t)})},t.prototype._classBreaksFromInterpolation=function(e){for(var t=e.minValue,r=e.maxValue,a=e.numClasses||5,n=[],i=(r-t)/a,s=0;s<a;s++){var o=t+s*i;n.push({minValue:o,maxValue:o+i})}n[a-1].maxValue=r;var u={classBreaks:n,normalizationTotal:e.normalizationTotal},l=_.resolveCBResult(e,u);return p.resolve(l)},t.prototype._classBreaksFromMemory=function(e){return s(this,void 0,void 0,function(){var t,a,n,s,o,u,l,m,p,f,d,h,y;return i(this,function(i){switch(i.label){case 0:return t=e.field,a=e.normalizationField,n=e.valueExpression,s=e.view,o=this._hasLocalSource||e.features,u={field:t,valueExpression:n,normalizationField:a,view:s},o||!n?[3,2]:[4,this._fetchFeaturesForStats(u)];case 1:return m=i.sent(),[3,5];case 2:return p=e.features,p?[3,4]:[4,this._fetchFeaturesFromMemory(s)];case 3:p=i.sent(),i.label=4;case 4:m=p,i.label=5;case 5:if(l=m,!(f=l&&l.length))throw new c("feature-layer-adapter:insufficient-data","No features are available to calculate statistics");return d=r({},e),"percent-of-total"!==d.normalizationType?[3,7]:[4,_.calculateStatsFromMemory({field:t},l)];case 6:if(h=i.sent(),null==(y=h.sum))throw new c("feature-layer-adapter:invalid","invalid normalizationTotal");d.normalizationTotal=y,i.label=7;case 7:return[2,_.calculateClassBreaksFromMemory(d,l)]}})})},t.prototype._heatmapStatsFromMemory=function(e,t){var r=this,a=e.blurRadius,n=e.field,i=e.view,s=i.state,o=s.resolution,u=s.size,l=new q.default({extent:i.extent,tolerance:o}),m=new V({returnGeometry:!0,geometry:i.extent,quantizationParameters:l});return(e.features?p.resolve(e.features):this._fetchFeaturesFromMemory(i,m)).then(function(e){if(!(e=r._quantizeFeatures(e,l,i))||!e.length)return{count:0,min:null,max:null,avg:null,stddev:null};var s=_.calculateHeatmapStats(e,a,t,n,u[0],u[1]);return s?{count:s.count,min:s.min,max:s.max,avg:s.mean,stddev:s.stdDev}:p.reject(new c("feature-layer-adapter:invalid","unable to calculate heatmap statistics"))})},t.prototype._quantizeFeatures=function(e,t,r){var a=this,n=h.toQuantizationTransform(t),i=r.spatialReference,s=r.size,u=y.isWrappable(i),l=y.getInfo(i),c=Math.round((l.valid[1]-l.valid[0])/n.scale[0]);return e.map(function(e){var t=new o.Point(m.unwrap(e.geometry));return h.quantizePoint(n,t,t,t.hasZ,t.hasM),e.geometry=u?a._wrapPoint(t,c,s[0]):t,e})},t.prototype._wrapPoint=function(e,t,r){return e.x<0?e.x+=t:e.x>r&&(e.x-=t),e},t.prototype.getField=function(e){return void 0===e&&(e=""),this.layer.getField(e)},t.prototype.getFieldUsageInfo=function(e){return this.getField(e)?{supportsLabelingInfo:!0,supportsRenderer:!0,supportsPopupTemplate:!0,supportsLayerQuery:!0,supportsStatistics:!0}:null},t.prototype.getFieldDomain=function(e,t){return this.layer.getFieldDomain(e,t)},t.prototype.summaryStatistics=function(e){var t=this,r=e.field,a=r?this.getField(r):null,n=F.isDateField(a),i="function"==typeof r,s=e.valueExpression||e.sqlExpression,o=s&&!e.sqlExpression,u=this._hasLocalSource||e.features,m=i||o,f=e.view,d=f&&"3d"===f.type;return u||m?m||e.features||d?l.safeCast(this._summaryStatsFromMemory(e,n)):this._summaryStatsFromClientQuery(e,n):this.supportsSQLExpression||!n&&!s?(e.normalizationType?this._summaryStatsFromGenRend(e):this._summaryStatsFromServiceQuery(e,n)).catch(function(r){return l.safeCast(t._summaryStatsFromMemory(e,n))}):p.reject(new c("feature-layer-adapter:not-supported","Layer does not support standardized SQL expression for queries"))},t.prototype.uniqueValues=function(e){var t=this,r=e.field,a=e.valueExpression,n=e.sqlExpression,i=r?this.getField(r):null,s=i&&this.getFieldDomain(r),o=a&&(!n||!this.supportsSQLExpression),u=this._hasLocalSource||e.features||o,l=e.view,c=l&&"3d"===l.type;return u?o||e.features||c?this._uvFromMemory(e,s):this._uvFromClientQuery(e,s):this._uvFromServiceQuery(e,s).catch(function(r){return e.field?t._uvFromGenRenderer(e,s):r}).catch(function(r){return o||e.features||c?t._uvFromMemory(e,s):t._uvFromClientQuery(e,s)})},t.prototype.histogram=function(e){var t=this,r=e.field,a=e.normalizationType,n=e.normalizationField,i=e.classificationMethod,s=r?this.getField(r):null,o=F.isDateField(s),u=e.valueExpression||e.sqlExpression,l=u&&!e.sqlExpression,m=this._hasLocalSource||e.features||l,f=this.supportsSQLExpression,d=!i||"equal-interval"===i,h=e.minValue,y=e.maxValue,v=null!=h&&null!=y,g=e.numBins||10;return m?this._histogramFromMemory(e):(u||f)&&d?u&&!f?p.reject(new c("feature-layer-adapter:not-supported","Layer does not support standardized SQL expression for queries")):this._histogramForExpr(e):o&&d?p.reject(new c("feature-layer-adapter:not-supported","Normalization and date field are not allowed when layer does not support standardized SQL expression for queries")):a||!d?this._binParamsFromGenRend(e).then(function(i){if(!v)return t._getBins(i,r,g);if(h>i.max||y<i.min)return p.reject(new c("histogram:insufficient-data","Range defined by 'minValue' and 'maxValue' does not intersect available data range of the field"));if(d)return t._getBins({min:h,max:y,sqlExpr:i.sqlExpr,excludeZerosExpr:i.excludeZerosExpr},r,g);var s={field:r,normalizationType:a,normalizationField:n,normalizationTotal:i.normTotal},o=_.getFieldExpr(s),u=S.getRangeExpr(o,h,y);return t._binParamsFromGenRend(e,u).then(function(e){return t._getBins(e,r,g)})}):this._histogramForField(e)},t.prototype.classBreaks=function(e){var t=this,r=!1!==e.analyzeData,a=this._hasLocalSource||e.features||e.valueExpression;return r&&a?l.safeCast(this._classBreaksFromMemory(e)):(r?this._classBreaksFromGenRend(e):this._classBreaksFromInterpolation(e)).catch(function(r){return l.safeCast(t._classBreaksFromMemory(e))})},t.prototype.queryFeatureCount=function(e){if(this._hasLocalSource)return p.reject(new c("feature-layer-adapter:not-supported","Layer does not support count query"));var t=this.layer,r=t.createQuery();return r.where=S.mergeWhereClauses(r.where,e),t.queryFeatureCount(r)},t.prototype.generateRenderer=function(e){var t=this.layer;if(this._hasLocalSource||t.version<10.1)return p.reject(new c("feature-layer-adapter:not-supported","Layer does not support generateRenderer operation (requires ArcGIS Server version 10.1+)"));var r=new z({url:t.parsedUrl.path,source:t.dynamicDataSource,gdbVersion:t.gdbVersion}),a=t.createQuery();return e.where=S.mergeWhereClauses(e.where,a.where),r.execute(e)},t.prototype.heatmapStatistics=function(e){var t=this,a=e.field,n=e.fieldOffset;return(a&&null==n?this.summaryStatistics({field:a}):p.resolve(null)).then(function(a){var i=n||0;if(a){var s=a.count,o=a.min,u=a.max;s?o===u&&0===o?i=1:u<=0?i="abs":o<0&&(i=-1.01*o):i=1}return t._heatmapStatsFromMemory(e,i).then(function(e){return r({},e,{summaryStatistics:a,fieldOffset:i})})})},t.prototype.predominantCategories=function(e){return s(this,void 0,void 0,function(){var t,r,a,n,s,o,u,l,m,p,f,d,h,y,v,F,S;return i(this,function(i){switch(i.label){case 0:if(!this._hasLocalSource&&!this.supportsSQLExpression)throw new c("feature-layer-adapter:not-supported","Layer does not support advanced SQL expressions and standardized queries");return t=e.fields,r=e.view,a=g.getArcadeForPredominantCategory(t),n=g.getSQLForPredominantCategoryName(t),s=r&&"3d"===r.type,r&&this._hasLocalSource?s?[4,this._uvFromMemory({valueExpression:a,view:r})]:[3,2]:[3,5];case 1:return l=i.sent(),[3,4];case 2:return[4,this._uvFromClientQuery({valueExpression:a,view:r})];case 3:l=i.sent(),i.label=4;case 4:return u=l,[3,7];case 5:return[4,this._uvFromServiceQuery({sqlExpression:n.expression,valueExpression:a})];case 6:u=i.sent(),i.label=7;case 7:for(o=u,m=o.uniqueValueInfos,p=m.map(function(e){return e.value}),f=t.filter(function(e){return-1===p.indexOf(e)}),d=0,h=f;d<h.length;d++)y=h[d],m.push({value:y,count:0});for(m.sort(function(e,r){return t.indexOf(e.value)-t.indexOf(r.value)}),v=0,F=m;v<F.length;v++)S=F[v],S.value===g.noDominantCategoryField&&(S.value=null);return[2,{predominantCategoryInfos:m}]}})})},t.prototype.getSampleFeatures=function(e){return s(this,void 0,void 0,function(){var t,r,a,n,s,o,l,c,m,p,d,h,y,v,F,g=this;return i(this,function(i){switch(i.label){case 0:t=e.view,r=e.sampleSize,a=e.requiredFields,n=this.layer.createQuery(),s=1,n.outFields=null,n.outSpatialReference=e.spatialReference||t.spatialReference,n.returnGeometry=!0,n.outFields=a,o=[],i.label=1;case 1:return i.trys.push([1,7,,8]),l=!0,a&&a.length?[4,t.whenLayerView(this.layer)]:[3,4];case 2:return c=i.sent(),[4,f.whenFalseOnce(c,"updating")];case 3:i.sent(),l=a.every(function(e){var t=g.getField(e);return c.availableFields.indexOf(t.name)>-1}),i.label=4;case 4:return l?[4,this._fetchFeaturesFromMemory(t,n)]:[3,6];case 5:if(o=i.sent(),o.length&&r>0&&r<=o.length)return[2,u.pickRandom(o,r,s)];i.label=6;case 6:return[3,8];case 7:return m=i.sent(),[3,8];case 8:return i.trys.push([8,12,,13]),[4,this.queryFeatureCount()];case 9:return p=i.sent(),(d=this.layer.maxRecordCount,h=-1===r?p:r,h=d&&h>d?d:h,p<=o.length||o.length>=d)?[2,u.pickRandom(o,o.length,s)]:(y=t.extent.width/t.width/t.scale*4e5,n.maxAllowableOffset=e.resolution||y,p<=h?[2,this._fetchFeaturesFromService(n)]:p<=2e4?[4,this.layer.queryObjectIds()]:[3,11]);case 10:return v=i.sent(),n.objectIds=u.pickRandom(v,h,s),[2,this._fetchFeaturesFromService(n)];case 11:return this.layer.get("capabilities.query.supportsPagination")&&(n.num=h),[2,this._fetchFeaturesFromService(n)];case 12:return F=i.sent(),[2,u.pickRandom(o,o.length,s)];case 13:return[2]}})})},t.prototype.load=function(e){var t=this,r=this.layer.load(e).then(function(e){t.geometryType=e.geometryType,t.objectIdField=e.objectIdField,t.supportsSQLExpression=e.get("capabilities.query.supportsSqlExpression"),t._hasLocalSource=!e.url&&!!e.source,t.hasQueryEngine=t._hasLocalSource,t.minScale=e.minScale,t.maxScale=e.maxScale,t.fullExtent=e.fullExtent});return this.addResolvingPromise(r),this.when()},n([d.property({constructOnly:!0})],t.prototype,"layer",void 0),t=n([d.subclass("esri.renderers.smartMapping.support.adapters.FeatureLayerAdapter")],t)}(d.declared(w))});