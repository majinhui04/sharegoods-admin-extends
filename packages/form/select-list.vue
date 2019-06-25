<template>
    <el-form-item :label="label">
        <el-select v-model="currentValue" @input="onInputEvent">
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
        props: ['multi', 'options', 'name', 'label', 'value'],
        mixins: [formMixins],
        data() {
            return {
                currentValue: this.value
            };
        }
    };
</script>
