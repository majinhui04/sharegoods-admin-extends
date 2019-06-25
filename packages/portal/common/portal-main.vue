<template>
    <div class="portal-main" id="portalMain" :class="classObj">
        <v-sidebar></v-sidebar>
        <div class="portal-content" id="appContent">
            <tags-view v-if="needTagsView"/>
            <v-breadcrumb v-if="showBreadcrumb"></v-breadcrumb>
            <div class="portal-content-view">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive" :key="key"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive" :key="key"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapState } from 'vuex';
    import vSidebar from './portal-side';
    import vBreadcrumb from './portal-breadcrumb.vue';
    import TagsView from './tags-view/index.vue';

    export default {
        data() {
            return {};
        },
        computed: {
            ...mapState({
                needTagsView: state => state.settings.tagsView,
                showBreadcrumb: state => state.settings.showBreadcrumb
            }),
            ...mapGetters(['sidebar']),
            cachedViews() {
                return this.$store.state.tagsView.cachedViews;
            },
            key() {
                return this.$route.fullPath;
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                };
            }
        },
        components: {
            TagsView,
            vSidebar,
            vBreadcrumb
        }
    };
</script>
