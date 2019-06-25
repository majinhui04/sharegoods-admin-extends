/* eslint-disable */
function _classCallCheck(r, t) {
    if (!(r instanceof t)) throw new TypeError('Cannot call a class as a function');
}

function _toConsumableArray(r) {
    if (Array.isArray(r)) {
        for (var t = 0, o = Array(r.length); t < r.length; t++) o[t] = r[t];
        return o;
    }
    return Array.from(r);
}

var _extends = Object.assign || function (r) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var e in o) Object.prototype.hasOwnProperty.call(o, e) && (r[e] = o[e]);
    }
    return r;
}, consoleLogger = {
    type: 'logger',
    log: function (r) {
        this.output('log', r);
    },
    warn: function (r) {
        this.output('warn', r);
    },
    error: function (r) {
        this.output('error', r);
    },
    output: function (r, t) {
        var o;
        console && console[r] && (o = console)[r].apply(o, _toConsumableArray(t));
    }
}, Logger = (function () {
    function r(t) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        _classCallCheck(this, r);
        this.init(t, o);
    }

    r.prototype.init = function (r) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        this.prefix = t.prefix || 'i18next:';
        this.logger = r || consoleLogger;
        this.options = t;
        this.debug = t.debug;
    };
    r.prototype.setDebug = function (r) {
        this.debug = r;
    };
    r.prototype.log = function () {
        for (var r = arguments.length, t = Array(r), o = 0; o < r; o++) t[o] = arguments[o];
        return this.forward(t, 'log', '', !0);
    };
    r.prototype.warn = function () {
        for (var r = arguments.length, t = Array(r), o = 0; o < r; o++) t[o] = arguments[o];
        return this.forward(t, 'warn', '', !0);
    };
    r.prototype.error = function () {
        for (var r = arguments.length, t = Array(r), o = 0; o < r; o++) t[o] = arguments[o];
        return this.forward(t, 'error', '');
    };
    r.prototype.deprecate = function () {
        for (var r = arguments.length, t = Array(r), o = 0; o < r; o++) t[o] = arguments[o];
        return this.forward(t, 'warn', 'WARNING DEPRECATED: ', !0);
    };
    r.prototype.forward = function (r, t, o, e) {
        return e && !this.debug ? null : ('string' === typeof r[0] && (r[0] = '' + o + this.prefix + ' ' +
            r[0]), this.logger[t](r));
    };
    r.prototype.create = function (t) {
        return new r(this.logger, _extends({
            prefix: this.prefix + ':' + t + ':'
        }, this.options));
    };
    return r;
}());

const debug = location.search.indexOf('debug') > -1 ? true : !(process.env.NODE_ENV === 'production');
const $console = new Logger(null, { debug: debug, prefix: '[Logger]' });
export {
    Logger
};
export default $console;
