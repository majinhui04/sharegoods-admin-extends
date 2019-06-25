const hasOwnProperty = Object.prototype.hasOwnProperty;

export function noop() {
}

export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

function extend(to, _from) {
    for (const key in _from) {
        to[key] = _from[key];
    }
    return to;
}

export const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

export const autoprefixer = function (style) {
    if (typeof style !== 'object') return style;
    const rules = ['transform', 'transition', 'animation'];
    const prefixes = ['ms-', 'webkit-'];
    rules.forEach(rule => {
        const value = style[rule];
        if (rule && value) {
            prefixes.forEach(prefix => {
                style[prefix + rule] = value;
            });
        }
    });
    return style;
};

export const qs = {
    /**
     * http://www.mr.com?a=1&b=2 => {a:1,b:2}
     * @param {String} url
     * @return {Object}
     */
    query2Object(url) {
        var result = {};
        var uri = url || '';
        var tail = uri.split('?').slice(1).join('');

        for (var n = tail.split('&'), i = 0; i < n.length; i++) {
            var r = n[i]; var d = r.indexOf('=');
            if (!(d < 0 || d === r.length - 1)) {
                var key = r.substring(0, d); var value = r.substring(d + 1);
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
    object2Query(params) {
        return Object.keys(params).map(function (key) {
            return key + '=' + encodeURIComponent(params[key]);
        }).join('&');
    }
};

