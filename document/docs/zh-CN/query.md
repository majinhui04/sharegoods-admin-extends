## 查询页面demo

`table-filter`组件：表格查询

### Attributes

| 参数   | 说明                                                                                                                                                                              | 类型  | 可选值 | 默认值 |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------ | ------ |
| config | `fields`中的对象为各个表单域, `fieldType`包含这几种类型`TimeSelector`、`TextInput`、`TimeSelector`属性请参考[element](https://element.eleme.io/2.8/#/zh-CN/component/date-picker) | Array | —      | -      |

`table-view`组件：表格视图

### Attributes

| 参数              | 说明                                                        | 类型                | 可选值                                      | 默认值                                                                                      |
| ----------------- | ----------------------------------------------------------- | ------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| handleSelectAble  | 用来决定当前行的CheckBox 是否可以勾选                       | Function(row,index) | —                                           | —                                                                                           |
| height            | 设置表格高度                                                | [Number,String]     | —                                           | —                                                                                           |
| tools             | 表格操作按钮列表                                            | Array               | —                                           | -                                                                                           |
| tabs              | 表单搜索状态列表  | Array               | —        | —    |
| config            | 表格配置项，需要提供`columns`列表配置以及`load`加载数据方法 | Object              | start/end/center/space-around/space-between | -                                                                                           |
| paramsFormatter   | 分页参数转化                                                | Object              | -                                           | {'page':'page','pageSize':'pageSize','activeName':'activeName'}                             |
| responseFormatter | 获取异步数据的列表字段以及分页字段                          | Function            | -                                           | 默认获取response.data or response.items作为list,response.total or response.totalNum作为总数 |
| pageConfig        | 设置分页                                                    | Object              | —                                           | {layout:''total, sizes, prev, pager, next, jumper''}                                        |
| options             | 模糊匹配的数据源（一定要有value字段）  | Promise               | —        | —    |
| triggerOnFocus         | 是否在输入框focus时获得建议列表  | Boolean              | -       | true   |
| className         | 自动补全的下拉列表类名  | String              | -       | —    |
| limit         | 初始化时下拉列表的数据长度  | Number              | -       | 10   |
| createStateFilter         | 自定义过滤字段的方法  | Function              | -       | -  |
### 方法

| 方法名     | 说明              |
| ---------- | ----------------- |
| getChecked | 返回数据列表Array |
### 备注

| 组件     | 说明              |
| ---------- | ----------------- |
| 自动补全组件 | 如果想使用自定义输入建议模版，请参考例子中的写法 |

### 使用案例


:::demo 
```html
<template>
    <div class="content">
        <sg-table-filter :config="filterConfig" v-model="formData" @submit="search" style="margin-bottom: 15px;">
           
            <el-form-item label="地址" slot="autocomplete" class="sg-form-item">
                <el-autocomplete
                      class="inline-input"
                      v-model="formData.address"
                      :fetch-suggestions="querySearch"
                      placeholder="请输入内容"
                      :trigger-on-focus="true"
                      @select="handleSelect"
                    ></el-autocomplete>
            </el-form-item>
           <div slot="restaurant" slot-scope="{data}">             
                <div class="name">{{ data.value }}</div>
                <div class="addr">{{ data.address }}</div> 
           </div>
            
        </sg-table-filter>
        <sg-table-view 
            :height="300"
            :responseFormatter="responseFormatter"
            :config="tableConfig" :tabs="tabs" ref="sgTableView" :params-formatter="{'activeName':'key'}" :tools="tools" :page-config="pageConfig" :handleSelectAble="handleSelectAble" @handleInputBlur="handleInputBlur">
        
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
               restaurants:[],
                pageConfig:{
                    layout:'prev, pager, next',
                    pageSize: 40
                },
                formData: {
                   code2:'',
                    code3:'11',
                    restaurant:'',
                    code: '',
                    status:'',
                    date: [new Date(+new Date()-30*24*60*60*1000),new Date()]
                },
                filterConfig: {
                    labelWidth:'100px',
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
                            name: 'autocomplete',
                            type: 'slot'
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
                        },
                        {
                            name: 'code2',
                            label: '商户号',
                            fieldType: 'TextInput',
                            cols: 8
                        },
                        {
                            name: 'restaurant',
                            label: '餐馆',
                            fieldType: 'AutoComplete',
                            options:this.getResultMethod(),
                            className: 'my-autocomplete',
                            createStateFilter:this.filterData
                        }
                    ]
                },
                formData1: {
                    code1: '',
                },
                filterConfig1: {
                    fields: [
                        {
                            name: 'code1',
                            label: '会员号1',
                            fieldType: 'TextInput',
                            cols: 8
                        }
                    ]
                },
                tools: [{
                    hidden: true, // 如果要设置隐藏
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
                        // 返回当前页数据
                        this.$refs['sgTableView'].fetchList({});
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
                            width: 55,
                            type: 'index',
                            label:'序号'
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
                            type:'editTable',
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
                        const data = { ...params, ...this.formData,$timeout:10000 };
                        return this.$api.articleList(data,{isShowError:true});
                    }
                }
            };
        },
        created() {
            this.initArticleStatusList();
            this.restaurants = this.loadAll();
        },
        methods: {
            filterData(queryString){
                return val => {
                    return (val.value.indexOf(queryString) > -1 || val.address.indexOf(queryString) > -1);
                };
            },
            getResultMethod(){
                return this.$api.restaurantList().then(res => {
                        let result = []
                        res.data.forEach(item => {
                            result.push({value:item.name,address:item.area})
                        })
                        return result
                })
            },
            handleInputBlur(e){
                const numregex = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
                if (!numregex.test(e.target.value)) {
                    e.target.value = "";
                    this.submitFlag = false;
                    this.$message.error("请输入正整数或保留小数点后两位");
                 }    
            },
            querySearch(queryString, cb) {
                    var restaurants = this.restaurants;
                    var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                    // 调用 callback 返回建议列表的数据
                    cb(results);
                  },
                  createFilter(queryString) {
                    return (restaurant) => {
                      return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                    };
                  },
                  loadAll() {
                    return [
                      { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                      { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                      { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                      { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                      { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                      { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                      { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
                      { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
                      { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
                      { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
                      { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
                      { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
                      { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
                      { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
                      { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
                      { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
                      { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
                      { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
                      { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
                      { "value": "枪会山", "address": "上海市普陀区棕榈路" },
                      { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
                      { "value": "钱记", "address": "上海市长宁区天山西路" },
                      { "value": "壹杯加", "address": "上海市长宁区通协路" },
                      { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
                      { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
                      { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
                      { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
                      { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
                      { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
                      { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
                      { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
                      { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
                      { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
                      { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
                      { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
                      { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
                      { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
                      { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
                      { "value": "浏阳蒸菜", "address": "天山西路430号" },
                      { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
                      { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
                      { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
                      { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
                      { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
                      { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
                      { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
                      { "value": "阳阳麻辣烫", "address": "天山西路389号" },
                      { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
                    ];
                  },
                  handleSelect(item) {
                    console.log(item);
                  },
            handleSelectAble(row,index){
                 if(index % 2==0){
                        return true
                    }else{
                        return false
                    }
                console.log('rowwwwww',row)
            },
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
                this.$api.articleStatusList({$timeout:20000},{isShowError:true}).then(res=>{
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
                console.log('tableDataaaaaa',this.$refs['sgTableView'].getTableDataChange())
                this.$refs['sgTableView'].fetchList({ page: 1 });
            },
            search1() {
                this.$refs['sgTableView'].fetchList({ page: 1 });
            }
            
        }
    };
</script>

```
:::