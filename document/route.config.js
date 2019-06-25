let lang = 'zh-CN';
let route = [
    {
        path: '/template',
        meta: {
            title: 'template',
            description: 'template',
            lang
        },
        name: 'template',
        component: resolve => require(['./pages/zh-CN/template.vue'], resolve)
    },
    {
        path: '/zh-CN',
        redirect: `/${ lang }/component`
    },
    {
        path: `/${ lang }/component`,
        redirect: `/${ lang }/component/installation`,
        component: resolve => require(['./pages/zh-CN/component.vue'], resolve),
        children: [
            {
                path: 'installation',
                meta: {
                    title: 'installation',
                    description: 'installation',
                    lang
                },
                name: 'component-installation',
                component: resolve => require(['./docs/zh-CN/installation.md'], resolve)
            },
            {
                path: 'capital',
                meta: {
                    title: 'capital',
                    description: 'capital',
                    lang
                },
                name: 'component-capital',
                component: resolve => require(['./docs/zh-CN/capital.md'], resolve)
            },
            {
                path: 'query',
                meta: {
                    title: 'query',
                    description: 'query',
                    lang
                },
                name: 'component-query',
                component: resolve => require(['./docs/zh-CN/query.md'], resolve)
            },
            {
                path: 'export-button',
                meta: {
                    title: 'export-button',
                    description: 'export-button',
                    lang
                },
                name: 'component-export-button',
                component: resolve => require(['./docs/zh-CN/export-button.md'], resolve)
            },
            {
                path: 'chart',
                meta: {
                    title: 'chart',
                    description: 'chart',
                    lang
                },
                name: 'component-chart',
                component: resolve => require(['./docs/zh-CN/chart.md'], resolve)
            },
            {
                path: 'layout',
                meta: {
                    title: 'layout',
                    description: 'layout',
                    lang
                },
                name: 'component-layout',
                component: resolve => require(['./docs/zh-CN/layout.md'], resolve)
            }
        ]
    }
];

let defaultPath = '/zh-CN';
route = route.concat([{
    path: '/',
    redirect: defaultPath
}]);

export default route;
