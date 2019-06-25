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

export default function configureResponseError(error) {
    let result = {};
    // 这里是返回状态码不为200时候的错误处理
    if (error && error.response) {
        result = checkStatus(error.response);
    } else {
        result = {
            message: '网络走神了',
            status: -1,
            code: -1
        };
    }
    return Promise.reject(result);
}
