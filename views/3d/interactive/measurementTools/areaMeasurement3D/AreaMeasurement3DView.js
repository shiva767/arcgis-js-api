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

define(["require","exports","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/tsSupport/decorateHelper","../../../../../core/Handles","../../../../../core/maybe","../../../../../core/screenUtils","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../directLineMeasurement3D/LaserLineRenderer","../support/Label","../support/LabelSegment","../support/labelUtils","../support/PathSegmentInterpolator","../support/viewUtils","../../../support/projectionUtils","../../../support/stack","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryData","../../../webgl-engine/lib/GeometryUtil","../../../webgl-engine/lib/Intersector","../../../webgl-engine/lib/Layer","../../../webgl-engine/lib/Object3D","../../../webgl-engine/materials/CheckerBoardMaterial","../../../webgl-engine/materials/RibbonLineMaterial","../../../../interactive/ManipulatorCollection","../../../../interactive/manipulatorUtils"],function(e,t,i,r,n,a,s,o,l,h,p,d,c,_,u,m,g,L,v,b,f,w,y,S,P,M,j,O,C){var V={laserLineGlowColor:[1,.5,0],laserLineGlowWidth:8,laserLineInnerColor:[1,1,1],laserLineInnerWidth:1,laserLineGlobalAlpha:.75,laserLineEnabled:!0,handleColor:[1,.5,0],handleOpacity:.5,handleRadius:5,handleRadiusHovered:10,handleRadiusMouse:10,handleRadiusTouch:25,pathLineColor:[1,.5,0,1],pathLineWidth:3,intersectingLineColor:[1,.2,0,1],perimeterLineColor:[1,.5,0,1],perimeterLineWidth:2,projectionLineColor:[1,.5,0,1],projectionLineWidth:2,projectionLineStippleSize:5,areaColor1:[1,.5,0,.5],areaColor2:[1,1,1,.5],fillColor:[1,.5,0,.5],lineSubdivisions:64,labelDistance:25},R=function(){function e(e,t,i){void 0===t&&(t=new O.ManipulatorCollection),void 0===i&&(i={}),this._model=e,this._manipulators=t,this.vertexManipulators=[],this._visible=!1,this._laserLineRenderer=null,this._cursorManipulator=null,this._pathSegmentObjects=[],this._perimeterSegmentObjects=[],this._projectionLineObjects=[],this._areaLabel=new c(16),this._pathLengthLabel=new c(12),this._cursorSegmentLengthLabel=new c(12),this._perimeterLengthLabel=new c(12),this._pathLabelSegments=[],this._perimeterLabelSegments=[],this._cursorSegmentLengthLabelSegment=new _,this._listenerHandles=null,this._origin=p.vec3f64.create(),this._originTransform=l.mat4f64.create(),this._tempStartPosition=p.vec3f64.create(),this._tempEndPosition=p.vec3f64.create(),this._tempHandlePosition=p.vec3f64.create(),this._sceneView=this._model.sceneView,this._params=g.copyParameter(V,i),this._layer=new S("path-measurement-tool",{isPickable:!1}),this._createMaterials(),this._createObjects(),this._intersector=new y(this._sceneView.viewingMode);var r=C.createSphereManipulator(this._sceneView,this._params.handleColor,this._params.handleOpacity);r.visible=!1,r.radius=this._params.handleRadius,r.interactive=!1,this._manipulators.add(r),this._cursorManipulator=r}return e.prototype.destroy=function(){this.hide()},Object.defineProperty(e.prototype,"requiresCursorPoint",{get:function(){return("initial"===this._model.state||"drawing"===this._model.state)&&this._model.active},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"visible",{get:function(){return this._visible},set:function(e){e?this.show():this.hide()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"testData",{get:function(){return{labels:{area:this._areaLabel,pathLength:this._pathLengthLabel,cursorSegmentLength:this._cursorSegmentLengthLabel,perimeterLength:this._perimeterLengthLabel},laserLineRenderer:this._laserLineRenderer}},enumerable:!0,configurable:!0}),e.prototype.show=function(){if(!this._visible){this._visible=!0;var e=this._sceneView._stage,t={glowColor:this._params.laserLineGlowColor,glowWidth:this._params.laserLineGlowWidth,innerColor:this._params.laserLineInnerColor,innerWidth:this._params.laserLineInnerWidth,globalAlpha:this._params.laserLineGlobalAlpha};this._laserLineRenderer=new d(this._sceneView.renderCoordsHelper,t),e.addRenderPlugin(this._laserLineRenderer.renderSlots,this._laserLineRenderer),this._addToStage(e),this._areaLabel.addToView(this._sceneView),this._pathLengthLabel.addToView(this._sceneView),this._cursorSegmentLengthLabel.addToView(this._sceneView),this._perimeterLengthLabel.addToView(this._sceneView),this._initializeListeners(),this._updateAll(this._model.viewData)}},e.prototype.hide=function(){if(this._visible){this._visible=!1;var e=this._sceneView._stage;e.removeRenderPlugin(this._laserLineRenderer),this._laserLineRenderer=null,this._destroyListeners(),this._updatePathLength(0),this._removeFromStage(e),this._areaLabel.removeFromView(this._sceneView),this._pathLengthLabel.removeFromView(this._sceneView),this._cursorSegmentLengthLabel.removeFromView(this._sceneView),this._perimeterLengthLabel.removeFromView(this._sceneView),this._sceneView.cursor=null}},e.prototype.vertexHandleAt=function(e,t){var i=this._manipulators.intersect(e,t);return a.isSome(i)?this.manipulatorIdToVertexId(i):null},e.prototype.manipulatorIdToVertexId=function(e){for(var t=0;t<this.vertexManipulators.length;t++){if(e===this.vertexManipulators[t].id)return t}return null},e.prototype.pick=function(t){var i=this._sceneView.spatialReference,r=s.screenPointObjectToArray(t.screenPoint),n=this._sceneView.sceneIntersectionHelper.intersectToolIntersectorScreen(r,this._intersector),a=n.results.min,o=p.vec3f64.create();if(!a.getIntersectionPoint(o))return new e.PickResult;var l=this._sceneView.renderCoordsHelper.fromRenderCoords(o,i),h="TerrainRenderer"===a.intersector?"surface":"feature";return new e.PickResult(h,o,l)},e.prototype.overlappingHandles=function(e,t){return g.pointToPointScreenDistance(e,t,this._sceneView)<=this._params.handleRadius},e.prototype._createMaterials=function(){this._pathLineMaterial=new j({width:this._params.pathLineWidth,color:this._params.pathLineColor,polygonOffset:!0},"path-line"),this._pathLineMaterial.renderOccluded=4,this._intersectingPathLineMaterial=new j({width:this._params.pathLineWidth,color:this._params.intersectingLineColor,polygonOffset:!0},"intersecting-path-line"),this._intersectingPathLineMaterial.renderOccluded=4,this._perimeterLineMaterial=new j({width:this._params.perimeterLineWidth,color:this._params.perimeterLineColor,polygonOffset:!0},"perimeter-line"),this._perimeterLineMaterial.renderOccluded=4,this._intersectingPerimeterLineMaterial=new j({width:this._params.perimeterLineWidth,color:this._params.intersectingLineColor,polygonOffset:!0},"intersecting-perimeter-line"),this._intersectingPerimeterLineMaterial.renderOccluded=4,this._projectionLineMaterial=new j({width:this._params.projectionLineWidth,color:this._params.projectionLineColor,polygonOffset:!0,stippleLength:0},"projection-line"),this._projectionLineMaterial.renderOccluded=4,this._checkerBoardMaterial=new M({color1:this._params.areaColor1,color2:this._params.areaColor2,transparent:!0,writeDepth:!1,polygonOffset:!0},"checker-board"),this._checkerBoardMaterial.renderOccluded=4},e.prototype._createObjects=function(){this._cursorSegmentObject=new P,this._areaObject=new P},e.prototype._addToStage=function(e){e.add(0,this._layer),e.add(3,this._pathLineMaterial),e.add(3,this._intersectingPathLineMaterial),e.add(3,this._perimeterLineMaterial),e.add(3,this._intersectingPerimeterLineMaterial),e.add(3,this._projectionLineMaterial),e.add(3,this._checkerBoardMaterial),e.addToViewContent([this._layer.id])},e.prototype._removeFromStage=function(e){e.removeFromViewContent([this._layer.id]),e.remove(0,this._layer.id),e.remove(3,this._pathLineMaterial.id),e.remove(3,this._intersectingPathLineMaterial.id),e.remove(3,this._perimeterLineMaterial.id),e.remove(3,this._intersectingPerimeterLineMaterial.id),e.remove(3,this._projectionLineMaterial.id),e.remove(3,this._checkerBoardMaterial.id)},e.prototype._syncViewData=function(e){var t=this;if(!this._visible)return"none";var i=e.pathChanges;"full"===i.change?this._updateAll(e):"incremental"===i.change&&(i.updatedVertices.forEach(function(i){var r=(i-1+t._model.path.length)%t._model.path.length;t._updatePathSegment(e,i),t._updatePathSegment(e,r),t._updateVertexHandle(e,i),t._updateArea(e),t._updatePerimeterSegments(e),t._updateProjectionLines(e),t._updateLaserLine(),t._updateLabels(e)}),i.updatedVertices.has(this._model.path.length-1)&&this._updateCursorSegment(e));var r=i.change;return i.clear(),r},e.prototype._updateAfterSyncViewData=function(e){var t=this._model.viewData;!("full"===this._syncViewData(t))&&e&&e(t)},e.prototype._updateOrigin=function(e){g.midpoint(e.positionsRenderCoords,this._origin),o.mat4.identity(this._originTransform),o.mat4.translate(this._originTransform,this._originTransform,this._origin)},e.prototype._updateAll=function(e){this._updateOrigin(e),this._updatePathLength(e.path.length),this._updatePathSegments(e),this._updatePerimeterSegments(e),this._updateHandles(e),this._updateArea(e),this._updateProjectionLines(e),this._updateLabels(e),this._updateLaserLine()},e.prototype._updateCameraDependent=function(e){this._updateHandles(e),this._updateProjectionLines(e),this._updateLabels(e)},e.prototype._updatePathLength=function(e){this._resizeObject3DArray(this._pathSegmentObjects,e),this._resizeObject3DArray(this._perimeterSegmentObjects,e),this._resizeManipulatorArray(this.vertexManipulators,e),g.resizeArray(this._pathLabelSegments,e,function(){return new _}),g.resizeArray(this._perimeterLabelSegments,e,function(){return new _})},e.prototype._updatePathSegments=function(e){for(var t=0;t<this._pathSegmentObjects.length;++t)this._updatePathSegment(e,t);this._updateCursorSegment(e)},e.prototype._updatePathSegment=function(e,t){var i=e.path,r=this._pathSegmentObjects[t];e.validMeasurement||t<i.length-1?(this._createInterpolatedLineGeometry(r,e.intersectingSegments.has(t)?this._intersectingPathLineMaterial:this._pathLineMaterial,"path-segment",e.positionsRenderCoords[t],e.positionsRenderCoords[(t+1)%i.length],this._origin,this._originTransform,this._model.measurementMode,this._pathLabelSegments[t],e.validMeasurement?"center":"end"),this._addObject3D(r)):(r.removeAllGeometries(),this._removeObject3D(r))},e.prototype._updateCursorSegment=function(e){var t=this._sceneView.renderCoordsHelper,i=this._model.path,r=this._cursorSegmentObject;i.length>0&&"drawing"===this._model.state&&this._model.cursorPoint?(t.toRenderCoords(i.back,this._tempStartPosition),t.toRenderCoords(this._model.cursorPoint,this._tempEndPosition),this._createInterpolatedLineGeometry(r,this._pathLineMaterial,"path-segment",this._tempStartPosition,this._tempEndPosition,this._origin,this._originTransform,this._model.measurementMode,this._cursorSegmentLengthLabelSegment,"end"),this._addObject3D(r)):(r.removeAllGeometries(),this._removeObject3D(r))},e.prototype._updatePerimeterSegments=function(e){for(var t=0;t<this._perimeterSegmentObjects.length;++t)this._updatePerimeterSegment(e,t)},e.prototype._updatePerimeterSegment=function(e,t){var i=e.path,r=this._perimeterSegmentObjects[t];e.validMeasurement&&"geodesic"!==this._model.measurementMode?(this._updatePerimeterSegmentObject(r,e.positionsFittedRenderCoords[t],e.positionsFittedRenderCoords[(t+1)%i.length],this._origin,this._originTransform,e.intersectingSegments.has(t),this._perimeterLabelSegments[t]),this._addObject3D(r)):(r.removeAllGeometries(),this._removeObject3D(r))},e.prototype._updatePerimeterSegmentObject=function(e,t,i,r,n,a,s){this._createInterpolatedLineGeometry(e,a?this._intersectingPerimeterLineMaterial:this._perimeterLineMaterial,"perimeter-segment",t,i,r,n,this._model.measurementMode,s)},e.prototype._updateHandles=function(e){for(var t=0;t<this.vertexManipulators.length;++t)this._updateVertexHandle(e,t);this._updateCursorHandle()},e.prototype._updateVertexHandle=function(e,t){this.vertexManipulators[t].manipulator.position=e.positionsRenderCoords[t]},e.prototype._updateCursorHandle=function(){var e=this._cursorManipulator;"drawing"===this._model.state&&this._model.cursorPoint?(e.visible=!0,e.mapPoint=this._model.cursorPoint):e.visible=!1},e.prototype._updateArea=function(e){switch(this._model.measurementMode){case"euclidean":this._updateAreaEuclidean(e);break;case"geodesic":this._updateAreaGeodesic()}},e.prototype._updateAreaEuclidean=function(e){var t=this,i=this._areaObject;if(e.validMeasurement&&0===e.intersectingSegments.size&&e.triangleIndices){var r=[],n=p.vec3f64.create();e.positionsFittedRenderCoords.forEach(function(e){h.vec3.subtract(n,e,t._origin),r.push(n[0],n[1],n[2])});var a=[];e.positionsProjected.forEach(function(e){a.push(e[0],e[1])});var s=new f.GeometryData({position:{size:3,data:r},uv0:{size:2,data:a}},{position:e.triangleIndices,uv0:e.triangleIndices}),o=new b(s,"area");i.removeAllGeometries(),i.addGeometry(o,this._checkerBoardMaterial,this._originTransform),this._addObject3D(i),this._checkerBoardMaterial.setParameterValues({size:[e.checkerSize,e.checkerSize]})}else i.removeAllGeometries(),this._removeObject3D(i)},e.prototype._updateAreaGeodesic=function(){var e=this._areaObject;e.removeAllGeometries(),this._removeObject3D(e)},e.prototype._updateProjectionLines=function(e){var t=e.path;this._resizeObject3DArray(this._projectionLineObjects,t.length);for(var i=0;i<t.length;++i)this._updateProjectionLine(e,i);for(var r=1/0,i=0;i<t.length;++i)r=Math.max(this._sceneView._stage.getCamera().computeScreenPixelSizeAt(e.positionsRenderCoords[i])),r=Math.max(this._sceneView._stage.getCamera().computeScreenPixelSizeAt(e.positionsFittedRenderCoords[i]));this._projectionLineMaterial.setParameterValues({stippleLength:this._params.projectionLineStippleSize*r})},e.prototype._updateProjectionLine=function(e,t){var i=this._projectionLineObjects[t];if(i.removeAllGeometries(),e.validMeasurement&&"euclidean"===this._model.measurementMode){var r=p.vec3f64.create();h.vec3.subtract(r,this._model.viewData.positionsRenderCoords[t],this._origin);var n=p.vec3f64.create();h.vec3.subtract(n,this._model.viewData.positionsFittedRenderCoords[t],this._origin);var a=new b(w.createPolylineGeometry([r,n]),"projected-line");i.addGeometry(a,this._projectionLineMaterial,this._originTransform),this._addObject3D(i)}else this._removeObject3D(i)},e.prototype._updateLabels=function(e){var t=this,i=this._sceneView._stage.getCamera(),r=this._params.labelDistance,n=this._model,a="geodesic"===n.measurementMode,s="drawing"===n.state,o=function(e,i){return e.visible&&i.visible&&t._sceneView.overlay.overlaps(e.textItem,i.textItem)},l=this._areaLabel,h=u.positionLabelOnPoint(l,e.areaCentroid,i);l.text=n.areaLabel,l.visible=h&&e.validMeasurement&&0===e.intersectingSegments.size&&null!=n.areaLabel;var l=this._pathLengthLabel,p=this._pathLabelSegments[e.pathLengthLabelSegmentIndex],d=this._cursorSegmentLengthLabelSegment,h=u.positionLabelOnCorner(l,p,d,r,i);l.text=n.pathLengthLabel,l.visible=h&&s&&n.path.length>0;var l=this._cursorSegmentLengthLabel,c=this._cursorSegmentLengthLabelSegment,h=u.positionLabelOnSegment(l,c,r,"bottom",i);l.text=n.cursorSegmentLengthLabel,l.visible=h&&s&&n.cursorSegmentLength&&0!==n.cursorSegmentLength.value,o(this._cursorSegmentLengthLabel,this._pathLengthLabel)&&(this._cursorSegmentLengthLabel.visible=!1),o(this._pathLengthLabel,this._areaLabel)&&(this._pathLengthLabel.visible=!1);var l=this._perimeterLengthLabel;if(n.validMeasurement&&0===e.intersectingSegments.size)for(var _=0;_<e.path.length;++_){var m=(e.perimeterLengthLabelSegmentIndex+_)%e.path.length,c=a?this._pathLabelSegments[m]:this._perimeterLabelSegments[m],h=u.positionLabelOnSegment(l,c,r,"top",i);if(l.text=n.perimeterLengthLabel,l.visible=h,!o(l,this._areaLabel))break;l.visible=!1}else l.visible=!1},e.prototype._getFocusPoint=function(){var e=this._model,t=this._model.lastDraggedVertex;switch(e.state){case"drawing":return e.cursorPoint?e.cursorPoint:e.path.vertex(a.isSome(t)?t:e.path.length-1);case"editing":return a.isSome(t)?e.path.vertex(t):null;default:return e.cursorPoint}},e.prototype._updateLaserLine=function(){var e=this._model,t=this._params.laserLineEnabled&&"measured"!==e.state&&e.active;this._laserLineRenderer.focusSphereActive=!1,this._laserLineRenderer.segmentActive=!1;var i=this._getFocusPoint();if(t&&i){var r=this._tempHandlePosition;this._sceneView.renderCoordsHelper.toRenderCoords(i,r),this._laserLineRenderer.focusPosition=r,this._laserLineRenderer.focusPlaneActive=!0}else this._laserLineRenderer.focusPlaneActive=!1},e.prototype._addObject3D=function(e){e.parentLayer||(this._layer.addObject(e),this._sceneView._stage.add(1,e))},e.prototype._removeObject3D=function(e){e.parentLayer&&(this._layer.removeObject(e),this._sceneView._stage.remove(1,e.id))},e.prototype._resizeObject3DArray=function(e,t){var i=this;g.resizeArray(e,t,function(){return new P},function(e){i._removeObject3D(e)})},e.prototype._resizeManipulatorArray=function(e,t){var i=this;g.resizeArray(e,t,function(){var e=C.createSphereManipulator(i._sceneView,i._params.handleColor,i._params.handleOpacity);return e.hideOnGrab=!0,e.radius=i._params.handleRadius,{id:i._manipulators.add(e),manipulator:e}},function(e){var t=e.manipulator;i._manipulators.remove(t)})},e.prototype._createInterpolatedLineGeometry=function(e,t,i,r,n,a,s,o,l,p){var d=this._sceneView.renderCoordsHelper,c=[],_=[],u=function(e,t){var i=v.sv3d.get();h.vec3.subtract(i,e,a),c.push(i),_.push(t)};if("euclidean"===o){var m=v.sv3d.get();g.midpoint([r,n],m);var L=v.sv3d.get();d.worldUpAtPosition(m,L),u(r,L),u(n,L),l&&l.update(r,n,p)}else{var f=this._getSegmentInterpolator(r,n),y=this._params.lineSubdivisions+1&-2,S=null,P=null,M=y/2-1,j=y/2;"start"===p?(M=0,j=1):"end"===p&&(M=y-2,j=y-1);for(var O=0;O<y;++O){var C=O/(y-1),V=v.sv3d.get(),L=v.sv3d.get();f.eval(C,V),d.worldUpAtPosition(V,L),O===M&&(S=V),O===j&&(P=V),u(V,L)}l&&l.update(S,P,p)}var R=new b(w.createPolylineGeometry(c,_),i);e.removeAllGeometries(),e.addGeometry(R,t,s)},e.prototype._getSegmentInterpolator=function(e,t){var i=this._sceneView.spatialReference;if(L.canProject(i,L.SphericalECEFSpatialReference)){var r=this._sceneView.renderCoordsHelper.spatialReference;return new m.Spherical(e,t,r,r)}return new m.Linear(e,t)},e.prototype._initializeListeners=function(){var e=this;this._listenerHandles=new n,this._listenerHandles.add([this._model.watch(["state","lastDraggedVertex"],function(){return e._updateLaserLine()}),this._model.watch("cursorPoint",function(){return e._updateAfterSyncViewData(function(t){e._updateCursorSegment(t),e._updateCursorHandle(),"drawing"===e._model.state&&e._updateLabels(t),e._updateLaserLine()})}),this._sceneView.state.watch("camera",function(){return e._updateAfterSyncViewData(function(t){return e._updateCameraDependent(e._model.viewData)})}),this._model.watch(["unit","measurementMode"],function(){return e._updateAll(e._model.viewData)}),this._model.watch(["active"],function(){e._updateLaserLine(),e._syncViewData(e._model.viewData)}),this._model.watch("viewData",function(t){return e._syncViewData(t)})])},e.prototype._destroyListeners=function(){this._listenerHandles.destroy(),this._listenerHandles=null},e._handleGeometry=new b(w.createSphereGeometry(1,32,32),"handle"),e}();return function(e){var t=function(){function e(){}return e}();e.PickRequest=t;var i=function(){function e(e,t,i){void 0===e&&(e=null),void 0===t&&(t=null),void 0===i&&(i=null),this.type=e,this.scenePoint=t,this.mapPoint=i}return e}();e.PickResult=i}(R||(R={})),R});