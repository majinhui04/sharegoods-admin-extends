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
    object2Query(params) {
        return Object.keys(params).map(function (key) {
            return key + '=' + encodeURIComponent(params[key]);
        }).join('&');
    }
};

export function downloadFile(url) {
    const ts = +new Date();
    const uri = url.indexOf('?') > -1 ? url + '&ts=' + ts : url + '?ts=' + ts;
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
export const getIntersection = (arr1, arr2) => {
    let len = Math.min(arr1.length, arr2.length);
    let i = -1;
    let res = [];
    while (++i < len) {
        const item = arr2[i];
        if (arr1.indexOf(item) > -1) res.push(item);
    }
    return res;
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]));
};

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (target, arr) => {
    return target.some(_ => arr.indexOf(_) > -1);
};
