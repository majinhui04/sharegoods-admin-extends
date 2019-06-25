<template>
    <div class="portal-wrapper" :class="{'noHeader':!showHeader,'hasBreadcrumb':showBreadcrumb}">
        <v-header v-if="showHeader"></v-header>
        <router-view :key="name"></router-view>
    </div>
</template>

<script>
    import vHeader from './portal-head';
    import { mapGetters, mapState } from 'vuex';

    export default {
        name: 'Portal',
        components: {
            vHeader
        },
        data() {
            return {
                name: ''
            };
        },
        computed: {
            ...mapState({
                showHeader: state => state.settings.showHeader,
                showBreadcrumb: state => state.settings.showBreadcrumb
            }),
            ...mapGetters(['routers'])
        },
        watch: {
            $route(newVal, oldVal) {
                this.updateView();
            }
        },
        created() {
            this.updateView();
        },
        methods: {
            updateView() {
                const matched = this.$route.matched;
                // 获取二级目录
                const first = matched[1];
                // 当出现二级目录是顶级模块则需要重新渲染view
                if (first && first.meta.top) {
                    this.name = first.name;
                }
            }
        }
    };
</script>

