<template>
    <el-form-item :label="label" :prop="name">
        <el-input
            :type="type"
            :clearable="clearable"
            :show-password="type==='password'"
            :name="name"
            :rows="rows"
            :value="currentValue"
            :disabled="disabled"
            @input="onInputEvent"
            :placeholder="placeholder">
        </el-input>
        <slot v-bind:scope="this"></slot>
    </el-form-item>
</template>

<script>
    import formMixins from './form-model';

    export default {
        name: 'TextInput',
        props: {
            type: {
                type: String,
                default: 'text'
            },
            // 只针对type='textarea'
            rows: {
                type: Number,
                default: 4
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
