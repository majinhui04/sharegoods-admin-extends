function trim(x) {
    if (x && typeof x === 'string') {
        return x.replace(/^\s+|\s+$/gm, '');
    } else if (x && typeof x === 'number') {
        return Number(x.toString().replace(/^\s+|\s+$/gm, ''));
    } else {
        return x;
    }
}

export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请填写'
        }
    },
    data() {
        return {
            currentValue: this.value
        };
    },
    methods: {
        onInputEvent(value) {
            this.$emit('input', this.name, trim(value));
        },
        reset() {
            this.currentValue = '';
        }
    },
    watch: {
        value(val) {
            this.currentValue = trim(val);
        }
    }
};
