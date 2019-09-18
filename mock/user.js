import Mock from 'mockjs';
import { sleep } from './util';

const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
};

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://www.gravatar.com/avatar/9e534860526289cf56ece3461ab3578c?s=46&d=identicon',
        name: 'Super Admin',
        nickName: 'Super Admin',
        permission: ['/dashboard/index', '/directive/table/index']
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://www.gravatar.com/avatar/9e534860526289cf56ece3461ab3578c?s=46&d=identicon',
        name: 'Normal Editor',
        nickName: 'Normal Editor',
        permission: ['/dashboard/index', '/color/index', 'dashboard.button1']
    }
};
const List = [];
const count = 50;

const baseContent = '<p>I am testing data, I am testing data.</p>';
const avatar = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3';

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        createTime: +Mock.Random.date('T'),
        updateTime: +Mock.Random.date('T'),
        nickName: Mock.Random.cname(),
        address: Mock.mock('@county(true)'),
        birthday: Mock.Random.date(),
        account: '@first',
        email: Mock.mock('@EMAIL()'), // 随机生成一个邮箱
        'moblie|1': ['13531544954', '13632250649', '15820292420', '15999905612'], // 在数组中随机找一个
        time: Mock.Random.date('yyyy-MM-dd'),
        note: baseContent,
        sex: Mock.Random.integer(1, 2), // 随机生成一个整数，1/2 ，根据这个来给“男” “女”
        'status|1': ['1', '2'],
        avatar
    }));
}
export default [
    {
        url: '/user/list',
        type: 'get',
        response: config => {
            const { page = 1, limit = 20 } = config.query;

            let mockList = List.filter(item => {
                return true;
            });

            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
            // 模拟延时1.5s
            sleep(1.5 * 1000);
            return {
                code: 0,
                data: {
                    total: mockList.length,
                    items: pageList
                }
            };
        }
    },
    // user login
    {
        url: '/user/login',
        type: 'post',
        response: config => {
            const {
                account
            } = config.body;
            const token = tokens[account];
            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: 'Account and password are incorrect'
                };
            }

            return {
                code: 0,
                data: {
                    token: +new Date(),
                    ...users[token.token]
                }
            };
        }
    },

    // get user info
    {
        url: '/user/info\.*',
        type: 'get',
        response: config => {
            const {
                token
            } = config.query;
            const info = users[token];

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: 'Login failed, unable to get user details.'
                };
            }

            return {
                code: 0,
                data: info
            };
        }
    },

    // user logout
    {
        url: '/user/logout',
        type: 'post',
        response: _ => {
            return {
                code: 0,
                data: 'success'
            };
        }
    },
    // user save
    {
        url: '/user/save',
        type: 'post',
        response: _ => {
            return {
                code: 0,
                data: 'success'
            };
        }
    },
    // user
    {
        url: '/user/ownDetails',
        type: 'post',
        response: _ => {
            return {
                code: 0,
                data: {
                    nickName: 'damon',
                    avatar: 'https://www.gravatar.com/avatar/9e534860526289cf56ece3461ab3578c?s=46&d=identicon'
                }
            };
        }
    }
];
