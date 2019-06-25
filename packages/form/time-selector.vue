<template>
    <el-form-item :label="label">
        <el-date-picker
            v-model="currentValue"
            @input="onInputEvent"
            :type="type || 'datetime'"
            :value-format="valueFormat || 'yyyy-MM-dd HH:mm:ss'"
            :format="format || 'yyyy-MM-dd'"
            :default-time="defaultTime || ['00:00:00', '23:59:59']"
            placeholder="选择日期时间">
        </el-date-picker>
    </el-form-item>
</template>

<script>
    import formMixins from './form-model';

    export default {
        props: ['label', 'name', 'value', 'type', 'valueFormat', 'format', 'defaultTime'],
        mixins: [formMixins],
        data() {
            return {
                currentValue: this.value
            };
        }
    };
</script>
