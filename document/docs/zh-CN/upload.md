## 上传文件

### Attributes

| 参数          | 说明                           | 类型    | 可选值                    | 默认值          |
| ------------- | ------------------------------ | ------- | ------------------------- | --------------- |
| api           | 上传文件接口地址               | String  | —                         | -               |
| accept        | 接受上传的文件类型             | String  | —                         | -               |
| headers       | 上传的请求头                   | Object  | —                         |                 |
| isShowError   | 是否展示错误信息               | Boolean | —                         | true            |
| listType      | 文件列表的类型                 | String  | text/picture/picture-card | text            |
| data          | 上传时附带的额外参数           | Object  | —                         | -               |
| fileListData  | 上传的文件列表                 | Array   | —                         | -               |
| buttonType    | 按钮类型                       | String  | —                         | - ’.xls, .xlsx‘ |
| drag          | 是否可拖拽                     | Number  | —                         | - 10            |
| limitM        | 上传文件的大小                 | String  | —                         | - ’.xls, .xlsx‘ |
| buttonText    | 按钮文案                       | String  | —                         | - ’上传文件‘    |
| isShowSuccess | 是否显示上传成功的默认成功信息 | Boolean | —                         | - false         |

### Events

| 事件名称 | 说明                 | 回调参数 |
| -------- | -------------------- | -------- |
| success  | 上传文件成功时的钩子 |          |
| fail     | 上传文件失败时的钩子 |          |
| before     | 上传文件之前的钩子 |          |

:::demo

```html
<template>
    <div class="content">
        <sg-upload
            ref="upload"
            api="/api/tools/settle/batch"
            :headers="header"
            @before="handleBefore"
            @success="handleSuccess"
            tips="正在上传文件,请稍后"
            :accept="accept"
            buttonText="批量上传"
        ></sg-upload>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                header: { token: 'xxxx' },
                accept: '.xls, .xlsx, .csv',
                tableHeader: [],
                tableData: [],
                excelData: {
                    header: null,
                    results: null
                }
            };
        },
        methods: {
            handleSuccess({response, file, fileList}) {
                console.log(res, res.file, 'response, file, fileList');
            },
            handleFail({err, file, fileList}) {},
            handleBefore(file) {
               
            },
        }   
    };
</script>
```

:::
