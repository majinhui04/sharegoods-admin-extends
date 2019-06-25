"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HttpInterface =
/*#__PURE__*/
function () {
  function HttpInterface(urls, options) {
    _classCallCheck(this, HttpInterface);

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

  _createClass(HttpInterface, [{
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