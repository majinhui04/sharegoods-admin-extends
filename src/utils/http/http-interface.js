class HttpInterface {
    constructor(urls, options) {
        this.Urls = urls;
        this.API = {};
        this.options = options || {};
        this.baseURL = options.baseURL || '';
        this.headers = options.headers || {};
        // 全局接口
        this.transformRequest = options.transformRequest || function () {
        };
        this.transformResponse = options.transformResponse || function () {
        };
        this.handleSuccess = options.handleSuccess;
        this.handleError = options.handleError;
        this.getResponseSuccess = options.getResponseSuccess || function () {
            return true;
        };
        this.init();
    }

    init() {
        throw new Error(`${this.constructor.name} 没有实现 init 方法！`);
    }

    setHeader(config) {
        Object.assign(this.headers, config);
    }

    getHeader() {
        return this.headers;
    }

    get() {
        throw new Error(`${this.constructor.name} 没有实现 get 方法！`);
    }

    post() {
        throw new Error(`${this.constructor.name} 没有实现 post 方法！`);
    }

    request() {
        throw new Error(`${this.constructor.name} 没有实现 request 方法！`);
    }
    processAPI () {
        return this.Urls;
    }
}

export default HttpInterface;
