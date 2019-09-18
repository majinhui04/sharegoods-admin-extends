<template>
    <div class="sg-page-form-container">
        <slot name="form-header"></slot>
        <el-form
            :inline="inline"
            ref="form"
            :rules="rules"
            :model="formData"
            class="sg-page-form"
            :label-width="labelWidth"
            :size="size"
            @submit.native.prevent
        >
            <template v-for="(field, index) in getConfigList()">
                <slot v-if="field.fieldType === 'slot'" :name="field.name"></slot>
                <component
                    v-else
                    class="sg-form-item"
                    :key="field.name"
                    :is="getFieldType(field.fieldType)"
                    :value="formData[field.name]"
                    @input="updateForm"
                    v-bind="field"
                    ref="formItem">
                    <template slot-scope="scope">
                        <slot :name="field.name"></slot>
                    </template>
                </component>
            </template>
            <slot name="form-footer">
                <el-form-item>
                    <el-button type="primary" @click="submit" native-type="submit" size="small">{{onSubmitText}}
                    </el-button>
                    <el-button type="default" @click="reset" size="small">{{onResetText}}</el-button>
                </el-form-item>
            </slot>
        </el-form>
    </div>
</template>

<script>
    import SelectList from './select-list';
    import TextInput from './text-input';
    import TimeSelector from './time-selector';
    import Radio from './radio';

    const types = {
        radio: 'Radio',
        input: 'TextInput',
        text: 'TextInput',
        password: 'TextInput',
        textarea: 'TextInput',
        date: 'TimeSelector',
        select: 'SelectList'
    };

    export default {
        name: 'SgPageForm',
        components: { SelectList, TextInput, TimeSelector, Radio },
        props: {
            inline: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'small' // medium / small / mini
            },
            // 相关字段
            fieldList: {
                type: Array
            },
            // 验证规则
            rules: {
                type: Object
            },
            // label宽度
            labelWidth: {
                type: String,
                default: '120px'
            },
            // label宽度
            onSubmitText: {
                type: String,
                default: '提交'
            },
            // label宽度
            onResetText: {
                type: String,
                default: '重置'
            },
            value: {
                type: Object
            }
        },
        data() {
            return {
                types: types,
                formData: this.value
            };
        },
        watch: {
            data: {
                handler: function (val) {
                    // 将form实例返回到父级
                    this.$emit('update:refObj', this.$refs.form);
                },
                deep: true // 深度监听
            }
        },
        mounted() {
            // 将form实例返回到父级
            this.$emit('update:refObj', this.$refs.form);
        },
        methods: {
            getFieldType(type) {
                const types = this.types;
                if (types[type]) {
                    return types[type];
                } else {
                    return null;
                }
            },
            // 获取字段列表
            getConfigList() {
                return this.fieldList.filter(item => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show));
            },
            updateForm(fieldName, value) {
                // if (this.formData[fieldName]) {
                //     this.formData[fieldName] = value;
                // } else {
                //     this.$set(this.formData, fieldName, value);
                // }
                this.$set(this.formData, fieldName, value);
                this.$emit(`update-${fieldName}`, value);
            },
            submit() {
                this.$emit('submit');
            },
            reset() {
                this.$refs['form'].resetFields();
                this.$emit('reset');
            }
        }
    };
</script>
