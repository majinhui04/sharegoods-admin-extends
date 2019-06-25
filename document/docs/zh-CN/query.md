## 查询页面demo

`table-filter`组件：表格查询

### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| config | `fields`中的对象为各个表单域, `fieldType`包含这几种类型`TimeSelector`、`TextInput`、`TimeSelector`属性请参考[element](https://element.eleme.io/2.8/#/zh-CN/component/date-picker)| Array | — | - |

`table-view`组件：表格视图

### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| tools | 表格操作按钮列表 | Array | — | - |
| tabs | 表单搜索状态列表 | Array | — | — |
| config | 表格配置项，需要提供`columns`列表配置以及`load`加载数据方法 | Object | start/end/center/space-around/space-between | - |
| paramsFormatter | 分页参数转化 | Object | - | {'page':'page','pageSize':'pageSize','activeName':'activeName'} |
| responseFormatter | 获取异步数据的列表字段以及分页字段 | Function | - | 默认获取response.data or response.items作为list,response.total or response.totalNum作为总数|


### 方法

| 方法名     | 说明          |
| ---- | ---- |
| getChecked | 返回数据列表Array |


### 使用案例


:::demo 
```html
<template>
    <div class="content">
        <sg-table-filter :config="filterConfig" v-model="formData" @submit="search" style="margin-bottom: 15px;"></sg-table-filter>
        <sg-table-view :config="tableConfig" :tabs="tabs" ref="sgTableView" :params-formatter="{'activeName':'key'}" :tools="tools">
        
            <sg-export-button slot="tools" api="/article/export" type="warning">批量导出</sg-export-button>
           
            <el-table-column align="center" slot="download" label="下载" width="100">
                <template slot-scope="scope">
                    <sg-export-button api="/article/export" tips="正在导出数据,请稍后" :before-export="handleExport(scope.row)">导出</sg-export-button>
                </template>
            </el-table-column>
            <el-table-column align="center" slot="actions" label="操作" width="220">
                <template slot-scope="scope">
                    <template v-if="scope.row.status==='draft'">
                        <el-button type="primary" @click="handleDelete(scope.row)">发布</el-button>
                    </template>
                    <template v-else>
                        <el-tag type="success">已发布</el-tag>
                    </template>
     
                    <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </sg-table-view>
    </div>
</template>

<script>

    export default {
        components: {},
        filters:{
            sepThousand:function (t) {
                var e = t.toString(),
                    n = e.indexOf(".");
                return e.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function (t, e) {
                    return n < 0 || e < n ? t + "," : t
                })
            }
        },
        data() {
            return {
                formData: {
                    code: '',
                    status:'',
                    date: [new Date(+new Date()-30*24*60*60*1000),new Date()]
                },
                filterConfig: {
                    fields: [
                        {
                            name: 'date',
                            label: '退款完成日期',
                            type: 'daterange',
                            defaultTime: ['00:00:00', '23:59:59'],
                            fieldType: 'TimeSelector',
                            cols: 24
                        },
                        {
                            name: 'code',
                            label: '会员号',
                            fieldType: 'TextInput',
                            cols: 8
                        },
                        {
                            name: 'code3',
                            label: '退款单号',
                            fieldType: 'TextInput',
                            cols: 8
                        },
                        {
                            name: 'code2',
                            label: '商户号',
                            fieldType: 'TextInput',
                            cols: 8
                        },
                        {
                            name: 'payType',
                            label: '支付方式',
                            fieldType: 'SelectList',
                            options: [{
                                "label":"请选择",
                                "value":""
                            },{
                                "label":"微信",
                                "value":"1"
                            },
                            {
                                "label":"支付宝",
                                "value":"2"
                            },
                            {
                                "label":"其他",
                                "value":"3"
                            }],
                            cols: 12
                        },
                        {
                            name: 'status',
                            label: '状态',
                            fieldType: 'SelectList',
                            options: [{
                                "label":"请选择",
                                "value":""
                            }],
                            cols: 12
                        }
                    ]
                },
                tools: [{
                    label: '批量删除',
                    type:'danger',
                    onClick: () => {
                        const val = this.$refs['sgTableView'].getChecked();
                        const checked = val.map((item) => item.author);
                        this.$notify({
                            title: 'Success',
                            message: checked.join(','),
                            type: 'success',
                            duration: 2000
                        });
                    }
                },
                    {
                        name: 'tools',
                        type: 'slot'
                    }, {
                        label: '下载模板',
                        onClick: () => {
                            this.$message({
                                message: '操作Success',
                                type: 'success'
                            });
                            
                        }
                    }],
                tabs: [
                    {
                        label: '全部',
                        name: ''
                    },
                    {
                        label: '处理中',
                        name: '2'
                    },
                    {
                        label: '失败',
                        name: '3'
                    },
                    
                ],
                tableConfig: {
                    columns: [
                        {
                            width: 55,
                            type: 'selection'
                        },
                        {
                            type: 'slot',
                            prop: 'download'
                        },
                        {
                            label: '阅读量',
                            prop: 'pageviews',
                            customRender: (row) => {
                                const result = this.$options.filters.sepThousand(row.pageviews);
                                return `<b>${result}</b>`;
                            }
                        },
                        {
                            label: '日期',
                            prop: 'timestamp',
                            customRender: (row) => {
                                return this.$options.filters.formatDate(row.timestamp);
                            }
                        },
                        {
                            label: '标题',
                            prop: 'title'
                        },
                        {
                            label: '作者',
                            prop: 'author'
                        },
                        {
                            width:150,
                            type: 'slot',
                            prop: 'actions'
                        }
                        
                    ],
                    load: (params) => {
                        const data = { ...params, ...this.formData };
                        return this.$api.articleList(data,{isShowError:true});
                    }
                }
            };
        },
        created() {
            this.initArticleStatusList()
        },
        methods: {
            // 在列表初始化的时候就会执行一遍 所以需要中间函数处理
            handleExport(row){
                const fn = function() {
                  return {
                      author:row.author
                  }
                }
                return  fn;
            },
            initArticleStatusList(){
                let fields = this.filterConfig.fields;
                let options = fields.filter(item=>item.name === 'status')[0].options;
                this.$api.articleStatusList(null,{isShowError:true}).then(res=>{
                    options.push(...res.data);
                });
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$notify({
                        title: 'Success',
                        message: '操作成功',
                        type: 'success',
                        duration: 2000
                    });
                    this.$refs['sgTableView'].fetchList();
                });
            },
            responseFormatter(res) {
                const body = res.data || {};
                const list = body.data || body.items || [];
                const total = body.totalNum || body.total || 0;
                return {
                    list,
                    total
                };
            },
            search() {
                console.log('getFormData', this.formData);
                this.$refs['sgTableView'].fetchList({ page: 1 });
            }
            
        }
    };
</script>
```
:::