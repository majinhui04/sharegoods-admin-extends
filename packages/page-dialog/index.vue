<template>
    <el-dialog
        :title="title"
        :visible.sync="visible"
        :width="width"
        :before-close="handleClose"
        :append-to-body="appendToBody"
        class="page-dialog"
        :close-on-click-modal="closeOnClickModal"
        :close-on-press-escape="true"
    >
        <slot/>
        <div
            v-if="btList"
            slot="footer"
            class="dialog-footer"
        >
            <template v-for="(item, index) in getConfigList()">
                <el-button
                    v-if="item.show"
                    :key="index"
                    :type="item.type"
                    :icon="item.icon"
                    :disabled="item.disabled"
                    :loading="btLoading"
                    @click="handleClick(item.event)"
                >
                    {{ item.label }}
                </el-button>
            </template>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: 'SgPageDialog',
        props: {
            // 弹窗标题
            title: {
                type: String
            },
            // 弹窗是否显示
            visible: {
                type: Boolean,
                default: false
            },
            // 弹窗宽度
            width: {
                type: String
            },
            // 按钮加载
            btLoading: {
                type: Boolean
            },
            // 操作栏配置
            btList: {
                type: Array
            },
            // 插入到body
            appendToBody: {
                type: Boolean,
                default: true
            },
            // 弹窗是否显示
            closeOnClickModal: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {};
        },
        watch: {
            visible(val) {
                this.$emit('update:visible', val);
            }
        },
        methods: {
            // 获取按钮列表
            getConfigList() {
                return this.btList.filter(item => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show));
            },
            // 派发按钮点击事件
            handleClick(event, data) {
                this.$emit('handleClick', event, data);
            },
            // 关闭弹窗前的回调
            handleClose(done) {
                this.$emit('update:visible', false);
            }
        }
    };
</script>

<style scoped>

</style>
