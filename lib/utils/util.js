"use strict";

var _interopRequireDefault = require("/Users/damon/Documents/webapp/crm/sharegoods-ui/node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.hasOwn = hasOwn;
exports.qs = exports.autoprefixer = exports.escapeRegexpString = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.regexp.split");

var _typeof2 = _interopRequireDefault(require("/Users/damon/Documents/webapp/crm/sharegoods-ui/node_modules/@babel/runtime-corejs2/helpers/esm/typeof"));

require("core-js/modules/es6.regexp.replace");

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
  if ((0, _typeof2.default)(style) !== 'object') return style;
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