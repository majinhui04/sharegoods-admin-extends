"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

var _timeout = _interopRequireDefault(require("./interceptors/timeout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import axiosRetry from 'axios-retry'
var Request =
/*#__PURE__*/
function () {
  function Request(options) {
    _classCallCheck(this, Request);

    var opt = _objectSpread({}, {
      baseUrl: '',
      timeout: 15000,
      // 默认15s
      withCredentials: false,
      getClientId: function getClientId() {
        return null;
      },
      getAccessToken: function getAccessToken() {
        return null;
      },
      successHandler: function successHandler(response) {
        return Promise.resolve(response);
      },
      errorHandler: function errorHandler(error) {
        return Promise.reject(error);
      }
    }, options);

    var httpClient = _axios.default.create({
      baseURL: opt.baseUrl,
      timeout: opt.timeout,
      withCredentials: opt.withCredentials,
      // 参数序列化
      paramsSerializer: function paramsSerializer(params) {
        return _qs.default.stringify(params, {
          arrayFormat: 'repeat'
        });
      }
    }); // axiosRetry(httpClient, {
    //     retries: 3,
    //     retryDelay: () => {
    //         return 1000
    //     }
    // })


    httpClient.interceptors.request.use(function (config) {
      var clientId = opt.getClientId();

      if (clientId) {
        config.headers = Object.assign(config.headers, clientId);
      }

      var accessToken = opt.getAccessToken();

      if (accessToken) {
        config.headers = Object.assign(config.headers, accessToken);
      } // 参数中$timeout控制自定义超时时间


      if (config.data && config.data.$timeout) {
        config.timeout = config.data.$timeout;
      }

      if (config.params && config.params.$timeout) {
        config.timeout = config.params.$timeout;
      }

      return (0, _timeout.default)(config);
    }, undefined);
    httpClient.interceptors.response.use(function (response) {
      return opt.successHandler(response);
    }, function (error) {
      return opt.errorHandler(error);
    });
    this.httpClient = httpClient;
  }

  _createClass(Request, [{
    key: "request",
    value: function request(method, url) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var config = {
        url: url,
        method: method
      };

      if (params) {
        config.params = params;
      }

      if (data) {
        config.data = data;
      }

      return this.httpClient.request(config);
    }
  }, {
    key: "get",
    value: function get(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return this.request('GET', url, params);
    }
  }, {
    key: "head",
    value: function head(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return this.request('HEAD', url, params);
    }
  }, {
    key: "post",
    value: function post(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this.request('POST', url, params, data);
    }
  }, {
    key: "put",
    value: function put(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this.request('PUT', url, params, data);
    }
  }, {
    key: "path",
    value: function path(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this.request('PATH', url, params, data);
    }
  }, {
    key: "patch",
    value: function patch(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return this.request('PATCH', url, params, data);
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this.request('DELETE', url, params);
    }
  }, {
    key: "download",
    value: function download(method, url) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var config = {
        url: url,
        method: method,
        timeout: 20000,
        responseType: 'arraybuffer' // blob

      };

      if (params) {
        config.params = params;
      }

      if (data) {
        config.data = data;
      }

      return this.httpClient.request(config).then(function (response) {
        if (response.headers) {
          var filename = response.headers['x-suggested-filename'];

          if (!filename) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(response.headers['content-disposition']);

            if (matches != null && matches[1]) {
              filename = matches[1].replace(/['"]/g, '');
            }
          }

          if (filename) {
            var _url = window.URL.createObjectURL(new Blob([response.data]));

            var link = document.createElement('a');
            link.href = _url;
            link.setAttribute('download', decodeURIComponent(filename));
            link.click();
            window.URL.revokeObjectURL(_url);
            return {
              code: 0
            };
          } else {
            return {
              code: -1,
              message: '下载文件失败'
            };
          }
        } else {
          return response;
        }
      });
    }
  }]);

  return Request;
}();

var _default = Request;
exports.default = _default;