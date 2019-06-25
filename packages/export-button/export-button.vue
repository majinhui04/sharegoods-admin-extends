<template>
    <el-button
        :type="type"
        :size="size"
        :disabled="disabled"
        :element-loading-text="loadingText"
        element-loading-spinner="el-icon-loading"
        v-loading.fullscreen.lock="loading"
        @click="handleClick">
        <slot></slot>
    </el-button>
</template>

<script>
    import flatry from '../../src/utils/flatry';

    export default {
        name: 'SgExportButton',
        props: {
            api: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            tips: {
                type: String,
                default: '正在导出 Excel'
            },
            method: {
                type: String,
                default: 'POST'
            },
            beforeExport: {
                type: Function,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                loading: false,
                loadingText: this.tips,
                formData: {}
            };
        },
        methods: {
            setFormData(data) {
                this.formData = { ...data };
            },
            handleClick: async function () {
                this.$emit('click');
                const result = this.beforeExport();
                if(result === false) {
                    return false;
                }
                const form = { ...this.formData, ...result };
                const method = this.method ? this.method.toUpperCase() : 'POST';
                const params = method === 'POST' ? null : form;
                const formData = method === 'POST' ? form : null;
                this.loading = true;
                const { data } = await flatry(this.$http.download(method, this.api, params, formData));
                if (data === false) {
                    this.$message({
                        type: 'warning',
                        message: '下载文件失败',
                        duration: 1500
                    });
                    this.$emit('fail');
                }
                this.$emit('success');
                this.loading = false;
            }
        }
    };
</script>
