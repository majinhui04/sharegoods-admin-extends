"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var flatry = function flatry(promise) {
  return promise.then(function (data) {
    return {
      data: data,
      error: null
    };
  }).catch(function (error) {
    return {
      error: error,
      data: null
    };
  });
};

var _default = flatry;
exports.default = _default;