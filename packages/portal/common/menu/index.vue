<template>
    <el-menu class="sidebar-el-menu"
             :default-active="$route.name"
             :collapse="collapse"
             background-color="#FFFFFF"
             text-color="#8492A6"
             active-text-color="#1F2D3D"
             unique-opened
             :default-openeds="openeds"
    >
        <!--<sidebar-item v-for="(item) in items" :key="item.name" :item="item" :need-query="needQuery"/>-->
        <template v-for="item in list">
            <template v-if="item.children && item.children.length">
                <el-submenu :index="item.index" :key="item.index">
                    <template slot="title">
                        <i :class="item.icon" class="icon"></i><span slot="title">{{ item.title }}</span>
                    </template>
                    <template v-for="subItem in item.children">
                        <!---->
                        <el-submenu v-if="subItem.children && subItem.children.length" :index="subItem.index"
                                    :key="subItem.index">
                            <template slot="title"><i :class="subItem.icon" class="icon"></i>{{ subItem.title }}
                            </template>
                            <el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.index">
                                <i :class="threeItem.icon" class="icon"></i> {{ threeItem.title }}
                            </el-menu-item>
                        </el-submenu>
                        <app-link v-else :to="subItem.name" :title="subItem.title" :need-query="needQuery"
                                  :key="subItem.index">
                            <el-menu-item :index="subItem.index" :key="subItem.index">
                                <i :class="subItem.icon" class="icon"></i> {{ subItem.title }}
                            </el-menu-item>
                        </app-link>
                    </template>
                </el-submenu>
            </template>
            <template v-else>
                <app-link :to="item.name" :title="item.title" :need-query="needQuery" :key="item.index">
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon" class="icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </app-link>
            </template>
        </template>
    </el-menu>
</template>

<script>
    import bus from '../bus';
    import AppLink from './link';

    export default {
        components: { AppLink },
        props: {
            needCollapse: {
                type: Boolean,
                default: false
            },
            openeds: {
                type: Array,
                default() {
                    return [];
                }
            },
            // route object
            needQuery: {
                type: Boolean,
                default: false
            },
            items: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                list: [],
                collapse: false
            };
        },
        mounted() {
            const items = this.items;
            items.forEach(item => {
                const meta = item.meta || {};
                item.title = item.title || meta.title || '';
                item.icon = item.icon || meta.icon || '';
                item.index = item.name;
                item.children && item.children.forEach(item => {
                    const meta = item.meta || {};
                    item.title = item.title || meta.title || '';
                    item.icon = item.icon || meta.icon || '';
                    item.index = item.name;
                    item.children && item.children.forEach(item => {
                        const meta = item.meta || {};
                        item.title = item.title || meta.title || '';
                        item.icon = item.icon || meta.icon || '';
                        item.index = item.name;
                    });
                });
            });
            this.list = items;
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                if (this.needCollapse) {
                    this.collapse = msg;
                }
            });
        },
        methods: {}
    };
</script>

<style scoped>

</style>
