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

define(["../../request","../../core/lang","../../core/promiseUtils","../../geometry/Polygon","../../geometry/Multipoint","./WMBaseTask","./support/Enum","./support/JSONUtil","./support/Util"],function(e,t,r,n,s,a,o,i,d){var u=new o,l=new i,p=new d;return a.createSubclass({declaredClass:"esri.tasks.workflow.JobTask",properties:{url:{}},getJobIds:function(r){var n=this.parsedUrl.path+"/jobs",s=this._encode(t.mixin({},this.parsedUrl.query,{f:"json"})),a=this._generateOptions(s,r);return e(n,a).then(function(e){return e.data.jobIds})},getJob:function(r,a){var o=this.parsedUrl.path+"/jobs/"+r,i=this._encode(t.mixin({},this.parsedUrl.query,{f:"json"})),d=this._generateOptions(i,a);return e(o,d).then(function(e){var t=e.data;return t&&0==Object.keys(t).length?null:(t.assignedType=u.jobAssignmentTypeJsonDict.fromJSON(t.assignedType),t.stage=u.jobStageJsonDict.fromJSON(t.stage),t.relationshipType&&(t.relationshipType=u.tableRelationshipTypeJsonDict.fromJSON(t.relationshipType)),null!=t.createdDate&&(t.createdDate=new Date(t.createdDate)),null!=t.startDate&&(t.startDate=new Date(t.startDate)),null!=t.startedDate&&(t.startedDate=new Date(t.startedDate)),null!=t.dueDate&&(t.dueDate=new Date(t.dueDate)),null!=t.endDate&&(t.endDate=new Date(t.endDate)),t.aoi||t.poi?t.loi=t.aoi?new n(t.aoi):new s(t.poi):t.loi=null,delete t.aoi,delete t.poi,t)})},searchJobs:function(e,t){var r={text:e.text,user:p._formatDomainUsername(e.user)};return this._sendRequest(r,"/jobs/search",t)},queryJobs:function(e,t){var r={id:e.queryId,user:p._formatDomainUsername(e.user)};return this._sendRequest(r,"/jobs/query",t)},queryJobsAdHoc:function(e,t){var r=l._jobQueryParametersToJSON(e);return r.user=e.user,this._sendRequest(r,"/jobs/query",t)},createJobs:function(r,n){var s=this.parsedUrl.path+"/jobs/create",a=l._jobCreationParametersToJSON(r);a.user=r.user;var o=this._encode(t.mixin({},this.parsedUrl.query,a)),i=this._generateOptions(o,n);return e(s,i).then(function(e){return e.data.jobIds})},assignJobs:function(e,t){var r={jobs:p._convertIdsToString(e.jobIds),assignedType:u.jobAssignmentTypeJsonDict.toJSON(e.assignedType),assignedTo:p._formatDomainUsername(e.assignedTo),user:p._formatDomainUsername(e.user)};return this._sendRequest(r,"/jobs/assign",t)},unassignJobs:function(e,t){var r={jobs:p._convertIdsToString(e.jobIds),user:p._formatDomainUsername(e.user)};return this._sendRequest(r,"/jobs/unassign",t)},closeJobs:function(e,t){var r={jobs:p._convertIdsToString(e.jobIds),user:p._formatDomainUsername(e.user)};return this._sendRequest(r,"/jobs/close",t)},reopenClosedJobs:function(e,t){var r={jobs:p._convertIdsToString(e.jobIds),user:p._formatDomainUsername(e.user)};return this._sendRequest(r,"/jobs/reopen",t)},deleteJobs:function(e,t){e.deleteHistory=!!e.deleteHistory&&e.deleteHistory;var r={jobs:p._convertIdsToString(e.jobIds),deleteHistory:e.deleteHistory,user:p._formatDomainUsername(e.user)};return this._sendRequest(r,"/jobs/delete",t)},updateJob:function(e,t){var r=l._jobUpdateParametersToJSON(e);return r.user=p._formatDomainUsername(e.user),this._sendRequest(r,"/jobs/"+e.jobId+"/update",t)},createJobVersion:function(r,n){var s=this.parsedUrl.path+"/jobs/"+r.jobId+"/createVersion",a={name:r.name,parent:r.parent,user:p._formatDomainUsername(r.user),f:"json"},o=this._encode(t.mixin({},this.parsedUrl.query,a)),i=this._generateOptions(o,n);return e(s,i).then(function(e){return e.data.versionName})},getNotes:function(r,n){var s=this.parsedUrl.path+"/jobs/"+r+"/notes",a=this._encode(t.mixin({},this.parsedUrl.query,{f:"json"})),o=this._generateOptions(a,n);return e(s,o).then(function(e){return e.data.notes})},updateNotes:function(e,t){var r={notes:e.notes,user:p._formatDomainUsername(e.user)};return this._sendRequest(r,"/jobs/"+e.jobId+"/notes/update",t)},getAttachments:function(r,n){var s=this.parsedUrl.path+"/jobs/"+r+"/attachments",a=this._encode(t.mixin({},this.parsedUrl.query,{f:"json"})),o=this._generateOptions(a,n);return e(s,o).then(function(e){for(var t=e.data.attachments,r=0;r<t.length;r++)t[r].storageType=u.jobAttachmentTypeJsonDict.fromJSON(t[r].storageType);return t})},addLinkedAttachment:function(r,n){var s=this.parsedUrl.path+"/jobs/"+r.jobId+"/attachments/add",a={storageType:u.jobAttachmentTypeJsonDict.toJSON(r.attachmentType),filePath:r.path,user:p._formatDomainUsername(r.user),f:"json"},o=this._encode(t.mixin({},this.parsedUrl.query,a)),i=this._generateOptions(o,n);return e(s,i).then(function(e){return e.data.attachmentId})},addEmbeddedAttachment:function(r,n){var s=this.parsedUrl.path+"/jobs/"+r.jobId+"/attachments/add",a={storageType:2,form:r.form,user:p._formatDomainUsername(r.user),f:"json"},o=this._encode(t.mixin({},this.parsedUrl.query,a)),i=this._generateOptions(o,n);return e(s,i).then(function(e){return e.data})},deleteAttachment:function(e,t){var r={user:p._formatDomainUsername(e.user)};return this._sendRequest(r,"/jobs/"+e.jobId+"/attachments/"+e.attachmentId+"/delete",t)},getAttachmentContentUrl:function(e){var t=this.parsedUrl.path+"/jobs/"+e.jobId+"/attachments/"+e.attachmentId+"/content?f=file";if(t+="&_ts="+Date.now(),this.requestOptions&&this.requestOptions.query){var r=this.requestOptions.query,n=Object.keys(r).map(function(e){return e+"="+r[e]}).join("&");n&&(t+="&"+n)}return t},getHolds:function(r,n){var s=this.parsedUrl.path+"/jobs/"+r+"/holds",a=this._encode(t.mixin({},this.parsedUrl.query,{f:"json"})),o=this._generateOptions(a,n);return e(s,o).then(function(e){for(var t=e.data.holds,r=0;r<t.length;r++)t[r].holdDate=p._convertToDate(t[r].holdDate),t[r].releaseDate=p._convertToDate(t[r].releaseDate);return t})},createHold:function(r,n){var s=this.parsedUrl.path+"/jobs/"+r.jobId+"/holds/create",a={type:r.holdTypeId,user:p._formatDomainUsername(r.user),f:"json"};r.comments&&(a.comments=r.comments);var o=this._encode(t.mixin({},this.parsedUrl.query,a)),i=this._generateOptions(o,n);return e(s,i).then(function(e){return e.data.holdId})},releaseHold:function(e,t){var r={user:p._formatDomainUsername(e.user)};return e.comments&&(r.comments=e.comments),this._sendRequest(r,"/jobs/"+e.jobId+"/holds/"+e.holdId+"/release",t)},getDependencies:function(r,n){var s=this.parsedUrl.path+"/jobs/"+r+"/dependencies",a=this._encode(t.mixin({},this.parsedUrl.query,{f:"json"})),o=this._generateOptions(a,n);return e(s,o).then(function(e){for(var t=e.data.dependencies,r=0;r<t.length;r++)t[r].heldOnType=u.jobDependencyTypeJsonDict.fromJSON(t[r].heldOnType),t[r].depOnType=u.jobDependencyTypeJsonDict.fromJSON(t[r].depOnType);return t})},createDependency:function(r,n){var s=this.parsedUrl.path+"/jobs/"+r.jobId+"/dependencies/create",a=l._jobDependencyParametersToJSON(r);a.user=r.user;var o=this._encode(t.mixin({},this.parsedUrl.query,a)),i=this._generateOptions(o,n);return e(s,i).then(function(e){return e.data.dependencyId})},deleteDependency:function(e,t){var r={user:p._formatDomainUsername(e.user)};return this._sendRequest(r,"/jobs/"+e.jobId+"/dependencies/"+e.dependencyId+"/delete",t)},getActivityLog:function(r,n){var s=this.parsedUrl.path+"/jobs/"+r+"/activity",a=this._encode(t.mixin({},this.parsedUrl.query,{f:"json"})),o=this._generateOptions(a,n);return e(s,o).then(function(e){for(var t=e.data.activity,r=0;r<t.length;r++)t[r].date=p._convertToDate(t[r].date);return t})},logAction:function(e,t){var r={type:e.activityTypeId,user:p._formatDomainUsername(e.user)};return e.comments&&(r.comments=e.comments),this._sendRequest(r,"/jobs/"+e.jobId+"/activity/logAction",t)},getExtendedProperties:function(r,n){var s=this.parsedUrl.path+"/jobs/"+r+"/extendedProperties",a=this._encode(t.mixin({},this.parsedUrl.query,{f:"json"})),o=this._generateOptions(a,n);return e(s,o).then(function(e){for(var t=e.data.containers,r=0;r<t.length;r++){var n=t[r];n.relationshipType=u.tableRelationshipTypeJsonDict.fromJSON(n.relationshipType);for(var s=n.records,a=0;a<s.length;a++)for(var o=s[a].recordValues,i=0;i<o.length;i++)o[i].dataType=u.fieldTypeJsonDict.fromJSON(o[i].dataType),o[i].displayType=u.extendedPropertyDisplayTypeJsonDict.fromJSON(o[i].displayType)}return t})},addLinkedRecord:function(r,n){var s=this.parsedUrl.path+"/jobs/"+r.jobId+"/extendedProperties"+r.tableName+"/add",a={user:p._formatDomainUsername(r.user),f:"json"},o=this._encode(t.mixin({},this.parsedUrl.query,a)),i=this._generateOptions(o,n);return e(s,i).then(function(e){return e.data.recordId})},deleteLinkedRecord:function(e,t){var r={user:p._formatDomainUsername(e.user)};return this._sendRequest(r,"/jobs/"+e.jobId+"/extendedProperties/"+e.tableName+"/"+e.recordId+"/delete",t)},updateRecord:function(e,t){var r=e.record,n={properties:r.properties,user:p._formatDomainUsername(e.user)};return this._sendRequest(n,"/jobs/"+e.jobId+"/extendedProperties/"+r.tableName+"/"+r.recordId+"/update",t)},listFieldValues:function(r,n){var s=this.parsedUrl.path+"/jobs/"+r.jobId+"/extendedProperties/"+r.tableName+"/listValues",a={field:r.field,user:p._formatDomainUsername(r.user),f:"json"},o=this._encode(t.mixin({},this.parsedUrl.query,a)),i=this._generateOptions(o,n);return e(s,i).then(function(e){return e.data.values})},listMultiLevelFieldValues:function(n,s){var a=!1,o=n.field,i=n.previousSelectedValues;if(null!=o&&"multi-level-table-list"==o.displayType){var d=o.tableListDisplayField.split(","),u=d.length,l=i?i.length:0;if(l>=u)return r.resolve([]);a=l==u-1;var h=d[l];a&&(h+=","+o.tableListStoreField);for(var c="",m=0;m<l;m++){var f=i[m];null==f||0==f.length?c+="("+d[m]+" IS NULL OR "+d[m]+" = '') AND ":c+="("+d[m]+" = '"+f+"') AND "}c.length>0&&(c=c.substring(0,c.length-" AND ".length));var b=this.parsedUrl.path+"/jobs/query",y={tables:o.tableListClass,fields:h,where:c,user:p._formatDomainUsername(n.user),f:"json"},j=this._encode(t.mixin({},this.parsedUrl.query,y)),_=this._generateOptions(j,s);return e(b,_).then(function(e){for(var t,r,n=e.data,s={},o=[],i=0;i<n.rows.length;i++)if(r=n.rows[i],a)t={},t.description=r[0],t.value=r[1],o.push(t);else{var d=r[0];null==s[d]&&(t={},t.description=d,t.value=d,o.push(t),s[d]=t)}return o.sort(function(e,t){var r=e.description,n=t.description;return null==r?null==n?0:1:null==n?-1:(r=r.toLowerCase(),n=n.toLowerCase(),r.localeCompare(n))}),o})}return r.resolve([])},queryMultiLevelSelectedValues:function(n,s){var a=n.field;if(null!=a.data&&"multi-level-table-list"==a.displayType){var o="string"==a.dataType||"global-id"==a.dataType||"guid"==a.dataType,i=o?"'":"",d=this.parsedUrl.path+"/jobs/query",u={tables:a.tableListClass,fields:a.tableListDisplayField,where:a.tableListStoreField+" = "+i+a.data+i,user:p._formatDomainUsername(n.user),f:"json"},l=this._encode(t.mixin({},this.parsedUrl.query,u)),h=this._generateOptions(l,s);return e(d,h).then(function(e){var t=e.data,r=[];return t&&t.rows&&t.rows.length>0&&(r=t.rows[0]),r})}return r.resolve([])}})});