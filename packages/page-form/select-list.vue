<template>
    <el-form-item :label="label" :prop="name">
        <el-select v-model="currentValue" @input="onInputEvent" :multiple="multiple" :clearable="clearable" :filterable="filterable">
            <el-option
                :placeholder="placeholder"
                v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :disabled="disabled"
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
