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

define(["require","exports","../../core/tsSupport/assignHelper","../../core/Logger","../../core/unitUtils","../../intl/date","./numberUtils","../visualVariables/support/ColorStop"],function(e,t,a,n,r,o,l,i){function s(e,t,a){var n="";return 0===t?n=h.lt+" ":t===a&&(n=h.gt+" "),n+e}function u(e){var t=e.values,a=e.colors,n=e.labelIndexes,r=e.isDate,u=e.dateFormatOptions;return t.map(function(e,m){var c=!n||n.indexOf(m)>-1,d=null;if(c){var f=void 0;f=r?o.formatDate(e,u):l.format(e),f&&(d=s(f,m,t.length-1))}return new i({value:e,color:a[m],label:d})})}function m(e){for(var t=e.stops,a=e.changes,n=e.isDate,r=e.dateFormatOptions,i=t.map(function(e){return e.value}),u=[],m=0,c=a;m<c.length;m++){var d=c[m];u.push(d.index),i[d.index]=d.value}var f=l.round(i,{indexes:u});t.forEach(function(e,a){if(e.value=i[a],null!=e.label){var u=void 0,m=null;u=n?o.formatDate(f[a],r):l.format(f[a]),u&&(m=s(u,a,t.length-1)),e.label=m}})}function c(e){var t=e.minValue,a=e.maxValue,n=e.isFirstBreak?"":h.gt+" ",r="percent-of-total"===e.normalizationType?h.pct:"";return t=null==t?"":l.format(t),a=null==a?"":l.format(a),n+t+r+" "+h.ld+" "+a+r}function d(e){var t=e.classBreakInfos,a=e.normalizationType,n=[];if(t&&t.length){if("standard-deviation"===e.classificationMethod)return void p.warn("setLabelsForClassBreaks","cannot set labels for class breaks generated using 'standard-deviation' method.");if(e.round){n.push(t[0].minValue);for(var r=0,o=t;r<o.length;r++){var i=o[r];n.push(i.maxValue)}n=l.round(n),t.forEach(function(e,t){e.label=c({minValue:0===t?n[0]:n[t],maxValue:n[t+1],isFirstBreak:0===t,normalizationType:a})})}else t.forEach(function(e,t){e.label=c({minValue:e.minValue,maxValue:e.maxValue,isFirstBreak:0===t,normalizationType:a})})}}function f(e){if("standard-deviation"===e.classificationMethod)return void p.warn("updateClassBreak","cannot update labels for class breaks generated using 'standard-deviation' method.");var t=e.classBreaks,a=e.change,n=a.index,r=a.value,o=t.length,l=-1,i=-1;0===n?l=n:n===o?i=n-1:(i=n-1,l=n);var s=e.normalizationType,u=null;l>-1&&l<o&&(u=t[l],u.minValue=r,u.label=c({minValue:u.minValue,maxValue:u.maxValue,isFirstBreak:0===l,normalizationType:s})),i>-1&&i<o&&(u=t[i],u.maxValue=r,u.label=c({minValue:u.minValue,maxValue:u.maxValue,isFirstBreak:0===i,normalizationType:s}))}function v(e){for(var t=e.map(function(e){return new Date(e)}),a=t.length,n=1/0,r=null,o=0;o<a-1;o++){for(var l=t[o],i=[],s=1/0,u=null,m=o+1;m<a;m++){var c=t[m],d=l.getFullYear()!==c.getFullYear()&&"year"||l.getMonth()!==c.getMonth()&&"month"||l.getDate()!==c.getDate()&&"day"||l.getHours()!==c.getHours()&&"hour"||l.getMinutes()!==c.getMinutes()&&"minute"||l.getSeconds()!==c.getSeconds()&&"second"||"millisecond",f=y[d];f<s&&(s=f,u=d),i.push(d)}s<n&&(n=s,r=u)}return r}function g(e){var t=e.value,a=e.domain,n=e.fieldInfo,r=e.dateFormatInterval,i=String(t),s=a&&"codedValues"in a&&a.codedValues?a.getName(t):null;return s?i=s:"number"==typeof t&&(i=n&&"date"===n.type?o.formatDate(t,r&&o.convertDateFormatToIntlOptions(V[r])):l.format(t)),i}Object.defineProperty(t,"__esModule",{value:!0});var p=n.getLogger("esri.renderers.support.utils"),h={lte:"<=",gte:">=",lt:"<",gt:">",pct:"%",ld:"–"},y={millisecond:0,second:1,minute:2,hour:3,day:4,month:5,year:6},V={millisecond:"long-month-day-year-long-time",second:"long-month-day-year-long-time",minute:"long-month-day-year-short-time",hour:"long-month-day-year-short-time",day:"long-month-day-year",month:"long-month-day-year",year:"year"};t.meterIn={inches:r.convertUnit(1,"meters","inches"),feet:r.convertUnit(1,"meters","feet"),"us-feet":r.convertUnit(1,"meters","us-feet"),yards:r.convertUnit(1,"meters","yards"),miles:r.convertUnit(1,"meters","miles"),"nautical-miles":r.convertUnit(1,"meters","nautical-miles"),millimeters:r.convertUnit(1,"meters","millimeters"),centimeters:r.convertUnit(1,"meters","centimeters"),decimeters:r.convertUnit(1,"meters","decimeters"),meters:r.convertUnit(1,"meters","meters"),kilometers:r.convertUnit(1,"meters","kilometers"),"decimal-degrees":1/r.lengthToDegrees(1,"meters")},t.timelineDateFormatOptions=o.convertDateFormatToIntlOptions("short-date"),t.createColorStops=u,t.updateColorStops=m,t.createClassBreakLabel=c,t.setLabelsForClassBreaks=d,t.updateClassBreak=f,t.calculateDateFormatInterval=v,t.createUniqueValueLabel=g});