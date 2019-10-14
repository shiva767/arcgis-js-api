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

define(["require","exports","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../request","../../core/promiseUtils","../../core/screenUtils","../../geometry/support/jsonUtils","./cimAnalyzer","./Rasterizer","./TextRasterizer","./utils","../support/cimSymbolUtils","../support/Symbol3DAnchorPosition2D"],function(e,t,a,r,i,n,o,s,l,c,u,h,p,m){function g(e,t,a){return{geometryType:t,spatialReference:a,fields:(e?Object.keys(e):[]).map(function(t){return{name:t,alias:t,type:"string"==typeof e[t]?"esriFieldTypeString":"esriFieldTypeDouble"}})}}return function(){function e(e,t){this._spatialReference=e,this._avoidSDF=t,this._resourceCache=new Map,this._rasterizer=new c.default,this._textRasterizer=new u.default,this._pictureMarkerCache=new Map}return e.prototype.rasterizeCIMSymbolAsync=function(e,t,i,o,c){return r(this,void 0,void 0,function(){var r,u,h,m,y,f,v,d,x,z;return a(this,function(a){switch(a.label){case 0:return[4,p.expandSymbol(e)];case 1:return r=a.sent(),u=[],h=null!==t.centroid?"esriGeometryPolygon":s.getJsonType(t.geometry),m=g(t.attributes,h,this._spatialReference),y=[],y.push(l.analyzeCIMSymbol(r.data,i,m,u,this._avoidSDF)),[4,n.all(y)];case 2:for(a.sent(),f=[],v=0,d=u;v<d.length;v++)x=d[v],null!=(z=this._getRasterizedResource(x,t,o,c))&&f.push({cimLayer:x,rasterizedResource:z});return[2,f]}})})},e.prototype.analyzeCIMSymbol=function(e,t,o,s,c){return r(this,void 0,void 0,function(){var r,u,h,m,y,f,v,d,x;return a(this,function(a){switch(a.label){case 0:return[4,p.expandSymbol(e,c)];case 1:return r=a.sent(),u=[],h=g(t,s,this._spatialReference),m=[],m.push(l.analyzeCIMSymbol(r.data,o,h,u,this._avoidSDF)),[4,n.all(m)];case 2:a.sent(),n.throwIfAborted(c),y=0,a.label=3;case 3:return y<u.length?(f=u[y],"CIMPictureMarker"!==f.cim.type?[3,5]:(v=f.materialHash,this._pictureMarkerCache.get(v)?[3,5]:[4,i(f.cim.url,{responseType:"image",signal:c.signal})])):[3,6];case 4:d=a.sent(),x=d.data,this._pictureMarkerCache.set(v,x),a.label=5;case 5:return y++,[3,3];case 6:return[2,u]}})})},e.prototype.rasterizeCIMSymbol=function(e,t,a,r){for(var i=[],n=0,o=e;n<o.length;n++){var s=o[n],l=this._getRasterizedResource(s,t,a,r);null!=l&&i.push({cimLayer:s,rasterizedResource:l})}return this.getSymbolImage(i,t,a,r)},e.prototype.getSymbolImage=function(e,t,a,r){for(var i=document.createElement("canvas"),n=i.getContext("2d"),s=0,l=0,c=0,u=0,p=null,g=[],y=0;y<e.length;y++){var f=e[y],v=f.rasterizedResource;if(v){var d=f.cimLayer;if("line"!==d.type&&"fill"!==d.type){var x=v.size,z=h.evaluateValueOrFunction(d.offsetX,t,a,r),_=h.evaluateValueOrFunction(d.offsetY,t,a,r);z=z||0,_=_||0;var C=d.anchorPoint?{x:d.anchorPoint.x,y:d.anchorPoint.y}:{x:0,y:0},w=d.isAbsoluteAnchorPoint||!1,P=!1,b=d.type,I=void 0,M=void 0;if("marker"===d.type&&(I=h.evaluateValueOrFunction(d.rotation,t,a,r),P=!!d.rotateClockwise&&d.rotateClockwise),"text"===d.type){if(I=h.evaluateValueOrFunction(d.angle,t,a,r),void 0!==d.horizontalAlignment)switch(d.horizontalAlignment){case"left":C.x=.5;break;case"right":C.x=-.5}if(void 0!==d.verticalAlignment)switch(d.verticalAlignment){case"top":C.y=.5;case"bottom":C.y=-.5}}var F=o.pt2px(z)+x[0]*(C.x-.5),A=-o.pt2px(_)+x[1]*(C.y-.5),R=F+x[0],D=A+x[1];if(I){P&&(I=360-I);var S=Math.sin(I*Math.PI/180),O=Math.cos(I*Math.PI/180),V=F*O+A*S,T=-F*S+A*O,k=F*O+D*S,H=-F*S+D*O,U=R*O+D*S,X=-R*S+D*O,Y=R*O+A*S,E=-R*S+A*O;F=Math.min(V,k,U,Y),A=Math.min(T,H,X,E),R=Math.max(V,k,U,Y),D=Math.max(T,H,X,E),M={minX:F,minY:A,maxX:R,maxY:D}}s=F<s?F:s,l=A<l?A:l,c=R>c?R:c,u=D>u?D:u;var L=n.createImageData(v.size[0],v.size[1]);L.data.set(new Uint8ClampedArray(v.image.buffer));var j=L,q={offsetX:z,offsetY:_,anchorPoint:C,anchorPointAbsolute:w,rotateClockwise:P,type:b,angle:I,rotatedBBox:M,rasterizedImage:j};g.push(q)}}}i.width=c-s,i.height=u-l;for(var y=0;y<g.length;y++){var B=0,J=0,q=g[y],N=this._imageDataToCanvas(q.rasterizedImage),G=q.rasterizedImage.width,K=q.rasterizedImage.height;if(q.anchorPointAbsolute?(B=o.pt2px(q.offsetX)-s+q.anchorPoint.x,J=-o.pt2px(q.offsetY)-l+q.anchorPoint.y):(B=o.pt2px(q.offsetX)-s+G*(q.anchorPoint.x-.5),J=-o.pt2px(q.offsetY)-l+K*(q.anchorPoint.y-.5)),q.angle){var Q=(360-q.angle)*Math.PI/180;n.translate(-G*(q.anchorPoint.x-.5)+B,-K*(q.anchorPoint.y-.5)+J),n.rotate(Q),n.drawImage(N,G*(q.anchorPoint.x-.5),K*(q.anchorPoint.y-.5)),n.rotate(-Q),n.translate(-(-G*(q.anchorPoint.x-.5)+B),-(-K*(q.anchorPoint.y-.5)+J))}else n.drawImage(N,B,J);p||"text"===q.type||(p=new m.default({x:(-G*(q.anchorPoint.x-.5)+B)/(c-s)-.5,y:(-K*(q.anchorPoint.y-.5)+J)/(u-l)-.5}))}return{imageData:n.getImageData(0,0,i.width,i.height),anchorPosition:p}},e.prototype._imageDataToCanvas=function(e){this._imageDataCanvas||(this._imageDataCanvas=document.createElement("canvas"));var t=this._imageDataCanvas,a=t.getContext("2d");return t.width=e.width,t.height=e.height,a.putImageData(e,0,0),t},e.prototype._imageTo32Array=function(e,t,a){this._imageDataCanvas||(this._imageDataCanvas=document.createElement("canvas"));var r=this._imageDataCanvas,i=r.getContext("2d");return r.width=t,r.height=a,i.drawImage(e,0,0,t,a),new Uint32Array(i.getImageData(0,0,t,a).data.buffer)},e.prototype._getRasterizedResource=function(e,t,a,r){var i,n;if("text"===e.type)i=e.cim,n=this._rasterizeTextResource(e,i,t,a,r);else{var s=this._resourceCache,c=void 0;if("function"==typeof e.materialHash){c=(0,e.materialHash)(t,a,r),i=l.analyzeCIMResource(t,e.cim,e.materialOverrides)}else c=e.materialHash,i=e.cim;if(s.has(c))return s.get(c);if("CIMPictureMarker"===e.cim.type){var u=h.evaluateValueOrFunction(e.cim.size,t,a,r),p=this._pictureMarkerCache.get(c);if(!p)return null;var m=p.height/p.width,g=m>1?o.pt2px(u):o.pt2px(u)/m,y=m>1?o.pt2px(u)*m:o.pt2px(u);n={image:this._imageTo32Array(p,g,y),size:[g,y],sdf:!1,simplePattern:!1}}else n=this._rasterizer.rasterizeJSONResource(i,this._avoidSDF);s.set(c,n)}return n},e.prototype._rasterizeTextResource=function(e,t,a,r,i){var n=h.evaluateValueOrFunction(e.text,a,r,i);if(!n||0===n.length)return null;var o=h.evaluateValueOrFunction(e.fontName,a,r,i),s=h.evaluateValueOrFunction(e.style,a,r,i),l=h.evaluateValueOrFunction(e.weight,a,r,i),c=h.evaluateValueOrFunction(e.decoration,a,r,i),u=h.evaluateValueOrFunction(e.size,a,r,i),p=h.evaluateValueOrFunction(e.horizontalAlignment,a,r,i),m=h.evaluateValueOrFunction(e.verticalAlignment,a,r,i),g=h.colorToArray(h.evaluateValueOrFunction(e.color,a,r,i)),y=h.colorToArray(h.evaluateValueOrFunction(e.outlineColor,a,r,i)),f=h.evaluateValueOrFunction(e.outlineSize,a,r,i),v={color:g,size:u,horizontalAlignment:p,verticalAlignment:m,font:{family:o,style:s,weight:l,decoration:c},halo:{size:f||0,color:y,style:s},pixelRatio:1,premultiplyColors:!this._avoidSDF};return this._textRasterizer.rasterizeText(n,v)},e}()});