<template>
    <div class="content">
        <div :style="'width: 100px;height: 30px;background-color:' + item " v-for="(item,i) in colors">{{item}}</div>
        <div class="filter-wrapper">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="支付订单折线图"></el-form-item>
                <el-form-item label="选择时间">
                    <el-date-picker
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        @change="handleDateChange">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <div class="chart-wrapper">
            <sg-chart :option="option"></sg-chart>
        </div>

    </div>
</template>
<script>
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const colors = [
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
        '#C6E579',
        '#F4E001',
        '#F0805A',
        '#26C0C0'
    ];
    export default {
        data() {
            return {
                formInline: {},
                value1: [new Date(), new Date()],
                option: {
                    colors,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'cross' }
                    },
                    legend: {
                        top: '95%',
                        left: 'center',
                        data: ['交易笔数', '交易额(万)']
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '交易笔数',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        {
                            type: 'value',
                            name: '交易额(万)',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '交易笔数',
                            type: 'line',
                            yAxisIndex: 0,
                            smooth: true,
                            markPoint: {
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            color: '#FFFFFF'// 气泡中字体颜色
                                        }
                                    }
                                },
                                symbol: 'pin',
                                data: [
                                    { type: 'max', name: '最大值' },
                                    { type: 'min', name: '最小值' }
                                ]
                            },
                            // itemStyle: { normal: { label: { show: false }, color: '#26C0C0' } },
                            data: []
                        },
                        {
                            name: '交易额(万)',
                            type: 'line',
                            yAxisIndex: 1,
                            smooth: true,
                            markPoint: {
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            color: '#FFFFFF'// 气泡中字体颜色
                                        }
                                    }
                                },
                                symbol: 'pin',
                                data: [
                                    { type: 'max', name: '最大值' },
                                    { type: 'min', name: '最小值' }
                                ]
                            },
                            // itemStyle: { normal: { label: { show: false }, color: '#FE8463' } },
                            data: []
                        }
                    ]
                }
            };
        },
        created() {
            this.handleData();
        },
        methods: {
            handleData() {
                const series = this.option.series;
                // 模拟异步请求数据
                setTimeout(() => {
                    series[0].data = (function () {
                        let result = [];
                        let i = 0;
                        while (result.length < 12) {
                            result[i] = rand(50, 100);
                            i++;
                        }
                        return result;
                    })();
                    series[1].data = (function () {
                        let result = [];
                        let i = 0;
                        while (result.length < 12) {
                            result[i] = rand(50000, 100000);
                            i++;
                        }
                        return result;
                    })();
                }, 1000);
            },
            handleDateChange(val) {
                console.log('这是时间', val);
                this.handleData();
            }
        }
    };
</script>
