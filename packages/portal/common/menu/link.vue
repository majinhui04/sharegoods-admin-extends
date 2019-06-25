<template>
    <!-- eslint-disable vue/require-component-is-->
    <component v-bind="linkProps(to)">
        <slot/>
    </component>
</template>

<script>
    import { validateURL } from '../../../../lib/utils/validate';

    export default {
        props: {
            to: {
                type: String,
                required: true
            },
            needQuery: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            isExternalLink(routePath) {
                return validateURL(routePath);
            },
            linkProps(url) {
                if (this.isExternalLink(url)) {
                    return {
                        is: 'a',
                        href: url,
                        target: '_blank',
                        rel: 'noopener'
                    };
                }
                return {
                    is: 'router-link',
                    to: {
                        name: url,
                        query: this.needQuery ? this.$route.query : {}
                    }
                };
            }
        }
    };
</script>
