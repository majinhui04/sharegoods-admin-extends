<template>
    <el-form-item :label="label" :prop="name">
        <el-select v-model="currentValue" @input="onInputEvent" v-bind="$attrs">
            <el-option
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
            value: {
                type: [String, Number, Array],
                default: null
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
