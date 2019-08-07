import Mock from 'mockjs';
import { sleep } from './util';

const List = [];
const count = 100;

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3';

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        timestamp: +Mock.Random.date('T'),
        author: '@first',
        reviewer: '@first',
        title: '@title(5, 10)',
        content_short: 'mock data',
        content: baseContent,
        forecast: '@float(0, 100, 2, 2)',
        importance: '@integer(1, 3)',
        'type|1': ['CN', 'US', 'JP', 'EU'],
        'status|1': ['published', 'draft', 'deleted'],
        display_time: '@datetime',
        comment_disabled: true,
        pageviews: '@integer(300, 5000)',
        image_uri,
        platforms: ['a-platform']
    }));
}

export default [
    {
        url: '/restaurant/list',
        type: 'get',
        response: config => {
            return {
                code: 10000,
                data: [
                    { name: '三全鲜食（北新泾店）', area: '长宁区新渔路144号' },
                    { name: 'Hot honey 首尔炸鸡（仙霞路）', area: '上海市长宁区淞虹路661号' },
                    { name: '新旺角茶餐厅', area: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
                    { name: '泷千家(天山西路店)', area: '天山西路438号' },
                    { name: '胖仙女纸杯蛋糕（上海凌空店）', area: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
                    { name: '贡茶', area: '上海市长宁区金钟路633号' },
                    { name: '豪大大香鸡排超级奶爸', area: '上海市嘉定区曹安公路曹安路1685号' },
                    { name: '茶芝兰（奶茶，手抓饼）', area: '上海市普陀区同普路1435号' },
                    { name: '十二泷町', area: '上海市北翟路1444弄81号B幢-107' },
                    { name: '星移浓缩咖啡', area: '上海市嘉定区新郁路817号' },
                    { name: '阿姨奶茶/豪大大', area: '嘉定区曹安路1611号' },
                    { name: '新麦甜四季甜品炸鸡', area: '嘉定区曹安公路2383弄55号' },
                    { name: 'Monica摩托主题咖啡店', area: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
                    { name: '浮生若茶（凌空soho店）', area: '上海长宁区金钟路968号9号楼地下一层' },
                    { name: 'NONO JUICE  鲜榨果汁', area: '上海市长宁区天山西路119号' },
                    { name: 'CoCo都可(北新泾店）', area: '上海市长宁区仙霞西路' },
                    { name: '快乐柠檬（神州智慧店）', area: '上海市长宁区天山西路567号1层R117号店铺' },
                    { name: 'Merci Paul cafe', area: '上海市普陀区光复西路丹巴路28弄6号楼819' },
                    { name: '猫山王（西郊百联店）', area: '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
                    { name: '枪会山', area: '上海市普陀区棕榈路' },
                    { name: '纵食', area: '元丰天山花园(东门) 双流路267号' },
                    { name: '钱记', area: '上海市长宁区天山西路' },
                    { name: '壹杯加', area: '上海市长宁区通协路' }
                ]
            }
        }
    },
    {
        url: '/article/list',
        type: 'post',
        response: config => {
            const { importance, type, title, page = 1, limit = 20, sort } = config.query;

            let mockList = List.filter(item => {
                if (importance && item.importance !== +importance) return false;
                if (type && item.type !== type) return false;
                if (title && item.title.indexOf(title) < 0) return false;
                return true;
            });

            if (sort === '-id') {
                mockList = mockList.reverse();
            }

            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
            // 模拟延时1s
            sleep(1 * 1000);
            return {
                code: 0,
                data: {
                    total: mockList.length,
                    items: pageList
                }
            };
        }
    },

    {
        url: '/article/detail',
        type: 'get',
        response: config => {
            const { id } = config.query;
            for (const article of List) {
                if (article.id === +id) {
                    return {
                        code: 0,
                        data: article
                    };
                }
            }
        }
    },

    {
        url: '/article/pv',
        type: 'get',
        response: _ => {
            return {
                code: 0,
                data: {
                    pvData: [
                        { key: 'PC', pv: 1024 },
                        { key: 'mobile', pv: 1024 },
                        { key: 'ios', pv: 1024 },
                        { key: 'android', pv: 1024 }
                    ]
                }
            };
        }
    },

    {
        url: '/article/create',
        type: 'post',
        response: _ => {
            return {
                code: 0,
                data: 'success'
            };
        }
    },

    {
        url: '/article/update',
        type: 'post',
        response: _ => {
            return {
                code: 0,
                data: 'success'
            };
        }
    },
    {
        url: '/article/status/list',
        type: 'get',
        response: _ => {
            return {
                code: 0,
                data: [
                    { label: '已发布', value: 'published' },
                    { label: '草稿', value: 'draft' },
                    { label: '已删除', value: 'deleted' }
                ]
            };
        }
    },
    {
        url: '/article/export',
        type: 'post',
        response: _ => {
            sleep(0.5 * 1000);
            return {
                code: 20,
                message: '好点不对啊',
                data: '/static/test.xlsx'
            };
        }
    }
];

