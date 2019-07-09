"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.hasOwn = hasOwn;
exports.downloadFile = downloadFile;
exports.hasOneOf = exports.getUnion = exports.getIntersection = exports.qs = exports.autoprefixer = exports.escapeRegexpString = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var hasOwnProperty = Object.prototype.hasOwnProperty;

function noop() {}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}

var escapeRegexpString = function escapeRegexpString() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
};

exports.escapeRegexpString = escapeRegexpString;

var autoprefixer = function autoprefixer(style) {
  if (_typeof(style) !== 'object') return style;
  var rules = ['transform', 'transition', 'animation'];
  var prefixes = ['ms-', 'webkit-'];
  rules.forEach(function (rule) {
    var value = style[rule];

    if (rule && value) {
      prefixes.forEach(function (prefix) {
        style[prefix + rule] = value;
      });
    }
  });
  return style;
};

exports.autoprefixer = autoprefixer;
var qs = {
  /**
   * http://www.mr.com?a=1&b=2 => {a:1,b:2}
   * @param {String} url
   * @return {Object}
   */
  query2Object: function query2Object(url) {
    var result = {};
    var uri = url || '';
    var tail = uri.split('?').slice(1).join('');

    for (var n = tail.split('&'), i = 0; i < n.length; i++) {
      var r = n[i];
      var d = r.indexOf('=');

      if (!(d < 0 || d === r.length - 1)) {
        var key = r.substring(0, d);
        var value = r.substring(d + 1);
        key.length !== 0 && value.length !== 0 && (result[key] = decodeURIComponent(value));
      }
    }

    return result;
  },

  /**
   * {a:1,b:2} => a=1&b=2
   * @param {Object}
   * @return {String}
   */
  object2Query: function object2Query(params) {
    return Object.keys(params).map(function (key) {
      return key + '=' + encodeURIComponent(params[key]);
    }).join('&');
  }
};
exports.qs = qs;

function downloadFile(url) {
  var ts = +new Date();
  var uri = url.indexOf('?') > -1 ? url + '&ts=' + ts : url + '?ts=' + ts;

  try {
    var elemIF = document.createElement('iframe');
    elemIF.src = uri;
    elemIF.style.display = 'none';
    document.body.appendChild(elemIF);
    setTimeout(function () {
      document.body.removeChild(elemIF);
    }, 1000);
  } catch (e) {
    console.error('downloadFile', e);
  }
}
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */


var getIntersection = function getIntersection(arr1, arr2) {
  var len = Math.min(arr1.length, arr2.length);
  var i = -1;
  var res = [];

  while (++i < len) {
    var item = arr2[i];
    if (arr1.indexOf(item) > -1) res.push(item);
  }

  return res;
};
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */


exports.getIntersection = getIntersection;

var getUnion = function getUnion(arr1, arr2) {
  return Array.from(new Set([].concat(_toConsumableArray(arr1), _toConsumableArray(arr2))));
};
/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */


exports.getUnion = getUnion;

var hasOneOf = function hasOneOf(target, arr) {
  return target.some(function (_) {
    return arr.indexOf(_) > -1;
  });
};

exports.hasOneOf = hasOneOf;