# 开发指南
<p class="warning">
  <b>敲黑板</b>：在开发之前请花一分钟看一下这篇内容
</p>


## 公司

#### 资料
[产品|UI|其他资料](http://172.16.10.251/)

#### 网络

- `MR-Office` 需要运维录入电脑或者手机的MAC地址
- `MR-Guest` 密码:mR12345678

## 基本规范

#### 文件格式

- 所有文件的编码格式统一为`UTF-8`
- 换行格式为`LF`
- `tag`转为`space`，默认间隔4个空格
- 不允许出现多余变量
- 使用空格代替tab。1 tag => 4 space
- 函数以及变量使用驼峰式命名，函数前缀应当为动词(`has,is,get,set,load`)，常量全部大写(可以使用下划线`-`,比如`MAX-COUNT`)
- 杜绝`var`。定义变量请使用`let`或者`const`
- 优先使用箭头函数
- 语句以分号结尾
- 操作数据的时候尽量不要使用长链`res.data.page.size`,如果使用了请兼容数据`null`或者`undefined`的情况

## GIT相关


#### 分支说明

`master`:稳定分支，作为开发分支`develop`的镜像，用于hotfix和备份.

`release`:上试用和生产的发布分支

`develop-v<version>`:迭代分支（develop-v1-0-0-1215）,每次迭代都会重新拉取

`develop-v<version>-<feature>`:功能分支(develop-v1-0-0-feature-login)，这些分支都基于迭代分支`develop-v<version>`，必须保持和它的一致性，在它有变更的时候应当merge并且push


#### 分支命名

- 分支功能命名使用snake case命名法，即下划线命名
- 分支类型包括：feature、bugfix、refactor三种类型，即新功能开发、bug修复和代码重构
- 分支版本命名规则：比如：develop-v1-0-0-feature-login
- Tag包括3位版本，前缀使用v。比如v1.2.31。核心基础库或者大版本发布使用第一位,新功能开发使用第2位版本号，bug修复使用第3位版本号


> codereview: 所有项目相关人员必须对准备上线的新功能进行代码审核，一方面保证代码质量，一方面保证了解新增功能对自己的影响


#### 提交日志

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


## 流程规范

#### 上线流程

- 开发：相关人员创建新的功能分支进行开发
- 提测：提测前需进行`code review`（一方面保证代码质量，一方面保证了解新增功能对其他人的影响）。发送邮件给迭代负责人以及相关人员（尽量详细的填写新开发功能的页面变化、操作流程、可能影响点）
- 测试：完成提测后将分支合并到迭代分支发布到测试环境。
- 试用：将准备上线的功能分支合并到发布分支。在钉钉上提交发布审核。
- 生产：发布后监控数据。将发布分支合并到`master`并打tag
- 稳定：线上稳定以后清理多余的分支。创建下一个迭代分支。






