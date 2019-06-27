import DownloadButton from './index.vue';

/* istanbul ignore next */
DownloadButton.install = function(Vue) {
    Vue.component(DownloadButton.name, DownloadButton);
};

export default DownloadButton;
