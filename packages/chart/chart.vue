<template>
    <div ref="chart" :style="style"></div>
</template>
<script>
    import echarts from 'echarts';
    import { addResizeListener, removeResizeListener } from '../../src/utils/resize-event';

    const color = [
        '#26C0C0',
        '#F0805A',
        '#ADADAD',
        '#F4E001',
        '#C1232B',
        '#B5C334',
        '#FCCE10',
        '#E87C25',
        '#27727B',
        '#FE8463',
        '#9BCA63',
        '#FAD860',
        '#F3A43B',
        '#60C0DD',
        '#D7504B',
        '#C6E579'
    ];
    const defs = {
        'line': {
            legend: {
                data: [],
                top: '95%',
                textStyle: {
                    color: '#000',
                    fontWeight: '50'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' }
            },
            'backgroundColor': '#ffffff',
            textStyle: {
                color: '#000',
                fontWeight: '50'
            },
            'dataZoom': [{
                'show': true,
                'height': 30,
                'xAxisIndex': [
                    0
                ],
                bottom: 30,
                'start': 0, // 数据窗口范围的起始百分比,表示0%
                'end': 100, // 数据窗口范围的结束百分比,表示100%
                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                handleStyle: {
                    color: '#d3dee5'

                },
                textStyle: {
                    color: '#fff'
                },
                borderColor: '#90979c'
            }, {
                'type': 'inside',
                'show': true,
                'height': 15,
                'start': 1,
                'end': 35
            }]
        }
    };

    export default {
        name: 'SgChart',
        props: {
            width: {
                type: [String, Number],
                default: 0
            },
            height: {
                type: [String, Number],
                default: 500
            },
            type: {
                type: String,
                default: 'line'
            },
            auto: {
                type: Boolean,
                default: false
            },
            option: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        computed: {
            style() {
                const width = this.width || this.parentWidth || 800;
                const height = this.height;
                return `width:${width}px;height:${height}px;`;
            }
        },
        data() {
            return {
                config: defs[this.type] || {},
                timer: null,
                parentWidth: 0,
                chartData: {}
            };
        },
        methods: {
            init() {
                const $chart = this.$refs.chart;
                this.myChart = echarts.init($chart);
                this.auto && addResizeListener($chart.parentNode, this.handleResize);
            },
            // 在父节点宽度改变的时候重新渲染图表大小
            handleResize() {
                const $chart = this.$refs.chart;
                const parentWidth = $chart.parentNode.offsetWidth;
                const chartWidth = $chart.offsetWidth;
                if (!this.width && (chartWidth !== parentWidth && parentWidth > 0)) {
                    this.resizeChart();
                }
            },
            setSize() {
                const $chart = this.$refs.chart;
                const parentWidth = $chart.parentNode.offsetWidth;
                $chart.style.width = parentWidth + 'px';
            },
            resizeChart() {
                if(this.myChart) {
                    this.setSize();
                    this.myChart.resize();
                }
            },
            drawChart() {
                let options = Object.assign({}, this.config, this.option, { color });
                // 第二个参数notMerge 不许和上次的legend合并
                this.myChart.setOption(options, true);
            }
        },
        watch: {
            option: {
                handler(newVal, val) {
                    this.$nextTick(() => {
                        this.drawChart();
                    });
                },
                deep: true
            }
        },
        activated() {
            // 原因是组件keepAlive后切换到其他页面，resize生效后宽度获取不到 因此为0 导致切回来看不见图表
            // 重新计算宽度 防止缩放后图表过小过着过大
            this.resizeChart();
        },
        mounted() {
            this.parentWidth = this.$parent.$el.offsetWidth;
            this.$nextTick(() => {
                this.init();
                this.drawChart();
            });
        },
        beforeDestroy() {
            this.auto && removeResizeListener(this.$refs.chart.parentNode, this.handleResize);
        }
    };
</script>
