import HttpInterface from './http-interface';
import axios from 'axios';
import configureResponseError from './interceptors/response-error';
import configureTimeout from './interceptors/timeout';
import { qs } from '../util';

class HttpMiddleware extends HttpInterface {
    constructor(urls, options) {
        super(urls, options);
        const params = {
            // 定义请求文件类型
            headers: Object.assign({
                'Content-Type': 'application/json'
            }, options.headers || {}),
            timeout: options.timeout || 15000
        };

        const instance = axios.create(params);
        instance.interceptors.request.use(config => {
            return configureTimeout(config);
        }, err => {
            return Promise.reject(err);
        });
        instance.interceptors.response.use((response) => {
            const data = response.data || {};
            data.message = data.message || data.msg;
            return response;
        }, (error) => {
            return configureResponseError(error);
        });
        this.instance = instance;
        this.xhrQueue = {};
        this.Urls = urls;
        // 每次相同请求的间隔时间
        this.interval = options.interval || 30000;
    }

    init() {
        this.API = this.processAPI();
    }

    request(options) {
        const xhrQueue = this.xhrQueue;
        const { url, data, config } = options;
        const key = url + JSON.stringify(data || {});
        const success = (response) => {
            const queue = this.xhrQueue[key];
            delete this.xhrQueue[key];
            queue && queue.forEach(api => {
                api.handleSuccess(response);
            });
        };
        const error = (response) => {
            const queue = this.xhrQueue[key];
            delete this.xhrQueue[key];
            queue && queue.forEach(api => {
                api.handleError(response);
            });
        };
        options.requestTime = +new Date();
        if (xhrQueue[key]) {
            const queue = xhrQueue[key];
            const lastXhr = queue[queue.length - 1];
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

    get(url, params, config = {}) {
        const headers = this.getHeader();
        if (params) {
            if (url.indexOf('?') > -1) {
                url = url + '&' + qs.object2Query(params);
            } else {
                url = url + '?' + qs.object2Query(params);
            }
        }
        config.headers = Object.assign({}, headers, config.headers);
        return this.instance.get(url, config).then(res => res.data);
    }

    post(url, data = {}, config = {}) {
        const headers = this.getHeader();
        config.headers = Object.assign({}, headers, config.headers);
        return this.instance.post(url, data, config).then(res => res.data);
    }

    processAPI() {
        const result = {};
        const me = this;
        this.Urls.map((api) => {
            const name = api.name;
            const url = me.baseURL + api.path;
            const config = api.config;
            const method = api.method ? api.method.toLowerCase() : 'post';
            const processData = api.processData;
            if (result[name]) {
                throw new Error(`API接口${name} 重名了，请检查接口name ！`);
            }
            result[name] = (data, meta = {}) => {
                const $api = { ...api };
                $api.meta = meta;
                $api.url = url;
                $api.data = data;
                $api.label = ($api.label || '') + $api.url;
                // 全局控制请求发起
                me.transformRequest($api);
                return new Promise((resolve, reject) => {
                    // 自定义处理参数
                    if (processData) {
                        try {
                            data = processData(data);
                        } catch (e) {
                            // todo 是否需要终止下面的流程
                        }
                    }
                    $api.data = data;
                    me.request({
                        url,
                        method,
                        data,
                        config,
                        handleSuccess(response) {
                            // 全局控制请求结束
                            me.transformResponse({ ...$api, response });
                            // 业务处理成功
                            if (me.getResponseSuccess(response)) {
                                // 自定义处理成功结果
                                if ($api.success) {
                                    // 避免success的执行影响流程
                                    try {
                                        response = $api.success(response);
                                        // 全局处理成功结果
                                        me.handleSuccess && me.handleSuccess({ ...$api, response });
                                        resolve(response);
                                    } catch (response) {
                                        // 自定义处理失败结果
                                        $api.error && $api.error(response);
                                        // 全局处理失败结果
                                        me.handleError && me.handleError({ ...$api, response });
                                        reject(response);
                                    }
                                } else {
                                    me.handleSuccess && me.handleSuccess({ ...$api, response });
                                    resolve(response);
                                }
                            } else {
                                // 自定义处理失败结果
                                $api.error && $api.error(response);
                                // 全局处理失败结果
                                me.handleError && me.handleError({ ...$api, response });
                                reject(response);
                            }
                        },
                        handleError(response) {
                            // 全局控制请求结束
                            me.transformResponse({ ...$api, response });
                            // 自定义处理失败结果
                            $api.error && $api.error(response);
                            // 显示错误信息
                            me.handleError && me.handleError({ ...$api, response });
                            reject(response);
                        }
                    });
                });
            };
        });
        return result;
    }
}

export default HttpMiddleware;
