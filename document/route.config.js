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
        redirect: `/${lang}/component`
    },
    {
        path: `/${lang}/component`,
        redirect: `/${lang}/component/installation`,
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
                path: 'quick-start',
                meta: {
                    title: 'quick-start',
                    description: 'quick-start',
                    lang
                },
                name: 'component-quick-start',
                component: resolve => require(['./docs/zh-CN/quick-start.md'], resolve)
            },
            {
                path: 'vue-admin',
                meta: {
                    title: 'vue-admin',
                    description: 'vue-admin',
                    lang
                },
                name: 'component-vue-admin',
                component: resolve => require(['./docs/share/vue-admin.md'], resolve)
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
                path: 'text-input',
                meta: {
                    title: 'text-input',
                    description: 'text-input',
                    lang
                },
                name: 'component-text-input',
                component: resolve => require(['./docs/zh-CN/text-input.md'], resolve)
            },
            {
                path: 'select-list',
                meta: {
                    title: 'select-list',
                    description: 'select-list',
                    lang
                },
                name: 'component-select-list',
                component: resolve => require(['./docs/zh-CN/select-list.md'], resolve)
            },
            {
                path: 'checkbox',
                meta: {
                    title: 'checkbox',
                    description: 'checkbox',
                    lang
                },
                name: 'component-checkbox',
                component: resolve => require(['./docs/zh-CN/checkbox.md'], resolve)
            },
            {
                path: 'auto-complete',
                meta: {
                    title: 'auto-complete',
                    description: 'auto-complete',
                    lang
                },
                name: 'component-auto-complete',
                component: resolve => require(['./docs/zh-CN/auto-complete.md'], resolve)
            },
            {
                path: 'time-selector',
                meta: {
                    title: 'time-selector',
                    description: 'time-selector',
                    lang
                },
                name: 'component-time-selector',
                component: resolve => require(['./docs/zh-CN/time-selector.md'], resolve)
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
            },
            // share
            {
                path: 'git',
                meta: {
                    title: 'git',
                    description: 'git',
                    lang
                },
                name: 'share-git',
                component: resolve => require(['./docs/share/todo.md'], resolve)
            },
            {
                path: 'npm',
                meta: {
                    title: 'npm',
                    description: 'npm',
                    lang
                },
                name: 'component-npm',
                component: resolve => require(['./docs/share/npm.md'], resolve)
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
