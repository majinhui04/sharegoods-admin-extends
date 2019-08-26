
<template>
    <el-upload
        class="sg-upload"
        ref="upfile" name="file"
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
        :show-file-list="showFileList"
        :data='data'>
        <slot name='button'>
            <el-button :size="size" :type="buttonType" v-loading.fullscreen.lock="loading" :element-loading-text="tips" element-loading-spinner="el-icon-loading" :icon="icon">
                {{buttonText}}
            </el-button>
        </slot>
        <slot name='elButton'></slot>
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
                default() {
                    return {}
                }
            },
            // 上传时附带的额外参数
            data: {
                type: Object,
                default() {
                    return {}
                }
            },
            // 上传的文件列表
            fileListData: {
                type: Array,
                default: () => []
            },
            // 接受上传的文件类型
            accept: {
                type: String,
                default: ''
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
            // 是否提示错误信息
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
            },
            limitM: {
                type: Number,
                default: 10
            },
            buttonText: {
                type: String,
                default: '上传文件'
            },
            // 上传文件的按钮图标
            icon: {
                type: String,
                default: ''
            },
            // 上传成功提示的成功信息
            message: {
                type: String,
                default: ''
            },
            // 是否显示上传成功的成功信息
            isShowSuccess: {
                type: Boolean,
                default: false
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
                this.disabled = false;
                setTimeout(() => { this.loading = false }, 1000);
                const message = response.msg || response.message || file.status;
                this.isShowSuccess && this.$message({
                    type: 'success',
                    message: message,
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
                let name=file.name.substring(file.name.lastIndexOf('.'));
                const accept = this.accept;
                const acceptArr = accept && accept.split(',');
                let isAccept = accept && acceptArr.some(item => {
                    return item.trim() === name
                })
                if(!isAccept && accept){
                    this.$message({
                        message: `上传文件类型不正确!`,
                        type: 'warning',
                        duration: 1500
                    });
                    return false
                }
                const isLt2M = file.size/1024/1024 < this.limitM;
                if(!isLt2M) {
                    this.$message({
                        message: `上传文件大小不能超过 ${this.limitM}MB!`,
                        type: 'warning',
                        duration: 1500
                    });
                    return false
                }
                this.disabled = true;
                this.loading = true;
                this.$emit('before', file);
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