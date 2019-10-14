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

define(["require","exports","../../../../core/mathUtils","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec2","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../support/earthUtils","../../support/geometryUtils","../../support/mathUtils","../../support/stack","../../support/geometryUtils/coordinateSystem","../../webgl-engine/lib/Camera"],function(e,t,a,r,c,n,o,i,s,l,v,d,m,h,u,p){function f(e,t,a){return a[0]=t[0]/(e.fullWidth/e.pixelRatio),a[1]=t[1]/(e.fullHeight/e.pixelRatio),a}function g(e,t,a){var r=h.sv3d.get(),c=h.sv3d.get(),n=h.sv3d.get();s.vec3.copy(c,e),s.vec3.copy(n,t);var o=s.vec3.dot(c,a),i=s.vec3.dot(n,a);s.vec3.scale(r,a,o),s.vec3.subtract(c,c,r),s.vec3.normalize(c,c),s.vec3.scale(r,a,i),s.vec3.subtract(n,n,r),s.vec3.normalize(n,n);var l=s.vec3.dot(c,n);s.vec3.cross(r,a,c);var v=s.vec3.dot(n,r);return Math.atan2(v,l)}function y(e){for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e}function M(e,t,a){var r=h.sm4d.get();c.mat4.identity(r),c.mat4.rotate(r,r,a[3],a),s.vec3.subtract(e.eye,e.eye,t),s.vec3.transformMat4(e.eye,e.eye,r),s.vec3.add(e.eye,e.eye,t),s.vec3.subtract(e.center,e.center,t),s.vec3.transformMat4(e.center,e.center,r),s.vec3.add(e.center,e.center,t),s.vec3.transformMat4(e.up,e.up,r),e.markViewDirty()}function P(e,t,a,r){return d.plane.intersectRay(e,d.ray.fromScreen(t,a,ge),r)}function b(e,t,a,r){var c=h.sv3d.get(),n=1-a;s.vec3.subtract(c,t,e.eye);var o=s.vec3.length(c),i=o*(1-n);n>=0&&i<r&&(i=r,n=-(i-o)/o),Math.abs(o-i)<1e-6||(s.vec3.scale(c,c,n),s.vec3.add(e.eye,e.eye,c),s.vec3.lerp(e.center,e.center,t,n))}function x(e,t,a){t.getScreenCenter(_),d.sphere.intersectScreen(e,t,_,t.center),t.markViewDirty();var r=t.distance,c=r*a;if(!(Math.abs(r-c)<1e-6)){var n=s.vec3.scale(h.sv3d.get(),t.viewForward,c);s.vec3.subtract(t.eye,t.center,n),t.markViewDirty()}}function A(e,t,a){z(t,a),s.vec3.normalize(a,a),s.vec3.scale(a,a,e)}function z(e,t){s.vec3.set(t,0,0,0);for(var a=0,r=e;a<r.length;a++){var c=r[a];s.vec3.add(t,t,c)}s.vec3.scale(t,t,1/e.length)}function T(e,t,a){return Math.sin(e/s.vec3.length(t))*(a+v.earthRadius)}function S(e,t,a){return T(Math.PI/2,t,a)+(e-Math.PI/2)}function w(e,a,r,c){var n=l.vec3f64.create(),o=d.sphere.create(),i=!0;return e.intersectScreen(r,n)?o.radius=s.vec3.length(n):(a.aboveGround?o.radius=Math.max(s.vec3.length(a.center),.9*t.Earth.radius):o.radius=s.vec3.length(a.eye)-a.relativeElevation,c?H(o,a,r,n):i=d.sphere.intersectScreen(o,a,r,n)),{sphere:o,scenePickPoint:i?n:null}}function I(e,r,c){var n=s.vec3.length(e.eye),o=n-t.Earth.radius;if(Math.abs(o)>t.VerticalPanTresholds.Elevation)return j.Horizontal;var i=r.radius>n;return e.aboveGround===i?j.Vertical:(s.vec3.subtract(B,e.eye,c),s.vec3.normalize(B,B),Math.abs(.5*Math.PI-a.acosClamped(s.vec3.dot(c,B)/s.vec3.length(c)))<t.VerticalPanTresholds.Angle?j.Vertical:j.Horizontal)}function V(e,t,a){s.vec3.subtract(J,a,t),s.vec3.subtract(e.eye,e.eye,J),s.vec3.subtract(e.center,e.center,J),e.markViewDirty()}function H(e,t,a,r){var c=d.ray.fromScreenAtEye(t,a,ge);return d.sphere.closestPointOnSilhouette(e,c,K),d.sphere.intersectRay(e,c,r)?!(s.vec3.squaredDistance(K,c.origin)<s.vec3.squaredDistance(r,c.origin))||(s.vec3.copy(r,K),!1):(s.vec3.subtract(L,t.eye,t.center),s.vec3.normalize(L,L),d.plane.fromNormalAndOffset(L,-s.vec3.dot(s.vec3.normalize(L,L),K),Q),d.plane.intersectRay(Q,c,r),!1)}function R(e,r,c,n,o,i){var l;if(s.vec3.cross(pe,e,r),s.vec3.subtract(he,e,r),s.vec3.length(e)<=o||!n.aboveGround){s.vec3.cross(c,he,n.eye);var v=s.vec3.dot(e,r)/(s.vec3.length(e)*s.vec3.length(r)),d=Math.cos(a.clamp(m.cyclicalPI.normalize(a.deg2rad(i)),0,t.TiltThresholdPanningSpeed));l=-a.acosClamped(v)-Math.max(0,s.vec3.length(r)-o)/(d*o)}else s.vec3.subtract(X,n.eye,n.center),s.vec3.cross(c,he,X),l=-s.vec3.length(he)/o;return s.vec3.normalize(c,c),s.vec3.scale(c,c,s.vec3.length(pe)),l}function D(e,r,c,n){var o,i=Math.cos(a.clamp(m.cyclicalPI.normalize(a.deg2rad(n)),0,t.TiltThresholdPanningSpeed));return o=r>c?-(r-c)/(i*c):r<-c?Math.PI-(r+c)/(i*c):a.acosClamped(r/c),((e>c?-(e-c)/(i*c):e<-c?Math.PI-(e+c)/(i*c):a.acosClamped(e/c))-o)*c}function k(e,t,a,r,c,n,i,l,v,d){var m=D(e[2],t[2],i.radius,v),h=d?D(e[0],t[0],i.radius,180):t[0]-e[0],u=Math.sin(l)*h-Math.cos(l)*m,p=Math.cos(l)*h+Math.sin(l)*m;s.vec3.normalize(me,c);var f=d?u/Math.sqrt(Math.abs(Math.pow(i.radius,2)-Math.pow(s.vec3.dot(a,me),2))):u/i.radius,g=p/Math.sqrt(Math.abs(Math.pow(i.radius,2)-Math.pow(s.vec3.dot(a,r),2)));o.vec2.set(n,f,g)}function F(e,t,a,r,c,n,o,i,l,v){s.vec3.cross(pe,e,t),u.coordinateSystemFromOneAxisAndNormalVector(n.up,n.eye,te,ae,re),u.coordinateSystemFromOneAxisAndNormalVector([0,0,1],n.eye,Y,$,ee),s.vec3.copy(a,$),s.vec3.copy(r,Y),s.vec3.normalize(a,a),s.vec3.scale(a,a,s.vec3.length(pe)),u.vectorCoordinates(e,s.vec3.normalize(ae,ae),s.vec3.normalize(re,re),s.vec3.normalize(te,te),ce),u.vectorCoordinates(t,ae,re,te,ne),k(ce,ne,e,Y,$,c,o,i,l,v)}function q(e,t,a,r,n,o,i){c.mat4.identity(se),c.mat4.identity(le),c.mat4.identity(ve),c.mat4.rotate(se,se,n,r),c.mat4.rotate(le,le,i,o),c.mat4.multiply(ve,se,le),s.vec3.subtract(t,e,a),s.vec3.transformMat4(t,t,ve),s.vec3.add(t,t,a)}function C(e,t,a,r,n,o){c.mat4.identity(se),c.mat4.identity(le),c.mat4.identity(ve),c.mat4.rotate(se,se,r,a),c.mat4.rotate(le,le,o,n),c.mat4.multiply(ve,se,le),s.vec3.subtract(e.eye,e.eye,t),s.vec3.transformMat4(e.eye,e.eye,ve),s.vec3.add(e.eye,e.eye,t),s.vec3.subtract(e.center,e.center,t),s.vec3.transformMat4(e.center,e.center,ve),s.vec3.add(e.center,e.center,t),s.vec3.subtract(e.up,e.up,t),s.vec3.transformMat4(e.up,e.up,ve),s.vec3.add(e.up,e.up,t),e.markViewDirty()}function E(e,a,r,c,n,o,i,s){void 0===i&&(i=t.PreservingHeadingThreshold.Pole),void 0===s&&(s=t.PreservingHeadingThreshold.Angle);var l=Math.abs(c)>Math.PI-s||Math.abs(c)<s,v=Math.abs(e[2])<r*i||Math.abs(a)>r;return!!(l&&v&&o.aboveGround&&n<t.PreservingHeadingThreshold.Tilt)}function O(e,t,a,r,c,n){if(n)d.axisAngle.fromPoints(a,r,ie),M(t,e.center,ie);else{var o=R(a,r,fe,t,e.radius,c);M(t,e.center,d.axisAngle.wrapAxisAngle(fe,o))}}function G(e,t,a,r,c,n,o){var i=o?20:1;s.vec3.copy(de,r),ue.copyFrom(t);for(var l,v=0;v<i&&s.vec3.squaredDistance(a,de)>1e-12&&(l=s.vec3.squaredDistance(a,de),F(a,de,$,Y,oe,ue,e,c,n,o),C(ue,e.center,Y,oe[1],$,oe[0]),q(de,de,e.center,Y,oe[1],$,oe[0]),s.vec3.squaredDistance(a,de)<l||0===v);v++)t.copyFrom(ue)}function U(e,r,c,n,o,i,l){E(c,s.vec3.dot(r.up,c),e.radius,-m.cyclicalPI.normalize(a.deg2rad(o)),i,r,t.PreservingHeadingThreshold.Pole,t.PreservingHeadingThreshold.Angle)?G(e,r,c,n,-m.cyclicalPI.normalize(a.deg2rad(o)),i,l):O(e,r,c,n,i,l)}function N(e,t,a,r,n,o){var i=e.eye;u.coordinateSystemFromOneAxisAndNormalVector([0,0,1],i,Y,$,ee);var l=t.translation[0]*a.pan,v=t.translation[1]*a.pan,d=Math.max(Math.sqrt(Math.abs(1-Math.pow(s.vec3.dot(e.center,Y),2)/Math.pow(s.vec3.length(e.center),2))),.5),m=(Math.sin(o)*v+Math.cos(o)*l)/d,h=-Math.cos(o)*v+Math.sin(o)*l;switch(c.mat4.rotate(r.pan.matrix,r.pan.matrix,m,Y),r.pan.enabled=!0,n.mode){case"pan":c.mat4.rotate(r.pan.matrix,r.pan.matrix,h,$),r.pan.enabled=!0;break;case"zoom":r.zoom=-t.translation[1]*a.zoom}}function W(e,t,a,r,n){var o=e.eye,i=e.viewRight,l=s.vec3.cross(h.sv3d.get(),i,o),v=t.translation[0]*a.pan;switch(0!==v&&(c.mat4.rotate(r.pan.matrix,r.pan.matrix,-v,l),r.pan.enabled=!0),n.mode){case"pan":var d=t.translation[1]*a.pan;0!==d&&(c.mat4.rotate(r.pan.matrix,r.pan.matrix,d,i),r.pan.enabled=!0);break;case"zoom":r.zoom=-t.translation[1]*a.zoom}}function Z(e,t,r,c,n,o,i,l,v){E(e.center,s.vec3.dot(e.up,e.center),s.vec3.length(e.center),-m.cyclicalPI.normalize(a.deg2rad(o)),i,t)?N(t,r,c,l,v,-m.cyclicalPI.normalize(a.deg2rad(n))):W(t,r,c,l,v)}Object.defineProperty(t,"__esModule",{value:!0}),t.Earth=d.sphere.fromValues(v.earthRadius,l.vec3f64.create()),t.normalizeCoordinate=f,t.rotationFromPointsAroundAxis=g,t.normalizeRotationDelta=y,t.applyRotation=M,t.intersectPlaneFromScreenPoint=P,t.applyZoomToPoint=b,t.applyZoomOnSphere=x;var _=r.createScreenPointArray();t.centroidOnSphere=A,t.centroid=z,t.onSurfaceTiltToEyeTiltGlobal=T,t.offSurfaceTiltToEyeTiltGlobal=S;var j;!function(e){e[e.Vertical=0]="Vertical",e[e.Horizontal=1]="Horizontal"}(j=t.PanMode||(t.PanMode={})),t.VerticalPanTresholds={Elevation:3e4,Angle:a.deg2rad(8)},t.PreservingHeadingThreshold={Pole:.95,Angle:a.deg2rad(18),Tilt:45},t.TiltThresholdPanningSpeed=a.deg2rad(80),t.pickPointAndInitSphere=w,t.decidePanMode=I;var B=l.vec3f64.create();t.applyPanPlanar=V;var J=l.vec3f64.create();t.sphereOrPlanePointFromScreenPoint=H;var K=l.vec3f64.create(),L=l.vec3f64.create(),Q=d.plane.create();t.rotationAngleAndAxisDirectRotation=R;var X=l.vec3f64.create();t.lengthFromPoints=D,t.rotationAnglesHeadingPreserving=k,t.rotationAnglesAndAxesHeadingPreserving=F,t.rotatePointAroundTwoAxes=q,t.applyRotationWithTwoAxes=C,t.preserveHeadingThreshold=E,t.applyPanSphericalDirectRotation=O,t.applyPanSphericalPreserveHeading=G,t.panToPosition=U,t.panMotionToRotationMatrix=Z;var Y=l.vec3f64.create(),$=l.vec3f64.create(),ee=l.vec3f64.create(),te=l.vec3f64.create(),ae=l.vec3f64.create(),re=l.vec3f64.create(),ce=l.vec3f64.create(),ne=l.vec3f64.create(),oe=i.vec2f64.create(),ie=d.axisAngle.create(),se=n.mat4f64.create(),le=n.mat4f64.create(),ve=n.mat4f64.create(),de=l.vec3f64.create(),me=l.vec3f64.create(),he=l.vec3f64.create(),ue=new p.default,pe=l.vec3f64.create(),fe=l.vec3f64.create(),ge={origin:l.vec3f64.create(),direction:l.vec3f64.create()}});