import TableFilter from '../packages/table-filter/index.js';
import TableView from '../packages/table-view/index.js';
import TableEditor from '../packages/table-editor/index.js';
import Loading from '../packages/loading/index.js';
import ExportButton from '../packages/export-button/index.js';
import DownloadButton from '../packages/download-button/index.js';
import Chart from '../packages/chart/index.js';

const components = [
    Chart,
    DownloadButton,
    ExportButton,
    TableFilter,
    TableView,
    Loading,
    TableEditor
];

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
export default {
    version: process.env.Version,
    install
};
