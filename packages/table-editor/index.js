import SgTableEditor from './table';

/* istanbul ignore next */
SgTableEditor.install = function(Vue) {
    Vue.component(SgTableEditor.name, SgTableEditor);
};

export default SgTableEditor;
