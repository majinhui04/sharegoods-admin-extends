import axios from 'axios';
import qs from 'qs';
import configureTimeout from './interceptors/timeout';

// import axiosRetry from 'axios-retry'

class Request {
    constructor(options) {
        const opt = {
            ...{
                baseUrl: '',
                timeout: 15000, // 默认15s
                withCredentials: false,
                getClientId: () => {
                    return null;
                },
                getAccessToken: () => {
                    return null;
                },
                successHandler: (response) => Promise.resolve(response),
                errorHandler: (error) => Promise.reject(error)
            },
            ...options
        };

        const httpClient = axios.create({
            baseURL: opt.baseUrl,
            timeout: opt.timeout,
            withCredentials: opt.withCredentials,
            // 参数序列化
            paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        });

        // axiosRetry(httpClient, {
        //     retries: 3,
        //     retryDelay: () => {
        //         return 1000
        //     }
        // })

        httpClient.interceptors.request.use((config) => {
            const clientId = opt.getClientId();
            if (clientId) {
                config.headers = Object.assign(config.headers, clientId);
            }

            const accessToken = opt.getAccessToken();

            if (accessToken) {
                config.headers = Object.assign(config.headers, accessToken);
            }
            // 参数中$timeout控制自定义超时时间
            if (config.data && config.data.$timeout) {
                config.timeout = config.data.$timeout;
            }
            if (config.params && config.params.$timeout) {
                config.timeout = config.params.$timeout;
            }

            return configureTimeout(config);
        }, undefined);

        httpClient.interceptors.response.use((response) => {
            return opt.successHandler(response);
        }, (error) => opt.errorHandler(error));

        this.httpClient = httpClient;
    }

    request(method, url, params = null, data = null) {
        const config = {
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

    get(url, params = []) {
        return this.request('GET', url, params);
    }

    head(url, params = []) {
        return this.request('HEAD', url, params);
    }

    post(url, data = null, params = null) {
        return this.request('POST', url, params, data);
    }

    put(url, data = null, params = null) {
        return this.request('PUT', url, params, data);
    }

    path(url, data = null, params = null) {
        return this.request('PATH', url, params, data);
    }

    patch(url, data = null, params = null) {
        return this.request('PATCH', url, params, data);
    }

    delete(url, params = null) {
        return this.request('DELETE', url, params);
    }

    download(method, url, params = null, data = null) {
        const config = {
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

        return this.httpClient.request(config).then(response => {
            if(response.headers) {
                let filename = response.headers['x-suggested-filename'];

                if (!filename) {
                    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = filenameRegex.exec(response.headers['content-disposition']);
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, '');
                    }
                }

                if (filename) {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', decodeURIComponent(filename));
                    link.click();
                    window.URL.revokeObjectURL(url);

                    return { code: 0 };
                } else {
                    return { code: -1, message: '下载文件失败' };
                }
            } else {
                return response;
            }
        });
    }
}

export default Request;
