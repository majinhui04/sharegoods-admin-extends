<template>
    <div class="footer-nav">
    </div>
</template>

<style lang="scss">
    .footer-nav {
        padding: 40px 0;
        color: #333;
        font-size: 14px;

        &::after {
            content: '';
            display: block;
            clear: both;
        }

        & i {
            transition: .3s;
            color: #999;
            vertical-align: baseline;
        }
    }

    .footer-nav-link {
        cursor: pointer;
        transition: .3s;

        &:hover {
            color: #409EFF;

            & i {
                color: #409EFF;
            }
        }
    }

    .footer-nav-left {
        float: left;
        margin-left: -4px;
    }

    .footer-nav-right {
        float: right;
        margin-right: -4px;
    }
</style>

<script>
</script>
