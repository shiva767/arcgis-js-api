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

define(["require","exports","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../core/tsSupport/assignHelper","../../../core/Error","../PixelBlock","./ImageCanvasDecoder","./JpgPlus","./Lerc2Codec","./LercCodec","./Png","./Raw","./TiffDecoder"],function(e,t,r,a,i,n,o,s,d,l,c,u,h,p){function f(e,t){if(!A)throw new n("rasterCoded:decode","lerc decoder is not supported on big endian platform");for(var r,a,i=t.width,s=t.height,d=t.pixelType,l=C(d),u=l.pixelTypeCtor,h=null==t.noDataValue?l.noDataValue:t.noDataValue,p=0,f=0,w=e.byteLength-10;f<w;){var g=c.decode(e,{inputOffset:f,encodedMaskData:r,returnMask:0===p,returnEncodedMask:0===p,returnFileInfo:!0,pixelType:u,noDataValue:h});if(i&&s&&(g.width!==i||g.height!==s))throw new n("rasterCoded:decode","lerc decoded result has width or height different from specified in options");f=g.fileInfo.eofOffset,0===p&&(r=g.encodedMaskData,a=new o({width:g.width,height:g.height,pixels:[],pixelType:d,mask:g.maskData,statistics:[]})),p++,a.addData({pixels:g.pixelData,statistics:{minValue:g.minValue,maxValue:g.maxValue,noDataValue:g.noDataValue}})}return a}function w(e,t){if(!A)throw new n("rasterCoded:decode","lerc decoder is not supported on big endian platform");for(var r,a,i,s=0,d=0,c=0,u=e.byteLength-10,h=[],p=t.width,f=t.height;d<u;){if(a=l.decode(e,{inputOffset:d,maskData:r,returnFileInfo:!0}),p&&f&&(a.width!==p||a.height!==f))throw new n("rasterCoded:decode","lerc2 decoded result has width or height different from what's specified in options");d=a.fileInfo.eofOffset,0===s&&(c=a.fileInfo.numValidPixel,r=a.maskData,i=new o({width:a.width,height:a.height,pixels:[],pixelType:a.fileInfo.pixelType,mask:a.maskData,statistics:[]})),a.fileInfo.mask&&a.fileInfo.mask.numBytes>0&&h.push(a.maskData),s++,i.addData({pixels:a.pixelData,statistics:{minValue:a.minValue,maxValue:a.maxValue}})}var w=0,g=0,m=0;if(h.length>1){for(m=i.width*i.height,r=new Uint8Array(m),r.set(h[0]),w=1;w<h.length;w++){var x=h[w];for(g=0;g<m;g++)r[g]=r[g]&x[g]}for(c=0,g=0;g<m;g++)c+=r[g];i.mask=r}return i.validPixelCount=c,i}function g(e,t){var r=p.decode(e),a=new o({width:r.width,height:r.height,pixels:r.pixels,pixelType:r.pixelType.toLowerCase(),mask:r.maskData,statistics:null});return a.updateStatistics(),a}function m(e,t,r){var a=C(t.pixelType).pixelTypeCtor,i="bsq"===r?h.decodeBSQ:h.decodeBIP,n=i(e,{bandCount:t.planes,width:t.width,height:t.height,pixelType:a}),s=new o({width:t.width,height:t.height,pixels:n.pixels,pixelType:t.pixelType,mask:n.mask,statistics:null});return s.updateStatistics(),s}function x(e,t){var r=d.decode(e),a=new o({width:r.width,height:r.height,pixels:r.pixels,pixelType:"U8",mask:r.mask,statistics:null});return a.updateStatistics(),a}function y(e,t){var r,a=new Uint8Array(e),i=new u(a),n=t.width,s=t.height,d=n*s,l=i.decode(),c=0,h=0,p=new Uint8Array(d);for(c=0;c<d;c++)p[c]=l[4*c+3];var f=new o({width:n,height:s,pixels:[],pixelType:"U8",mask:p,statistics:[]});for(c=0;c<3;c++){for(r=new Uint8Array(d),h=0;h<d;h++)r[h]=l[4*h+c];f.addData({pixels:r})}return f.updateStatistics(),f}function k(e,t,n){return a(this,void 0,void 0,function(){var a,d,l,c;return r(this,function(r){switch(r.label){case 0:return a=new s,d=i({applyJpegMask:!1},t),[4,a.decode(e,d,n)];case 1:return l=r.sent(),c=new o(l),c.updateStatistics(),[2,c]}})})}function b(e){if(null==e)throw new n("rasterCodec:decode","parameter encodeddata is required.");var t=new Uint8Array(e,0,10),r="";return 255===t[0]&&216===t[1]?r="jpg":137===t[0]&&80===t[1]&&78===t[2]&&71===t[3]?r="png":67===t[0]&&110===t[1]&&116===t[2]&&90===t[3]&&73===t[4]&&109===t[5]&&97===t[6]&&103===t[7]&&101===t[8]&&32===t[9]?r="lerc":76===t[0]&&101===t[1]&&114===t[2]&&99===t[3]&&50===t[4]&&32===t[5]?r="lerc2":73===t[0]&&73===t[1]&&42===t[2]&&0===t[3]||77===t[0]&&77===t[1]&&0===t[2]&&42===t[3]?r="tiff":String.fromCharCode.apply(null,t).toLowerCase().indexOf("error")>-1&&(r="error"),r}function v(e){var t=null;switch(e){case"lerc":t=f;break;case"lerc2":t=w;break;case"jpg":t=x;break;case"png":t=y;break;case"bsq":t=function(e,t){return m(e,t,"bsq")};break;case"bip":t=function(e,t){return m(e,t,"bip")};break;case"tiff":t=g;break;case"error":t=function(e,t){throw new n("rasterCodec:decode","input data contains error")};break;default:t=function(e,t){throw new n("rasterCodec:decode","unsupported raster format")}}return t}function C(e){var t=e?e.toLowerCase():"f32",r=null,a=null;switch(t){case"u1":case"u2":case"u4":case"u8":a=Math.pow(2,8)-1,r=Uint8Array;break;case"u16":a=a||Math.pow(2,16)-1,r=Uint16Array;break;case"u32":a=a||Math.pow(2,32)-1,r=Uint32Array;break;case"s8":a=a||0-Math.pow(2,7),r=Int8Array;break;case"s16":a=a||0-Math.pow(2,15),r=Int16Array;break;case"s32":a=a||0-Math.pow(2,31),r=Int32Array;break;default:r=Float32Array}return{pixelTypeCtor:r,noDataValue:a}}function D(e,t){if(void 0===t&&(t=1),e){var r=e.pixels,a=e.width,i=e.height,n=e.mask;if(r&&0!==r.length){var o,s,d,l,c,u,h,p=r.length,f=a-1,w=i-1,g=[],m=e.getPixelArrayConstructor(e.pixelType);if(0===t){for(o=0;o<p;o++){for(c=r[o],u=new m(f*w),s=0;s<w;s++)for(l=s*a,d=0;d<f;d++)u[s*f+d]=c[l+d];g.push(u)}if(n)for(h=new Uint8Array(f*w),s=0;s<w;s++)for(l=s*a,d=0;d<f;d++)h[s*f+d]=n[l+d]}else{for(o=0;o<p;o++){for(c=r[o],u=new m(f*w),s=0;s<w;s++)for(l=s*a,d=0;d<f;d++)u[s*f+d]=(c[l+d]+c[l+d+1]+c[l+a+d]+c[l+a+d+1])/4;g.push(u)}if(n)for(h=new Uint8Array(f*w),s=0;s<w;s++)for(l=s*a,d=0;d<f;d++)h[s*f+d]=Math.min.apply(null,[n[l+d],n[l+d+1],n[l+a+d],n[l+a+d+1]])}e.width=f,e.height=w,e.mask=h,e.pixels=g}}}var A=function(){var e=new ArrayBuffer(4),t=new Uint8Array(e);return new Uint32Array(e)[0]=1,1===t[0]}();return function(){function e(){}return e.getFormat=function(e){var t=b(e);return"lerc2"===t?t="lerc":"error"===t&&(t=""),t},e.decode=function(e,t,o){return a(this,void 0,void 0,function(){var a,s,d;return r(this,function(r){switch(r.label){case 0:if(null==e)throw new n("rasterCodec:decode","missing encodeddata parameter.");if(null==t||null==t.width||null==t.height)throw new n("rasterCodec:decode","requires width and height in options parameter.");return a=t.format&&t.format.toLowerCase(),(!a||"bsq"!==a&&"bip"!==a)&&(a=b(e)),!t.useCanvas||"jpg"!==a&&"png"!==a?[3,2]:[4,k(e,t,o)];case 1:return d=r.sent(),[3,3];case 2:s=v(a),t.isPoint&&(t=i({},t),t.width++,t.height++),d=s(e,t),t.isPoint&&D(d),r.label=3;case 3:return[2,d]}})})},e}()});