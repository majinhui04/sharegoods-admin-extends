export function sleep(numberMillis) {
    let now = new Date();
    const exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime) {
            return;
        }
    }
}

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000;
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value];
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return time_str;
}

export function formatTime(time, option) {
    time = +time * 1000;
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - d) / 1000;

    if (diff < 30) {
        return '刚刚';
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
        return '1天前';
    }
    if (option) {
        return parseTime(time, option);
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        );
    }
}

export function filterAsyncRouter(routes, callback) {
    const res = [];
    const len = routes.length;
    for (let i = 0; i < len; i++) {
        const tmp = { ...routes[i] };
        callback && callback(tmp);
        if (tmp.children) {
            tmp.children = filterAsyncRouter(tmp.children, callback);
        }
        res.push(tmp);
    }
    return res;
}

export function completionList(a, b) {
    if (a.length > b.length) {
        a.forEach((item, i) => {
            const keys = Object.keys(item);
            if (b[i] === undefined) {
                b[i] = {};
                keys.forEach(key => {
                    b[i][key] = 0;
                });
            }
        });

        return a;
    } else {
        b.forEach((item, i) => {
            const keys = Object.keys(item);
            if (a[i] === undefined) {
                a[i] = {};
                keys.forEach(key => {
                    a[i][key] = 0;
                });
            }
        });
        return b;
    }
}

export function downloadFile(url) {
    try {
        var elemIF = document.createElement('iframe');
        elemIF.src = url;
        elemIF.style.display = 'none';
        document.body.appendChild(elemIF);
    } catch (e) {
        window.$console && window.$console.error('downloadFile', e);
    }
}

export function findAllParents(routes, name) {
    const len = routes.length;
    for (let i = 0; i < len; i++) {
        const tmp = { ...routes[i] };
        if (tmp.name === name) {
            return [tmp.name];
        }
        if (tmp.children) {
            const result = findAllParents(tmp.children, name);
            if (result !== undefined) {
                return [tmp.name].concat(result);
            }
        }
    }
}

export function findAllParentsData(routes, name) {
    const len = routes.length;
    for (let i = 0; i < len; i++) {
        const meta = routes[i].meta || {};
        const tmp = { ...routes[i], ...meta };
        if (tmp.name === name) {
            delete tmp.components;
            return [tmp];
        }
        if (tmp.children) {
            const result = findAllParentsData(tmp.children, name);
            if (result !== undefined) {
                return [tmp].concat(result);
            }
        }
    }
}

export function deepClone(obj) {
    // 判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
    var objClone = Array.isArray(obj) ? [] : {};
    // 进行深拷贝的不能为空，并且是对象或者是
    if (obj && typeof obj === 'object') {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    objClone[key] = deepClone(obj[key]);
                } else {
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = url.split('?')[1];
    if (!search) {
        return {};
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, ' ') +
        '"}'
    );
}

