"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTime = parseTime;
exports.formatTime = formatTime;
exports.filterAsyncRouter = filterAsyncRouter;
exports.completionList = completionList;
exports.downloadFile = downloadFile;
exports.findAllParents = findAllParents;
exports.findAllParentsData = findAllParentsData;
exports.deepClone = deepClone;
exports.param2Obj = param2Obj;
exports.sleep = sleep;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }

  var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  var date;

  if (_typeof(time) === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }

  var formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
    var value = formatObj[key]; // Note: getDay() returns 0 on Sunday

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

function formatTime(time, option) {
  time = +time * 1000;
  var d = new Date(time);
  var now = Date.now();
  var diff = (now - d) / 1000;

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
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
  }
}

function filterAsyncRouter(routes, callback) {
  var res = [];
  var len = routes.length;

  for (var i = 0; i < len; i++) {
    var tmp = _objectSpread({}, routes[i]);

    callback && callback(tmp);

    if (tmp.children) {
      tmp.children = filterAsyncRouter(tmp.children, callback);
    }

    res.push(tmp);
  }

  return res;
}

function completionList(a, b) {
  if (a.length > b.length) {
    a.forEach(function (item, i) {
      var keys = Object.keys(item);

      if (b[i] === undefined) {
        b[i] = {};
        keys.forEach(function (key) {
          b[i][key] = 0;
        });
      }
    });
    return a;
  } else {
    b.forEach(function (item, i) {
      var keys = Object.keys(item);

      if (a[i] === undefined) {
        a[i] = {};
        keys.forEach(function (key) {
          a[i][key] = 0;
        });
      }
    });
    return b;
  }
}

function downloadFile(url) {
  try {
    var elemIF = document.createElement('iframe');
    elemIF.src = url;
    elemIF.style.display = 'none';
    document.body.appendChild(elemIF);
  } catch (e) {
    window.$console && window.$console.error('downloadFile', e);
  }
}

function findAllParents(routes, name) {
  var len = routes.length;

  for (var i = 0; i < len; i++) {
    var tmp = _objectSpread({}, routes[i]);

    if (tmp.name === name) {
      return [tmp.name];
    }

    if (tmp.children) {
      var result = findAllParents(tmp.children, name);

      if (result !== undefined) {
        return [tmp.name].concat(result);
      }
    }
  }
}

function findAllParentsData(routes, name) {
  var len = routes.length;

  for (var i = 0; i < len; i++) {
    var meta = routes[i].meta || {};

    var tmp = _objectSpread({}, routes[i], meta);

    if (tmp.name === name) {
      delete tmp.components;
      return [tmp];
    }

    if (tmp.children) {
      var result = findAllParentsData(tmp.children, name);

      if (result !== undefined) {
        return [tmp].concat(result);
      }
    }
  }
}

function deepClone(obj) {
  // 判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
  var objClone = Array.isArray(obj) ? [] : {}; // 进行深拷贝的不能为空，并且是对象或者是

  if (obj && _typeof(obj) === 'object') {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && _typeof(obj[key]) === 'object') {
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


function param2Obj(url) {
  var search = url.split('?')[1];

  if (!search) {
    return {};
  }

  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') + '"}');
}

function sleep(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;

  while (true) {
    now = new Date();

    if (now.getTime() > exitTime) {
      return;
    }
  }
}