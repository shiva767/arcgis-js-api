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

define(["require","exports","./flatspec/spec","./flatspec/api","./flatspec/utils"],function(e,r,i,o,s){Object.defineProperty(r,"__esModule",{value:!0}),r.scanSpec=i.scan,r.scanAPI=o.scan,r.flatten=s.flatten,r.collectClassPaths=s.collectClassPaths,r.schemaToClassModule={applicationProperties:"esri/webscene/ApplicationProperties",authoringInfo_visualVariable:"esri/renderers/support/AuthoringInfoVisualVariable",authoringInfo:"esri/renderers/support/AuthoringInfo",baseMap:"esri/Basemap",border:"esri/symbols/callouts/LineCallout3DBorder",buildingSceneLayer_filter:"esri/layers/support/BuildingFilter",buildingSceneLayer_filterAuthoringInfo_filterBlock:"esri/layers/support/BuildingFilterAuthoringInfoBlock",buildingSceneLayer_filterAuthoringInfo_filterType:"esri/layers/support/BuildingFilterAuthoringInfoType",buildingSceneLayer_filterAuthoringInfoCheckbox:"esri/layers/support/BuildingFilterAuthoringInfoCheckbox",buildingSceneLayer_filterBlock:"esri/layers/support/BuildingFilterBlock",buildingSceneLayer_filterMode:"esri/layers/support/BuildingFilterMode",buildingSceneLayer_filterModeSolid:"esri/layers/support/BuildingFilterModeSolid",buildingSceneLayer_filterModeWireFrame:"esri/layers/support/BuildingFilterModeWireFrame",buildingSceneLayer:"esri/layers/BuildingSceneLayer",callout:"esri/symbols/callouts/LineCallout3D",camera:"esri/Camera",classBreakInfo:"esri/renderers/support/ClassBreakInfo",classBreaksRenderer:"esri/renderers/ClassBreaksRenderer",colorClassBreakInfo:"esri/renderers/support/pointCloud/ColorClassBreakInfo",colorInfo_visualVariable:"esri/renderers/visualVariables/ColorVariable",colorModulationInfo:"esri/renderers/support/pointCloud/ColorModulation",colorRamp_algorithmic:"esri/tasks/support/AlgorithmicColorRamp",colorRamp_multipart:"esri/tasks/support/MultipartColorRamp",colorStop:"esri/renderers/visualVariables/support/ColorStop",colorUniqueValueInfo:"esri/renderers/support/pointCloud/ColorUniqueValueInfo",csvLayer:"esri/layers/CSVLayer",description:"esri/webscene/support/Description",elevationInfo:"esri/symbols/support/ElevationInfo",elevationLayer:"esri/layers/ElevationLayer",environment_background_color:"esri/webscene/background/ColorBackground",environment:"esri/webscene/Environment",extent:"esri/geometry/Extent",extrudeSymbol3DLayer:"esri/symbols/ExtrudeSymbol3DLayer",featureExpressionInfo:"esri/symbols/support/FeatureExpressionInfo",featureLayer:"esri/layers/FeatureLayer",featureReduction_select:"esri/layers/support/FeatureReductionSelection",field:"esri/layers/support/Field",fieldInfo:"esri/popup/FieldInfo",fillSymbol3DLayer:"esri/symbols/FillSymbol3DLayer",font:"esri/symbols/Font",format:"esri/popup/support/FieldInfoFormat",ground:"esri/Ground",groupLayer:"esri/layers/GroupLayer",halo:"esri/symbols/support/Symbol3DHalo",heightModelInfo:"esri/geometry/HeightModelInfo",iconSymbol3DLayer_resource:"esri/symbols/support/IconSymbol3DLayerResource",iconSymbol3DLayer:"esri/symbols/IconSymbol3DLayer",imageServiceLayer:"esri/layers/ImageryLayer",integratedMeshLayer:"esri/layers/IntegratedMeshLayer",labelExpressionInfo:"esri/layers/support/LabelExpressionInfo",labelingInfo:"esri/layers/support/LabelClass",labelSymbol3D:"esri/symbols/LabelSymbol3D",layer:"esri/layers/support/Sublayer",lighting:"esri/webscene/Lighting",lineSymbol3D:"esri/symbols/LineSymbol3D",lineSymbol3DLayer:"esri/symbols/LineSymbol3DLayer",lod:"esri/layers/support/LOD",mapServiceLayer:"esri/layers/MapImageLayer",material:"esri/symbols/support/Symbol3DMaterial",materialColorMixMode:"esri/symbols/support/Symbol3DFillMaterial",mediaInfo_image:"esri/popup/content/ImageMediaInfo",meshSymbol3D:"esri/symbols/MeshSymbol3D",mosaicRule:"esri/layers/support/MosaicRule",multidimensionalDefinition:"esri/layers/support/DimensionalDefinition",multipoint_geometry:"esri/geometry/Multipoint",objectSymbol3DLayer_resource:"esri/symbols/support/ObjectSymbol3DLayerResource",objectSymbol3DLayer:"esri/symbols/ObjectSymbol3DLayer",openStreetMapLayer:"esri/layers/OpenStreetMapLayer",orderByFields:"esri/popup/support/RelatedRecordsInfoFieldOrder",outline:"esri/symbols/support/Symbol3DOutline",pathSymbol3DLayer:"esri/symbols/PathSymbol3DLayer",point_geometry:"esri/geometry/Point",pointCloudBitfieldFilter:"esri/layers/pointCloudFilters/PointCloudBitfieldFilter",pointCloudClassBreaksRenderer:"esri/renderers/PointCloudClassBreaksRenderer",pointCloudFixedSizeAlgorithm:"esri/renderers/support/pointCloud/PointSizeFixedSizeAlgorithm",pointCloudLayer:"esri/layers/PointCloudLayer",pointCloudReturnFilter:"esri/layers/pointCloudFilters/PointCloudReturnFilter",pointCloudRGBRenderer:"esri/renderers/PointCloudRGBRenderer",pointCloudSplatAlgorithm:"esri/renderers/support/pointCloud/PointSizeSplatAlgorithm",pointCloudStretchRenderer:"esri/renderers/PointCloudStretchRenderer",pointCloudUniqueValueRenderer:"esri/renderers/PointCloudUniqueValueRenderer",pointCloudValueFilter:"esri/layers/pointCloudFilters/PointCloudValueFilter",pointSymbol3D:"esri/symbols/PointSymbol3D",polygon_geometry:"esri/geometry/Polygon",polygonSymbol3D:"esri/symbols/PolygonSymbol3D",polyline_geometry:"esri/geometry/Polyline",popupElement_attachments:"esri/popup/content/AttachmentsContent",popupElement_fields:"esri/popup/content/FieldsContent",popupElement_media:"esri/popup/content/MediaContent",popupElement_text:"esri/popup/content/TextContent",popupExpressionInfo:"esri/popup/ExpressionInfo",popupInfo:"esri/PopupTemplate",popupLayerOptions:"esri/popup/LayerOptions",presentation:"esri/webscene/Presentation",rangeInfo:"esri/layers/support/RangeInfo",relatedRecordsInfo:"esri/popup/RelatedRecordsInfo",rendererLegendOptions:"esri/renderers/support/LegendOptions",renderingRule:"esri/layers/support/RasterFunction",rotationInfo_visualVariable:"esri/renderers/visualVariables/RotationVariable",sceneLayer:"esri/layers/SceneLayer",search_layer:"esri/webdoc/applicationProperties/SearchLayer",search:"esri/webdoc/applicationProperties/Search",simpleRenderer:"esri/renderers/SimpleRenderer",sizeInfo_visualVariable:"esri/renderers/visualVariables/SizeVariable",sizeStop:"esri/renderers/visualVariables/support/SizeStop",sketchEdges:"esri/symbols/edges/SketchEdges3D",slide_ground:"esri/webscene/support/SlideGround",slide:"esri/webscene/Slide",solidEdges:"esri/symbols/edges/SolidEdges3D",spatialReference:"esri/geometry/SpatialReference",styleSymbolReference:"esri/symbols/WebStyleSymbol",textSymbol3DLayer:"esri/symbols/TextSymbol3DLayer",thumbnail:"esri/webdoc/support/Thumbnail",tiledImageServiceLayer:"esri/layers/TileLayer",tiledMapServiceLayer:"esri/layers/TileLayer",tileInfo:"esri/layers/support/TileInfo",title:"esri/webscene/support/Title",transparencyInfo_visualVariable:"esri/renderers/visualVariables/OpacityVariable",transparencyStop:"esri/renderers/visualVariables/support/OpacityStop",uniqueValueInfo:"esri/renderers/support/UniqueValueInfo",uniqueValueRenderer:"esri/renderers/UniqueValueRenderer",vectorTileLayer:"esri/layers/VectorTileLayer",verticalOffset:"esri/symbols/support/Symbol3DVerticalOffset",viewing:"esri/webdoc/applicationProperties/Viewing",viewpoint:"esri/Viewpoint",visibleLayer:"esri/webscene/support/SlideVisibleLayer",waterSymbol3DLayer:"esri/symbols/WaterSymbol3DLayer",webScene:"esri/WebScene",webTiledLayer:"esri/layers/WebTileLayer",wmsLayer_layer:"esri/layers/support/WMSSublayer",wmsLayer:"esri/layers/WMSLayer"},r.ignoredSchemaDefinitions=["baseMapLayer","buildingSceneLayer_sublayer","classBreakInfo_authoringInfo","clippingArea","codedValue_domain","codedValue","color","colorRamp","dataSource","definitionEditor","domain","drawingInfo","dynamicDataLayer_source","dynamicMapLayer_source","edges","feature","featureSet","field_authoringInfo","fieldInfo","format","geometry","inherited_domain","initialState","input","joinTableDataSource","kmlLayer","layerDefinition","locationInfo","mapRangeInfo","mediaInfo_chart_value","mediaInfo_chart","mediaInfo_image_value","mediaInfo","multidimensionalDefinition","navigationConstraint","operationalLayers","orderByFields","parameter","pointCloudFilter","pointCloudRenderers","pointSizeAlgorithm","popupElement","popupExpressionInfo","queryTableDataSource","range_domain","range","rasterClassBreaksRenderer","rasterDataLayer","rasterDataSource","rasterRenderers","rasterStretchRenderer","rasterUniqueValueRenderer","relatedRecordsInfo","renderer","source","styleOrigin","symbol3D","table","tableDataSource","template","type","uniqueValueFromStyleRenderer","value","version","visibleLayer","visualVariable","visualVariableLegendOptions","widgets","wmtsInfo"]});