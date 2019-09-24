<template>
    <el-form-item :label="label" :prop="name">
        <el-date-picker
            v-model="currentValue"
            @input="onInputEvent"
            v-bind="$attrs">
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
