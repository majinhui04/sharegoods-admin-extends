import TableFilter from '../packages/table-filter/index.js';
import TableView from '../packages/table-view/index.js';
import Loading from '../packages/loading/index.js';
import ExportButton from '../packages/export-button/index.js';
import Pagination from '../packages/pagination/index.js';
import Chart from '../packages/chart/index.js';
import Upload from '../packages/upload/index.js';

import '../packages/styles/index.scss';

const components = [
    Chart,
    Pagination,
    ExportButton,
    TableFilter,
    TableView,
    Loading,
    Upload
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
