"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.hasOwn = hasOwn;
exports.qs = exports.autoprefixer = exports.escapeRegexpString = void 0;

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