import CP from './index.vue';

/* istanbul ignore next */
CP.install = function(Vue) {
    Vue.component(CP.name, CP);
};

export default CP;
