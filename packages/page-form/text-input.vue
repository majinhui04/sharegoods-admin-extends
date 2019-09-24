<template>
    <el-form-item :label="label" :prop="name">
        <el-input
            :value="currentValue"
            :clearable="clearable"
            @input="onInputEvent"
            v-bind="$attrs">
        </el-input>
        <slot v-bind:scope="this"></slot>
    </el-form-item>
</template>

<script>
    import formMixins from './form-model';

    export default {
        name: 'TextInput',
        props: {
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
