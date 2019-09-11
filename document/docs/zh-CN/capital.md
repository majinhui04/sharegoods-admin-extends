## 资金中心

技术栈：vue2 + vuex + vue-router + webpack + ES6 + axios + sass + Element UI + iconfont + ESlint

项目地址：[http://git.mr.com/frontend/web-admin-capital](http://git.mr.com/frontend/web-admin-capital)

### 初始化项目

```shell
# 下载项目
git clone http://git.mr.com/frontend/web-admin-capital.git
git cd web-admin-capital

# 新建分支
git checkout -b develop-v1-2-0-feature-demo origin/release

# 安装依赖 or mrnpm install 
npm install --registry=https://registry.npm.taobao.org
```

项目根目录新建文件`.env.local`，`VUE_APP_BASE_TARGET`对应联调地址，如果注释掉`VUE_APP_BASE_TARGET`则走本地mock数据
```javascript
VUE_APP_BASE_API = '/api'
VUE_APP_BASE_TARGET = 'http://127.0.0.1:8922/fund-manager'
```

```shell
# 启动项目
npm run dev
```

:::tip
访问地址： [http://localhost:9530](http://localhost:9530)
:::

### 路由配置
- 分为固定路由以及权限路由
- 固定路由包括`/login`、`/404`(/src/views/capital/router/constant-router.js)、`/403`
- 权限路由[`/src/views/capital/router/permission/account.js`],实际页面路由以资源页面路由为准

### API配置
`/src/views/capital/api/modules`
```javascript
{
    // name 必填
    name: 'userLevelListAll',
    // label 可选
    label: '用户等级',
    // path 必填
    path: '/data/userlevel',
    // method 可选 默认post
    method: 'get',
    // config 可选 接口自定义请求头以及配置
    config:{    
        timeout:10000,
        headers:{test:1}
    },
    // processData 可选 接口请求前处理参数
    processData(data) {
        if (data.category && !data.grade) {
            data.grade = 1;
        }
        return data;
    },
    // success 可选 接口成功后处理数据
    success(res) {
        const list = res.data || [];
        list.forEach(item => {
            item._uuid = item.level;
            item._label = item.remark;
        });
        return res;
    }
}
 
```
### 权限
- 在src下面的settings.js, 根据实际需求改变项目的权限, 设置isAuth
- 在具体页面中 使用 $hasAuth('xxxxxx') v-auth="'xxx'" 来判断是否按钮权限

### 快速配置接口
```javascript
export default [
    {
        name: 'platformAccount',
        label: '平台账户查询',
        path: '/platform/account',
        method: 'post'
    },
    {
        name: 'platformSubAccount',
        label: '平台子账户查询',
        path: '/platform/sub/account',
        method: 'post'
    }];
```
:::tip
接口`name`必须唯一
:::

使用
```javascript
this.$api.platformAccount({},{isShowError:true,$timeout:5000}).then(res=>{console.log('success')})
```
:::tip
如果参数中包含`$timeout`则表明这个接口使用自定义的超时时间
:::

### 组件
使用内部自定义的sharegoods-UI
具体可参考
[sharegoods-ui](http://static.mr.com/#/zh-CN/component/query)

### Mock
在`mock`下建立数据和路径的关联,路径既是API中配置的`path`，文件名既API中配置的`name`(放在`mock`文件夹下)


## 测试账号
[测试环境](http://testcapital.sharegoodsmall.com/#/login)
:::tip
liukang
lk123456 -管理员权限
:::





