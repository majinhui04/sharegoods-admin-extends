"use strict";

var _interopRequireDefault = require("/Users/damon/Documents/webapp/crm/sharegoods-ui/node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.function.name");

var _classCallCheck2 = _interopRequireDefault(require("/Users/damon/Documents/webapp/crm/sharegoods-ui/node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/damon/Documents/webapp/crm/sharegoods-ui/node_modules/@babel/runtime-corejs2/helpers/esm/createClass"));

var HttpInterface =
/*#__PURE__*/
function () {
  function HttpInterface(urls, options) {
    (0, _classCallCheck2.default)(this, HttpInterface);
    this.Urls = urls;
    this.API = {};
    this.options = options || {};
    this.baseURL = options.baseURL || '';
    this.headers = options.headers || {}; // 全局接口

    this.transformRequest = options.transformRequest || function () {};

    this.transformResponse = options.transformResponse || function () {};

    this.handleSuccess = options.handleSuccess;
    this.handleError = options.handleError;

    this.getResponseSuccess = options.getResponseSuccess || function () {
      return true;
    };

    this.init();
  }

  (0, _createClass2.default)(HttpInterface, [{
    key: "init",
    value: function init() {
      throw new Error("".concat(this.constructor.name, " \u6CA1\u6709\u5B9E\u73B0 init \u65B9\u6CD5\uFF01"));
    }
  }, {
    key: "setHeader",
    value: function setHeader(config) {
      Object.assign(this.headers, config);
    }
  }, {
    key: "getHeader",
    value: function getHeader() {
      return this.headers;
    }
  }, {
    key: "get",
    value: function get() {
      throw new Error("".concat(this.constructor.name, " \u6CA1\u6709\u5B9E\u73B0 get \u65B9\u6CD5\uFF01"));
    }
  }, {
    key: "post",
    value: function post() {
      throw new Error("".concat(this.constructor.name, " \u6CA1\u6709\u5B9E\u73B0 post \u65B9\u6CD5\uFF01"));
    }
  }, {
    key: "request",
    value: function request() {
      throw new Error("".concat(this.constructor.name, " \u6CA1\u6709\u5B9E\u73B0 request \u65B9\u6CD5\uFF01"));
    }
  }, {
    key: "processAPI",
    value: function processAPI() {
      return this.Urls;
    }
  }]);
  return HttpInterface;
}();

var _default = HttpInterface;
exports.default = _default;