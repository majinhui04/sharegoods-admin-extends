<template>
    <el-form-item :label="label" :prop="name">
        <el-autocomplete
            :popper-class="className"
            :fetch-suggestions="searchResult"
            :value="currentValue"
            @input="onInputEvent"
            :placeholder="placeholder"
            :trigger-on-focus="triggerOnFocus"
        >
            <template slot-scope="{item}">
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
        triggerOnFocus: {
            type: Boolean,
            default: true
        },
        className: {
            type: String,
            default: ''
        },
        limit: {
            type: Number,
            default: 10
        },
        createStateFilter: {
            type: Function,
            default(queryString) {
                return val => {
                    return val.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
                };
            }
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
            try {
                this.resultList = await this.options;
                this.querySearchAsync(queryString, cb);
            } catch (err) {
                console.error(err);
            }
        },
        querySearchAsync(queryString, cb) {
            let searchResult = this.resultList;
            let results = queryString ? searchResult.filter(this.createStateFilter(queryString)) : searchResult.slice(0, this.limit);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 1000 * Math.random());
        }
    }
};
</script>
