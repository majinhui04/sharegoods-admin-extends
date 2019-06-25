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
    gt: function (t) {
        return Version.compare(this, t) > 0;
    },
    gte: function (t) {
        return Version.compare(this, t) >= 0;
    },
    lt: function (t) {
        return Version.compare(this, t) < 0;
    },
    lte: function (t) {
        return Version.compare(this, t) <= 0;
    },
    eq: function (t) {
        return Version.compare(this, t) === 0;
    },
    toString: function () {
        return this.val.toString();
    }
};
export default Version;
