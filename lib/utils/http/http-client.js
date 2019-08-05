"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _request = _interopRequireDefault(require("./request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HttpCodes = {
  OK: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404
};
var codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  408: '请求超时。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  501: '服务未实现',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  505: 'HTTP版本不受支持。'
};

function checkStatus(response) {
  var description = codeMessage[response.status] || response.statusText;
  return {
    message: "\u8BF7\u6C42\u9519\u8BEF ".concat(response.status, ": ").concat(response.config.url || null),
    description: description,
    status: response.status,
    code: -1
  };
}

var HttpGetMethod = ['GET', 'HEAD'];
var HttpClient = {
  install: function install(Vue, options) {
    var opt = _objectSpread({}, {
      // 所有接口前缀
      baseUrl: process.env.VUE_APP_BASE_API || '',
      // 所有接口超时时间
      timeout: 30000,
      // 全局接口请求前的钩子
      transformRequest: function transformRequest(_ref) {
        var api = _ref.api,
            data = _ref.data;
      },
      // 全局接口请求后的钩子
      transformResponse: function transformResponse(_ref2) {
        var api = _ref2.api,
            response = _ref2.response;
        return response;
      },
      // 全局接口请求数据成功条件
      getResponseSuccess: function getResponseSuccess(response) {
        if (response.code === 0) {
          return true;
        }

        return false;
      },
      // 全局接口请求错误的钩子
      handleError: function handleError(_ref3) {
        var response = _ref3.response,
            url = _ref3.url,
            meta = _ref3.meta;

        if (meta && meta.isShowError) {
          opt.Message && opt.Message({
            message: response.message,
            type: 'error',
            duration: 5 * 1000
          });
        }
      },
      // 全局接口请求成功的钩子
      handleSuccess: function handleSuccess(_ref4) {
        var response = _ref4.response,
            meta = _ref4.meta;

        if (meta && meta.isShowSuccess) {
          opt.Message && opt.Message({
            type: 'success',
            message: meta.message || '操作成功!'
          });
        }
      }
    }, options);

    var request = new _request.default({
      withCredentials: opt.withCredentials || false,
      timeout: opt.timeout || 15000,
      baseUrl: opt.baseUrl,
      headers: opt.headers || {
        'Content-Type': 'application/json'
      },
      getClientId: function getClientId() {
        return opt.getClientId && opt.getClientId();
      },
      getAccessToken: function getAccessToken() {
        return opt.getAccessToken && opt.getAccessToken();
      },
      successHandler: function successHandler(response) {
        if (response.config.responseType === 'blob') {
          return Promise.resolve(response);
        } // 数据结果根据`content-type`来操作json数据以及文件流


        if (response.config.responseType === 'arraybuffer') {
          var headers = response.headers || {};
          var contentType = headers['content-type'] || '';
          var isJSON = contentType.indexOf('application/json') > -1;

          if (isJSON) {
            try {
              var result = JSON.parse(Buffer.from(response.data).toString('utf8'));

              if (opt.getResponseSuccess(result)) {
                return Promise.resolve(result);
              } else {
                result.code = -1;
                result.message = result.msg || result.message;
                return Promise.reject(result);
              }
            } catch (e) {
              return Promise.reject(e);
            }
          } else {
            return Promise.resolve(response);
          }
        }

        if (opt.getResponseSuccess(response.data)) {
          return Promise.resolve(response.data);
        } else {
          return Promise.reject(response.data);
        }
      },
      errorHandler: function errorHandler(error) {
        var result = {};

        if (error && error.response) {
          result = checkStatus(error.response); // todo 未授权

          if (error.response.status === HttpCodes.UNAUTHORIZED) {
            if (!error.config.__retry) {
              error.config.__retry = true;
            }
          } // TODO 禁止访问或404


          if (error.response.status === HttpCodes.NOT_FOUND || error.response.status === HttpCodes.FORBIDDEN) {} // TODO 错误信息


          if (error.response.data) {
            var data = error.response.data;

            if (data.message) {
              opt.Message && opt.Message.warning(data.message);
            } else if (Array.isArray(data)) {
              data.forEach(function (item) {
                opt.Message && opt.Message.warning(item.message);
              });
            } else if (data instanceof Blob) {
              var blb = new Blob([data]);
              var reader = new FileReader();

              reader.onloadend = function (e) {
                var result = JSON.parse(e.srcElement.result);
                opt.Message && opt.Message.error(result.message);
              };

              reader.readAsText(blb);
            }
          }
        } else {
          result = {
            message: '网络走神了',
            status: -1,
            code: -1
          };
        }

        return Promise.reject(result);
      }
    });

    request.httpFactory = function (Urls) {
      var result = {};
      var httpClient = this;

      var render = function render(tpl, data) {
        return tpl.replace(/\{(.+?)\}/g, function (m, m1) {
          return data[m1];
        });
      };

      Urls.forEach(function (api) {
        var name = api.name;
        var path = api.path.indexOf('/') > 0 ? api.path.substring(1) : api.path;

        if (result[name]) {
          throw new Error("API\u63A5\u53E3".concat(name, " \u91CD\u540D\u4E86\uFF0C\u8BF7\u68C0\u67E5\u63A5\u53E3name \uFF01"));
        }

        api.processData = api.processData || function (data) {
          return data;
        };

        api.success = api.success || function (res) {
          return res;
        };

        result[name] = function (data, meta) {
          var _data = api.processData(data);

          var method = api.method || 'post';
          var endpoint = render(path, data);
          opt.transformRequest && opt.transformRequest(_objectSpread({}, api, {
            data: data
          }));
          return new Promise(function (resolve, reject) {
            httpClient[method](endpoint, _data).then(function (response) {
              opt.transformResponse(_objectSpread({
                response: response
              }, api));

              try {
                var _result = api.success(response, meta);

                opt.handleSuccess(_objectSpread({
                  response: response,
                  meta: meta
                }, api));
                resolve(_result);
              } catch (err) {
                opt.handleError(_objectSpread({
                  response: err,
                  meta: meta
                }, api));
                reject(err);
              }
            }, function (response) {
              opt.transformResponse(_objectSpread({
                response: response
              }, api));
              opt.handleError(_objectSpread({
                response: response,
                meta: meta
              }, api));
              reject(response);
            }).catch(function (err) {
              console.error('httpClient err', err);
            });
          });
        };
      });
      return result;
    };

    Vue.http = request;
    Vue.prototype.$http = request;
  }
};
var _default = HttpClient;
exports.default = _default;