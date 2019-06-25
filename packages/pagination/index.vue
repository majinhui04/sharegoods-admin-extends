<template>
    <div :class="{'hidden':hidden}" class="pagination-container" ref="sgPage" :style="style">
        <el-pagination
            :background="background"
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            :layout="layout"
            :page-sizes="pageSizes"
            :total="total"
            v-bind="$attrs"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
    export default {
        name: 'Pagination',
        props: {
            total: {
                required: true,
                type: Number
            },
            page: {
                type: Number,
                default: 1
            },
            limit: {
                type: Number,
                default: 20
            },
            pageSizes: {
                type: Array,
                default() {
                    return [10, 20, 30, 50];
                }
            },
            layout: {
                type: String,
                default: 'total, sizes, prev, pager, next, jumper'
            },
            background: {
                type: Boolean,
                default: true
            },
            autoScroll: {
                type: Boolean,
                default: true
            },
            hidden: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                style: ''
            };
        },
        computed: {
            currentPage: {
                get() {
                    return this.page;
                },
                set(val) {
                    this.$emit('update:page', val);
                }
            },
            pageSize: {
                get() {
                    return this.limit;
                },
                set(val) {
                    this.$emit('update:limit', val);
                }
            }
        },
        mounted() {
            const dom = this.$refs['sgPage'];
            if (dom) {
                const $parent = dom.parentNode;
                const rect = $parent.getBoundingClientRect();
                const width = rect.width;
                this.style = `width:${width}px;`;
            }
        },
        methods: {
            handleSizeChange(val) {
                this.$emit('pagination', { page: this.currentPage, limit: val });
                const $content = document.getElementById('appContent');
                if ($content) {
                    $content.scrollTop = 0;
                }
            },
            handleCurrentChange(val) {
                this.$emit('pagination', { page: val, limit: this.pageSize });
                const $content = document.getElementById('appContent');
                if ($content) {
                    $content.scrollTop = 0;
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .pagination-container {
        text-align: right;
        &.center {
            text-align: center;
        }
        &.left {
            text-align: left;
        }
        &.hidden {
            display: none;
        }
    }
</style>
