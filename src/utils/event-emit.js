function EventEmitter() {
    this.observers = {};
}
EventEmitter.prototype.on = function (e, cb) {
    var s = this;
    e.split(' ').forEach(function (e) {
        s.observers[e] = s.observers[e] || [];
        s.observers[e].push(cb);
    });
};
EventEmitter.prototype.off = function (e, functionName) {
    var s = this;
    this.observers[e] && this.observers[e].forEach(function () {
        if (functionName) {
            var t = s.observers[e].indexOf(functionName);
            t > -1 && s.observers[e].splice(t, 1);
        } else {
            delete s.observers[e];
        }
    });
};
EventEmitter.prototype.emit = function (e) {
    for (var r = arguments.length, s = Array(r > 1 ? r - 1 : 0), t = 1; t < r; t++) {
        s[t - 1] = arguments[t];
    }

    if (this.observers[e]) {
        [].concat(this.observers[e]).forEach(function (cb) {
            cb.apply(void 0, s);
        });
    }
    if (this.observers['*']) {
        [].concat(this.observers['*']).forEach(function (r) {
            var t;
            r.apply(r, (t = [e]).concat.apply(t, s));
        });
    }
};
export default EventEmitter;
