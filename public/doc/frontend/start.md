# 入坑指南
在开发之前需要你至少已经会使用 `Vue`，同时需要你大概了解 `Node.js`，`npm`，`cnpm`，`yarn` 这些东西

<p class="warning">
  <b>敲黑板</b>：文档中命令行未备注则默认是linux系统
</p>


## 环境搭建

#### 安装NodeJs

<p class="tip">
  建议 Node.js 版本在 8.0.0 以上
</p>

1、去[官网](https://nodejs.org/en/download/)下载和自己系统匹配的文件：
通过`uname -a`命令查看到我的系统位数（备注：x86_64表示64位系统， i686 i386表示32位系统)
[64位Linux v8.11.3下载地址](https://nodejs.org/dist/v8.11.3/node-v8.11.3-linux-x64.tar.xz)

2、下载下来的tar解压，然后通过建立软连接变为全局；
解压后的文件我这边将名字改为了nodejs，这个解压地方随意（比如`/usr/software`），只要在建立软连接的时候写正确就可以

```bash
cd /usr/software
tar xvf node-v8.11.3-linux-x64.tar.xz  
mv node-v8.11.3-linux-x64  nodejs
```

3）配置命令

方法一、建立软连接，变为全局

```bash
ln -s /usr/software/nodejs/bin/npm /usr/local/bin/ 
ln -s /usr/software/nodejs/bin/node /usr/local/bin/
```

方法二、配置全局变量(注：Linux 里面是 .bashrc 而 Mac 是 .bash_profile)

```bash
vim ~/.bash_profile
```
在末尾新增

```bash
export PATH=$PATH:/usr/software/nodejs/bin
```
保存退出`:wq`

运行生效
```bash
source ~/.bash_profile
```

4）最后一步检验nodejs是否已变为全局

```bash
node -v
```

> ~/.bash_profile: 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!默认情况下,他设置一些环境变量,执行用户的.bashrc文件.

#### 安装GIT

MAC可以使用第三方包管理器 HomeBrew

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
开始安装git
```bash
brew install git
```

Linux 可以用自带的yum

```bash
yum install git
```
window
[下载地址](https://git-scm.com/)


项目根目录下配置`.gitignore`

```
.DS_Store
*.log
tmp/
node_modules/
dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
yarn.lock

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln

```

  
#### 配置NPM

npm最容易产生的就是网络问题,我们可以在每次npm下载的时候指定registry，比如
```bash
npm install --registry=https://registry.npm.taobao.org
```
(淘宝npm)[https://npm.taobao.org/]


#### 推荐IDE

##### WebStorm
[官网地址](https://www.jetbrains.com/webstorm/)
[注册码](http://idea.lanyus.com/)

统一编辑器格式

```
# http://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 4
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
insert_final_newline = false
trim_trailing_whitespace = false
```
> 项目根目录下新增文件`.editorconfig`

## 开发规范

#### 基本规范

- 所有文件的编码格式统一为`UTF-8`
- 换行格式为`LF`
- `tag`转为`space`，默认间隔4个空格

#### GIT

###### 命名

- 分支功能命名使用snake case命名法，即下划线命名
- 分支类型包括：feature、bugfix、refactor三种类型，即新功能开发、bug修复和代码重构
- 分支版本命名规则：比如：ops_v_1_1_0_feature_oeprator
- Tag包括3位版本，前缀使用v。比如v1.2.31。核心基础库或者大版本发布使用第一位,新功能开发使用第2位版本号，bug修复使用第3位版本号


###### 日志

每次提交，Commit message 都包括三个部分：header，body 和 footer。
其中，header 是必需的，body 和 footer可以省略。不管是哪一个部分，任何一行都不得超过72个字符（或100个字符）。这是为了避免自动换行影响美观。

> Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

type代表某次提交的类型，比如是修复一个bug还是增加一个新的feature。所有的type类型如下
- feat： 新增feature
- fix: 修复bug
- docs: 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等
- style: 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑
- refactor: 代码重构，没有加新功能或者修复bug
- perf: 优化相关，比如提升性能、体验
- test: 测试用例，包括单元测试、集成测试等
- chore: 改变构建流程、或者增加依赖库、工具等
- revert: 回滚到上一个版本

```
# 标题行：50个字符以内，描述主要变更内容
#
# 主体内容：更详细的说明文本，建议72个字符以内。 需要描述的信息包括:
#
# * 为什么这个变更是必须的? 它可能是用来修复一个bug，增加一个feature，提升性能、可靠性、稳定性等等
# * 他如何解决这个问题? 具体描述解决问题的步骤
# * 是否存在副作用、风险? 
#
# 尾部：如果需要的化可以添加一个链接到issue地址或者其它文档，或者关闭某个issue。
```
> 参考[Commitizen](https://github.com/commitizen/cz-cli)来添加提交消息格式。

###### 生成 Change log
如果你的所有 Commit 都符合 Angular 格式，那么发布新版本时， Change log 就可以用脚本自动生成。生成的文档包括以下三个部分：

- New features
- Bug fixes
- Breaking changes

每个部分都会罗列相关的 commit ，并且有指向这些 commit 的链接。当然，生成的文档允许手动修改，所以发布前，你还可以添加其他内容。

[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) 就是生成 Change log 的工具，运行下面的命令即可。

```bash
$ npm install -g conventional-changelog-cli
$ cd my-project
$ conventional-changelog -p angular -i CHANGELOG.md -w
```

#### JAVASCRIPT
遵循eslint规范

> 项目根目录新增`.eslintrc.js`

```javascript
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'accessor-pairs': 1,
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    'curly': [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 1,
    'eqeqeq': [2, 'allow-null'],
    'generator-star-spacing': [2, {
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'],
    'indent': [2, 4, {
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 2,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 1,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [1, {
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [1, {
      'initialized': 'never'
    }],
    'operator-linebreak': [2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [1, 'always'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [1, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'],
    'prefer-const': 1,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [1, 'always', {
      objectsInObjects: false
    }],
    'array-bracket-spacing': [2, 'never']
  }
}

```

> 项目根目录新增`.eslintignore`

```
dist
```

#### CSS

###### 尽量使用类选择器，放弃ID选择器
ID在一个页面中的唯一性导致了如果以ID为选择器来写CSS，就无法重用。

###### 分类的命名方法：使用单个字母+"-"为前缀
布局（grid）（.g-）；模块（module）（.m-）；元件（unit）（.u-）；功能（function）（.f-）；皮肤（skin）（.s-）；状态（.z-）。

<p class="tip">
注：在你样式中的选择器总是要以上面前五类开头，然后在里面使用后代选择器。

　　如果这五类不能满足你的需求，你可以另外定义一个或多个大类，但必须符合单个字母+"-"为前缀的命名规则，即 .x- 的格式。
</p>

###### 后代选择器命名

- 约定不以单个字母+"-"为前缀且长度大于等于2的类选择器为后代选择器，如：.item为m-list模块里的每一个项，.text为m-list模块里的文本部分：.m-list .item{}  .m-list .text{}。
- 一个语义化的标签也可以是后代选择器，比如：.m-list li{}。
- 不允许单个字母的类选择器出现，原因详见下面的“模块和元件的后代选择器的扩展类”。

```css
/* 这里的.itm和.cnt只在.m-list中有效 */
.m-list{margin:0;padding:0;}
.m-list .itm{margin:1px;padding:1px;}
.m-list .cnt{margin-left:100px;}
/* 这里的.cnt和.num只在.m-page中有效 */
.m-page{height:20px;}
.m-page .cnt{text-align:center;}
.m-page .num{border:1px solid #ddd;}
```

###### 命名应简约而不失语义
```css
/* 反对：表现化的或没有语义的命名 */
.m-abc .green2{}
.g-left2{}
/* 推荐：使用有语义的简短的命名 */
.m-list .wrap2{}
.g-side2{}
```

###### 相同语义的不同类命名
方法：直接加数字或字母区分即可（如：.m-list2、.m-list3、.m-list-news、.m-list-banner等，都是列表模块，但是是完全不一样的模块）。

其他举例：.f-fw0、.f-fw1、.s-fc0、.s-fc1、.m-logo2、.m-logo3、u-btn、u-btn2等等。


###### 模块和元件的扩展类的命名方法
当A、B、C、...它们类型相同且外形相似区别不大，那么就以它们中出现率最高的做成基类，其他做成基类的扩展。

方法：+“-”+数字或字母（如：.m-list的扩展类为.m-list-1、.m-list-2等）。
补充：基类自身可以独立使用（如：class="m-list"即可），扩展类必须基于基类使用（如：class="m-list m-list-2"）。

###### 最佳实践

```css
/* 这是某个模块 */
.m-nav{}/* 模块容器 */
.m-nav li,.m-nav a{}/* 先共性  优化组合 */
.m-nav li{}/* 后个性  语义化标签选择器 */
.m-nav a{}/* 后个性中的共性 按结构顺序 */
.m-nav a.a1{}/* 后个性中的个性 */
.m-nav a.a2{}/* 后个性中的个性 */
.m-nav .z-crt a{}/* 交互状态变化 */
.m-nav .z-crt a.a1{}
.m-nav .z-crt a.a2{}
.m-nav .btn{}/* 典型后代选择器 */
.m-nav .btn-1{}/* 典型后代选择器扩展 */
.m-nav .btn-dis{}/* 典型后代选择器扩展（状态） */
.m-nav .btn.z-dis{}/* 作用同上，请二选一（如果可以不兼容IE6时使用） */
.m-nav .m-sch{}/* 控制内部其他模块位置 */
.m-nav .u-sel{}/* 控制内部其他元件位置 */
.m-nav-1{}/* 模块扩展 */
.m-nav-1 li{}
.m-nav-dis{}/* 模块扩展（状态） */
.m-nav.z-dis{}/* 作用同上，请二选一（如果可以不兼容IE6时使用） */
```
###### 统一语义理解和命名
布局（.g-）

|语义|命名|
|---|-----|
|文档|doc|
|头部|head|
|主体|body|
|尾部|foot|
|主栏|main|
|主栏子容器|mainc|
|侧栏|side|
|侧栏主容器|sidec|
|盒容器|wrap/box|

模块（.m-）、元件（.u-）

|语义|命名|
|---|-----|
|导航|nav|
|子导航|subnav|
|面包屑|crumb|
|菜单|menu|
|选项卡|tag|
|标题区|headline|
|内容区|content|
|列表|list|
|表格|table|
|表单|form|
|热点|hot|
|排行|top|
|登录|login|
|标志|logo|
|广告|advertise|
|搜索|search|
|幻灯|slide|
|提示|tips|
|帮助|help|
|新闻|news|
|下载|download|
|注册|regist|
|投票|vote|
|版权|copyright|
|结果|result|
|按钮|button|
|输入|input|


## 感谢

- 世界上最好的语言 `JavaScript`
- 啥都能做的前端构建工具 [Webpack](https://webpack.js.org/)
- 简单好用的文档展示工具 [Docute](https://v3.docute.org/)



