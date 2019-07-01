<template>
    <el-upload
        class="sg-upload"
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
        <el-button :size="size" :type="type">
            <slot>点击上传</slot>
        </el-button>
    </el-upload>
</template>

<script>
    export default {
        name: 'UploadFile',
        props: {
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
                default: ''
            },
            size: {
                type: String,
                default: 'small'
            },
            type: {
                type: String,
                default: 'primary'
            }
        },
        data() {
            return {
                disabled: false
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
            },
            handleRemove(file, fileList) {
                this.$emit('remove', {
                    file,
                    fileList
                });
            },
            // 上传文件之前的钩子
            handleBeforeUpload(file) {
                this.disabled = true;
            },
            handleError(err, file, fileList) {
            }

        }
    };
</script>

