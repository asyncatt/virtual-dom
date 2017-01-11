/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "e175088aeaecde0453ec"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _element = __webpack_require__(1);

	var _element2 = _interopRequireDefault(_element);

	var _diff = __webpack_require__(3);

	var _diff2 = _interopRequireDefault(_diff);

	var _patch = __webpack_require__(4);

	var _patch2 = _interopRequireDefault(_patch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 1. 构建虚拟DOM
	var tree = (0, _element2.default)('div', { 'id': 'container' }, [(0, _element2.default)('h1', { style: 'color: blue' }, ['simple virtal dom']), (0, _element2.default)('p', ['Hello, virtual-dom']), (0, _element2.default)('ul', [(0, _element2.default)('li', {}, ['one'])])]);

	// 2. 通过虚拟DOM构建真正的DOM
	var root = tree.render();
	document.body.appendChild(root);

	// 3. 生成新的虚拟DOM
	var newTree = (0, _element2.default)('div', { 'id': 'container' }, [(0, _element2.default)('h1', { style: 'color: red' }, ['simple virtal dom']), (0, _element2.default)('p', ['Hello, virtual-dom']), (0, _element2.default)('ul', [(0, _element2.default)('li', {}, ['one']), (0, _element2.default)('li', {}, ['two'])])]);

	setTimeout(function () {
	    // 4. 比较两棵虚拟DOM树的不同
	    var patches = (0, _diff2.default)(tree, newTree);

	    // 5. 在真正的DOM元素上应用变更
	    (0, _patch2.default)(root, patches);
	}, 5000);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(2);

	/**
	 * Virtual-dom Element.
	 * @param {String} tagName
	 * @param {Object} props - Element's properties,
	 *                       - using object to store key-value pair
	 * @param {Array<Element|String>} - This element's children elements.
	 *                                - Can be Element instance or just a piece plain text.
	 */
	function Element(tagName, props, children) {
	  if (!(this instanceof Element)) {
	    if (!_.isArray(children) && children != null) {
	      children = _.slice(arguments, 2).filter(_.truthy);
	    }
	    return new Element(tagName, props, children);
	  }

	  if (_.isArray(props)) {
	    children = props;
	    props = {};
	  }

	  this.tagName = tagName;
	  this.props = props || {};
	  this.children = children || [];
	  this.key = props ? props.key : void 666;

	  var count = 0;

	  _.each(this.children, function (child, i) {
	    if (child instanceof Element) {
	      count += child.count;
	    } else {
	      children[i] = '' + child;
	    }
	    count++;
	  });

	  this.count = count;
	}

	/**
	 * Render the hold element tree.
	 */
	Element.prototype.render = function () {
	  var el = document.createElement(this.tagName);
	  var props = this.props;

	  for (var propName in props) {
	    var propValue = props[propName];
	    _.setAttr(el, propName, propValue);
	  }

	  _.each(this.children, function (child) {
	    var childEl = child instanceof Element ? child.render() : document.createTextNode(child);
	    el.appendChild(childEl);
	  });

	  return el;
	};

	module.exports = Element;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _ = exports;

	_.type = function (obj) {
	  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
	};

	_.isArray = function isArray(list) {
	  return _.type(list) === 'Array';
	};

	_.slice = function slice(arrayLike, index) {
	  return Array.prototype.slice.call(arrayLike, index);
	};

	_.truthy = function truthy(value) {
	  return !!value;
	};

	_.isString = function isString(list) {
	  return _.type(list) === 'String';
	};

	_.each = function each(array, fn) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    fn(array[i], i);
	  }
	};

	_.toArray = function toArray(listLike) {
	  if (!listLike) {
	    return [];
	  }

	  var list = [];

	  for (var i = 0, len = listLike.length; i < len; i++) {
	    list.push(listLike[i]);
	  }

	  return list;
	};

	_.setAttr = function setAttr(node, key, value) {
	  switch (key) {
	    case 'style':
	      node.style.cssText = value;
	      break;
	    case 'value':
	      var tagName = node.tagName || '';
	      tagName = tagName.toLowerCase();
	      if (tagName === 'input' || tagName === 'textarea') {
	        node.value = value;
	      } else {
	        // if it is not a input or textarea, use `setAttribute` to set
	        node.setAttribute(key, value);
	      }
	      break;
	    default:
	      node.setAttribute(key, value);
	      break;
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(2);
	var patch = __webpack_require__(4);
	var listDiff = __webpack_require__(5);

	function diff(oldTree, newTree) {
	  var index = 0;
	  var patches = {};
	  dfsWalk(oldTree, newTree, index, patches);
	  return patches;
	}

	function dfsWalk(oldNode, newNode, index, patches) {
	  var currentPatch = [];

	  // Node is removed.
	  if (newNode === null) {
	    // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here
	    // TextNode content replacing
	  } else if (_.isString(oldNode) && _.isString(newNode)) {
	    if (newNode !== oldNode) {
	      currentPatch.push({ type: patch.TEXT, content: newNode });
	    }
	    // Nodes are the same, diff old node's props and children
	  } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
	    // Diff props
	    var propsPatches = diffProps(oldNode, newNode);
	    if (propsPatches) {
	      currentPatch.push({ type: patch.PROPS, props: propsPatches });
	    }
	    // Diff children. If the node has a `ignore` property, do not diff children
	    if (!isIgnoreChildren(newNode)) {
	      diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
	    }
	    // Nodes are not the same, replace the old node with new node
	  } else {
	    currentPatch.push({ type: patch.REPLACE, node: newNode });
	  }

	  if (currentPatch.length) {
	    patches[index] = currentPatch;
	  }
	}

	function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
	  var diffs = listDiff(oldChildren, newChildren, 'key');
	  newChildren = diffs.children;

	  if (diffs.moves.length) {
	    var reorderPatch = { type: patch.REORDER, moves: diffs.moves };
	    currentPatch.push(reorderPatch);
	  }

	  var leftNode = null;
	  var currentNodeIndex = index;
	  _.each(oldChildren, function (child, i) {
	    var newChild = newChildren[i];
	    currentNodeIndex = leftNode && leftNode.count ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
	    dfsWalk(child, newChild, currentNodeIndex, patches);
	    leftNode = child;
	  });
	}

	function diffProps(oldNode, newNode) {
	  var count = 0;
	  var oldProps = oldNode.props;
	  var newProps = newNode.props;

	  var key, value;
	  var propsPatches = {};

	  // Find out different properties
	  for (key in oldProps) {
	    value = oldProps[key];
	    if (newProps[key] !== value) {
	      count++;
	      propsPatches[key] = newProps[key];
	    }
	  }

	  // Find out new property
	  for (key in newProps) {
	    value = newProps[key];
	    if (!oldProps.hasOwnProperty(key)) {
	      count++;
	      propsPatches[key] = newProps[key];
	    }
	  }

	  // If properties all are identical
	  if (count === 0) {
	    return null;
	  }

	  return propsPatches;
	}

	function isIgnoreChildren(node) {
	  return node.props && node.props.hasOwnProperty('ignore');
	}

	module.exports = diff;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(2);

	var REPLACE = 0;
	var REORDER = 1;
	var PROPS = 2;
	var TEXT = 3;

	function patch(node, patches) {
	  var walker = { index: 0 };
	  dfsWalk(node, walker, patches);
	}
	//
	function dfsWalk(node, walker, patches) {
	  var currentPatches = patches[walker.index];

	  var len = node.childNodes ? node.childNodes.length : 0;
	  for (var i = 0; i < len; i++) {
	    var child = node.childNodes[i];
	    walker.index++;
	    dfsWalk(child, walker, patches);
	  }

	  if (currentPatches) {
	    applyPatches(node, currentPatches);
	  }
	}

	function applyPatches(node, currentPatches) {
	  _.each(currentPatches, function (currentPatch) {
	    switch (currentPatch.type) {
	      case REPLACE:
	        var newNode = typeof currentPatch.node === 'string' ? document.createTextNode(currentPatch.node) : currentPatch.node.render();
	        node.parentNode.replaceChild(newNode, node);
	        break;
	      case REORDER:
	        reorderChildren(node, currentPatch.moves);
	        break;
	      case PROPS:
	        setProps(node, currentPatch.props);
	        break;
	      case TEXT:
	        if (node.textContent) {
	          node.textContent = currentPatch.content;
	        } else {
	          // fuck ie
	          node.nodeValue = currentPatch.content;
	        }
	        break;
	      default:
	        throw new Error('Unknown patch type ' + currentPatch.type);
	    }
	  });
	}

	function setProps(node, props) {
	  for (var key in props) {
	    if (props[key] === void 666) {
	      node.removeAttribute(key);
	    } else {
	      var value = props[key];
	      _.setAttr(node, key, value);
	    }
	  }
	}

	function reorderChildren(node, moves) {
	  var staticNodeList = _.toArray(node.childNodes);
	  var maps = {};

	  _.each(staticNodeList, function (node) {
	    if (node.nodeType === 1) {
	      var key = node.getAttribute('key');
	      if (key) {
	        maps[key] = node;
	      }
	    }
	  });

	  _.each(moves, function (move) {
	    var index = move.index;
	    if (move.type === 0) {
	      // remove item
	      if (staticNodeList[index] === node.childNodes[index]) {
	        // maybe have been removed for inserting
	        node.removeChild(node.childNodes[index]);
	      }
	      staticNodeList.splice(index, 1);
	    } else if (move.type === 1) {
	      // insert item
	      var insertNode;
	      if (maps[move.item.key]) {
	        insertNode = maps[move.item.key];
	      } else if (typeof move.item !== 'string') {
	        insertNode = move.item.render();
	      } else {
	        insertNode = document.createTextNode(move.item);
	      }

	      staticNodeList.splice(index, 0, insertNode);
	      node.insertBefore(insertNode, node.childNodes[index] || null);
	    }
	  });
	}

	patch.REPLACE = REPLACE;
	patch.REORDER = REORDER;
	patch.PROPS = PROPS;
	patch.TEXT = TEXT;

	module.exports = patch;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).diff


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Diff two list in O(N).
	 * @param {Array} oldList - Original List
	 * @param {Array} newList - List After certain insertions, removes, or moves
	 * @return {Object} - {moves: <Array>}
	 *                  - moves is a list of actions that telling how to remove and insert
	 */
	function diff (oldList, newList, key) {
	  var oldMap = makeKeyIndexAndFree(oldList, key)
	  var newMap = makeKeyIndexAndFree(newList, key)

	  var newFree = newMap.free

	  var oldKeyIndex = oldMap.keyIndex
	  var newKeyIndex = newMap.keyIndex

	  var moves = []

	  // a simulate list to manipulate
	  var children = []
	  var i = 0
	  var item
	  var itemKey
	  var freeIndex = 0

	  // fist pass to check item in old list: if it's removed or not
	  while (i < oldList.length) {
	    item = oldList[i]
	    itemKey = getItemKey(item, key)
	    if (itemKey) {
	      if (!newKeyIndex.hasOwnProperty(itemKey)) {
	        children.push(null)
	      } else {
	        var newItemIndex = newKeyIndex[itemKey]
	        children.push(newList[newItemIndex])
	      }
	    } else {
	      var freeItem = newFree[freeIndex++]
	      children.push(freeItem || null)
	    }
	    i++
	  }

	  var simulateList = children.slice(0)

	  // remove items no longer exist
	  i = 0
	  while (i < simulateList.length) {
	    if (simulateList[i] === null) {
	      remove(i)
	      removeSimulate(i)
	    } else {
	      i++
	    }
	  }

	  // i is cursor pointing to a item in new list
	  // j is cursor pointing to a item in simulateList
	  var j = i = 0
	  while (i < newList.length) {
	    item = newList[i]
	    itemKey = getItemKey(item, key)

	    var simulateItem = simulateList[j]
	    var simulateItemKey = getItemKey(simulateItem, key)

	    if (simulateItem) {
	      if (itemKey === simulateItemKey) {
	        j++
	      } else {
	        // new item, just inesrt it
	        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
	          insert(i, item)
	        } else {
	          // if remove current simulateItem make item in right place
	          // then just remove it
	          var nextItemKey = getItemKey(simulateList[j + 1], key)
	          if (nextItemKey === itemKey) {
	            remove(i)
	            removeSimulate(j)
	            j++ // after removing, current j is right, just jump to next one
	          } else {
	            // else insert item
	            insert(i, item)
	          }
	        }
	      }
	    } else {
	      insert(i, item)
	    }

	    i++
	  }

	  function remove (index) {
	    var move = {index: index, type: 0}
	    moves.push(move)
	  }

	  function insert (index, item) {
	    var move = {index: index, item: item, type: 1}
	    moves.push(move)
	  }

	  function removeSimulate (index) {
	    simulateList.splice(index, 1)
	  }

	  return {
	    moves: moves,
	    children: children
	  }
	}

	/**
	 * Convert list to key-item keyIndex object.
	 * @param {Array} list
	 * @param {String|Function} key
	 */
	function makeKeyIndexAndFree (list, key) {
	  var keyIndex = {}
	  var free = []
	  for (var i = 0, len = list.length; i < len; i++) {
	    var item = list[i]
	    var itemKey = getItemKey(item, key)
	    if (itemKey) {
	      keyIndex[itemKey] = i
	    } else {
	      free.push(item)
	    }
	  }
	  return {
	    keyIndex: keyIndex,
	    free: free
	  }
	}

	function getItemKey (item, key) {
	  if (!item || !key) return void 666
	  return typeof key === 'string'
	    ? item[key]
	    : key(item)
	}

	exports.makeKeyIndexAndFree = makeKeyIndexAndFree // exports for test
	exports.diff = diff


/***/ }
/******/ ]);