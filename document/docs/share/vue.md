## 前言
本文主要介绍日常项目开发过程中的一些技巧，帮助大家规避错误的同时还能提高应用的性能。以下是我总结一些平时工作中的经验。



```html
<template>
<div>
<!-- 在双花括号中 -->
    <div>{{ myData | filterName}}</div>
    <div>{{ myData | filterName('a')}}</div>
    <!-- 在 v-bind 中 -->
    <div v-bind:id="rawId | formatId"></div>
</div>
</template>
<script>
    export default {
        data(){
            return {
                myData:'',
                rawId:''
            }
        },
        filters:{
            filterName(value){
                return value
            },
            formatId(value){
                return value
            }
        }
    }
    
</script>
```