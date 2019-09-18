# SgPageDialog

这是一个弹出框插件

## Props

<!-- @vuese:SgPageDialog:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|弹窗标题|`String`|`false`|-|
|visible|弹窗是否显示|`Boolean`|`false`|false|
|width|弹窗宽度|`String`|`false`|-|
|btLoading|按钮加载|`Boolean`|`false`|-|
|btList|操作栏配置|`Array`|`false`|-|
|appendToBody|插入到body|`Boolean`|`false`|true|
|closeOnClickModal|弹窗是否显示|`Boolean`|`false`|false|

<!-- @vuese:SgPageDialog:props:end -->


## Events

<!-- @vuese:SgPageDialog:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|update:visible|Fire when the dialog visible change|The argument is a boolean|
|handleClick|-|-|

<!-- @vuese:SgPageDialog:events:end -->


## Slots

<!-- @vuese:SgPageDialog:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|default|自定义内容区|-|

<!-- @vuese:SgPageDialog:slots:end -->

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
        </sg-page-form>
        <sg-table-view
            :config="tableConfig"
            :tools="tools"
            ref="sgTableView"
            :response-formatter="responseFormatter"
            :params-formatter="{'activeName':'status','pageSize':'limit'}">
        </sg-table-view>

        <!-- 弹窗 -->
        <sg-page-dialog
            :title="dialogInfo.title[dialogInfo.type]"
            :visible.sync="dialogInfo.visible"
            :width="dialogInfo.width"
            :bt-loading="dialogInfo.btLoading"
            :bt-list="dialogInfo.btList"
            @handleClick="trigger"
        >
            <sg-page-form
                size="mini"
                class="my-form"
                :ref-obj.sync="formInfo.ref"
                v-model="formInfo.data"
                :field-list="formInfo.fieldList"
                :rules="formInfo.rules"
                :label-width="formInfo.labelWidth"
            >
                <el-form-item label="头像" prop="avatar" slot="avatar" class="el-form-block">
                    <el-upload name="file">上传</el-upload>
                    <img :src="formInfo.data.avatar" alt="" v-if="formInfo.data.avatar"
                         style="width: 80px;height: 80px;">
                </el-form-item>
                <div slot="form-footer"></div>
            </sg-page-form>
        </sg-page-dialog>
    </div>
</template>

<script>
    const UserModel = {
        account: '',
        nickName: '',
        sex: '',
        password: '',
        password2: '',
        birthday: '',
        avatar: '',
        note: ''
    };
    export default {
        name: 'DemoTableQuery',
        components: {},
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
                // 文章相关
                articleInfo: {},
                // 查询
                queryInfo: {
                    labelWidth: '80px',
                    data: {
                        phone: '13456525308'
                    },
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
                            label: '时间范围',
                            type: 'datetimerange',
                            valueFormat: 'yyyy-MM-dd HH:mm:ss',
                            format: 'yyyy-MM-dd HH:mm:ss',
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
                        }
                    ]
                },
                // 弹窗相关
                dialogInfo: {
                    width: '600px',
                    title: {
                        create: '添加',
                        update: '编辑'
                    },
                    visible: false,
                    type: '',
                    btLoading: false,
                    btList: [
                        { label: '关闭', type: '', icon: '', event: 'on-dialog-close', show: true },
                        {
                            label: '保存',
                            type: 'primary',
                            icon: '',
                            event: 'on-form-save',
                            saveLoading: false,
                            show: true
                        }
                    ]
                },
                // 表单相关
                formInfo: {
                    ref: null,
                    labelWidth: '100px',
                    data: {
                        ...UserModel
                    },
                    fieldList: [
                        {
                            name: 'account',
                            label: '账号',
                            fieldType: 'input',
                            class: 'form-item-account'
                        },
                        {
                            name: 'nickName',
                            label: '昵称',
                            fieldType: 'input'
                        },
                        {
                            name: 'sex',
                            label: '性别',
                            fieldType: 'radio',
                            class: 'el-form-block',
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
                            name: 'avatar',
                            fieldType: 'slot'
                        },
                        {
                            name: 'note',
                            label: '备注',
                            type: 'textarea',
                            fieldType: 'input',
                            class: 'el-form-block'
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
                    }
                },
                tools: [{
                    label: '创建',
                    onClick: this.addUser
                }],
                tableConfig: {
                    columns: [
                        {
                            width: 55,
                            type: 'selection'
                        },
                        {
                            label: '性别',
                            prop: 'sex'
                        },
                        {
                            label: '用户名',
                            prop: 'account'
                        },
                        {
                            label: '昵称',
                            prop: 'nickName'
                        },
                        {
                            label: '修改时间',
                            prop: 'updateTime'
                        },
                        {
                            width: 300,
                            label: '操作',
                            type: 'button',
                            prop: 'title',
                            buttons: [
                                {
                                    customRender(row) {
                                        if (row.status === 'draft') {
                                            return '草稿';
                                        } else {
                                            return '';
                                        }
                                    },
                                    onClick: (row) => {
                                        console.log('test', row);
                                    }
                                },
                                {
                                    label: '删除',
                                    type: 'danger',
                                    onClick: (row) => {
                                        console.log('删除', row);
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
                                        }).catch(() => {
                                            this.$message({
                                                type: 'info',
                                                message: '已取消删除'
                                            });
                                        });
                                    }
                                },
                                {
                                    label: '修改',
                                    onClick: this.editUser
                                }
                            ]
                        }
                    ],
                    load: this.load
                }
            };
        },
        created() {
            this.queryOrderType();
        },
        mounted() {
        },
        methods: {
            addUser() {
                this.formInfo.fieldList.forEach(item => {
                    delete item.show;
                    delete item.disabled;
                });
                // this.$set(this.formInfo,'data',{nickNname:''})
                // this.formInfo.data = {};
                Object.assign(this.formInfo.data, UserModel);
                this.dialogInfo.type = 'create';
                this.dialogInfo.visible = true;
            },
            editUser(row) {
                this.dialogInfo.type = 'update';
                // this.formInfo.data =  { ...row } 会使得数据双向绑定失效
                Object.assign(this.formInfo.data, { ...row });
                this.formInfo.fieldList.forEach(item => {
                    if (['password', 'password2'].includes(item.name)) {
                        item.show = false;
                    }
                    if (['account'].includes(item.name)) {
                        item.disabled = true;
                    }
                });
                this.dialogInfo.visible = true;
            },
            trigger(event, data) {
                let fnName = event.split('-').map((item, index) => {
                    if (index !== 0) {
                        return item.slice(0, 1).toUpperCase() + item.slice(1);
                    } else {
                        return item;
                    }
                }).join('');
                this[fnName] && this[fnName](data);
                console.log(12, fnName, event, data);
            },
            onDialogClose() {
                this.formInfo.ref.resetFields();
                this.dialogInfo.visible = false;
            },
            onFormSave() {
                this.formInfo.ref.validate(valid => {
                    if (valid) {
                        let data = this.formInfo.data;
                        this.dialogInfo.btLoading = true;
                        this.$api.userSave(data).then(res => {
                            this.$message({
                                showClose: true,
                                message: '保存成功',
                                type: 'success',
                                duration: 5000
                            });

                            setTimeout(() => {
                                this.dialogInfo.btLoading = false;
                                this.onDialogClose();
                            }, 2000);
                        }).catch(e => {
                            console.error(e);
                            this.$message({
                                showClose: true,
                                message: '保存失败',
                                type: 'error',
                                duration: 5000
                            });
                            this.dialogInfo.btLoading = false;
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: '校验失败',
                            type: 'error',
                            duration: 3500
                        });
                    }
                });
            },
            onSearch() {
                console.log('查询条件', this.queryInfo.data);
            },
            handleClick(event, data) {
                console.log(event, data);
            },
            handleLink(row) {
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
            },
            queryOrderType() {

            },
            load(params) {
                const data = { ...params, ...this.formInfo.data };
                return this.$api.userList(data).then(res => {
                    console.log(res);
                    return res;
                }).catch(err => {
                    console.log(err);
                    return err;
                });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    .my-form {
        .el-form-item {
            display: inline-block;
            width: 48%;
        }
        .el-form-block {
            width: 100%;
        }
    }
</style>



```
:::

