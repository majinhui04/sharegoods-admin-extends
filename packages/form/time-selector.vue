<template>
    <el-form-item :label="label">
        <el-date-picker
            :clearable="clearable"
            v-model="currentValue"
            @input="onInputEvent"
            :type="type"
            :value-format="valueFormat"
            :format="format"
            :default-time="defaultTime"
            placeholder="选择日期时间">
        </el-date-picker>
    </el-form-item>
</template>

<script>
    import formMixins from './form-model';

    export default {
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
            type: {
                type: String,
                default: 'datetime'
            },
            valueFormat: {
                type: String,
                default: 'yyyy-MM-dd HH:mm:ss'
            },
            format: {
                type: String,
                default: 'yyyy-MM-dd'
            },
            defaultTime: {
                type: Array,
                default() {
                    return ['00:00:00', '23:59:59'];
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
