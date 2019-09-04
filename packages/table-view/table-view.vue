<template>
    <div class="sg-table-container" ref="wrap">
        <div class="sg-tools-slot">
            <slot name="table-tools">
            </slot>
        </div>
        <div class="sg-tools">
            <div class="sg-tools-content">
                <template v-for="(item,i) in tools">
                    <template v-if="item.type==='slot'">
                        <slot :name="item.name"></slot>
                    </template>
                    <template v-else>
                        <el-button :type="item.type ||
                        'primary'" :key="i"
                                   @click="item.onClick" v-if='!item.hidden'>{{item.label}}
                        </el-button>
                    </template>
                </template>
            </div>
            <pagination v-if="resizeTarget" v-show="total>0" :total="total" :page.sync="pagination.page" :limit.sync="pagination.pageSize"
                        @pagination="fetchList" :class="{'fixed':paginationFixed}" class="right sg-pagination"
                        :layout="pageConfig.layout"/>
        </div>
        <div class="sg-tabs-slot">
            <slot name="table-tabs"></slot>
        </div>
        <el-tabs @tab-click="handleTabClick" v-if="tabs" class="sg-tabs" v-model="activeName">
            <el-tab-pane :label="tab.label" :name="tab.name" v-for="(tab,index) in tabs" :key="index"></el-tab-pane>
        </el-tabs>
        <div class="sg-table-wrapper">
            <el-table class="sg-table dm-flexbox-1" v-loading="listLoading" :data="dataSource" border fit
                      highlight-current-row
                      style="width: 100%;" @selection-change="handleSelectionChange" :height="height" ref="table">
                <template v-for="(col,index) in columns">
                    <el-table-column v-if="col.type ==='selection'" :key="index" type="selection" :width="col.width"
                                     align="center" :selectable="handleSelectAble"></el-table-column>
                    <el-table-column v-else-if="col.type ==='index'" :key="index" type="index" :width="col.width"
                                     align="center" :label="col.label"></el-table-column>
                    <template v-else-if="col.type==='slot'">
                        <slot :name="col.name || col.prop"></slot>
                    </template>
                    <el-table-column v-else :label="col.label" :prop="col.prop" align="center" :key="index"
                                     :type="col.type"
                                     :width="col.width">
                        <template slot-scope="scope" v-if="col.prop">
                            <template v-if="col.customRender">
                                <div v-html="col.customRender(scope.row)"></div>
                            </template>
                            <template v-else-if="col.buttons">
                                <template v-for="(item,i) in col.buttons">
                                    <el-button :type="item.type || 'primary'" :key="i" @click="item.onClick(scope.row)"
                                               v-if="item.customRender?item.customRender(scope.row): true">
                                        {{item.customRender?item.customRender(scope.row):item.label}}
                                    </el-button>
                                </template>
                            </template>
                            <template v-else-if="col.prop">{{scope.row[col.prop]}}</template>
                            <template v-else></template>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
            <pagination v-if="!resizeTarget" v-show="total>0" :total="total" :page.sync="pagination.page" :limit.sync="pagination.pageSize"
                        @pagination="fetchList" :class="{'fixed':paginationFixed}" class="right sg-pagination"
                        :layout="pageConfig.layout"/>
        </div>

    </div>
</template>

<script>
    import { addResizeListener, removeResizeListener } from '../../src/utils/resize-event';
    import Pagination from '../pagination/index.vue';

    export default {
        name: 'SgTableView',
        components: { Pagination },
        props: {
            resizeTarget: {
                type: String,
                default: ''
            },
            resizeMinHeight: {
                type: Number,
                default: 100
            },
            resizeHandler: {
                type: Function,
                default() {
                    return 0;
                }
            },
            paginationFixed: {
                type: Boolean,
                default: false
            },
            pageConfig: {
                type: Object,
                default() {
                    return {
                        layout: 'total, sizes, prev, pager, next, jumper',
                        pageSize: 20
                    };
                }
            },
            auto: {
                type: Boolean,
                default: true
            },
            tools: {
                type: Array,
                default() {
                    return null;
                }
            },
            tabs: {
                type: Array,
                default() {
                    return null;
                }
            },
            config: {
                type: Object,
                default() {
                    return {};
                }
            },
            paramsFormatter: {
                type: Object,
                default() {
                    return {};
                }
            },
            responseFormatter: {
                type: Function,
                default(res) {
                    const body = res.data || {};
                    const list = body.data || body.items || [];
                    const total = body.totalNum || body.total || 0;
                    return {
                        list,
                        total
                    };
                }
            },
            handleSelectAble: {
                type: Function,
                default() {
                    return true;
                }
            }
        },
        data() {
            return {
                height: null,
                activeName: '',
                pagination: {
                    page: 1,
                    pageSize: this.pageConfig.pageSize || 20
                },
                total: 0,
                listLoading: false,
                dataSource: [],
                columns: this.config.columns || [],
                multipleSelection: []
            };
        },
        created() {
            if (this.tabs) {
                this.activeName = this.tabs[0].name;
            }
            this.auto && this.fetchList({
                page: 1
            });
        },
        destroyed() {
            if (this.resizeTarget) {
                let resizeTarget = this.resizeTarget;
                let dom = document.getElementById(resizeTarget);
                dom && removeResizeListener(dom, this.resize);
            }
        },
        mounted() {
            if (this.resizeTarget) {
                let resizeTarget = this.resizeTarget;
                let dom = document.getElementById(resizeTarget);
                dom && addResizeListener(dom, this.resize);
                this.$nextTick(() => {
                    this.resize();
                });
            }
        },
        methods: {
            resize() {
                let H = window.innerHeight;
                let table = this.$refs.table.$el;
                let tableRect = table.getBoundingClientRect();
                let top = tableRect.top;
                let pageHeight = 30;
                let resizeMinHeight = this.resizeMinHeight;
                let height = H - top - pageHeight;
                this.height = Math.max(resizeMinHeight, height);
            },
            paramsSerializer(params) {
                const result = {};
                const formatter = this.paramsFormatter;
                const page = formatter.page || 'page';
                const pageSize = formatter.pageSize || 'pageSize';
                const activeName = formatter.activeName || 'activeName';
                result[page] = params.page;
                result[pageSize] = params.pageSize;
                result[activeName] = params.activeName;
                return result;
            },
            // 获取选中数据
            getChecked() {
                return this.multipleSelection;
            },
            // 点击tab触发数据加载
            handleTabClick(tab) {
                this.activeName = tab.name;
                this.fetchList({
                    page: 1
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            scrollTop() {
                this.$nextTick(() => {
                    try {
                        let $el = this.$refs.table.$el, $wrap = $el.getElementsByClassName('el-table__body-wrapper')[0];
                        $wrap && ($wrap.scrollTop = 0);
                    } catch (e) {
                        console.log(e);
                    }
                });
            },
            // 加载数据
            fetchList({ page }) {
                const activeName = this.activeName;
                if (page) {
                    this.pagination.page = page;
                }
                const params = this.paramsSerializer({ ...this.pagination, activeName });
                this.listLoading = true;
                this.config.load && this.config.load(params).then(res => {
                    const result = this.responseFormatter(res);
                    this.dataSource = result.list;
                    this.total = result.total;
                    this.listLoading = false;
                    this.scrollTop();
                }).catch(() => {
                    this.dataSource = [];
                    this.total = 0;
                    this.listLoading = false;
                    this.scrollTop();
                });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
