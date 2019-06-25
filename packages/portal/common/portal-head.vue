<template>
    <div class="portal-header">
        <div class="logo-wrapper">
            <router-link :to="{path:'/'}">
                <img src="../assets/img/logo.png" alt="">
            </router-link>
        </div>
        <div class="main-wrapper">
            <ul class="nav-wrapper">
                <li class="nav-item" v-for="(item) in navList" :key="item.name">
                    <router-link class="nav-item-title" :to="{name:item.name}">{{item.meta.title}}</router-link>
                </li>
            </ul>
        </div>
        <div class="avatar-wrapper">
            <img src="../assets/img/avatar.png" alt="" class="avatar">
        </div>
        <div class="user-wrapper">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <span class="title" v-if='userInfo'>{{userInfo.nickName}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapState } from 'vuex';

    export default {
        mounted() {
            const matched = this.$route.matched;
            const rootName = matched[0].name;
            const root = this.routers.filter(item => item.name === rootName)[0];
            const navList = root.children || [];
            if (this.hasTopRoute) {
                this.navList = navList.filter(item => item.meta.top === true);
            }
        },
        data() {
            return {
                navList: []
            };
        },
        computed: {
            ...mapState({
                hasTopRoute: state => state.settings.hasTopRoute
            }),
            ...mapGetters(['userInfo', 'routers'])
        },
        methods: {
            handleLogout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload(true);
                });
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command === 'logout') {
                    this.handleLogout();
                }
            }
        }
    };
</script>
<style scoped>
</style>
