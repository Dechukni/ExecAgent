(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("WebsocketTest", [], factory);
	else if(typeof exports === 'object')
		exports["WebsocketTest"] = factory();
	else
		root["WebsocketTest"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _websocket = __webpack_require__(1);
	
	var ws = _interopRequireWildcard(_websocket);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var websocketTest = function () {
	  function websocketTest() {
	    _classCallCheck(this, websocketTest);
	
	    this._name = 'WebSocket';
	    this.socket = new ws.w3cwebsocket('ws://localhost:9000/connect');
	    this.handlers = [];
	  }
	
	  _createClass(websocketTest, [{
	    key: 'returnName',
	    value: function returnName() {
	      return this._name;
	    }
	  }, {
	    key: 'onOpenPromise',
	    value: function onOpenPromise() {
	      var _this = this;
	
	      return new Promise(function (resolve) {
	        _this.socket.onopen = function () {
	          _this._name = 'OpenedWebSocket';
	          resolve(_this._name);
	        };
	      });
	    }
	  }, {
	    key: 'sendTestMessage',
	    value: function sendTestMessage(command, id, body) {
	      this.socket.send(JSON.stringify({
	        operation: command,
	        id: String(id),
	        body: body
	      }));
	    }
	  }, {
	    key: 'onMessagePromise',
	    value: function onMessagePromise() {
	      var _this2 = this;
	
	      return new Promise(function (resolve, reject) {
	        _this2.socket.onmessage = function (event) {
	          var parsedEvent = JSON.parse(event.data);
	
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;
	
	          try {
	            for (var _iterator = _this2.handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var handler = _step.value;
	
	              handler(parsedEvent);
	            }
	          } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	              }
	            } finally {
	              if (_didIteratorError) {
	                throw _iteratorError;
	              }
	            }
	          }
	
	          if (!('error' in parsedEvent) || parsedEvent.error === null) {
	            resolve(parsedEvent);
	          } else {
	            reject(parsedEvent.error);
	          }
	        };
	      });
	    }
	  }, {
	    key: 'addEventHandler',
	    value: function addEventHandler(handler) {
	      this.handlers.push(handler);
	    }
	  }, {
	    key: 'removeEventHandler',
	    value: function removeEventHandler(handler) {
	      var handlerIndex = this.handlers.indexOf(handler);
	
	      if (handlerIndex !== -1) {
	        this.handlers.splice(handlerIndex, 1);
	      }
	    }
	  }]);
	
	  return websocketTest;
	}();
	
	exports.default = websocketTest;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var _global = (function() { return this; })();
	var nativeWebSocket = _global.WebSocket || _global.MozWebSocket;
	var websocket_version = __webpack_require__(2);
	
	
	/**
	 * Expose a W3C WebSocket class with just one or two arguments.
	 */
	function W3CWebSocket(uri, protocols) {
		var native_instance;
	
		if (protocols) {
			native_instance = new nativeWebSocket(uri, protocols);
		}
		else {
			native_instance = new nativeWebSocket(uri);
		}
	
		/**
		 * 'native_instance' is an instance of nativeWebSocket (the browser's WebSocket
		 * class). Since it is an Object it will be returned as it is when creating an
		 * instance of W3CWebSocket via 'new W3CWebSocket()'.
		 *
		 * ECMAScript 5: http://bclary.com/2004/11/07/#a-13.2.2
		 */
		return native_instance;
	}
	
	
	/**
	 * Module exports.
	 */
	module.exports = {
	    'w3cwebsocket' : nativeWebSocket ? W3CWebSocket : null,
	    'version'      : websocket_version
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3).version;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				{
					"raw": "websocket@^1.0.23",
					"scope": null,
					"escapedName": "websocket",
					"name": "websocket",
					"rawSpec": "^1.0.23",
					"spec": ">=1.0.23 <2.0.0",
					"type": "range"
				},
				"/home/dechukni/Documents/webpack-library-starter"
			]
		],
		"_from": "websocket@>=1.0.23 <2.0.0",
		"_id": "websocket@1.0.23",
		"_inCache": true,
		"_installable": true,
		"_location": "/websocket",
		"_nodeVersion": "0.10.45",
		"_npmOperationalInternal": {
			"host": "packages-16-east.internal.npmjs.com",
			"tmp": "tmp/websocket-1.0.23.tgz_1463625793005_0.4532310354989022"
		},
		"_npmUser": {
			"name": "theturtle32",
			"email": "brian@worlize.com"
		},
		"_npmVersion": "2.15.1",
		"_phantomChildren": {},
		"_requested": {
			"raw": "websocket@^1.0.23",
			"scope": null,
			"escapedName": "websocket",
			"name": "websocket",
			"rawSpec": "^1.0.23",
			"spec": ">=1.0.23 <2.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"#USER",
			"/"
		],
		"_resolved": "https://registry.npmjs.org/websocket/-/websocket-1.0.23.tgz",
		"_shasum": "20de8ec4a7126b09465578cd5dbb29a9c296aac6",
		"_shrinkwrap": null,
		"_spec": "websocket@^1.0.23",
		"_where": "/home/dechukni/Documents/webpack-library-starter",
		"author": {
			"name": "Brian McKelvey",
			"email": "brian@worlize.com",
			"url": "https://www.worlize.com/"
		},
		"browser": "lib/browser.js",
		"bugs": {
			"url": "https://github.com/theturtle32/WebSocket-Node/issues"
		},
		"config": {
			"verbose": false
		},
		"contributors": [
			{
				"name": "Iñaki Baz Castillo",
				"email": "ibc@aliax.net",
				"url": "http://dev.sipdoc.net"
			}
		],
		"dependencies": {
			"debug": "^2.2.0",
			"nan": "^2.3.3",
			"typedarray-to-buffer": "^3.1.2",
			"yaeti": "^0.0.4"
		},
		"description": "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",
		"devDependencies": {
			"buffer-equal": "^0.0.1",
			"faucet": "^0.0.1",
			"gulp": "git+https://github.com/gulpjs/gulp.git#4.0",
			"gulp-jshint": "^1.11.2",
			"jshint-stylish": "^1.0.2",
			"tape": "^4.0.1"
		},
		"directories": {
			"lib": "./lib"
		},
		"dist": {
			"shasum": "20de8ec4a7126b09465578cd5dbb29a9c296aac6",
			"tarball": "https://registry.npmjs.org/websocket/-/websocket-1.0.23.tgz"
		},
		"engines": {
			"node": ">=0.8.0"
		},
		"gitHead": "ba2fa7e9676c456bcfb12ad160655319af66faed",
		"homepage": "https://github.com/theturtle32/WebSocket-Node",
		"keywords": [
			"websocket",
			"websockets",
			"socket",
			"networking",
			"comet",
			"push",
			"RFC-6455",
			"realtime",
			"server",
			"client"
		],
		"license": "Apache-2.0",
		"main": "index",
		"maintainers": [
			{
				"name": "theturtle32",
				"email": "brian@worlize.com"
			}
		],
		"name": "websocket",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/theturtle32/WebSocket-Node.git"
		},
		"scripts": {
			"gulp": "gulp",
			"install": "(node-gyp rebuild 2> builderror.log) || (exit 0)",
			"test": "faucet test/unit"
		},
		"version": "1.0.23"
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=WebsocketTest.js.map