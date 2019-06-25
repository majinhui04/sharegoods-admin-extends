"use strict";

var _interopRequireDefault = require("/Users/damon/Documents/webapp/crm/sharegoods-ui/node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureTimeout;

var _axios = _interopRequireDefault(require("axios"));

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