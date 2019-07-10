## 导出按钮


### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| api | 导出接口地址| String | — | - |
| type | 按钮类型| String | — | - |
| disabled | 是否可用| Boolean | — | - |
| tips | 导出提示语| String | — | - |
| is-show-error | 是否自动显示错误信息| Boolean | — | true |
| fileType | 导出类型| String | — | blob |
| method | 导出接口方式| String | 'get' 'post' | 'post' |
| before-export | 用于判断是否导出，如果是false则阻止导出请求，如果是对象则是导出的参数| Function | — | {} |


### Events
| 事件名称      | 说明          | 回调参数      |
|---------- |-------------- |---------- |
| success | 成功时的钩子|  |
| fail | 失败时的钩子|  |


:::demo 
```html
<template>
    <div class="content">
        <sg-export-button api="/article/export" ref="exports" :before-export="handleExport" tips="正在导出数据,请稍后" @fail="handleFail" file-type="blob">导出</sg-export-button>
    </div>
 </template>
 <script>
    export default {
        data(){
            return {}
        },
        methods:{
            handleFail(){
                this.$notify({
                  title: '标题名称',
                  message: '下载接口好像不行'
                });
            },
            handleExport(){
                return  {
                    a:1
                }
            }
        }
    }
</script>
 ```
 :::
