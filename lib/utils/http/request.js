"use strict";

var _interopRequireDefault = require("/Users/damon/Documents/webapp/crm/sharegoods-ui/node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.replace");

var _objectSpread2 = _interopRequireDefault(require("/Users/damon/Documents/webapp/crm/sharegoods-ui/node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("/Users/damon/Documents/webapp/crm/sharegoods-ui/node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/damon/Documents/webapp/crm/sharegoods-ui/node_modules/@babel/runtime-corejs2/helpers/esm/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

// import axiosRetry from 'axios-retry'
var Request =
/*#__PURE__*/
function () {
  function Request(options) {
    (0, _classCallCheck2.default)(this, Request);
    var opt = (0, _objectSpread2.default)({}, {
      baseUrl: '',
      timeout: 10000,
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
      }

      return config;
    }, undefined);
    httpClient.interceptors.response.use(function (response) {
      return opt.successHandler(response);
    }, function (error) {
      return opt.errorHandler(error);
    });
    this.httpClient = httpClient;
  }

  (0, _createClass2.default)(Request, [{
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
        responseType: 'blob'
      };

      if (params) {
        config.params = params;
      }

      if (data) {
        config.data = data;
      }

      return this.httpClient.request(config).then(function (response) {
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
          return true;
        } else {
          return false;
        }
      });
    }
  }]);
  return Request;
}();

var _default = Request;
exports.default = _default;