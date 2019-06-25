export default [
    {
        name: 'userLogin',
        label: '用户登录',
        path: '/user/login',
        method: 'post',
        processData(data) {
            if (data) {
                data.account = data.loginName;
            }
            return data;
        },
        success(res) {
            const data = res.data || {};
            data.nickName = data.nickName || data.account;
            return res;
        }
    },
    {
        name: 'userOwnDetail1',
        label: '查询当前用户的详情接口',
        path: '/user/ownDetails',
        method: 'post'
    }
];
