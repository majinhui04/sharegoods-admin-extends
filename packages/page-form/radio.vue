<template>
    <el-form-item :label="label" :prop="name">
        <el-radio-group v-model="currentValue" @change="onInputEvent">
            <el-radio :label="item.value" v-for="(item,index) in options" :key="index">{{item.label}}</el-radio>
        </el-radio-group>
    </el-form-item>
</template>

<script>
    import formMixins from './form-model';

    export default {
        name: 'Radio',
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
