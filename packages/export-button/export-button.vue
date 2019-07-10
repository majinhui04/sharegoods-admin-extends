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
    import { downloadFile } from '../../src/utils/util';

    export default {
        name: 'SgExportButton',
        props: {
            isShowError: {
                type: Boolean,
                default: true
            },
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
            fileType: {
                type: String,
                default: 'blob'
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
                if (result === false) {
                    return false;
                }
                const form = { ...this.formData, ...result };
                const method = this.method ? this.method.toUpperCase() : 'POST';
                const params = method === 'POST' ? null : form;
                const formData = method === 'POST' ? form : null;
                this.loading = true;
                this.$http.download(method, this.api, params, formData).then(res => {
                    this.loading = false;
                    this.$emit('success');
                    if (res.data) {
                        downloadFile(res.data);
                    }
                }).catch(res => {
                    const message = res.msg || res.message;
                    this.loading = false;
                    this.$emit('fail', res);
                    this.isShowError && this.$message({
                        type: 'warning',
                        message: message || '下载文件失败',
                        duration: 1500
                    });
                });
            }
        }
    };
</script>
