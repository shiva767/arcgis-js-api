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

define(["require","exports","../../../../../../core/tsSupport/extendsHelper","../../../../../../core/has","../../../../../../core/Logger","../../definitions","../../enums","../../number","../../TileClipper","../../TurboLine","../../WGLDisplayRecord","../../materialKey/MaterialKey"],function(e,t,i,f,r,n,o,p,s,d,_,l){Object.defineProperty(t,"__esModule",{value:!0});var c=r.getLogger("esri.views.2d.engine.webgl.WGLLineTemplateBase"),x=-16,y=n.TILE_SIZE+16,v=31,m=new s.TileClipper(0,0,0,1,16);m.setExtent(n.TILE_SIZE);var g=0,C=0,b=0;f("esri-tiles-performance")&&setInterval(function(){console.log("New (FL)","feat="+b,"secs="+g,"tris="+C,"tris/sec="+Math.round(C/g))},1e4);var M=new Uint32Array(9),a=new Uint32Array(36),h=new Uint32Array(3),u=new Uint32Array(6),T=function(n){return function(e){e.entry0=n.offset+n.vertexCount++;var t=p.i1616to32(e.distance,v*n._halfWidth),i=p.i8888to32(Math.round(v*e.prevNormal.x),Math.round(v*e.prevNormal.y),Math.round(0),Math.round(-31)),r=p.i8888to32(0,0,0,n._bitset);a[0]=p.i1616to32(e.currentVertex.x,e.currentVertex.y),a[1]=n.id,a[2]=n._fillColor,a[3]=i,a[4]=t,a[5]=n._tl,a[6]=n._br,a[7]=r,a[8]=p.i1616to32(v*n._halfReferenceWidth,0),e.entry2=n.offset+n.vertexCount++;t=p.i1616to32(e.distance,v*n._halfWidth),i=p.i8888to32(Math.round(v*-e.prevNormal.x),Math.round(v*-e.prevNormal.y),Math.round(0),Math.round(31)),r=p.i8888to32(0,0,0,n._bitset);a[9]=p.i1616to32(e.currentVertex.x,e.currentVertex.y),a[10]=n.id,a[11]=n._fillColor,a[12]=i,a[13]=t,a[14]=n._tl,a[15]=n._br,a[16]=r,a[17]=p.i1616to32(v*n._halfReferenceWidth,0),e.exit0=n.offset+n.vertexCount++;t=p.i1616to32(e.distance,v*n._halfWidth),i=p.i8888to32(Math.round(v*e.nextNormal.x),Math.round(v*e.nextNormal.y),Math.round(0),Math.round(-31)),r=p.i8888to32(0,0,0,n._bitset);a[18]=p.i1616to32(e.currentVertex.x,e.currentVertex.y),a[19]=n.id,a[20]=n._fillColor,a[21]=i,a[22]=t,a[23]=n._tl,a[24]=n._br,a[25]=r,a[26]=p.i1616to32(v*n._halfReferenceWidth,0),e.exit2=n.offset+n.vertexCount++;t=p.i1616to32(e.distance,v*n._halfWidth),i=p.i8888to32(Math.round(v*-e.nextNormal.x),Math.round(v*-e.nextNormal.y),Math.round(0),Math.round(31)),r=p.i8888to32(0,0,0,n._bitset);a[27]=p.i1616to32(e.currentVertex.x,e.currentVertex.y),a[28]=n.id,a[29]=n._fillColor,a[30]=i,a[31]=t,a[32]=n._tl,a[33]=n._br,a[34]=r,a[35]=p.i1616to32(v*n._halfReferenceWidth,0),n.geometryBuf.writeRegion(a)}},w=function(t){return function(e){u[0]=e.leftExit0,u[1]=e.rightEntry0,u[2]=e.leftExit2,u[3]=e.rightEntry0,u[4]=e.rightEntry2,u[5]=e.leftExit2,t.indexCount+=6,t.indexBuf.writeRegion(u)}},P=function(d){return function(e,t,i,r,n,o,s,l,a){var h=p.i1616to32(a,v*d._halfWidth),u=p.i8888to32(Math.round(v*n),Math.round(v*o),Math.round(v*s),Math.round(v*l)),f=p.i8888to32(v*i,v*r,0,d._bitset);return M[0]=p.i1616to32(e,t),M[1]=d.id,M[2]=d._fillColor,M[3]=u,M[4]=h,M[5]=d._tl,M[6]=d._br,M[7]=f,M[8]=p.i1616to32(v*d._halfReferenceWidth,0),d.geometryBuf.writeRegion(M),d.offset+d.vertexCount++}},L=function(r){return function(e,t,i){h[0]=e,h[1]=t,h[2]=i,r.indexCount+=3,r.indexBuf.writeRegion(h)}};t.default=function(e){return function(r){function e(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var i=r.apply(this,e)||this;return i.tessellationProperties={_fillColor:null,_tl:null,_br:null,_halfWidth:null,_bitset:null,_halfReferenceWidth:null,id:null,indexBuf:null,indexCount:null,geometryBuf:null,vertexCount:null,offset:null},i._tessellationOptions={},i.geometryType=o.WGLGeometryType.LINE,i}return i(e,r),e.prototype.writeMesh=function(e,t,i,r,n){var o=t.indexVector,s=t.get("geometry"),l=new _(r,this.geometryType,this._materialKey),a=t.getVector("geometry").vertexCount;switch(l.vertexFrom=a,l.indexFrom=o.length,i){case"esriGeometryPolyline":var h=n.geometry.paths;if(0===(u=this._clipLines(h)).length)return;return this._write(l,o,s,a,r,u),void e.push(l);case"esriGeometryPolygon":var u,f=n.geometry.rings;if(0===(u=this._clipLines(f)).length)return;return this._write(l,o,s,a,r,u),void e.push(l);default:c.error("Unable to handle geometryType: "+i)}},e.prototype._clipLines=function(e){for(var t=[],i=!1,r=0;r<e.length;){var n=[],o=e[r];m.reset(2);var s=o[0],l=s[0],a=s[1];if(i)m.moveTo(l,a);else{if(l<x||y<l||a<x||y<a){i=!0;continue}n.push({x:l,y:a})}for(var h=!1,u=o.length,f=1;f<u;++f)if(l+=o[f][0],a+=o[f][1],i)m.lineTo(l,a);else{if(l<x||y<l||a<x||y<a){h=!0;break}n.push({x:l,y:a})}if(h)i=!0;else{if(i){var d=m.resultWithStarts();if(d)for(var p=0,_=d;p<_.length;p++){var c=_[p];t.push(c)}}else t.push({line:n,start:0});r++,i=!1}}return t},e.prototype._write=function(e,t,i,r,n,o){var s;f("esri-tiles-performance")&&(s=performance.now()),this.tessellationProperties.id=n,this.tessellationProperties.indexBuf=t,this.tessellationProperties.indexCount=0,this.tessellationProperties.geometryBuf=i,this.tessellationProperties.vertexCount=0,this.tessellationProperties.offset=r;for(var l=0,a=o;l<a.length;l++){var h=a[l],u=h.line;u.length<2||(this._tessellationOptions.initialDistance=h.start%65535,this._tessellationCallbacks instanceof d.StandardTessellationCallbacks&&(this._tessellationCallbacks.capType=this._capType,this._tessellationCallbacks.joinType=this._joinType),d.tessellate(u,this._tessellationOptions,this._tessellationCallbacks),d.cleanup(),f("esri-tiles-performance")&&b++)}e.vertexCount=this.tessellationProperties.vertexCount,e.indexCount=this.tessellationProperties.indexCount,e.zOrder=this._zOrder,f("esri-tiles-performance")&&(g+=(performance.now()-s)/1e3,C+=e.indexCount/3)},e.prototype._initializeTessellator=function(e){var t=l.LineMaterialKey.load(this._materialKey);if(this._tessellationOptions.trackDistance=this._isDashed||this._hasPattern,this._tessellationOptions.thin=!e&&this.tessellationProperties._halfWidth<n.THIN_LINE_THRESHOLD/2&&!(t.vvSizeFieldStops||t.vvSizeMinMaxValue||t.vvSizeScaleStops||t.vvSizeUnitValue),this._tessellationOptions.wrapDistance=65535,this._tessellationOptions.outerBisectorAutoSplitThreshold=1/3.8,this._tessellationOptions.enableOuterBisectorSplit=this._isDashed||this._hasPattern,this._tessellationOptions.innerBisectorAutoSplitThreshold=1/3.8,this._tessellationOptions.enableInnerBisectorSplit=this._isDashed||this._hasPattern,this._tessellationOptions.thin)this._tessellationCallbacks={vertex:T(this.tessellationProperties),bridge:w(this.tessellationProperties)};else{var i=new d.StandardTessellationCallbacks(P(this.tessellationProperties),L(this.tessellationProperties));i.miterLimitCosine=this._miterLimitCosine,i.textured=this._isDashed||this._hasPattern,i.joinOnUTurn=this._joinOnUTurn,this._tessellationCallbacks=i}},e}(e)}});