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
`/src/views/capital/router/permission/account.js`

### API配置
`/src/views/capital/api/modules`

快速配置接口
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
    }]
```
:::tip
接口`name`必须唯一
:::

使用
```javascript
this.$api.platformAccount({},{isShowError:true}).then(res=>{console.log('success')})
```



