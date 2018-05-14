/*!
 * BSD License
 * 
 * For SignalsUploader software
 * 
 * Copyright (c) 2016-present, Facebook, Inc. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 *  * Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 * 
 *  * Neither the name Facebook nor the names of its contributors may be used to
 *    endorse or promote products derived from this software without specific
 *    prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * @nolint
 * @haste-ignore
 * @generated
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 80);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var STRIP_MODES = __webpack_require__(79);

var SHA_256_REGEX = /^[a-f0-9]{64}$/i;
var TRIM_REGEX = /^\s+|\s+$/g;

var STRIP_WHITESPACE_REGEX = /\s+/g;

var STRIP_WHITESPACE_AND_PUNCTUATION_REGEX = /[!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@ \[\\\]\^_`\{\|\}~\s]+/g;
var STRIP_NON_LATIN_ALPHA_NUMERIC_REGEX = /\W+/g;

function trim(obj) {
  return typeof obj === 'string' ? obj.replace(TRIM_REGEX, '') : '';
}

function strip(obj) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : STRIP_MODES.WHITESPACE_ONLY;

  var result = '';
  if (typeof obj === 'string') {
    switch (mode) {
      case STRIP_MODES.WHITESPACE_ONLY:
        result = obj.replace(STRIP_WHITESPACE_REGEX, '');
        break;
      case STRIP_MODES.WHITESPACE_AND_PUNCTUATION:
        result = obj.replace(STRIP_WHITESPACE_AND_PUNCTUATION_REGEX, '');
        break;
      case STRIP_MODES.ALL_NON_LATIN_ALPHA_NUMERIC:
        result = obj.replace(STRIP_NON_LATIN_ALPHA_NUMERIC_REGEX, '');
        break;
    }
  }
  return result;
}

function hasProp(obj, key) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && Object.prototype.hasOwnProperty.call(obj, key);
}

function addValueAtPath(head, path, value) {
  var stack = path.split('.');

  if (value === undefined) {
    value = null;
  }

  for (var i = 0; i < stack.length - 1; i++) {
    var parentKey = stack.shift();
    head = head[parentKey] || (head[parentKey] = {});
  }
  var leafKey = stack[0];

  if (!hasProp(head, leafKey)) {
    head[leafKey] = value;
  } else {
    var currentValue = head[leafKey];

    if (Array.isArray(currentValue)) {
      currentValue.push(value);
    } else {
      head[leafKey] = [currentValue, value];
    }
  }

  return head;
}

function looksLikeHashed(input) {
  return typeof input === 'string' && SHA_256_REGEX.test(input);
}

function isFile(source) {
  return global.File && source instanceof File || source instanceof Object;
}

function throwFatalError(message) {
  var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  throw new Error('Fatal: ' + message + ', detail=' + JSON.stringify(detail));
}

module.exports = {
  addValueAtPath: addValueAtPath,
  hasProp: hasProp,
  isFile: isFile,
  looksLikeHashed: looksLikeHashed,
  strip: strip,
  throwFatalError: throwFatalError,
  trim: trim,
  STRIP_MODES: STRIP_MODES
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var NODE_ENV = process.env.NODE_ENV;

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1;
    throw error;
  }
};

module.exports = invariant;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var invariant = __webpack_require__(1);

function abstractMethod(className, methodName) {
  invariant(false, 'Subclasses of %s must override %s() with their own implementation.', className, methodName);
}

module.exports = abstractMethod;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsUploaderJob = __webpack_require__(24);

var abstractMethod = __webpack_require__(2);
var invariant = __webpack_require__(1);

var SignalsUploaderChunkDigestJob = function (_SignalsUploaderJob) {
  _inherits(SignalsUploaderChunkDigestJob, _SignalsUploaderJob);

  function SignalsUploaderChunkDigestJob(postMessageHandler) {
    _classCallCheck(this, SignalsUploaderChunkDigestJob);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderChunkDigestJob.__proto__ || Object.getPrototypeOf(SignalsUploaderChunkDigestJob)).call(this, postMessageHandler));

    _this._position = 0;
    _this._chunks = [];
    return _this;
  }

  _createClass(SignalsUploaderChunkDigestJob, [{
    key: '_onChunk',
    value: function _onChunk(chunk) {
      this._chunks.push(chunk);
      this._chunks.sort(function (a, b) {
        return a.start - b.start;
      });
      this._process();
    }
  }, {
    key: '_onEndOfStream',
    value: function _onEndOfStream(endOfStream) {
      invariant(this._end == null || this._end === endOfStream.position, 'Received conflicting end-of-stream tags.');
      this._end = endOfStream.position;
      this._process();
    }
  }, {
    key: '_process',
    value: function _process() {
      for (var i = 1; i < this._chunks.length; i++) {
        invariant(this._chunks[i].start >= this._chunks[i - 1].end, 'Received overlapped chunks.');
      }
      if (this._chunks.length > 0 && this._end != null) {
        invariant(this._chunks[this._chunks.length - 1].end <= this._end, 'Received chunk beyond end-of-stream.');
      }
      if (this._chunks.length > 0) {
        invariant(this._chunks[0].start >= this._position, 'Received chunk before current position.');
      }

      while (this._chunks.length > 0 && this._chunks[0].start === this._position) {
        var chunk = this._chunks[0];
        this._chunks = this._chunks.slice(1);
        this._position = chunk.end;
        this.__processChunk(chunk);
      }
      if (this._position === this._end) {
        this.__processEndOfStream({ position: this._position });
      }
    }
  }, {
    key: 'onReceiveMessageFromMainThread',
    value: function onReceiveMessageFromMainThread(message) {
      switch (message.type) {
        case 'chunk-ready':
          this._onChunk(message.chunk);
          break;
        case 'end-of-stream':
          this._onEndOfStream(message.endOfStream);
          break;
      }
    }
  }, {
    key: '__processChunk',
    value: function __processChunk(chunk) {
      abstractMethod('SignalsUploaderJob', '_processChunk');
    }
  }, {
    key: '__processEndOfStream',
    value: function __processEndOfStream(endOfStream) {
      abstractMethod('SignalsUploaderJob', '_processEndOfStream');
    }
  }]);

  return SignalsUploaderChunkDigestJob;
}(SignalsUploaderJob);

module.exports = SignalsUploaderChunkDigestJob;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var invariant = __webpack_require__(1);

var SignalsUploaderCSVParser = function () {
  function SignalsUploaderCSVParser(delimiter) {
    _classCallCheck(this, SignalsUploaderCSVParser);

    this._delimiter = delimiter;

    this._rows = [];
    this._lastRow = [];
    this._lastField = '';
    this._state = 'field-start';
    this._lineNumber = 1;
    this._position = 0;
    this._lastEnd = 0;
  }

  _createClass(SignalsUploaderCSVParser, [{
    key: 'readRows',
    value: function readRows() {
      if (this._state === 'end-of-stream') {
        return this._rows.splice(0, this._rows.length);
      } else {
        return this._rows.splice(0, this._rows.length - 1);
      }
    }
  }, {
    key: 'onNewCharacter',
    value: function onNewCharacter(char) {
      this._position++;
      this._onNewCharacter(char);
    }
  }, {
    key: '_onNewCharacter',
    value: function _onNewCharacter(char) {
      invariant(char.length === 1, 'Should be a character');
      invariant(this._state !== 'end-of-stream', 'Stream already finished');

      if (char === '\x00') {
        return;
      }

      switch (this._state) {
        case 'field-start':
          switch (char) {
            case '"':
              this._state = 'quoted-field';
              break;

            case '\r':
              this._pushField();
              this._pushRow();
              this._state = 'line-ends-with-CR';
              break;

            case '\n':
              this._pushField();
              this._pushRow();
              break;

            case this._delimiter:
              this._pushField();
              break;

            default:
              this._state = 'unquoted-field';
              this._onNewCharacter(char);
              break;
          }
          break;

        case 'unquoted-field':
          switch (char) {
            case '\r':
              this._pushField();
              this._pushRow();
              this._state = 'line-ends-with-CR';
              break;

            case '\n':
              this._pushField();
              this._pushRow();
              this._state = 'field-start';
              break;

            case this._delimiter:
              this._pushField();
              this._state = 'field-start';
              break;

            default:
              this._pushCharacter(char);
              break;
          }
          break;

        case 'quoted-field':
          switch (char) {
            case '"':
              this._state = 'quote-in-quoted-field';
              break;

            default:
              this._pushCharacter(char);
              break;
          }
          break;

        case 'quote-in-quoted-field':
          switch (char) {
            case '"':
              this._pushCharacter(char);
              this._state = 'quoted-field';
              break;

            case '\r':
              this._pushField();
              this._pushRow();
              this._state = 'line-ends-with-CR';
              break;

            case '\n':
              this._pushField();
              this._pushRow();
              this._state = 'field-start';
              break;

            case this._delimiter:
              this._pushField();
              this._state = 'field-start';
              break;

            default:

              this._lastField = '"' + this._lastField;
              this._pushCharacter(char);
              this._state = 'unquoted-field';
              break;
          }
          break;

        case 'line-ends-with-CR':
          switch (char) {
            case '\n':

              this._state = 'field-start';
              this._rows[this._rows.length - 1].end = this._position;
              this._lastEnd = this._position;
              break;

            default:
              this._state = 'field-start';
              this._onNewCharacter(char);
              break;
          }
          break;
      }
    }
  }, {
    key: 'onEndOfStream',
    value: function onEndOfStream() {

      if (this._lastField.length > 0 || this._lastRow.length > 0) {
        this._pushField();
        this._pushRow();
      }
      this._state = 'end-of-stream';
    }
  }, {
    key: '_pushCharacter',
    value: function _pushCharacter(char) {
      this._lastField += char;
    }
  }, {
    key: '_pushField',
    value: function _pushField() {
      this._lastRow.push(this._lastField);
      this._lastField = '';
    }
  }, {
    key: '_pushRow',
    value: function _pushRow() {
      this._rows.push({
        fields: this._lastRow,
        lineNumber: this._lineNumber,
        start: this._lastEnd,
        end: this._position
      });
      this._lastRow = [];
      this._lineNumber++;
      this._lastEnd = this._position;
    }
  }]);

  return SignalsUploaderCSVParser;
}();

module.exports = SignalsUploaderCSVParser;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var asap = __webpack_require__(32);

function noop() {}
















var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function');
  }
  this._40 = 0;
  this._65 = 0;
  this._55 = null;
  this._72 = null;
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._37 = null;
Promise._87 = null;
Promise._61 = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
}
function handle(self, deferred) {
  while (self._65 === 3) {
    self = self._55;
  }
  if (Promise._37) {
    Promise._37(self);
  }
  if (self._65 === 0) {
    if (self._40 === 0) {
      self._40 = 1;
      self._72 = deferred;
      return;
    }
    if (self._40 === 1) {
      self._40 = 2;
      self._72 = [self._72, deferred];
      return;
    }
    self._72.push(deferred);
    return;
  }
  handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
  asap(function() {
    var cb = self._65 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._65 === 1) {
        resolve(deferred.promise, self._55);
      } else {
        reject(deferred.promise, self._55);
      }
      return;
    }
    var ret = tryCallOne(cb, self._55);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
 
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._65 = 3;
      self._55 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._65 = 1;
  self._55 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._65 = 2;
  self._55 = newValue;
  if (Promise._87) {
    Promise._87(self, newValue);
  }
  finale(self);
}
function finale(self) {
  if (self._40 === 1) {
    handle(self, self._72);
    self._72 = null;
  }
  if (self._40 === 2) {
    for (var i = 0; i < self._72.length; i++) {
      handle(self, self._72[i]);
    }
    self._72 = null;
  }
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  });
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SignalBaseTypes = __webpack_require__(28);

module.exports = (_module$exports = {}, _defineProperty(_module$exports, SignalBaseTypes.ANY, __webpack_require__(47)), _defineProperty(_module$exports, SignalBaseTypes.BOOL, __webpack_require__(48)), _defineProperty(_module$exports, SignalBaseTypes.CURRENCY_CODE, __webpack_require__(49)), _defineProperty(_module$exports, SignalBaseTypes.DATE, __webpack_require__(11)), _defineProperty(_module$exports, SignalBaseTypes.DATE_MONTH, __webpack_require__(50)), _defineProperty(_module$exports, SignalBaseTypes.EMAIL, __webpack_require__(51)), _defineProperty(_module$exports, SignalBaseTypes.ENUM, __webpack_require__(12)), _defineProperty(_module$exports, SignalBaseTypes.FBID, __webpack_require__(52)), _defineProperty(_module$exports, SignalBaseTypes.JSON_LIST, __webpack_require__(53)), _defineProperty(_module$exports, SignalBaseTypes.LIST, __webpack_require__(54)), _defineProperty(_module$exports, SignalBaseTypes.NUMBER, __webpack_require__(13)), _defineProperty(_module$exports, SignalBaseTypes.PHONE_NUMBER, __webpack_require__(55)), _defineProperty(_module$exports, SignalBaseTypes.POSTAL_CODE, __webpack_require__(56)), _defineProperty(_module$exports, SignalBaseTypes.SHA256, __webpack_require__(57)), _defineProperty(_module$exports, SignalBaseTypes.STRING, __webpack_require__(58)), _defineProperty(_module$exports, SignalBaseTypes.TIMESTAMP, __webpack_require__(20)), _defineProperty(_module$exports, SignalBaseTypes.UNIX_TIME, __webpack_require__(59)), _defineProperty(_module$exports, SignalBaseTypes.VALUE, __webpack_require__(21)), _module$exports);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ['MM-DD-YYYY', 'MM/DD/YYYY', 'MMDDYYYY', 'DD-MM-YYYY', 'DD/MM/YYYY', 'DDMMYYYY', 'YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD', 'MM-DD-YY', 'MM/DD/YY', 'MMDDYY', 'DD-MM-YY', 'DD/MM/YY', 'DDMMYY', 'YY-MM-DD', 'YY/MM/DD', 'YYMMDD'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var SignalsNormalizationErrorLevel = __webpack_require__(29);
var SignalsNormalizationErrorScope = __webpack_require__(9);
var SignalsNormalizationPropError = __webpack_require__(30);
var SignalsValidationUtils = __webpack_require__(0);

var ruleChecker = __webpack_require__(60);

var addValueAtPath = SignalsValidationUtils.addValueAtPath,
    hasProp = SignalsValidationUtils.hasProp,
    throwFatalError = SignalsValidationUtils.throwFatalError;


function _remapSignal(signal, schema, mapping) {
  var newSignal = {};
  var reverseMapping = {};

  for (var p in mapping) {
    if (hasProp(mapping, p)) {
      if (Array.isArray(signal)) {
        addValueAtPath(newSignal, mapping[p], signal[Number(p)]);
      } else {
        addValueAtPath(newSignal, mapping[p], signal[p]);
      }
      addValueAtPath(reverseMapping, mapping[p], p);
    }
  }
  return { newSignal: newSignal, reverseMapping: reverseMapping };
}

function _constructTree(signal, propSchema, infoForNormalization, reverseMapping, customTypeInfo) {
  if ((typeof propSchema === 'undefined' ? 'undefined' : _typeof(propSchema)) !== 'object') {
    throwFatalError('propSchema is not an object', { propSchema: propSchema });
  }

  var typeSchema = propSchema.type;
  if ((typeof typeSchema === 'undefined' ? 'undefined' : _typeof(typeSchema)) === 'object') {
    var nodes = {};
    if ((typeof signal === 'undefined' ? 'undefined' : _typeof(signal)) === 'object') {
      var _loop = function _loop(propKey) {
        var props = typeSchema.props;


        var subPropSchema = (props != null && Array.isArray(props) ? props : []).find(function (subPropSchema) {
          return subPropSchema.key === propKey;
        });

        if (subPropSchema == null) {
          var customType = customTypeInfo && customTypeInfo[propKey] || {};
          subPropSchema = {
            type: customType.baseType,
            typeParams: customType.typeParams,
            maxOccurrence: customType.maxOccurrence,
            key: propKey,
            customType: true
          };
        }

        nodes[propKey] = _constructTree(signal[propKey], subPropSchema, infoForNormalization, reverseMapping != null && (typeof reverseMapping === 'undefined' ? 'undefined' : _typeof(reverseMapping)) === 'object' ? reverseMapping[propKey] : undefined, customTypeInfo);
      };

      for (var propKey in signal) {
        _loop(propKey);
      }
    }

    return {
      type: 'compound',
      nodes: nodes,
      propSchema: propSchema,
      errors: [],

      rawValue: signal,

      infoForNormalization: infoForNormalization || undefined,
      reverseMapping: reverseMapping || undefined
    };
  }

  return {
    type: 'prop',
    propSchema: propSchema,
    errors: [],

    rawValue: signal,

    infoForNormalization: infoForNormalization || undefined,
    reverseMapping: reverseMapping || undefined
  };
}

function _makePropError(error, badValues) {
  return {
    level: SignalsNormalizationErrorLevel.WARNING,
    where: SignalsNormalizationErrorScope.PROP,
    propError: { error: error, badValues: badValues }
  };
}

function _normalizeCompoundNode(node, normalizers, transformers) {
  var nodes = node.nodes,
      errors = node.errors,
      propSchema = node.propSchema,
      rawValue = node.rawValue,
      reverseMapping = node.reverseMapping;

  if ((typeof nodes === 'undefined' ? 'undefined' : _typeof(nodes)) !== 'object') {
    throwFatalError('compound node node.nodes is not Object', { node: node });
    return;
  }

  var normalizedValue = {};
  for (var propKey in nodes) {
    var subNode = nodes[propKey];
    _normalizeNode(subNode, normalizers, transformers);
    if (subNode.normalizedValue != null) {
      normalizedValue[propKey] = subNode.normalizedValue;
    }
  }

  var typeSchema = propSchema.type;
  if ((typeof typeSchema === 'undefined' ? 'undefined' : _typeof(typeSchema)) !== 'object') {
    throwFatalError('propSchema.type is not Object', { propSchema: propSchema });
    return;
  }
  if (typeSchema.validIf != null) {
    errors.push.apply(errors, _toConsumableArray(ruleChecker(normalizedValue, typeSchema, typeSchema.validIf)));
  }

  errors.push.apply(errors, _toConsumableArray(ruleChecker(normalizedValue, typeSchema, {
    rule: 'rejectExtraProps',
    warnOnFail: typeSchema.canHaveExtraProps === true
  })));

  var valid = (typeof rawValue === 'undefined' ? 'undefined' : _typeof(rawValue)) === 'object' && errors.find(function (error) {
    return error.level !== SignalsNormalizationErrorLevel.WARNING;
  }) == null;
  if (valid) {
    if (transformers && Array.isArray(typeSchema.transform)) {
      typeSchema.transform.forEach(function (transformer) {
        var transformerFunc = transformers && transformers[transformer];
        if (transformerFunc != null) {
          normalizedValue = transformerFunc(normalizedValue, typeSchema);
        }
      });
    }
    node.normalizedValue = normalizedValue;
  } else {
    node.errors.push(_makePropError(SignalsNormalizationPropError.INVALID, [{
      value: rawValue,
      rawPosition: reverseMapping || undefined
    }]));
  }
}

function _normalizePropNode(node, normalizers) {
  var propSchema = node.propSchema,
      rawValue = node.rawValue,
      reverseMapping = node.reverseMapping;

  var normalizer = normalizers[propSchema.type];

  if (normalizer == null) {
    node.normalizedValue = rawValue;
    return;
  }

  var infoForNormalization = node.infoForNormalization && node.infoForNormalization[propSchema.key] || undefined;

  if (propSchema.maxOccurrence == null) {
    var _normalizer = normalizer(rawValue, propSchema.typeParams, infoForNormalization),
        normalizedValue = _normalizer.normalizedValue,
        additionalInfo = _normalizer.additionalInfo;

    if (normalizedValue != null) {
      node.normalizedValue = normalizedValue;
    } else {
      node.errors.push(_makePropError(SignalsNormalizationPropError.INVALID, [{
        value: rawValue,
        rawPosition: reverseMapping || undefined,
        details: additionalInfo
      }]));
    }
    return;
  }

  var actuallyHadMultipleOccurances = rawValue != null && Array.isArray(rawValue);

  var values = actuallyHadMultipleOccurances ? rawValue || [] : [rawValue];

  var reverseMappings = actuallyHadMultipleOccurances ? reverseMapping || [] : [reverseMapping];

  if (values.length > propSchema.maxOccurrence) {
    node.errors.push(_makePropError(SignalsNormalizationPropError.TOO_MANY, values.map(function (value, i) {
      return {
        value: value,
        rawPosition: reverseMappings != null ? reverseMappings[i] : undefined
      };
    })));
    return;
  }

  var badValues = [];
  var goodValues = [];
  values.forEach(function (value, i) {
    var _normalizer2 = normalizer(value, propSchema.typeParams, infoForNormalization && infoForNormalization[i] || undefined),
        normalizedValue = _normalizer2.normalizedValue,
        additionalInfo = _normalizer2.additionalInfo;

    if (normalizedValue != null) {
      goodValues.push(normalizedValue);
    } else {
      badValues.push({
        value: value,
        rawPosition: reverseMappings != null ? reverseMappings[i] : undefined,
        details: additionalInfo
      });
    }
  });
  if (badValues.length > 0) {
    node.errors.push(_makePropError(goodValues.length === 0 ? SignalsNormalizationPropError.INVALID : SignalsNormalizationPropError.SOME_INVALID, badValues));
  }
  if (goodValues.length > 0) {
    node.normalizedValue = goodValues.length === 1 ? goodValues[0] : goodValues;
  }
}

function _normalizeNode(node, normalizers, transformers) {
  switch (node.type) {
    case 'compound':
      _normalizeCompoundNode(node, normalizers, transformers);
      return;
    case 'prop':
      _normalizePropNode(node, normalizers);
      return;
  }
}

function _normalizeSignal(signal, schema, normalizers, transformers, infoForNormalization, customTypeInfo, reverseMapping) {
  var tree = _constructTree(signal, {
    type: schema
  }, infoForNormalization, reverseMapping, customTypeInfo);

  _normalizeNode(tree, normalizers, transformers || {});
  return tree;
}

function _pushPropIfNotExist(props, prop) {
  if (props.indexOf(prop) === -1) {
    props.push(prop);
  }
}

function _appendPath(path, key) {
  return path.length > 0 ? path + '.' + key : key;
}

function _deriveLegacyMetadata(node, path, invalidProps, missingRequiredProps, notFoundProps, unidentifiedProps, notAllowedProps) {
  var errors = node.errors,
      nodes = node.nodes,
      type = node.type,
      normalizedValue = node.normalizedValue,
      propSchema = node.propSchema;

  if (type === 'compound') {
    for (var propKey in nodes) {
      _deriveLegacyMetadata(nodes[propKey], _appendPath(path, propKey), invalidProps, missingRequiredProps, notFoundProps, unidentifiedProps, notAllowedProps);
    }
    (propSchema.type.props || []).forEach(function (subPropSchema) {
      if (nodes == null || nodes[subPropSchema.key] == null) {
        var propPath = _appendPath(path, subPropSchema.key);
        _pushPropIfNotExist(notFoundProps, propPath);
      }
    });
  }
  errors.forEach(function (error) {
    if (error.where === SignalsNormalizationErrorScope.RULE) {
      var ruleError = error.ruleError;
      var ruleSpecs = ruleError && ruleError.ruleSpecs;
      var rule = ruleSpecs && ruleSpecs.rule;
      if (rule === 'propValid') {
        var _propKey = ruleSpecs && ruleSpecs.args;
        var propPath = _appendPath(path, String(_propKey));
        _pushPropIfNotExist(invalidProps, propPath);
        _pushPropIfNotExist(missingRequiredProps, propPath);
      } else if (rule === 'dependentProps') {
        var propKeys = ruleError && ruleError.details && ruleError.details.invalidProps || [];
        propKeys.forEach(function (propKey) {
          _pushPropIfNotExist(missingRequiredProps, _appendPath(path, propKey));
        });
      } else if (rule === 'rejectExtraProps') {
        var propPaths = (ruleError && ruleError.details && ruleError.details.unidentifiedProps || []).map(function (propKey) {
          return _appendPath(path, propKey);
        });
        propPaths.forEach(function (propPath) {
          _pushPropIfNotExist(unidentifiedProps, propPath);
          if (error.level === SignalsNormalizationErrorLevel.REJECT) {
            _pushPropIfNotExist(notAllowedProps, propPath);
          }
        });
      }
    }
  });
  if (normalizedValue == null) {
    _pushPropIfNotExist(invalidProps, path);
  }
}

function normalizeSignal(signal, schema, normalizers, transformers, mapping, infoForNormalization, customTypeInfo) {
  var tree = null;

  var invalidProps = [];
  var missingRequiredProps = [];
  var notFoundProps = [];
  var unidentifiedProps = [];
  var notAllowedProps = [];

  try {
    if (signal != null && schema != null && normalizers != null && (typeof schema === 'undefined' ? 'undefined' : _typeof(schema)) === 'object' && (typeof normalizers === 'undefined' ? 'undefined' : _typeof(normalizers)) === 'object' && !(mapping == null && Array.isArray(signal))) {
      var reverseMapping = null;
      if (mapping != null && (typeof mapping === 'undefined' ? 'undefined' : _typeof(mapping)) === 'object') {
        var remapResult = _remapSignal(signal, schema, mapping);
        signal = remapResult.newSignal;
        reverseMapping = remapResult.reverseMapping;
      }

      tree = _normalizeSignal(signal, schema, normalizers, transformers || {}, infoForNormalization || undefined, customTypeInfo || undefined, reverseMapping || undefined);

      _deriveLegacyMetadata(tree, '', invalidProps, missingRequiredProps, notFoundProps, unidentifiedProps, notAllowedProps);
    } else {
      throwFatalError('invalid input', { signal: signal, mapping: mapping, schema: schema, normalizers: normalizers });
    }
  } catch (error) {
    return {
      tree: null,

      normalizedValue: null,
      valid: false,
      fatalError: error,

      invalidProps: [],
      missingRequiredProps: [],
      notFoundProps: [],
      unidentifiedProps: [],
      notAllowedProps: []
    };
  }

  return {
    tree: tree,

    normalizedValue: tree && tree.normalizedValue || null,
    valid: tree && tree.normalizedValue != null || false,
    fatalError: null,

    invalidProps: invalidProps,
    missingRequiredProps: missingRequiredProps,
    notFoundProps: notFoundProps,
    unidentifiedProps: unidentifiedProps,
    notAllowedProps: notAllowedProps
  };
}

module.exports = normalizeSignal;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.freeze({ "RULE": "rule", "PROP": "prop" });

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keyMirror = __webpack_require__(34);

var SignalsNumberNormalizationErrorTypes = keyMirror({
  EMPTY: null,
  NON_INTEGER: null,
  NON_NUMERIC: null,
  INVALID_SEPARATOR: null,
  TOO_BIG: null,
  TOO_SMALL: null
});

module.exports = SignalsNumberNormalizationErrorTypes;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalDateFormats = __webpack_require__(7);
var SignalDateMonthFormats = __webpack_require__(61);
var SignalsValidationUtils = __webpack_require__(0);

var normalizeSignalsEnumType = __webpack_require__(12);

var looksLikeHashed = SignalsValidationUtils.looksLikeHashed,
    trim = SignalsValidationUtils.trim;


var ONLY_DIGITS_CHECKER = /^[0-9]*$/;
var ONLY_DIGITS_NORMALIZER = /[^0-9]/g;
var ONLY_LETTERS_NORMALIZER = /[^a-zA-Z]/g;
var EXACTLY_4_DIGITS_CHECKER = /^[0-9]{4,4}$/;

function validateDate(dateStr) {
  var y = parseInt(dateStr.slice(0, 4), 10);
  var m = parseInt(dateStr.slice(4, 6), 10) - 1;
  var d = parseInt(dateStr.slice(6, 8), 10);
  var date = new Date(y, m, d);
  return date.getFullYear() === y && date.getMonth() === m && date.getDate() === d;
}

function validateDateFormat(dateStr) {
  var dateFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SignalDateFormats[0];

  switch (dateFormat) {
    case 'DD/MM/YYYY':
    case 'MM/DD/YYYY':
      return (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)
      );
    case 'DD-MM-YYYY':
    case 'MM-DD-YYYY':
      return (/^\d{1,2}-\d{1,2}-\d{4}$/.test(dateStr)
      );
    case 'YYYY/MM/DD':
      return (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(dateStr)
      );
    case 'YYYY-MM-DD':
      return (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateStr)
      );
    case 'DD/MM/YY':
    case 'MM/DD/YY':
      return (/^\d{1,2}\/\d{1,2}\/\d{2}$/.test(dateStr)
      );
    case 'DD-MM-YY':
    case 'MM-DD-YY':
      return (/^\d{1,2}-\d{1,2}-\d{2}$/.test(dateStr)
      );
    case 'YY/MM/DD':
      return (/^\d{2}\/\d{1,2}\/\d{1,2}$/.test(dateStr)
      );
    case 'YY-MM-DD':
      return (/^\d{2}-\d{1,2}-\d{1,2}$/.test(dateStr)
      );
    case 'YY-MM':
    case 'MM-YY':
      return (/^\d{2}-\d{2}$/.test(dateStr)
      );
    case 'YYYY-MM':
      return (/^\d{4}-\d{2}$/.test(dateStr)
      );
    case 'MM-YYYY':
      return (/^\d{2}-\d{4}$/.test(dateStr)
      );
    case 'YY/MM':
    case 'MM/YY':
      return (/^\d{2}\/\d{2}$/.test(dateStr)
      );
    case 'MM/YYYY':
      return (/^\d{2}\/\d{4}$/.test(dateStr)
      );
    case 'YYYY/MM':
      return (/^\d{4}\/\d{2}$/.test(dateStr)
      );
    case 'MMYY':
    case 'YYMM':
      return dateStr.length === 4 && ONLY_DIGITS_CHECKER.test(dateStr);
    case 'YYYYMM':
    case 'MMYYYY':
      return dateStr.length === 6 && ONLY_DIGITS_CHECKER.test(dateStr);
    case 'DDMMYYYY':
    case 'MMDDYYYY':
    case 'YYYYMMDD':
      return dateStr.length === 8 && ONLY_DIGITS_CHECKER.test(dateStr);
    case 'DDMMYY':
    case 'MMDDYY':
    case 'YYMMDD':
    default:
      return dateStr.length === 6 && ONLY_DIGITS_CHECKER.test(dateStr);
  }
}

function padYear(dateStr, dateFormat) {
  var currYear = new Date().getFullYear() % 100;
  switch (dateFormat) {
    case 'DD-MM-YY':
    case 'MM-DD-YY':
    case 'DD/MM/YY':
    case 'MM/DD/YY':
    case 'DDMMYY':
    case 'MMDDYY':
    case 'MM-YY':
    case 'MM/YY':
    case 'MMYY':
      return dateStr.slice(0, -2) + (parseInt(dateStr.slice(-2), 10) <= currYear ? '20' : '19') + dateStr.slice(-2);
    case 'YY-MM-DD':
    case 'YY/MM/DD':
    case 'YYMMDD':
    case 'YY-MM':
    case 'YY/MM':
    case 'YYMM':
      return (parseInt(dateStr.substr(0, 2), 10) <= currYear ? '20' : '19') + dateStr;
    default:
      return dateStr;
  }
}

function padDate(dateStr, dateFormat) {
  var delim = null;
  switch (dateFormat) {
    case 'DD-MM-YYYY':
    case 'MM-DD-YYYY':
    case 'YYYY-MM-DD':
    case 'DD-MM-YY':
    case 'MM-DD-YY':
    case 'YY-MM-DD':
      delim = '-';
      break;
    case 'DD/MM/YYYY':
    case 'MM/DD/YYYY':
    case 'YYYY/MM/DD':
    case 'DD/MM/YY':
    case 'MM/DD/YY':
    case 'YY/MM/DD':
      delim = '/';
      break;
    default:
      break;
  }
  if (delim != null) {
    var dates = dateStr.split(delim);
    var paddedDateStr = '';
    dates.forEach(function (elem) {
      paddedDateStr += elem.length === 1 ? '0' + elem : elem;
    });
    dateStr = paddedDateStr;
  }
  return padYear(dateStr, dateFormat);
}

function normalize(input) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var additionalInfo = arguments[2];

  var result = null;
  var dateFormat = additionalInfo;

  if (input != null && typeof input === 'string') {
    if (looksLikeHashed(input)) {
      if (!(params && params.rejectHashed)) {
        result = input;
      }
    } else {

      input = trim(input) || '';

      if (EXACTLY_4_DIGITS_CHECKER.test(input) && !params.allowMonthOnly) {
        result = input + '0101';
      } else {
        dateFormat = normalizeSignalsEnumType(dateFormat, {
          uppercase: true,
          options: params.allowMonthOnly ? SignalDateMonthFormats : SignalDateFormats
        }).normalizedValue;

        result = input;

        if (dateFormat == null || !validateDateFormat(result, dateFormat)) {
          result = null;
        } else {
          result = padDate(result, dateFormat);
          dateFormat = dateFormat.replace(ONLY_LETTERS_NORMALIZER, '');
          result = result.replace(ONLY_DIGITS_NORMALIZER, '');
          switch (dateFormat) {
            case 'DDMMYYYY':
            case 'DDMMYY':
              result = result.slice(4, 8) + result.slice(2, 4) + result.slice(0, 2);
              break;
            case 'MMDDYYYY':
            case 'MMDDYY':
              result = result.slice(4, 8) + result.slice(0, 2) + result.slice(2, 4);
              break;
            case 'YYYYMM':
            case 'YYMM':
              result += '01';
              break;
            case 'MMYY':
            case 'MMYYYY':
              result = result.slice(2, 6) + result.slice(0, 2) + '01';
              break;
            case 'YYYYMMDD':
            case 'YYMMDD':
            default:
              break;
          }

          if (result !== null && !validateDate(result)) {
            result = null;
          }
        }
      }
    }
  }
  return { normalizedValue: result };
}

module.exports = normalize;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsValidationUtils = __webpack_require__(0);

var looksLikeHashed = SignalsValidationUtils.looksLikeHashed,
    trim = SignalsValidationUtils.trim;


function normalize(input) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var result = null;

  var caseInsensitive = params.caseInsensitive,
      lowercase = params.lowercase,
      options = params.options,
      truncate = params.truncate,
      uppercase = params.uppercase;


  if (input != null && options != null && Array.isArray(options) && options.length) {
    if (typeof input === 'string' && looksLikeHashed(input)) {
      if (!params.rejectHashed) {
        result = input;
      }
    } else {
      var str = trim(String(input));

      if (lowercase) {
        str = str.toLowerCase();
      }

      if (uppercase) {
        str = str.toUpperCase();
      }

      if (truncate) {
        str = str.substring(0, truncate);
      }

      if (caseInsensitive) {
        var lowercasedStr = str.toLowerCase();
        for (var i = 0; i < options.length; ++i) {
          if (lowercasedStr === options[i].toLowerCase()) {
            str = options[i];
            break;
          }
        }
      }

      result = options.indexOf(str) > -1 ? str : null;
    }
  }

  return { normalizedValue: result };
}

module.exports = normalize;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    looksLikeHashed = _require.looksLikeHashed,
    trim = _require.trim;

var SignalsNumberNormalizationErrorTypes = __webpack_require__(10);

function normalize(input) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var result = null;
  var errorType = null;
  if (input != null && typeof input === 'string' || typeof input === 'number') {
    if (looksLikeHashed(input) && !params.rejectHashed) {
      result = input;
    } else {
      if (typeof input === 'string') {
        input = trim(input);
      }

      var maybeNum = parseFloat(input);

      if (!isNaN(input - maybeNum)) {
        if (params.round) {
          maybeNum = Math.round(maybeNum);
        }

        if (params.integer && Math.floor(maybeNum) !== maybeNum) {
          errorType = SignalsNumberNormalizationErrorTypes.NON_INTEGER;
        }

        if (!errorType && params.min != null && maybeNum < params.min) {
          errorType = SignalsNumberNormalizationErrorTypes.TOO_SMALL;
        }

        if (!errorType && params.max != null && maybeNum > params.max) {
          errorType = SignalsNumberNormalizationErrorTypes.TOO_BIG;
        }

        if (!errorType && params.lessThan != null && maybeNum >= params.lessThan) {
          errorType = SignalsNumberNormalizationErrorTypes.TOO_BIG;
        }

        if (!errorType && params.moreThan != null && maybeNum <= params.moreThan) {
          errorType = SignalsNumberNormalizationErrorTypes.TOO_SMALL;
        }

        if (errorType == null) {
          result = maybeNum;
        }
      }
    }
  }

  return {
    normalizedValue: result,
    additionalInfo: {
      errorType: result == null && errorType == null ? SignalsNumberNormalizationErrorTypes.NON_NUMERIC : errorType
    }
  };
}

module.exports = normalize;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Immutable = __webpack_require__(35);
var SignalsUploaderColumnMapperConstants = __webpack_require__(63);

var getSchemaSummary = __webpack_require__(18);
var getSignalsNormalizationErrorSummary = __webpack_require__(62);

var COLUMN_MAPPING_ERROR_THRESHOLD = 0.95;

var Map = Immutable.Map,
    List = Immutable.List;
var CUSTOM_COLUMN_TYPE_VALUE = SignalsUploaderColumnMapperConstants.CUSTOM_COLUMN_TYPE_VALUE,
    ITEM_STATUSES = SignalsUploaderColumnMapperConstants.ITEM_STATUSES,
    SKIP_ADDITIONAL_INFO_VALUE = SignalsUploaderColumnMapperConstants.SKIP_ADDITIONAL_INFO_VALUE,
    UNDEFINED_ADDITIONAL_INFO_VALUE = SignalsUploaderColumnMapperConstants.UNDEFINED_ADDITIONAL_INFO_VALUE;


function arrayToObject(arr) {
  var object = {};
  for (var i = 0; i < arr.length; i++) {
    object[i] = arr[i];
  }
  return object;
}

function getPropKeysForTypes(types, schema) {
  var summary = getSchemaSummary(schema);
  var propPaths = summary.pathForSimplePropKeys;
  var extraPropCollector = summary.extraPropsCollectors[0];

  var mapping = {};

  types.forEach(function (key, i) {
    var propPath = void 0;
    if (typeof key === 'string') {
      if (propPaths[key]) {
        propPath = propPaths[key];
      } else {
        if (extraPropCollector != null) {
          propPath = extraPropCollector + '.' + key;
        }
      }
    }
    if (propPath) {
      mapping[i] = propPath;
    }
  });

  return mapping;
}

function getByteLength(value) {
  if (typeof value === 'number') {
    return 8;
  }
  if (typeof value === 'boolean') {
    return 4;
  }
  if (typeof value === 'string') {
    var byteLen = 0;
    for (var i = 0; i < value.length; i++) {
      var code = value.charCodeAt(i);
      if (code < 128) {
        byteLen += 1;
      } else if (code < 2048) {
        byteLen += 2;
      } else if (code < 65536) {
        byteLen += 3;
      } else if (code < 2097152) {
        byteLen += 4;
      } else if (code < 67108864) {
        byteLen += 5;
      } else {
        byteLen += 6;
      }
    }
    return byteLen;
  }
  return 1;
}

function getPresetValueConfigFromObject(data) {
  var result = {
    mappings: [],
    values: []
  };
  if (data != null) {
    result.mappings = Object.keys(data);
    for (var i = 0; i < result.mappings.length; i++) {
      result.values.push(data[result.mappings[i]]);
    }
  }
  return result;
}

function getMappingWithPreset(currentMappings, offset, presetMappings) {
  var result = JSON.parse(JSON.stringify(currentMappings));
  presetMappings.forEach(function (mapping, index) {
    result[index + offset] = mapping;
  });
  return result;
}

function getArgumentsForNormalizationFromColumnMapping(mapping, customTypes, infoForNormalization, schemaSummary, columnStatuses) {
  var transFormedMapping = mapping.map(function (columnType, idx) {
    var additionalInfo = infoForNormalization.get(String(idx));
    var propKey = void 0;

    if (!columnStatuses || columnStatuses.get(idx) !== ITEM_STATUSES.MAPPED_WITH_ERROR) {
      if (columnType === CUSTOM_COLUMN_TYPE_VALUE) {
        var customColumnTypeDefinition = customTypes.get(String(idx));
        propKey = customColumnTypeDefinition && customColumnTypeDefinition.key ? customColumnTypeDefinition.key : undefined;
      } else if (additionalInfo !== SKIP_ADDITIONAL_INFO_VALUE && additionalInfo !== UNDEFINED_ADDITIONAL_INFO_VALUE) {
        propKey = schemaSummary.keysForSimplePropPaths[columnType];
      }

      return propKey;
    }
  });

  var transformedInfoForNormalization = infoForNormalization.reduce(function (remappedByColumnType, additionalInfo, idx) {
    var coloumnKey = schemaSummary.keysForSimplePropPaths[mapping.get(Number(idx))];
    return coloumnKey && additionalInfo !== SKIP_ADDITIONAL_INFO_VALUE && additionalInfo !== UNDEFINED_ADDITIONAL_INFO_VALUE ? remappedByColumnType.set(coloumnKey, additionalInfo) : remappedByColumnType;
  }, Map());

  var customTypeInfos = Map(customTypes.reduce(function (typesDescriptors, customType) {
    typesDescriptors[customType.key] = customType;
    return typesDescriptors;
  }, {}));

  return {
    mapping: transFormedMapping,
    infoForNormalization: transformedInfoForNormalization,
    customTypeInfos: customTypeInfos
  };
}

function getColumnStatuses(numColumns, mapping, infoForNormalization, customTypeDefintion, normalizationResults, preMappedColumnMapping) {
  var errorThreshold = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : COLUMN_MAPPING_ERROR_THRESHOLD;
  var requireOnlyOneRightValueMappedTypes = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];

  var alignedMapping = mapping;
  while (alignedMapping.size < numColumns) {
    alignedMapping = alignedMapping.push(undefined);
  }

  var columnStatuses = void 0;
  var numSamples = normalizationResults.size;
  var errorSummary = getSignalsNormalizationErrorSummary(normalizationResults.toArray());
  if (numSamples > 0) {
    columnStatuses = alignedMapping.map(function (propPath, index) {
      if (preMappedColumnMapping && preMappedColumnMapping.includes(index)) {
        return ITEM_STATUSES.PRE_MAPPED;
      }

      if (propPath === CUSTOM_COLUMN_TYPE_VALUE) {
        var customTypeDef = customTypeDefintion.get(String(index));
        if (customTypeDef == null || customTypeDef.key == null || customTypeDef.key === '') {
          return ITEM_STATUSES.NON_MAPPED;
        }
      }

      var additionalInfo = infoForNormalization.get(String(index));
      if (propPath == null || additionalInfo === UNDEFINED_ADDITIONAL_INFO_VALUE || additionalInfo === SKIP_ADDITIONAL_INFO_VALUE) {
        return ITEM_STATUSES.NON_MAPPED;
      }

      var invalidColumnCounts = (errorSummary.invalidColumns.get(String(index)) || { count: 0 }).count;

      var overTheLimitErrorCount = Math.max(1, Math.round(errorThreshold * numSamples));

      if (invalidColumnCounts < overTheLimitErrorCount || requireOnlyOneRightValueMappedTypes.indexOf(propPath) > -1 && invalidColumnCounts < numSamples) {
        return ITEM_STATUSES.MAPPED_RIGHT;
      } else {
        return ITEM_STATUSES.MAPPED_WITH_ERROR;
      }
    });
  } else {
    columnStatuses = List();
  }

  var mappedRightColumns = 0;
  var mappedWithErrorColumns = 0;
  var nonMappedColumns = 0;
  columnStatuses.forEach(function (status) {
    mappedRightColumns += status === ITEM_STATUSES.MAPPED_RIGHT;
    mappedWithErrorColumns += status === ITEM_STATUSES.MAPPED_WITH_ERROR;
    nonMappedColumns += status === ITEM_STATUSES.NON_MAPPED;
  });

  return {
    mapping: alignedMapping,
    columnStatuses: columnStatuses,
    mappedRightColumns: mappedRightColumns,
    mappedWithErrorColumns: mappedWithErrorColumns,
    nonMappedColumns: nonMappedColumns,
    errorSummary: errorSummary,
    sampleNormalizationResults: normalizationResults
  };
}

function getHumanFriendlyAPIErrorMessage(error) {
  if (error) {
    if (typeof error === 'string') {
      return error;
    } else {
      if (error.error_user_msg) {
        return error.error_user_msg;
      } else {
        return error.message;
      }
    }
  }

  return null;
}

module.exports = {
  arrayToObject: arrayToObject,
  getArgumentsForNormalizationFromColumnMapping: getArgumentsForNormalizationFromColumnMapping,
  getByteLength: getByteLength,
  getColumnStatuses: getColumnStatuses,
  getMappingWithPreset: getMappingWithPreset,
  getPresetValueConfigFromObject: getPresetValueConfigFromObject,
  getPropKeysForTypes: getPropKeysForTypes,
  COLUMN_MAPPING_ERROR_THRESHOLD: COLUMN_MAPPING_ERROR_THRESHOLD,
  getHumanFriendlyAPIErrorMessage: getHumanFriendlyAPIErrorMessage
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var abstractMethod = __webpack_require__(2);

var SignalsUploaderErrorReportGenerator = function () {
  function SignalsUploaderErrorReportGenerator() {
    _classCallCheck(this, SignalsUploaderErrorReportGenerator);
  }

  _createClass(SignalsUploaderErrorReportGenerator, [{
    key: 'initialize',
    value: function initialize() {
      return abstractMethod('SignalsUploaderErrorReportGenerator', 'initialize');
    }
  }, {
    key: 'update',
    value: function update(report, row, normalizationResult, mapping) {
      abstractMethod('SignalsUploaderErrorReportGenerator', 'update');
    }
  }, {
    key: 'merge',
    value: function merge(report1, report2) {
      return abstractMethod('SignalsUploaderErrorReportGenerator', 'merge');
    }
  }]);

  return SignalsUploaderErrorReportGenerator;
}();

module.exports = SignalsUploaderErrorReportGenerator;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsUploaderAdvancedErrorReportGenerator = __webpack_require__(64);
var SignalsUploaderDefaultErrorReportGenerator = __webpack_require__(23);
var SignalsUploaderWLALErrorReportGenerator = __webpack_require__(65);

function createSignalsUploaderErrorReportGenerator(config) {
  switch (config.type) {
    case 'wlal':
      return new SignalsUploaderWLALErrorReportGenerator(config.maxNumInvalidSamples);
    case 'advanced':
      return new SignalsUploaderAdvancedErrorReportGenerator(config.maxNumInvalidSamples);
    case 'default':
    default:
      return new SignalsUploaderDefaultErrorReportGenerator(config.maxNumInvalidSamples);
  }
}

module.exports = createSignalsUploaderErrorReportGenerator;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(90)


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var SignalsValidationUtils = __webpack_require__(0);

var hasProp = SignalsValidationUtils.hasProp;


var PII_SCHEMA_TYPE = 'pii_keys';

function _getSchemaSummary(schema) {
  var parentKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var additionalInfoURL = schema.additionalInfoURL,
      exampleFiles = schema.exampleFiles,
      id = schema.id;


  var allSimplePropKeysInSchema = [];
  var noUISimplePropKeysInSchema = [];
  var extraPropsCollectors = [];
  var schemasForSimplePropsInSchema = {};
  var typesForSimplePropKeys = {};
  var typesForSimplePropPaths = {};
  var keysForSimplePropPaths = {};
  var pathForSimplePropKeys = {};
  var keysForSimplePropsTypesInSchema = {};
  var keysForSubschemasWithID = {};
  var piiKeys = [];
  var subschemasByType = {};

  var pathPrefix = parentKey ? parentKey + '.' : '';

  var type = schema.type;


  if (type != null && schema.id != null) {
    subschemasByType[type] = subschemasByType[type] || [];
    subschemasByType[type].push(schema.id);
  }

  if (schema.props != null && Array.isArray(schema.props)) {
    for (var i = 0; i < schema.props.length; i++) {
      var propSchema = schema.props[i];
      var propKey = propSchema.key;

      if ((typeof propSchema === 'undefined' ? 'undefined' : _typeof(propSchema)) === 'object' && propKey != null) {
        var propSchemaType = propSchema.type;
        var propPath = pathPrefix + propKey;

        if (propSchemaType && propSchemaType.canHaveExtraProps) {
          extraPropsCollectors.push(propPath);
        }

        if ((typeof propSchemaType === 'undefined' ? 'undefined' : _typeof(propSchemaType)) === 'object') {
          (function () {
            var childSummary = _getSchemaSummary(propSchemaType, propKey);

            allSimplePropKeysInSchema.push.apply(allSimplePropKeysInSchema, _toConsumableArray(childSummary.allSimplePropKeysInSchema));
            noUISimplePropKeysInSchema.push.apply(noUISimplePropKeysInSchema, _toConsumableArray(childSummary.noUISimplePropKeysInSchema));

            extraPropsCollectors.push.apply(extraPropsCollectors, _toConsumableArray(childSummary.extraPropsCollectors));
            schemasForSimplePropsInSchema = _extends({}, schemasForSimplePropsInSchema, childSummary.schemasForSimplePropsInSchema);
            typesForSimplePropKeys = _extends({}, typesForSimplePropKeys, childSummary.typesForSimplePropKeys);
            typesForSimplePropPaths = _extends({}, typesForSimplePropPaths, childSummary.typesForSimplePropPaths);
            keysForSimplePropPaths = _extends({}, keysForSimplePropPaths, childSummary.keysForSimplePropPaths);
            pathForSimplePropKeys = _extends({}, pathForSimplePropKeys, childSummary.pathForSimplePropKeys);
            keysForSubschemasWithID = _extends({}, keysForSubschemasWithID, childSummary.keysForSubschemasWithID);

            for (var _type in childSummary.keysForSimplePropsTypesInSchema) {
              if (hasProp(childSummary.keysForSimplePropsTypesInSchema, _type)) {
                var _keysForSimplePropsTy;

                keysForSimplePropsTypesInSchema[_type] = keysForSimplePropsTypesInSchema[_type] || [];
                (_keysForSimplePropsTy = keysForSimplePropsTypesInSchema[_type]).push.apply(_keysForSimplePropsTy, _toConsumableArray(childSummary.keysForSimplePropsTypesInSchema[_type]));
              }
            }

            piiKeys.push.apply(piiKeys, _toConsumableArray(childSummary.piiKeys));

            var typesInChildSummary = Object.keys(childSummary.subschemasByType);

            typesInChildSummary.forEach(function (type) {
              var _subschemasByType$typ;

              subschemasByType[type] = subschemasByType[type] || [];
              (_subschemasByType$typ = subschemasByType[type]).push.apply(_subschemasByType$typ, _toConsumableArray(childSummary.subschemasByType[type]));
            });
          })();
        } else {
          allSimplePropKeysInSchema.push(propKey);

          if (propSchema.noUI) {
            noUISimplePropKeysInSchema.push(propKey);
          }

          schemasForSimplePropsInSchema[propKey] = propSchema;
          typesForSimplePropKeys[propKey] = propSchemaType;
          typesForSimplePropPaths[propPath] = propSchemaType;
          keysForSimplePropPaths[propPath] = propKey;
          pathForSimplePropKeys[propKey] = propPath;

          if (propSchemaType != null) {
            keysForSimplePropsTypesInSchema[propSchemaType] = keysForSimplePropsTypesInSchema[propSchemaType] || [];
            keysForSimplePropsTypesInSchema[propSchemaType].push(propKey);
          }

          if (id != null) {
            keysForSubschemasWithID[id] = keysForSubschemasWithID[id] || [];

            keysForSubschemasWithID[id].push(propKey);
          }

          if (schema.type === PII_SCHEMA_TYPE) {
            piiKeys.push(propKey);
          }
        }
      }
    }
  }

  return {
    id: id,
    additionalInfoURL: additionalInfoURL,
    exampleFiles: exampleFiles,
    allSimplePropKeysInSchema: allSimplePropKeysInSchema,
    noUISimplePropKeysInSchema: noUISimplePropKeysInSchema,
    extraPropsCollectors: extraPropsCollectors,
    schemasForSimplePropsInSchema: schemasForSimplePropsInSchema,
    typesForSimplePropKeys: typesForSimplePropKeys,
    typesForSimplePropPaths: typesForSimplePropPaths,
    keysForSimplePropPaths: keysForSimplePropPaths,
    pathForSimplePropKeys: pathForSimplePropKeys,
    keysForSimplePropsTypesInSchema: keysForSimplePropsTypesInSchema,
    keysForSubschemasWithID: keysForSubschemasWithID,
    piiKeys: piiKeys,
    subschemasByType: subschemasByType,
    validIf: schema.validIf
  };
}

function getSchemaSummary(schema) {
  return _getSchemaSummary(schema);
}

module.exports = getSchemaSummary;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var VALID_CURRENCY_CODES = ['AED', 'ARS', 'AUD', 'BOB', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CZK', 'DKK', 'EUR', 'GBP', 'GTQ', 'HKD', 'HNL', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MOP', 'MXN', 'MYR', 'NIO', 'NOK', 'NZD', 'PEN', 'PHP', 'PLN', 'PYG', 'QAR', 'RON', 'RUB', 'SAR', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'USD', 'UYU', 'VEF', 'VND', 'ZAR'];

module.exports = { VALID_CURRENCY_CODES: VALID_CURRENCY_CODES };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsTimestampNormalizationErrorTypes = __webpack_require__(46);

var normalizeSignalsDateType = __webpack_require__(11);
var normalizeSignalsNumberType = __webpack_require__(13);

var ONE_HOUR_IN_MS = 1 * 60 * 60 * 1000;
var ISO_WITH_TZ_REGEX = /[+-]\d{2}:\d{2}|Z$/;

function normalize(input) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var additionalInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var result = null;
  var wasImplicitTimezone = false;
  var errorType = void 0;

  var rejectTimeBefore = params.rejectTimeBefore;
  var timeFormat = additionalInfo.timeFormat,
      timeZone = additionalInfo.timeZone,
      allowFutureTimes = additionalInfo.allowFutureTimes;


  if (input != null && (typeof input === 'string' || typeof input === 'number')) {
    if (timeFormat == null || timeFormat === 'unix_time') {
      var maybeNum = normalizeSignalsNumberType(input, {
        rejectHashed: true
      }).normalizedValue;

      if (maybeNum != null && typeof maybeNum !== 'string') {
        if (timeFormat === 'unix_time') {
          maybeNum *= 1000;
        }
        result = new Date(maybeNum).getTime();
      }
    } else if (timeFormat === 'ISO8601' && typeof input === 'string') {

      result = new Date(input).getTime();

      wasImplicitTimezone = ISO_WITH_TZ_REGEX.test(input);
    } else {

      var tmpResult = normalizeSignalsDateType(input, { rejectHashed: true }, timeFormat).normalizedValue;

      if (tmpResult != null) {

        var y = tmpResult.slice(0, 4);
        var m = tmpResult.slice(4, 6);
        var d = tmpResult.slice(6, 8);

        result = new Date(y + '-' + m + '-' + d).getTime();
      }
    }
  }

  var now = Date.now();
  if (result != null && (isNaN(result) || allowFutureTimes !== true && result > now || rejectTimeBefore != null && result < now - rejectTimeBefore || result % 1 !== 0)) {
    if (allowFutureTimes !== true && result > now) {
      errorType = SignalsTimestampNormalizationErrorTypes.REJECT_FUTURE;
    }
    if (rejectTimeBefore != null && result < now - rejectTimeBefore) {
      errorType = SignalsTimestampNormalizationErrorTypes.REJECT_TOO_EARLY;
    }
    result = null;
  } else if (result != null && timeZone != null && !wasImplicitTimezone) {
    var timeZoneOffset = normalizeSignalsNumberType(timeZone, {
      rejectHashed: true
    }).normalizedValue;

    if (timeZoneOffset != null && typeof timeZoneOffset === 'number') {
      result -= timeZoneOffset * ONE_HOUR_IN_MS;
    }
  }

  return {
    normalizedValue: result,
    additionalInfo: errorType != null ? { errorType: errorType } : null
  };
}

module.exports = normalize;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var normalizeSignalsNumberType = __webpack_require__(13);
var SignalsValidationUtils = __webpack_require__(0);
var SignalsNumberNormalizationErrorTypes = __webpack_require__(10);

var trim = SignalsValidationUtils.trim;


var CURRENCY_CODES_AND_SYMBOLS = ['ALL', 'AFN', 'ARS', 'AWG', 'AUD', 'AZN', 'BSD', 'BBD', 'BYR', 'BZD', 'BMD', 'BOB', 'BAM', 'BWP', 'BGN', 'BRL', 'BND', 'KHR', 'CAD', 'KYD', 'CLP', 'CNY', 'COP', 'CRC', 'HRK', 'CUP', 'CZK', 'DKK', 'DOP', 'XCD', 'EGP', 'SVC', 'EEK', 'EUR', 'FKP', 'FJD', 'GHC', 'GIP', 'GTQ', 'GGP', 'GYD', 'HNL', 'HKD', 'HUF', 'ISK', 'INR', 'IDR', 'IRR', 'IMP', 'ILS', 'JMD', 'JPY', 'JEP', 'KES', 'KZT', 'KPW', 'KRW', 'KGS', 'LAK', 'LVL', 'LBP', 'LRD', 'LTL', 'MKD', 'MYR', 'MUR', 'MXN', 'MNT', 'MZN', 'NAD', 'NPR', 'ANG', 'NZD', 'NIO', 'NGN', 'NOK', 'OMR', 'PKR', 'PAB', 'PYG', 'PEN', 'PHP', 'PLN', 'QAR', 'RON', 'RUB', 'RMB', 'SHP', 'SAR', 'RSD', 'SCR', 'SGD', 'SBD', 'SOS', 'ZAR', 'LKR', 'SEK', 'CHF', 'SRD', 'SYP', 'TZS', 'TWD', 'THB', 'TTD', 'TRY', 'TRL', 'TVD', 'UGX', 'UAH', 'GBP', 'USD', 'UYU', 'UZS', 'VEF', 'VND', 'YER', 'ZWD', 'L', '\u060B', '$', '\u0192', '\u20BC', 'p.', 'BZ$', 'Bs.', 'KM', 'P', '\u043B\u0432', 'R$', '\u17DB', '\xA5', '\u20A1', 'kn', '\u20B1', 'K\u010D', 'kr', 'RD$', '\xA3', '\u20AC', '\u20B5', 'Q', 'Ft', '\u20B9', 'Rp', '\uFDFC', '\u20AA', 'J$', 'KSh', '\u20A9', '\u20AD', 'Ls', 'Lt', '\u0434\u0435\u043D', 'RM', '\u20A8', '\u20AE', 'MT', 'C$', '\u20A6', 'B/.', 'Gs', 'S/.', 'z\u0142', 'lei', '\u20BD', '\uFFE5', '\u0414\u0438\u043D.', 'S', 'R', 'TSh', 'NT$', '\u0E3F', 'TT$', '\u20BA', '\u20A4', 'USh', '\u20B4', '$U', 'Bs', '\u20AB', 'Z$'];

var DEFAULT_DECIMAL_REPRESENTATION = '.';

function replaceCharAt(str, index, newChar) {
  if (index < 0 || index >= str.length) {
    return str;
  }
  return str.substr(0, index) + newChar + str.substr(index + 1);
}

function i18nNumberNormalize(maybeNumber) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var additionalInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var decimalPointChar = additionalInfo.decimalPointChar != null ? additionalInfo.decimalPointChar : DEFAULT_DECIMAL_REPRESENTATION;
  var standizedNumber = maybeNumber;
  if (decimalPointChar === ',') {
    if (maybeNumber.indexOf('.') !== -1) {
      return {
        normalizedValue: null,
        additionalInfo: {
          errorType: SignalsNumberNormalizationErrorTypes.INVALID_SEPARATOR
        }
      };
    }
    var decimalPointIdx = maybeNumber.lastIndexOf(',');
    standizedNumber = replaceCharAt(maybeNumber, decimalPointIdx, '.');
  } else {
    if (maybeNumber.indexOf(',') !== -1) {
      return {
        normalizedValue: null,
        additionalInfo: {
          errorType: SignalsNumberNormalizationErrorTypes.INVALID_SEPARATOR
        }
      };
    }
  }
  return normalizeSignalsNumberType(standizedNumber, params, additionalInfo);
}

function trimCurrencyNormalize(trimmedInput) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var additionalInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var maybeNumberStartsWithCurrency = CURRENCY_CODES_AND_SYMBOLS.map(function (currency) {
    if (trimmedInput.startsWith(currency) || trimmedInput.toUpperCase().startsWith(currency)) {
      var maybeNumber = trimmedInput.substring(currency.length);
      return i18nNumberNormalize(maybeNumber, params, additionalInfo);
    }
    return { normalizedValue: null };
  });

  var maybeNumberEndsWithCurrency = CURRENCY_CODES_AND_SYMBOLS.map(function (currency) {
    if (trimmedInput.endsWith(currency) || trimmedInput.toUpperCase().endsWith(currency)) {
      var maybeNumber = trimmedInput.substring(0, trimmedInput.length - currency.length);
      return i18nNumberNormalize(maybeNumber, params, additionalInfo);
    }
    return { normalizedValue: null };
  });

  return maybeNumberStartsWithCurrency.concat(maybeNumberEndsWithCurrency);
}

function normalize(input) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var additionalInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    decimalPointChar: DEFAULT_DECIMAL_REPRESENTATION
  };

  var result = null;

  if (input == null || input === '') {
    result = {
      normalizedValue: null,
      additionalInfo: {
        errorType: SignalsNumberNormalizationErrorTypes.EMPTY
      }
    };
    return result;
  }

  if (typeof input === 'string') {
    var normalizedNumberResult = i18nNumberNormalize(input, params, additionalInfo);

    if (normalizedNumberResult.normalizedValue != null || normalizedNumberResult.additionalInfo && normalizedNumberResult.additionalInfo.errorType != null && normalizedNumberResult.additionalInfo.errorType !== SignalsNumberNormalizationErrorTypes.NON_NUMERIC) {
      result = normalizedNumberResult;
    } else {
      var trimmedInput = trim(input);

      if (typeof trimmedInput === 'string') {
        var trimCurrencyNormalizeResult = trimCurrencyNormalize(trimmedInput, params, additionalInfo);

        result = trimCurrencyNormalizeResult.find(function (x) {
          return x.normalizedValue != null;
        });

        if (result == null) {

          result = trimCurrencyNormalizeResult.find(function (x) {
            return x.additionalInfo && x.additionalInfo.errorType && x.additionalInfo.errorType != null;
          });
        }
      }
    }
  }

  return result != null ? result : {
    normalizedValue: null,
    additionalInfo: {
      errorType: SignalsNumberNormalizationErrorTypes.NON_NUMERIC
    }
  };
}

module.exports = normalize;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var sha256 = __webpack_require__(93);
var SignalsValidationUtils = __webpack_require__(0);

var hasProp = SignalsValidationUtils.hasProp,
    looksLikeHashed = SignalsValidationUtils.looksLikeHashed;


function hashIfNotHashed(prop) {
  return !looksLikeHashed(prop) ? sha256(prop) : prop;
}

function processPIISignalBeforeUpload(signal, schema) {
  var nonHashableKeys = schema != null && Array.isArray(schema.props) ? schema.props.filter(function (prop) {
    return prop.typeParams && _typeof(prop.typeParams) === 'object' && (prop.typeParams.rejectHashed === true || prop.typeParams.doNotHash === true);
  }).map(function (prop) {
    return prop.key;
  }) : [];

  for (var key in signal) {
    if (hasProp(signal, key)) {
      var prop = signal[key];
      var propIsToBeRemoved = false;

      switch (key) {

        case 'fn':
          if (typeof prop === 'string' && prop.length && !looksLikeHashed(prop)) {
            signal.fi = sha256(prop.charAt(0));
            signal.f5first = sha256(prop.substring(0, 5));
          }

          break;

        case 'ln':
          if (typeof prop === 'string' && prop.length && !looksLikeHashed(prop)) {
            signal.f5last = sha256(prop.substring(0, 5));
          }

          break;

        case 'dob':
          if (typeof prop === 'string' && !looksLikeHashed(prop)) {
            if (prop.length >= 4) {
              signal.doby = sha256(prop.substring(0, 4));
            }

            if (prop.length >= 6) {
              signal.dobm = sha256(prop.substring(4, 6));
            }

            if (prop.length >= 8) {
              signal.dobd = sha256(prop.substring(6, 8));
            }
          }

          propIsToBeRemoved = true;

          break;

        case 'age':
          if (signal.dob == null && signal.doby == null) {
            signal.doby = sha256(String(new Date().getFullYear() - prop));
          }
          propIsToBeRemoved = true;
      }

      if (nonHashableKeys.indexOf(key) === -1 && !propIsToBeRemoved) {

        signal[key] = Array.isArray(prop) ? prop.map(function (v) {
          return hashIfNotHashed(v);
        }) : hashIfNotHashed(prop);
      }

      if (propIsToBeRemoved) {
        delete signal[key];
      }
    }
  }

  return signal;
}

module.exports = processPIISignalBeforeUpload;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsUploaderErrorReportGenerator = __webpack_require__(15);

var invariant = __webpack_require__(1);

var SignalsUploaderDefaultErrorReportGenerator = function (_SignalsUploaderError) {
  _inherits(SignalsUploaderDefaultErrorReportGenerator, _SignalsUploaderError);

  function SignalsUploaderDefaultErrorReportGenerator(maxNumInvalidSamples) {
    _classCallCheck(this, SignalsUploaderDefaultErrorReportGenerator);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderDefaultErrorReportGenerator.__proto__ || Object.getPrototypeOf(SignalsUploaderDefaultErrorReportGenerator)).call(this));

    _this.__maxNumInvalidSamples = maxNumInvalidSamples;
    return _this;
  }

  _createClass(SignalsUploaderDefaultErrorReportGenerator, [{
    key: 'initialize',
    value: function initialize() {
      return {
        type: 'default',
        invalidSamples: []
      };
    }
  }, {
    key: 'update',
    value: function update(report, row, normalizationResult, mapping) {
      invariant(report.type === 'default', 'Invalid report type.');
      if (normalizationResult.valid || report.invalidSamples.length >= this.__maxNumInvalidSamples || normalizationResult.tree == null) {
        return;
      }
      report.invalidSamples.push(this._getError(row, normalizationResult, mapping));
    }
  }, {
    key: '__getInvalidPropKeys',
    value: function __getInvalidPropKeys(node, invalidPropKeySet) {
      var nodes = node.nodes,
          type = node.type,
          normalizedValue = node.normalizedValue,
          propSchema = node.propSchema;

      if (type === 'compound') {
        for (var propKey in nodes) {
          this.__getInvalidPropKeys(nodes[propKey], invalidPropKeySet);
        }
      } else {
        if (normalizedValue == null && propSchema.key != null) {
          invalidPropKeySet[propSchema.key] = true;
        }
      }
    }
  }, {
    key: '__getInvalidAndEmptyColumns',
    value: function __getInvalidAndEmptyColumns(row, normalizationResult, mapping) {
      var invalidPropSet = {};
      var emptyColumns = [];
      var tree = normalizationResult.tree;

      if (tree != null) {
        this.__getInvalidPropKeys(tree, invalidPropSet);
      }
      for (var index in mapping) {
        var field = row.fields[parseInt(index, 10)];
        var propPath = mapping[index];
        if ((field === '' || field == null) && propPath != null && propPath !== '') {
          var propPathBreakdown = propPath.split('.');
          var propKey = propPathBreakdown[propPathBreakdown.length - 1];
          emptyColumns.push(propKey);
          delete invalidPropSet[propKey];
        }
      }
      return {
        invalidColumns: Object.keys(invalidPropSet),
        emptyColumns: emptyColumns
      };
    }
  }, {
    key: '_getError',
    value: function _getError(row, normalizationResult, mapping) {
      return _extends({
        row: row.lineNumber
      }, this.__getInvalidAndEmptyColumns(row, normalizationResult, mapping));
    }
  }, {
    key: 'merge',
    value: function merge(report1, report2) {
      invariant(report1.type === 'default', 'Invalid report type.');
      invariant(report2.type === 'default', 'Invalid report type.');
      return {
        type: 'default',
        invalidSamples: report1.invalidSamples.concat(report2.invalidSamples).sort(function (a, b) {
          return a.row - b.row;
        }).slice(0, this.__maxNumInvalidSamples)
      };
    }
  }]);

  return SignalsUploaderDefaultErrorReportGenerator;
}(SignalsUploaderErrorReportGenerator);

module.exports = SignalsUploaderDefaultErrorReportGenerator;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var abstractMethod = __webpack_require__(2);

var SignalsUploaderJob = function () {
  function SignalsUploaderJob(postMessageHandler) {
    _classCallCheck(this, SignalsUploaderJob);

    this._postMessageHandler = postMessageHandler;
  }

  _createClass(SignalsUploaderJob, [{
    key: '__postMessageToMainThread',
    value: function __postMessageToMainThread(message) {
      this._postMessageHandler(message);
    }
  }, {
    key: 'onReceiveMessageFromMainThread',
    value: function onReceiveMessageFromMainThread(message) {
      abstractMethod('SignalsUploaderJob', 'onMessage');
    }
  }]);

  return SignalsUploaderJob;
}();

module.exports = SignalsUploaderJob;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsUploaderTask = __webpack_require__(26);

var abstractMethod = __webpack_require__(2);
var createSignalsUploaderWorker = __webpack_require__(31);

var SignalsUploaderSingleWorkerTask = function (_SignalsUploaderTask) {
  _inherits(SignalsUploaderSingleWorkerTask, _SignalsUploaderTask);

  function SignalsUploaderSingleWorkerTask(source, chunkSize, logger) {
    _classCallCheck(this, SignalsUploaderSingleWorkerTask);

    return _possibleConstructorReturn(this, (SignalsUploaderSingleWorkerTask.__proto__ || Object.getPrototypeOf(SignalsUploaderSingleWorkerTask)).call(this, source, chunkSize, logger));
  }

  _createClass(SignalsUploaderSingleWorkerTask, [{
    key: '__initialize',
    value: function __initialize() {
      this._worker = createSignalsUploaderWorker(this.__onReceiveMessageFromWorker.bind(this));
      this.__initializeWorker();
    }
  }, {
    key: '__stop',
    value: function __stop() {
      if (this.__running()) {
        this._worker && this._worker.stop();
      }
      this._worker = null;
    }
  }, {
    key: '__onChunk',
    value: function __onChunk(chunk) {
      if (this.__running()) {
        this._worker && this._worker.postMessage({
          type: 'chunk-ready',
          chunk: chunk
        });
      }
    }
  }, {
    key: '__onEndOfStream',
    value: function __onEndOfStream(endOfStream) {
      if (this.__running()) {
        this._worker && this._worker.postMessage({
          type: 'end-of-stream',
          endOfStream: endOfStream
        });
      }
    }
  }, {
    key: '__postMessageToWorker',
    value: function __postMessageToWorker(message) {
      if (this.__running()) {
        this._worker && this._worker.postMessage(message);
      }
    }
  }, {
    key: '__initializeWorker',
    value: function __initializeWorker() {
      abstractMethod('SignalsUploaderSingleWorkerTask', '__initializeWorker');
    }
  }, {
    key: '__onReceiveMessageFromWorker',
    value: function __onReceiveMessageFromWorker(message) {
      abstractMethod('SignalsUploaderSingleWorkerTask', '__handleJobMessage');
    }
  }]);

  return SignalsUploaderSingleWorkerTask;
}(SignalsUploaderTask);

module.exports = SignalsUploaderSingleWorkerTask;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var abstractMethod = __webpack_require__(2);
var createSignalsUploaderReader = __webpack_require__(81);

var SignalsUploaderTask = function () {
  function SignalsUploaderTask(source, chunkSize, logger) {
    _classCallCheck(this, SignalsUploaderTask);

    this._reader = createSignalsUploaderReader(source, chunkSize);
    this._finishedReading = false;
    this._logger = logger;
  }

  _createClass(SignalsUploaderTask, [{
    key: 'run',
    value: function run() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.__logStart();
        _this._promise = { resolve: resolve, reject: reject };
        _this.__initialize();
        _this.__tryToRead();
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.__stopAndReject(new Error('Task stopped.'));
    }
  }, {
    key: 'getSourceSize',
    value: function getSourceSize() {
      return this._reader.getSize();
    }
  }, {
    key: 'getChunksRequestedFromStream',
    value: function getChunksRequestedFromStream() {
      return this._reader.currentChunk();
    }
  }, {
    key: '__stopAndReject',
    value: function __stopAndReject(error) {
      this.__stop();
      if (this.__running()) {
        this.__logReject(error);
        this._promise && this._promise.reject(error);
      }
      this._promise = null;
    }
  }, {
    key: '__stopAndResolve',
    value: function __stopAndResolve(result) {
      this.__stop();
      if (this.__running()) {
        this.__logResolve(result);
        this._promise && this._promise.resolve(result);
      }
      this._promise = null;
    }
  }, {
    key: '__tryToRead',
    value: function __tryToRead() {
      var _this2 = this;

      if (this._promise == null) {
        return;
      }

      while (this._reader.hasNextChunk() && this.__shouldReadNextChunk()) {
        this._reader.nextChunk().then(function (chunk) {
          if (_this2.__running()) {
            _this2.__onChunk(chunk);
          }
        }).catch(function (error) {
          return _this2.__stopAndReject(error);
        });
      }

      if (!this._reader.hasNextChunk()) {
        if (!this._finishedReading) {
          this._finishedReading = true;
          if (this.__running()) {
            this.__onEndOfStream({ position: this._reader.currentPosition() });
          }
        }
        return;
      }
    }
  }, {
    key: '__running',
    value: function __running() {
      return this._promise != null;
    }
  }, {
    key: '__logEvent',
    value: function __logEvent(eventName) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this._logger && this._logger.logEvent(eventName, data);
    }
  }, {
    key: '__logError',
    value: function __logError(eventName, error) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      this._logger && this._logger.logError(eventName, error, data);
    }
  }, {
    key: '__logStart',
    value: function __logStart() {}
  }, {
    key: '__logResolve',
    value: function __logResolve(result) {}
  }, {
    key: '__logReject',
    value: function __logReject(error) {}
  }, {
    key: '__initialize',
    value: function __initialize() {
      abstractMethod('SignalsUploaderTask', '__initialize');
    }
  }, {
    key: '__stop',
    value: function __stop() {
      abstractMethod('SignalsUploaderTask', '__stop');
    }
  }, {
    key: '__shouldReadNextChunk',
    value: function __shouldReadNextChunk() {
      return abstractMethod('SignalsUploaderTask', '__shouldReadNextChunk');
    }
  }, {
    key: '__onChunk',
    value: function __onChunk(chunk) {
      abstractMethod('SignalsUploaderTask', '__onChunk');
    }
  }, {
    key: '__onEndOfStream',
    value: function __onEndOfStream(endOfStream) {
      abstractMethod('SignalsUploaderTask', '__onEndOfStream');
    }
  }]);

  return SignalsUploaderTask;
}();

module.exports = SignalsUploaderTask;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getByPath(root, path, fallbackValue) {
  var current = root;
  for (var i = 0; i < path.length; i++) {
    var segment = path[i];

    if (current && typeof current !== 'string' && typeof current !== 'number' && segment in current) {
      current = current[segment];
    } else {
      return fallbackValue;
    }
  }
  return current;
}

module.exports = getByPath;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.freeze({ "ANY": "any", "BOOL": "bool", "CURRENCY_CODE": "currency_code", "DATE": "date", "DATE_MONTH": "date_month", "EMAIL": "email", "ENUM": "enum", "FBID": "fbid", "JSON_LIST": "json_list", "LIST": "LIST", "NUMBER": "number", "PHONE_NUMBER": "phone_number", "POSTAL_CODE": "postal_code", "SHA256": "sha256", "STRING": "string", "TIMESTAMP": "timestamp", "UNIX_TIME": "unix_time", "VALUE": "value" });

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.freeze({ "REJECT": "reject", "WARNING": "warning" });

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.freeze({ "INVALID": "invalid", "TOO_MANY": "too-many", "SOME_INVALID": "some-invalid" });

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsUploaderUIWorker = __webpack_require__(76);

function createSignalsUploaderWorker(handler) {
  return new SignalsUploaderUIWorker(handler);
}

module.exports = createSignalsUploaderWorker;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var domain;
var hasSetImmediate = typeof setImmediate === "function";









module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
   
    queue[queue.length] = task;
}

var queue = [];


var flushing = false;



var index = 0;



var capacity = 1024;







function flush() {
    while (index < queue.length) {
        var currentIndex = index;
       
       
        index = index + 1;
        queue[currentIndex].call();
       
       
       
       
       
        if (index > capacity) {
           
           
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

rawAsap.requestFlush = requestFlush;
function requestFlush() {
   
   
   
    var parentDomain = process.domain;
    if (parentDomain) {
        if (!domain) {
           
           
            domain = __webpack_require__(94);
        }
        domain.active = process.domain = null;
    }

   
   
   
   
   
   
    if (flushing && hasSetImmediate) {
        setImmediate(flush);
    } else {
        process.nextTick(flush);
    }

    if (parentDomain) {
        domain.active = process.domain = parentDomain;
    }
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1;
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var invariant = __webpack_require__(33);

var keyMirror = function keyMirror(obj) {
  var ret = {};
  var key;
  !(obj instanceof Object && !Array.isArray(obj)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : void 0;
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Immutable = factory());
}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

  function createClass(ctor, superClass) {
    if (superClass) {
      ctor.prototype = Object.create(superClass.prototype);
    }
    ctor.prototype.constructor = ctor;
  }

  function Iterable(value) {
      return isIterable(value) ? value : Seq(value);
    }


  createClass(KeyedIterable, Iterable);
    function KeyedIterable(value) {
      return isKeyed(value) ? value : KeyedSeq(value);
    }


  createClass(IndexedIterable, Iterable);
    function IndexedIterable(value) {
      return isIndexed(value) ? value : IndexedSeq(value);
    }


  createClass(SetIterable, Iterable);
    function SetIterable(value) {
      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
    }



  function isIterable(maybeIterable) {
    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
  }

  function isKeyed(maybeKeyed) {
    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
  }

  function isIndexed(maybeIndexed) {
    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  function isOrdered(maybeOrdered) {
    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
  }

  Iterable.isIterable = isIterable;
  Iterable.isKeyed = isKeyed;
  Iterable.isIndexed = isIndexed;
  Iterable.isAssociative = isAssociative;
  Iterable.isOrdered = isOrdered;

  Iterable.Keyed = KeyedIterable;
  Iterable.Indexed = IndexedIterable;
  Iterable.Set = SetIterable;


  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

 
  var DELETE = 'delete';

 
  var SHIFT = 5;
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

 
 
  var NOT_SET = {};

 
  var CHANGE_LENGTH = { value: false };
  var DID_ALTER = { value: false };

  function MakeRef(ref) {
    ref.value = false;
    return ref;
  }

  function SetRef(ref) {
    ref && (ref.value = true);
  }

 
 
 
  function OwnerID() {}

 
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
   
   
   
   
   
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0;
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (begin === 0 || (size !== undefined && begin <= -size)) &&
      (end === undefined || (size !== undefined && end >= size));
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    return index === undefined ?
      defaultIndex :
      index < 0 ?
        Math.max(0, size + index) :
        size === undefined ?
          index :
          Math.min(size, index);
  }

    var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


  function Iterator(next) {
      this.next = next;
    }

    Iterator.prototype.toString = function() {
      return '[Iterator]';
    };


  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect =
  Iterator.prototype.toSource = function () { return this.toString(); }
  Iterator.prototype[ITERATOR_SYMBOL] = function () {
    return this;
  };


  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
      value: value, done: false
    });
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (
      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
      iterable[FAUX_ITERATOR_SYMBOL]
    );
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  function isArrayLike(value) {
    return value && typeof value.length === 'number';
  }

  createClass(Seq, Iterable);
    function Seq(value) {
      return value === null || value === undefined ? emptySequence() :
        isIterable(value) ? value.toSeq() : seqFromValue(value);
    }

    Seq.of = function() {
      return Seq(arguments);
    };

    Seq.prototype.toSeq = function() {
      return this;
    };

    Seq.prototype.toString = function() {
      return this.__toString('Seq {', '}');
    };

    Seq.prototype.cacheResult = function() {
      if (!this._cache && this.__iterateUncached) {
        this._cache = this.entrySeq().toArray();
        this.size = this._cache.length;
      }
      return this;
    };

   

    Seq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, true);
    };

   

    Seq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, true);
    };



  createClass(KeyedSeq, Seq);
    function KeyedSeq(value) {
      return value === null || value === undefined ?
        emptySequence().toKeyedSeq() :
        isIterable(value) ?
          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
          keyedSeqFromValue(value);
    }

    KeyedSeq.prototype.toKeyedSeq = function() {
      return this;
    };



  createClass(IndexedSeq, Seq);
    function IndexedSeq(value) {
      return value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
    }

    IndexedSeq.of = function() {
      return IndexedSeq(arguments);
    };

    IndexedSeq.prototype.toIndexedSeq = function() {
      return this;
    };

    IndexedSeq.prototype.toString = function() {
      return this.__toString('Seq [', ']');
    };

    IndexedSeq.prototype.__iterate = function(fn, reverse) {
      return seqIterate(this, fn, reverse, false);
    };

    IndexedSeq.prototype.__iterator = function(type, reverse) {
      return seqIterator(this, type, reverse, false);
    };



  createClass(SetSeq, Seq);
    function SetSeq(value) {
      return (
        value === null || value === undefined ? emptySequence() :
        !isIterable(value) ? indexedSeqFromValue(value) :
        isKeyed(value) ? value.entrySeq() : value
      ).toSetSeq();
    }

    SetSeq.of = function() {
      return SetSeq(arguments);
    };

    SetSeq.prototype.toSetSeq = function() {
      return this;
    };



  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

  Seq.prototype[IS_SEQ_SENTINEL] = true;



  createClass(ArraySeq, IndexedSeq);
    function ArraySeq(array) {
      this._array = array;
      this.size = array.length;
    }

    ArraySeq.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
    };

    ArraySeq.prototype.__iterate = function(fn, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ArraySeq.prototype.__iterator = function(type, reverse) {
      var array = this._array;
      var maxIndex = array.length - 1;
      var ii = 0;
      return new Iterator(function() 
        {return ii > maxIndex ?
          iteratorDone() :
          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
      );
    };



  createClass(ObjectSeq, KeyedSeq);
    function ObjectSeq(object) {
      var keys = Object.keys(object);
      this._object = object;
      this._keys = keys;
      this.size = keys.length;
    }

    ObjectSeq.prototype.get = function(key, notSetValue) {
      if (notSetValue !== undefined && !this.has(key)) {
        return notSetValue;
      }
      return this._object[key];
    };

    ObjectSeq.prototype.has = function(key) {
      return this._object.hasOwnProperty(key);
    };

    ObjectSeq.prototype.__iterate = function(fn, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var key = keys[reverse ? maxIndex - ii : ii];
        if (fn(object[key], key, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    ObjectSeq.prototype.__iterator = function(type, reverse) {
      var object = this._object;
      var keys = this._keys;
      var maxIndex = keys.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var key = keys[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, key, object[key]);
      });
    };

  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(IterableSeq, IndexedSeq);
    function IterableSeq(iterable) {
      this._iterable = iterable;
      this.size = iterable.length || iterable.size;
    }

    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      var iterations = 0;
      if (isIterator(iterator)) {
        var step;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this) === false) {
            break;
          }
        }
      }
      return iterations;
    };

    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterable = this._iterable;
      var iterator = getIterator(iterable);
      if (!isIterator(iterator)) {
        return new Iterator(iteratorDone);
      }
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value);
      });
    };



  createClass(IteratorSeq, IndexedSeq);
    function IteratorSeq(iterator) {
      this._iterator = iterator;
      this._iteratorCache = [];
    }

    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      while (iterations < cache.length) {
        if (fn(cache[iterations], iterations++, this) === false) {
          return iterations;
        }
      }
      var step;
      while (!(step = iterator.next()).done) {
        var val = step.value;
        cache[iterations] = val;
        if (fn(val, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };

    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = this._iterator;
      var cache = this._iteratorCache;
      var iterations = 0;
      return new Iterator(function()  {
        if (iterations >= cache.length) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          cache[iterations] = step.value;
        }
        return iteratorValue(type, iterations, cache[iterations++]);
      });
    };




 

  function isSeq(maybeSeq) {
    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
  }

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq =
      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
      typeof value === 'object' ? new ObjectSeq(value) :
      undefined;
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of [k, v] entries, '+
        'or keyed object: ' + value
      );
    }
    return seq;
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values: ' + value
      );
    }
    return seq;
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value) ||
      (typeof value === 'object' && new ObjectSeq(value));
    if (!seq) {
      throw new TypeError(
        'Expected Array or iterable object of values, or keyed object: ' + value
      );
    }
    return seq;
  }

  function maybeIndexedSeqFromValue(value) {
    return (
      isArrayLike(value) ? new ArraySeq(value) :
      isIterator(value) ? new IteratorSeq(value) :
      hasIterator(value) ? new IterableSeq(value) :
      undefined
    );
  }

  function seqIterate(seq, fn, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      for (var ii = 0; ii <= maxIndex; ii++) {
        var entry = cache[reverse ? maxIndex - ii : ii];
        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
          return ii + 1;
        }
      }
      return ii;
    }
    return seq.__iterateUncached(fn, reverse);
  }

  function seqIterator(seq, type, reverse, useKeys) {
    var cache = seq._cache;
    if (cache) {
      var maxIndex = cache.length - 1;
      var ii = 0;
      return new Iterator(function()  {
        var entry = cache[reverse ? maxIndex - ii : ii];
        return ii++ > maxIndex ?
          iteratorDone() :
          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
      });
    }
    return seq.__iteratorUncached(type, reverse);
  }

  function fromJS(json, converter) {
    return converter ?
      fromJSWith(converter, json, '', {'': json}) :
      fromJSDefault(json);
  }

  function fromJSWith(converter, json, key, parentJSON) {
    if (Array.isArray(json)) {
      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    if (isPlainObj(json)) {
      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
    }
    return json;
  }

  function fromJSDefault(json) {
    if (Array.isArray(json)) {
      return IndexedSeq(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
      return KeyedSeq(json).map(fromJSDefault).toMap();
    }
    return json;
  }

  function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
  }

    function is(valueA, valueB) {
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === 'function' &&
        typeof valueB.valueOf === 'function') {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    if (typeof valueA.equals === 'function' &&
        typeof valueB.equals === 'function' &&
        valueA.equals(valueB)) {
      return true;
    }
    return false;
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (
      !isIterable(b) ||
      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
      isKeyed(a) !== isKeyed(b) ||
      isIndexed(a) !== isIndexed(b) ||
      isOrdered(a) !== isOrdered(b)
    ) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return b.every(function(v, k)  {
        var entry = entries.next().value;
        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function(v, k)  {
      if (notAssociative ? !a.has(v) :
          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  createClass(Repeat, IndexedSeq);

    function Repeat(value, times) {
      if (!(this instanceof Repeat)) {
        return new Repeat(value, times);
      }
      this._value = value;
      this.size = times === undefined ? Infinity : Math.max(0, times);
      if (this.size === 0) {
        if (EMPTY_REPEAT) {
          return EMPTY_REPEAT;
        }
        EMPTY_REPEAT = this;
      }
    }

    Repeat.prototype.toString = function() {
      if (this.size === 0) {
        return 'Repeat []';
      }
      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
    };

    Repeat.prototype.get = function(index, notSetValue) {
      return this.has(index) ? this._value : notSetValue;
    };

    Repeat.prototype.includes = function(searchValue) {
      return is(this._value, searchValue);
    };

    Repeat.prototype.slice = function(begin, end) {
      var size = this.size;
      return wholeSlice(begin, end, size) ? this :
        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
    };

    Repeat.prototype.reverse = function() {
      return this;
    };

    Repeat.prototype.indexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return 0;
      }
      return -1;
    };

    Repeat.prototype.lastIndexOf = function(searchValue) {
      if (is(this._value, searchValue)) {
        return this.size;
      }
      return -1;
    };

    Repeat.prototype.__iterate = function(fn, reverse) {
      for (var ii = 0; ii < this.size; ii++) {
        if (fn(this._value, ii, this) === false) {
          return ii + 1;
        }
      }
      return ii;
    };

    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
      var ii = 0;
      return new Iterator(function() 
        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
      );
    };

    Repeat.prototype.equals = function(other) {
      return other instanceof Repeat ?
        is(this._value, other._value) :
        deepEqual(other);
    };


  var EMPTY_REPEAT;

  function invariant(condition, error) {
    if (!condition) throw new Error(error);
  }

  createClass(Range, IndexedSeq);

    function Range(start, end, step) {
      if (!(this instanceof Range)) {
        return new Range(start, end, step);
      }
      invariant(step !== 0, 'Cannot step a Range by 0');
      start = start || 0;
      if (end === undefined) {
        end = Infinity;
      }
      step = step === undefined ? 1 : Math.abs(step);
      if (end < start) {
        step = -step;
      }
      this._start = start;
      this._end = end;
      this._step = step;
      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
      if (this.size === 0) {
        if (EMPTY_RANGE) {
          return EMPTY_RANGE;
        }
        EMPTY_RANGE = this;
      }
    }

    Range.prototype.toString = function() {
      if (this.size === 0) {
        return 'Range []';
      }
      return 'Range [ ' +
        this._start + '...' + this._end +
        (this._step !== 1 ? ' by ' + this._step : '') +
      ' ]';
    };

    Range.prototype.get = function(index, notSetValue) {
      return this.has(index) ?
        this._start + wrapIndex(this, index) * this._step :
        notSetValue;
    };

    Range.prototype.includes = function(searchValue) {
      var possibleIndex = (searchValue - this._start) / this._step;
      return possibleIndex >= 0 &&
        possibleIndex < this.size &&
        possibleIndex === Math.floor(possibleIndex);
    };

    Range.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      begin = resolveBegin(begin, this.size);
      end = resolveEnd(end, this.size);
      if (end <= begin) {
        return new Range(0, 0);
      }
      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
    };

    Range.prototype.indexOf = function(searchValue) {
      var offsetValue = searchValue - this._start;
      if (offsetValue % this._step === 0) {
        var index = offsetValue / this._step;
        if (index >= 0 && index < this.size) {
          return index
        }
      }
      return -1;
    };

    Range.prototype.lastIndexOf = function(searchValue) {
      return this.indexOf(searchValue);
    };

    Range.prototype.__iterate = function(fn, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      for (var ii = 0; ii <= maxIndex; ii++) {
        if (fn(value, ii, this) === false) {
          return ii + 1;
        }
        value += reverse ? -step : step;
      }
      return ii;
    };

    Range.prototype.__iterator = function(type, reverse) {
      var maxIndex = this.size - 1;
      var step = this._step;
      var value = reverse ? this._start + maxIndex * step : this._start;
      var ii = 0;
      return new Iterator(function()  {
        var v = value;
        value += reverse ? -step : step;
        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
      });
    };

    Range.prototype.equals = function(other) {
      return other instanceof Range ?
        this._start === other._start &&
        this._end === other._end &&
        this._step === other._step :
        deepEqual(this, other);
    };


  var EMPTY_RANGE;

  createClass(Collection, Iterable);
    function Collection() {
      throw TypeError('Abstract');
    }


  createClass(KeyedCollection, Collection);function KeyedCollection() {}

  createClass(IndexedCollection, Collection);function IndexedCollection() {}

  createClass(SetCollection, Collection);function SetCollection() {}


  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var imul =
    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
    Math.imul :
    function imul(a, b) {
      a = a | 0;
      b = b | 0;
      var c = a & 0xffff;
      var d = b & 0xffff;
     
      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0;
    };

 
 
 
 
  function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o;
    if (type === 'number') {
      if (o !== o || o === Infinity) {
        return 0;
      }
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xFFFFFFFF;
      }
      while (o > 0xFFFFFFFF) {
        o /= 0xFFFFFFFF;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      return o.hashCode();
    }
    if (type === 'object') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hash = stringHashCache[string];
    if (hash === undefined) {
      hash = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hash;
    }
    return hash;
  }

 
  function hashString(string) {
   
   
   
   
   
   
    var hash = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hash = 31 * hash + string.charCodeAt(ii) | 0;
    }
    return smi(hash);
  }

  function hashJSObj(obj) {
    var hash;
    if (usingWeakMap) {
      hash = weakMap.get(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = obj[UID_HASH_KEY];
    if (hash !== undefined) {
      return hash;
    }

    if (!canDefineProperty) {
      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hash !== undefined) {
        return hash;
      }

      hash = getIENodeHash(obj);
      if (hash !== undefined) {
        return hash;
      }
    }

    hash = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hash);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        'enumerable': false,
        'configurable': false,
        'writable': false,
        'value': hash
      });
    } else if (obj.propertyIsEnumerable !== undefined &&
               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
     
     
     
     
      obj.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
    } else if (obj.nodeType !== undefined) {
     
     
     
     
      obj[UID_HASH_KEY] = hash;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hash;
  }

 
  var isExtensible = Object.isExtensible;

 
  var canDefineProperty = (function() {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  }());

 
 
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1:
          return node.uniqueID;
        case 9:
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

 
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  function assertNotInfinite(size) {
    invariant(
      size !== Infinity,
      'Cannot perform this action with an infinite size.'
    );
  }

  createClass(Map, KeyedCollection);

   

    function Map(value) {
      return value === null || value === undefined ? emptyMap() :
        isMap(value) && !isOrdered(value) ? value :
        emptyMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    Map.of = function() {var keyValues = SLICE$0.call(arguments, 0);
      return emptyMap().withMutations(function(map ) {
        for (var i = 0; i < keyValues.length; i += 2) {
          if (i + 1 >= keyValues.length) {
            throw new Error('Missing value for key: ' + keyValues[i]);
          }
          map.set(keyValues[i], keyValues[i + 1]);
        }
      });
    };

    Map.prototype.toString = function() {
      return this.__toString('Map {', '}');
    };

   

    Map.prototype.get = function(k, notSetValue) {
      return this._root ?
        this._root.get(0, undefined, k, notSetValue) :
        notSetValue;
    };

   

    Map.prototype.set = function(k, v) {
      return updateMap(this, k, v);
    };

    Map.prototype.setIn = function(keyPath, v) {
      return this.updateIn(keyPath, NOT_SET, function()  {return v});
    };

    Map.prototype.remove = function(k) {
      return updateMap(this, k, NOT_SET);
    };

    Map.prototype.deleteIn = function(keyPath) {
      return this.updateIn(keyPath, function()  {return NOT_SET});
    };

    Map.prototype.update = function(k, notSetValue, updater) {
      return arguments.length === 1 ?
        k(this) :
        this.updateIn([k], notSetValue, updater);
    };

    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
      if (!updater) {
        updater = notSetValue;
        notSetValue = undefined;
      }
      var updatedValue = updateInDeepMap(
        this,
        forceIterator(keyPath),
        notSetValue,
        updater
      );
      return updatedValue === NOT_SET ? undefined : updatedValue;
    };

    Map.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._root = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyMap();
    };

   

    Map.prototype.merge = function() {
      return mergeIntoMapWith(this, undefined, arguments);
    };

    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, merger, iters);
    };

    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.merge === 'function' ?
          m.merge.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.mergeDeep = function() {
      return mergeIntoMapWith(this, deepMerger, arguments);
    };

    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
    };

    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
      return this.updateIn(
        keyPath,
        emptyMap(),
        function(m ) {return typeof m.mergeDeep === 'function' ?
          m.mergeDeep.apply(m, iters) :
          iters[iters.length - 1]}
      );
    };

    Map.prototype.sort = function(comparator) {
     
      return OrderedMap(sortFactory(this, comparator));
    };

    Map.prototype.sortBy = function(mapper, comparator) {
     
      return OrderedMap(sortFactory(this, comparator, mapper));
    };

   

    Map.prototype.withMutations = function(fn) {
      var mutable = this.asMutable();
      fn(mutable);
      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
    };

    Map.prototype.asMutable = function() {
      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
    };

    Map.prototype.asImmutable = function() {
      return this.__ensureOwner();
    };

    Map.prototype.wasAltered = function() {
      return this.__altered;
    };

    Map.prototype.__iterator = function(type, reverse) {
      return new MapIterator(this, type, reverse);
    };

    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      this._root && this._root.iterate(function(entry ) {
        iterations++;
        return fn(entry[1], entry[0], this$0);
      }, reverse);
      return iterations;
    };

    Map.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeMap(this.size, this._root, ownerID, this.__hash);
    };


  function isMap(maybeMap) {
    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
  }

  Map.isMap = isMap;

  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SENTINEL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeIn = MapPrototype.deleteIn;


 



    function ArrayMapNode(ownerID, entries) {
      this.ownerID = ownerID;
      this.entries = entries;
    }

    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && entries.length === 1) {
        return;
      }

      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
        return createNodes(ownerID, entries, key, value);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new ArrayMapNode(ownerID, newEntries);
    };




    function BitmapIndexedNode(ownerID, bitmap, nodes) {
      this.ownerID = ownerID;
      this.bitmap = bitmap;
      this.nodes = nodes;
    }

    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
      var bitmap = this.bitmap;
      return (bitmap & bit) === 0 ? notSetValue :
        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
    };

    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var bit = 1 << keyHashFrag;
      var bitmap = this.bitmap;
      var exists = (bitmap & bit) !== 0;

      if (!exists && value === NOT_SET) {
        return this;
      }

      var idx = popCount(bitmap & (bit - 1));
      var nodes = this.nodes;
      var node = exists ? nodes[idx] : undefined;
      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

      if (newNode === node) {
        return this;
      }

      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
      }

      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
        return nodes[idx ^ 1];
      }

      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
        return newNode;
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
      var newNodes = exists ? newNode ?
        setIn(nodes, idx, newNode, isEditable) :
        spliceOut(nodes, idx, isEditable) :
        spliceIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.bitmap = newBitmap;
        this.nodes = newNodes;
        return this;
      }

      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
    };




    function HashArrayMapNode(ownerID, count, nodes) {
      this.ownerID = ownerID;
      this.count = count;
      this.nodes = nodes;
    }

    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var node = this.nodes[idx];
      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
    };

    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }
      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
      var removed = value === NOT_SET;
      var nodes = this.nodes;
      var node = nodes[idx];

      if (removed && !node) {
        return this;
      }

      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
      if (newNode === node) {
        return this;
      }

      var newCount = this.count;
      if (!node) {
        newCount++;
      } else if (!newNode) {
        newCount--;
        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
          return packNodes(ownerID, nodes, newCount, idx);
        }
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newNodes = setIn(nodes, idx, newNode, isEditable);

      if (isEditable) {
        this.count = newCount;
        this.nodes = newNodes;
        return this;
      }

      return new HashArrayMapNode(ownerID, newCount, newNodes);
    };




    function HashCollisionNode(ownerID, keyHash, entries) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entries = entries;
    }

    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      var entries = this.entries;
      for (var ii = 0, len = entries.length; ii < len; ii++) {
        if (is(key, entries[ii][0])) {
          return entries[ii][1];
        }
      }
      return notSetValue;
    };

    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      if (keyHash === undefined) {
        keyHash = hash(key);
      }

      var removed = value === NOT_SET;

      if (keyHash !== this.keyHash) {
        if (removed) {
          return this;
        }
        SetRef(didAlter);
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
      }

      var entries = this.entries;
      var idx = 0;
      for (var len = entries.length; idx < len; idx++) {
        if (is(key, entries[idx][0])) {
          break;
        }
      }
      var exists = idx < len;

      if (exists ? entries[idx][1] === value : removed) {
        return this;
      }

      SetRef(didAlter);
      (removed || !exists) && SetRef(didChangeSize);

      if (removed && len === 2) {
        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
      }

      var isEditable = ownerID && ownerID === this.ownerID;
      var newEntries = isEditable ? entries : arrCopy(entries);

      if (exists) {
        if (removed) {
          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
        } else {
          newEntries[idx] = [key, value];
        }
      } else {
        newEntries.push([key, value]);
      }

      if (isEditable) {
        this.entries = newEntries;
        return this;
      }

      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
    };




    function ValueNode(ownerID, keyHash, entry) {
      this.ownerID = ownerID;
      this.keyHash = keyHash;
      this.entry = entry;
    }

    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
    };

    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
      var removed = value === NOT_SET;
      var keyMatch = is(key, this.entry[0]);
      if (keyMatch ? value === this.entry[1] : removed) {
        return this;
      }

      SetRef(didAlter);

      if (removed) {
        SetRef(didChangeSize);
        return;
      }

      if (keyMatch) {
        if (ownerID && ownerID === this.ownerID) {
          this.entry[1] = value;
          return this;
        }
        return new ValueNode(ownerID, this.keyHash, [key, value]);
      }

      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
    };



 

  ArrayMapNode.prototype.iterate =
  HashCollisionNode.prototype.iterate = function (fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  }

  BitmapIndexedNode.prototype.iterate =
  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  }

  ValueNode.prototype.iterate = function (fn, reverse) {
    return fn(this.entry);
  }

  createClass(MapIterator, Iterator);

    function MapIterator(map, type, reverse) {
      this._type = type;
      this._reverse = reverse;
      this._stack = map._root && mapIteratorFrame(map._root);
    }

    MapIterator.prototype.next = function() {
      var type = this._type;
      var stack = this._stack;
      while (stack) {
        var node = stack.node;
        var index = stack.index++;
        var maxIndex;
        if (node.entry) {
          if (index === 0) {
            return mapIteratorValue(type, node.entry);
          }
        } else if (node.entries) {
          maxIndex = node.entries.length - 1;
          if (index <= maxIndex) {
            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
          }
        } else {
          maxIndex = node.nodes.length - 1;
          if (index <= maxIndex) {
            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
            if (subNode) {
              if (subNode.entry) {
                return mapIteratorValue(type, subNode.entry);
              }
              stack = this._stack = mapIteratorFrame(subNode, stack);
            }
            continue;
          }
        }
        stack = this._stack = this._stack.__prev;
      }
      return iteratorDone();
    };


  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev
    };
  }

  function makeMap(size, root, ownerID, hash) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef(CHANGE_LENGTH);
      var didAlter = MakeRef(DID_ALTER);
      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }

  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes = idx1 === idx2 ?
      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function mergeIntoMapWith(map, merger, iterables) {
    var iters = [];
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = KeyedIterable(value);
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    return mergeIntoCollectionWith(map, merger, iters);
  }

  function deepMerger(existing, value, key) {
    return existing && existing.mergeDeep && isIterable(value) ?
      existing.mergeDeep(value) :
      is(existing, value) ? existing : value;
  }

  function deepMergerWith(merger) {
    return function(existing, value, key)  {
      if (existing && existing.mergeDeepWith && isIterable(value)) {
        return existing.mergeDeepWith(merger, value);
      }
      var nextValue = merger(existing, value, key);
      return is(existing, nextValue) ? existing : nextValue;
    };
  }

  function mergeIntoCollectionWith(collection, merger, iters) {
    iters = iters.filter(function(x ) {return x.size !== 0});
    if (iters.length === 0) {
      return collection;
    }
    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function(collection ) {
      var mergeIntoMap = merger ?
        function(value, key)  {
          collection.update(key, NOT_SET, function(existing )
            {return existing === NOT_SET ? value : merger(existing, value, key)}
          );
        } :
        function(value, key)  {
          collection.set(key, value);
        }
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoMap);
      }
    });
  }

  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
    var isNotSet = existing === NOT_SET;
    var step = keyPathIter.next();
    if (step.done) {
      var existingValue = isNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    invariant(
      isNotSet || (existing && existing.set),
      'invalid keyPath'
    );
    var key = step.value;
    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
    var nextUpdated = updateInDeepMap(
      nextExisting,
      keyPathIter,
      notSetValue,
      updater
    );
    return nextUpdated === nextExisting ? existing :
      nextUpdated === NOT_SET ? existing.remove(key) :
      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
  }

  function popCount(x) {
    x = x - ((x >> 1) & 0x55555555);
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
    x = (x + (x >> 4)) & 0x0f0f0f0f;
    x = x + (x >> 8);
    x = x + (x >> 16);
    return x & 0x7f;
  }

  function setIn(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  createClass(List, IndexedCollection);

   

    function List(value) {
      var empty = emptyList();
      if (value === null || value === undefined) {
        return empty;
      }
      if (isList(value)) {
        return value;
      }
      var iter = IndexedIterable(value);
      var size = iter.size;
      if (size === 0) {
        return empty;
      }
      assertNotInfinite(size);
      if (size > 0 && size < SIZE) {
        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
      }
      return empty.withMutations(function(list ) {
        list.setSize(size);
        iter.forEach(function(v, i)  {return list.set(i, v)});
      });
    }

    List.of = function() {
      return this(arguments);
    };

    List.prototype.toString = function() {
      return this.__toString('List [', ']');
    };

   

    List.prototype.get = function(index, notSetValue) {
      index = wrapIndex(this, index);
      if (index >= 0 && index < this.size) {
        index += this._origin;
        var node = listNodeFor(this, index);
        return node && node.array[index & MASK];
      }
      return notSetValue;
    };

   

    List.prototype.set = function(index, value) {
      return updateList(this, index, value);
    };

    List.prototype.remove = function(index) {
      return !this.has(index) ? this :
        index === 0 ? this.shift() :
        index === this.size - 1 ? this.pop() :
        this.splice(index, 1);
    };

    List.prototype.insert = function(index, value) {
      return this.splice(index, 0, value);
    };

    List.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = this._origin = this._capacity = 0;
        this._level = SHIFT;
        this._root = this._tail = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyList();
    };

    List.prototype.push = function() {
      var values = arguments;
      var oldSize = this.size;
      return this.withMutations(function(list ) {
        setListBounds(list, 0, oldSize + values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(oldSize + ii, values[ii]);
        }
      });
    };

    List.prototype.pop = function() {
      return setListBounds(this, 0, -1);
    };

    List.prototype.unshift = function() {
      var values = arguments;
      return this.withMutations(function(list ) {
        setListBounds(list, -values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(ii, values[ii]);
        }
      });
    };

    List.prototype.shift = function() {
      return setListBounds(this, 1);
    };

   

    List.prototype.merge = function() {
      return mergeIntoListWith(this, undefined, arguments);
    };

    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, merger, iters);
    };

    List.prototype.mergeDeep = function() {
      return mergeIntoListWith(this, deepMerger, arguments);
    };

    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return mergeIntoListWith(this, deepMergerWith(merger), iters);
    };

    List.prototype.setSize = function(size) {
      return setListBounds(this, 0, size);
    };

   

    List.prototype.slice = function(begin, end) {
      var size = this.size;
      if (wholeSlice(begin, end, size)) {
        return this;
      }
      return setListBounds(
        this,
        resolveBegin(begin, size),
        resolveEnd(end, size)
      );
    };

    List.prototype.__iterator = function(type, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      return new Iterator(function()  {
        var value = values();
        return value === DONE ?
          iteratorDone() :
          iteratorValue(type, index++, value);
      });
    };

    List.prototype.__iterate = function(fn, reverse) {
      var index = 0;
      var values = iterateList(this, reverse);
      var value;
      while ((value = values()) !== DONE) {
        if (fn(value, index++, this) === false) {
          break;
        }
      }
      return index;
    };

    List.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        return this;
      }
      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
    };


  function isList(maybeList) {
    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
  }

  List.isList = isList;

  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SENTINEL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.setIn = MapPrototype.setIn;
  ListPrototype.deleteIn =
  ListPrototype.removeIn = MapPrototype.removeIn;
  ListPrototype.update = MapPrototype.update;
  ListPrototype.updateIn = MapPrototype.updateIn;
  ListPrototype.mergeIn = MapPrototype.mergeIn;
  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  ListPrototype.withMutations = MapPrototype.withMutations;
  ListPrototype.asMutable = MapPrototype.asMutable;
  ListPrototype.asImmutable = MapPrototype.asImmutable;
  ListPrototype.wasAltered = MapPrototype.wasAltered;



    function VNode(array, ownerID) {
      this.array = array;
      this.ownerID = ownerID;
    }

   

    VNode.prototype.removeBefore = function(ownerID, level, index) {
      if (index === level ? 1 << level : 0 || this.array.length === 0) {
        return this;
      }
      var originIndex = (index >>> level) & MASK;
      if (originIndex >= this.array.length) {
        return new VNode([], ownerID);
      }
      var removingFirst = originIndex === 0;
      var newChild;
      if (level > 0) {
        var oldChild = this.array[originIndex];
        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
        if (newChild === oldChild && removingFirst) {
          return this;
        }
      }
      if (removingFirst && !newChild) {
        return this;
      }
      var editable = editableVNode(this, ownerID);
      if (!removingFirst) {
        for (var ii = 0; ii < originIndex; ii++) {
          editable.array[ii] = undefined;
        }
      }
      if (newChild) {
        editable.array[originIndex] = newChild;
      }
      return editable;
    };

    VNode.prototype.removeAfter = function(ownerID, level, index) {
      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
        return this;
      }
      var sizeIndex = ((index - 1) >>> level) & MASK;
      if (sizeIndex >= this.array.length) {
        return this;
      }

      var newChild;
      if (level > 0) {
        var oldChild = this.array[sizeIndex];
        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
          return this;
        }
      }

      var editable = editableVNode(this, ownerID);
      editable.array.splice(sizeIndex + 1);
      if (newChild) {
        editable.array[sizeIndex] = newChild;
      }
      return editable;
    };



  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ?
        iterateLeaf(node, offset) :
        iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : (left - offset) >> level;
      var to = ((right - offset) >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function()  {
        do {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(
            array && array[idx], level - SHIFT, offset + (idx << level)
          );
        } while (true);
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function(list ) {
        index < 0 ?
          setListBounds(list, index).set(0, value) :
          setListBounds(list, 0, index + 1).set(index, value)
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef(DID_ALTER);
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = (index >>> level) & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    SetRef(didAlter);

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << (list._level + SHIFT)) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[(rawIndex >>> level) & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
   
   
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      end = end | 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

   
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

   
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

   
    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }

   
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ?
      listNodeFor(list, newCapacity - 1) :
      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

   
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = (oldTailOffset >>> level) & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
    }

   
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

   
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

   
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

     
      while (newRoot) {
        var beginIndex = (newOrigin >>> newLevel) & MASK;
        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

     
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function mergeIntoListWith(list, merger, iterables) {
    var iters = [];
    var maxSize = 0;
    for (var ii = 0; ii < iterables.length; ii++) {
      var value = iterables[ii];
      var iter = IndexedIterable(value);
      if (iter.size > maxSize) {
        maxSize = iter.size;
      }
      if (!isIterable(value)) {
        iter = iter.map(function(v ) {return fromJS(v)});
      }
      iters.push(iter);
    }
    if (maxSize > list.size) {
      list = list.setSize(maxSize);
    }
    return mergeIntoCollectionWith(list, merger, iters);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
  }

  createClass(OrderedMap, Map);

   

    function OrderedMap(value) {
      return value === null || value === undefined ? emptyOrderedMap() :
        isOrderedMap(value) ? value :
        emptyOrderedMap().withMutations(function(map ) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k)  {return map.set(k, v)});
        });
    }

    OrderedMap.of = function() {
      return this(arguments);
    };

    OrderedMap.prototype.toString = function() {
      return this.__toString('OrderedMap {', '}');
    };

   

    OrderedMap.prototype.get = function(k, notSetValue) {
      var index = this._map.get(k);
      return index !== undefined ? this._list.get(index)[1] : notSetValue;
    };

   

    OrderedMap.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._map.clear();
        this._list.clear();
        return this;
      }
      return emptyOrderedMap();
    };

    OrderedMap.prototype.set = function(k, v) {
      return updateOrderedMap(this, k, v);
    };

    OrderedMap.prototype.remove = function(k) {
      return updateOrderedMap(this, k, NOT_SET);
    };

    OrderedMap.prototype.wasAltered = function() {
      return this._map.wasAltered() || this._list.wasAltered();
    };

    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._list.__iterate(
        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
        reverse
      );
    };

    OrderedMap.prototype.__iterator = function(type, reverse) {
      return this._list.fromEntrySeq().__iterator(type, reverse);
    };

    OrderedMap.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      var newList = this._list.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        this._list = newList;
        return this;
      }
      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
    };


  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) {
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else {
      if (has) {
        if (v === list.get(i)[1]) {
          return omap;
        }
        newMap = map;
        newList = list.set(i, [k, v]);
      } else {
        newMap = map.set(k, list.size);
        newList = list.set(list.size, [k, v]);
      }
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  createClass(ToKeyedSequence, KeyedSeq);
    function ToKeyedSequence(indexed, useKeys) {
      this._iter = indexed;
      this._useKeys = useKeys;
      this.size = indexed.size;
    }

    ToKeyedSequence.prototype.get = function(key, notSetValue) {
      return this._iter.get(key, notSetValue);
    };

    ToKeyedSequence.prototype.has = function(key) {
      return this._iter.has(key);
    };

    ToKeyedSequence.prototype.valueSeq = function() {
      return this._iter.valueSeq();
    };

    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
      var reversedSequence = reverseFactory(this, true);
      if (!this._useKeys) {
        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
      }
      return reversedSequence;
    };

    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
      var mappedSequence = mapFactory(this, mapper, context);
      if (!this._useKeys) {
        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
      }
      return mappedSequence;
    };

    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var ii;
      return this._iter.__iterate(
        this._useKeys ?
          function(v, k)  {return fn(v, k, this$0)} :
          ((ii = reverse ? resolveSize(this) : 0),
            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
        reverse
      );
    };

    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
      if (this._useKeys) {
        return this._iter.__iterator(type, reverse);
      }
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var ii = reverse ? resolveSize(this) : 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
      });
    };

  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


  createClass(ToIndexedSequence, IndexedSeq);
    function ToIndexedSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToIndexedSequence.prototype.includes = function(value) {
      return this._iter.includes(value);
    };

    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
    };

    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, iterations++, step.value, step)
      });
    };



  createClass(ToSetSequence, SetSeq);
    function ToSetSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    ToSetSequence.prototype.has = function(key) {
      return this._iter.includes(key);
    };

    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
    };

    ToSetSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        return step.done ? step :
          iteratorValue(type, step.value, step.value, step);
      });
    };



  createClass(FromEntriesSequence, KeyedSeq);
    function FromEntriesSequence(entries) {
      this._iter = entries;
      this.size = entries.size;
    }

    FromEntriesSequence.prototype.entrySeq = function() {
      return this._iter.toSeq();
    };

    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._iter.__iterate(function(entry ) {
       
       
        if (entry) {
          validateEntry(entry);
          var indexedIterable = isIterable(entry);
          return fn(
            indexedIterable ? entry.get(1) : entry[1],
            indexedIterable ? entry.get(0) : entry[0],
            this$0
          );
        }
      }, reverse);
    };

    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
         
         
          if (entry) {
            validateEntry(entry);
            var indexedIterable = isIterable(entry);
            return iteratorValue(
              type,
              indexedIterable ? entry.get(0) : entry[0],
              indexedIterable ? entry.get(1) : entry[1],
              step
            );
          }
        }
      });
    };


  ToIndexedSequence.prototype.cacheResult =
  ToKeyedSequence.prototype.cacheResult =
  ToSetSequence.prototype.cacheResult =
  FromEntriesSequence.prototype.cacheResult =
    cacheResultThrough;


  function flipFactory(iterable) {
    var flipSequence = makeSequence(iterable);
    flipSequence._iter = iterable;
    flipSequence.size = iterable.size;
    flipSequence.flip = function()  {return iterable};
    flipSequence.reverse = function () {
      var reversedSequence = iterable.reverse.apply(this);
      reversedSequence.flip = function()  {return iterable.reverse()};
      return reversedSequence;
    };
    flipSequence.has = function(key ) {return iterable.includes(key)};
    flipSequence.includes = function(key ) {return iterable.has(key)};
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
    }
    flipSequence.__iteratorUncached = function(type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = iterable.__iterator(type, reverse);
        return new Iterator(function()  {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return iterable.__iterator(
        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
        reverse
      );
    }
    return flipSequence;
  }


  function mapFactory(iterable, mapper, context) {
    var mappedSequence = makeSequence(iterable);
    mappedSequence.size = iterable.size;
    mappedSequence.has = function(key ) {return iterable.has(key)};
    mappedSequence.get = function(key, notSetValue)  {
      var v = iterable.get(key, NOT_SET);
      return v === NOT_SET ?
        notSetValue :
        mapper.call(context, v, key, iterable);
    };
    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(
        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
        reverse
      );
    }
    mappedSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function()  {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(
          type,
          key,
          mapper.call(context, entry[1], key, iterable),
          step
        );
      });
    }
    return mappedSequence;
  }


  function reverseFactory(iterable, useKeys) {
    var reversedSequence = makeSequence(iterable);
    reversedSequence._iter = iterable;
    reversedSequence.size = iterable.size;
    reversedSequence.reverse = function()  {return iterable};
    if (iterable.flip) {
      reversedSequence.flip = function () {
        var flipSequence = flipFactory(iterable);
        flipSequence.reverse = function()  {return iterable.flip()};
        return flipSequence;
      };
    }
    reversedSequence.get = function(key, notSetValue) 
      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
    reversedSequence.has = function(key )
      {return iterable.has(useKeys ? key : -1 - key)};
    reversedSequence.includes = function(value ) {return iterable.includes(value)};
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
    };
    reversedSequence.__iterator =
      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
    return reversedSequence;
  }


  function filterFactory(iterable, predicate, context, useKeys) {
    var filterSequence = makeSequence(iterable);
    if (useKeys) {
      filterSequence.has = function(key ) {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
      };
      filterSequence.get = function(key, notSetValue)  {
        var v = iterable.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
          v : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function (type, reverse) {
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function()  {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, iterable)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    }
    return filterSequence;
  }


  function countByFactory(iterable, grouper, context) {
    var groups = Map().asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        0,
        function(a ) {return a + 1}
      );
    });
    return groups.asImmutable();
  }


  function groupByFactory(iterable, grouper, context) {
    var isKeyedIter = isKeyed(iterable);
    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
    iterable.__iterate(function(v, k)  {
      groups.update(
        grouper.call(context, v, k, iterable),
        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
      );
    });
    var coerce = iterableClass(iterable);
    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
  }


  function sliceFactory(iterable, begin, end, useKeys) {
    var originalSize = iterable.size;

   
   
    if (begin !== undefined) {
      begin = begin | 0;
    }
    if (end !== undefined) {
      if (end === Infinity) {
        end = originalSize;
      } else {
        end = end | 0;
      }
    }

    if (wholeSlice(begin, end, originalSize)) {
      return iterable;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

   
   
   
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
    }

   
   
   
   
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(iterable);

   
   
    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
      sliceSeq.get = function (index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ?
          iterable.get(index + resolvedBegin, notSetValue) :
          notSetValue;
      }
    }

    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k)  {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
                 iterations !== sliceSize;
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function(type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
     
      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function()  {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES) {
          return step;
        } else if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        } else {
          return iteratorValue(type, iterations - 1, step.value[1], step);
        }
      });
    }

    return sliceSeq;
  }


  function takeWhileFactory(iterable, predicate, context) {
    var takeSequence = makeSequence(iterable);
    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      iterable.__iterate(function(v, k, c) 
        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
      );
      return iterations;
    };
    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function()  {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$0)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }


  function skipWhileFactory(iterable, predicate, context, useKeys) {
    var skipSequence = makeSequence(iterable);
    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      iterable.__iterate(function(v, k, c)  {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$0);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function()  {
        var step, k, v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            } else {
              return iteratorValue(type, iterations++, step.value[1], step);
            }
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$0));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step :
          iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }


  function concatFactory(iterable, values) {
    var isKeyedIterable = isKeyed(iterable);
    var iters = [iterable].concat(values).map(function(v ) {
      if (!isIterable(v)) {
        v = isKeyedIterable ?
          keyedSeqFromValue(v) :
          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
      } else if (isKeyedIterable) {
        v = KeyedIterable(v);
      }
      return v;
    }).filter(function(v ) {return v.size !== 0});

    if (iters.length === 0) {
      return iterable;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === iterable ||
          isKeyedIterable && isKeyed(singleton) ||
          isIndexed(iterable) && isIndexed(singleton)) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedIterable) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(iterable)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(
      function(sum, seq)  {
        if (sum !== undefined) {
          var size = seq.size;
          if (size !== undefined) {
            return sum + size;
          }
        }
      },
      0
    );
    return concatSeq;
  }


  function flattenFactory(iterable, depth, useKeys) {
    var flatSequence = makeSequence(iterable);
    flatSequence.__iterateUncached = function(fn, reverse) {
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {var this$0 = this;
        iter.__iterate(function(v, k)  {
          if ((!depth || currentDepth < depth) && isIterable(v)) {
            flatDeep(v, currentDepth + 1);
          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
            stopped = true;
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(iterable, 0);
      return iterations;
    }
    flatSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function()  {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isIterable(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    }
    return flatSequence;
  }


  function flatMapFactory(iterable, mapper, context) {
    var coerce = iterableClass(iterable);
    return iterable.toSeq().map(
      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
    ).flatten(true);
  }


  function interposeFactory(iterable, separator) {
    var interposedSequence = makeSequence(iterable);
    interposedSequence.size = iterable.size && iterable.size * 2 -1;
    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
      var iterations = 0;
      iterable.__iterate(function(v, k) 
        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
        fn(v, iterations++, this$0) !== false},
        reverse
      );
      return iterations;
    };
    interposedSequence.__iteratorUncached = function(type, reverse) {
      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function()  {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ?
          iteratorValue(type, iterations++, separator) :
          iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }


  function sortFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedIterable = isKeyed(iterable);
    var index = 0;
    var entries = iterable.toSeq().map(
      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
    ).toArray();
    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
      isKeyedIterable ?
      function(v, i)  { entries[i].length = 2; } :
      function(v, i)  { entries[i] = v[1]; }
    );
    return isKeyedIterable ? KeyedSeq(entries) :
      isIndexed(iterable) ? IndexedSeq(entries) :
      SetSeq(entries);
  }


  function maxFactory(iterable, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = iterable.toSeq()
        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
      return entry && entry[0];
    } else {
      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
    }
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
   
   
    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
  }


  function zipWithFactory(keyIter, zipper, iters) {
    var zipSequence = makeSequence(keyIter);
    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
   
   
    zipSequence.__iterate = function(fn, reverse) {
           
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function(type, reverse) {
      var iterators = iters.map(function(i )
        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
      );
      var iterations = 0;
      var isDone = false;
      return new Iterator(function()  {
        var steps;
        if (!isDone) {
          steps = iterators.map(function(i ) {return i.next()});
          isDone = steps.some(function(s ) {return s.done});
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(
          type,
          iterations++,
          zipper.apply(null, steps.map(function(s ) {return s.value}))
        );
      });
    };
    return zipSequence
  }


 

  function reify(iter, seq) {
    return isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function resolveSize(iter) {
    assertNotInfinite(iter.size);
    return ensureSize(iter);
  }

  function iterableClass(iterable) {
    return isKeyed(iterable) ? KeyedIterable :
      isIndexed(iterable) ? IndexedIterable :
      SetIterable;
  }

  function makeSequence(iterable) {
    return Object.create(
      (
        isKeyed(iterable) ? KeyedSeq :
        isIndexed(iterable) ? IndexedSeq :
        SetSeq
      ).prototype
    );
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    } else {
      return Seq.prototype.cacheResult.call(this);
    }
  }

  function defaultComparator(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  }

  function forceIterator(keyPath) {
    var iter = getIterator(keyPath);
    if (!iter) {
     
     
      if (!isArrayLike(keyPath)) {
        throw new TypeError('Expected iterable or array-like: ' + keyPath);
      }
      iter = getIterator(Iterable(keyPath));
    }
    return iter;
  }

  createClass(Record, KeyedCollection);

    function Record(defaultValues, name) {
      var hasInitialized;

      var RecordType = function Record(values) {
        if (values instanceof RecordType) {
          return values;
        }
        if (!(this instanceof RecordType)) {
          return new RecordType(values);
        }
        if (!hasInitialized) {
          hasInitialized = true;
          var keys = Object.keys(defaultValues);
          setProps(RecordTypePrototype, keys);
          RecordTypePrototype.size = keys.length;
          RecordTypePrototype._name = name;
          RecordTypePrototype._keys = keys;
          RecordTypePrototype._defaultValues = defaultValues;
        }
        this._map = Map(values);
      };

      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
      RecordTypePrototype.constructor = RecordType;

      return RecordType;
    }

    Record.prototype.toString = function() {
      return this.__toString(recordName(this) + ' {', '}');
    };

   

    Record.prototype.has = function(k) {
      return this._defaultValues.hasOwnProperty(k);
    };

    Record.prototype.get = function(k, notSetValue) {
      if (!this.has(k)) {
        return notSetValue;
      }
      var defaultVal = this._defaultValues[k];
      return this._map ? this._map.get(k, defaultVal) : defaultVal;
    };

   

    Record.prototype.clear = function() {
      if (this.__ownerID) {
        this._map && this._map.clear();
        return this;
      }
      var RecordType = this.constructor;
      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
    };

    Record.prototype.set = function(k, v) {
      if (!this.has(k)) {
        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
      }
      if (this._map && !this._map.has(k)) {
        var defaultVal = this._defaultValues[k];
        if (v === defaultVal) {
          return this;
        }
      }
      var newMap = this._map && this._map.set(k, v);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.remove = function(k) {
      if (!this.has(k)) {
        return this;
      }
      var newMap = this._map && this._map.remove(k);
      if (this.__ownerID || newMap === this._map) {
        return this;
      }
      return makeRecord(this, newMap);
    };

    Record.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
    };

    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
    };

    Record.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map && this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return makeRecord(this, newMap, ownerID);
    };


  var RecordPrototype = Record.prototype;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn =
  RecordPrototype.removeIn = MapPrototype.removeIn;
  RecordPrototype.merge = MapPrototype.merge;
  RecordPrototype.mergeWith = MapPrototype.mergeWith;
  RecordPrototype.mergeIn = MapPrototype.mergeIn;
  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
  RecordPrototype.setIn = MapPrototype.setIn;
  RecordPrototype.update = MapPrototype.update;
  RecordPrototype.updateIn = MapPrototype.updateIn;
  RecordPrototype.withMutations = MapPrototype.withMutations;
  RecordPrototype.asMutable = MapPrototype.asMutable;
  RecordPrototype.asImmutable = MapPrototype.asImmutable;


  function makeRecord(likeRecord, map, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._map = map;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function setProps(prototype, names) {
    try {
      names.forEach(setProp.bind(undefined, prototype));
    } catch (error) {
     
    }
  }

  function setProp(prototype, name) {
    Object.defineProperty(prototype, name, {
      get: function() {
        return this.get(name);
      },
      set: function(value) {
        invariant(this.__ownerID, 'Cannot set on an immutable record.');
        this.set(name, value);
      }
    });
  }

  createClass(Set, SetCollection);

   

    function Set(value) {
      return value === null || value === undefined ? emptySet() :
        isSet(value) && !isOrdered(value) ? value :
        emptySet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    Set.of = function() {
      return this(arguments);
    };

    Set.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    Set.prototype.toString = function() {
      return this.__toString('Set {', '}');
    };

   

    Set.prototype.has = function(value) {
      return this._map.has(value);
    };

   

    Set.prototype.add = function(value) {
      return updateSet(this, this._map.set(value, true));
    };

    Set.prototype.remove = function(value) {
      return updateSet(this, this._map.remove(value));
    };

    Set.prototype.clear = function() {
      return updateSet(this, this._map.clear());
    };

   

    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
      iters = iters.filter(function(x ) {return x.size !== 0});
      if (iters.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
        return this.constructor(iters[0]);
      }
      return this.withMutations(function(set ) {
        for (var ii = 0; ii < iters.length; ii++) {
          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
        }
      });
    };

    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (!iters.every(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter ) {return SetIterable(iter)});
      var originalSet = this;
      return this.withMutations(function(set ) {
        originalSet.forEach(function(value ) {
          if (iters.some(function(iter ) {return iter.includes(value)})) {
            set.remove(value);
          }
        });
      });
    };

    Set.prototype.merge = function() {
      return this.union.apply(this, arguments);
    };

    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
      return this.union.apply(this, iters);
    };

    Set.prototype.sort = function(comparator) {
     
      return OrderedSet(sortFactory(this, comparator));
    };

    Set.prototype.sortBy = function(mapper, comparator) {
     
      return OrderedSet(sortFactory(this, comparator, mapper));
    };

    Set.prototype.wasAltered = function() {
      return this._map.wasAltered();
    };

    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
    };

    Set.prototype.__iterator = function(type, reverse) {
      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
    };

    Set.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return this.__make(newMap, ownerID);
    };


  function isSet(maybeSet) {
    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
  }

  Set.isSet = isSet;

  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SENTINEL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.mergeDeep = SetPrototype.merge;
  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
  SetPrototype.withMutations = MapPrototype.withMutations;
  SetPrototype.asMutable = MapPrototype.asMutable;
  SetPrototype.asImmutable = MapPrototype.asImmutable;

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map ? set :
      newMap.size === 0 ? set.__empty() :
      set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  createClass(OrderedSet, Set);

   

    function OrderedSet(value) {
      return value === null || value === undefined ? emptyOrderedSet() :
        isOrderedSet(value) ? value :
        emptyOrderedSet().withMutations(function(set ) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v ) {return set.add(v)});
        });
    }

    OrderedSet.of = function() {
      return this(arguments);
    };

    OrderedSet.fromKeys = function(value) {
      return this(KeyedIterable(value).keySeq());
    };

    OrderedSet.prototype.toString = function() {
      return this.__toString('OrderedSet {', '}');
    };


  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }

  createClass(Stack, IndexedCollection);

   

    function Stack(value) {
      return value === null || value === undefined ? emptyStack() :
        isStack(value) ? value :
        emptyStack().unshiftAll(value);
    }

    Stack.of = function() {
      return this(arguments);
    };

    Stack.prototype.toString = function() {
      return this.__toString('Stack [', ']');
    };

   

    Stack.prototype.get = function(index, notSetValue) {
      var head = this._head;
      index = wrapIndex(this, index);
      while (head && index--) {
        head = head.next;
      }
      return head ? head.value : notSetValue;
    };

    Stack.prototype.peek = function() {
      return this._head && this._head.value;
    };

   

    Stack.prototype.push = function() {
      if (arguments.length === 0) {
        return this;
      }
      var newSize = this.size + arguments.length;
      var head = this._head;
      for (var ii = arguments.length - 1; ii >= 0; ii--) {
        head = {
          value: arguments[ii],
          next: head
        };
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pushAll = function(iter) {
      iter = IndexedIterable(iter);
      if (iter.size === 0) {
        return this;
      }
      assertNotInfinite(iter.size);
      var newSize = this.size;
      var head = this._head;
      iter.reverse().forEach(function(value ) {
        newSize++;
        head = {
          value: value,
          next: head
        };
      });
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pop = function() {
      return this.slice(1);
    };

    Stack.prototype.unshift = function() {
      return this.push.apply(this, arguments);
    };

    Stack.prototype.unshiftAll = function(iter) {
      return this.pushAll(iter);
    };

    Stack.prototype.shift = function() {
      return this.pop.apply(this, arguments);
    };

    Stack.prototype.clear = function() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._head = undefined;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyStack();
    };

    Stack.prototype.slice = function(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      var resolvedBegin = resolveBegin(begin, this.size);
      var resolvedEnd = resolveEnd(end, this.size);
      if (resolvedEnd !== this.size) {
       
        return IndexedCollection.prototype.slice.call(this, begin, end);
      }
      var newSize = this.size - resolvedBegin;
      var head = this._head;
      while (resolvedBegin--) {
        head = head.next;
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

   

    Stack.prototype.__ensureOwner = function(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeStack(this.size, this._head, ownerID, this.__hash);
    };

   

    Stack.prototype.__iterate = function(fn, reverse) {
      if (reverse) {
        return this.reverse().__iterate(fn);
      }
      var iterations = 0;
      var node = this._head;
      while (node) {
        if (fn(node.value, iterations++, this) === false) {
          break;
        }
        node = node.next;
      }
      return iterations;
    };

    Stack.prototype.__iterator = function(type, reverse) {
      if (reverse) {
        return this.reverse().__iterator(type);
      }
      var iterations = 0;
      var node = this._head;
      return new Iterator(function()  {
        if (node) {
          var value = node.value;
          node = node.next;
          return iteratorValue(type, iterations++, value);
        }
        return iteratorDone();
      });
    };


  function isStack(maybeStack) {
    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
  }

  Stack.isStack = isStack;

  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SENTINEL] = true;
  StackPrototype.withMutations = MapPrototype.withMutations;
  StackPrototype.asMutable = MapPrototype.asMutable;
  StackPrototype.asImmutable = MapPrototype.asImmutable;
  StackPrototype.wasAltered = MapPrototype.wasAltered;


  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

    function mixin(ctor, methods) {
    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols &&
      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  Iterable.Iterator = Iterator;

  mixin(Iterable, {

   

    toArray: function() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
      return array;
    },

    toIndexedSeq: function() {
      return new ToIndexedSequence(this);
    },

    toJS: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
      ).__toJS();
    },

    toJSON: function() {
      return this.toSeq().map(
        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
      ).__toJS();
    },

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, true);
    },

    toMap: function() {
     
      return Map(this.toKeyedSeq());
    },

    toObject: function() {
      assertNotInfinite(this.size);
      var object = {};
      this.__iterate(function(v, k)  { object[k] = v; });
      return object;
    },

    toOrderedMap: function() {
     
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function() {
     
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function() {
     
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function() {
      return new ToSetSequence(this);
    },

    toSeq: function() {
      return isIndexed(this) ? this.toIndexedSeq() :
        isKeyed(this) ? this.toKeyedSeq() :
        this.toSetSeq();
    },

    toStack: function() {
     
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function() {
     
      return List(isKeyed(this) ? this.valueSeq() : this);
    },


   

    toString: function() {
      return '[Iterable]';
    },

    __toString: function(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
    },


   

    concat: function() {var values = SLICE$0.call(arguments, 0);
      return reify(this, concatFactory(this, values));
    },

    includes: function(searchValue) {
      return this.some(function(value ) {return is(value, searchValue)});
    },

    entries: function() {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function(v, k, c)  {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    forEach: function(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function(separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function(v ) {
        isFirst ? (isFirst = false) : (joined += separator);
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function() {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function(reducer, initialReduction, context) {
      assertNotInfinite(this.size);
      var reduction;
      var useFirst;
      if (arguments.length < 2) {
        useFirst = true;
      } else {
        reduction = initialReduction;
      }
      this.__iterate(function(v, k, c)  {
        if (useFirst) {
          useFirst = false;
          reduction = v;
        } else {
          reduction = reducer.call(context, reduction, v, k, c);
        }
      });
      return reduction;
    },

    reduceRight: function(reducer, initialReduction, context) {
      var reversed = this.toKeyedSeq().reverse();
      return reversed.reduce.apply(reversed, arguments);
    },

    reverse: function() {
      return reify(this, reverseFactory(this, true));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function(predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function(comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function() {
      return this.__iterator(ITERATE_VALUES);
    },


   

    butLast: function() {
      return this.slice(0, -1);
    },

    isEmpty: function() {
      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
    },

    count: function(predicate, context) {
      return ensureSize(
        predicate ? this.toSeq().filter(predicate, context) : this
      );
    },

    countBy: function(grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function(other) {
      return deepEqual(this, other);
    },

    entrySeq: function() {
      var iterable = this;
      if (iterable._cache) {
       
        return new ArraySeq(iterable._cache);
      }
      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
      return entriesSequence;
    },

    filterNot: function(predicate, context) {
      return this.filter(not(predicate), context);
    },

    findEntry: function(predicate, context, notSetValue) {
      var found = notSetValue;
      this.__iterate(function(v, k, c)  {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findKey: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLast: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },

    findLastEntry: function(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
    },

    findLastKey: function(predicate, context) {
      return this.toKeyedSeq().reverse().findKey(predicate, context);
    },

    first: function() {
      return this.find(returnTrue);
    },

    flatMap: function(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function() {
      return new FromEntriesSequence(this);
    },

    get: function(searchKey, notSetValue) {
      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
    },

    getIn: function(searchKeyPath, notSetValue) {
      var nested = this;
     
     
      var iter = forceIterator(searchKeyPath);
      var step;
      while (!(step = iter.next()).done) {
        var key = step.value;
        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
        if (nested === NOT_SET) {
          return notSetValue;
        }
      }
      return nested;
    },

    groupBy: function(grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: function(searchKeyPath) {
      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
    },

    isSubset: function(iter) {
      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
      return this.every(function(value ) {return iter.includes(value)});
    },

    isSuperset: function(iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
      return iter.isSubset(this);
    },

    keyOf: function(searchValue) {
      return this.findKey(function(value ) {return is(value, searchValue)});
    },

    keySeq: function() {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },

    last: function() {
      return this.toSeq().reverse().first();
    },

    lastKeyOf: function(searchValue) {
      return this.toKeyedSeq().reverse().keyOf(searchValue);
    },

    max: function(comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function(comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },

    minBy: function(mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },

    rest: function() {
      return this.slice(1);
    },

    skip: function(amount) {
      return this.slice(Math.max(0, amount));
    },

    skipLast: function(amount) {
      return reify(this, this.toSeq().reverse().skip(amount).reverse());
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function(amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function(amount) {
      return reify(this, this.toSeq().reverse().take(amount).reverse());
    },

    takeWhile: function(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    valueSeq: function() {
      return this.toIndexedSeq();
    },


   

    hashCode: function() {
      return this.__hash || (this.__hash = hashIterable(this));
    }


   

   

   
  });

 
 
 
 

  var IterablePrototype = Iterable.prototype;
  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
  IterablePrototype.__toJS = IterablePrototype.toArray;
  IterablePrototype.__toStringMapper = quoteString;
  IterablePrototype.inspect =
  IterablePrototype.toSource = function() { return this.toString(); };
  IterablePrototype.chain = IterablePrototype.flatMap;
  IterablePrototype.contains = IterablePrototype.includes;

  mixin(KeyedIterable, {

   

    flip: function() {
      return reify(this, flipFactory(this));
    },

    mapEntries: function(mapper, context) {var this$0 = this;
      var iterations = 0;
      return reify(this,
        this.toSeq().map(
          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
        ).fromEntrySeq()
      );
    },

    mapKeys: function(mapper, context) {var this$0 = this;
      return reify(this,
        this.toSeq().flip().map(
          function(k, v)  {return mapper.call(context, k, v, this$0)}
        ).flip()
      );
    }

  });

  var KeyedIterablePrototype = KeyedIterable.prototype;
  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



  mixin(IndexedIterable, {

   

    toKeyedSeq: function() {
      return new ToKeyedSequence(this, false);
    },


   

    filter: function(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function(searchValue) {
      var key = this.keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function(searchValue) {
      var key = this.lastKeyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    reverse: function() {
      return reify(this, reverseFactory(this, false));
    },

    slice: function(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function(index, removeNum ) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum | 0, 0);
      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
        return this;
      }
     
     
     
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(
        this,
        numArgs === 1 ?
          spliced :
          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
      );
    },


   

    findLastIndex: function(predicate, context) {
      var entry = this.findLastEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    first: function() {
      return this.get(0);
    },

    flatten: function(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function(index, notSetValue) {
      index = wrapIndex(this, index);
      return (index < 0 || (this.size === Infinity ||
          (this.size !== undefined && index > this.size))) ?
        notSetValue :
        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
    },

    has: function(index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== undefined ?
        this.size === Infinity || index < this.size :
        this.indexOf(index) !== -1
      );
    },

    interpose: function(separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function() {
      var iterables = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * iterables.length;
      }
      return reify(this, interleaved);
    },

    keySeq: function() {
      return Range(0, this.size);
    },

    last: function() {
      return this.get(-1);
    },

    skipWhile: function(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function() {
      var iterables = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, iterables));
    },

    zipWith: function(zipper) {
      var iterables = arrCopy(arguments);
      iterables[0] = this;
      return reify(this, zipWithFactory(this, zipper, iterables));
    }

  });

  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



  mixin(SetIterable, {

   

    get: function(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function(value) {
      return this.has(value);
    },


   

    keySeq: function() {
      return this.valueSeq();
    }

  });

  SetIterable.prototype.has = IterablePrototype.includes;
  SetIterable.prototype.contains = SetIterable.prototype.includes;


 

  mixin(KeyedSeq, KeyedIterable.prototype);
  mixin(IndexedSeq, IndexedIterable.prototype);
  mixin(SetSeq, SetIterable.prototype);

  mixin(KeyedCollection, KeyedIterable.prototype);
  mixin(IndexedCollection, IndexedIterable.prototype);
  mixin(SetCollection, SetIterable.prototype);


 

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    }
  }

  function neg(predicate) {
    return function() {
      return -predicate.apply(this, arguments);
    }
  }

  function quoteString(value) {
    return typeof value === 'string' ? JSON.stringify(value) : String(value);
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashIterable(iterable) {
    if (iterable.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(iterable);
    var keyed = isKeyed(iterable);
    var h = ordered ? 1 : 0;
    var size = iterable.__iterate(
      keyed ?
        ordered ?
          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
        ordered ?
          function(v ) { h = 31 * h + hash(v) | 0; } :
          function(v ) { h = h + hash(v) | 0; }
    );
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xCC9E2D51);
    h = imul(h << 15 | h >>> -15, 0x1B873593);
    h = imul(h << 13 | h >>> -13, 5);
    h = (h + 0xE6546B64 | 0) ^ size;
    h = imul(h ^ h >>> 16, 0x85EBCA6B);
    h = imul(h ^ h >>> 13, 0xC2B2AE35);
    h = smi(h ^ h >>> 16);
    return h;
  }

  function hashMerge(a, b) {
    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0;
  }

  var Immutable = {

    Iterable: Iterable,

    Seq: Seq,
    Collection: Collection,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS

  };

  return Immutable;

}));

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsEventDataSchema = {
  "additionalInfoURL": "https://www.facebook.com/help/606443329504150",
  "id": "event_data_schema",
  "version": "0.0.2",
  "exampleFiles": {
    "csv": "https://www.facebook.com/images/ads/signals/example_files/example_events_file.csv"
  },
  "validIf": {
    "rule": "meetAll",
    "args": [{
      "rule": "meetAll",
      "args": [{
        "rule": "propValid",
        "name": "valid_event_time",
        "args": "event_time"
      }, {
        "rule": "propValid",
        "name": "valid_event_name",
        "args": "event_name"
      }, {
        "rule": "dependentProps",
        "name": "require_value_and_currency_if_purchase",
        "args": [{
          "rule": "propValueIs",
          "args": ["event_name", "Purchase"]
        }, ["value", "currency"]]
      }, {
        "rule": "dependentProps",
        "name": "require_currency_if_value",
        "args": [{
          "rule": "propValid",
          "args": "value"
        }, ["currency"]]
      }, {
        "rule": "dependentProps",
        "name": "require_value_if_currency",
        "args": [{
          "rule": "propValid",
          "args": "currency"
        }, ["value"]]
      }]
    }, {
      "rule": "meetAll",
      "args": [{
        "rule": "dependentProps",
        "name": "require_content_type_if_content_ids",
        "args": [{
          "rule": "propValid",
          "args": "content_ids"
        }, ["content_type"]]
      }]
    }]
  },
  "props": [{
    "key": "event_time",
    "label": "Event Time",
    "examples": ["2016-06-20T03:21:48+01:00", "2016-06-20T03:21:48", "1459315678", "mm/dd/yyyy", "+ 15 more"],
    "typeParams": {
      "rejectTimeBefore": 63072000000
    },
    "type": "unix_time"
  }, {
    "key": "event_name",
    "label": "Event Name",
    "formats": ["AddPaymentInfo", "AddToCart", "AddToWishlist", "CompleteRegistration", "InitiateCheckout", "Lead", "Purchase", "Search", "ViewContent", "Other"],
    "type": "enum",
    "typeParams": {
      "caseInsensitive": true,
      "options": ["AddPaymentInfo", "AddToCart", "AddToWishlist", "CompleteRegistration", "InitiateCheckout", "Lead", "Purchase", "Search", "ViewContent", "Other"],
      "rejectHashed": true
    },
    "maxCountOfExamplesToShow": 30
  }, {
    "key": "match_keys",
    "label": "Match keys",
    "type": {
      "additionalInfoURL": "https://www.facebook.com/help/606443329504150",
      "id": "extended_pii_schema",
      "version": "0.2.0",
      "type": "pii_keys",
      "exampleFiles": {
        "csv": "https://www.facebook.com/images/ads/signals/example_files/example_audience_file.csv"
      },
      "validIf": {
        "rule": "minValidProps",
        "args": 1
      },
      "transform": ["processPIISignalBeforeUpload"],
      "props": [{
        "key": "email",
        "maxOccurrence": 3,
        "label": "Email",
        "examples": ["Emily@example.com", "John@example.com", "Helena@example.com"],
        "type": "email"
      }, {
        "key": "phone",
        "maxOccurrence": 3,
        "label": "Phone Number",
        "examples": ["1(222)333-4444", "001(222)333-4444", "+12223334444"],
        "type": "phone_number"
      }, {
        "key": "madid",
        "label": "Mobile Advertiser ID",
        "formats": ["Android's Advertising ID(AAID)", "Apple's Advertising Identifier(IDFA)"],
        "type": "string",
        "typeParams": {
          "lowercase": true,
          "strip": "whitespace_only",
          "test": "^([a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}|[a-zA-Z0-9]{6}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{13})$"
        }
      }, {
        "key": "fn",
        "label": "First Name",
        "examples": ["John", "F.", "Fr&eacute;d&eacute;drique"],
        "type": "string",
        "typeParams": {
          "lowercase": true,
          "strip": "whitespace_and_punctuation"
        }
      }, {
        "key": "ln",
        "label": "Last Name",
        "examples": ["Smith", "S&oslash;rensen", "Jacobs-Anderson"],
        "type": "string",
        "typeParams": {
          "lowercase": true,
          "strip": "whitespace_and_punctuation"
        }
      }, {
        "key": "zip",
        "label": "ZIP/Postal Code",
        "examples": ["94025", "94025-3215", "L3T 5M7"],
        "type": "postal_code"
      }, {
        "key": "ct",
        "label": "City",
        "examples": ["Menlo Park", "Seattle", "London"],
        "type": "string",
        "typeParams": {
          "lowercase": true,
          "strip": "all_non_latin_alpha_numeric",
          "test": "^[a-z]+"
        }
      }, {
        "key": "st",
        "label": "State/Province",
        "examples": ["CA", "Califonia", "Texas"],
        "type": "string",
        "typeParams": {
          "lowercase": true,
          "strip": "all_non_latin_alpha_numeric",
          "test": "^[a-z]+"
        }
      }, {
        "key": "country",
        "label": "Country",
        "examples": ["US", "GB", "FR"],
        "type": "string",
        "typeParams": {
          "lowercase": true,
          "strip": "whitespace_only",
          "test": "^[a-zA-Z]{2,2}"
        }
      }, {
        "key": "dob",
        "label": "Date of Birth",
        "examples": ["mm/dd/yyyy", "mm/dd/yy", "yyyy-mm-dd", "+ 15 more"],
        "type": "date",
        "typeParams": {
          "rejectHashed": true
        }
      }, {
        "key": "doby",
        "label": "Year of Birth",
        "type": "string",
        "typeParams": {
          "test": "^[0-9]{4,4}$"
        },
        "examples": ["1978", "1962", "1990"]
      }, {
        "key": "gen",
        "label": "Gender",
        "examples": ["M", "F"],
        "type": "enum",
        "typeParams": {
          "lowercase": true,
          "options": ["f", "m"]
        }
      }, {
        "key": "age",
        "label": "Age",
        "examples": [65, 42, 21],
        "type": "number",
        "typeParams": {
          "min": 0
        }
      }, {
        "key": "appuid",
        "label": "Facebook App User ID",
        "examples": ["1234567890", "1443637309", "1234567892"],
        "type": "fbid",
        "typeParams": {
          "scoped": true,
          "rejectHashed": true
        }
      }, {
        "key": "fi",
        "noUI": true,
        "label": "First name initial",
        "type": "string",
        "typeParams": {
          "lowercase": true,
          "strip": "whitespace_only",
          "test": "^[a-z]{1,1}$"
        }
      }, {
        "key": "f5first",
        "noUI": true,
        "label": "First five letters of first name",
        "type": "string",
        "typeParams": {
          "lowercase": true,
          "strip": "whitespace_only",
          "test": "^[a-z]{5,5}$"
        }
      }, {
        "key": "f5last",
        "noUI": true,
        "label": "First five letters of last name",
        "type": "string",
        "typeParams": {
          "lowercase": true,
          "strip": "whitespace_only",
          "test": "^[a-z]{5,5}$"
        }
      }, {
        "key": "pageuid",
        "label": "Facebook Page User ID",
        "examples": ["1234567890", "1443637309", "1234567892"],
        "type": "fbid",
        "typeParams": {
          "scoped": true,
          "rejectHashed": true
        }
      }, {
        "key": "extern_id",
        "label": "External ID",
        "description": "Advertiser-specific or third-party ID",
        "examples": ["ABX1234", "99931356", "12XYZ981"],
        "type": "string",
        "typeParams": {
          "doNotHash": true,
          "test": "^(?!\\s*$).+"
        }
      }, {
        "key": "lead_id",
        "label": "Lead ID",
        "description": "Facebook Lead ID",
        "examples": ["7543756327866", "4234567890123", "l:4234567890123"],
        "type": "fbid",
        "typeParams": {
          "rejectHashed": true,
          "stripPrefix": true
        }
      }],
      "baseSchema": {
        "id": "basic_pii_schema",
        "version": "0.0.1"
      }
    }
  }, {
    "key": "custom_data",
    "label": "CustomData",
    "type": {
      "canHaveExtraProps": true
    }
  }, {
    "key": "value",
    "label": "Value",
    "examples": ["2534"],
    "type": "number",
    "typeParams": {
      "moreThan": 0,
      "rejectHashed": true
    }
  }, {
    "key": "currency",
    "label": "Currency",
    "examples": ["USD", "HUF"],
    "type": "currency_code"
  }, {
    "key": "order_id",
    "label": "Order ID",
    "examples": ["ABC123", "123DEF"],
    "type": "string"
  }, {
    "key": "item_number",
    "label": "Item Number",
    "examples": ["1", "A2"],
    "type": "string"
  }, {
    "key": "content_type",
    "label": "Content Type",
    "type": "LIST",
    "typeParams": {
      "rejectEmptyList": true,
      "rejectHashed": true,
      "caseInsensitiveElements": true,
      "options": ["product", "product_group", "fb_product", "destination", "flight", "hotel", "home_listing", "home_service_provider", "auto_offer", "vehicle", "vehicle_offer", "media_title", "test_vertical"]
    },
    "examples": ["product", ["product", "destination"], "[product]", "[product, destination]"]
  }, {
    "key": "content_ids",
    "label": "Content Ids",
    "examples": [["1"], ["2", "A3"]],
    "type": "LIST",
    "typeParams": {
      "rejectEmptyList": true,
      "rejectHashed": true
    }
  }, {
    "key": "catalog_auto_population_info",
    "label": "Catalog Auto Population Info JSON",
    "type": "json_list",
    "typeParams": {
      "maxItemsAllowed": 100,
      "nestedPropSchema": {
        "additionalInfoURL": "https://www.facebook.com/help/606443329504150",
        "id": "catalog_auto_population_info_schema",
        "version": "0.0.1",
        "type": "catalog_auto_population_info_keys",
        "exampleFiles": {
          "csv": "https://www.facebook.com/images/ads/signals/example_files/example_audience_file.csv"
        },
        "validIf": {
          "rule": "meetAll",
          "args": [{
            "rule": "propValid",
            "name": "valid_currency",
            "args": "currency"
          }, {
            "rule": "propValid",
            "name": "valid_description",
            "args": "description"
          }, {
            "rule": "propValid",
            "name": "valid_image_url",
            "args": "image_url"
          }, {
            "rule": "propValid",
            "name": "valid_name",
            "args": "name"
          }, {
            "rule": "propValid",
            "name": "valid_price",
            "args": "price"
          }, {
            "rule": "propValid",
            "name": "valid_retailer_id",
            "args": "retailer_id"
          }, {
            "rule": "propValid",
            "name": "valid_url",
            "args": "url"
          }, {
            "rule": "meetAny",
            "args": [{
              "rule": "propValid",
              "name": "valid_brand",
              "args": "brand"
            }, {
              "rule": "propValid",
              "name": "valid_gtin",
              "args": "gtin"
            }, {
              "rule": "propValid",
              "name": "valid_mpn",
              "args": "manufacturer_part_number"
            }]
          }]
        },
        "props": [{
          "key": "availability",
          "label": "Product Availability",
          "formats": ["in stock", "out of stock", "preorder", "available for order", "discontinued", ""],
          "type": "enum",
          "typeParams": {
            "caseInsensitive": true,
            "options": ["in stock", "out of stock", "preorder", "available for order", "discontinued", ""],
            "rejectHashed": true
          },
          "maxCountOfExamplesToShow": 5
        }, {
          "key": "brand",
          "label": "Product Brand",
          "type": "string",
          "typeParams": {
            "test": "\\S"
          }
        }, {
          "key": "category",
          "label": "Google Product Category",
          "type": "string",
          "typeParams": {
            "test": "\\S"
          }
        }, {
          "key": "currency",
          "label": "Product Price Currency",
          "examples": ["USD", "HUF"],
          "type": "currency_code"
        }, {
          "key": "condition",
          "label": "Product Condition",
          "formats": ["new", "refurbished", "used", "cpo", ""],
          "type": "enum",
          "typeParams": {
            "caseInsensitive": true,
            "options": ["new", "refurbished", "used", "cpo", ""],
            "rejectHashed": true
          },
          "maxCountOfExamplesToShow": 5
        }, {
          "key": "description",
          "label": "Product Description",
          "examples": ["A Wild Pikachu", "Groot Chia Pet"],
          "type": "string",
          "typeParams": {
            "test": "\\S"
          }
        }, {
          "key": "gtin",
          "label": "Product GTIN",
          "type": "string",
          "typeParams": {
            "test": "\\S"
          }
        }, {
          "key": "image_url",
          "label": "Product Image URL",
          "examples": ["https://www.facebook.com/t_shirt_image_001.jpg"],
          "type": "string",
          "typeParams": {
            "test": "^https?\\:\\/\\/.*"
          }
        }, {
          "key": "manufacturer_part_number",
          "label": "Product Manufacturer Part Number",
          "type": "string",
          "typeParams": {
            "test": "\\S"
          }
        }, {
          "key": "name",
          "label": "Product Name",
          "examples": ["Product Name"],
          "type": "string",
          "typeParams": {
            "test": "\\S"
          }
        }, {
          "key": "price",
          "label": "Product Price",
          "examples": ["2534"],
          "type": "number",
          "typeParams": {
            "integer": true,
            "moreThan": 0,
            "rejectHashed": true
          }
        }, {
          "key": "product_type",
          "label": "Product Type",
          "examples": ["Pet Pedometers", "Drum Pedals"],
          "type": "string"
        }, {
          "key": "retailer_id",
          "label": "Unique Product ID",
          "examples": ["retailer_item_id_1", "content_id_1"],
          "type": "string",
          "typeParams": {
            "test": "\\S"
          }
        }, {
          "key": "url",
          "label": "Product URL",
          "examples": ["https://www.facebook.com/facebook_t_shirt"],
          "type": "string",
          "typeParams": {
            "test": "^https?\\:\\/\\/.*"
          }
        }, {
          "key": "visibility",
          "label": "Product Visibility",
          "formats": ["", "staging", "published", "hidden", "whitelist_only"],
          "type": "enum",
          "typeParams": {
            "caseInsensitive": true,
            "options": ["", "staging", "published", "hidden", "whitelist_only"],
            "rejectHashed": true
          },
          "maxCountOfExamplesToShow": 5
        }]
      }
    },
    "examples": ["[{\"availability\":\"in stock\",\"brand\":\"Facebook\",\"category\":\"2271\",\"condition\":\"new\",\"currency\":\"USD\",\"description\":\"A vibrant crewneck for all shapes and sizes.\",\"image_url\":\"https:\\/\\/www.facebook.com\\/t_shirt_image_001.jpg\",\"name\":\"Facebook T-Shirt (Unisex)\",\"price\":999,\"product_type\":\"Apparel & Accessories > Clothing > Shirts\",\"retailer_id\":\"FB_product_1234\",\"url\":\"https:\\/\\/www.facebook.com\\/t_shirt_001.jpg\"}]"]
  }, {
    "key": "contents",
    "label": "Contents",
    "type": "json_list",
    "typeParams": {
      "maxItemsAllowed": 100,
      "nestedPropSchema": {
        "additionalInfoURL": "https://www.facebook.com/help/606443329504150",
        "id": "oc_contents_schema",
        "version": "0.0.1",
        "exampleFiles": {
          "csv": "https://www.facebook.com/images/ads/signals/example_files/example_audience_file.csv"
        },
        "validIf": {
          "rule": "meetAll",
          "args": [{
            "rule": "dependentProps",
            "name": "require_content_type_if_content_ids",
            "args": [{
              "rule": "propValid",
              "args": "content_ids"
            }, ["content_type"]]
          }, {
            "rule": "dependentProps",
            "name": "require_currency_if_value",
            "args": [{
              "rule": "propValid",
              "args": "value"
            }, ["currency"]]
          }, {
            "rule": "dependentProps",
            "name": "require_value_if_currency",
            "args": [{
              "rule": "propValid",
              "args": "currency"
            }, ["value"]]
          }]
        },
        "props": [{
          "key": "content_type",
          "label": "Content Type",
          "type": "LIST",
          "typeParams": {
            "rejectEmptyList": true,
            "rejectHashed": true,
            "caseInsensitiveElements": true,
            "options": ["product", "product_group", "fb_product", "destination", "flight", "hotel", "home_listing", "home_service_provider", "auto_offer", "vehicle", "vehicle_offer", "media_title", "test_vertical"]
          },
          "examples": ["product", ["product", "destination"], "[product]", "[product, destination]"]
        }, {
          "key": "content_ids",
          "label": "Content Ids",
          "examples": [["2", "A3"]],
          "type": "LIST",
          "typeParams": {
            "rejectEmptyList": true,
            "rejectHashed": true
          }
        }, {
          "key": "value",
          "label": "Value",
          "examples": ["2534"],
          "type": "number",
          "typeParams": {
            "moreThan": 0,
            "rejectHashed": true
          }
        }, {
          "key": "currency",
          "label": "Currency",
          "examples": ["USD", "HUF"],
          "type": "currency_code"
        }, {
          "key": "item_number",
          "label": "Item Number",
          "examples": ["1", "A2"],
          "type": "string",
          "typeParams": {
            "test": "\\S"
          }
        }, {
          "key": "quantity",
          "label": "Quantity",
          "examples": ["1"],
          "type": "number",
          "typeParams": {
            "integer": true,
            "moreThan": 0,
            "rejectHashed": true
          }
        }]
      }
    },
    "examples": ["[{\"content_type\":\"product\",\"content_ids\":\"[123, 345]\",\"item_number\":\"1\",\"value\":20,\"currency\":\"USD\",\"quantity\":1}]"]
  }],
  "baseSchema": {
    "id": "event_data_schema",
    "version": "0.0.1"
  }
};

module.exports = SignalsEventDataSchema;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  additionalInfoURL: 'https://www.facebook.com/help/606443329504150',
  id: 'event_data_schema',
  version: '0.0.2',
  exampleFiles: {
    csv: 'https://www.facebook.com/images/ads/signals/example_files/example_events_file.csv'
  },
  validIf: {
    rule: 'meetAll',
    args: [{
      rule: 'meetAll',
      args: [{
        rule: 'propValid',
        name: 'valid_event_time',
        args: 'event_time'
      }, {
        rule: 'propValid',
        name: 'valid_event_name',
        args: 'event_name'
      }, {
        rule: 'dependentProps',
        name: 'require_value_and_currency_if_purchase',
        args: [{
          rule: 'propValueIs',
          args: ['event_name', 'Purchase']
        }, ['value', 'currency']]
      }, {
        rule: 'dependentProps',
        name: 'require_currency_if_value',
        args: [{
          rule: 'propValid',
          args: 'value'
        }, ['currency']]
      }, {
        rule: 'dependentProps',
        name: 'require_value_if_currency',
        args: [{
          rule: 'propValid',
          args: 'currency'
        }, ['value']]
      }]
    }, {
      rule: 'meetAll',
      args: [{
        rule: 'dependentProps',
        name: 'require_content_type_if_content_ids',
        args: [{
          rule: 'propValid',
          args: 'content_ids'
        }, ['content_type']]
      }]
    }]
  },
  props: [{
    key: 'event_time',
    label: 'Event Time',
    examples: ['2016-06-20T03:21:48+01:00', '2016-06-20T03:21:48', '1459315678', 'mm/dd/yyyy', '+ 15 more'],
    typeParams: {
      rejectTimeBefore: 63072000000
    },
    type: 'unix_time'
  }, {
    key: 'event_name',
    label: 'Event Name',
    formats: ['AddPaymentInfo', 'AddToCart', 'AddToWishlist', 'CompleteRegistration', 'InitiateCheckout', 'Lead', 'Purchase', 'Search', 'ViewContent', 'Other'],
    type: 'enum',
    typeParams: {
      caseInsensitive: true,
      options: ['AddPaymentInfo', 'AddToCart', 'AddToWishlist', 'CompleteRegistration', 'InitiateCheckout', 'Lead', 'Purchase', 'Search', 'ViewContent', 'Other'],
      rejectHashed: true
    },
    maxCountOfExamplesToShow: 30
  }, {
    key: 'match_keys',
    label: 'Match keys',
    type: {
      id: 'extended_pii_schema',
      version: '0.2.0',
      type: 'pii_keys',
      validIf: {
        rule: 'minValidProps',
        args: 1
      },
      props: [{
        key: 'email',
        maxOccurrence: 3,
        label: 'Email',
        type: 'sha256'
      }, {
        key: 'phone',
        maxOccurrence: 3,
        label: 'Phone',
        type: 'sha256'
      }, {
        key: 'madid',
        label: 'Mobile advertiser ID',
        type: 'sha256'
      }, {
        key: 'fn',
        label: 'First name',
        type: 'sha256'
      }, {
        key: 'fi',
        label: 'First name initial',
        type: 'sha256'
      }, {
        key: 'f5first',
        label: 'First five letters of first name',
        type: 'sha256'
      }, {
        key: 'ln',
        label: 'Last name',
        type: 'sha256'
      }, {
        key: 'f5last',
        label: 'First five letters of last name',
        type: 'sha256'
      }, {
        key: 'ct',
        label: 'City',
        type: 'sha256'
      }, {
        key: 'st',
        label: 'State/Province',
        type: 'sha256'
      }, {
        key: 'country',
        label: 'Country',
        type: 'sha256'
      }, {
        key: 'zip',
        label: 'ZIP/Postal Code',
        type: 'sha256'
      }, {
        key: 'gen',
        label: 'Gender',
        type: 'sha256',
        typeParams: {
          options: ['252f10c83610ebca1a059c0bae8255eba2f95be4d1d7bcfa89d7248a82d9f111', '62c66a7a5dd70c3146618063c344e531e6d4b59e379808443ce962b3abd63c5a']
        }
      }, {
        key: 'doby',
        label: 'Year of birth',
        type: 'sha256',
        typeParams: {
          options: ['e41d64db5703c6440b5c714d57251a845bc0bd241480b41a4e7fd3e052f85a82', 'a56b54e1c5933a83f79b301d0c08410a5617b868120da82b7e088c42a5a8025c', '489ca219174f91b48313c188f4c998a5413fcaf194a93fd8e24bbdb178dc8f3a', '262b06d105e1c865b01c3e0a74291cdae511ef15f3d456e14fbe2dffd9efe3b9', '90bbc9533a02213ffdf4d1482eb9b97a5feec554e33641d40f24777cbe5a8341', '56a3a46a3ba4fb713fd3e4cfa51a5748abf2c2662fefb0b5a863fdef34572255', 'a486e5558353d0a590552ea5e0b0ccf4d2d9a1ea92d319b2ad5711e9ba10deb1', '4332cd76590d0efdbd8d067acf531546da2ba0a67c538440e7defedbea48d1dc', '00f6112fe58387958ef80793a34746429f40c97fe7b51d6a576705acbf8fc6af', '8e614d39a1f1279958da1c9f7e8df51db4aabca8cc3a3e84f8c3dc5f88e1fcfb', 'a64332fe1df1790cb79d428bf5b5767ddd589b1cca825cb1b9eb30f7e9aaee03', 'dc4bc886825c446e6ae02d4d0c6a8787af0395079effcc3afc0f8bdc40cbd161', 'a991b89eed28e85e1a7238873f922290111049668c680a68ee15201a611219b3', '3b1fba0616142d348bd8a977e3aa3d65dab82a5ac11ed16d4e22ff5460458d4f', 'fb4a379d44cab4220bc5596ffa1f8eb9b169ba098d2c98b20d110881c92b9299', '811af1590c16fc90322a05ab17f360939077f63f674a7e0550732a36050444ac', 'c30c6b3aa67e27e0fc807ab96edfc920b08ca09b98c942a593aff6c832957388', '464d14ace7f6789141d13ed416c881c1bfcf7203c5965e332edda90f171815a7', '54e87e2783378cd883fb63bea84e2ecdd554b0646ec35a12d6df365ccad3c68b', '274dfec6e079fb08d6b5771537c54d3f0bd36c64c3d8ed0a4e6d2f201b489274', '6b5f40c09215713a1fa83ea2de2adcae17e605b8958a2d7379e15b561687ee8f', 'd982309a461bcc3abc15489201522c8df291aa650eabafda45f1583b03992cc9', '2c1f3f5f6523af84fde4af934caa1126ae6bcebacd36e397fbddcb8a620c1d73', 'd42ed19c0d9c80706b6b1484a97cf8634285d753ac079717aee8c651d54caef3', '3849ba084da2faea804918e8d999dee3f176659e0216debcccbf86b3e6b769ef', '80f8ded29fa2e922c77b98ea8f229ef65ea360daf5d1c9e05b80539e502b5621', '255ac64f2a9b374157860601793d61491c561c29df77cbf82d4610772937ce59', '3d5d2c29712a98874d8142d229c4bce09158a144ad376c2b68411f240878a9c1', 'aef662afc24b5edde66ab972975340f6a9963eb766261e6bf43ffdb56b6d2a3f', '639c1115ab55d139a527f7bb3c1a9570bb60cf96f5c13bdaa41a7264a74e748f', '70fa656aa0391eb9ef7bbc9c7e6771ec09e7d5d7ab1fcbbde2480d21263ee79a', '5c06e46c5e47cfacad16ce1e37f17c09fdbc7072c567613e0b8112173f688a65', '01a0123885ebec5b37b52ddc058c20d052525c654b69e7b7bfd5feb291428bba', 'c8c817e80216ce409c63a735acdd40fb7b023bcca6e87b6fc89973c447b6a858', '914c948388ae30bdb0179a2f7bc91836d6af004171af735188fc1b69c286c864', '2e355fa8b5acf07f4608835401e5a6144f25c505ed9d2689f93df6382890a79c', '3f46bdea034f311a14efe877f5592d84a7a6c97d9b917be3f55573311e6cdda7', 'c6f5c46f9e3daea6422f8a004682a5de6f6946a9cfb7c9ca71912c029a981403', '6eac02c2ab0dc9378be87d5d04da2fd747fb2340dad4977778defee7da92f657', '94ad0b5b0a595b7eaafe9404423d8543b4c8dcfc26ecffb44f6894e2ca46fd61', 'd0ab864a17dbd8a07dda05a58ac74d4894b7effa8e1c5152d71adf8b1fcc24d9', '5933b0b35d5d3e9d1f53fbce9403c5672883fff37f429dc1da26881f47415672', '7fb754c0792cd52ea50ce5b8862b5b07d5aa45af1dbfa035f862cdb6a030b427', '66a7a5807c3130eb2d0b55bb260a6a001b9d62095c94b753cbb215f3e4f099e1', 'f513a0aa4f8f39744c6fddf2b5eb18cc1eac55ca866a1b243d835362a023f243', '060672b8531404f598515957df33d6387e0647cbc382d35ef286fa3466362384', '8ba5ef4e282bf7bc5cf13f731a1b9f525bd3b1f69cbfa24c1c69c303c0ac7019', '8eec27653c19ed078b2f3bae16ff901d16347d7917d2b8e2317914e2437bf324', '03b0bd366e8184f8d871c3a7c7cc26c73c25b54ff54c64b28b10b898242cdc8a', '82887006d04d939ffca870bc268a940df6cf01dbdf12e228ccf476d07d7c9424', '3f5f3806e425deac33023e9764d08ac98397e6f1bc8599743cbb15a9cfdf8929', '3510a92fc7dd04f69b1aeeef5489ef168dbf1d9c4d528b8f4af4240a8b295ab4', '6ed701cfedb16ebd91b2d185383115c6f9ce12f2f9c744d7d605be0002109362', '592fbed6f4ef4a643b0c5dec00a9a32f69a4027aedb972265cd9237b7b31d564', '98f3aaa79f6ba1759e046f873955785d869eec78b60ff7ad2f1bb62d50ea8a0a', 'b53a7292b38e011dbe6efc79c22d028ddd364da2e6b9aa182915572742330ea9', '04aa39fcb509e7842f0bd5b135b6181b0b57c8a74422838362f430351fc364f2', 'd212b2ac736e3f60408ffe9fbc1d26ae901f8f477fb8b08ec03c9d6b0208ac2b', '522e6198a268c62c01c9944cc2c06902d8308d65e6444eb8ad10bbe98dc362b6', '5c0b1ae7ef3b0e1552cd215596a4449a8bcd5d060f18511da8e63b87f67c11f6', '6606753e5a126d7068012a526d44c3eb2f7fcd09d5faeb30c77dbfd87ca7e758', 'f7ac69722a0706c533afa393b1574a761a073df0a8280094d3500a4bbc9c2877', '9aec25da37c5143655198925302a995797eeef538933800b67b87c48de7ad120', '59279341ea59fbf34025024596b670b6df2c9f80e71b9ad19aea71ba43b083fc', 'ed823ec32c5d4e9ca9dd968bb0fe9366b7d904ce0cae615308ddd5b89f0e6a3a', 'd7c7673ba8ca7b0f04b1af4df026cbea7fed5b8acf59b27d33ef988c60eff054', 'c00cf031587d12c309358e85de8876b2738d3ef2cadd88db6b07318ea0ba8973', '50828327cbf487d99d22c77ef8f980e5d7c8b93e2a1d1b084e2dc6760240e738', 'a48622b535728587fd351763d1296c7ec9cb5bc6743d5f22b011d5b5c3ef688f', 'fd21cc3cb5062bc4ac714c489e1ca0e37a577c19ba23b0d00e9767f598d37636', 'ad1f3889d0032e7c2791053060e4c044837353325fbd42cdeeef65638ed31c2a', '2b5d2ba5803e6fe3a2bc08b5f3965f47a92918a9c44b8090618d5d5a2876cf8c', '0a95adbf8581859ae0cc477127abeaf4ad89916405c41855af8fbc482e1634e8', '9baed8fceea6e36d36670d72429d909547165efc038c293a14a41ef2edf83141', 'ec54e99514663edb97adef400fbf34a77daae108303d3da8008a7dfb4cdf0f52', '20ee235b5de5b36244da6f9aa1cbdd032a90867ba92276ccc8c38c0d0d57fcec', '4c3aada37cf7fd3819b2da502a15f78f7ce5a2ce6d584b630344ff00dffc74ac', '576c85c584f60555c2a024cbb99dfbbdb5f58c3bdcf28dbc8ea315fd46a388f3', '46635b56d3c7f0b7bb26adae2a1692debbfd145d4a0986a9137fe91e73e70360', '11d1ff4edd53407199c92b00cbc3abe8c9c5d5bed4414ad07b55c896b0e7a713', '051c2e380d07844ffaca43743957f8c0efe2bdf74c6c1e6a9dcccb8d1a3c596b', 'a78f19952edd18bf02b3c9eb704b088e2120941d6acb22f6f795c42796e60252', '48deb732e8de8fe7995bbc2816520798fcab815f62165af4d53bbc24434c963e', '52bb7cc738dbf5e5eee2c76754d87904e6750c63eda5e0a866197d2e16d9c142', '4dea5c7cb70f50322ec9d734aa4aa078be9227c05251e18991c596f387552370', '78e370b587b145920213731b7c7c725e512b3b6577c51c800218a7c764c532ae', '8f8472a2f6ec348bfc7577a035c7f34a04c62f0c757b54687e1175236dcf393b', '744b93f9950fc38dad705556931ea48193b99dcb191cc9bd77097f65fbe2f0b8', '8266498d969081c29737b8daeb5b51d60e56d008fff243a39d16c3032d42f6cf', '9113b98df80f877c7a2ee5d865a04c9514b4e9bf25a49d315b0b15f115d2f0d2', 'a7be8e1fe282a37cd666e0632b17d933fa13f21addf4798fc0455bc166e2488c', '8e9b669109df89620b94f2387dc53206a82ddc71d658f8f7a2b3a9b417370d3e', '3f83e9ad5be63bd5bf2fd009fffe6b7dd4066243975bc962edc37459c17e65b9', '8e71b24534e9f3fb3a71263359fed2b7ffb008265e0d34383e319f1b6f5c08f2', '1bc3201a9f24a2fe48f634f90d406aaf6cbf5e36e292870ecba98d74b065ee1b', 'e78f27ab3ef177a9926e6b90e572b9853ce6cf4d87512836e9ae85807ec9d7fe', '3d1e557b540ac045b3b327994a351f08a443f9216f9b2b8d3a0f42b58671ac83', '0985b889a1fe4f4e1fb925061ac6fb2247f10875f5fcbe63eec2ab55ed68970e', 'd54123de468bd42ea00dafbd777f85fe5fa1ff6404d9838c007953c25c92a1c5', 'ce8457d59078a699acb70416f88155a96a906b7b7aad43708402e3a3bcc8a4b4', '81a83544cf93c245178cbc1620030f1123f435af867c79d87135983c52ab39d9', '85d6385b945c0d602103db39b0b654b2af93b5127938e26a959c123f0789b948', '6c94e35ccc352d4e9ef0b99562cff995a5741ce8de8ad11b568892934daee366', '77459b9b941bcb4714d0c121313c900ecf30541d158eb2b9b178cdb8eca6457e', '483029d526219f816e8e8f6a9de07b422633dba180ffc26faac22862a017519f', 'a20a2b7bb0842d5cf8a0c06c626421fd51ec103925c1819a51271f2779afa730', '6f6a4e56098cfd9af29e3ae549503b370211a4e94421457fe4cfd39a38a1fa08', 'f1cfa5ebb149e8099d561aae57beed6c68f990f45a910ea9d7b460dbcc5350be', 'e5e53c784d5d49de1cabb6e904bf3380026aadcb9769775a268dd304dd9aa2df', 'f37f3f2b0dc57a86dee4ba6ff855283bb4d2f0dea1c5bd1b708853444c2ffcec', '7d12ba56e9f8b3dc64f77c87318c4f37bc12cfbf1a37573cdf3e4fa683f20155', '72d1b5da6eeaf1789df86487da50ad5e9dadb5ffaecb56b6de592aa286c9c1b8', '4b9a7f50c0bb198c6f5414c5a8459f5d216d34ab521ea94c060ea35cac66f900', '7931aa2a1bed855457d1ddf6bc06ab4406a9fba0579045a4d6ff78f9c07c440f', '96da37e95d5cc34fe3bef6c89428df859b8a217630d0c664da1daf1539caacf5', 'a85e9db4851f7cd3efb8db7bf69a07cfb97bc528b72785a9cff7bdfef7e2279d', 'da6e2f539726fabd1f8cd7c9469a22b36769137975b28abc65fe2dc29e659b77', '46e67c525617663b392a53c0e94ba79e62db62a851fb175ae87756d4e73c9718', '152e69cf3c8e76c8d8b0aed924ddd1708e4c68624611af33d52c2c2814dd5df9', '023e33504ab909cf87a6f4e4e545090e40bdc0a2153e5b68b19f7fad2b737904', '73a2af8864fc500fa49048bf3003776c19938f360e56bd03663866fb3087884a', '1bea20e1df19b12013976de2b5e0e3d1fb4ba088b59fe53642c324298b21ffd9', 'b1ab1e892617f210425f658cf1d361b5489028c8771b56d845fe1c62c1fbc8b0', 'd398b29d3dbbb9bf201d4c7e1c19ff9d43c15fd45a0cec46fbe9885ec3f6e97f', '6557739a67283a8de383fc5c0997fbec7c5721a46f28f3235fc9607598d9016b', 'b2b2f104d32c638903e151a9b20d6e27b41d8c0c84cf8458738f83ca2f1dd744', '158a323a7ba44870f23d96f1516dd70aa48e9a72db4ebb026b0a89e212a208ab', '5313e5bf17148de844ff74be3663d47c6e361ca469b30a36337701233c89a15e', '6ae9e4d22c4670b9140fc378214b3274fb3f64d16058717f974515000680b24c', '8f0f97e140e126a4404a09eb1e14a53b7c742701c4290a5d1702d14daec22ee8', '8e1f192fe25ad49be764c3f55c68beb32f7aa66f85344e026b76cfaaa1d3d88a']
        }
      }, {
        key: 'dobm',
        label: 'Month of birth',
        type: 'sha256',
        typeParams: {
          options: ['938db8c9f82c8cb58d3f3ef4fd250036a48d26a712753d2fde5abd03a85cabf4', 'a953f09a1b6b6725b81956e9ad0b1eb49e3ad40004c04307ef8af6246a054116', '0b8efa5a3bf104413a725c6ff0459a6be12b1fd33314cbb138745baf39504ae5', '6cd5b6e51936a442b973660c21553dd22bd72ddc8751132a943475288113b4c0', 'c97550ce8213ef5cf6ed4ba48790c137df3ef6a5da20b48961001a634b6cead2', 'aacd834b5cdc64a329e27649143406dd068306542988dfc250d6184745894849', '19b100ab7725c612f3d80ff203ca53cea5cadaafae3bf0f88f0fb4089fe08815', '323783be9a53a31e158ec9600626a4703e99f4e183bc1acb8772cbdf5c3a1ece', '3514acf61732f662da19625f7fe781c3e483f2dce8506012f3bb393f5003e105', '4a44dc15364204a80fe80e9039455cc1608281820fe2b24f1e5233ade6af1dd5', '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8', '6b51d431df5d7f141cbececcf79edf3dd861c3b4069f0b11661a3eefacbba918']
        }
      }, {
        key: 'dobd',
        label: 'Day of birth',
        type: 'sha256',
        typeParams: {
          options: ['938db8c9f82c8cb58d3f3ef4fd250036a48d26a712753d2fde5abd03a85cabf4', 'a953f09a1b6b6725b81956e9ad0b1eb49e3ad40004c04307ef8af6246a054116', '0b8efa5a3bf104413a725c6ff0459a6be12b1fd33314cbb138745baf39504ae5', '6cd5b6e51936a442b973660c21553dd22bd72ddc8751132a943475288113b4c0', 'c97550ce8213ef5cf6ed4ba48790c137df3ef6a5da20b48961001a634b6cead2', 'aacd834b5cdc64a329e27649143406dd068306542988dfc250d6184745894849', '19b100ab7725c612f3d80ff203ca53cea5cadaafae3bf0f88f0fb4089fe08815', '323783be9a53a31e158ec9600626a4703e99f4e183bc1acb8772cbdf5c3a1ece', '3514acf61732f662da19625f7fe781c3e483f2dce8506012f3bb393f5003e105', '4a44dc15364204a80fe80e9039455cc1608281820fe2b24f1e5233ade6af1dd5', '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8', '6b51d431df5d7f141cbececcf79edf3dd861c3b4069f0b11661a3eefacbba918', '3fdba35f04dc8c462986c992bcf875546257113072a909c162f7e470e581e278', '8527a891e224136950ff32ca212b45bc93f69fbb801c3b1ebedac52775f99e61', 'e629fa6598d732768f7c726b4b621285f9c3b85303900aa912017db7617d8bdb', 'b17ef6d19c7a5b1ee83b907c595526dcb1eb06db8227d650d5dda0a9f4ce8cd9', '4523540f1504cd17100c4835e85b7eefd49911580f8efff0599a8f283be6b9e3', '4ec9599fc203d176a301536c2e091a19bc852759b255bd6818810a42c5fed14a', '9400f1b21cb527d7fa3d3eabba93557a18ebe7a2ca4e471cfe5e4c5b4ca7f767', 'f5ca38f748a1d6eaf726b8a42fb575c3c71f1864a8143301782de13da2d9202b', '6f4b6612125fb3a0daecd2799dfd6c9c299424fd920f9b308110a2c1fbd8f443', '785f3ec7eb32f30b90cd0fcf3657d388b5ff4297f2f9716ff66e9b69c05ddd09', '535fa30d7e25dd8a49f1536779734ec8286108d115da5045d77f3b4185d8f790', 'c2356069e9d1e79ca924378153cfbbfb4d4416b1f99d41a2940bfdb66c5319db', 'b7a56873cd771f2c446d369b649430b65a756ba278ff97ec81bb6f55b2e73569', '5f9c4ab08cac7457e9111a30e4664920607ea2c115a1433d7be98e97e64244ca', '670671cd97404156226e507973f2ab8330d3022ca96e0c93bdbdb320c41adcaf', '59e19706d51d39f66711c2653cd7eb1291c94d9b55eb14bda74ce4dc636d015a', '35135aaa6cc23891b40cb3f378c53a17a1127210ce60e125ccf03efcfdaec458', '624b60c58c9d8bfb6ff1886c2fd605d2adeb6ea4da576068201b6c6958ce93f4', 'eb1e33e8a81b697b75855af6bfcdbcbf7cbbde9f94962ceaec1ed8af21f5a50f']
        }
      }, {
        key: 'appuid',
        label: 'Facebook App User ID (Not Hashed)',
        examples: ['1234567890', '1443637309', '1234567892'],
        type: 'fbid',
        typeParams: {
          scoped: true,
          rejectHashed: true
        }
      }, {
        key: 'pageuid',
        label: 'Facebook Page User ID (Not Hashed)',
        examples: ['1234567890', '1443637309', '1234567892'],
        type: 'fbid',
        typeParams: {
          scoped: true,
          rejectHashed: true
        }
      }, {
        key: 'extern_id',
        label: 'External ID',
        description: 'Advertiser-specific or third-party ID',
        examples: ['ABX1234', '99931356', '12XYZ981'],
        type: 'string',
        typeParams: {
          doNotHash: true,
          test: '^(?!\\s*$).+'
        }
      }, {
        key: 'lead_id',
        label: 'Lead ID',
        description: 'Facebook Lead ID',
        examples: ['7543756327866', '4234567890123', 'l:4234567890123'],
        type: 'fbid',
        typeParams: {
          rejectHashed: true,
          stripPrefix: true
        }
      }],
      baseSchema: {
        id: 'hashed_basic_pii_schema',
        version: '0.0.1'
      }
    }
  }, {
    key: 'custom_data',
    label: 'CustomData',
    type: {
      canHaveExtraProps: true
    }
  }, {
    key: 'value',
    label: 'Value',
    examples: ['2534'],
    type: 'number',
    typeParams: {
      moreThan: 0,
      rejectHashed: true
    }
  }, {
    key: 'currency',
    label: 'Currency',
    examples: ['USD', 'HUF'],
    type: 'currency_code'
  }, {
    key: 'order_id',
    label: 'Order ID',
    examples: ['ABC123', '123DEF'],
    type: 'string'
  }, {
    key: 'item_number',
    label: 'Item Number',
    examples: ['1', 'A2'],
    type: 'string'
  }, {
    key: 'content_type',
    label: 'Content Type',
    type: 'LIST',
    typeParams: {
      rejectEmptyList: true,
      rejectHashed: true,
      caseInsensitiveElements: true,
      options: ['product', 'product_group', 'fb_product', 'destination', 'flight', 'hotel', 'home_listing', 'home_service_provider', 'auto_offer', 'vehicle', 'vehicle_offer', 'test_vertical']
    },
    examples: ['product', ['product'], ['product', 'destination']]
  }, {
    key: 'content_ids',
    label: 'Content Ids',
    examples: [['1'], ['2', 'A3']],
    type: 'LIST',
    typeParams: {
      rejectEmptyList: true,
      rejectHashed: true
    }
  }],
  baseSchema: {
    id: 'event_data_schema',
    version: '0.0.1'
  }
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    "additionalInfoURL": "https:\/\/www.facebook.com\/help\/606443329504150",
    "id": "basic_pii_schema",
    "version": "0.0.1",
    "type": "pii_keys",
    "exampleFiles": {
        "csv": "https:\/\/www.facebook.com\/images\/ads\/signals\/example_files\/example_audience_file.csv"
    },
    "validIf": {
        "rule": "minValidProps",
        "args": 1
    },
    "transform": ["processPIISignalBeforeUpload"],
    "props": [{
        "key": "email",
        "maxOccurrence": 3,
        "label": "Email",
        "examples": ["Emily@example.com", "John@example.com", "Helena@example.com"],
        "type": "email"
    }, {
        "key": "phone",
        "maxOccurrence": 3,
        "label": "Phone Number",
        "examples": ["1(222)333-4444", "001(222)333-4444", "+12223334444"],
        "type": "phone_number"
    }, {
        "key": "madid",
        "label": "Mobile Advertiser ID",
        "formats": ["Android's Advertising ID(AAID)", "Apple's Advertising Identifier(IDFA)"],
        "type": "string",
        "typeParams": {
            "lowercase": true,
            "strip": "whitespace_only",
            "test": "^([a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}|[a-zA-Z0-9]{6}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{13})$"
        }
    }, {
        "key": "fn",
        "label": "First Name",
        "examples": ["John", "F.", "Fr&eacute;d&eacute;drique"],
        "type": "string",
        "typeParams": {
            "lowercase": true,
            "strip": "whitespace_and_punctuation"
        }
    }, {
        "key": "ln",
        "label": "Last Name",
        "examples": ["Smith", "S&oslash;rensen", "Jacobs-Anderson"],
        "type": "string",
        "typeParams": {
            "lowercase": true,
            "strip": "whitespace_and_punctuation"
        }
    }, {
        "key": "zip",
        "label": "ZIP\/Postal Code",
        "examples": ["94025", "94025-3215", "L3T 5M7"],
        "type": "postal_code"
    }, {
        "key": "ct",
        "label": "City",
        "examples": ["Menlo Park", "Seattle", "London"],
        "type": "string",
        "typeParams": {
            "lowercase": true,
            "strip": "all_non_latin_alpha_numeric",
            "test": "^[a-z]+"
        }
    }, {
        "key": "st",
        "label": "State\/Province",
        "examples": ["CA", "Califonia", "Texas"],
        "type": "string",
        "typeParams": {
            "lowercase": true,
            "strip": "all_non_latin_alpha_numeric",
            "test": "^[a-z]+"
        }
    }, {
        "key": "country",
        "label": "Country",
        "examples": ["US", "GB", "FR"],
        "type": "string",
        "typeParams": {
            "lowercase": true,
            "strip": "whitespace_only",
            "test": "^[a-zA-Z]{2,2}"
        }
    }, {
        "key": "dob",
        "label": "Date of Birth",
        "examples": ["mm\/dd\/yyyy", "mm\/dd\/yy", "yyyy-mm-dd", "+ 15 more"],
        "type": "date",
        "typeParams": {
            "rejectHashed": true
        }
    }, {
        "key": "doby",
        "label": "Year of Birth",
        "type": "string",
        "typeParams": {
            "test": "^[0-9]{4,4}$"
        },
        "examples": ["1978", "1962", "1990"]
    }, {
        "key": "gen",
        "label": "Gender",
        "examples": ["M", "F"],
        "type": "enum",
        "typeParams": {
            "lowercase": true,
            "options": ["f", "m"]
        }
    }, {
        "key": "age",
        "label": "Age",
        "examples": [65, 42, 21],
        "type": "number",
        "typeParams": {
            "min": 0
        }
    }, {
        "key": "appuid",
        "label": "Facebook App User ID",
        "examples": ["1234567890", "1443637309", "1234567892"],
        "type": "fbid",
        "typeParams": {
            "scoped": true,
            "rejectHashed": true
        }
    }, {
        "key": "fi",
        "noUI": true,
        "label": "First name initial",
        "type": "string",
        "typeParams": {
            "lowercase": true,
            "strip": "whitespace_only",
            "test": "^[a-z]{1,1}$"
        }
    }, {
        "key": "f5first",
        "noUI": true,
        "label": "First five letters of first name",
        "type": "string",
        "typeParams": {
            "lowercase": true,
            "strip": "whitespace_only",
            "test": "^[a-z]{5,5}$"
        }
    }, {
        "key": "f5last",
        "noUI": true,
        "label": "First five letters of last name",
        "type": "string",
        "typeParams": {
            "lowercase": true,
            "strip": "whitespace_only",
            "test": "^[a-z]{5,5}$"
        }
    }, {
        "key": "pageuid",
        "label": "Facebook Page User ID",
        "examples": ["1234567890", "1443637309", "1234567892"],
        "type": "fbid",
        "typeParams": {
            "scoped": true,
            "rejectHashed": true
        }
    }]
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var invariant = __webpack_require__(1);

function getTestUploadResult(numRowsProcessed, normalizerSettings, normalizationErrorReport, validateResult) {
  var errorReport = normalizationErrorReport;
  invariant(errorReport.type === 'advanced', 'Invalid error report.');

  var serverSideValidationResult = {
    totalValidatedCount: validateResult.total_validated_count,
    noMatchKeysCount: validateResult.events_without_match_keys_count,
    matchCount: validateResult.match_count,
    uniqueEventTimeOfDayCount: validateResult.unique_event_time_of_day_count,
    eventsLagged2DaysCount: validateResult.events_lagged_2_days_count,
    eventsLagged90DaysCount: validateResult.events_lagged_90_days_count,
    eventsWithValueCount: validateResult.events_with_value_count,
    uniqueValueCount: validateResult.unique_value_count,
    noOrderidCount: validateResult.no_orderid_count,
    itemnumNoOrderidCount: validateResult.events_with_itemnum_no_orderid_count,
    nonuniqueOrderidItemnumCount: validateResult.nonunique_orderid_itemnum_count,
    orderidItemnumNonuniqueEventTimeCount: validateResult.orderid_itemnum_nonunique_event_time_count,
    orderidNonuniqueMatchKeysCount: validateResult.orderid_nonunique_match_keys_count,
    dataSetNotAssignedToAdAccount: validateResult.dataset_not_assigned_to_adaccount,
    eventsBeforeAdAccountAssignment: validateResult.events_before_adaccount_assignment.map(function (warning) {
      return {
        id: warning.adaccount_id,
        name: warning.adaccount_name,
        assignTime: warning.assign_time,
        count: warning.events_before_assignment
      };
    })
  };

  var rejectedEvents = {
    total: 0,
    missingPropPaths: errorReport.aggregatedMissingPropPaths,
    numUnknownError: 0
  };
  var incompleteEvents = {
    total: 0,
    columnErrors: []
  };
  var columnStats = {};
  errorReport.invalidSamples.forEach(function (sample) {
    if (sample.rejected) {
      rejectedEvents.total++;
      rejectedEvents.numUnknownError += sample.uncollectedErrors.length > 0 ? 1 : 0;
    } else {
      incompleteEvents.total++;
    }
  });
  Object.keys(errorReport.aggregatedColumnStats).forEach(function (column) {

    var columnIndex = parseInt(column, 10);
    var stats = errorReport.aggregatedColumnStats[column];
    var mapping = normalizerSettings.mapping[column];
    if (mapping != null) {
      if (stats.numInvalidAndNotRejected > 0) {
        incompleteEvents.columnErrors.push({
          column: columnIndex,
          mapping: normalizerSettings.mapping[column],
          numErrors: stats.numInvalidAndNotRejected
        });
      }
      columnStats[columnIndex] = {
        mapping: normalizerSettings.mapping[column],
        numValid: numRowsProcessed - stats.numEmpty - stats.numInvalidAndRejected - stats.numInvalidAndNotRejected,
        numInvalid: stats.numInvalidAndRejected + stats.numInvalidAndNotRejected,
        numEmpty: stats.numEmpty
      };
    }
  });

  return {
    numTotalEvents: numRowsProcessed,
    rejectedEvents: rejectedEvents,
    incompleteEvents: incompleteEvents,
    columnStats: columnStats,
    invalidSamples: errorReport.invalidSamples,
    serverSideValidationResult: serverSideValidationResult
  };
}

module.exports = {
  getTestUploadResult: getTestUploadResult
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ERROR_WEIGHT = {
  NO_VALID_EVENT: 1900000,
  NOT_ASSIGNED_TO_AD_ACCOUNT: 1800000,
  NO_MATCH_KEYS_HIGH: 1700000,
  VERY_LOW_MATCH_RATE: 1600000,
  LAGGED_MORE_THAN_90_DAYS: 1000000,
  INVALID_EVENTS: 1000000,
  ORDERID_ITEMNUM_NONUNIQUE_EVENT_TIME: 900000,
  ORDERID_NONUNIQUE_MATCH_KEYS: 900000,
  LOW_MATCH_RATE: 800000,
  NO_MATCH_KEYS_LOW: 800000,
  ITEMNUM_NO_ORDERID: 100000,
  NONUNIQUE_ORDERID_ITEMNUM: 200000,
  LAGGED_MORE_THAN_2_DAYS: -10000,
  INACCURATE_EVENT_TIME: 0,
  SAME_VALUE_FOR_ALL_EVENTS: 0,
  BEFORE_AD_ACCOUNT_ASSIGNMENT: 0,
  INCOMPLETE_EVENTS: 0,
  LOW_ORDERID_RATE: -10000
};

var LOW_MATCH_RATE_THRESHOLD = 75;
var VERY_LOW_MATCH_RATE_THRESHOLD = 30;
var UNIQUE_TIME_THRESHOLD = 0.25;
var NO_MATCH_KEYS_THRESHOLD_HIGH = 35;
var NO_MATCH_KEYS_THRESHOLD_LOW = 5;
var NO_ORDERID_THRESHOLD = 25;

var NoValidEventIssueChecker = function NoValidEventIssueChecker(result) {
  return result.serverSideValidationResult.totalValidatedCount === 0 ? {
    level: 'error',
    weight: ERROR_WEIGHT.NO_VALID_EVENT,
    issue: {
      type: 'no-events-accepted'
    }
  } : null;
};

var LowMatchRateIssueChecker = function LowMatchRateIssueChecker(result) {
  var serverResult = result.serverSideValidationResult;
  if (serverResult.totalValidatedCount > 0) {
    var _matchRate = Math.round(100 * serverResult.matchCount / serverResult.totalValidatedCount);
    if (_matchRate < LOW_MATCH_RATE_THRESHOLD) {
      return {
        level: _matchRate < VERY_LOW_MATCH_RATE_THRESHOLD ? 'error' : 'warning',
        weight: _matchRate < VERY_LOW_MATCH_RATE_THRESHOLD ? ERROR_WEIGHT.VERY_LOW_MATCH_RATE : ERROR_WEIGHT.LOW_MATCH_RATE,
        issue: {
          type: 'low-match-rate',
          matchRate: _matchRate
        }
      };
    }
  }
  return null;
};

var LowPiiRateIssueChecker = function LowPiiRateIssueChecker(result) {
  var serverResult = result.serverSideValidationResult;
  if (serverResult.totalValidatedCount > 0) {
    var _noPiiRate = Math.round(100 * serverResult.noMatchKeysCount / serverResult.totalValidatedCount);
    if (_noPiiRate > NO_MATCH_KEYS_THRESHOLD_LOW) {
      return {
        level: _noPiiRate > NO_MATCH_KEYS_THRESHOLD_HIGH ? 'error' : 'warning',
        weight: _noPiiRate > NO_MATCH_KEYS_THRESHOLD_HIGH ? ERROR_WEIGHT.NO_MATCH_KEYS_HIGH : ERROR_WEIGHT.NO_MATCH_KEYS_LOW,
        issue: {
          type: 'low-pii-rate',
          noPiiRate: _noPiiRate
        }
      };
    }
  }
  return null;
};

var NotAssignedToAdAccountIssueChecker = function NotAssignedToAdAccountIssueChecker(result) {
  return result.serverSideValidationResult.dataSetNotAssignedToAdAccount ? {
    level: 'error',
    weight: ERROR_WEIGHT.NOT_ASSIGNED_TO_AD_ACCOUNT,
    issue: {
      type: 'not-assigned-to-account'
    }
  } : null;
};

var EventsLagged90DaysIssueChecker = function EventsLagged90DaysIssueChecker(result) {
  var serverResult = result.serverSideValidationResult;
  return serverResult.eventsLagged90DaysCount > 0 ? {
    level: 'error',
    weight: ERROR_WEIGHT.LAGGED_MORE_THAN_90_DAYS + serverResult.eventsLagged90DaysCount,
    issue: {
      type: 'events-lagged-90d',
      count: serverResult.eventsLagged90DaysCount
    }
  } : null;
};

var EventsLagged2DaysIssueChecker = function EventsLagged2DaysIssueChecker(result) {
  var serverResult = result.serverSideValidationResult;
  return serverResult.eventsLagged2DaysCount > 0 ? {
    level: 'recommendation',
    weight: ERROR_WEIGHT.LAGGED_MORE_THAN_2_DAYS + serverResult.eventsLagged2DaysCount,
    issue: {
      type: 'events-lagged-2d',
      count: serverResult.eventsLagged2DaysCount
    }
  } : null;
};

var InaccurateEventTimeIssueChecker = function InaccurateEventTimeIssueChecker(result) {
  var serverResult = result.serverSideValidationResult;
  return serverResult.uniqueEventTimeOfDayCount < serverResult.totalValidatedCount * UNIQUE_TIME_THRESHOLD ? {
    level: 'warning',
    weight: ERROR_WEIGHT.INACCURATE_EVENT_TIME,
    issue: {
      type: 'inaccurate-event-time'
    }
  } : null;
};

var SameValueIssueChecker = function SameValueIssueChecker(result) {
  var serverResult = result.serverSideValidationResult;
  return serverResult.uniqueValueCount === 1 && serverResult.totalValidatedCount > 1 ? {
    level: 'warning',
    weight: ERROR_WEIGHT.SAME_VALUE_FOR_ALL_EVENTS,
    issue: {
      type: 'same-value'
    }
  } : null;
};

var EventsBeforeAdAccountAssignmentIssueChecker = function EventsBeforeAdAccountAssignmentIssueChecker(result) {
  return result.serverSideValidationResult.eventsBeforeAdAccountAssignment.map(function (warning) {
    return {
      level: 'warning',
      weight: ERROR_WEIGHT.BEFORE_AD_ACCOUNT_ASSIGNMENT + warning.count,
      issue: {
        type: 'events-before-ad-account-assignment',
        accountID: warning.id,
        accountName: warning.name,
        count: warning.count,
        assignTime: warning.assignTime
      }
    };
  });
};

var RejectedEventsIssueChecker = function RejectedEventsIssueChecker(result) {
  var invalidSamples = result.invalidSamples,
      rejectedEvents = result.rejectedEvents;

  if (rejectedEvents.total > 0) {
    var _samples = invalidSamples.filter(function (sample) {
      return sample.rejected;
    });
    var _summary = [];
    for (var _propPath in rejectedEvents.missingPropPaths) {
      _summary.push({
        propPath: _propPath,
        count: rejectedEvents.missingPropPaths[_propPath]
      });
    }
    _summary.sort(function (s1, s2) {
      return s2.count - s1.count;
    });
    return {
      level: 'error',
      weight: ERROR_WEIGHT.INVALID_EVENTS + rejectedEvents.total,
      issue: {
        type: 'events-rejected',
        count: rejectedEvents.total,
        summary: _summary,
        samples: _samples
      }
    };
  }
  return null;
};

var IncompleteEventsIssueChecker = function IncompleteEventsIssueChecker(result) {
  var invalidSamples = result.invalidSamples,
      incompleteEvents = result.incompleteEvents;

  if (incompleteEvents.total > 0) {
    var _samples2 = invalidSamples.filter(function (sample) {
      return !sample.rejected;
    });
    var _summary2 = incompleteEvents.columnErrors.map(function (error) {
      return {
        mapping: error.mapping,
        columnIndex: error.column,
        count: error.numErrors
      };
    });
    _summary2.sort(function (s1, s2) {
      return s2.count - s1.count;
    });
    return {
      level: 'warning',
      weight: ERROR_WEIGHT.INCOMPLETE_EVENTS + incompleteEvents.total,
      issue: {
        type: 'events-incomplete',
        count: incompleteEvents.total,
        summary: _summary2,
        samples: _samples2
      }
    };
  }
  return null;
};

var LowOrderIdRateIssueChecker = function LowOrderIdRateIssueChecker(result) {
  var serverResult = result.serverSideValidationResult;
  if (serverResult.totalValidatedCount > 0) {
    var noOrderIdRate = Math.round(100 * serverResult.noOrderidCount / serverResult.totalValidatedCount);
    if (noOrderIdRate > NO_ORDERID_THRESHOLD) {
      return {
        level: 'recommendation',
        weight: ERROR_WEIGHT.LOW_ORDERID_RATE + serverResult.noOrderidCount,
        issue: {
          type: 'low-orderid-rate',
          count: serverResult.noOrderidCount
        }
      };
    }
  }
  return null;
};

var ItemNumWithoutOrderIdIssueChecker = function ItemNumWithoutOrderIdIssueChecker(result) {
  var serverResult = result.serverSideValidationResult;
  return serverResult.itemnumNoOrderidCount > 0 ? {
    level: 'warning',
    weight: ERROR_WEIGHT.ITEMNUM_NO_ORDERID + serverResult.itemnumNoOrderidCount,
    issue: {
      type: 'itemnum-without-orderid',
      count: serverResult.itemnumNoOrderidCount
    }
  } : null;
};

var NonUniqueOrderIdItemNumIssueChecker = function NonUniqueOrderIdItemNumIssueChecker(result) {
  var serverResult = result.serverSideValidationResult;
  return serverResult.nonuniqueOrderidItemnumCount > 0 ? {
    level: 'warning',
    weight: ERROR_WEIGHT.NONUNIQUE_ORDERID_ITEMNUM + serverResult.nonuniqueOrderidItemnumCount,
    issue: {
      type: 'nonunique-orderid-itemnum',
      count: serverResult.nonuniqueOrderidItemnumCount
    }
  } : null;
};

var OrderidItemnumNonuniqueEventTimeIssueChecker = function OrderidItemnumNonuniqueEventTimeIssueChecker(result) {
  var serverResult = result.serverSideValidationResult;
  return serverResult.orderidItemnumNonuniqueEventTimeCount > 0 ? {
    level: 'error',
    weight: ERROR_WEIGHT.ORDERID_ITEMNUM_NONUNIQUE_EVENT_TIME,
    issue: {
      type: 'orderid-itemnum-nonunique-event-time',
      count: serverResult.orderidItemnumNonuniqueEventTimeCount
    }
  } : null;
};

var OrderidNonuniqueMatchKeysIssueChecker = function OrderidNonuniqueMatchKeysIssueChecker(result) {
  var serverResult = result.serverSideValidationResult;
  return serverResult.orderidNonuniqueMatchKeysCount > 0 ? {
    level: 'error',
    weight: ERROR_WEIGHT.ORDERID_NONUNIQUE_MATCH_KEYS,
    issue: {
      type: 'orderid-nonunique-match-keys',
      count: serverResult.orderidNonuniqueMatchKeysCount
    }
  } : null;
};

var IssueCheckers = {
  NoValidEventIssueChecker: NoValidEventIssueChecker,
  LowMatchRateIssueChecker: LowMatchRateIssueChecker,
  LowPiiRateIssueChecker: LowPiiRateIssueChecker,
  NotAssignedToAdAccountIssueChecker: NotAssignedToAdAccountIssueChecker,
  EventsLagged90DaysIssueChecker: EventsLagged90DaysIssueChecker,
  EventsLagged2DaysIssueChecker: EventsLagged2DaysIssueChecker,
  InaccurateEventTimeIssueChecker: InaccurateEventTimeIssueChecker,
  SameValueIssueChecker: SameValueIssueChecker,
  EventsBeforeAdAccountAssignmentIssueChecker: EventsBeforeAdAccountAssignmentIssueChecker,
  RejectedEventsIssueChecker: RejectedEventsIssueChecker,
  IncompleteEventsIssueChecker: IncompleteEventsIssueChecker,
  LowOrderIdRateIssueChecker: LowOrderIdRateIssueChecker,
  ItemNumWithoutOrderIdIssueChecker: ItemNumWithoutOrderIdIssueChecker,
  NonUniqueOrderIdItemNumIssueChecker: NonUniqueOrderIdItemNumIssueChecker,
  OrderidItemnumNonuniqueEventTimeIssueChecker: OrderidItemnumNonuniqueEventTimeIssueChecker,
  OrderidNonuniqueMatchKeysIssueChecker: OrderidNonuniqueMatchKeysIssueChecker
};

function getWarningsFromTestUploadResult(result, checkers) {
  var issues = [];
  for (var checkerName in checkers) {
    var checker = checkers[checkerName];
    var newIssues = checker(result);
    if (newIssues != null) {
      if (Array.isArray(newIssues)) {
        issues.push.apply(issues, _toConsumableArray(newIssues));
      } else {
        issues.push(newIssues);
      }
    }
  }

  issues.sort(function (i1, i2) {
    return i2.weight - i1.weight;
  });
  var warnings = issues.filter(function (i) {
    return i.level === 'warning';
  }).map(function (i) {
    return i.issue;
  });
  var errors = issues.filter(function (i) {
    return i.level === 'error';
  }).map(function (i) {
    return i.issue;
  });
  var recommendations = issues.filter(function (i) {
    return i.level === 'recommendation';
  }).map(function (i) {
    return i.issue;
  });
  return {
    warnings: warnings,
    errors: errors,
    recommendations: recommendations
  };
}

module.exports = {
  IssueCheckers: IssueCheckers,
  getWarningsFromTestUploadResult: getWarningsFromTestUploadResult
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ['ISO8601', 'unix_time', 'MM-DD-YYYY', 'MM/DD/YYYY', 'MMDDYYYY', 'DD-MM-YYYY', 'DD/MM/YYYY', 'DDMMYYYY', 'YYYY-MM-DD', 'YYYY/MM/DD', 'YYYYMMDD', 'MM-DD-YY', 'MM/DD/YY', 'MMDDYY', 'DD-MM-YY', 'DD/MM/YY', 'DDMMYY', 'YY-MM-DD', 'YY/MM/DD', 'YYMMDD'];

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsUploaderSingleWorkerTask = __webpack_require__(25);

var SignalsUploaderPreviewV2Task = function (_SignalsUploaderSingl) {
  _inherits(SignalsUploaderPreviewV2Task, _SignalsUploaderSingl);

  function SignalsUploaderPreviewV2Task(source, delimiter, normalizerSettings, presetValues, errorReportConfig, numSampleRows, hasHeader, chunkSize, maxNumChunksInBuffer, logger) {
    _classCallCheck(this, SignalsUploaderPreviewV2Task);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderPreviewV2Task.__proto__ || Object.getPrototypeOf(SignalsUploaderPreviewV2Task)).call(this, source, chunkSize, logger));

    _this._delimiter = delimiter;
    _this._normalizerSettings = normalizerSettings;
    _this._presetValues = presetValues;
    _this._errorReportConfig = errorReportConfig;
    _this._numSampleRows = numSampleRows;
    _this._hasHeader = hasHeader;
    _this._maxNumChunksInBuffer = maxNumChunksInBuffer;
    _this._numChunksProcessed = 0;
    return _this;
  }

  _createClass(SignalsUploaderPreviewV2Task, [{
    key: '__shouldReadNextChunk',
    value: function __shouldReadNextChunk() {
      return this.getChunksRequestedFromStream() - this._numChunksProcessed < this._maxNumChunksInBuffer;
    }
  }, {
    key: '__initializeWorker',
    value: function __initializeWorker() {
      this.__postMessageToWorker({
        type: 'initialize-preview-v2-job',
        delimiter: this._delimiter,
        normalizerSettings: this._normalizerSettings,
        presetValues: this._presetValues,
        errorReportConfig: this._errorReportConfig,
        numSampleRows: this._numSampleRows,
        hasHeader: this._hasHeader
      });
    }
  }, {
    key: '__onReceiveMessageFromWorker',
    value: function __onReceiveMessageFromWorker(message) {
      switch (message.type) {
        case 'preview-v2-done':
          this.__stopAndResolve({
            task: 'preview-v2',
            errorReport: message.errorReport,
            numRowsProcessed: message.numRowsProcessed,
            normalizedRows: message.normalizedRows
          });
          break;

        case 'preview-v2-chunk-processed':
          this._numChunksProcessed++;
          this.__tryToRead();
          break;
      }
    }
  }, {
    key: '__logStart',
    value: function __logStart() {
      this.__logEvent('signals-uploader-v2-preview-v2-start');
    }
  }, {
    key: '__logResolve',
    value: function __logResolve(result) {

      this.__logEvent('signals-uploader-v2-preview-v2-resolve');
    }
  }, {
    key: '__logReject',
    value: function __logReject(error) {
      this.__logError('signals-uploader-v2-preview-v2-reject', error);
    }
  }]);

  return SignalsUploaderPreviewV2Task;
}(SignalsUploaderSingleWorkerTask);

module.exports = SignalsUploaderPreviewV2Task;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsUploaderSingleWorkerTask = __webpack_require__(25);

var SignalsUploaderSampleFetchTask = function (_SignalsUploaderSingl) {
  _inherits(SignalsUploaderSampleFetchTask, _SignalsUploaderSingl);

  function SignalsUploaderSampleFetchTask(source, delimiter, numSampleRows, chunkSize, maxNumChunksInBuffer, logger) {
    _classCallCheck(this, SignalsUploaderSampleFetchTask);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderSampleFetchTask.__proto__ || Object.getPrototypeOf(SignalsUploaderSampleFetchTask)).call(this, source, chunkSize, logger));

    _this._delimiter = delimiter;
    _this._numSampleRows = numSampleRows;
    _this._maxNumChunksInBuffer = maxNumChunksInBuffer;
    _this._numChunksProcessed = 0;
    return _this;
  }

  _createClass(SignalsUploaderSampleFetchTask, [{
    key: '__shouldReadNextChunk',
    value: function __shouldReadNextChunk() {
      return this.getChunksRequestedFromStream() - this._numChunksProcessed < this._maxNumChunksInBuffer;
    }
  }, {
    key: '__initializeWorker',
    value: function __initializeWorker() {
      this.__postMessageToWorker({
        type: 'initialize-sample-fetch-job',
        delimiter: this._delimiter,
        numSampleRows: this._numSampleRows
      });
    }
  }, {
    key: '__onReceiveMessageFromWorker',
    value: function __onReceiveMessageFromWorker(message) {
      switch (message.type) {
        case 'sample-fetch-done':
          this.__stopAndResolve({
            task: 'sample-fetch',
            samples: message.samples,
            firstRowEnd: message.firstRowEnd
          });
          break;

        case 'sample-fetch-chunk-processed':
          this._numChunksProcessed++;
          this.__tryToRead();
          break;
      }
    }
  }, {
    key: '__logStart',
    value: function __logStart() {
      this.__logEvent('signals-uploader-v2-sample-fetch-start');
    }
  }, {
    key: '__logResolve',
    value: function __logResolve(result) {

      this.__logEvent('signals-uploader-v2-sample-fetch-resolve');
    }
  }, {
    key: '__logReject',
    value: function __logReject(error) {
      this.__logError('signals-uploader-v2-sample-fetch-reject', error);
    }
  }]);

  return SignalsUploaderSampleFetchTask;
}(SignalsUploaderSingleWorkerTask);

module.exports = SignalsUploaderSampleFetchTask;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsUploaderTask = __webpack_require__(26);

var createSignalsUploaderErrorReportGenerator = __webpack_require__(16);
var createSignalsUploaderWorker = __webpack_require__(31);
var invariant = __webpack_require__(1);

var SignalsUploaderUploadTask = function (_SignalsUploaderTask) {
  _inherits(SignalsUploaderUploadTask, _SignalsUploaderTask);

  function SignalsUploaderUploadTask(source, delimiter, normalizerSettings, presetValues, progressRanges, errorReportConfig, maxNumRowsPerBatch, hasHeader, chunkSize, maxNumChunksInBuffer, maxNumBatchesInBuffer, maxNumBatchesSendingInParallel, maxNumConcurrentNormalizer, batchSender, shouldIgnoreAPIErrorFn, numRetriesForAPIError, retryIntervalForAPIError, numRetriesForNetworkError, retryIntervalForNetworkError, progressUpdater, networkStatusUpdater, logger) {
    _classCallCheck(this, SignalsUploaderUploadTask);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderUploadTask.__proto__ || Object.getPrototypeOf(SignalsUploaderUploadTask)).call(this, source, chunkSize, logger));

    _this._maxNumConcurrentNormalizer = maxNumConcurrentNormalizer;
    _this._normalizerWorkers = [];
    _this._nextNormalizerWorkerIndex = 0;

    _this._delimiter = delimiter;
    _this._maxNumRowsPerBatch = maxNumRowsPerBatch;
    _this._hasHeader = hasHeader;
    _this._progressRanges = progressRanges;
    _this._normalizerSettings = normalizerSettings;
    _this._presetValues = presetValues;

    _this._errorReportConfig = errorReportConfig;
    _this._errorReportGenerator = createSignalsUploaderErrorReportGenerator(errorReportConfig);
    _this._errorReport = _this._errorReportGenerator.initialize();

    _this._chunkSize = chunkSize;
    _this._sourceSize = _this.getSourceSize();
    _this._maxNumChunksInBuffer = maxNumChunksInBuffer;
    _this._maxNumBatchesInBuffer = maxNumBatchesInBuffer;
    _this._maxNumBatchesSendingInParallel = maxNumBatchesSendingInParallel;
    _this._numChunksProcessed = 0;
    _this._numRowsAlreadyUploaded = 0;
    _this._numRowsFailedToNormalize = 0;
    _this._numRowsFailedToUpload = 0;
    _this._numRowsUploaded = 0;
    _this._numRowsParsed = 0;
    _this._batchQueue = [];
    _this._allBatchesConstructed = false;
    _this._numBatchesSending = 0;
    _this._numBatchesNormalizing = 0;
    _this._lastEstimatedProgress = 0;
    _this._deferredProgresses = [];

    _this._batchSender = batchSender;
    _this._shouldIgnoreAPIErrorFn = shouldIgnoreAPIErrorFn;
    _this._numRetriesForAPIError = numRetriesForAPIError;
    _this._retryIntervalForAPIError = retryIntervalForAPIError;
    _this._numRetriesForNetworkError = numRetriesForNetworkError;
    _this._retryIntervalForNetworkError = retryIntervalForNetworkError;
    _this._progressUpdater = progressUpdater;
    _this._networkStatusUpdater = networkStatusUpdater;
    _this._offline = false;
    _this._startTime = Date.now();

    _this._accessToken = null;
    return _this;
  }

  _createClass(SignalsUploaderUploadTask, [{
    key: 'setAccessToken',
    value: function setAccessToken(accessToken) {
      this._accessToken = accessToken;
    }
  }, {
    key: '__shouldReadNextChunk',
    value: function __shouldReadNextChunk() {
      return this.getChunksRequestedFromStream() - this._numChunksProcessed < this._maxNumChunksInBuffer && this._batchQueue.length + this._numBatchesNormalizing < this._maxNumBatchesInBuffer;
    }
  }, {
    key: '__initialize',
    value: function __initialize() {
      this._parserWorker = createSignalsUploaderWorker(this.__onReceiveMessageFromParserWorker.bind(this));
      this._parserWorker.postMessage({
        type: 'initialize-construct-batch-job',
        delimiter: this._delimiter,
        maxNumRowsPerBatch: this._maxNumRowsPerBatch,
        progressRanges: this._progressRanges,
        hasHeader: this._hasHeader
      });

      var numNormalizerWorkers = Math.min(global.navigator && global.navigator.hardwareConcurrency || 1, this._maxNumConcurrentNormalizer);

      for (var i = 0; i < numNormalizerWorkers; i++) {
        var normalizerWorker = createSignalsUploaderWorker(this.__onReceiveMessageFromNormalizerWorker.bind(this));
        normalizerWorker.postMessage({
          type: 'initialize-normalize-batch-job',
          normalizerSettings: this._normalizerSettings,
          presetValues: this._presetValues,
          errorReportConfig: this._errorReportConfig
        });
        this._normalizerWorkers.push(normalizerWorker);
      }

      this.__logEvent('signals-uploader-v2-upload-start', {
        progressRanges: this._progressRanges,
        hasHeader: this._hasHeader,
        presetValues: this._presetValues,
        mapping: this._normalizerSettings.mapping,
        infoForNormalization: this._normalizerSettings.infoForNormalization,
        customTypeInfo: this._normalizerSettings.customTypeInfo,
        schemaID: this._normalizerSettings.schema.id,
        numNormalizerWorkers: numNormalizerWorkers
      });
    }
  }, {
    key: '__stop',
    value: function __stop() {
      if (this.__running()) {
        this._parserWorker && this._parserWorker.stop();
        this._normalizerWorkers.forEach(function (worker) {
          return worker.stop();
        });
      }
      this._parserWorker = null;
      this._normalizerWorkers = [];
    }
  }, {
    key: '__onChunk',
    value: function __onChunk(chunk) {
      if (this.__running()) {
        this._parserWorker && this._parserWorker.postMessage({
          type: 'chunk-ready',
          chunk: chunk
        });
      }
    }
  }, {
    key: '__onEndOfStream',
    value: function __onEndOfStream(endOfStream) {
      if (this.__running()) {
        this._parserWorker && this._parserWorker.postMessage({
          type: 'end-of-stream',
          endOfStream: endOfStream
        });
      }
    }
  }, {
    key: '__onReceiveMessageFromParserWorker',
    value: function __onReceiveMessageFromParserWorker(message) {
      if (!this.__running()) {
        return;
      }

      switch (message.type) {
        case 'construct-batch-chunk-processed':
          this._numChunksProcessed = message.numChunksProcessed;
          this._numRowsAlreadyUploaded = message.numRowsAlreadyUploaded;
          this._numRowsParsed = message.numRowsParsed;
          this._updateProgress();
          this._tryToPushProgress();
          break;
        case 'construct-batch-batch-ready':
          this._numBatchesNormalizing++;
          this._normalizerWorkers[this._nextNormalizerWorkerIndex].postMessage({
            type: 'normalize-batch',
            rows: message.rows,
            start: message.start,
            end: message.end,
            chunkIndex: message.chunkIndex
          });
          this._nextNormalizerWorkerIndex++;
          if (this._nextNormalizerWorkerIndex >= this._normalizerWorkers.length) {
            this._nextNormalizerWorkerIndex = 0;
          }
          this._tryToPushProgress();
          break;
        case 'construct-batch-done':
          this._allBatchesConstructed = true;
          this._tryToPushProgress();
          break;
      }
    }
  }, {
    key: '__onReceiveMessageFromNormalizerWorker',
    value: function __onReceiveMessageFromNormalizerWorker(message) {
      if (!this.__running() || message.type !== 'normalize-batch-processed') {
        return;
      }

      this._errorReport = this._errorReportGenerator.merge(this._errorReport, message.errorReport);
      this._numBatchesNormalizing--;
      this._deferredProgresses.push({
        numRowsFailedToNormalize: message.numRowsFailedToNormalize,
        numRowsUploaded: 0,
        numRowsFailedToUpload: 0,
        chunkIndex: message.batch.chunkIndex
      });
      this._updateProgress();
      if (message.batch.rows.length > 0) {
        this._batchQueue.push(message.batch);
      }
      this._tryToPushProgress();
    }
  }, {
    key: '_tryToPushProgress',
    value: function _tryToPushProgress() {
      var _this2 = this;

      if (!this.__running()) {
        return;
      }

      this.__tryToRead();

      var _loop = function _loop() {
        var nextBatch = _this2._batchQueue.splice(0, 1)[0];
        _this2._numBatchesSending++;
        _this2._sendBatch(nextBatch, _this2._numRetriesForAPIError, _this2._numRetriesForNetworkError).then(function () {
          _this2._onBatchSent(nextBatch, true);
        }).catch(function (error) {
          _this2._onBatchSent(nextBatch, false);
        });
      };

      while (this._numBatchesSending < this._maxNumBatchesSendingInParallel && this._batchQueue.length > 0) {
        _loop();
      }

      if (this._allBatchesConstructed && this._numBatchesNormalizing === 0 && this._numBatchesSending === 0 && this._batchQueue.length === 0) {
        this._sendFinishMessage();
      }
    }
  }, {
    key: '_sendBatch',
    value: function _sendBatch(batch, retriesLeftForAPIError, retriesLeftForNetworkError) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3._batchSender(batch, _this3._accessToken).then(function () {
          if (_this3._offline) {
            _this3._offline = false;
            _this3._networkStatusUpdater(false);
            _this3.__logEvent('signals-uploader-v2-upload-network-online');
          }
          var numRetriesAPIError = _this3._numRetriesForAPIError - retriesLeftForAPIError;
          var numRetiresForNetworkError = _this3._numRetriesForNetworkError - retriesLeftForNetworkError;
          if (numRetriesAPIError > 0 || numRetiresForNetworkError > 0) {
            _this3.__logEvent('signals-uploader-v2-upload-retry-success', {
              numRetriesAPIError: numRetriesAPIError,
              numRetiresForNetworkError: numRetiresForNetworkError
            });
          }
          resolve();
        }).catch(function (error) {
          if (error.is_network_error) {
            if (!_this3._offline) {
              _this3._offline = true;
              _this3._networkStatusUpdater(true);
              _this3.__logEvent('signals-uploader-v2-upload-network-offline');
            }
            if (retriesLeftForNetworkError !== 0) {
              setTimeout(function () {
                _this3._sendBatch(batch, retriesLeftForAPIError, retriesLeftForNetworkError - 1).then(resolve).catch(reject);
              }, _this3._retryIntervalForNetworkError);
            } else {
              _this3.__logError('signals-uploader-v2-upload-batch-fail-network', error, {
                retries: _this3._numRetriesForNetworkError,
                interval: _this3._retryIntervalForNetworkError
              });
              reject(error);
            }
          } else {
            if (_this3._offline) {
              _this3._offline = false;
              _this3._networkStatusUpdater(false);
              _this3.__logEvent('signals-uploader-v2-upload-network-online');
            }
            if (_this3._shouldIgnoreAPIErrorFn(error)) {
              resolve();
              return;
            }
            if (retriesLeftForAPIError !== 0) {
              setTimeout(function () {
                _this3._sendBatch(batch, retriesLeftForAPIError - 1, retriesLeftForNetworkError).then(resolve).catch(reject);
              }, _this3._retryIntervalForAPIError);
            } else {
              _this3.__logError('signals-uploader-v2-upload-batch-fail-api', error, {
                retries: _this3._numRetriesForAPIError,
                interval: _this3._retryIntervalForAPIError
              });
              reject(error);
            }
          }
        });
      });
    }
  }, {
    key: '_onBatchSent',
    value: function _onBatchSent(batch, success) {
      this._deferredProgresses.push({
        numRowsFailedToNormalize: 0,
        numRowsUploaded: success ? batch.rows.length : 0,
        numRowsFailedToUpload: success ? 0 : batch.rows.length,
        chunkIndex: batch.chunkIndex
      });
      this._numBatchesSending--;
      this._updateProgress();
      this._tryToPushProgress();
    }
  }, {
    key: '_updateProgress',
    value: function _updateProgress() {
      var _this4 = this;

      var deferredProgresses = [];
      this._deferredProgresses.forEach(function (update) {
        if (update.chunkIndex < _this4._numChunksProcessed) {
          _this4._numRowsFailedToNormalize += update.numRowsFailedToNormalize;
          _this4._numRowsUploaded += update.numRowsUploaded;
          _this4._numRowsFailedToUpload += update.numRowsFailedToUpload;
        } else {
          deferredProgresses.push(update);
        }
      });
      this._deferredProgresses = deferredProgresses;

      var estimatedProgress = this._numRowsParsed == 0 || this._sourceSize == 0 ? 0 : ((this._hasHeader ? 1 : 0) + this._numRowsUploaded + this._numRowsFailedToUpload + this._numRowsFailedToNormalize + this._numRowsAlreadyUploaded) / this._numRowsParsed * Math.min(1, this._numChunksProcessed * this._chunkSize / this._sourceSize);
      if (estimatedProgress > this._lastEstimatedProgress) {
        this._lastEstimatedProgress = Math.min(estimatedProgress, 1);
      }
      var progress = {
        numRowsAlreadyUploaded: this._numRowsAlreadyUploaded,
        numRowsFailedToNormalize: this._numRowsFailedToNormalize,
        numRowsFailedToUpload: this._numRowsFailedToUpload,
        numRowsUploaded: this._numRowsUploaded,
        estimatedProgress: this._lastEstimatedProgress
      };
      this._progressUpdater(progress);
    }
  }, {
    key: '_sendFinishMessage',
    value: function _sendFinishMessage() {
      invariant((this._hasHeader ? 1 : 0) + this._numRowsAlreadyUploaded + this._numRowsFailedToNormalize + this._numRowsFailedToUpload + this._numRowsUploaded === this._numRowsParsed, 'Inconsistent progress.');
      this.__stopAndResolve({
        task: 'upload',
        progress: {
          numRowsAlreadyUploaded: this._numRowsAlreadyUploaded,
          numRowsFailedToNormalize: this._numRowsFailedToNormalize,
          numRowsFailedToUpload: this._numRowsFailedToUpload,
          numRowsUploaded: this._numRowsUploaded,
          estimatedProgress: 1
        },
        errorReport: this._errorReport
      });
    }
  }, {
    key: '__logResolve',
    value: function __logResolve(result) {
      invariant(result.task === 'upload', 'Invalid result.');
      this.__logEvent('signals-uploader-v2-upload-resolve', {
        progress: result.progress,
        duration: (Date.now() - this._startTime) / 1000
      });
    }
  }, {
    key: '__logReject',
    value: function __logReject(error) {
      this.__logError('signals-uploader-v2-upload-reject', error);
    }
  }]);

  return SignalsUploaderUploadTask;
}(SignalsUploaderTask);

module.exports = SignalsUploaderUploadTask;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.freeze({ "ADD_PAYMENT_INFO": "AddPaymentInfo", "ADD_TO_CART": "AddToCart", "ADD_TO_WISHLIST": "AddToWishlist", "COMPLETE_REGISTRATION": "CompleteRegistration", "INITIATE_CHECKOUT": "InitiateCheckout", "LEAD": "Lead", "OTHER": "Other", "PURCHASE": "Purchase", "SEARCH": "Search", "VIEW_CONTENT": "ViewContent" });

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keyMirror = __webpack_require__(34);

var SignalsTimestampNormalizationErrorTypes = keyMirror({
  REJECT_TOO_EARLY: null,
  REJECT_FUTURE: null
});

module.exports = SignalsTimestampNormalizationErrorTypes;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function normalize(input) {
  return { normalizedValue: input };
}

module.exports = normalize;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsValidationUtils = __webpack_require__(0);

var looksLikeHashed = SignalsValidationUtils.looksLikeHashed;


function normalize(input) {
  if (input == null) {
    return { normalizedValue: null };
  }

  if (typeof input === 'boolean') {
    return { normalizedValue: input };
  }

  if (typeof input === 'string') {
    var inputLowerCase = input.toLowerCase();
    if (inputLowerCase === 'true' || inputLowerCase === 'yes' || inputLowerCase === '1') {
      return { normalizedValue: true };
    }
    if (inputLowerCase === 'false' || inputLowerCase === 'no' || inputLowerCase === '0') {
      return { normalizedValue: false };
    }
    if (looksLikeHashed(input)) {
      return { normalizedValue: input };
    }
    return { normalizedValue: null };
  }

  if (typeof input === 'number') {
    if (input === 1) {
      return { normalizedValue: true };
    }
    if (input === 0) {
      return { normalizedValue: false };
    }
    return { normalizedValue: null };
  }

  return { normalizedValue: null };
}

module.exports = normalize;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsCurrencyCodes = __webpack_require__(19);

var normalizeSignalsEnumType = __webpack_require__(12);

var VALID_CURRENCY_CODES = SignalsCurrencyCodes.VALID_CURRENCY_CODES;


function normalize(input) {
  return normalizeSignalsEnumType(input, {
    uppercase: true,
    options: VALID_CURRENCY_CODES,
    rejectHashed: true
  });
}

module.exports = normalize;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var normalizeSignalsDateType = __webpack_require__(11);

function normalizeSignalsDateMonthType(input) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var additionalInfo = arguments[2];

  params.allowMonthOnly = true;
  return normalizeSignalsDateType(input, params, additionalInfo);
}

module.exports = normalizeSignalsDateMonthType;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsValidationUtils = __webpack_require__(0);

var looksLikeHashed = SignalsValidationUtils.looksLikeHashed,
    trim = SignalsValidationUtils.trim;


var EMAIL_RE = /^[\w!#\$%&'\*\+\/\=\?\^`\{\|\}~\-]+(:?\.[\w!#\$%&'\*\+\/\=\?\^`\{\|\}~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/i;

function isEmail(email) {
  return EMAIL_RE.test(email);
}

function normalize(input) {
  var result = null;

  if (input != null) {
    if (looksLikeHashed(input)) {
      result = input;
    } else if (typeof input === 'string') {
      var cleanedUp = trim(input.toLowerCase());
      result = isEmail(cleanedUp) ? cleanedUp : null;
    }
  }

  return { normalizedValue: result };
}

module.exports = normalize;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsValidationUtils = __webpack_require__(0);

var looksLikeHashed = SignalsValidationUtils.looksLikeHashed;


var LEAD_ID_PREFIX = 'l:';

var ALL_DIGIT_REGEX = /^[0-9]+$/;

var MAX_FBID = '18446744073709551615';

function isValueWithinUint64Range(value) {
  if (value.length < MAX_FBID.length) {
    return true;
  }
  if (value.length > MAX_FBID.length) {
    return false;
  }
  for (var i = 0; i < value.length; i++) {
    if (value[i] < MAX_FBID[i]) {
      return true;
    }
    if (value[i] > MAX_FBID[i]) {
      return false;
    }
  }
  return true;
}

function normalize(input) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var additionalInfo = arguments[2];

  if (typeof input === 'number') {
    input = String(input);
  }

  if (typeof input !== 'string') {
    return {
      normalizedValue: null
    };
  }

  if (looksLikeHashed(input) && !params.rejectHashed) {
    return {
      normalizedValue: input
    };
  }

  var nonPrefixedInput = input;
  if (params.stripPrefix && typeof nonPrefixedInput === 'string' && nonPrefixedInput.slice(0, LEAD_ID_PREFIX.length) === LEAD_ID_PREFIX) {
    nonPrefixedInput = nonPrefixedInput.substring(LEAD_ID_PREFIX.length);
  }

  if (!ALL_DIGIT_REGEX.test(nonPrefixedInput) || !isValueWithinUint64Range(nonPrefixedInput)) {
    return {
      normalizedValue: null
    };
  }

  if (params.scoped) {
    var appIDs = additionalInfo;
    if (appIDs != null && Array.isArray(appIDs) && appIDs.some(function (id) {
      return normalize(id, { rejectHashed: true }).normalizedValue != null;
    })) {
      return {
        normalizedValue: nonPrefixedInput
      };
    } else {
      return {
        normalizedValue: null
      };
    }
  }

  return { normalizedValue: nonPrefixedInput };
}

module.exports = normalize;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var SignalsBaseTypeNormalizers = __webpack_require__(6);
var SignalsValidationUtils = __webpack_require__(0);

var normalizeSignal = __webpack_require__(8);

var looksLikeHashed = SignalsValidationUtils.looksLikeHashed;


function normalize(input) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    nestedPropSchema: null
  };

  var results = null;
  var rejectEmptyList = params.rejectEmptyList,
      maxItemsAllowed = params.maxItemsAllowed,
      nestedPropSchema = params.nestedPropSchema;


  if (Array.isArray(input)) {
    var inputTypes = new Set(input.map(function (potential_result) {
      return typeof potential_result === 'undefined' ? 'undefined' : _typeof(potential_result);
    }));
    if (inputTypes.size !== 1) {
      results = null;
    } else {
      switch (inputTypes.values().next().value) {
        case 'string':
          try {

            results = input.map(function (potential_result) {
              return JSON.parse(potential_result);
            });
          } catch (err) {
            results = null;
          }
          break;
        default:
          results = null;
      }
    }
  } else if (typeof input === 'string') {
    if (looksLikeHashed(input)) {
      results = null;
    } else {
      input = input.trim();
      if (input.length === 0) {
        results = [];
      } else {

        if (input[0] !== '[' && input[input.length - 1] !== ']') {
          input = '[' + input + ']';
        }

        try {
          results = JSON.parse(input);

          results = Array.isArray(results) ? results : null;
        } catch (err) {
          results = null;
        }
      }
    }
  }

  var additionalInfo = null;
  if (results != null) {
    if (rejectEmptyList && results.length === 0 || maxItemsAllowed && results.length > maxItemsAllowed || nestedPropSchema == null) {
      results = null;
    } else {
      results = results.map(function (result) {
        return normalizeSignal(result, nestedPropSchema, SignalsBaseTypeNormalizers, {}, null, null, null);
      });
      additionalInfo = results.map(function (result) {
        return {
          missingRequiredProps: result.missingRequiredProps,
          notFoundProps: result.notFoundProps
        };
      });
      results = results.map(function (result) {
        return result.normalizedValue;
      });
      results = results.every(function (result) {
        return result != null;
      }) ? results : null;
    }
  }

  return {
    additionalInfo: additionalInfo,
    normalizedValue: results
  };
}

module.exports = normalize;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsValidationUtils = __webpack_require__(0);

var looksLikeHashed = SignalsValidationUtils.looksLikeHashed;


function normalize(input) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var result = null;

  var rejectEmptyList = params.rejectEmptyList,
      maxItemsAllowed = params.maxItemsAllowed,
      options = params.options,
      rejectHashed = params.rejectHashed,
      caseInsensitiveElements = params.caseInsensitiveElements;


  if (Array.isArray(input)) {
    result = input;
  } else if (typeof input === 'string') {
    if (looksLikeHashed(input)) {
      result = rejectHashed ? null : input;
    } else {
      input = input.trim();
      if (input.length === 0) {
        result = [];
      } else {
        if (input.length >= 2 && input[0] === '[' && input[input.length - 1] === ']') {
          input = input.slice(1, input.length - 1);
        }

        result = input.split(',').map(function (segment) {
          return segment.trim().replace(/^\'(.*)\'$|^\"(.*)\"$/, '$1$2');
        }).filter(function (item) {
          return item.length !== 0;
        });
      }
    }
  }
  if (options && result !== null) {
    var options_set = void 0;
    if (caseInsensitiveElements) {
      options_set = new Set(options.map(function (option) {
        return option.toLowerCase();
      }));
    } else {
      options_set = new Set(options);
    }
    result = !Array.isArray(result) || result.some(function (item) {
      return !options_set.has(caseInsensitiveElements ? String(item).toLowerCase() : String(item));
    }) ? null : result;
  }

  if (result) {
    if (rejectEmptyList && result.length === 0 || maxItemsAllowed && result.length > maxItemsAllowed) {
      result = null;
    }
  }

  return { normalizedValue: result };
}

module.exports = normalize;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsValidationUtils = __webpack_require__(0);

var isInternationalPhoneNumber = __webpack_require__(78);
var looksLikeHashed = SignalsValidationUtils.looksLikeHashed;


var PHONE_DROP_PREFIX_ZEROS = /^0*/;
var PHONE_IGNORE_CHAR_SET = /[\-@#<>'",; ]|\(|\)|\+|[a-z]/gi;

function normalize(input) {
  var result = null;

  if (input != null) {
    if (looksLikeHashed(input)) {
      result = input;
    } else {
      var str = String(input);
      if (isInternationalPhoneNumber(str)) {
        result = str.replace(PHONE_IGNORE_CHAR_SET, '').replace(PHONE_DROP_PREFIX_ZEROS, '');
      }
    }
  }

  return { normalizedValue: result };
}

module.exports = normalize;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsValidationUtils = __webpack_require__(0);

var looksLikeHashed = SignalsValidationUtils.looksLikeHashed,
    trim = SignalsValidationUtils.trim;


function normalize(input) {
  var result = null;

  if (input != null && typeof input === 'string') {
    if (looksLikeHashed(input)) {
      result = input;
    } else {
      var maybeZIP = trim(String(input).toLowerCase().split('-', 1)[0]);

      if (maybeZIP.length >= 2) {
        result = maybeZIP;
      }
    }
  }

  return { normalizedValue: result };
}

module.exports = normalize;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsValidationUtils = __webpack_require__(0);

var looksLikeHashed = SignalsValidationUtils.looksLikeHashed;


function normalize(input, params) {
  if (typeof input !== 'string' || !looksLikeHashed(input)) {
    return { normalizedValue: null };
  }
  if (params && params.options && params.options.indexOf(input) < 0) {
    return { normalizedValue: null };
  }
  return { normalizedValue: input };
}

module.exports = normalize;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsValidationUtils = __webpack_require__(0);

var looksLikeHashed = SignalsValidationUtils.looksLikeHashed,
    strip = SignalsValidationUtils.strip;


function normalize(input) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var result = null;

  if (input != null) {
    if (looksLikeHashed(input) && typeof input === 'string') {
      if (!params.rejectHashed) {
        result = input;
      }
    } else {
      var str = String(input);

      if (params.strip != null) {
        str = strip(str, params.strip);
      }

      if (params.lowercase) {
        str = str.toLowerCase();
      } else if (params.uppercase) {
        str = str.toUpperCase();
      }

      if (params.truncate) {
        str = str.substring(0, params.truncate);
      }

      if (params.test) {
        result = new RegExp(params.test).test(str) ? str : null;
      } else {
        result = str;
      }
    }
  }
  return { normalizedValue: result };
}

module.exports = normalize;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var normalizeSignalsTimestampType = __webpack_require__(20);

function normalize(input) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var additionalInfo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (input == null) {
    return {
      normalizedValue: null
    };
  }

  var newAdditionalInfo = additionalInfo ? _extends({}, additionalInfo) : {};
  newAdditionalInfo.timeFormat = newAdditionalInfo.timeFormat || 'unix_time';

  var tmpResult = normalizeSignalsTimestampType(input, params, newAdditionalInfo);

  if (tmpResult.normalizedValue != null) {
    var result = Math.round(tmpResult.normalizedValue / 1000);
    return {
      normalizedValue: result,
      additionalInfo: tmpResult.additionalInfo
    };
  } else {
    return {
      normalizedValue: null,
      additionalInfo: tmpResult.additionalInfo
    };
  }
}

module.exports = normalize;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var SignalsValidationUtils = __webpack_require__(0);
var SignalsNormalizationErrorLevel = __webpack_require__(29);
var SignalsNormalizationErrorScope = __webpack_require__(9);

var getByPath = __webpack_require__(27);
var nullthrows = __webpack_require__(86);

var throwFatalError = SignalsValidationUtils.throwFatalError;


function hasError(result) {
  return result.length > 0;
}

function makeRuleError(ruleSpecs, details) {
  return {
    level: ruleSpecs.warnOnFail === true ? SignalsNormalizationErrorLevel.WARNING : SignalsNormalizationErrorLevel.REJECT,
    where: SignalsNormalizationErrorScope.RULE,
    ruleError: {
      ruleSpecs: ruleSpecs,
      details: details
    }
  };
}

function checkPropValid(value, prop) {

  var path = prop.split('.');
  return getByPath(value, path) != null;
}

function checkPropValueIs(value, prop, targetValue) {
  return checkPropValid(value, prop) && getByPath(value, prop.split('.')) === targetValue;
}

function propValid(value, schema, ruleSpecs) {
  var prop = ruleSpecs.args;
  if (prop == null || typeof prop !== 'string') {
    throwFatalError('invalid ruleSpecs', { ruleSpecs: ruleSpecs });
  }
  return checkPropValid(value, nullthrows(prop)) ? [] : [makeRuleError(ruleSpecs)];
}

function propValueIs(value, schema, ruleSpecs) {
  var args = ruleSpecs.args;

  if (args == null || !Array.isArray(args) || args.length !== 2 || typeof args[0] !== 'string') {
    throwFatalError('invalid ruleSpecs', { ruleSpecs: ruleSpecs });
  }

  var _nullthrows = nullthrows(args),
      _nullthrows2 = _slicedToArray(_nullthrows, 2),
      prop = _nullthrows2[0],
      targetValue = _nullthrows2[1];

  return checkPropValueIs(value, prop, targetValue) ? [] : [makeRuleError(ruleSpecs)];
}

function dependentProps(value, schema, ruleSpecs) {
  var args = ruleSpecs.args;

  if (args == null || args.length !== 2 || _typeof(args[0]) !== 'object' || !Array.isArray(args[1])) {
    throwFatalError('invalid ruleSpecs', { ruleSpecs: ruleSpecs });
  }

  var _nullthrows3 = nullthrows(args),
      _nullthrows4 = _slicedToArray(_nullthrows3, 2),
      conditionRule = _nullthrows4[0],
      props = _nullthrows4[1];

  if (props.length === 0 || props.find(function (prop) {
    return typeof prop !== 'string';
  })) {
    throwFatalError('invalid ruleSpecs', { ruleSpecs: ruleSpecs });
  }

  var conditionResult = checkRule(value, schema, conditionRule);

  if (hasError(conditionResult)) {
    return [];
  }

  var invalidProps = [];
  props.forEach(function (prop) {
    if (!checkPropValid(value, prop)) {
      invalidProps.push(prop);
    }
  });
  return invalidProps.length > 0 ? [makeRuleError(ruleSpecs, { invalidProps: invalidProps })] : [];
}

function minValidProps(value, schema, ruleSpecs) {
  var count = parseInt(ruleSpecs.args, 10);
  if (isNaN(count)) {
    throwFatalError('invalid ruleSpecs', { ruleSpecs: ruleSpecs });
  }
  return Object.keys(value).length >= count ? [] : [makeRuleError(ruleSpecs)];
}

function meetAll(value, schema, ruleSpecs) {
  var subRules = ruleSpecs.args;
  if (subRules == null || !Array.isArray(subRules)) {
    throwFatalError('invalid ruleSpecs', { ruleSpecs: ruleSpecs });
  }
  var aggregatedResult = nullthrows(subRules).reduce(function (aggregatedResult, subRule) {
    var subRuleResult = checkRule(value, schema, subRule);
    return aggregatedResult.concat(subRuleResult);
  }, []);
  if (hasError(aggregatedResult)) {
    aggregatedResult.push(makeRuleError(ruleSpecs));
  }
  return aggregatedResult;
}

function meetAny(value, schema, ruleSpecs) {
  var subRules = ruleSpecs.args;
  if (subRules == null || !Array.isArray(subRules)) {
    throwFatalError('invalid ruleSpecs', { ruleSpecs: ruleSpecs });
  }
  var aggregatedResult = nullthrows(subRules).reduce(function (aggregatedResult, subRule) {
    var subRuleResult = checkRule(value, schema, subRule);
    return {
      errors: aggregatedResult.errors.concat(subRuleResult),
      passed: aggregatedResult.passed || !hasError(subRuleResult)
    };
  }, { errors: [], passed: false });

  return aggregatedResult.passed ? [] : [makeRuleError(ruleSpecs)];
}

function rejectExtraProps(value, schema, ruleSpecs) {
  var unidentifiedProps = Object.keys(value).filter(function (prop) {
    return (schema.props || []).find(function (propSchema) {
      return propSchema.key === prop;
    }) == null;
  });
  return unidentifiedProps.length > 0 ? [makeRuleError(ruleSpecs, { unidentifiedProps: unidentifiedProps })] : [];
}

var availableRules = {
  dependentProps: dependentProps,
  meetAll: meetAll,
  meetAny: meetAny,
  minValidProps: minValidProps,
  propValid: propValid,
  propValueIs: propValueIs,
  rejectExtraProps: rejectExtraProps
};

function checkRule(value, schema, ruleSpecs) {
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
    return [makeRuleError(ruleSpecs)];
  }
  var ruleFunc = (typeof ruleSpecs === 'undefined' ? 'undefined' : _typeof(ruleSpecs)) === 'object' && availableRules[ruleSpecs.rule] || null;
  if (ruleFunc == null) {
    throwFatalError('cannot find rule function', { ruleSpecs: ruleSpecs });
  }
  return nullthrows(ruleFunc)(value, schema, ruleSpecs);
}

module.exports = checkRule;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalDateFormats = __webpack_require__(7);

module.exports = SignalDateFormats.concat(['YYMM', 'MMYY', 'YYYYMM', 'MMYYYY', 'YYYY-MM', 'MM-YYYY', 'YY-MM', 'MM-YY', 'YYYY/MM', 'MM/YYYY', 'YY/MM', 'MM/YY']);

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Immutable = __webpack_require__(35);
var SignalsNormalizationErrorScope = __webpack_require__(9);

var List = Immutable.List;


function _getErrorSummary(summary, node, path) {
  node.errors.forEach(function (error) {
    if (error.where === SignalsNormalizationErrorScope.PROP) {

      if (node.type === 'prop') {
        var badValues = error.propError && error.propError.badValues || [];
        badValues.forEach(function (badValue) {
          var rawPositions = badValue.rawPosition != null ? Array.isArray(badValue.rawPosition) ? badValue.rawPosition : [badValue.rawPosition] : [];
          summary.invalidColumns = summary.invalidColumns.withMutations(function (invalidColumns) {
            rawPositions.forEach(function (column) {
              var columnError = invalidColumns.get(column);
              if (columnError == null) {
                invalidColumns.set(column, { propPath: path, count: 1 });
              } else {
                var _propPath = columnError.propPath,
                    _count = columnError.count;

                invalidColumns.set(column, { propPath: _propPath, count: _count + 1 });
              }
            });
          });
        });
      }
    } else if (error.where === SignalsNormalizationErrorScope.RULE) {

      var ruleName = error.ruleError && error.ruleError.ruleSpecs.name;
      if (ruleName != null) {
        var rulePath = path.length === 0 ? ruleName : path + '.' + ruleName;
        var errorList = summary.namedRuleErrors.get(rulePath);
        if (errorList != null) {
          errorList = errorList.push(error);
        } else {
          errorList = List([error]);
        }
        summary.namedRuleErrors = summary.namedRuleErrors.set(rulePath, errorList);
      } else {
        summary.otherErrors = summary.otherErrors.push(error);
      }
    } else {

      summary.otherErrors = summary.otherErrors.push(error);
    }
  });

  if (node.type === 'compound') {
    for (var propKey in node.nodes) {
      var subNode = node.nodes[propKey];
      var subPath = path.length === 0 ? propKey : path + '.' + propKey;
      _getErrorSummary(summary, subNode, subPath);
    }
  }
}

function getSignalsNormalizationErrorSummary(results) {
  var summary = {
    invalidColumns: Immutable.Map(),
    namedRuleErrors: Immutable.Map(),
    otherErrors: List(),
    fatalErrors: List()
  };
  results.forEach(function (result) {
    if (result.tree != null) {
      _getErrorSummary(summary, result.tree, '');
    }
    if (result.fatalError != null) {
      summary.fatalErrors = summary.fatalErrors.push(result.fatalError);
    }
  });
  return summary;
}

module.exports = getSignalsNormalizationErrorSummary;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keyMirrorRecursive = __webpack_require__(85);

var SignalsUploaderColumnMapperConstants = keyMirrorRecursive({
  CUSTOM_COLUMN_TYPE_VALUE: '',
  DEFAULT_COLUMN_TYPE_VALUE: '',
  ITEM_STATUSES: {
    MAPPED_RIGHT: '',
    MAPPED_WITH_ERROR: '',
    NON_MAPPED: '',
    PENDING: '',
    PRE_MAPPED: ''
  },
  SKIP_ADDITIONAL_INFO_VALUE: '',
  UNDEFINED_ADDITIONAL_INFO_VALUE: ''
});

module.exports = SignalsUploaderColumnMapperConstants;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsNormalizationErrorScope = __webpack_require__(9);
var SignalsNormalizationPropError = __webpack_require__(30);
var SignalsUploaderErrorReportGenerator = __webpack_require__(15);

var invariant = __webpack_require__(1);

function _appendPath(path, key) {
  return path.length > 0 ? path + '.' + key : key;
}

var SignalsUploaderAdvancedErrorReportGenerator = function (_SignalsUploaderError) {
  _inherits(SignalsUploaderAdvancedErrorReportGenerator, _SignalsUploaderError);

  function SignalsUploaderAdvancedErrorReportGenerator(maxNumInvalidSamples) {
    _classCallCheck(this, SignalsUploaderAdvancedErrorReportGenerator);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderAdvancedErrorReportGenerator.__proto__ || Object.getPrototypeOf(SignalsUploaderAdvancedErrorReportGenerator)).call(this));

    _this.__maxNumInvalidSamples = maxNumInvalidSamples;
    return _this;
  }

  _createClass(SignalsUploaderAdvancedErrorReportGenerator, [{
    key: 'initialize',
    value: function initialize() {
      return {
        type: 'advanced',
        invalidSamples: [],
        aggregatedColumnStats: {},
        aggregatedMissingPropPaths: {},
        numUnknownRejectErrors: 0
      };
    }
  }, {
    key: 'update',
    value: function update(report, row, normalizationResult, mapping) {
      invariant(report.type === 'advanced', 'Invalid report type.');
      var sample = SignalsUploaderAdvancedErrorReportGenerator.deriveErrorSample(row.fields, row.lineNumber, normalizationResult);
      var aggregatedColumnStats = report.aggregatedColumnStats,
          aggregatedMissingPropPaths = report.aggregatedMissingPropPaths;

      row.fields.forEach(function (value, i) {
        var reverseMapping = String(i);
        if (aggregatedColumnStats[reverseMapping] == null) {
          aggregatedColumnStats[reverseMapping] = {
            numEmpty: 0,
            numInvalidAndRejected: 0,
            numInvalidAndNotRejected: 0
          };
        }
        if (value.length === 0) {
          aggregatedColumnStats[reverseMapping].numEmpty++;
        }
      });
      if (sample == null) {
        return;
      }

      if (report.invalidSamples.length < this.__maxNumInvalidSamples) {
        report.invalidSamples.push(sample);
      }
      if (sample.rejected && sample.uncollectedErrors.length > 0) {
        report.numUnknownRejectErrors++;
      }
      sample.invalidFields.forEach(function (invalidField) {
        var reverseMapping = invalidField.reverseMapping,
            value = invalidField.value;

        if (aggregatedColumnStats[reverseMapping] == null) {
          aggregatedColumnStats[reverseMapping] = {
            numEmpty: 0,
            numInvalidAndRejected: 0,
            numInvalidAndNotRejected: 0
          };
        }
        if (value.length > 0) {
          if (sample.rejected) {
            aggregatedColumnStats[reverseMapping].numInvalidAndRejected++;
          } else {
            aggregatedColumnStats[reverseMapping].numInvalidAndNotRejected++;
          }
        }
      });
      sample.missingPropPaths.forEach(function (missingPropPath) {
        aggregatedMissingPropPaths[missingPropPath.propPath] = (aggregatedMissingPropPaths[missingPropPath.propPath] || 0) + 1;
      });
    }
  }, {
    key: 'merge',
    value: function merge(report1, report2) {
      invariant(report1.type === 'advanced', 'Invalid report type.');
      invariant(report2.type === 'advanced', 'Invalid report type.');

      var aggregatedColumnStats = _extends({}, report1.aggregatedColumnStats);
      for (var key in report2.aggregatedColumnStats) {
        if (aggregatedColumnStats[key] == null) {
          aggregatedColumnStats[key] = report2.aggregatedColumnStats[key];
        } else {
          aggregatedColumnStats[key].numEmpty += report2.aggregatedColumnStats[key].numEmpty;
          aggregatedColumnStats[key].numInvalidAndRejected += report2.aggregatedColumnStats[key].numInvalidAndRejected;
          aggregatedColumnStats[key].numInvalidAndNotRejected += report2.aggregatedColumnStats[key].numInvalidAndNotRejected;
        }
      }
      var aggregatedMissingPropPaths = _extends({}, report1.aggregatedMissingPropPaths);
      for (var _key in report2.aggregatedMissingPropPaths) {
        aggregatedMissingPropPaths[_key] = (aggregatedMissingPropPaths[_key] || 0) + report2.aggregatedMissingPropPaths[_key];
      }

      return {
        type: 'advanced',
        invalidSamples: [].concat(_toConsumableArray(report1.invalidSamples), _toConsumableArray(report2.invalidSamples)).sort(function (a, b) {
          return a.rowNumber - b.rowNumber;
        }).slice(0, this.__maxNumInvalidSamples),
        aggregatedColumnStats: aggregatedColumnStats,
        aggregatedMissingPropPaths: aggregatedMissingPropPaths,
        numUnknownRejectErrors: report1.numUnknownRejectErrors + report2.numUnknownRejectErrors
      };
    }
  }], [{
    key: '_pushMissingPropPaths',
    value: function _pushMissingPropPaths(propPath, error, output) {
      var propPathNode = output.missingPropPaths.find(function (propPathNode) {
        return propPathNode.propPath === propPath;
      });
      if (propPathNode == null) {
        propPathNode = {
          propPath: propPath,
          rawErrors: []
        };
        output.missingPropPaths.push(propPathNode);
      }
      propPathNode.rawErrors.push(error);
    }
  }, {
    key: '_deriveErrorsFromNodeRecursively',
    value: function _deriveErrorsFromNodeRecursively(path, node, output) {
      var type = node.type,
          nodes = node.nodes,
          errors = node.errors;

      if (type === 'compound' && nodes != null) {
        for (var propKey in nodes) {
          SignalsUploaderAdvancedErrorReportGenerator._deriveErrorsFromNodeRecursively(_appendPath(path, propKey), nodes[propKey], output);
        }
      }

      errors.forEach(function (error) {
        if (error.where === SignalsNormalizationErrorScope.RULE) {
          var ruleError = error.ruleError;
          var ruleSpecs = ruleError && ruleError.ruleSpecs;
          var rule = ruleSpecs && ruleSpecs.rule;
          if (rule === 'propValid') {
            var _propKey = ruleSpecs && ruleSpecs.args;
            if (_propKey != null) {
              SignalsUploaderAdvancedErrorReportGenerator._pushMissingPropPaths(_appendPath(path, _propKey), error, output);
            } else {
              output.uncollectedErrors.push(error);
            }
          } else if (rule === 'dependentProps') {
            var propKeys = ruleError && ruleError.details && ruleError.details.invalidProps;
            if (Array.isArray(propKeys)) {
              propKeys.forEach(function (propKey) {
                SignalsUploaderAdvancedErrorReportGenerator._pushMissingPropPaths(_appendPath(path, propKey), error, output);
              });
            } else {
              output.uncollectedErrors.push(error);
            }
          } else if (rule === 'minValidProps' || rule === 'meetAll' || rule === 'rejectExtraProps') {
            output.ignoredErrors.push(error);
          } else {
            output.uncollectedErrors.push(error);
          }
        } else if (error.where === SignalsNormalizationErrorScope.PROP) {
          var propError = error.propError;

          if (propError != null) {
            var propErrorType = propError.error;
            if (propErrorType === SignalsNormalizationPropError.INVALID || propErrorType === SignalsNormalizationPropError.SOME_INVALID) {
              propError.badValues.forEach(function (badValue) {
                if (badValue.rawPosition == null || node.type === 'compound' || !badValue.value) {

                  output.ignoredErrors.push(error);
                } else {
                  output.invalidFields.push({
                    value: badValue.value,
                    reverseMapping: String(badValue.rawPosition),
                    propPath: path,
                    infoForNormalization: node.infoForNormalization && node.infoForNormalization[node.propSchema.key],
                    baseType: node.propSchema.type,
                    details: badValue.details,
                    rawError: error
                  });
                }
              });
            } else {
              output.uncollectedErrors.push(error);
            }
          } else {
            output.uncollectedErrors.push(error);
          }
        } else {
          output.uncollectedErrors.push(error);
        }
      });
    }
  }, {
    key: 'deriveErrorSample',
    value: function deriveErrorSample(rowData, rowNumber, normalizationResult) {
      var result = {
        rowData: rowData,
        rowNumber: rowNumber,
        rejected: !normalizationResult.valid,
        invalidFields: [],
        missingPropPaths: [],
        uncollectedErrors: [],
        ignoredErrors: []
      };
      if (normalizationResult.fatalError != null) {
        result.uncollectedErrors.push(normalizationResult.fatalError);
        return result;
      }
      var node = normalizationResult.tree;
      if (node == null) {
        result.uncollectedErrors.push(new Error('Normalization tree not exist.'));
        return result;
      }
      SignalsUploaderAdvancedErrorReportGenerator._deriveErrorsFromNodeRecursively('', node, result);
      return result.invalidFields.length === 0 && result.missingPropPaths.length === 0 && result.uncollectedErrors.length === 0 && !result.rejected ? null : result;
    }
  }]);

  return SignalsUploaderAdvancedErrorReportGenerator;
}(SignalsUploaderErrorReportGenerator);

module.exports = SignalsUploaderAdvancedErrorReportGenerator;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VALUE_ERROR_LABEL;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SignalsNumberNormalizationErrorTypes = __webpack_require__(10);
var SignalsUploaderDefaultErrorReportGenerator = __webpack_require__(23);

var getByPath = __webpack_require__(27);
var invariant = __webpack_require__(1);
var normalizeSignalsValueType = __webpack_require__(21);

var VALUE_ERROR_LABEL = (_VALUE_ERROR_LABEL = {}, _defineProperty(_VALUE_ERROR_LABEL, SignalsNumberNormalizationErrorTypes.EMPTY, 'empty cell'), _defineProperty(_VALUE_ERROR_LABEL, SignalsNumberNormalizationErrorTypes.INVALID_SEPARATOR, 'invalid separators'), _defineProperty(_VALUE_ERROR_LABEL, SignalsNumberNormalizationErrorTypes.NON_NUMERIC, 'non-numeric value'), _defineProperty(_VALUE_ERROR_LABEL, SignalsNumberNormalizationErrorTypes.TOO_SMALL, 'negative'), _VALUE_ERROR_LABEL);

var SignalsUploaderWLALErrorReportGenerator = function (_SignalsUploaderDefau) {
  _inherits(SignalsUploaderWLALErrorReportGenerator, _SignalsUploaderDefau);

  function SignalsUploaderWLALErrorReportGenerator() {
    _classCallCheck(this, SignalsUploaderWLALErrorReportGenerator);

    return _possibleConstructorReturn(this, (SignalsUploaderWLALErrorReportGenerator.__proto__ || Object.getPrototypeOf(SignalsUploaderWLALErrorReportGenerator)).apply(this, arguments));
  }

  _createClass(SignalsUploaderWLALErrorReportGenerator, [{
    key: 'initialize',
    value: function initialize() {
      return {
        type: 'wlal',
        invalidSamples: [],
        valueErrorCounts: {
          empty: 0,
          negative: 0,
          nonNumeric: 0,
          invalidSeparator: 0
        }
      };
    }
  }, {
    key: 'update',
    value: function update(report, row, normalizationResult, mapping) {
      invariant(report.type === 'wlal', 'Invalid report type.');
      if (normalizationResult.valid || normalizationResult.tree == null) {
        return;
      }
      var error = this._getError(row, normalizationResult, mapping);
      switch (error.valueError) {
        case SignalsNumberNormalizationErrorTypes.EMPTY:
          report.valueErrorCounts.empty++;
          break;
        case SignalsNumberNormalizationErrorTypes.TOO_SMALL:
          report.valueErrorCounts.negative++;
          break;
        case SignalsNumberNormalizationErrorTypes.NON_NUMERIC:
          report.valueErrorCounts.nonNumeric++;
          break;
        case SignalsNumberNormalizationErrorTypes.INVALID_SEPARATOR:
          report.valueErrorCounts.invalidSeparator++;
          break;
        default:
          break;
      }
      if (report.invalidSamples.length < this.__maxNumInvalidSamples) {
        error.valueError = error.valueError && VALUE_ERROR_LABEL[error.valueError] || error.valueError;
        report.invalidSamples.push(error);
      }
    }
  }, {
    key: '_getError',
    value: function _getError(row, normalizationResult, mapping) {
      var _getInvalidAndEmptyC = this.__getInvalidAndEmptyColumns(row, normalizationResult, mapping),
          invalidColumns = _getInvalidAndEmptyC.invalidColumns,
          emptyColumns = _getInvalidAndEmptyC.emptyColumns;

      invalidColumns = invalidColumns.filter(function (propKey) {
        return propKey !== 'lookalike_value';
      });
      emptyColumns = emptyColumns.filter(function (propKey) {
        return propKey !== 'lookalike_value';
      });

      var valueError = void 0;
      var node = getByPath(normalizationResult, ['tree', 'nodes', 'lookalike_value'], null);
      if (node != null) {
        var propSchema = node.propSchema,
            rawValue = node.rawValue,
            infoForNormalization = node.infoForNormalization;

        var normalizedValue = normalizeSignalsValueType(rawValue, propSchema.typeParams, infoForNormalization);
        if (normalizedValue.normalizedValue == null) {
          valueError = getByPath(normalizedValue, ['additionalInfo', 'errorType'], null);
        }
      }

      return {
        row: row.lineNumber,
        invalidColumns: invalidColumns,
        emptyColumns: emptyColumns,
        valueError: valueError
      };
    }
  }, {
    key: 'merge',
    value: function merge(report1, report2) {
      invariant(report1.type === 'wlal', 'Invalid report type.');
      invariant(report2.type === 'wlal', 'Invalid report type.');
      return {
        type: 'wlal',
        invalidSamples: report1.invalidSamples.concat(report2.invalidSamples).sort(function (a, b) {
          return a.row - b.row;
        }).slice(0, this.__maxNumInvalidSamples),
        valueErrorCounts: {
          empty: report1.valueErrorCounts.empty + report2.valueErrorCounts.empty,
          negative: report1.valueErrorCounts.negative + report2.valueErrorCounts.negative,
          nonNumeric: report1.valueErrorCounts.nonNumeric + report2.valueErrorCounts.nonNumeric,
          invalidSeparator: report1.valueErrorCounts.invalidSeparator + report2.valueErrorCounts.invalidSeparator
        }
      };
    }
  }]);

  return SignalsUploaderWLALErrorReportGenerator;
}(SignalsUploaderDefaultErrorReportGenerator);

module.exports = SignalsUploaderWLALErrorReportGenerator;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsUploaderChunkDigestJob = __webpack_require__(3);
var SignalsUploaderCSVParser = __webpack_require__(4);

var SignalsUploaderConstructBatchJob = function (_SignalsUploaderChunk) {
  _inherits(SignalsUploaderConstructBatchJob, _SignalsUploaderChunk);

  function SignalsUploaderConstructBatchJob(delimiter, progressRanges, maxNumRowsPerBatch, hasHeader, postMessageHandler) {
    _classCallCheck(this, SignalsUploaderConstructBatchJob);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderConstructBatchJob.__proto__ || Object.getPrototypeOf(SignalsUploaderConstructBatchJob)).call(this, postMessageHandler));

    _this._parser = new SignalsUploaderCSVParser(delimiter);
    _this._progressRanges = progressRanges;
    _this._maxNumRowsPerBatch = maxNumRowsPerBatch;
    _this._hasHeader = hasHeader;
    _this._isFirstRow = true;

    _this._numRowsAlreadyUploaded = 0;
    _this._numRowsParsed = 0;
    _this._numChunksProcessed = 0;
    _this._rows = [];
    return _this;
  }

  _createClass(SignalsUploaderConstructBatchJob, [{
    key: '__processChunk',
    value: function __processChunk(chunk) {
      var _this2 = this;

      this._numChunksProcessed++;
      for (var i = 0; i < chunk.data.length; i++) {
        this._parser.onNewCharacter(chunk.data[i]);
        var rows = this._parser.readRows();
        rows.forEach(function (row) {
          return _this2._processRow(row);
        });
      }
      this._sendProgressUpdate();
    }
  }, {
    key: '__processEndOfStream',
    value: function __processEndOfStream(endOfStream) {
      var _this3 = this;

      this._parser.onEndOfStream();
      var rows = this._parser.readRows();
      rows.forEach(function (row) {
        return _this3._processRow(row);
      });
      this._sendCurrentBatch();
      this._sendProgressUpdate();
      this.__postMessageToMainThread({
        type: 'construct-batch-done'
      });
    }
  }, {
    key: '_processRow',
    value: function _processRow(row) {
      this._numRowsParsed++;
      if (this._hasHeader && this._isFirstRow) {
        this._isFirstRow = false;
        return;
      }
      if (this._isRowAlreadyUploaded(row)) {
        this._numRowsAlreadyUploaded++;
        this._sendCurrentBatch();
      } else {
        this._rows.push(row);
        if (this._rows.length >= this._maxNumRowsPerBatch) {
          this._sendCurrentBatch();
        }
      }
    }
  }, {
    key: '_sendCurrentBatch',
    value: function _sendCurrentBatch() {
      if (this._rows.length === 0) {
        return;
      }
      this.__postMessageToMainThread({
        type: 'construct-batch-batch-ready',
        rows: this._rows,
        start: this._rows[0].start,
        end: this._rows[this._rows.length - 1].end,
        chunkIndex: this._numChunksProcessed - 1
      });
      this._rows = [];
    }
  }, {
    key: '_sendProgressUpdate',
    value: function _sendProgressUpdate() {
      this.__postMessageToMainThread({
        type: 'construct-batch-chunk-processed',
        numChunksProcessed: this._numChunksProcessed,
        numRowsAlreadyUploaded: this._numRowsAlreadyUploaded,
        numRowsParsed: this._numRowsParsed
      });
    }
  }, {
    key: '_isRowAlreadyUploaded',
    value: function _isRowAlreadyUploaded(row) {
      return this._progressRanges.some(function (range) {
        return !(range.start >= row.end || range.end <= row.start);
      });
    }
  }]);

  return SignalsUploaderConstructBatchJob;
}(SignalsUploaderChunkDigestJob);

module.exports = SignalsUploaderConstructBatchJob;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsUploaderChunkDigestJob = __webpack_require__(3);
var SignalsUploaderCSVParser = __webpack_require__(4);

var DELIMITERS = [',', '\t', ' ', '|', ';'];

var SignalsUploaderDelimiterDetectJob = function (_SignalsUploaderChunk) {
  _inherits(SignalsUploaderDelimiterDetectJob, _SignalsUploaderChunk);

  function SignalsUploaderDelimiterDetectJob(threshold, postMessageHandler) {
    _classCallCheck(this, SignalsUploaderDelimiterDetectJob);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderDelimiterDetectJob.__proto__ || Object.getPrototypeOf(SignalsUploaderDelimiterDetectJob)).call(this, postMessageHandler));

    _this._threshold = threshold;
    return _this;
  }

  _createClass(SignalsUploaderDelimiterDetectJob, [{
    key: '__processChunk',
    value: function __processChunk(chunk) {
      var _this2 = this;

      var parsers = DELIMITERS.map(function (delimiter) {
        return {
          parser: new SignalsUploaderCSVParser(delimiter),
          delimiter: delimiter
        };
      });

      parsers.forEach(function (delimiterAndParser) {
        for (var i = 0; i < chunk.data.length; i++) {
          delimiterAndParser.parser.onNewCharacter(chunk.data[i]);
        }
      });

      var delimiterTestResult = parsers.map(function (delimiterAndParser) {
        var delimiter = delimiterAndParser.delimiter,
            parser = delimiterAndParser.parser;

        var rows = parser.readRows();
        if (rows.length === 0) {
          return {
            delimiter: delimiter,
            numColumnsInFirstRow: 0,
            numRowsHavingSameColumnsAsFirstRow: 0,
            numRows: 0
          };
        }
        var numColumnsInFirstRow = rows[0].fields.length;
        var numRowsHavingSameColumnsAsFirstRow = rows.reduce(function (count, row) {
          return count + (row.fields.length === numColumnsInFirstRow ? 1 : 0);
        }, 0);
        return {
          delimiter: delimiter,
          numColumnsInFirstRow: numColumnsInFirstRow,
          numRowsHavingSameColumnsAsFirstRow: numRowsHavingSameColumnsAsFirstRow,
          numRows: rows.length
        };
      });

      var sortedDelimiterTestResult = delimiterTestResult.filter(function (result) {
        return result.numColumnsInFirstRow > 1 && result.numRows > 0 && result.numRowsHavingSameColumnsAsFirstRow / result.numRows >= _this2._threshold;
      }).sort(function (a, b) {
        return a.numColumnsInFirstRow - b.numColumnsInFirstRow;
      }).reverse();

      this.__postMessageToMainThread({
        type: 'delimiter-detect',
        delimiter: sortedDelimiterTestResult.length > 0 ? sortedDelimiterTestResult[0].delimiter : null
      });
    }
  }, {
    key: '__processEndOfStream',
    value: function __processEndOfStream(endOfStream) {
      this.__postMessageToMainThread({
        type: 'delimiter-detect',
        delimiter: null
      });
    }
  }]);

  return SignalsUploaderDelimiterDetectJob;
}(SignalsUploaderChunkDigestJob);

module.exports = SignalsUploaderDelimiterDetectJob;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SignalsUploaderConstructBatchJob = __webpack_require__(66);
var SignalsUploaderDelimiterDetectJob = __webpack_require__(67);
var SignalsUploaderMappingDetectJob = __webpack_require__(69);
var SignalsUploaderNormalizeBatchJob = __webpack_require__(70);
var SignalsUploaderPreviewJob = __webpack_require__(71);
var SignalsUploaderPreviewV2Job = __webpack_require__(72);
var SignalsUploaderSampleFetchJob = __webpack_require__(73);

var invariant = __webpack_require__(1);

var SignalsUploaderJobManager = function () {
  function SignalsUploaderJobManager(workerMessageHandler) {
    _classCallCheck(this, SignalsUploaderJobManager);

    this._workerMessageHandler = workerMessageHandler;
  }

  _createClass(SignalsUploaderJobManager, [{
    key: 'sendMessageToWorker',
    value: function sendMessageToWorker(message) {
      switch (message.type) {
        case 'initialize-delimiter-detect-job':
          this._job = new SignalsUploaderDelimiterDetectJob(message.threshold, this._workerMessageHandler);
          break;

        case 'initialize-sample-fetch-job':
          this._job = new SignalsUploaderSampleFetchJob(message.delimiter, message.numSampleRows, this._workerMessageHandler);
          break;

        case 'initialize-preview-job':
          this._job = new SignalsUploaderPreviewJob(message.delimiter, message.normalizerSettings, message.numSampleRows, message.hasHeader, this._workerMessageHandler);
          break;

        case 'initialize-preview-v2-job':
          this._job = new SignalsUploaderPreviewV2Job(message.delimiter, message.normalizerSettings, message.presetValues, message.errorReportConfig, message.numSampleRows, message.hasHeader, this._workerMessageHandler);
          break;

        case 'initialize-mapping-detect-job':
          this._job = new SignalsUploaderMappingDetectJob(message.delimiter, message.schemaSummary, message.numSampleRows, message.threshold, this._workerMessageHandler);
          break;

        case 'initialize-construct-batch-job':
          this._job = new SignalsUploaderConstructBatchJob(message.delimiter, message.progressRanges, message.maxNumRowsPerBatch, message.hasHeader, this._workerMessageHandler);
          break;

        case 'initialize-normalize-batch-job':
          this._job = new SignalsUploaderNormalizeBatchJob(message.normalizerSettings, message.presetValues, message.errorReportConfig, this._workerMessageHandler);
          break;

        default:
          var job = this._job;
          invariant(job != null, 'Job not initialized or initialization message not supported.');
          job.onReceiveMessageFromMainThread(message);
          break;
      }
    }
  }]);

  return SignalsUploaderJobManager;
}();

module.exports = SignalsUploaderJobManager;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ADDITIONAL_INFO_OPTI;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SignalBaseTypes = __webpack_require__(28);
var SignalDateFormats = __webpack_require__(7);
var SignalsBaseTypeNormalizers = __webpack_require__(6);
var SignalsUploaderChunkDigestJob = __webpack_require__(3);
var SignalsUploaderCSVParser = __webpack_require__(4);

var UNIX_TIME = SignalBaseTypes.UNIX_TIME,
    DATE = SignalBaseTypes.DATE,
    VALUE = SignalBaseTypes.VALUE;


var UNIX_TIME_ADDITIONAL_INFO_OPTIONS = ['ISO8601', 'unix_time'].map(function (timeFormat) {
  return { timeFormat: timeFormat };
});

var VALUE_OPTIONS = ['.', ',', ''].map(function (decimalPointChar) {
  return {
    decimalPointChar: decimalPointChar
  };
});

var ADDITIONAL_INFO_OPTIONS = (_ADDITIONAL_INFO_OPTI = {}, _defineProperty(_ADDITIONAL_INFO_OPTI, DATE, SignalDateFormats), _defineProperty(_ADDITIONAL_INFO_OPTI, UNIX_TIME, UNIX_TIME_ADDITIONAL_INFO_OPTIONS), _defineProperty(_ADDITIONAL_INFO_OPTI, VALUE, VALUE_OPTIONS), _ADDITIONAL_INFO_OPTI);

var SignalsUploaderMappingDetectJob = function (_SignalsUploaderChunk) {
  _inherits(SignalsUploaderMappingDetectJob, _SignalsUploaderChunk);

  function SignalsUploaderMappingDetectJob(delimiter, schemaSummary, numSampleRows, threshold, postMessageHandler) {
    _classCallCheck(this, SignalsUploaderMappingDetectJob);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderMappingDetectJob.__proto__ || Object.getPrototypeOf(SignalsUploaderMappingDetectJob)).call(this, postMessageHandler));

    _this._parser = new SignalsUploaderCSVParser(delimiter);
    _this._schemaSummary = schemaSummary;
    _this._numSampleRows = numSampleRows;
    _this._threshold = threshold;

    _this._numProcessedRows = 0;
    _this._hasHeader = false;
    _this._maxInvalidSamples = Math.ceil(_this._numSampleRows * (1 - threshold));
    _this._possibleMappingSettings = [];
    _this._sampleCounts = [];
    return _this;
  }

  _createClass(SignalsUploaderMappingDetectJob, [{
    key: '__processChunk',
    value: function __processChunk(chunk) {
      for (var i = 0; i < chunk.data.length; i++) {
        this._parser.onNewCharacter(chunk.data[i]);
      }
      this._processRows(this._parser.readRows());
      if (this._numProcessedRows >= this._numSampleRows) {
        this._finishJob();
      } else {
        this._continueJob();
      }
    }
  }, {
    key: '__processEndOfStream',
    value: function __processEndOfStream(endOfStream) {
      this._parser.onEndOfStream();
      this._processRows(this._parser.readRows());
      this._finishJob();
    }
  }, {
    key: '_processRows',
    value: function _processRows(rows) {
      var _this2 = this;

      rows.forEach(function (row) {
        if (_this2._numProcessedRows >= _this2._numSampleRows) {
          return;
        }
        if (_this2._numProcessedRows === 0) {
          _this2._processHeaderRow(row);
        } else {
          _this2._processNonHeaderRow(row);
        }
        _this2._numProcessedRows++;
      });
    }
  }, {
    key: '_processHeaderRow',
    value: function _processHeaderRow(row) {
      var _this3 = this;

      var keySchemas = this._schemaSummary.schemasForSimplePropsInSchema;
      row.fields.forEach(function (field) {
        var possibleMappings = {};
        for (var key in keySchemas) {
          var isPreset = key === field.toLowerCase();
          _this3._hasHeader = _this3._hasHeader || isPreset;
          possibleMappings[key] = _this3._getMappingSetting(key, isPreset);
        }
        _this3._possibleMappingSettings.push(possibleMappings);
        _this3._sampleCounts.push(0);
      });

      if (!this._hasHeader) {
        this._processNonHeaderRow(row);
      }
    }
  }, {
    key: '_getMappingSetting',
    value: function _getMappingSetting(propKey, isPreset) {
      var propSchema = this._schemaSummary.schemasForSimplePropsInSchema[propKey] || {};
      var propPath = this._schemaSummary.pathForSimplePropKeys[propKey];
      var additionalInfoOptions = ADDITIONAL_INFO_OPTIONS[propSchema.type];

      return {
        propKey: propKey,
        propPath: propPath,
        isPreset: isPreset,
        additionalInfos: (additionalInfoOptions || [null]).map(function (additionalInfo) {
          return {
            info: additionalInfo,
            numInvalidSamples: 0
          };
        })
      };
    }
  }, {
    key: '_processNonHeaderRow',
    value: function _processNonHeaderRow(row) {
      var _this4 = this;

      row.fields.forEach(function (field, index) {
        if (index >= _this4._possibleMappingSettings.length) {
          return;
        }
        var mappingSettings = _this4._possibleMappingSettings[index];

        if (field.length === 0) {
          return;
        }
        _this4._sampleCounts[index]++;

        var updatedMappingSettings = {};

        var _loop = function _loop(key) {
          var settings = mappingSettings[key];
          var propSchema = _this4._getPropSchemaForKey(settings.propKey);
          var normalizer = propSchema != null ? SignalsBaseTypeNormalizers[propSchema.type] : null;
          settings.additionalInfos.forEach(function (additionalInfo) {
            if (normalizer != null && propSchema != null) {
              var normalizationResult = normalizer(field, propSchema.typeParams || {}, additionalInfo.info);
              if (normalizationResult.normalizedValue == null) {
                additionalInfo.numInvalidSamples++;
              }
            } else {
              additionalInfo.numInvalidSamples++;
            }
          });
          settings.additionalInfos = settings.additionalInfos.filter(function (additionalInfo) {
            return additionalInfo.numInvalidSamples <= _this4._maxInvalidSamples;
          });
          if (settings.additionalInfos.length > 0 || settings.isPreset) {
            updatedMappingSettings[settings.propKey] = settings;
          }
        };

        for (var key in mappingSettings) {
          _loop(key);
        }
        _this4._possibleMappingSettings[index] = updatedMappingSettings;
      });
    }
  }, {
    key: '_finishJob',
    value: function _finishJob() {
      var _this5 = this;

      var possibleMappings = this._possibleMappingSettings.map(function (settings, index) {
        var result = {};

        var _loop2 = function _loop2(key) {
          var setting = settings[key];
          var sampleCount = _this5._sampleCounts[index];
          if (sampleCount === 0) {
            return 'continue';
          }
          setting.additionalInfos = setting.additionalInfos.filter(function (additionalInfo) {
            var numValidSamples = sampleCount - additionalInfo.numInvalidSamples;
            return numValidSamples / sampleCount >= _this5._threshold;
          });
          if (setting.additionalInfos.length === 0 && !setting.isPreset) {
            return 'continue';
          }
          result[key] = setting;
        };

        for (var key in settings) {
          var _ret2 = _loop2(key);

          if (_ret2 === 'continue') continue;
        }
        return result;
      });

      this.__postMessageToMainThread({
        type: 'mapping-detect-done',
        possibleMappings: possibleMappings,
        sampleCounts: this._sampleCounts,
        hasHeader: this._hasHeader
      });
    }
  }, {
    key: '_getPropSchemaForKey',
    value: function _getPropSchemaForKey(key) {
      return this._schemaSummary.schemasForSimplePropsInSchema[key];
    }
  }, {
    key: '_continueJob',
    value: function _continueJob() {
      this.__postMessageToMainThread({
        type: 'mapping-detect-chunk-processed'
      });
    }
  }]);

  return SignalsUploaderMappingDetectJob;
}(SignalsUploaderChunkDigestJob);

module.exports = SignalsUploaderMappingDetectJob;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsBaseTypeNormalizers = __webpack_require__(6);
var SignalsUploaderJob = __webpack_require__(24);
var SignalsUploaderUtils = __webpack_require__(14);

var createSignalsUploaderErrorReportGenerator = __webpack_require__(16);
var normalizeSignal = __webpack_require__(8);
var processPIISignalBeforeUpload = __webpack_require__(22);

var arrayToObject = SignalsUploaderUtils.arrayToObject,
    getMappingWithPreset = SignalsUploaderUtils.getMappingWithPreset,
    getPresetValueConfigFromObject = SignalsUploaderUtils.getPresetValueConfigFromObject;


var TRANSFORMERS = {
  processPIISignalBeforeUpload: processPIISignalBeforeUpload
};

var SignalsUploaderNormalizeBatchJob = function (_SignalsUploaderJob) {
  _inherits(SignalsUploaderNormalizeBatchJob, _SignalsUploaderJob);

  function SignalsUploaderNormalizeBatchJob(normalizerSettings, presetValues, errorReportConfig, postMessageHandler) {
    _classCallCheck(this, SignalsUploaderNormalizeBatchJob);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderNormalizeBatchJob.__proto__ || Object.getPrototypeOf(SignalsUploaderNormalizeBatchJob)).call(this, postMessageHandler));

    _this._normalizerSettings = normalizerSettings;
    _this._presetValueConfig = getPresetValueConfigFromObject(presetValues);
    _this._errorReportConfig = errorReportConfig;
    return _this;
  }

  _createClass(SignalsUploaderNormalizeBatchJob, [{
    key: 'onReceiveMessageFromMainThread',
    value: function onReceiveMessageFromMainThread(message) {
      var _this2 = this;

      if (message.type !== 'normalize-batch') {
        return;
      }

      var normalizedRows = [];
      var errorReportGenerator = createSignalsUploaderErrorReportGenerator(this._errorReportConfig);
      var errorReport = errorReportGenerator.initialize();

      message.rows.forEach(function (row) {
        var offset = row.fields.length;
        var signalWithPreset = arrayToObject(row.fields.concat(_this2._presetValueConfig.values));
        var mappingWithPreset = getMappingWithPreset(_this2._normalizerSettings.mapping, offset, _this2._presetValueConfig.mappings);
        var normalizationResult = normalizeSignal(signalWithPreset, _this2._normalizerSettings.schema, SignalsBaseTypeNormalizers, TRANSFORMERS, mappingWithPreset, _this2._normalizerSettings.infoForNormalization, _this2._normalizerSettings.customTypeInfo);
        var normalizedValue = normalizationResult.normalizedValue;

        if (normalizedValue != null) {
          normalizedRows.push(normalizedValue);
        }
        errorReportGenerator.update(errorReport, row, normalizationResult, _this2._normalizerSettings.mapping);
      });

      this.__postMessageToMainThread({
        type: 'normalize-batch-processed',
        batch: {
          start: message.start,
          end: message.end,
          rows: normalizedRows,
          chunkIndex: message.chunkIndex
        },
        errorReport: errorReport,
        numRowsFailedToNormalize: message.rows.length - normalizedRows.length
      });
    }
  }]);

  return SignalsUploaderNormalizeBatchJob;
}(SignalsUploaderJob);

module.exports = SignalsUploaderNormalizeBatchJob;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsBaseTypeNormalizers = __webpack_require__(6);
var SignalsUploaderChunkDigestJob = __webpack_require__(3);
var SignalsUploaderCSVParser = __webpack_require__(4);
var SignalsUploaderUtils = __webpack_require__(14);

var arrayToObject = SignalsUploaderUtils.arrayToObject;


var normalizeSignal = __webpack_require__(8);

var SignalsUploaderPreviewJob = function (_SignalsUploaderChunk) {
  _inherits(SignalsUploaderPreviewJob, _SignalsUploaderChunk);

  function SignalsUploaderPreviewJob(delimiter, normalizerSettings, numSampleRows, hasHeader, postMessageHandler) {
    _classCallCheck(this, SignalsUploaderPreviewJob);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderPreviewJob.__proto__ || Object.getPrototypeOf(SignalsUploaderPreviewJob)).call(this, postMessageHandler));

    _this._parser = new SignalsUploaderCSVParser(delimiter);
    _this._normalizerSettings = normalizerSettings;
    _this._numSampleRows = numSampleRows;
    _this._previews = [];
    _this._hasHeader = hasHeader;
    _this._isFirstRow = true;
    return _this;
  }

  _createClass(SignalsUploaderPreviewJob, [{
    key: '__processChunk',
    value: function __processChunk(chunk) {
      for (var i = 0; i < chunk.data.length; i++) {
        this._parser.onNewCharacter(chunk.data[i]);
      }
      this._processRows(this._parser.readRows());
      if (this._previews.length >= this._numSampleRows) {
        this._finishJob();
      } else {
        this._continueJob();
      }
    }
  }, {
    key: '__processEndOfStream',
    value: function __processEndOfStream(endOfStream) {
      this._parser.onEndOfStream();
      this._processRows(this._parser.readRows());
      this._finishJob();
    }
  }, {
    key: '_processRows',
    value: function _processRows(rows) {
      var _this2 = this;

      var settings = this._normalizerSettings;
      rows.forEach(function (row) {
        if (_this2._hasHeader && _this2._isFirstRow) {
          _this2._isFirstRow = false;
          return;
        }
        if (_this2._previews.length >= _this2._numSampleRows) {
          return;
        }
        var signal = arrayToObject(row.fields);

        var normalizationResult = normalizeSignal(signal, settings.schema, SignalsBaseTypeNormalizers, {}, settings.mapping, settings.infoForNormalization, settings.customTypeInfo);

        _this2._previews.push(normalizationResult);
      });
    }
  }, {
    key: '_finishJob',
    value: function _finishJob() {
      this.__postMessageToMainThread({
        type: 'preview-done',
        previews: this._previews
      });
    }
  }, {
    key: '_continueJob',
    value: function _continueJob() {
      this.__postMessageToMainThread({
        type: 'preview-chunk-processed'
      });
    }
  }]);

  return SignalsUploaderPreviewJob;
}(SignalsUploaderChunkDigestJob);

module.exports = SignalsUploaderPreviewJob;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsBaseTypeNormalizers = __webpack_require__(6);
var SignalsUploaderChunkDigestJob = __webpack_require__(3);
var SignalsUploaderCSVParser = __webpack_require__(4);
var SignalsUploaderErrorReportGenerator = __webpack_require__(15);
var SignalsUploaderUtils = __webpack_require__(14);

var createSignalsUploaderErrorReportGenerator = __webpack_require__(16);
var normalizeSignal = __webpack_require__(8);
var processPIISignalBeforeUpload = __webpack_require__(22);

var arrayToObject = SignalsUploaderUtils.arrayToObject,
    getMappingWithPreset = SignalsUploaderUtils.getMappingWithPreset,
    getPresetValueConfigFromObject = SignalsUploaderUtils.getPresetValueConfigFromObject;


var TRANSFORMERS = {
  processPIISignalBeforeUpload: processPIISignalBeforeUpload
};

var SignalsUploaderPreviewV2Job = function (_SignalsUploaderChunk) {
  _inherits(SignalsUploaderPreviewV2Job, _SignalsUploaderChunk);

  function SignalsUploaderPreviewV2Job(delimiter, normalizerSettings, presetValues, errorReportConfig, numSampleRows, hasHeader, postMessageHandler) {
    _classCallCheck(this, SignalsUploaderPreviewV2Job);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderPreviewV2Job.__proto__ || Object.getPrototypeOf(SignalsUploaderPreviewV2Job)).call(this, postMessageHandler));

    _this._parser = new SignalsUploaderCSVParser(delimiter);
    _this._normalizerSettings = normalizerSettings;
    _this._presetValueConfig = getPresetValueConfigFromObject(presetValues);
    _this._errorReportGenerator = createSignalsUploaderErrorReportGenerator(errorReportConfig);
    _this._errorReport = _this._errorReportGenerator.initialize();
    _this._numSampleRows = numSampleRows;
    _this._hasHeader = hasHeader;
    _this._isFirstRow = true;
    _this._numRowsProcessed = 0;
    _this._normalizedRows = [];
    return _this;
  }

  _createClass(SignalsUploaderPreviewV2Job, [{
    key: '__processChunk',
    value: function __processChunk(chunk) {
      for (var i = 0; i < chunk.data.length; i++) {
        this._parser.onNewCharacter(chunk.data[i]);
      }
      this._processRows(this._parser.readRows());
      if (this._numRowsProcessed >= this._numSampleRows) {
        this._finishJob();
      } else {
        this._continueJob();
      }
    }
  }, {
    key: '_processRows',
    value: function _processRows(rows) {
      var _this2 = this;

      rows.forEach(function (row) {
        if (_this2._hasHeader && _this2._isFirstRow) {
          _this2._isFirstRow = false;
          return;
        }
        if (_this2._numRowsProcessed >= _this2._numSampleRows) {
          return;
        }
        _this2._numRowsProcessed++;

        var offset = row.fields.length;
        var signalWithPreset = arrayToObject(row.fields.concat(_this2._presetValueConfig.values));
        var mappingWithPreset = getMappingWithPreset(_this2._normalizerSettings.mapping, offset, _this2._presetValueConfig.mappings);
        var normalizationResult = normalizeSignal(signalWithPreset, _this2._normalizerSettings.schema, SignalsBaseTypeNormalizers, TRANSFORMERS, mappingWithPreset, _this2._normalizerSettings.infoForNormalization, _this2._normalizerSettings.customTypeInfo);
        _this2._errorReportGenerator.update(_this2._errorReport, row, normalizationResult, _this2._normalizerSettings.mapping);
        var normalizedValue = normalizationResult.normalizedValue;

        if (normalizedValue != null) {
          _this2._normalizedRows.push(normalizedValue);
        }
      });
    }
  }, {
    key: '__processEndOfStream',
    value: function __processEndOfStream(endOfStream) {
      this._parser.onEndOfStream();
      this._processRows(this._parser.readRows());
      this._finishJob();
    }
  }, {
    key: '_finishJob',
    value: function _finishJob() {
      this.__postMessageToMainThread({
        type: 'preview-v2-done',
        errorReport: this._errorReport,
        numRowsProcessed: this._numRowsProcessed,
        normalizedRows: this._normalizedRows
      });
    }
  }, {
    key: '_continueJob',
    value: function _continueJob() {
      this.__postMessageToMainThread({
        type: 'preview-v2-chunk-processed'
      });
    }
  }]);

  return SignalsUploaderPreviewV2Job;
}(SignalsUploaderChunkDigestJob);

module.exports = SignalsUploaderPreviewV2Job;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsUploaderChunkDigestJob = __webpack_require__(3);
var SignalsUploaderCSVParser = __webpack_require__(4);

var SignalsUploaderSampleFetchJob = function (_SignalsUploaderChunk) {
  _inherits(SignalsUploaderSampleFetchJob, _SignalsUploaderChunk);

  function SignalsUploaderSampleFetchJob(delimiter, numSampleRows, postMessageHandler) {
    _classCallCheck(this, SignalsUploaderSampleFetchJob);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderSampleFetchJob.__proto__ || Object.getPrototypeOf(SignalsUploaderSampleFetchJob)).call(this, postMessageHandler));

    _this._parser = new SignalsUploaderCSVParser(delimiter);
    _this._numSampleRows = numSampleRows;
    _this._rows = [];
    _this._firstRowEnd = null;
    return _this;
  }

  _createClass(SignalsUploaderSampleFetchJob, [{
    key: '__processChunk',
    value: function __processChunk(chunk) {
      var _rows;

      for (var i = 0; i < chunk.data.length; i++) {
        this._parser.onNewCharacter(chunk.data[i]);
      }
      var rows = this._parser.readRows();
      this._updateFirstRowEnd(rows);
      (_rows = this._rows).push.apply(_rows, _toConsumableArray(rows.map(function (row) {
        return row.fields;
      })));
      if (this._rows.length >= this._numSampleRows) {
        this._finishJob();
      } else {
        this._continueJob();
      }
    }
  }, {
    key: '__processEndOfStream',
    value: function __processEndOfStream(endOfStream) {
      var _rows2;

      this._parser.onEndOfStream();
      var rows = this._parser.readRows();
      this._updateFirstRowEnd(rows);
      (_rows2 = this._rows).push.apply(_rows2, _toConsumableArray(rows.map(function (row) {
        return row.fields;
      })));
      this._finishJob();
    }
  }, {
    key: '_updateFirstRowEnd',
    value: function _updateFirstRowEnd(rows) {
      if (rows.length > 0 && this._firstRowEnd == null) {
        this._firstRowEnd = rows[0].end;
      }
    }
  }, {
    key: '_finishJob',
    value: function _finishJob() {
      var rows = this._rows.slice(0, this._numSampleRows);
      var samples = [];
      if (rows.length > 0) {
        rows[0].forEach(function () {
          return samples.push([]);
        });
        rows.forEach(function (row) {
          return samples.forEach(function (column, index) {
            return column.push(row[index] != null ? row[index] : null);
          });
        });
      }
      this.__postMessageToMainThread({
        type: 'sample-fetch-done',
        samples: samples,
        firstRowEnd: this._firstRowEnd
      });
    }
  }, {
    key: '_continueJob',
    value: function _continueJob() {
      this.__postMessageToMainThread({
        type: 'sample-fetch-chunk-processed'
      });
    }
  }]);

  return SignalsUploaderSampleFetchJob;
}(SignalsUploaderChunkDigestJob);

module.exports = SignalsUploaderSampleFetchJob;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsUploaderReader = __webpack_require__(75);

var invariant = __webpack_require__(1);

var SignalsUploaderNodeJSFileReader = function (_SignalsUploaderReade) {
  _inherits(SignalsUploaderNodeJSFileReader, _SignalsUploaderReade);

  function SignalsUploaderNodeJSFileReader(path, chunkSize, encoding, fs) {
    _classCallCheck(this, SignalsUploaderNodeJSFileReader);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderNodeJSFileReader.__proto__ || Object.getPrototypeOf(SignalsUploaderNodeJSFileReader)).call(this, chunkSize));

    _this._size = fs.statSync(path).size;
    _this._stream = fs.createReadStream(path, { encoding: encoding });
    _this._pendingReads = [];
    _this._stream.on('readable', function () {
      return _this._resolvePendingReads();
    });
    return _this;
  }

  _createClass(SignalsUploaderNodeJSFileReader, [{
    key: 'hasNextChunk',
    value: function hasNextChunk() {
      return this.__currentPosition < this._size;
    }
  }, {
    key: 'nextChunk',
    value: function nextChunk() {
      var _this2 = this;

      invariant(this.hasNextChunk(), 'End of data stream.');
      var start = this.__currentPosition;
      var end = Math.min(this.__currentPosition + this.__chunkSize, this._size);
      this.__currentPosition = end;
      this.__currentChunk++;

      return new Promise(function (resolve, reject) {
        _this2._pendingReads.push({
          start: start,
          end: end,
          resolve: resolve,
          reject: reject
        });

        _this2._resolvePendingReads();
      });
    }
  }, {
    key: '_resolvePendingReads',
    value: function _resolvePendingReads() {
      while (this._pendingReads.length > 0) {
        var nextRead = this._pendingReads[0];
        var data = this._stream.read(this.__chunkSize);
        if (data == null) {

          return;
        }
        if (typeof data === 'string') {
          nextRead.resolve({ start: nextRead.start, end: nextRead.end, data: data });
        } else {

          nextRead.reject(new Error('Encoding not set.'));
        }
        this._pendingReads = this._pendingReads.slice(1);
      }
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      return this._size;
    }
  }]);

  return SignalsUploaderNodeJSFileReader;
}(SignalsUploaderReader);

module.exports = SignalsUploaderNodeJSFileReader;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var abstractMethod = __webpack_require__(2);

var SignalsUploaderReader = function () {
  function SignalsUploaderReader(chunkSize) {
    _classCallCheck(this, SignalsUploaderReader);

    this.__currentChunk = 0;
    this.__currentPosition = 0;
    this.__chunkSize = chunkSize;
  }

  _createClass(SignalsUploaderReader, [{
    key: 'getSize',
    value: function getSize() {
      return abstractMethod('SignalsUploaderReader', 'getSize');
    }
  }, {
    key: 'hasNextChunk',
    value: function hasNextChunk() {
      return abstractMethod('SignalsUploaderReader', 'hasNextChunk');
    }
  }, {
    key: 'nextChunk',
    value: function nextChunk() {
      return abstractMethod('SignalsUploaderReader', 'nextChunk');
    }
  }, {
    key: 'currentPosition',
    value: function currentPosition() {
      return this.__currentPosition;
    }
  }, {
    key: 'currentChunk',
    value: function currentChunk() {
      return this.__currentChunk;
    }
  }]);

  return SignalsUploaderReader;
}();

module.exports = SignalsUploaderReader;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalsUploaderJobManager = __webpack_require__(68);
var SignalsUploaderWorker = __webpack_require__(77);

var SignalsUploaderUIWorker = function (_SignalsUploaderWorke) {
  _inherits(SignalsUploaderUIWorker, _SignalsUploaderWorke);

  function SignalsUploaderUIWorker(messageHandler) {
    _classCallCheck(this, SignalsUploaderUIWorker);

    var _this = _possibleConstructorReturn(this, (SignalsUploaderUIWorker.__proto__ || Object.getPrototypeOf(SignalsUploaderUIWorker)).call(this));

    _this._messageHandler = messageHandler;
    _this._jobManager = new SignalsUploaderJobManager(messageHandler);
    return _this;
  }

  _createClass(SignalsUploaderUIWorker, [{
    key: 'postMessage',
    value: function postMessage(message) {
      this._jobManager.sendMessageToWorker(message);
    }
  }, {
    key: 'stop',
    value: function stop() {}
  }]);

  return SignalsUploaderUIWorker;
}(SignalsUploaderWorker);

module.exports = SignalsUploaderUIWorker;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var abstractMethod = __webpack_require__(2);

var SignalsUploaderWorker = function () {
  function SignalsUploaderWorker() {
    _classCallCheck(this, SignalsUploaderWorker);
  }

  _createClass(SignalsUploaderWorker, [{
    key: 'postMessage',
    value: function postMessage(message) {
      abstractMethod('SignalsUploaderWorker', 'postMessage');
    }
  }, {
    key: 'stop',
    value: function stop() {
      abstractMethod('SignalsUploaderWorker', 'stop');
    }
  }]);

  return SignalsUploaderWorker;
}();

module.exports = SignalsUploaderWorker;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var US_NUMBER_RE = /^1\(?\d{3}\)?\d{7}$/;
var NORWAY_NUMBER_RE = /^47\d{8}$/;
var INTL_NUMBER_RE = /^\d{1,4}\(?\d{2,3}\)?\d{4,}$/;

function isInternationalPhoneNumber(number) {
  number = number.replace(/[\-\s]+/g, '').replace(/^\+?0{0,2}/, '');

  if (number.startsWith('0')) {
    return false;
  }

  if (number.startsWith('1')) {
    return US_NUMBER_RE.test(number);
  }

  if (number.startsWith('47')) {
    return NORWAY_NUMBER_RE.test(number);
  }

  return INTL_NUMBER_RE.test(number);
}

module.exports = isInternationalPhoneNumber;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Object.freeze({ "WHITESPACE_ONLY": "whitespace_only", "WHITESPACE_AND_PUNCTUATION": "whitespace_and_punctuation", "ALL_NON_LATIN_ALPHA_NUMERIC": "all_non_latin_alpha_numeric" });

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var OfflineStandardEventsEnum = __webpack_require__(45);
var SignalDateFormats = __webpack_require__(7);
var SignalsBasicPIISchema = __webpack_require__(38);
var SignalsCurrencyCodes = __webpack_require__(19);
var SignalsDSDITestUploadUtils = __webpack_require__(39);
var SignalsDSDITestUploadWarnings = __webpack_require__(40);
var SignalsEventDataSchema = __webpack_require__(36);
var SignalsHashedEventDataSchema = __webpack_require__(37);
var SignalsUploaderPreviewV2Task = __webpack_require__(42);
var SignalsUploaderSampleFetchTask = __webpack_require__(43);
var SignalsUploaderUploadTask = __webpack_require__(44);
var SignalTimestampFormats = __webpack_require__(41);

var getSignalsSchemaSummary = __webpack_require__(18);

module.exports = {
  OfflineStandardEventsEnum: OfflineStandardEventsEnum,
  SignalDateFormats: SignalDateFormats,
  SignalsBasicPIISchema: SignalsBasicPIISchema,
  SignalsCurrencyCodes: SignalsCurrencyCodes,
  SignalsDSDITestUploadUtils: SignalsDSDITestUploadUtils,
  SignalsDSDITestUploadWarnings: SignalsDSDITestUploadWarnings,
  SignalsEventDataSchema: SignalsEventDataSchema,
  SignalsHashedEventDataSchema: SignalsHashedEventDataSchema,
  SignalsUploaderPreviewV2Task: SignalsUploaderPreviewV2Task,
  SignalsUploaderSampleFetchTask: SignalsUploaderSampleFetchTask,
  SignalsUploaderUploadTask: SignalsUploaderUploadTask,
  SignalTimestampFormats: SignalTimestampFormats,
  getSignalsSchemaSummary: getSignalsSchemaSummary
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SignalsUploaderNodeJSFileReader = __webpack_require__(74);

var fs = __webpack_require__(95);

function createSignalsUploaderReader(source, chunkSize) {
  return new SignalsUploaderNodeJSFileReader(source, chunkSize, 'utf8', fs);
}

module.exports = createSignalsUploaderReader;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rawAsap = __webpack_require__(32);
var freeTasks = [];

module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawTask.domain = process.domain;
    rawAsap(rawTask);
}

function RawTask() {
    this.task = null;
    this.domain = null;
}

RawTask.prototype.call = function () {
    if (this.domain) {
        this.domain.enter();
    }
    var threw = true;
    try {
        this.task.call();
        threw = false;
       
       
        if (this.domain) {
            this.domain.exit();
        }
    } finally {
       
       
        if (threw) {
           
           
           
           
           
            rawAsap.requestFlush();
        }
       
       
        this.task = null;
        this.domain = null;
        freeTasks.push(this);
    }
};



/***/ }),
/* 83 */
/***/ (function(module, exports) {

!function(globals) {
'use strict'

var convertHex = {
  bytesToHex: function(bytes) {
        return arrBytesToHex(bytes)
  },
  hexToBytes: function(hex) {
    if (hex.length % 2 === 1) throw new Error("hexToBytes can't have a string with an odd number of characters.")
    if (hex.indexOf('0x') === 0) hex = hex.slice(2)
    return hex.match(/../g).map(function(x) { return parseInt(x,16) })
  }
}




function arrBytesToHex(bytes) {
  return bytes.map(function(x) { return padLeft(x.toString(16),2) }).join('')
}

function padLeft(orig, len) {
  if (orig.length > len) return orig
  return Array(len - orig.length + 1).join('0') + orig
}


if (typeof module !== 'undefined' && module.exports) {
  module.exports = convertHex
} else {
  globals.convertHex = convertHex
}

}(this);

/***/ }),
/* 84 */
/***/ (function(module, exports) {

!function(globals) {
'use strict'

var convertString = {
  bytesToString: function(bytes) {
    return bytes.map(function(x){ return String.fromCharCode(x) }).join('')
  },
  stringToBytes: function(str) {
    return str.split('').map(function(x) { return x.charCodeAt(0) })
  }
}


convertString.UTF8 = {
   bytesToString: function(bytes) {
    return decodeURIComponent(escape(convertString.bytesToString(bytes)))
  },
  stringToBytes: function(str) {
   return convertString.stringToBytes(unescape(encodeURIComponent(str)))
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = convertString
} else {
  globals.convertString = convertString
}

}(this);

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var invariant = __webpack_require__(33);

function keyMirrorRecursive(obj, prefix) {
  return keyMirrorRecursiveInternal(obj, prefix);
}

function keyMirrorRecursiveInternal(
obj,
prefix) {
  var ret = {};
  var key;

  !isObject(obj) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirrorRecursive(...): Argument must be an object.') : invariant(false) : void 0;

  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    var val = obj[key];

    var newPrefix = prefix ? prefix + '.' + key : key;

    if (isObject(val)) {
      val = keyMirrorRecursiveInternal(val, newPrefix);
    } else {
      val = newPrefix;
    }

    ret[key] = val;
  }
  return ret;
}

function isObject(obj) {
  return obj instanceof Object && !Array.isArray(obj);
}

module.exports = keyMirrorRecursive;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nullthrows = function nullthrows(x) {
  if (x != null) {
    return x;
  }
  throw new Error("Got unexpected null or undefined");
};

module.exports = nullthrows;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = __webpack_require__(5);

module.exports = Promise;
Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";




var Promise = __webpack_require__(5);

module.exports = Promise;

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._61);
  p._65 = 1;
  p._55 = value;
  return p;
}
Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._65 === 3) {
            val = val._55;
          }
          if (val._65 === 1) return res(i, val._55);
          if (val._65 === 2) reject(val._55);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = __webpack_require__(5);

module.exports = Promise;
Promise.prototype['finally'] = function (f) {
  return this.then(function (value) {
    return Promise.resolve(f()).then(function () {
      return value;
    });
  }, function (err) {
    return Promise.resolve(f()).then(function () {
      throw err;
    });
  });
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(5);
__webpack_require__(87);
__webpack_require__(89);
__webpack_require__(88);
__webpack_require__(91);
__webpack_require__(92);


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";





var Promise = __webpack_require__(5);
var asap = __webpack_require__(82);

module.exports = Promise;

Promise.denodeify = function (fn, argumentCount) {
  if (
    typeof argumentCount === 'number' && argumentCount !== Infinity
  ) {
    return denodeifyWithCount(fn, argumentCount);
  } else {
    return denodeifyWithoutCount(fn);
  }
};

var callbackFn = (
  'function (err, res) {' +
  'if (err) { rj(err); } else { rs(res); }' +
  '}'
);
function denodeifyWithCount(fn, argumentCount) {
  var args = [];
  for (var i = 0; i < argumentCount; i++) {
    args.push('a' + i);
  }
  var body = [
    'return function (' + args.join(',') + ') {',
    'var self = this;',
    'return new Promise(function (rs, rj) {',
    'var res = fn.call(',
    ['self'].concat(args).concat([callbackFn]).join(','),
    ');',
    'if (res &&',
    '(typeof res === "object" || typeof res === "function") &&',
    'typeof res.then === "function"',
    ') {rs(res);}',
    '});',
    '};'
  ].join('');
  return Function(['Promise', 'fn'], body)(Promise, fn);
}
function denodeifyWithoutCount(fn) {
  var fnLength = Math.max(fn.length - 1, 3);
  var args = [];
  for (var i = 0; i < fnLength; i++) {
    args.push('a' + i);
  }
  var body = [
    'return function (' + args.join(',') + ') {',
    'var self = this;',
    'var args;',
    'var argLength = arguments.length;',
    'if (arguments.length > ' + fnLength + ') {',
    'args = new Array(arguments.length + 1);',
    'for (var i = 0; i < arguments.length; i++) {',
    'args[i] = arguments[i];',
    '}',
    '}',
    'return new Promise(function (rs, rj) {',
    'var cb = ' + callbackFn + ';',
    'var res;',
    'switch (argLength) {',
    args.concat(['extra']).map(function (_, index) {
      return (
        'case ' + (index) + ':' +
        'res = fn.call(' + ['self'].concat(args.slice(0, index)).concat('cb').join(',') + ');' +
        'break;'
      );
    }).join(''),
    'default:',
    'args[argLength] = cb;',
    'res = fn.apply(self, args);',
    '}',
    
    'if (res &&',
    '(typeof res === "object" || typeof res === "function") &&',
    'typeof res.then === "function"',
    ') {rs(res);}',
    '});',
    '};'
  ].join('');

  return Function(
    ['Promise', 'fn'],
    body
  )(Promise, fn);
}

Promise.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var callback =
      typeof args[args.length - 1] === 'function' ? args.pop() : null;
    var ctx = this;
    try {
      return fn.apply(this, arguments).nodeify(callback, ctx);
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise(function (resolve, reject) {
          reject(ex);
        });
      } else {
        asap(function () {
          callback.call(ctx, ex);
        })
      }
    }
  }
};

Promise.prototype.nodeify = function (callback, ctx) {
  if (typeof callback != 'function') return this;

  this.then(function (value) {
    asap(function () {
      callback.call(ctx, null, value);
    });
  }, function (err) {
    asap(function () {
      callback.call(ctx, err);
    });
  });
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = __webpack_require__(5);

module.exports = Promise;
Promise.enableSynchronous = function () {
  Promise.prototype.isPending = function() {
    return this.getState() == 0;
  };

  Promise.prototype.isFulfilled = function() {
    return this.getState() == 1;
  };

  Promise.prototype.isRejected = function() {
    return this.getState() == 2;
  };

  Promise.prototype.getValue = function () {
    if (this._65 === 3) {
      return this._55.getValue();
    }

    if (!this.isFulfilled()) {
      throw new Error('Cannot get a value of an unfulfilled promise.');
    }

    return this._55;
  };

  Promise.prototype.getReason = function () {
    if (this._65 === 3) {
      return this._55.getReason();
    }

    if (!this.isRejected()) {
      throw new Error('Cannot get a rejection reason of a non-rejected promise.');
    }

    return this._55;
  };

  Promise.prototype.getState = function () {
    if (this._65 === 3) {
      return this._55.getState();
    }
    if (this._65 === -1 || this._65 === -2) {
      return 0;
    }

    return this._65;
  };
};

Promise.disableSynchronous = function() {
  Promise.prototype.isPending = undefined;
  Promise.prototype.isFulfilled = undefined;
  Promise.prototype.isRejected = undefined;
  Promise.prototype.getValue = undefined;
  Promise.prototype.getReason = undefined;
  Promise.prototype.getState = undefined;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

!function(globals) {
'use strict'

var _imports = {}

if (typeof module !== 'undefined' && module.exports) {
  _imports.bytesToHex = __webpack_require__(83).bytesToHex
  _imports.convertString = __webpack_require__(84)
  module.exports = sha256
} else {
  _imports.bytesToHex = globals.convertHex.bytesToHex
  _imports.convertString = globals.convertString
  globals.sha256 = sha256
}


var K = []


!function () {
  function isPrime(n) {
    var sqrtN = Math.sqrt(n);
    for (var factor = 2; factor <= sqrtN; factor++) {
      if (!(n % factor)) return false
    }

    return true
  }

  function getFractionalBits(n) {
    return ((n - (n | 0)) * 0x100000000) | 0
  }

  var n = 2
  var nPrime = 0
  while (nPrime < 64) {
    if (isPrime(n)) {
      K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3))
      nPrime++
    }

    n++
  }
}()

var bytesToWords = function (bytes) {
  var words = []
  for (var i = 0, b = 0; i < bytes.length; i++, b += 8) {
    words[b >>> 5] |= bytes[i] << (24 - b % 32)
  }
  return words
}

var wordsToBytes = function (words) {
  var bytes = []
  for (var b = 0; b < words.length * 32; b += 8) {
    bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF)
  }
  return bytes
}


var W = []

var processBlock = function (H, M, offset) {
 
  var a = H[0], b = H[1], c = H[2], d = H[3]
  var e = H[4], f = H[5], g = H[6], h = H[7]

   
  for (var i = 0; i < 64; i++) {
    if (i < 16) {
      W[i] = M[offset + i] | 0
    } else {
      var gamma0x = W[i - 15]
      var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
                    ((gamma0x << 14) | (gamma0x >>> 18)) ^
                    (gamma0x >>> 3)

      var gamma1x = W[i - 2];
      var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
                    ((gamma1x << 13) | (gamma1x >>> 19)) ^
                    (gamma1x >>> 10)

      W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
    }

    var ch  = (e & f) ^ (~e & g);
    var maj = (a & b) ^ (a & c) ^ (b & c);

    var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
    var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

    var t1 = h + sigma1 + ch + K[i] + W[i];
    var t2 = sigma0 + maj;

    h = g;
    g = f;
    f = e;
    e = (d + t1) | 0;
    d = c;
    c = b;
    b = a;
    a = (t1 + t2) | 0;
  }

 
  H[0] = (H[0] + a) | 0;
  H[1] = (H[1] + b) | 0;
  H[2] = (H[2] + c) | 0;
  H[3] = (H[3] + d) | 0;
  H[4] = (H[4] + e) | 0;
  H[5] = (H[5] + f) | 0;
  H[6] = (H[6] + g) | 0;
  H[7] = (H[7] + h) | 0;
}

function sha256(message, options) {;
  if (message.constructor === String) {
    message = _imports.convertString.UTF8.stringToBytes(message);
  }

  var H =[ 0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
           0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19 ];

  var m = bytesToWords(message);
  var l = message.length * 8;

  m[l >> 5] |= 0x80 << (24 - l % 32);
  m[((l + 64 >> 9) << 4) + 15] = l;

  for (var i=0 ; i<m.length; i += 16) {
    processBlock(H, m, i);
  }

  var digestbytes = wordsToBytes(H);
  return options && options.asBytes ? digestbytes :
         options && options.asString ? _imports.convertString.bytesToString(digestbytes) :
         _imports.bytesToHex(digestbytes)
}

sha256.x2 = function(message, options) {
  return sha256(sha256(message, { asBytes:true }), options)
}

}(this);


/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = require("domain");

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })
/******/ ]);