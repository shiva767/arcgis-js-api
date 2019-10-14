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

define(["require","exports","../has","../lang","../Logger","../ObjectPool","./extensions","./PropertyOrigin","./Store"],function(t,e,r,i,s,o,n,a,h){function u(t,e){return!!e.metadatas[t]||(r("dojo-debug-messages")&&c.warn("cannot access unknown property '"+t+"' on instance of "+e.host.declaredClass+"."),!1)}function l(t,e,i,s){return!t.nonNullable||null!=i||(0!==s.host.__accessor__.lifecycle&&r("dojo-debug-messages")&&c.warn("cannot set non-nullable property '"+e+"' to null on "+s.host.declaredClass+"."),!1)}function d(t){return t&&"function"==typeof t.destroy}Object.defineProperty(e,"__esModule",{value:!0});var c=s.getLogger("esri.core.accessorSupport.Properties"),p=function(){function t(t){this.host=t,this._origin=a.OriginId.USER,this.cursors=null,this.ctorArgs=null,this.destroyed=!1,this.dirties={},this.lifecycle=0,this.overridden=null,this.store=new h.default;var e=this.host.constructor.__accessorMetadata__;this.metadatas=e.properties,this.autoDestroy=e.autoDestroy}return t.prototype.initialize=function(){this.lifecycle=1,n.instanceCreated(this.host,this.metadatas)},t.prototype.constructed=function(){this.lifecycle=2},t.prototype.destroy=function(){this.destroyed=!0;var t=this.cursors;if(t)for(var e=0,r=Object.getOwnPropertyNames(t);e<r.length;e++){var i=r[e],s=t[i];if(s){for(;s.length>0;)s.pop().propertyDestroyed(this,i);t[i]=null}}if(this.autoDestroy)for(var i in this.metadatas){var o=this.internalGet(i);o&&d(o)&&(o.destroy(),this.metadatas[i].nonNullable||this.internalSet(i,null))}},Object.defineProperty(t.prototype,"initialized",{get:function(){return 0!==this.lifecycle},enumerable:!0,configurable:!0}),t.prototype.clearOverride=function(t){this.isOverridden(t)&&(this.overridden[t]=!1,this.propertyInvalidated(t))},t.prototype.get=function(t){u(t,this);var e=this.metadatas[t],r=e.get;if(this.store.has(t)&&(!r||!this.dirties[t]))return this.store.get(t);if(r){var i=r.call(this.host);return this.store.set(t,i,a.OriginId.COMPUTED),this.propertyCommitted(t),i}return e.value},t.prototype.getterStatic=function(t,e){return this.store.has(t)?this.store.get(t):e.value},t.prototype.getterComputed=function(t,e){if(this.store.has(t)&&!this.dirties[t])return this.store.get(t);var r=e.get.call(this.host);return this.store.set(t,r,a.OriginId.COMPUTED),this.propertyCommitted(t),r},t.prototype.originOf=function(t){var e=this.store.originOf(t);if(void 0===e){var r=this.metadatas[t];if(r&&r.hasOwnProperty("value"))return"defaults"}return a.idToName(e)},t.prototype.has=function(t){return!!this.metadatas[t]&&this.store.has(t)},t.prototype.internalGet=function(t){if(u(t,this)){var e=this.store;return e.has(t)?e.get(t):this.metadatas[t].value}},t.prototype.internalSet=function(t,e){if(u(t,this)){var r=this.initialized?this._origin:a.OriginId.DEFAULTS,s=this.store.get(t);(!i.equals(e,s)||r!==this.store.originOf(t)||!this.store.has(t,r)||this.isOverridden(t))&&(this.propertyInvalidated(t),this.store.set(t,e,r),this.propertyCommitted(t))}},t.prototype.isOverridden=function(t){return null!=this.overridden&&!0===this.overridden[t]},t.prototype.keys=function(){return Object.keys(this.metadatas)},t.prototype.override=function(t,e){if(u(t,this)){this.overridden||(this.overridden={});var r=this.metadatas[t];if(l(r,t,e,this)){var i=r.cast;if(i){var s=this.cast(i,e),o=s.valid,n=s.value;if(v.release(s),!o)return;e=n}this.overridden[t]=!0,this.internalSet(t,e)}}},t.prototype.set=function(t,e){if(u(t,this)){var r=this.metadatas[t];if(l(r,t,e,this)){var i=r.set,s=r.cast;if(s){var o=this.cast(s,e),n=o.valid,a=o.value;if(v.release(o),!n)return;e=a}i?i.call(this.host,e):this.internalSet(t,e)}}},t.prototype.setDefaultOrigin=function(t){this._origin=a.nameToId(t)},t.prototype.propertyInvalidated=function(t){var e=this.dirties;this.isOverridden(t)||(e[t]=!0);var r=this.cursors&&this.cursors[t];if(r)for(var i=0,s=r;i<s.length;i++){var o=s[i];o.propertyInvalidated(this,t)}},t.prototype.propertyCommitted=function(t){var e=this.cursors&&this.cursors[t];if(this.dirties[t]=!1,e)for(var r=0,i=e;r<i.length;r++){var s=i[r];s.propertyCommitted(this,t)}},t.prototype.addCursor=function(t,e){this.cursors||(this.cursors={});var r=this.cursors[t];r||(this.cursors[t]=r=[]),r.push(e)},t.prototype.removeCursor=function(t,e){var r=this.cursors[t];this.cursors[t]&&(r.splice(r.indexOf(e),1),0===r.length&&(this.cursors[t]=null))},t.prototype.cast=function(t,e){var r=v.acquire();return r.valid=!0,r.value=e,t&&(r.value=t.call(this.host,e,r)),r},t}(),f=function(){function t(){this.value=null,this.valid=!0}return t.prototype.acquire=function(){this.valid=!0},t.prototype.release=function(){this.value=null},t}(),v=new o(f);e.default=p});