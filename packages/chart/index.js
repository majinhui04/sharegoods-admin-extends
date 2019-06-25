import SgChart from './chart.vue';

/* istanbul ignore next */
SgChart.install = function(Vue) {
    Vue.component(SgChart.name, SgChart);
};

export default SgChart;
