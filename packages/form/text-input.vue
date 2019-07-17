<template>
    <el-form-item :label="label">
        <el-input
            :clearable="clearable"
            type="text"
            :name="name"
            :value="currentValue"
            @input="onInputEvent"
            :placeholder="placeholder">
        </el-input>
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
                type: [String, Number],
                default: ''
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
