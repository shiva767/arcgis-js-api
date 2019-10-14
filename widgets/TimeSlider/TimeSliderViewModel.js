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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../TimeExtent","../../TimeInterval","../../core/Accessor","../../core/compilerUtils","../../core/mathUtils","../../core/accessorSupport/decorators","../../layers/support/timeUtils"],function(t,e,r,n,i,o,l,u,a,p,s){return function(t){function e(e){var r=t.call(this,e)||this;return r.fullTimeExtent=null,r.loop=!0,r.mode="time-window",r.stops={count:10},r.timerId=null,r.view=null,r}return r(e,t),e.prototype.destroy=function(){null!=this.timerId&&(clearInterval(this.timerId),this.timerId=null)},Object.defineProperty(e.prototype,"effectiveStops",{get:function(){var t=this,e=t.fullTimeExtent,r=t.stops;if(!r)return[];if("dates"in r){var n=r.dates;if(null==n||0===n.length)return null;var i=n.sort(function(t,e){return t.getTime()-e.getTime()});return e?i.filter(function(t){var r=e.start,n=e.end;return!(t.getTime()<r.getTime()||t.getTime()>n.getTime())}):i}if("count"in r){var o=r.timeExtent||e;return this._divideTimeExtentByCount(o,r.count)}if("interval"in r){var o=r.timeExtent||e;return this._divideTimeExtentByInterval(o,r.interval)}return[]},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"playRate",{set:function(t){t<=0||t>36e5||("playing"===this.state&&this._startAnimation(),this._set("playRate",t))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"state",{get:function(){return this.values&&this.fullTimeExtent?this.timerId?"playing":"ready":"disabled"},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"timeExtent",{get:function(){var t=this,e=t.mode,r=t.values;if(!r||0===r.length)return null;switch(e){case"instant":return new i({start:r[0],end:r[0]});case"time-window":return r.length>1?new i({start:r[0],end:r[1]}):null;case"cumulative-from-start":return new i({start:null,end:r[0]});case"cumulative-from-end":return new i({start:r[0],end:null});default:return void u.neverReached(e)}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"values",{set:function(t){var e=this,r=e.fullTimeExtent,n=e.view;if(r){var i=r.start,o=r.end,l=i.getTime(),u=o.getTime();t=t.map(function(t){var e=t.getTime(),r=a.clamp(e,l,u);return new Date(r)})}n&&(n.timeExtent=this._toTimeExtent(t)),this._set("values",t)},enumerable:!0,configurable:!0}),e.prototype.next=function(){this.values&&this.fullTimeExtent&&this._step(!0)},e.prototype.play=function(){this._clearAnimation(),this._startAnimation()},e.prototype.previous=function(){this._step(!1)},e.prototype.stop=function(){this._clearAnimation()},e.prototype._clearAnimation=function(){null!=this.timerId&&(clearInterval(this.timerId),this.timerId=null)},e.prototype._startAnimation=function(){var t=this;this._step(),this.timerId=setInterval(function(){t._step()},this.playRate)},e.prototype._step=function(t){void 0===t&&(t=!0);var e=this,r=e.effectiveStops,n=e.values;if(n&&0!==n.length&&!(n.length>r.length)){var i=r.map(function(t){return t.getTime()}).sort(function(t,e){return t-e}),o=n.map(function(t){return t.getTime()}),l=o.map(function(t){var e=i.indexOf(t);if(-1!==e)return e;var r=i.reduce(function(e,r){return Math.abs(r-t)<Math.abs(e-t)?r:e});return i.indexOf(r)}),u=l.map(function(e){return e+=t?1:-1}),a=u.some(function(t){return t<0||t>i.length-1}),p=this,s=p.loop,m=p.state;if(a)if(s){var c=Math.min.apply(Math,l),f=Math.max.apply(Math,l),d=t?l.map(function(t){return t-c}):l.map(function(t){return t+(i.length-1-f)});this.values=d.map(function(t){return new Date(i[t])})}else"playing"===m&&this.stop();else this.values=u.map(function(t){return new Date(i[t])})}},e.prototype._divideTimeExtentByCount=function(t,e){if(!t||!e)return[];var r=t.start,n=t.end;if(!r||!n)return[];var i=Math.floor((n.getTime()-r.getTime())/e),l=new o({value:i});return this._divideTimeExtentByInterval(t,l)},e.prototype._divideTimeExtentByInterval=function(t,e){if(!t||!e)return[];var r=t.start,n=t.end;if(!r||!n)return[];for(var i=[],o=e.value,l=e.unit,u=r;u.getTime()<=n.getTime();)i.push(new Date(u.getTime())),u=s.offsetDate(u,o,l);return i},e.prototype._toTimeExtent=function(t){if(!t||0===t.length)return null;var e=t[0],r=t.length>1?t[1]:t[0];switch(this.mode){case"instant":case"time-window":return new i({start:e,end:r});case"cumulative-from-start":return new i({start:null,end:e});case"cumulative-from-end":return new i({start:e,end:null});default:return null}},n([p.property({dependsOn:["stops","fullTimeExtent"],readOnly:!0})],e.prototype,"effectiveStops",null),n([p.property({type:i})],e.prototype,"fullTimeExtent",void 0),n([p.property({nonNullable:!0})],e.prototype,"loop",void 0),n([p.property({nonNullable:!0})],e.prototype,"mode",void 0),n([p.property({nonNullable:!0,value:1e3})],e.prototype,"playRate",null),n([p.property({dependsOn:["fullTimeExtent","timerId","values"],readOnly:!0})],e.prototype,"state",null),n([p.property()],e.prototype,"stops",void 0),n([p.property({dependsOn:["values"],readOnly:!0})],e.prototype,"timeExtent",null),n([p.property()],e.prototype,"timerId",void 0),n([p.property({value:null})],e.prototype,"values",null),n([p.property()],e.prototype,"view",void 0),n([p.property()],e.prototype,"next",null),n([p.property()],e.prototype,"play",null),n([p.property()],e.prototype,"previous",null),n([p.property()],e.prototype,"stop",null),e=n([p.subclass("esri.widgets.TimeSlider.TimeSliderViewModel")],e)}(p.declared(l))});