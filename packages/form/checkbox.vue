<template>
    <el-form-item :label="label" :class="className" :prop="name">
        <el-checkbox-group v-model="currentValue" @change="onInputEvent">
            <el-checkbox
                :border="border"
                v-for="(item,index) in options"
                :disabled="item.disabled || false"
                :key="index"
                :label="item.value"
            >{{item.label}}</el-checkbox>
        </el-checkbox-group>
    </el-form-item>
</template>

<script>
import formMixins from './form-model';

export default {
    name: 'TextInput',
    props: {
        clearable: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: '请输入'
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
            type: Array,
            default() {
                return [];
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default() {
                return [];
            }
        },
        border: {
            type: Boolean,
            default: false
        },
        className: {
            type: String,
            default: 'sg-checkbox'
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
