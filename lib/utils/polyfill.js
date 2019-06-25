"use strict";

var slice = [].slice; // 拓展对象属性方法，默认不覆盖目标对象已存在的属性

function extend(target, source, override) {
  for (var key in source) {
    (void 0 === target[key] || override) && (target[key] = source[key]);
  }

  return target;
}

extend(String.prototype, {
  startsWith: function startsWith(prefix) {
    return this.slice(0, prefix.length) === prefix;
  },
  endsWith: function endsWith(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  },
  trim: function trim() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  },
  replaceAll: function replaceAll(pattern, target) {
    return this.replace(new RegExp(pattern, 'gm'), target);
  },
  // 'hello,{0},this is a {1}'.format('jinhui','demo') => 'hello,jinhui,this is a demo'
  format: function format() {
    var e = arguments;
    return this.replace(/\{(\d+)\}/g, function (t, n) {
      return e[n];
    });
  },
  toPrice: function toPrice(e) {
    return Number(this).toPrice(e);
  }
});
extend(Array.prototype, {
  find: function find(e) {
    for (var t = 0; t < this.length; ++t) {
      if (e(this[t], t)) {
        return this[t];
      }
    }
  },
  indexOf: function indexOf(e, t) {
    t = t || 0;

    for (var n = t, r = this.length; n < r; n++) {
      if (this[n] === e) {
        return n;
      }
    }

    return -1;
  },
  forEach: function forEach(e, t) {
    for (var n = 0, r = this.length; n < r; n++) {
      e.call(t, this[n], n, this);
    }
  },
  filter: function filter(e, t) {
    for (var n = [], r = 0, o = this.length; r < o; r++) {
      var i = e.call(t, this[r], r, this);
      i && n.push(this[r]);
    }

    return n;
  },
  map: function map(e, t) {
    for (var n = [], r = 0, o = this.length; r < o; r++) {
      n.push(e.call(t, this[r], r, this));
    }

    return n;
  }
});
extend(Function.prototype, {
  bind: function bind(e) {
    var t = this;
    var n = slice.call(arguments, 1);
    return function () {
      var r = n.concat(slice.call(arguments));
      return t.apply(e, r);
    };
  }
});
extend(Number.prototype, {
  toPrice: function toPrice(e) {
    e = extend({
      isFixed: true
    }, e, true);
    return e.isFixed ? this.toFixed(2) : '' + this.valueOf();
  }
});
extend(Object, {
  keys: function keys(e) {
    var t = [];

    for (var n in e) {
      e.hasOwnProperty(n) && t.push(n);
    }

    return t;
  }
});