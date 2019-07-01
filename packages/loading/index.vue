<template>
    <div class="base-loading-layer">
        <div class="loader-outer " :style="style">
            <div class="loader-inner line-scale-pulse-out-rapid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SgLoading',
        props: {
            mode: {
                type: String,
                default: ''
            },
            top: {
                type: String,
                default: ''
            }
        },
        computed: {
            style() {
                if (this.top) {
                    return `top:${this.top}`;
                }
                return '';
            }
        },
        mounted() {

        }
    };
</script>

