## 上传文件

### Attributes

| 参数          | 说明                                                                    | 类型     | 可选值          | 默认值   |
| ------------- | ----------------------------------------------------------------------- | -------- | --------------- | -------- |
| api           | 上传文件接口地址                                                        | String   | —               | -        |
| btnMsg        | 按钮文案                                                                | String   | —               | 上传文件 |
| buttonType          | 按钮类型                                                                | String   | —               | primary      |
| accept        | 接受上传的文件类型                                                      | String   | —  | -     ’.xls, .xlsx‘   |
| headers      | 上传的请求头                                                                | Object   | —               |      |
| isShowError      | 是否展示错误信息                                                                | Boolean   | —               |   true   |
| listType     | 文件列表的类型                                                                | String   | text/picture/picture-card           |   text  |

### Events

| 事件名称 | 说明                 | 回调参数 |
| -------- | -------------------- | -------- |
| success  | 上传文件成功时的钩子 |          |
| fail     | 上传文件失败时的钩子 |          |

:::demo

```html
<template>
    <div class="content">
        <sg-upload
            ref="upload"
            api="/api/tools/settle/batch"
            :headers="header"
            @success='handleSuccess'
            @fail='handleFail'
            tips="正在上传文件,请稍后"
            :accept="accept"
            >
            <span slot='title'>导入文件<i class="el-icon-upload el-icon--right"></i></span>
        </sg-upload>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                header: {token: 'xxxx'},
                accept: '.xls, .xlsx'
            }
        },
        methods:{
            handleSuccess(res) {
                console.log(res, res.file, 'response, file, fileList')
            },
            handleFail(fail){}
        }
    }
</script>
```

:::
