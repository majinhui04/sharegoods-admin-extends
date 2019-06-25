"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable */
function Version(value) {
  this.val = value ? value.toString() : '';
}

Version.compare = function (me, he) {
  me = me.toString().split('.');
  he = he.toString().split('.');

  for (var r = 0; r < me.length || r < he.length; r++) {
    var n = parseInt(me[r], 10),
        a = parseInt(he[r], 10);
    if (isNaN(n) && (n = 0), isNaN(a) && (a = 0), n < a) return -1;
    if (n > a) return 1;
  }

  return 0;
};

Version.prototype = {
  gt: function gt(t) {
    return Version.compare(this, t) > 0;
  },
  gte: function gte(t) {
    return Version.compare(this, t) >= 0;
  },
  lt: function lt(t) {
    return Version.compare(this, t) < 0;
  },
  lte: function lte(t) {
    return Version.compare(this, t) <= 0;
  },
  eq: function eq(t) {
    return Version.compare(this, t) === 0;
  },
  toString: function toString() {
    return this.val.toString();
  }
};
var _default = Version;
exports.default = _default;