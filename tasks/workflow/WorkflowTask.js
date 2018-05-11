// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["dojo/_base/lang","../../request","../../Color","./WMBaseTask","./support/Enum","./support/Util"],function(e,t,s,o,r,n){var i=new r,p=new n;return o.createSubclass({declaredClass:"esri.tasks.workflow.WorkflowTask",properties:{url:{}},getWorkflowImageUrl:function(e){var t=(new Date).getTime(),s=this.parsedUrl.path+"/jobs/"+e+"/workflow?f=image&ts="+t;if(this.requestOptions&&this.requestOptions.query){var o=this.requestOptions.query,r=Object.keys(o).map(function(e){return e+"="+o[e]}).join("&");r&&(s+="&"+r)}return s},getWorkflowDisplayDetails:function(o,r){var n=this.parsedUrl.path+"/jobs/"+o+"/workflow",p=this._encode(e.mixin({},this.parsedUrl.query,{f:"json"})),a=this._generateOptions(p,r);return t(n,a).then(function(e){for(var t=e.data.workflow,o=0;o<t.paths.length;o++)t.paths[o].labelColor=s.fromJSON(t.paths[o].labelColor),t.paths[o].lineColor=s.fromJSON(t.paths[o].lineColor);for(var o=0;o<t.steps.length;o++)t.steps[o].stepType=i.stepExecutionTypeJsonDict.fromJSON(t.steps[o].stepType),t.steps[o].shape=i.stepIndicatorTypeJsonDict.fromJSON(t.steps[o].shape),t.steps[o].fillColor=s.fromJSON(t.steps[o].fillColor),t.steps[o].labelColor=s.fromJSON(t.steps[o].labelColor),t.steps[o].outlineColor=s.fromJSON(t.steps[o].outlineColor);for(var o=0;o<t.annotations.length;o++)t.annotations[o].fillColor=s.fromJSON(t.annotations[o].fillColor),t.annotations[o].outlineColor=s.fromJSON(t.annotations[o].outlineColor),t.annotations[o].labelColor=s.fromJSON(t.annotations[o].labelColor);return t})},getAllSteps:function(s,o){var r=e.hitch(this),n=this.parsedUrl.path+"/jobs/"+s+"/workflow/steps",i=this._encode(e.mixin({},this.parsedUrl.query,{f:"json"})),p=this._generateOptions(i,o);return t(n,p).then(function(e){return r._formatStepsResponse(e.data.steps)})},getCurrentSteps:function(s,o){var r=e.hitch(this),n=this.parsedUrl.path+"/jobs/"+s+"/workflow/steps/current",i=this._encode(e.mixin({},this.parsedUrl.query,{f:"json"})),p=this._generateOptions(i,o);return t(n,p).then(function(e){return r._formatStepsResponse(e.data.steps)})},getStep:function(s,o){var r=e.hitch(this),n=this.parsedUrl.path+"/jobs/"+s.jobId+"/workflow/steps/"+s.stepId,i=this._encode(e.mixin({},this.parsedUrl.query,{f:"json"})),p=this._generateOptions(i,o);return t(n,p).then(function(e){return r._formatStepsResponse([e.data])[0]})},getStepDescription:function(s,o){var r=this.parsedUrl.path+"/jobs/"+s.jobId+"/workflow/steps/"+s.stepId+"/description",n=this._encode(e.mixin({},this.parsedUrl.query,{f:"json"})),i=this._generateOptions(n,o);return t(r,i).then(function(e){return e.data.stepDescription})},getStepFileUrl:function(e){var t=this.parsedUrl.path+"/jobs/"+e.jobId+"/workflow/steps/"+e.stepId+"/file";if(this.requestOptions&&this.requestOptions.query){var s=this.requestOptions.query,o=Object.keys(s).map(function(e){return e+"="+s[e]}).join("&");o&&(t+="?"+o)}return t},canRunStep:function(s,o){var r=this.parsedUrl.path+"/jobs/"+s.jobId+"/workflow/steps/"+s.stepId+"/canRun",n={user:p._formatDomainUsername(s.user),f:"json"},a=this._encode(e.mixin({},this.parsedUrl.query,n)),u=this._generateOptions(a,o);return t(r,u).then(function(e){return i.stepRunnableStatusJsonDict.fromJSON(e.data.canRun)})},executeSteps:function(s,o){var r=this.parsedUrl.path+"/jobs/"+s.jobId+"/workflow/steps/execute",n={steps:p._convertIdsToString(s.stepIds),user:p._formatDomainUsername(s.user),f:"json"};s.auto&&(n.auto=s.true);var a=this._encode(e.mixin({},this.parsedUrl.query,n)),u=this._generateOptions(a,o);return t(r,u).then(function(e){for(var t=e.data.executeInfo,s=0;s<t.length;s++)t[s].executionResult=i.stepExecutionResultJsonDict.fromJSON(t[s].executionResult);return t})},markStepsAsDone:function(s,o){var r=this.parsedUrl.path+"/jobs/"+s.jobId+"/workflow/steps/markAsDone",n={steps:p._convertIdsToString(s.stepIds),user:p._formatDomainUsername(s.user),f:"json"},a=this._encode(e.mixin({},this.parsedUrl.query,n)),u=this._generateOptions(a,o);return t(r,u).then(function(e){for(var t=e.data.executeInfo,s=0;s<t.length;s++)t[s].executionResult=i.stepExecutionResultJsonDict.fromJSON(t[s].executionResult);return t})},moveToNextStep:function(e,t){var s={user:p._formatDomainUsername(e.user)};return e.returnCode&&(s.returnCode=e.returnCode),this._sendRequest(s,"/jobs/"+e.jobId+"/workflow/steps/"+e.stepId+"/moveNext",t)},resolveConflict:function(e,t){var s={optionReturnCode:e.optionReturnCode,optionSteps:e.optionStepIds.toString(),user:p._formatDomainUsername(e.user)};return this._sendRequest(s,"/jobs/"+e.jobId+"/workflow/steps/"+e.stepId+"/resolveConflict",t)},setCurrentStep:function(e,t){var s={user:p._formatDomainUsername(e.user)};return this._sendRequest(s,"/jobs/"+e.jobId+"/workflow/steps/"+e.stepId+"/setAsCurrent",t)},recreateWorkflow:function(e,t){var s={user:p._formatDomainUsername(e.user)};return this._sendRequest(s,"/jobs/"+e.jobId+"/workflow/recreate",t)},_formatStepsResponse:function(e){for(var t=0;t<e.length;t++)e[t].assignedType=i.jobAssignmentTypeJsonDict.fromJSON(e[t].assignedType),e[t].stepType.executionType=i.stepExecutionTypeJsonDict.fromJSON(e[t].stepType.executionType),e[t].stepType.stepDescriptionType=i.stepDescriptionTypeJsonDict.fromJSON(e[t].stepType.stepDescriptionType),e[t].stepType.stepIndicatorType=i.stepIndicatorTypeJsonDict.fromJSON(e[t].stepType.stepIndicatorType),e[t].stepType.supportedPlatform=i.stepPlatformTypeJsonDict.fromJSON(e[t].stepType.supportedPlatform);return e}})});