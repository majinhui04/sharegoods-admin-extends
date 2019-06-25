import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import hljs from 'highlight.js';
import routes from './route.config';
import demoBlock from './components/demo-block';
import MainFooter from './components/footer';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
import SharegoodsUI from '../dist/index.umd';
import moment from 'moment';

console.log(123, SharegoodsUI.version);

import './assets/styles/common.scss';
import icon from './icon.json';
import { API } from './api';
import { mockXHR } from '../mock';
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

if (process.env.NODE_ENV === 'production') {
    mockXHR();
}

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

Vue.filter('formatDate', function (value) {
    return moment(value).format('YYYY-MM-DD hh:mm:ss');
});

Vue.use(SharegoodsUI);
Vue.prototype.$api = API;

const globalEle = new Vue({
    data: { $isEle: false } // 是否 ele 用户
});

Vue.mixin({
    computed: {
        $isEle: {
            get: () => (globalEle.$data.$isEle),
            set: (data) => {
                globalEle.$data.$isEle = data;
            }
        }
    }
});

Vue.prototype.$icon = icon; // Icon 列表页用

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes
});

router.afterEach(route => {
    // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
    Vue.nextTick(() => {
        const blocks = document.querySelectorAll('pre code:not(.hljs)');
        Array.prototype.forEach.call(blocks, hljs.highlightBlock);
    });
});

new Vue({
    ...entry,
    router
}).$mount('#app');
