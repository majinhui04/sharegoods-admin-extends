## page-form 页面表单
用来动态生成表单,目前支持`fieldType` 为 `input`、`date`、`select`。
其中`input`中的`type`又包含`text`、`password`、`textarea`

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| inline | 是否行布局 | Boolean | - | false |
| field-list | 表单元素 | Array | - | - |
| rules | 校验规则 | Array | - | - |
| ref-obj | 表单对象 | Object | - | - |
| label-width | label宽度 | String | - | `120px` |
| onSubmitText | 提交文案 | String | - | `提交` |
| onResetText | 重置文案 | String | - | `重置` |


### 方法

| 方法名     | 说明              |
| ---------- | ----------------- |
| getChecked | 返回数据列表Array |

### 使用案例


:::demo 
```html
<template>
    <div class="content">
        <sg-page-form
            :inline="true"
            v-model="queryInfo.data"
            :field-list="queryInfo.fieldList"
            :label-width="queryInfo.labelWidth"
            onSubmitText="查询"
            @submit="onSearch"
        >
            <template slot="form-header">
                <h2>查询</h2>
            </template>
        </sg-page-form>

        <sg-page-form
            :ref-obj.sync="formInfo.ref"
            v-model="formInfo.data"
            :field-list="formInfo.fieldList"
            :rules="formInfo.rules"
            :label-width="formInfo.labelWidth"
            @update-account="onUpdateAccont"
            @submit="onSubmit"
        >
            <template slot="form-header">
                <h2>新增账号</h2>
            </template>
            <el-form-item label="测试" prop="test" slot="test">
                <el-input type="text" name="test" v-model="formInfo.data.test"></el-input>
            </el-form-item>
        </sg-page-form>
    </div>
</template>
<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (!/^[\w_-]{6,16}$/.test(value)) {
                    callback(new Error('密码格式有误'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.formInfo.data.password) {
                    callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                // 查询
                queryInfo: {
                    labelWidth: '80px',
                    data: {},
                    fieldList: [
                        {
                            name: 'account',
                            label: '账号',
                            placeholder: '请输入账号',
                            fieldType: 'input',
                            class: 'form-item-account'
                        },
                        {
                            name: 'updatetime',
                            label: '查询时间',
                            type: 'datetimerange',
                            valueFormat: 'yyyy-MM-dd HH:mm:ss',
                            format: 'yyyy-MM-dd HH:mm:ss',
                            defaultTime:null,
                            fieldType: 'date'
                        },
                        {
                            name: 'sex',
                            label: '性别',
                            fieldType: 'select',
                            options: [
                                {
                                    label: '男',
                                    value: 1
                                },
                                {
                                    label: '女',
                                    value: 2
                                }
                            ]
                        },
                        {
                            name: 'phone',
                            label: '手机号码',
                            fieldType: 'input'
                        },
                        {
                            name: 'phone1',
                            label: '手机号码',
                            fieldType: 'input'
                        }
                    ]
                },
                // 表单相关
                formInfo: {
                    ref: null,
                    data: {
                        test: '',
                        //account: '',
                        password: '',
                        password2: '',
                        note: '',
                        birthday: '',
                        updatetime: '',
                        sex: 2
                    },
                    fieldList: [
                        {
                            name: 'account',
                            label: '账号',
                            fieldType: 'input',
                            class: 'form-item-account'
                        },
                        {
                            name: 'password',
                            label: '密码',
                            type: 'input',
                            fieldType: 'password'
                        },
                        {
                            name: 'password2',
                            label: '确认密码',
                            type: 'password',
                            fieldType: 'input'
                        },
                        {
                            name: 'birthday',
                            label: '生日',
                            type: 'date',
                            fieldType: 'date',
                            valueFormat: 'yyyy-MM-dd'
                        },
                        {
                            name: 'updatetime',
                            label: '编辑时间',
                            type: 'datetimerange',
                            valueFormat: 'yyyy-MM-dd HH:mm:ss',
                            format: 'yyyy-MM-dd HH:mm:ss',
                            fieldType: 'date'
                        },
                        {
                            name: 'note',
                            label: '备注',
                            type: 'textarea',
                            fieldType: 'input'
                        },
                        {
                            name: 'test',
                            fieldType: 'slot'
                        },
                        {
                            name: 'sex',
                            label: '性别',
                            fieldType: 'select',
                            options: [
                                {
                                    label: '男',
                                    value: 1
                                },
                                {
                                    label: '女',
                                    value: 2
                                }
                            ]
                        }
                    ],
                    rules: {
                        // account: [
                        //     { required: true, message: '请输入账号', trigger: 'blur' }
                        // ],
                        password: [
                            { required: true, validator: validatePass, trigger: 'change' }
                        ],
                        password2: [
                            { required: true, validator: validatePass2, trigger: 'change' }
                        ],
                        test: [
                            { required: true, message: '请输入', trigger: 'blur' },
                            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                        ]
                    },
                    labelWidth: '80px'
                }
            };
        },
        mounted() {
        },
        methods: {
            onSearch() {
                console.log('查询条件', this.queryInfo.data);
            },
            onUpdateAccont(val) {
                console.log('账号更新', val);
            },
            onSubmit() {
                console.log(this.formInfo.data);
                this.formInfo.ref.validate(valid => {
                    if (valid) {
                        console.log('success');
                    }
                });
            }
        }
    };
</script>

```
:::

