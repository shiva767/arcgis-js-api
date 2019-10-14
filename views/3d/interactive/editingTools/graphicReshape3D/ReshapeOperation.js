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

define(["require","exports","../../../../../core/tsSupport/decorateHelper","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/Evented","../../../../../core/Handles","../../../../../core/accessorSupport/decorators","../../../../../layers/graphics/dehydratedFeatures","./ReshapeMoveManipulator","./reshapeUtils","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryUtil","../../../../interactive/Manipulator3D","../../../../interactive/manipulatorUtils"],function(e,t,a,r,n,i,o,l,p,s,u,h,c,m){Object.defineProperty(t,"__esModule",{value:!0});var d=function(){function e(e,t){void 0===e&&(e=!1),void 0===t&&(t=!1),this.isDragging=e,this.fromTranslation=t,this.graphic=null,this.type="reshape-start"}return e}();t.ReshapeStartEvent=d;var v=function(){function e(e){this.coords=e,this.graphic=null,this.type="vertex-move"}return e}();t.VertexMoveEvent=v;var _=function(){function e(e,t){this.dxScreen=e,this.dyScreen=t,this.graphic=null,this.type="translate"}return e}();t.TranslateEvent=_;var f=function(){function e(e){this.coords=e,this.graphic=null,this.type="vertex-add"}return e}();t.VertexAddEvent=f;var g=function(){function e(e){this.coords=e,this.graphic=null,this.type="vertex-remove"}return e}();t.VertexRemoveEvent=g;var y=function(){function e(e,t){void 0===e&&(e=!1),void 0===t&&(t=!1),this.isDragging=e,this.fromTranslation=t,this.graphic=null,this.type="reshape-stop"}return e}();t.ReshapeStopEvent=y;var M=function(e){function t(t){var a=e.call(this,t)||this;return a._vertexManipulatorMaterial=m.createManipulatorMaterial([1,.5,0],1),a._edgeManipulatorMaterial=m.createManipulatorMaterial([.5,.5,.5],1),a._selectedManipulatorMaterial=m.createManipulatorMaterial([1,1,1],1),a._manipulatorGeometry=new u(h.createSphereGeometry(1,16,16),"reshape-manipulator"),a._handles=new i,a._manipulatorInfos=[],a._reshapeHelper=null,a._moveManipulator=null,a._numDragging=0,a.manipulators=null,a}return r(t,e),t.prototype.destroy=function(){this._clear()},Object.defineProperty(t.prototype,"inputGeometry",{get:function(){return this._reshapeHelper?this._reshapeHelper.geometry:null},set:function(e){this._recreateManipulators(e)},enumerable:!0,configurable:!0}),t.prototype.removeSelectedVertices=function(){var e=this._manipulatorInfos.filter(function(e){return e.manipulator.selected&&"vertex"===e.handle.type});this._removeVertices(e)},t.prototype._clear=function(){this._handles.removeAll(),this.manipulators.removeAll(),this._manipulatorInfos=[],this._moveManipulator=null,this._reshapeHelper=null,this._numDragging=0},t.prototype._recreateManipulators=function(e){var t=this;if(this._clear(),this._reshapeHelper=s.createReshapeHelper(e,"global"===this.view.viewingMode),!this._reshapeHelper)return null;this._reshapeHelper.components.forEach(function(e){e.vertices.forEach(function(e){return t._createManipulator(e)}),e.edges.forEach(function(e){return t._createManipulator(e)})}),this._moveManipulator=new p.ReshapeMoveManipulator({view:this.view,reshapeHelper:this._reshapeHelper,selectable:!1}),this._handles.add(this._moveManipulator.watch("grabbing",function(e){t._manipulatorInfos.forEach(function(t){t.manipulator.interactive=!e})},!0),this._moveManipulator),this._handles.add(this._moveManipulator.watch("dragging",function(e){!0===e?1===++t._numDragging&&t.emit("reshape-operation-start",new d(!0,!0)):0===--t._numDragging&&t.emit("reshape-operation-stop",new y(!0,!0))},!0),this._moveManipulator),this._handles.add(this._moveManipulator.watch("hovering",function(e){t.cursor=e?"move":null},!0),this._moveManipulator),this._moveManipulator.on("drag",function(e){return t._moveManipulatorDragCallback(e)}),this._moveManipulator.on("click",function(){return t.emit("click")}),this.manipulators.add(this._moveManipulator)},t.prototype._clearManipulatorSelection=function(){this._manipulatorInfos.forEach(function(e){e.manipulator.selected=!1})},t.prototype._createManipulator=function(e){var t=this,a=new c.Manipulator3D({view:this.view,renderObjects:[{geometry:this._manipulatorGeometry,material:this._vertexManipulatorMaterial,stateMask:4|x.Vertex},{geometry:this._manipulatorGeometry,material:this._edgeManipulatorMaterial,stateMask:4|x.Edge},{geometry:this._manipulatorGeometry,material:this._selectedManipulatorMaterial,stateMask:8}],radius:5});a.alignment="on-the-ground","vertex"===e.type?(a.state=x.Vertex,a.selectable=!0):(a.state=x.Edge,a.selectable=!1);var r={manipulator:a,handle:e};return this._manipulatorInfos.push(r),this.manipulators.add(a),this._setManipulatorPosition(r),this._handles.add(a.watch("grabbing",function(e){t._moveManipulator.interactive=!e},!0),a),this._handles.add(a.watch("dragging",function(e){!0===e?1===++t._numDragging&&t.emit("reshape-operation-start",new d(!0)):0===--t._numDragging&&t.emit("reshape-operation-stop",new y(!0))},!0),a),this._handles.add(a.watch("hovering",function(e){t.cursor=e?"vertex"===r.handle.type?"move":"copy":null},!0),a),a.on("drag",function(){return t._manipulatorMoveCallback(r)}),a.on("click",function(e){return t._manipulatorClickCallback(e,r)}),a},t.prototype._removeManipulator=function(e){e&&(this._handles.remove(e.manipulator),this._manipulatorInfos.splice(this._manipulatorInfos.indexOf(e),1),this.manipulators.remove(e.manipulator))},t.prototype._getManipulatorInfoFromHandle=function(e){if(e)for(var t=0,a=this._manipulatorInfos;t<a.length;t++){var r=a[t];if(e===r.handle)return r}return null},t.prototype._setManipulatorPosition=function(e){e&&("vertex"===e.handle.type?e.manipulator.mapPoint=this._reshapeHelper.getVertexPositionAsPoint(e.handle,w):"edge"===e.handle.type&&(e.manipulator.mapPoint=this._reshapeHelper.getEdgePositionAsPoint(e.handle,.5,w)))},t.prototype._splitEdgeManipulator=function(e){if("edge"===e.handle.type){var t=this._reshapeHelper.splitEdge(e.handle,.5);return e.handle=t,e.manipulator.state=x.Vertex,e.manipulator.selectable=!0,t.left&&this._createManipulator(t.left),t.right&&this._createManipulator(t.right),t}return null},t.prototype._manipulatorMoveCallback=function(e){var t=this;if("edge"===e.handle.type&&this._splitEdgeManipulator(e),e.handle&&"vertex"===e.handle.type){!1===e.manipulator.selected&&(this._clearManipulatorSelection(),e.manipulator.selected=!0);var a=e.handle.pos,r=e.manipulator.mapPoint.x-a[0],n=e.manipulator.mapPoint.y-a[1],i=this._manipulatorInfos.filter(function(e){return e.manipulator.selected&&"vertex"===e.handle.type});i.forEach(function(a){var i=a.handle;i.pos[0]+=r,i.pos[1]+=n,e!==a&&(w.x=i.pos[0],w.y=i.pos[1],w.spatialReference=t._reshapeHelper.geometry.spatialReference,a.manipulator.mapPoint=w)}),this.outputGeometry=this._reshapeHelper.commit(),i.forEach(function(e){var a=e.handle;t._setManipulatorPosition(t._getManipulatorInfoFromHandle(a.left)),t._setManipulatorPosition(t._getManipulatorInfoFromHandle(a.right))});var o=i.map(function(e){return e.handle.unnormalizedPos}),l=new v(o);this.emit("vertex-move",l)}},t.prototype._removeVertices=function(e){var t=this,a=[];if(e.forEach(function(e){if("vertex"===e.handle.type&&t._reshapeHelper.canRemoveVertex(e.handle)){0===a.length&&t.emit("reshape-operation-start",new d),a.push(e.handle.unnormalizedPos),t._removeManipulator(e),t._removeManipulator(t._getManipulatorInfoFromHandle(e.handle.left)),t._removeManipulator(t._getManipulatorInfoFromHandle(e.handle.right));var r=t._reshapeHelper.removeVertex(e.handle);r&&t._createManipulator(r)}}),a.length>0){this.outputGeometry=this._reshapeHelper.commit();var r=new g(a);this.emit("vertex-remove",r),this.emit("reshape-operation-stop",new y)}},t.prototype._manipulatorClickCallback=function(e,t){if("vertex"===t.handle.type&&2===e.button&&this._removeVertices([t]),"edge"===t.handle.type&&0===e.button){this.emit("reshape-operation-start",new d);var a=this._splitEdgeManipulator(t);this.outputGeometry=this._reshapeHelper.commit();var r=new f([a.unnormalizedPos]);this.emit("vertex-add",r),this.emit("reshape-operation-stop",new y)}},t.prototype._moveManipulatorDragCallback=function(e){var t=this,a=[],r=!0;if(this._manipulatorInfos.forEach(function(n){"vertex"===n.handle.type&&(n.manipulator.grabbing?r=!1:"vertex"===n.handle.type&&(n.handle.pos[0]+=e.dxGeometry,n.handle.pos[1]+=e.dyGeometry,a.push(n.handle.pos),t._setManipulatorPosition(n)))}),this._manipulatorInfos.forEach(function(e){"vertex"!==e.handle.type&&t._setManipulatorPosition(e)}),this.outputGeometry=this._reshapeHelper.commit(),r)this.emit("translate",new _(e.dxScreen,e.dyScreen));else{var n=new v(a);this.emit("vertex-move",n)}},a([o.property({value:null,nonNullable:!0})],t.prototype,"view",void 0),a([o.property({value:null})],t.prototype,"inputGeometry",null),a([o.property({value:null})],t.prototype,"cursor",void 0),a([o.property({value:null})],t.prototype,"outputGeometry",void 0),a([o.property({constructOnly:!0})],t.prototype,"manipulators",void 0),t=a([o.subclass("esri.views.3d.interactive.editingTools.graphicReshape3D.ReshapeOperation")],t)}(o.declared(n.EventedAccessor));t.ReshapeOperation=M;var x,w=l.makeDehydratedPoint(0,0,null,null);!function(e){e.Vertex=16,e.Edge=32}(x||(x={}))});