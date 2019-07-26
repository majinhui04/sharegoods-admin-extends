## 上传文件

### Attributes

| 参数          | 说明                                                                    | 类型     | 可选值          | 默认值   |
| ------------- | ----------------------------------------------------------------------- | -------- | --------------- | -------- |
| api           | 上传文件接口地址                                                        | String   | —               | -        |
| btnMsg        | 按钮文案                                                                | String   | —               | 上传文件 |
| type          | 按钮类型                                                                | String   | —               | -        |
| accept        | 接受上传的文件类型                                                      | String   | —  | -     ’.xls, .xlsx‘   |
| headers      | 上传的请求头                                                                | Object   | —               |      |

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
            api="/goods/import" :headers="header"
            slot="导入商品"
            @success='handleSuccess'
            @fail='handleFail'
            :accept="accept"><span slot="span">biqotttt</span></sg-upload>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                header: {token: 'xxxx'},
                accept: '.xls, .xlsx',
            }
        },
        methods:{
            handleSuccess(value){
                const data = value;
                this.$message({
                    message: data.response.msg || data.response.message,
                    type: 'success',
                    duration: 2000
                });
            },
            handleFail(value){
                const data = value;
                this.$message({
                    message: data.err.message,
                    type: 'error',
                    duration: 2000
                });
            }
        }
    }
</script>
```

:::
