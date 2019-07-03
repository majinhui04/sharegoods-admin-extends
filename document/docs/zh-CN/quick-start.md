## 快速开发

### API Reference

接口定义

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 接口调用函数，全局必须唯一 | - | - | - |
| path | 实际接口调用地址，支持restful | - | - | - |
| method | 接口方式 | String | `get`、`post`、`delete`、`patch`、`put` |  |
| processData | 调用接口前处理数据 | - | - | - |
| success | 调用成功后处理数据 | - | - | - |


e.g
```javascript
export default [
    {
        name: 'articleList',
        path: '/article/list',
        method: 'post',
        processData(data){
            if(data.date) {
                data.startTime = date[0];
                data.endTime = date[1];
                delete data.date;
            }
            return data;
        },
        success(response){
            response.message = '获取文章成功';
            return response;
        }
    },
    {
        name: 'articleDetail',
        path: '/article/detail/{id}',
        method: 'get'
    },
    {
        name: 'articleUpdate',
        path: '/article/update',
        method: 'put'
    },
    {
        name: 'articleCreate',
        path: '/article/create',
        method: 'post'
    }
];

```

HttpClient 参数说明

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| timeout | 超时时间 | - | - | 15000 |
| Message | 消息提醒方法 | - | - | - |
| getResponseSuccess | 接口成功判断 | - | - | - |
| transformResponse | 所有接口的接口回调函数 | - | - | - |
| getAccessToken | 设置headers参数 | - | - | - |
| handleError | 所有接口的失败回调 | - | - | - |
| handleSuccess | 所有接口的成功回调 | - | - | - |

e.g
```javascript
import HttpClient from 'sharegoods-ui/lib/utils/http/http-client';
import Urls from './api.js';
import { Message } from 'element-ui';

Vue.use(HttpClient, {
    timeout:10000,
    Message,
    // 全局接口请求数据成功条件
    getResponseSuccess(response) {
        if ([10000].includes(response.code)) {
            return true;
        }
        return false;
    },
    transformResponse({ response, path }) {
        // 用户登录失效
        if ([10010].includes(response.code)) {
            store.dispatch('LogOut').then(() => {
                location.reload(true);
            });
        }
    },
    getAccessToken() {
        const token = getToken() || '';
        return { 'token': token };
    },
    // 全局接口请求错误的钩子
    handleError({ response, meta }) {
        if (meta && meta.isShowError) {
            Message({
                message: response.message,
                type: 'error',
                duration: 5 * 1000
            });
        }
    },
    // 全局接口请求成功的钩子
    handleSuccess({ response, meta }) {
        if (meta && meta.isShowSuccess) {
            Message({
                type: 'success',
                message: meta.message || '操作成功!'
            });
        }
    }
});

const http = Vue.http;
const API = http.httpFactory(Urls);

API.articleList({date:['2019-07-01','2019-07-02'],$timeout:5000},{isShowError:true}).then(res=>{
    console.log('response',res)
})

```
:::tip
如果参数中包含`$timeout`则表明这个接口使用自定义的超时时间
:::


### Route
路由文件配置在项目下的`route.config.js`进行配置

### Mock
在`mock`下建立数据和路径的关联,路径既是API中配置的`path`，文件名既API中配置的`name`(放在`mock`文件夹下)
