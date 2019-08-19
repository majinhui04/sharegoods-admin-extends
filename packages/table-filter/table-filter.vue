<template>
    <div class="sg-filter-container">
        <el-form :inline="true"
                 ref="form"
                 :model="formData"
                 class="sg-filter-form"
                 :label-width="labelWidth"
                 @submit.native.prevent
                 >
            <template :span="field.cols" v-for="(field, index) in config.fields">
                <slot v-if="field.type === 'slot'" :name="field.name"></slot>
                <component
                    v-else
                    class="sg-form-item"
                    :clearable="field.clearable"
                    :key="index"
                    :type="field.type"
                    :format="field.format"
                    :value-format="field.valueFormat"
                    :default-time="field.defaultTime"
                    :is="field.fieldType" :label="field.label"
                    :value="formData[field.name]"
                    :multiple="field.multiple"
                    :filterable="field.filterable"
                    @input="updateForm"
                    v-bind="field"
                    :options="field.options"
                    :ref="field.name">
                    <template slot-scope="{data}">
                        <slot :name="field.name" :data="data"></slot>
                    </template>
                </component>
            </template>
            <slot name="buttons">
                <el-form-item class="actions sg-form-item" label=" ">
                    <el-button type="primary" @click="submit" native-type="submit" size="small">{{onSubmitText}}</el-button>
                    <el-button type="default" @click="reset" size="small">{{onResetText}}</el-button>
                </el-form-item>
            </slot>
        </el-form>
    </div>
</template>

<script>
    import SelectList from '../form/select-list';
    import TextInput from '../form/text-input';
    import TimeSelector from '../form/time-selector';
    import AutoComplete from '../form/auto-complete';
    import Checkbox from '../form/checkbox'
    export default {
        name: 'SgTableFilter',
        components: { SelectList, TextInput, TimeSelector, AutoComplete, Checkbox },
        props: {
            config: {
                type: Object,
                default() {
                    return {
                        labelWidth: null,
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
                labelWidth: this.config.labelWidth || '120px',
                formData: this.value,
                onSubmitText: this.config.onSubmitText || '查询',
                onResetText: this.config.onResetText || '重置'
            };
        },
        created(){
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
                    } else if(Array.isArray(formData[name])){
                        this.formData[name] = [];
                    }else{
                        this.formData[name] = null;
                    }
                }
            }
        }
    };
</script>
