function trim(x) {
    return x.replace(/^\s+|\s+$/gm, '');
}

export default {
    props: ['name', 'value'],

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
