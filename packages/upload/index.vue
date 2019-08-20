
<template>
    <el-upload
        class="sg-upload"
        :drag='drag'
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
        :list-type="listType"
        :show-file-list="showFileList">
        <el-button :size="size" :type="buttonType" v-loading.fullscreen.lock="loading" :element-loading-text="tips" element-loading-spinner="el-icon-loading">
            <slot name='title'>上传文件</slot>
        </el-button>
        <slot name='button'></slot>
    </el-upload>
</template>

<script>
    export default {
        name: 'SgUpload',
        props: {
            tips: {
                type: String,
                default: '正在上传文件'
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
                default: true
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
                type: String
            },
            size: {
                type: String,
                default: 'small'
            },
            // 按钮类型
            buttonType: {
                type: String,
                default: 'primary'
            },
            isShowError: {
                type: Boolean,
                default: true
            },
            drag: {
                type: Boolean,
                default: false
            },
            isShowLoading: {
                type: Boolean,
                default: false
            },
            listType: {
                type: String,
                default: 'text'
            }
        },
        data() {
            return {
                disabled: false,
                loadingText: this.tips,
                loading: this.isShowLoading
            };
        },
        methods: {
            // 文件上传成功时的钩子
            handleSuccess(response, file, fileList) {
                this.$emit('success', {
                    response,
                    file,
                    fileList
                });
                setTimeout(() => { this.loading = false }, 1000);
                const message = response.msg || response.message || file.status;
                this.$message({
                    type: 'success',
                    message: message || '上传文件成功',
                    duration: 1500
                });
            },
            handleRemove(file, fileList) {
                this.$emit('remove', {
                    file,
                    fileList
                });
            },
            // 上传文件之前的钩子
            handleBeforeUpload(file) {
                // let testmsg=file.name.substring(file.name.lastIndexOf('.')+1);
                const isLt2M = file.size/1024/1024 < 10;
                if(!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过 10MB!',
                        type: 'warning',
                        duration: 1500
                    });
                    return false
                }
                this.disabled = true;
                this.loading = true;
            },
            // 上传文件失败
            handleError(err, file, fileList) {
                setTimeout(() => { this.loading = false }, 1000 )
                this.disabled = false;
                this.$emit('fail', {err, file, fileList})
                const message = err.msg || err.message || file.status;
                this.isShowError && this.$message({
                    type: 'warning',
                    message: message || '上传文件失败',
                    duration: 1500
                });
            }
        }
    };
</script>