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

define(["require","exports","dojo/regexp"],function(a,e,r){function n(a,e){var r=u[a.toLowerCase()];if(null==r)throw new Error("Function Not Recognised");if(e.length<r.minParams||e.length>r.maxParams)throw new Error("Invalid Parameter count for call to "+a.toUpperCase());return r.evaluate(e)}function t(a,e){var r=u[a.toLowerCase()];return null!=r&&e>=r.minParams&&e<=r.maxParams}Object.defineProperty(e,"__esModule",{value:!0});var l=function(){function a(){this.op="+",this.day=0,this.second=0,this.hour=0,this.month=0,this.year=0,this.minute=0}return a.fixDefaults=function(a){if(null!==a.precision||null!==a.secondary)throw new Error("Primary and Secondary SqlInterval qualifiers not supported")},a.createFromMilliseconds=function(e){var r=new a;return r.second=e/1e3,r},a.createFromValueAndQualifer=function(e,r,n){var t=null,l=new a;if(l.op="-"===n?"-":"+","interval-period"===r.type){a.fixDefaults(r);var u=new RegExp("^[0-9]{1,}$");if("year"===r.period||"month"===r.period)throw new Error("Year-Month Intervals not supported");if(!u.test(e))throw new Error("Illegal Interval");l[r.period]=parseFloat(e)}else{if(a.fixDefaults(r.start),a.fixDefaults(r.end),"year"===r.start.period||"month"===r.start.period)throw new Error("Year-Month Intervals not supported");if("year"===r.end.period||"month"===r.end.period)throw new Error("Year-Month Intervals not supported");switch(r.start.period){case"day":switch(r.end.period){case"hour":if(t=new RegExp("^[0-9]{1,} [0-9]{1,}$"),!t.test(e))throw new Error("Illegal Interval");l[r.start.period]=parseFloat(e.split(" ")[0]),l[r.end.period]=parseFloat(e.split(" ")[1]);break;case"minute":if(t=new RegExp("^[0-9]{1,} [0-9]{1,2}:[0-9]{1,}$"),!t.test(e))throw new Error("Illegal Interval");l[r.start.period]=parseFloat(e.split(" ")[0]);var o=e.split(" ")[1].split(":");l.hour=parseFloat(o[0]),l.minute=parseFloat(o[1]);break;case"second":if(t=new RegExp("^[0-9]{1,} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,}([.]{1}[0-9]{1,}){0,1}$"),!t.test(e))throw new Error("Illegal Interval");l[r.start.period]=parseFloat(e.split(" ")[0]);var o=e.split(" ")[1].split(":");l.hour=parseFloat(o[0]),l.minute=parseFloat(o[1]),l.second=parseFloat(o[2]);break;default:throw"Invalid Interval."}break;case"hour":switch(r.end.period){case"minute":if(t=new RegExp("^[0-9]{1,}:[0-9]{1,}$"),!t.test(e))throw new Error("Illegal Interval");l.hour=parseFloat(e.split(":")[0]),l.minute=parseFloat(e.split(":")[1]);break;case"second":if(t=new RegExp("^[0-9]{1,}:[0-9]{1,2}:[0-9]{1,}([.]{1}[0-9]{1,}){0,1}$"),!t.test(e))throw new Error("Illegal Interval");var o=e.split(":");l.hour=parseFloat(o[0]),l.minute=parseFloat(o[1]),l.second=parseFloat(o[2]);break;default:throw"Invalid Interval."}break;case"minute":switch(r.end.period){case"second":if(t=new RegExp("^[0-9]{1,}:[0-9]{1,}([.]{1}[0-9]{1,}){0,1}$"),!t.test(e))throw new Error("Illegal Interval");var o=e.split(":");l.minute=parseFloat(o[0]),l.second=parseFloat(o[1]);break;default:throw"Invalid Interval."}break;default:throw"Invalid Interval."}}return l},a.prototype.valueInMilliseconds=function(){return("-"===this.op?-1:1)*(1e3*this.second+60*this.minute*1e3+60*this.hour*60*1e3+24*this.day*60*60*1e3+this.month*(365/12)*24*60*60*1e3+365*this.year*24*60*60*1e3)},a}();e.SqlInterval=l,e.evaluateFunction=n,e.isStandardized=t;var u={extract:{minParams:2,maxParams:2,evaluate:function(a){var e=a[0],r=a[1];if(null==r)return null;if(r instanceof Date)switch(e.toUpperCase()){case"SECOND":return r.getSeconds();case"MINUTE":return r.getMinutes();case"HOUR":return r.getHours();case"DAY":return r.getDate();case"MONTH":return r.getMonth()+1;case"YEAR":return r.getFullYear()}throw new Error("Invalid Parameter for call to EXTRACT")}},substring:{minParams:2,maxParams:3,evaluate:function(a){if(2===a.length){var e=a[0],r=a[1];return null==e||null==r?null:e.toString().substring(r-1)}if(3===a.length){var e=a[0],r=a[1],n=a[2];return null==e||null==r||null==n?null:n<=0?"":e.toString().substring(r-1,r+n-1)}}},position:{minParams:2,maxParams:2,evaluate:function(a){var e=a[0],r=a[1];return null==e||null==r?null:r.indexOf(e)+1}},trim:{minParams:2,maxParams:3,evaluate:function(a){var e=3===a.length,n=e?a[1]:" ",t=e?a[2]:a[1];if(null==n||null==t)return null;var l="("+r.escapeString(n)+")";switch(a[0]){case"BOTH":return t.replace(new RegExp("^"+l+"*|"+l+"*$","g"),"");case"LEADING":return t.replace(new RegExp("^"+l+"*","g"),"");case"TRAILING":return t.replace(new RegExp(l+"*$","g"),"")}throw new Error("Invalid Parameter for call to TRIM")}},abs:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.abs(a[0])}},ceiling:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.ceil(a[0])}},floor:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.floor(a[0])}},log:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.log(a[0])}},log10:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.log(a[0])*Math.LOG10E}},sin:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.sin(a[0])}},cos:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.cos(a[0])}},tan:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.tan(a[0])}},asin:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.asin(a[0])}},acos:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.acos(a[0])}},atan:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.atan(a[0])}},sign:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:a[0]>0?1:a[1]<0?-1:0}},power:{minParams:2,maxParams:2,evaluate:function(a){return null==a[0]||null==a[1]?null:Math.pow(a[0],a[1])}},mod:{minParams:2,maxParams:2,evaluate:function(a){return null==a[0]||null==a[1]?null:a[0]%a[1]}},round:{minParams:1,maxParams:2,evaluate:function(a){var e=a[0],r=2===a.length?Math.pow(10,a[1]):1;return null==e?null:Math.round(e*r)/r}},truncate:{minParams:1,maxParams:2,evaluate:function(a){return null==a[0]?null:1===a.length?parseInt(a[0].toFixed(0),10):parseFloat(a[0].toFixed(a[1]))}},char_length:{minParams:1,maxParams:1,evaluate:function(a){return"string"==typeof a[0]||a[0]instanceof String?a[0].length:0}},concat:{minParams:1,maxParams:1/0,evaluate:function(a){for(var e="",r=0;r<a.length;r++){if(null==a[r])return null;e+=a[r].toString()}return e}},lower:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:a[0].toString().toLowerCase()}},upper:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:a[0].toString().toUpperCase()}}}});