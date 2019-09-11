<template>
    <el-form-item :label="label" :prop="name">
        <el-date-picker
            :clearable="clearable"
            v-model="currentValue"
            @input="onInputEvent"
            :type="type"
            :value-format="valueFormat"
            :format="format"
            :default-time="defaultTime"
            :disabled="disabled"
            :pick-options="pickerOptions"
            placeholder="选择日期时间">
        </el-date-picker>
    </el-form-item>
</template>

<script>
    import formMixins from './form-model';

    export default {
        props: {
            value: {
                type: [String, Number, Array, Date],
                default: ''
            },
            type: {
                type: String,
                default: 'datetime'
            },
            valueFormat: {
                type: String,
                default: 'yyyy-MM-dd HH:mm:ss'
            },
            pickerOptions: {
                type: Object,
                default() {
                    return {};
                }
            },
            format: {
                type: String,
                default: 'yyyy-MM-dd'
            },
            defaultTime: {
                type: Array,
                default() {
                    if (this.type === 'date' || this.type === 'datetime') {
                        return null;
                    } else {
                        return ['00:00:00', '23:59:59'];
                    }
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
