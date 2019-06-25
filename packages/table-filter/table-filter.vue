<template>
    <div class="sg-filter-container">
        <el-form :inline="true" ref="form" :model="formData" class="sg-filter-form">
            <el-col :span="field.cols" v-for="(field, index) in config.fields" :key="index">
                <component
                    :key="index"
                    :type="field.type"
                    :format="field.format"
                    :value-format="field.valueFormat"
                    :default-time="field.defaultTime"
                    :is="field.fieldType" :label="field.label"
                    :value="formData[field.name]"
                    :multiple="field.multiple"
                    @input="updateForm"
                    v-bind="field"
                    :options="field.options"
                    :ref="field.name">
                </component>
            </el-col>
            <slot name="buttons">
                <el-button type="primary" @click="submit" size="small">{{onSubmitText}}</el-button>
                <el-button type="default" @click="reset" size="small">{{onResetText}}</el-button>
            </slot>
        </el-form>
    </div>
</template>

<script>
    import SelectList from '../form/select-list';
    import TextInput from '../form/text-input';
    import TimeSelector from '../form/time-selector';

    export default {
        name: 'SgTableFilter',
        components: { SelectList, TextInput, TimeSelector },
        props: {
            config: {
                type: Object,
                default() {
                    return {
                        fields: []
                    };
                }
            },
            value: {
                type: Object
            }
        },
        data() {
            return {
                formData: this.value,
                onSubmitText: this.config.onSubmitText || '查询',
                onResetText: this.config.onResetText || '重置'
            };
        },
        methods: {
            updateForm(fieldName, value) {
                this.formData[fieldName] = value;
            },
            submit() {
                this.$emit('submit');
            },
            reset() {
                const formData = this.formData;
                for (const name in formData) {
                    if (typeof formData[name] === 'string') {
                        this.formData[name] = '';
                    } else {
                        this.formData[name] = null;
                    }
                }
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .sg-filter-form {
        overflow:hidden;
    }
</style>
