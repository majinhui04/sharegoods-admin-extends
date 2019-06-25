"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureTimeout;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TIMEOUT = 15000;
var requestIndex = 0;
var cancelRequestMap = {};

function configureTimeout(config) {
  requestIndex += 1;
  var currentRequestIndex = requestIndex;
  config.cancelToken = new _axios.default.CancelToken(function (cancelExecutor) {
    cancelRequestMap[currentRequestIndex] = cancelExecutor;
  });
  var timeout = config.timeout || DEFAULT_TIMEOUT;
  setTimeout(function () {
    if (cancelRequestMap[currentRequestIndex] instanceof Function) {
      cancelRequestMap[currentRequestIndex]('ECONNABORTED');
      cancelRequestMap[currentRequestIndex] = null;
    }
  }, timeout);
  return config;
}