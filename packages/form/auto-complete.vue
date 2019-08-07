<template>
    <el-form-item :label="label">
        <el-autocomplete
            :popper-class="className"
            :fetch-suggestions="searchResult"
            :value="currentValue"
            @input="onInputEvent"
            :placeholder="placeholder"
            :trigger-on-focus="triggerFlag"
        >
            <template slot-scope="{item}" v-if="isCustom">
                <slot :data="item"></slot>
            </template>
        </el-autocomplete>
    </el-form-item>
</template>

<script>
import formMixins from './form-model';

export default {
    name: 'AutoComplate',
    props: {
        placeholder: {
            type: String,
            default: '请选择'
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
            type: [String, Number, Array],
            default: null
        },
        options: {
            required: true,
            type: Promise
        },
        triggerFlag: {
            type: Boolean,
            default: true
        },
        className: {
            type: String,
            default: ''
        },
        isCustom: {
            type: Boolean,
            default: false
        }
    },
    mixins: [formMixins],
    data() {
        return {
            // currentValue: this.value,
            timeout: null,
            resultList: []
        };
    },
    methods: {
        async searchResult(queryString, cb) {
            this.resultList = await this.options;
            this.querySearchAsync(queryString, cb);
        },
        querySearchAsync(queryString, cb) {
            var searchResult = this.resultList;
            var results = queryString ? searchResult.filter(this.createStateFilter(queryString)) : searchResult;
            console.log('结果', results);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 1000 * Math.random());
        },
        createStateFilter(queryString) {
            let val = this.value;
            console.log('valllllll', val.value);
            return val => {
                return val.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
            };
        }
    }
};
</script>
