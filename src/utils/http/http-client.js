import Request from './request';

const HttpCodes = {
    OK: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404
};

const codeMessage = {
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
    const description = codeMessage[response.status] || response.statusText;
    return {
        message: `请求错误 ${response.status}: ${response.config.url || null}`,
        description: description,
        status: response.status,
        code: -1
    };
}

const HttpGetMethod = ['GET', 'HEAD'];

const HttpClient = {
    install(Vue, options) {
        const opt = {
            ...{
                // 所有接口前缀
                baseUrl: process.env.VUE_APP_BASE_API || '',
                // 所有接口超时时间
                timeout: 30000,
                // 全局接口请求前的钩子
                transformRequest({ api, data }) {
                },
                // 全局接口请求后的钩子
                transformResponse({ api, response }) {
                    return response;
                },
                // 全局接口请求数据成功条件
                getResponseSuccess(response) {
                    if (response.code === 0) {
                        return true;
                    }
                    return false;
                },
                // 全局接口请求错误的钩子
                handleError({ response, url, meta }) {
                    if (meta && meta.isShowError) {
                        opt.Message && opt.Message({
                            message: response.message,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    }
                },
                // 全局接口请求成功的钩子
                handleSuccess({ response, meta }) {
                    if (meta && meta.isShowSuccess) {
                        opt.Message && opt.Message({
                            type: 'success',
                            message: meta.message || '操作成功!'
                        });
                    }
                }
            },
            ...options
        };
        const request = new Request({
            withCredentials: opt.withCredentials || false,
            timeout: opt.timeout || 15000,
            baseUrl: opt.baseUrl,
            headers: opt.headers || {
                'Content-Type': 'application/json'
            },
            getClientId: () => {
                return opt.getClientId && opt.getClientId();
            },
            getAccessToken: () => {
                return opt.getAccessToken && opt.getAccessToken();
            },
            successHandler: (response) => {
                if (response.config.responseType === 'blob') {
                    return Promise.resolve(response);
                }
                // 数据结果根据`content-type`来操作json数据以及文件流
                if (response.config.responseType === 'arraybuffer') {
                    const headers = response.headers || {};
                    const contentType = headers['content-type'] || '';
                    const isJSON = contentType.indexOf('application/json') > -1;
                    if (isJSON) {
                        try {
                            const result = JSON.parse(Buffer.from(response.data).toString('utf8'));
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
            errorHandler: (error) => {
                let result = {};
                if (error && error.response) {
                    result = checkStatus(error.response);
                    // todo 未授权
                    if (error.response.status === HttpCodes.UNAUTHORIZED) {
                        if (!error.config.__retry) {
                            error.config.__retry = true;
                        }
                    }
                    // TODO 禁止访问或404
                    if (error.response.status === HttpCodes.NOT_FOUND || error.response.status === HttpCodes.FORBIDDEN) {
                    }
                    // TODO 错误信息
                    if (error.response.data) {
                        const data = error.response.data;

                        if (data.message) {
                            opt.Message && opt.Message.warning(data.message);
                        } else if (Array.isArray(data)) {
                            data.forEach(function (item) {
                                opt.Message && opt.Message.warning(item.message);
                            });
                        } else if (data instanceof Blob) {
                            const blb = new Blob([data]);
                            const reader = new FileReader();
                            reader.onloadend = (e) => {
                                const result = JSON.parse(e.srcElement.result);
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
            const result = {};
            const httpClient = this;
            const render = function (tpl, data) {
                return tpl.replace(/\{(.+?)\}/g, function (m, m1) {
                    return data[m1];
                });
            };
            Urls.forEach(api => {
                const name = api.name;
                const path = api.path.indexOf('/') > 0 ? api.path.substring(1) : api.path;
                if (result[name]) {
                    throw new Error(`API接口${name} 重名了，请检查接口name ！`);
                }
                api.processData = api.processData || function (data) {
                    return data;
                };
                api.success = api.success || function (res) {
                    return res;
                };
                result[name] = (data, meta) => {
                    const _data = api.processData(data);
                    const method = api.method || 'post';
                    const endpoint = render(path, data);
                    opt.transformRequest && opt.transformRequest({ ...api, data });
                    return new Promise((resolve, reject) => {
                        httpClient[method](endpoint, _data).then(response => {
                            opt.transformResponse({ response, ...api });
                            try {
                                const result = api.success(response, meta);
                                opt.handleSuccess({ response, meta, ...api });
                                resolve(result);
                            } catch (err) {
                                opt.handleError({ response: err, meta, ...api });
                                reject(err);
                            }
                        }, response => {
                            opt.transformResponse({ response, ...api });
                            opt.handleError({ response, meta, ...api });
                            reject(response);
                        }).catch(err => {
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

export default HttpClient;
