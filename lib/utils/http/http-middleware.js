"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpInterface = _interopRequireDefault(require("./http-interface"));

var _axios = _interopRequireDefault(require("axios"));

var _responseError = _interopRequireDefault(require("./interceptors/response-error"));

var _timeout = _interopRequireDefault(require("./interceptors/timeout"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HttpMiddleware =
/*#__PURE__*/
function (_HttpInterface) {
  _inherits(HttpMiddleware, _HttpInterface);

  function HttpMiddleware(urls, options) {
    var _this;

    _classCallCheck(this, HttpMiddleware);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HttpMiddleware).call(this, urls, options));
    var params = {
      // 定义请求文件类型
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, options.headers || {}),
      timeout: options.timeout || 15000
    };

    var instance = _axios.default.create(params);

    instance.interceptors.request.use(function (config) {
      return (0, _timeout.default)(config);
    }, function (err) {
      return Promise.reject(err);
    });
    instance.interceptors.response.use(function (response) {
      var data = response.data || {};
      data.message = data.message || data.msg;
      return response;
    }, function (error) {
      return (0, _responseError.default)(error);
    });
    _this.instance = instance;
    _this.xhrQueue = {};
    _this.Urls = urls; // 每次相同请求的间隔时间

    _this.interval = options.interval || 30000;
    return _this;
  }

  _createClass(HttpMiddleware, [{
    key: "init",
    value: function init() {
      this.API = this.processAPI();
    }
  }, {
    key: "request",
    value: function request(options) {
      var _this2 = this;

      var xhrQueue = this.xhrQueue;
      var url = options.url,
          data = options.data,
          config = options.config;
      var key = url + JSON.stringify(data || {});

      var success = function success(response) {
        var queue = _this2.xhrQueue[key];
        delete _this2.xhrQueue[key];
        queue && queue.forEach(function (api) {
          api.handleSuccess(response);
        });
      };

      var error = function error(response) {
        var queue = _this2.xhrQueue[key];
        delete _this2.xhrQueue[key];
        queue && queue.forEach(function (api) {
          api.handleError(response);
        });
      };

      options.requestTime = +new Date();

      if (xhrQueue[key]) {
        var queue = xhrQueue[key];
        var lastXhr = queue[queue.length - 1];
        queue.push(options);

        if (options.requestTime - lastXhr.requestTime < this.interval) {
          return false;
        }
      } else {
        xhrQueue[key] = [options];
      }

      if (options.method === 'get') {
        this.get(url, data, config).then(success).catch(error);
      } else {
        this.post(url, data, config).then(success).catch(error);
      }
    }
  }, {
    key: "get",
    value: function get(url, params) {
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var headers = this.getHeader();

      if (params) {
        if (url.indexOf('?') > -1) {
          url = url + '&' + _util.qs.object2Query(params);
        } else {
          url = url + '?' + _util.qs.object2Query(params);
        }
      }

      config.headers = Object.assign({}, headers, config.headers);
      return this.instance.get(url, config).then(function (res) {
        return res.data;
      });
    }
  }, {
    key: "post",
    value: function post(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var headers = this.getHeader();
      config.headers = Object.assign({}, headers, config.headers);
      return this.instance.post(url, data, config).then(function (res) {
        return res.data;
      });
    }
  }, {
    key: "processAPI",
    value: function processAPI() {
      var result = {};
      var me = this;
      this.Urls.map(function (api) {
        var name = api.name;
        var url = me.baseURL + api.path;
        var config = api.config;
        var method = api.method ? api.method.toLowerCase() : 'post';
        var processData = api.processData;

        if (result[name]) {
          throw new Error("API\u63A5\u53E3".concat(name, " \u91CD\u540D\u4E86\uFF0C\u8BF7\u68C0\u67E5\u63A5\u53E3name \uFF01"));
        }

        result[name] = function (data) {
          var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          var $api = _objectSpread({}, api);

          $api.meta = meta;
          $api.url = url;
          $api.data = data;
          $api.label = ($api.label || '') + $api.url; // 全局控制请求发起

          me.transformRequest($api);
          return new Promise(function (resolve, reject) {
            // 自定义处理参数
            if (processData) {
              try {
                data = processData(data);
              } catch (e) {// todo 是否需要终止下面的流程
              }
            }

            $api.data = data;
            me.request({
              url: url,
              method: method,
              data: data,
              config: config,
              handleSuccess: function handleSuccess(response) {
                // 全局控制请求结束
                me.transformResponse(_objectSpread({}, $api, {
                  response: response
                })); // 业务处理成功

                if (me.getResponseSuccess(response)) {
                  // 自定义处理成功结果
                  if ($api.success) {
                    // 避免success的执行影响流程
                    try {
                      response = $api.success(response); // 全局处理成功结果

                      me.handleSuccess && me.handleSuccess(_objectSpread({}, $api, {
                        response: response
                      }));
                      resolve(response);
                    } catch (response) {
                      // 自定义处理失败结果
                      $api.error && $api.error(response); // 全局处理失败结果

                      me.handleError && me.handleError(_objectSpread({}, $api, {
                        response: response
                      }));
                      reject(response);
                    }
                  } else {
                    me.handleSuccess && me.handleSuccess(_objectSpread({}, $api, {
                      response: response
                    }));
                    resolve(response);
                  }
                } else {
                  // 自定义处理失败结果
                  $api.error && $api.error(response); // 全局处理失败结果

                  me.handleError && me.handleError(_objectSpread({}, $api, {
                    response: response
                  }));
                  reject(response);
                }
              },
              handleError: function handleError(response) {
                // 全局控制请求结束
                me.transformResponse(_objectSpread({}, $api, {
                  response: response
                })); // 自定义处理失败结果

                $api.error && $api.error(response); // 显示错误信息

                me.handleError && me.handleError(_objectSpread({}, $api, {
                  response: response
                }));
                reject(response);
              }
            });
          });
        };
      });
      return result;
    }
  }]);

  return HttpMiddleware;
}(_httpInterface.default);

var _default = HttpMiddleware;
exports.default = _default;