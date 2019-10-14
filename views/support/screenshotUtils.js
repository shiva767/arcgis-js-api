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

define(["require","exports","../../core/tsSupport/assignHelper","../../core/compilerUtils","../../core/mathUtils"],function(t,e,a,i,r){function h(t,e){var a=t||{},i=a.format,h=a.quality,o=a.rotation,n=a.disableSlice,l=t&&!t.ignorePadding&&e.padding||C,g={width:e.width-l.left-l.right,height:e.height-l.top-l.bottom,padding:l},d=s(t,g),u=m(t,d),f=u.width,c=u.height,w=v(i),M=U[w];return{format:w,quality:r.clamp(null!=h?h:M,0,100),area:d,width:f,height:c,rotation:o,disableSlice:n||!1,ignoreBackground:t&&t.ignoreBackground}}function o(t,e){var a=h(t,e),i=a.area,r=a.width/i.width,o=t&&!t.ignorePadding&&e.padding||C,n=o.left+o.right,l=o.top+o.bottom,g=e.width-n,d=e.height-l,u=Math.floor(g*r+n),f=Math.floor(d*r+l),c=t&&t.layers?t.layers:[],w=a.ignoreBackground;return{framebufferWidth:u,framebufferHeight:f,region:{x:Math.floor(i.x*r)+o.left,y:Math.floor(i.y*r)+o.top,width:a.width,height:a.height},format:a.format,quality:a.quality,rotation:a.rotation,pixelRatio:r,layers:c,disableSlice:a.disableSlice,ignoreBackground:w}}function n(t,e,a,i){i.premultipliedAlpha&&x(t),a.width=t.width,a.height=t.height;var r=a.getContext("2d");r.putImageData(t,0,0),i.flipY&&y(r);var h=r.getImageData(0,0,t.width,t.height),o=l(a,e);return a.width=0,a.height=0,{dataUrl:o,data:h}}function l(t,e){var a=q[e.format],i=e.quality/100;return t.toDataURL(a,i)}function g(t,e,a){if(!t||!e)throw new Error("Cannot construct image data without dimensions");if(I)try{return new ImageData(t,e)}catch(t){I=!1}return c(t,e,a)}function d(t,e,a,i){if(!e||!a)throw new Error("Cannot construct image data without dimensions");if(I)try{return new ImageData(t,e,a)}catch(t){I=!1}var r=c(e,a,i);return r.data.set(t,0),r}function u(t,e,a,i,r,h,o,n){void 0===i&&(i=0),void 0===r&&(r=0),void 0===h&&(h=t.width-i),void 0===o&&(o=t.height-r),void 0===n&&(n=!1);for(var l=t.data,g=e.width,d=e.height,u=e.data,f=h/g,c=o/d,w=Math.ceil(f/2),m=Math.ceil(c/2),s=t.width,M=0;M<d;M++)for(var p=0;p<g;p++){for(var v=4*(p+(n?d-M-1:M)*g),y=0,x=0,b=0,j=0,S=0,D=0,I=(M+.5)*c,q=Math.floor(M*c);q<(M+1)*c;q++)for(var R=Math.abs(I-(q+.5))/m,U=(p+.5)*f,C=R*R,H=Math.floor(p*f);H<(p+1)*f;H++){var k=Math.abs(U-(H+.5))/w,B=Math.sqrt(C+k*k);if(!(B>=1)){var E=2*B*B*B-3*B*B+1,P=4*(i+H+(r+q)*s);D+=E*l[P+3],x+=E,!a&&l[P+3]<255&&(E=E*l[P+3]/255),b+=E*l[P],j+=E*l[P+1],S+=E*l[P+2],y+=E}}u[v]=b/y,u[v+1]=j/y,u[v+2]=S/y,u[v+3]=D/x}return e}function f(t,e){if(!e)return t;var i=t.framebufferWidth,r=t.framebufferHeight,h=t.pixelRatio,o=t.region,n=Math.min(S,b/Math.max(i,r));return n<j?t:a({},t,{framebufferWidth:Math.round(i*n),framebufferHeight:Math.round(r*n),pixelRatio:h*n,resample:{region:{x:Math.round(o.x*n),y:Math.round(o.y*n),width:Math.round(o.width*n),height:Math.round(o.height*n)},width:i,height:r}})}function c(t,e,a){return a||(a=w()),a.getContext("2d").createImageData(t,e)}function w(){return D||(D=document.createElement("canvas"),D.width=1,D.height=1),D}function m(t,e){if(!t)return e;var a=t.width,i=t.height;if(null!=a&&null!=i)return{width:Math.floor(a),height:Math.floor(i)};if(null==a&&null==i)return e;var r=e.width/e.height;return null==i?{width:Math.floor(a),height:Math.floor(a/r)}:{width:Math.floor(i*r),height:Math.floor(i)}}function s(t,e){var a=0,i=0,r=e.width,h=e.height;if(t&&t.area){a=Math.floor(t.area.x)||0,i=Math.floor(t.area.y)||0;var o=null!=t.area.width?Math.floor(t.area.width):null,n=null!=t.area.height?Math.floor(t.area.height):null;if(r-=a,h-=i,null!=o&&null!=n)r=Math.min(r,o),h=Math.min(h,n);else if(null==o&&null!=n){var l=Math.min(r,o);h*=l/r,r=l}else if(null!=o&&null==n){var g=Math.min(h,n);r*=g/h,h=g}}return M(p({x:a,y:i,width:r,height:h},t),e)}function M(t,e){var a=Math.floor(Math.max(t.x,0)),i=Math.floor(Math.max(t.y,0)),r=Math.floor(Math.min(t.width,e.width-a)),h=Math.floor(Math.min(t.height,e.height-i)),o={x:a,y:i,width:r,height:h},n=o.width/o.height,l=t.width/t.height;if(l===n)return o;if(l>n){var g=Math.floor(o.width/l),d=o.height-g;return{x:o.x,y:Math.floor(o.y+d/2),width:o.width,height:g}}var u=Math.floor(o.height*l),f=o.width-u;return{x:Math.floor(o.x+f/2),y:o.y,width:u,height:o.height}}function p(t,e){if(!e||null==e.width||null==e.height)return t;var a=e.width/e.height,i=t.width/t.height;return i===a?t:i<a?(t.width=Math.floor(t.height*a),t.height=t.height,t):(t.width=t.width,t.height=Math.floor(t.width/a),t)}function v(t){switch(t){case"png":case"jpg":case"jpeg":return t;case null:case void 0:return R;default:return i.neverReached(t),R}}function y(t){t.save(),t.globalCompositeOperation="copy",t.scale(1,-1),t.translate(0,-t.canvas.height),t.drawImage(t.canvas,0,0),t.restore()}function x(t){for(var e=t.data,a=e.length,i=0;i<a;i+=4){var r=e[i+3];if(r>0){var h=r/255;e[i+0]=e[i+0]/h,e[i+1]=e[i+1]/h,e[i+2]=e[i+2]/h}}}Object.defineProperty(e,"__esModule",{value:!0});var b=2048,j=1.5,S=8;e.completeUserSettings=h,e.toRenderSettings=o,e.encodeResult=n,e.toDataUrl=l,e.createEmptyImageData=g,e.wrapImageData=d,e.resampleHermite=u,e.screenshotSuperSampleSettings=f;var D=null,I=!0,q={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg"},R="jpg",U={png:100,jpg:98,jpeg:98},C={top:0,right:0,bottom:0,left:0}});