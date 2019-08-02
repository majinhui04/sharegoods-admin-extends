<template>
    <el-upload
        class="sg-upload"
        :action='api'
        :accept="accept"
        :headers="headers"
        :multiple="multiple"
        :on-remove="handleRemove"
        :before-upload="handleBeforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :disabled="disabled"
        :file-list="fileListData"
        :show-file-list="showFileList">
        <el-button :size="size" :type="type" :element-loading-text="loadingText" v-loading.fullscreen.lock="loading" element-loading-spinner="el-icon-loading"><slot name='msg'>上传文件</slot></el-button>
    </el-upload>
</template>

<script>
    export default {
        name: 'SgUpload',
        props: {
            tips: {
                type: String,
                default: '正在上传数据'
            },
            // 请求前缀
            baseUrl: {
                type: String,
                default: process.env.VUE_APP_BASE_API || ''
            },
            // 请求地址
            api: {
                type: String,
                default: ''
            },
            // 是否显示已上传文件列表
            showFileList: {
                type: Boolean,
                default: false

            },
            // 多选
            multiple: {
                type: Boolean,
                default: false
            },
            // 请求头token
            headers: {
                type: Object,
                default: () => []
            },
            // 上传的文件列表
            fileListData: {
                type: Array,
                default: () => []
            },
            // 接受上传的文件类型
            accept: {
                type: String,
                default: '.xls, .xlsx'
            },
            size: {
                type: String,
                default: 'small'
            },
            type: {
                type: String,
                default: 'primary'
            },
            isShowError: {
                type: Boolean,
                default: true
            },
            loading: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                disabled: false,
                loadingText: this.tips
            };
        },
        computed: {
            action() {
                return this.baseUrl + this.api;
            }
        },
        methods: {
            // 文件上传成功时的钩子
            handleSuccess(response, file, fileList) {
                this.disabled = false;
                this.$emit('success', {
                    response,
                    file,
                    fileList
                });
                 this.loading = false;
            },
            handleRemove(file, fileList) {
                this.$emit('remove', {
                    file,
                    fileList
                });
            },
            // 上传文件之前的钩子
            handleBeforeUpload(file) {
                console.log('1111')
                this.disabled = true;
                this.loading = true;
            },
            // 上传文件失败
            handleError(err, file, fileList) {
                this.loading = false;
                this.disabled = false;
                this.$emit('fail', {err, file, fileList})
                const message = err.msg || err.message;
                this.isShowError && this.$message({
                    type: 'warning',
                    message: message || '上传文件失败',
                    duration: 1500
                });
            }
        }
    };
</script>

