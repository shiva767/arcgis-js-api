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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/cookie","dojo/regexp","../config","../kernel","../request","../core/Error","../core/Evented","../core/global","../core/has","../core/lang","../core/object","../core/promiseUtils","../core/urlUtils","../core/urlUtils","../core/accessorSupport/decorators","./OAuthCredential","./OAuthInfo","./ServerInfo"],function(e,r,t,s,i,n,o,a,l,h,u,c,p,d,f,v,_,g,m,S,y,w,I){Object.defineProperty(r,"__esModule",{value:!0});var k={},U=function(e){var r=new m.Url(e.owningSystemUrl).host,t=new m.Url(e.server).host,s=/.+\.arcgis\.com$/i;return s.test(r)&&s.test(t)},A=function(e,r){return!!(U(e)&&r&&r.some(function(r){return r.test(e.server)}))},T=function(e){function r(){var r=e.call(this)||this;return r._portalConfig=p.esriGeowConfig,r.serverInfos=[],r.oAuthInfos=[],r.credentials=[],r._soReqs=[],r._xoReqs=[],r._portals=[],r.defaultOAuthInfo=null,r.defaultTokenValidity=60,r.tokenValidity=null,r.signInPage=null,r.useSignInPage=!0,r.normalizeWebTierAuth=!1,r._busy=null,r._rejectOnPersistedPageShow=!1,r._oAuthHash=null,r._gwTokenUrl="/sharing/rest/generateToken",r._agsRest="/rest/services",r._agsPortal=/\/sharing(\/|$)/i,r._agsAdmin=/(https?:\/\/[^\/]+\/[^\/]+)\/admin\/?(\/.*)?$/i,r._adminSvcs=/\/rest\/admin\/services(\/|$)/i,r._agolSuffix=".arcgis.com",r._gwDomains=[{regex:/^https?:\/\/www\.arcgis\.com/i,tokenServiceUrl:"https://www.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/dev\.arcgis\.com/i,tokenServiceUrl:"https://dev.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/[\w\.]*dev[^.]*\.arcgis\.com/i,tokenServiceUrl:"https://devext.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/[\w\.]*qa[^.]*\.arcgis\.com/i,tokenServiceUrl:"https://qaext.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/[\w\.]*\.arcgis\.com/i,tokenServiceUrl:"https://www.arcgis.com/sharing/rest/generateToken"}],r._legacyFed=[],r._regexSDirUrl=/http.+\/rest\/services\/?/gi,r._regexServerType=/(\/(MapServer|GeocodeServer|GPServer|GeometryServer|ImageServer|NAServer|FeatureServer|GeoDataServer|GlobeServer|MobileServer|GeoenrichmentServer|VectorTileServer|SceneServer)).*/gi,r._gwUser=/http.+\/users\/([^\/]+)\/?.*/i,r._gwItem=/http.+\/items\/([^\/]+)\/?.*/i,r._gwGroup=/http.+\/groups\/([^\/]+)\/?.*/i,r._rePortalTokenSvc=/\/sharing(\/rest)?\/generatetoken/i,r._createDefaultOAuthInfo=!0,r._hasTestedIfAppIsOnPortal=!1,r._getOAuthHash(),window.addEventListener("pageshow",function(e){r._pageShowHandler(e)}),r}return s(r,e),r.prototype.registerServers=function(e){var r=this,t=this.serverInfos;t?(e=e.filter(function(e){return!r.findServerInfo(e.server)}),this.serverInfos=t.concat(e)):this.serverInfos=e,e.forEach(function(e){e.owningSystemUrl&&r._portals.push(e.owningSystemUrl),e.hasPortal&&r._portals.push(e.server)})},r.prototype.registerOAuthInfos=function(e){var r=this,t=this.oAuthInfos;t?(e=e.filter(function(e){return!r.findOAuthInfo(e.portalUrl)}),this.oAuthInfos=t.concat(e)):this.oAuthInfos=e},r.prototype.registerToken=function(e){e=t({},e);var r,s=this._sanitizeUrl(e.server),i=this._isServerRsrc(s),n=this.findServerInfo(s),o=!0;n||(n=new I,n.server=this._getServerInstanceRoot(s),i?n.hasServer=!0:(n.tokenServiceUrl=this._getTokenSvcUrl(s),n.hasPortal=!0),this.registerServers([n])),r=this._findCredential(s),r?(delete e.server,f.mixin(r,e),o=!1):(r=new x({userId:e.userId,server:n.server,token:e.token,expires:e.expires,ssl:e.ssl,scope:i?"server":"portal"}),r.resources=[s],this.credentials.push(r)),r.emitTokenChange(!1),o||r.refreshServerTokens()},r.prototype.toJSON=function(){return f.fixJson({serverInfos:this.serverInfos.map(function(e){return e.toJSON()}),oAuthInfos:this.oAuthInfos.map(function(e){return e.toJSON()}),credentials:this.credentials.map(function(e){return e.toJSON()})})},r.prototype.initialize=function(e){var r=this;if(e){"string"==typeof e&&(e=JSON.parse(e));var t=e.serverInfos,s=e.oAuthInfos,i=e.credentials;if(t){var n=[];t.forEach(function(e){e.server&&e.tokenServiceUrl&&n.push(e.declaredClass?e:new I(e))}),n.length&&this.registerServers(n)}if(s){var o=[];s.forEach(function(e){e.appId&&o.push(e.declaredClass?e:new w(e))}),o.length&&this.registerOAuthInfos(o)}i&&i.forEach(function(e){e.server&&e.token&&e.expires&&e.expires>Date.now()&&(e=e.declaredClass?e:new x(e),e.emitTokenChange(),r.credentials.push(e))})}},r.prototype.findServerInfo=function(e){var r;e=this._sanitizeUrl(e);for(var t=0,s=this.serverInfos;t<s.length;t++){var i=s[t];if(this._hasSameServerInstance(i.server,e)){r=i;break}}return r},r.prototype.findOAuthInfo=function(e){var r;e=this._sanitizeUrl(e);for(var t=0,s=this.oAuthInfos;t<s.length;t++){var i=s[t];if(this._hasSameServerInstance(i.portalUrl,e)){r=i;break}}return r},r.prototype.findCredential=function(e,r){var t,s;if(e=this._sanitizeUrl(e),s=this._isServerRsrc(e)?"server":"portal",r)for(var i=0,n=this.credentials;i<n.length;i++){var o=n[i];if(this._hasSameServerInstance(o.server,e)&&r===o.userId&&o.scope===s){t=o;break}}else for(var a=0,l=this.credentials;a<l.length;a++){var o=l[a];if(this._hasSameServerInstance(o.server,e)&&-1!==this._getIdenticalSvcIdx(e,o)&&o.scope===s){t=o;break}}return t},r.prototype.getCredential=function(e,r){var s,i,o=!0;r&&(s=!!r.token,i=r.error,o=!1!==r.prompt),r=t({},r),e=this._sanitizeUrl(e);var a=_.createAbortController(),l=_.createResolver(function(){a.abort()});if(r&&r.signal&&_.onAbort(r.signal,function(){a.abort()}),_.onAbort(a,function(){l.reject(new u("identity-manager:user-aborted","ABORTED"))}),_.isAborted(a))return l.promise;r.signal=a.signal;var h,c=this._isAdminResource(e),p=s&&this._doPortalSignIn(e)?this._getEsriAuthCookie():null,d=s?this.findCredential(e):null;if(d&&i&&i.details&&498===i.details.httpStatus)d.destroy(),p&&p.token===r.token&&n("esri_auth",null,{expires:-1,path:"/",domain:document.domain});else if(p||d){var f=p&&p.email||d&&d.userId;return h=new u("identity-manager:not-authorized","You are currently signed in as: '"+f+"'. You do not have access to this resource: "+e,{error:i}),l.reject(h),l.promise}var v=this._findCredential(e,r);if(v)return l.resolve(v),l.promise;var g=this.findServerInfo(e);if(g)!g.hasServer&&this._isServerRsrc(e)&&(g._restInfoPms=this._getTokenSvcUrl(e),g.hasServer=!0);else{var m=this._getTokenSvcUrl(e);if(!m)return h=new u("identity-manager:unknown-resource","Unknown resource - could not find token service endpoint."),l.reject(h),l.promise;g=new I,g.server=this._getServerInstanceRoot(e),"string"==typeof m?(g.tokenServiceUrl=m,g.hasPortal=!0):(g._restInfoPms=m,g.hasServer=!0),this.registerServers([g])}return o&&g.hasPortal&&void 0===g._selfReq&&!this._findOAuthInfo(e)&&(g._selfReq={owningTenant:r&&r.owningTenant,selfDfd:this._getPortalSelf(g.tokenServiceUrl.replace(this._rePortalTokenSvc,"/sharing/rest/portals/self"),e)}),this._enqueue(e,g,r,l,c)},r.prototype.getResourceName=function(e){return this._isRESTService(e)?e.replace(this._regexSDirUrl,"").replace(this._regexServerType,"")||"":this._gwUser.test(e)&&e.replace(this._gwUser,"$1")||this._gwItem.test(e)&&e.replace(this._gwItem,"$1")||this._gwGroup.test(e)&&e.replace(this._gwGroup,"$1")||""},r.prototype.generateToken=function(e,r,t){var s,i,n,o,a,c,p,d,v,_,S=this._rePortalTokenSvc.test(e.tokenServiceUrl),y=new m.Url(window.location.href.toLowerCase()),w=this._getEsriAuthCookie(),I=e.shortLivedTokenValidity;return r&&(_=l.id.tokenValidity||I||l.id.defaultTokenValidity)>I&&I>0&&(_=I),t&&(i=t.isAdmin,n=t.serverUrl,o=t.token,p=t.signal,d=t.ssl,e.customParameters=t.customParameters),i?a=e.adminTokenServiceUrl:(a=e.tokenServiceUrl,c=new m.Url(a.toLowerCase()),w&&(s=w.auth_tier,s=s&&s.toLowerCase()),("web"===s||e.webTierAuth)&&t&&t.serverUrl&&!d&&"http"===y.scheme&&(g.hasSameOrigin(y.uri,a,!0)||"https"===c.scheme&&y.host===c.host&&"7080"===y.port&&"7443"===c.port)&&(a=a.replace(/^https:/i,"http:").replace(/:7443/i,":7080"))),v=f.mixin({query:f.mixin({request:"getToken",username:r&&r.username,password:r&&r.password,serverUrl:n,token:o,expiration:_,referer:i||S?window.location.host:null,client:i?"referer":null,f:"json"},e.customParameters),method:"post",authMode:"anonymous",useProxy:this._useProxy(e,t),responseType:"json",signal:p},t&&t.ioArgs),S||(v.withCredentials=!1),h(a,v).then(function(t){var s=t.data;if(!s||!s.token)return new u("identity-manager:authentication-failed","Unable to generate token");var i=e.server;return k[i]||(k[i]={}),r&&(k[i][r.username]=r.password),s.validity=_,s})},r.prototype.isBusy=function(){return!!this._busy},r.prototype.checkSignInStatus=function(e){return this.checkAppAccess(e,"").then(function(e){return e.credential})},r.prototype.checkAppAccess=function(e,r,t){var s=this;return this.getCredential(e,{prompt:!1}).then(function(i){var n,o={f:"json"};if("portal"===i.scope)if(r&&(s._doPortalSignIn(e,!0)||t&&t.force))n=i.server+"/sharing/rest/oauth2/validateAppAccess",o.client_id=r;else{if(!i.token)return{credential:i};n=i.server+"/sharing/rest"}else{if(!i.token)return{credential:i};n=i.server+"/rest/services"}return i.token&&(o.token=i.token),h(n,{query:o,authMode:"anonymous"}).then(function(e){if(!1===e.data.valid)throw new u("identity-manager:not-authorized","You are currently signed in as: '"+i.userId+"'.");return{credential:i}}).catch(function(e){if("identity-manager:not-authorized"===e.name)throw e;var r=e.details&&e.details.httpStatus;if(498===r)throw i.destroy(),new u("identity-manager:not-authenticated","User is not signed in.");if(400===r)throw new u("identity-manager:invalid-request");return{credential:i}})})},r.prototype.setRedirectionHandler=function(e){this._redirectFunc=e},r.prototype.setProtocolErrorHandler=function(e){this._protocolFunc=e},r.prototype.destroyCredentials=function(){if(this.credentials){this.credentials.slice().forEach(function(e){e.destroy()})}this.emit("credentials-destroy")},r.prototype._getOAuthHash=function(){var e=window.location.hash;if(e){"#"===e.charAt(0)&&(e=e.substring(1));var r=g.queryToObject(e),t=!1;r.access_token&&r.expires_in&&r.state&&r.hasOwnProperty("username")?(r.state=JSON.parse(r.state),this._oAuthHash=r,t=!0):r.error&&r.error_description&&(console.log("IdentityManager OAuth Error: ",r.error," - ",r.error_description),"access_denied"===r.error&&(t=!0)),t&&(!d("ie")||d("ie")>8)&&(window.location.hash="")}},r.prototype._pageShowHandler=function(e){if(e.persisted&&this.isBusy()&&this._rejectOnPersistedPageShow){var r=new u("identity-manager:user-aborted","ABORTED");this._errbackFunc(r)}},r.prototype._findCredential=function(e,r){var t,s,i,n,o=this,a=-1,l=r&&r.token,h=r&&r.resource,u=this._isServerRsrc(e)?"server":"portal",c=this.credentials.filter(function(r){return o._hasSameServerInstance(r.server,e)&&r.scope===u});if(e=h||e,c.length)if(1===c.length){if(t=c[0],n=this.findServerInfo(t.server),s=n&&n.owningSystemUrl,i=s&&this.findCredential(s,t.userId),a=this._getIdenticalSvcIdx(e,t),!l)return-1===a&&t.resources.push(e),this._addResource(e,i),t;-1!==a&&(t.resources.splice(a,1),this._removeResource(e,i))}else{var p,d;if(c.some(function(r){return-1!==(d=o._getIdenticalSvcIdx(e,r))&&(p=r,n=o.findServerInfo(p.server),s=n&&n.owningSystemUrl,i=s&&o.findCredential(s,p.userId),a=d,!0)}),l)p&&(p.resources.splice(a,1),this._removeResource(e,i));else if(p)return this._addResource(e,i),p}},r.prototype._findOAuthInfo=function(e){var r=this.findOAuthInfo(e);if(!r)for(var t=0,s=this.oAuthInfos;t<s.length;t++){var i=s[t];if(this._isIdProvider(i.portalUrl,e)){r=i;break}}return r},r.prototype._addResource=function(e,r){r&&-1===this._getIdenticalSvcIdx(e,r)&&r.resources.push(e)},r.prototype._removeResource=function(e,r){var t=-1;r&&(t=this._getIdenticalSvcIdx(e,r))>-1&&r.resources.splice(t,1)},r.prototype._useProxy=function(e,r){return r&&r.isAdmin&&!g.hasSameOrigin(e.adminTokenServiceUrl,window.location.href)||!this._isPortalDomain(e.tokenServiceUrl)&&"10.1"===String(e.currentVersion)&&!g.hasSameOrigin(e.tokenServiceUrl,window.location.href)},r.prototype._getOrigin=function(e){var r=new m.Url(e);return r.scheme+"://"+r.host+(null!=r.port?":"+r.port:"")},r.prototype._getServerInstanceRoot=function(e){var r=e.toLowerCase(),t=r.indexOf(this._agsRest);return-1===t&&this._isAdminResource(e)&&(t=this._agsAdmin.test(e)?e.replace(this._agsAdmin,"$1").length:e.search(this._adminSvcs)),-1===t&&(t=r.indexOf("/sharing")),-1===t&&"/"===r.substr(-1)&&(t=r.length-1),t>-1?e.substring(0,t):e},r.prototype._hasSameServerInstance=function(e,r){return"/"===e.substr(-1)&&(e=e.slice(0,-1)),e=e.toLowerCase(),r=this._getServerInstanceRoot(r).toLowerCase(),e=this._normalizeAGOLorgDomain(e),r=this._normalizeAGOLorgDomain(r),e=e.substr(e.indexOf(":")),r=r.substr(r.indexOf(":")),e===r},r.prototype._normalizeAGOLorgDomain=function(e){var r=/^https?:\/\/.+\.maps\.arcgis\.com/i,t=/^https?:\/\/.+\.mapsdevext\.arcgis\.com/i,s=/^https?:\/\/.+\.mapsqa\.arcgis\.com/i;return r.test(e)?e=e.replace(r,"https://www.arcgis.com"):t.test(e)?e=e.replace(t,"https://devext.arcgis.com"):s.test(e)&&(e=e.replace(s,"https://qaext.arcgis.com")),e},r.prototype._sanitizeUrl=function(e){var r=(a.request.proxyUrl||"").toLowerCase(),t=r?e.toLowerCase().indexOf(r+"?"):-1;return-1!==t&&(e=e.substring(t+r.length+1)),e=g.normalize(e),g.urlToObject(e).path},r.prototype._isRESTService=function(e){return e.indexOf(this._agsRest)>-1},r.prototype._isAdminResource=function(e){return this._agsAdmin.test(e)||this._adminSvcs.test(e)},r.prototype._isServerRsrc=function(e){return this._isRESTService(e)||this._isAdminResource(e)},r.prototype._isIdenticalService=function(e,r){var t;if(this._isRESTService(e)&&this._isRESTService(r)){var s=this._getSuffix(e).toLowerCase(),i=this._getSuffix(r).toLowerCase();if(!(t=s===i)){var n=/(.*)\/(MapServer|FeatureServer).*/gi;t=s.replace(n,"$1")===i.replace(n,"$1")}}else this._isAdminResource(e)&&this._isAdminResource(r)?t=!0:this._isServerRsrc(e)||this._isServerRsrc(r)||!this._isPortalDomain(e)||(t=!0);return t},r.prototype._isPortalDomain=function(e){var r=this,t=new m.Url(e.toLowerCase()),s=this._portalConfig,i=t.authority&&-1!==t.authority.indexOf(this._agolSuffix);return!i&&s&&(i=this._hasSameServerInstance(this._getServerInstanceRoot(s.restBaseUrl),t.uri)),i||(i=this._portals.some(function(e){return r._hasSameServerInstance(e,t.uri)})),i=i||this._agsPortal.test(t.path)},r.prototype._isIdProvider=function(e,r){var t=-1,s=-1;this._gwDomains.forEach(function(i,n){-1===t&&i.regex.test(e)&&(t=n),-1===s&&i.regex.test(r)&&(s=n)});var i=!1;if(t>-1&&s>-1&&(0===t||4===t?0!==s&&4!==s||(i=!0):1===t?1!==s&&2!==s||(i=!0):2===t?2===s&&(i=!0):3===t&&3===s&&(i=!0)),!i){var n=this.findServerInfo(r),o=n&&n.owningSystemUrl;o&&U(n)&&this._isPortalDomain(o)&&this._isIdProvider(e,o)&&(i=!0)}return i},r.prototype._getIdenticalSvcIdx=function(e,r){for(var t=-1,s=0;s<r.resources.length;s++){var i=r.resources[s];if(this._isIdenticalService(e,i)){t=s;break}}return t},r.prototype._getSuffix=function(e){return e.replace(this._regexSDirUrl,"").replace(this._regexServerType,"$1")},r.prototype._getTokenSvcUrl=function(e){var r,t,s,i=this;if(this._isRESTService(e)||this._isAdminResource(e)){var n=this._getServerInstanceRoot(e);return r=n+"/admin/generateToken",e=n+"/rest/info",t=h(e,{query:{f:"json"},responseType:"json"}).then(function(e){return e.data}),{adminUrl:r,promise:t}}if(this._isPortalDomain(e)){var o="";if(this._gwDomains.some(function(r){return r.regex.test(e)&&(o=r.tokenServiceUrl),!!o}),o||this._portals.some(function(r){return i._hasSameServerInstance(r,e)&&(o=r+i._gwTokenUrl),!!o}),o||-1!==(s=e.toLowerCase().indexOf("/sharing"))&&(o=e.substring(0,s)+this._gwTokenUrl),o||(o=this._getOrigin(e)+this._gwTokenUrl),o){var a=new m.Url(e).port;/^http:\/\//i.test(e)&&"7080"===a&&(o=o.replace(/:7080/i,":7443")),o=o.replace(/http:/i,"https:")}return o}if(-1!==e.toLowerCase().indexOf("premium.arcgisonline.com"))return"https://premium.arcgisonline.com/server/tokens"},r.prototype._getPortalSelf=function(e,r){return"https:"===window.location.protocol?e=e.replace(/^http:/i,"https:").replace(/:7080/i,":7443"):/^http:/i.test(r)&&(e=e.replace(/^https:/i,"http:").replace(/:7443/i,":7080")),h(e,{query:{f:"json"},authMode:"anonymous",responseType:"json",withCredentials:!0}).then(function(e){return e.data})},r.prototype._hasPortalSession=function(){return!!this._getEsriAuthCookie()},r.prototype._getEsriAuthCookie=function(){var e=null;if(navigator.cookieEnabled)for(var r=this._getAllCookies("esri_auth"),t=0;t<r.length;t++){var s=JSON.parse(r[t]);if(s.portalApp){e=s;break}}if(e){var i=null;e.expires&&("number"==typeof e.expires?i=e.expires:"string"==typeof e.expires&&(i=Date.parse(e.expires)),isNaN(i)&&(i=null),e.expires=i),i&&i<Date.now()&&(e=null)}return e},r.prototype._getAllCookies=function(e){var r=[],t=document.cookie,s=t.match(new RegExp("(?:^|; )"+o.escapeString(e)+"=([^;]*)","g"));if(s)for(var i=0;i<s.length;i++){var n=s[i],a=n.indexOf("=");a>-1&&(n=n.substring(a+1),r.push(decodeURIComponent(n)))}return r},r.prototype._doPortalSignIn=function(e,r){if(n.isSupported()){var t=this._getEsriAuthCookie(),s=this._portalConfig,i=window.location.href,o=this.findServerInfo(e);if((r||this.useSignInPage)&&(s||this._isPortalDomain(i)||t)&&(o?o.hasPortal||o.owningSystemUrl&&this._isPortalDomain(o.owningSystemUrl):this._isPortalDomain(e))&&(this._isIdProvider(i,e)||s&&(this._hasSameServerInstance(this._getServerInstanceRoot(s.restBaseUrl),e)||this._isIdProvider(s.restBaseUrl,e))||g.hasSameOrigin(i,e,!0)))return!0}return!1},r.prototype._canUsePortalSignInWorkflow=function(e){return this._doPortalSignIn(e)&&(window===window.top||this._hasPortalSession())},r.prototype._checkProtocol=function(e,r,t,s){var i=!0,n=s?r.adminTokenServiceUrl:r.tokenServiceUrl;if(0===n.trim().toLowerCase().indexOf("https:")&&0!==window.location.href.toLowerCase().indexOf("https:")&&g.getProxyRule(n)&&!(i=!!this._protocolFunc&&!!this._protocolFunc({resourceUrl:e,serverInfo:r}))){t(new u("identity-manager:aborted","Aborted the Sign-In process to avoid sending password over insecure connection."))}return i},r.prototype._enqueue=function(e,r,t,s,i,n){return s||(s=_.createResolver()),s.resUrl_=e,s.sinfo_=r,s.options_=t,s.admin_=i,s.refresh_=n,this._busy?this._hasSameServerInstance(this._getServerInstanceRoot(e),this._busy.resUrl_)?(this._oAuthDfd&&this._oAuthDfd.oAuthWin_&&this._oAuthDfd.oAuthWin_.focus(),this._soReqs.push(s)):this._xoReqs.push(s):this._doSignIn(s),s.promise},r.prototype._doSignIn=function(e){var r=this;this._busy=e,this._rejectOnPersistedPageShow=!1;var t=function(t){var s=e.options_&&e.options_.resource,i=e.resUrl_,n=e.refresh_,o=!1;-1===r.credentials.indexOf(t)&&(n&&-1!==r.credentials.indexOf(n)?(n.userId=t.userId,n.token=t.token,n.expires=t.expires,n.validity=t.validity,n.ssl=t.ssl,n.creationTime=t.creationTime,o=!0,t=n):r.credentials.push(t)),t.resources||(t.resources=[]),t.resources.push(s||i),t.scope=r._isServerRsrc(i)?"server":"portal",t.emitTokenChange();var a=r._soReqs,l={};r._soReqs=[],a.forEach(function(e){if(!r._isIdenticalService(i,e.resUrl_)){var s=r._getSuffix(e.resUrl_);l[s]||(l[s]=!0,t.resources.push(e.resUrl_))}}),e.resolve(t),a.forEach(function(e){r._hasSameServerInstance(r._getServerInstanceRoot(i),e.resUrl_)?e.resolve(t):r._soReqs.push(e)}),r._busy=e.resUrl_=e.sinfo_=e.refresh_=null,o||r.emit("credential-create",{credential:t}),r._soReqs.length?r._doSignIn(r._soReqs.shift()):r._xoReqs.length&&r._doSignIn(r._xoReqs.shift())},s=function(t){e.reject(t),r._busy=e.resUrl_=e.sinfo_=e.refresh_=null,r._soReqs.length?r._doSignIn(r._soReqs.shift()):r._xoReqs.length&&r._doSignIn(r._xoReqs.shift())},i=function(i,n,o,a){var l,h,c=e.sinfo_,p=!e.options_||!1!==e.options_.prompt,d=c.hasPortal&&r._findOAuthInfo(e.resUrl_);if(r._canUsePortalSignInWorkflow(e.resUrl_)){var f=r._getEsriAuthCookie(),v=r._portalConfig;if(f){if(!c.webTierAuth){"web"===(f.auth_tier&&f.auth_tier.toLowerCase())&&(c.webTierAuth=!0)}return void t(new x({userId:f.email,server:c.server,token:c.webTierAuth?null:f.token,expires:f.expires}))}if(p){var _="",g=window.location.href;return _=r.signInPage?r.signInPage:v?v.baseUrl+v.signin:r._isIdProvider(g,e.resUrl_)?r._getOrigin(g)+"/home/signin.html":c.tokenServiceUrl.replace(r._rePortalTokenSvc,"")+"/home/signin.html",_=_.replace(/http:/i,"https:"),v&&!1===v.useSSL&&(_=_.replace(/https:/i,"http:")),void(0===g.toLowerCase().replace("https","http").indexOf(_.toLowerCase().replace("https","http"))?(h=new u("identity-manager:unexpected-error","Cannot redirect to Sign-In page from within Sign-In page. URL of the resource that triggered this workflow: "+e.resUrl_),s(h)):(r._rejectOnPersistedPageShow=!0,r._redirectFunc?r._redirectFunc({signInPage:_,returnUrlParamName:"returnUrl",returnUrl:g,resourceUrl:e.resUrl_,serverInfo:c}):window.location.href=_+"?returnUrl="+encodeURIComponent(g)))}h=new u("identity-manager:not-authenticated","User is not signed in."),s(h)}else if(i)t(new x({userId:i,server:c.server,token:o,expires:null!=a?Number(a):null,ssl:!!n}));else if(d){var m=d._oAuthCred;if(!m){var S=new y(d,window.localStorage),w=new y(d,window.sessionStorage);S.isValid()&&w.isValid()?S.expires>w.expires?(m=S,w.destroy()):(m=w,S.destroy()):m=S.isValid()?S:w,d._oAuthCred=m}if(m.isValid())t(new x({userId:m.userId,server:c.server,token:m.token,expires:m.expires,ssl:m.ssl,_oAuthCred:m}));else if(r._oAuthHash&&r._oAuthHash.state.portalUrl===d.portalUrl){var I=r._oAuthHash;l=new x({userId:I.username,server:c.server,token:I.access_token,expires:Date.now()+1e3*Number(I.expires_in),ssl:"true"===I.ssl,oAuthState:I.state,_oAuthCred:m}),m.storage=I.persist?window.localStorage:window.sessionStorage,m.token=l.token,m.expires=l.expires,m.userId=l.userId,m.ssl=l.ssl,m.save(),r._oAuthHash=null,t(l)}else p?e._pendingDfd=r.oAuthSignIn(e.resUrl_,c,d,e.options_).then(t,s):(h=new u("identity-manager:not-authenticated","User is not signed in."),s(h))}else if(p){if(r._checkProtocol(e.resUrl_,c,s,e.admin_)){var k=e.options_;e.admin_&&(k=k||{},k.isAdmin=!0),e._pendingDfd=r.signIn(e.resUrl_,c,k).then(t,s)}}else h=new u("identity-manager:not-authenticated","User is not signed in."),s(h)},n=function(){var i,n,o,a,l=e.sinfo_,h=l.owningSystemUrl,u=e.options_;if(u&&(i=u.token,n=u.error,o=u.prompt),!(a=r._findCredential(h,{token:i,resource:e.resUrl_})))for(var c=0,p=r.credentials;c<p.length;c++){var d=p[c];if(r._isIdProvider(h,d.server)){a=d;break}}if(a){var f=r.findCredential(e.resUrl_,a.userId);if(f)t(f);else if(A(l,r._legacyFed)){var d=a.toJSON();d.server=l.server,d.resources=null,t(new x(d))}else{var v=e._pendingDfd=r.generateToken(r.findServerInfo(a.server),null,{serverUrl:e.resUrl_,token:a.token,signal:e.options_.signal,ssl:a.ssl});v.then(function(r){t(new x({userId:a.userId,server:l.server,token:r.token,expires:null!=r.expires?Number(r.expires):null,ssl:!!r.ssl,isAdmin:e.admin_,validity:r.validity}))},s)}}else{r._busy=null,i&&(e.options_.token=null);(e._pendingDfd=r.getCredential(h.replace(/\/?$/,"/sharing"),{resource:e.resUrl_,owningTenant:l.owningTenant,signal:e.options_.signal,token:i,error:n,prompt:o})).then(function(t){r._enqueue(e.resUrl_,e.sinfo_,e.options_,e,e.admin_)},function(e){s(e)})}};this._errbackFunc=s;var o=e.sinfo_.owningSystemUrl,a=this._isServerRsrc(e.resUrl_),l=e.sinfo_._restInfoPms;l?l.promise.then(function(t){var s=e.sinfo_;if(s._restInfoPms){s.adminTokenServiceUrl=s._restInfoPms.adminUrl,s._restInfoPms=null,s.tokenServiceUrl=v.getDeepValue("authInfo.tokenServicesUrl",t)||v.getDeepValue("authInfo.tokenServiceUrl",t)||v.getDeepValue("tokenServiceUrl",t),s.shortLivedTokenValidity=v.getDeepValue("authInfo.shortLivedTokenValidity",t),s.currentVersion=t.currentVersion,s.owningTenant=t.owningTenant;var o=s.owningSystemUrl=t.owningSystemUrl;o&&r._portals.push(o)}a&&s.owningSystemUrl?n():i()},function(){e.sinfo_._restInfoPms=null;var r=new u("identity-manager:server-identification-failed","Unknown resource - could not find token service endpoint.");s(r)}):a&&o?n():e.sinfo_._selfReq?e.sinfo_._selfReq.selfDfd.then(function(t){var s,i,n,o,a={};return t&&(s=t.user&&t.user.username,a.username=s,a.allSSL=t.allSSL,i=t.supportsOAuth,n=t.currentVersion,"multitenant"===t.portalMode&&(o=t.customBaseUrl)),e.sinfo_.webTierAuth=!!s,s&&r.normalizeWebTierAuth?r.generateToken(e.sinfo_,null,{ssl:a.allSSL}).catch(function(){return null}).then(function(e){return a.portalToken=e&&e.token,a.tokenExpiration=e&&e.expires,a}):!s&&i&&parseFloat(n)>=4.4&&!r._canUsePortalSignInWorkflow(e.resUrl_)?r._generateOAuthInfo({portalUrl:e.sinfo_.server,customBaseUrl:o,owningTenant:e.sinfo_._selfReq.owningTenant}).catch(function(){return null}).then(function(){return a}):a}).catch(function(){return null}).then(function(r){e.sinfo_._selfReq=null,r?i(r.username,r.allSSL,r.portalToken,r.tokenExpiration):i()}):i()},r.prototype._generateOAuthInfo=function(e){var r,t,s=this,i=e.portalUrl,n=e.customBaseUrl,o=e.owningTenant,a=!this.defaultOAuthInfo&&this._createDefaultOAuthInfo&&!this._hasTestedIfAppIsOnPortal;if(a){t=window.location.href;var l=t.indexOf("?");l>-1&&(t=t.slice(0,l)),l=t.search(/\/(apps|home)\//),t=l>-1?t.slice(0,l):null}return a&&t?(this._hasTestedIfAppIsOnPortal=!0,r=h(t+"/sharing/rest",{query:{f:"json"},responseType:"json"}).then(function(){s.defaultOAuthInfo=new w({appId:"arcgisonline",popup:!0,popupCallbackUrl:t+"/home/oauth-callback.html"})})):r=_.resolve(),r.then(function(){if(s.defaultOAuthInfo)return i=i.replace(/^http:/i,"https:"),h(i+"/sharing/rest/oauth2/validateRedirectUri",{query:{accountId:o,client_id:s.defaultOAuthInfo.appId,redirect_uri:g.makeAbsolute(s.defaultOAuthInfo.popupCallbackUrl),f:"json"},responseType:"json"}).then(function(e){if(e.data.valid){var r=s.defaultOAuthInfo.clone();e.data.urlKey&&n?r.portalUrl="https://"+e.data.urlKey+"."+n:r.portalUrl=i,s.oAuthInfos.push(r)}})})},r=i([S.subclass("esri.identity.IdentityManagerBase")],r)}(S.declared(c));r.IdentityManagerBase=T;var x=function(e){function r(r){var t=e.call(this)||this;return t._oAuthCred=null,t.tokenRefreshBuffer=2,r&&r._oAuthCred&&(t._oAuthCred=r._oAuthCred),t}return s(r,e),r.prototype.initialize=function(){this.resources=this.resources||[],null==this.creationTime&&(this.creationTime=Date.now())},r.prototype.refreshToken=function(){var e,r,t=this,s=l.id.findServerInfo(this.server),i=s&&s.owningSystemUrl,n=!!i&&"server"===this.scope,o=n&&A(s,l.id._legacyFed),a=s.webTierAuth,h=a&&l.id.normalizeWebTierAuth,u=k[this.server],c=u&&u[this.userId],p=this.resources&&this.resources[0],d=n&&l.id.findServerInfo(i),f={username:this.userId,password:c};if((!a||h)&&(n&&!d&&l.id.serverInfos.some(function(e){return l.id._isIdProvider(i,e.server)&&(d=e),!!d}),e=d&&l.id.findCredential(d.server,this.userId),!n||e)){if(o)return void e.refreshToken();if(n)r={serverUrl:p,token:e&&e.token,ssl:e&&e.ssl};else if(h)f=null,r={ssl:this.ssl};else{if(!c){var v=void 0;return p&&(p=l.id._sanitizeUrl(p),this._enqueued=1,v=l.id._enqueue(p,s,null,null,this.isAdmin,this),v.then(function(){t._enqueued=0,t.refreshServerTokens()}).catch(function(){t._enqueued=0})),v}this.isAdmin&&(r={isAdmin:!0})}return l.id.generateToken(n?d:s,n?null:f,r).then(function(e){t.token=e.token,t.expires=null!=e.expires?Number(e.expires):null,t.creationTime=Date.now(),t.validity=e.validity,t.emitTokenChange(),t.refreshServerTokens()}).catch(function(){})}},r.prototype.refreshServerTokens=function(){var e=this;"portal"===this.scope&&l.id.credentials.forEach(function(r){var t=l.id.findServerInfo(r.server),s=t&&t.owningSystemUrl;r!==e&&r.userId===e.userId&&s&&"server"===r.scope&&(l.id._hasSameServerInstance(e.server,s)||l.id._isIdProvider(s,e.server))&&(A(t,l.id._legacyFed)?(r.token=e.token,r.expires=e.expires,r.creationTime=e.creationTime,r.validity=e.validity,r.emitTokenChange()):r.refreshToken())})},r.prototype.emitTokenChange=function(e){clearTimeout(this._refreshTimer);var r=this.server&&l.id.findServerInfo(this.server),t=r&&r.owningSystemUrl,s=t&&l.id.findServerInfo(t);!1===e||t&&"portal"!==this.scope&&(!s||!s.webTierAuth||l.id.normalizeWebTierAuth)||null==this.expires&&null==this.validity||this._startRefreshTimer(),this.emit("token-change")},r.prototype.destroy=function(){this.userId=this.server=this.token=this.expires=this.validity=this.resources=this.creationTime=null,this._oAuthCred&&(this._oAuthCred.destroy(),this._oAuthCred=null);var e=l.id.credentials.indexOf(this);e>-1&&l.id.credentials.splice(e,1),this.emitTokenChange(),this.emit("destroy")},r.prototype.toJSON=function(){var e=f.fixJson({userId:this.userId,server:this.server,token:this.token,expires:this.expires,validity:this.validity,ssl:this.ssl,isAdmin:this.isAdmin,creationTime:this.creationTime,scope:this.scope}),r=this.resources;return r&&r.length>0&&(e.resources=r.slice()),e},r.prototype._startRefreshTimer=function(){clearTimeout(this._refreshTimer);var e=6e4*this.tokenRefreshBuffer,r=this.validity?this.creationTime+6e4*this.validity:this.expires,t=r-Date.now();t<0&&(t=0),this._refreshTimer=setTimeout(this.refreshToken.bind(this),t>e?t-e:t)},i([S.property()],r.prototype,"creationTime",void 0),i([S.property()],r.prototype,"expires",void 0),i([S.property()],r.prototype,"isAdmin",void 0),i([S.property()],r.prototype,"oAuthState",void 0),i([S.property()],r.prototype,"resources",void 0),i([S.property()],r.prototype,"scope",void 0),i([S.property()],r.prototype,"server",void 0),i([S.property()],r.prototype,"ssl",void 0),i([S.property()],r.prototype,"token",void 0),i([S.property()],r.prototype,"tokenRefreshBuffer",void 0),i([S.property()],r.prototype,"userId",void 0),i([S.property()],r.prototype,"validity",void 0),r=i([S.subclass("esri.identity.Credential")],r)}(S.declared(c.EventedAccessor));r.Credential=x});