<template>
    <footer class="footer" style="display: none">
        <div class="container">
            <div class="footer-main">
                <h4>{{ langConfig.links }}</h4>
                <a href="https://github.com/ElemeFE/element" class="footer-main-link" target="_blank">{{ langConfig.repo
                    }}</a>
            </div>
            <div class="footer-main">

            </div>
            <div class="footer-social">
                <p class="footer-social-title"></p>
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
    .footer {
        background-color: #F7FBFD;
        width: 100%;
        padding: 40px 150px;
        margin-top: -340px;
        box-sizing: border-box;
        height: 140px;

        .container {
            box-sizing: border-box;
            width: auto;
        }

        .footer-main {
            font-size: 0;
            display: inline-block;
            vertical-align: top;
            margin-right: 110px;

            h4 {
                font-size: 18px;
                color: #333;
                line-height: 1;
                margin: 0 0 15px 0;
            }

            .footer-main-link {
                display: block;
                margin: 0;
                line-height: 2;
                font-size: 14px;
                color: #666;

                &:hover {
                    color: #333;
                }
            }
        }

        .footer-social {
            float: right;
            text-align: right;

            .footer-social-title {
                color: #666;
                font-size: 18px;
                line-height: 1;
                margin: 0 0 20px 0;
                padding: 0;
                font-weight: bold;
            }

            .elementdoc {
                transition: .3s;
                display: inline-block;
                line-height: 32px;
                text-align: center;
                color: #c8d6e8;
                background-color: transparent;
                size: 32px;
                font-size: 32px;
                vertical-align: middle;
                margin-right: 20px;
                &:hover {
                    transform: scale(1.2);
                    color: #8D99AB;
                }
            }

            .doc-icon-gitter {
                margin-right: 0;
            }
        }
    }

    .el-popover.footer-popover {
        padding: 0;
        min-width: 120px;
        line-height: normal;
        box-shadow: 0 0 11px 0 rgba(174, 187, 211, 0.24);

        .footer-popover-title {
            border-bottom: solid 1px #eaeefb;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #99a9bf;
            background-color: #f8f9fe;
        }

        img {
            size: 100px;
            margin: 10px;
        }
    }

    @media (max-width: 1140px) {
        .footer {
            height: auto;
        }
    }

    @media (max-width: 1000px) {
        .footer-social {
            display: none;
        }
    }

    @media (max-width: 768px) {
        .footer {
            .footer-main {
                margin-bottom: 30px;
            }
        }
    }
</style>

<script type="text/babel">
    import compoLang from '../i18n/component.json';
    import Element from 'element-ui';

    const { version } = Element;

    export default {
        data() {
            return {
                version
            };
        },

        computed: {
            lang() {
                return 'zh-CN';
            },

            langConfig() {
                return compoLang.filter(config => config.lang === this.lang)[0]['footer'];
            },

            gitterLink() {
                return this.lang === 'zh-CN' ? 'https://gitter.im/ElemeFE/element' : 'https://gitter.im/element-en/Lobby';
            }
        }
    };
</script>
