<template>
    <el-form-item :label="label">
        <el-select v-model="currentValue" @input="onInputEvent" :multiple="multiple" :clearable="clearable" :filterable="filterable">
            <el-option
                :placeholder="placeholder"
                v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
</template>

<script>
    import formMixins from './form-model';

    export default {
        name: 'SelectList',
        props: {
            clearable: {
                type: Boolean,
                default: true
            },
            placeholder: {
                type: String,
                default: '请选择'
            },
            label: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            value: {
                type: [String, Number, Array],
                default: null
            },
            multiple: {
                type: Boolean,
                default: false
            },
            filterable: {
                type: Boolean,
                default: false
            },
            options: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        mixins: [formMixins],
        data() {
            return {
                currentValue: this.value
            };
        }
    };
</script>
