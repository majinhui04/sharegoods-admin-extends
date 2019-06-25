<template>
    <div class="sidebar-item-content" >
        <i :class="icon" class="svg-icon"></i><span class="title">{{title}}</span>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            }
        }
    };
</script>
