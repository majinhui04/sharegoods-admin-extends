# npm 常用命令
1. npm view moduleNames 或 npm info moduleNames：查看模块的注册信息
2. npm list 或 npm ll 或 npm la 或 npm l：查看所有已经安装的模块
3. npm list parseable=true: 可以目录的形式来展现当前安装的所有 node 包
4. npm help：查看帮助命令
5. npm view moudleName dependencies：查看包的依赖关系
6. npm view moduleName repository.url：查看包的源文件地址
7. npm view moduleName engines：查看包所依赖的 Node 的版本
8. npm help folders：查看 npm 使用的所有文件夹
9. npm rebuild moduleName：用于更改包内容后进行重建
10. npm outdated：检查包是否已经过时，此命令会列出所有已经过时的包，可以及时进行包的更新，推荐使用检查依赖包更强大的一个工具[npm-check](https://www.npmjs.com/package/npm-check)
11. npm update moduleName 或 npm update -g：更新已经安装的模块(或全局的模块)
12. npm uninstall moudleName：卸载 node 模块
13. npm help json: 访问 npm 的 json 文件夹,此命令会以默认的方式打开一个网页，如果更改了默认打开程序则可能不会以网页的形式打开
14. npm search packageName:检验某个包名是否已存在
15. npm init：创建一个 package.json 文件，包括名称、版本、作者这些信息等
16. npm root：查看当前包的安装路径
17. npm root -g：查看全局的包的安装路径
18. npm config ls -l：查看和管理 npm 的基础配置
19. npm list --depth=0: 查看项目中安装哪些模块
20. npm list --depth --global: 查看全局安装了哪些工具
21. npm list moduleNames： 查看某个模块是否安装了
    >
# 参考资料
> [npm 常见问题小结](https://segmentfault.com/a/1190000013585195)
# 更多关于 npm 资料可参考
> [npm 的 package.json 中文文档](https://github.com/ericdum/mujiang.info/issues/6/)
> 
> [npm](https://cloud.tencent.com/developer/chapter/18110)
