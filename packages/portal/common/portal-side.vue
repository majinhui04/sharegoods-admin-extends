<template>
    <div class="portal-sidebar" style="z-index: 8;">
        <div class="portal-sidebar-content">
            <div class="head" v-if="showSidebarToggle">
                <a href="javascript:void(0)" @click="ToggleSideBar">
                    <i class="icon icon-sidebar-toggle" :class="{'rotate':!sidebar.opened}"></i>
                </a>
            </div>
            <div class="yun-head title" v-if="title">{{title}}</div>
            <div class="main">
                <el-menu
                    class="portal-menu"
                    :default-active="$route.name"
                    :collapse="isCollapse"
                    text-color="#8492A6"
                    unique-opened
                    :collapse-transition="false"
                    mode="vertical"
                >
                    <sidebar-item v-for="route in items" :key="route.name" :item="route"/>
                </el-menu>
            </div>
            <div class="foot">
                <div class="user-message">
                    <img src="https://me.bdp.cn/static/images/user/1-head-pic.png" alt class="avatar">
                    <div class="user-name" v-if="userInfo">{{userInfo.userName}}</div>
                </div>
                <div class="loginout" @click="handleLogout">退出</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from 'vuex';
    import SidebarItem from './menu/sidebar-item';

    export default {
        components: {
            SidebarItem
        },
        data() {
            return {
                collapse: false,
                items: []
            };
        },
        computed: {
            ...mapState({
                title: state => state.settings.title,
                hasTopRoute: state => state.settings.hasTopRoute,
                showSidebarToggle: state => state.settings.showSidebarToggle
            }),
            ...mapGetters(['routers', 'sidebar', 'userInfo']),
            isCollapse() {
                return !this.sidebar.opened;
            }
        },
        methods: {
            // 侧边栏折叠
            ToggleSideBar() {
                this.$store.dispatch('ToggleSideBar');
            },
            // 初始化侧边栏菜单
            initSideRouter() {
                const routers = this.routers;
                const matched = this.$route.matched;
                const rootName = matched[0].name;
                const topName = matched[1].name;
                // 获取根模块
                const root = routers.filter(item => item.name === rootName)[0];
                // 获取顶级模块列表
                const rootChildren = root.children || [];
                // 是否有顶级模块
                // 获取顶级模块
                const top = rootChildren.filter(item => item.name === topName)[0];
                // 获取模块祖级树下的子级列表中菜单
                this.items = this.hasTopRoute ? top.children : rootChildren;
            },
            // 退出
            handleLogout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload(true);
                });
            }
        },
        mounted() {
            this.initSideRouter();
            console.log(this.userInfo);
        }
    };
</script>

<style scoped lang="scss">
    .head {
        height: 40px;
        border-bottom: 1px solid #ddd;
        position: relative;

        .rotate {
            transform: rotateY(180deg) translateY(-50%) !important;
        }
    }

    .icon-sidebar-toggle {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }

    .yun-head .title {
        color: #ffffff;
    }
    .loginout, .user-name {
        color: #ffffff;
    }
</style>
