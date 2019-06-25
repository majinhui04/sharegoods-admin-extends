import Component from './index.vue';
import Vue from 'vue';

const MyConstructor = Vue.extend(Component)

const Loading = (properties) => {
    const _props = properties || {};

    const Instance = new Vue({
        render (h) {
            return h(MyConstructor, {
                props: _props
            });
        }
    });

    const component = Instance.$mount();

    document.body.appendChild(component.$el);

    return Instance.$children[0];
};

export default Loading;
