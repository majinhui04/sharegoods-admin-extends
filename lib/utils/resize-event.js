"use strict";

var _interopRequireDefault = require("/Users/damon/Documents/webapp/crm/sharegoods-ui/node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeResizeListener = exports.addResizeListener = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var isServer = typeof window === 'undefined';
/* istanbul ignore next */

var resizeHandler = function resizeHandler(entries) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entry = _step.value;
      var listeners = entry.target.__resizeListeners__ || [];

      if (listeners.length) {
        listeners.forEach(function (fn) {
          fn();
        });
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};
/* istanbul ignore next */


var addResizeListener = function addResizeListener(element, fn) {
  if (isServer) return;

  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new _resizeObserverPolyfill.default(resizeHandler);

    element.__ro__.observe(element);
  }

  element.__resizeListeners__.push(fn);
};
/* istanbul ignore next */


exports.addResizeListener = addResizeListener;

var removeResizeListener = function removeResizeListener(element, fn) {
  if (!element || !element.__resizeListeners__) return;

  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);

  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
};

exports.removeResizeListener = removeResizeListener;