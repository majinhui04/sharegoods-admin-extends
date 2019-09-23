## 编辑器配置
- 用四个空格代替制表符（soft-tab 即用空格代表 tab 符）
- 设置文件编码为 UTF-8

```bash
root = true
[*]
charset = utf-8
indent_style = space
indent_size = 4
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[*.py]
indent_size = 4
```

## HTML
- 用四个空格来代替制表符（tab） 
- 对于属性的定义，确保全部使用双引号，绝不要使用单引号
- 字符编码 `<meta charset="UTF-8">`

## JavaScript

#### 代码规范

- 不允许出现多余变量
- 使用空格代替tab。1 tag => 4 space
- 函数以及变量使用驼峰式命名，函数前缀应当为动词(`has,is,get,set,load`)，常量全部大写(可以使用下划线`_`,比如`MAX_COUNT`)
- 杜绝`var`。定义变量请使用`let`或者`const`
- 优先使用箭头函数
- 语句以分号结尾



#### 关于字符串
在处理多行字符串时，模板字符串比复杂的拼接字符串要表现的更出色。



```javascript
// bad
function sayHi(name) {
 return 'How are you, ' + name + '?';
}
// good
function sayHi(name) {
 return `How are you, ${name}?`;
}
```

请使用单引号
```javascript
// bad
let directive = "No identification of self or mission."
// good
let directive = 'No identification of self or mission.';
```

#### 关于对象

定义对象
```javascript
// bad
let value = 1
const atom = {
    'foo':3,
    'data-blah':5,
    value:value,
    addValue:function(val) {
        return atom.value + val;
    }
};
// good
const atom = {
    foo:1,
    'data-blah':5,
    value,
    addValue(val) {
        return atom.value +val
    }
}
```

copy对象
```javascript
// very bad
const original = { a:1,b:2 };
const copy = Object.assign( original ,{ c:3 });
delete copy.a ; // 

// normal 
const original = { a:1,b:2 }
const copy = Object.assign( {},original,{ c:3 });

// good  !!!!!
const original = { a:1,b:2}
const copy = { ...original, c:3 }; // copy => { a:1,b:2,c:3 }
const { a, ...noA } = copy;  // noA => { b:2 ,c:3 }


// bad 
const len = items.length;
const itemsCopy = [];
let i;
for( i=0;i<len;i++ ){
    itemsCopy = items[i];
}
// good
const itemsCopy = [...items];


```

Classes & Constructors 类的构造函数

```javascript
//bad
function Queue(contents = []){
    this.queue = [...contends];
}
Queue.prototype.pop = function(){
    const value = this.queue[0];
    this.queue.splice(0,1);
    return value;
};

// good
class Queue {
    constructor( contents = [] ){
        this.queue = [...contents];
    }
    pop(){
        const value = this.queue[0];
        this.queue,splice(0,1);
        return value;
    }
}
```


#### 关于注释
```javascript

// 测试函数
function foo() {
  // Do Something
}

/**
* 合并Grid的行
* @param {Grid} grid 需要合并的Grid
* @param {Array} cols 需要合并列的Index(序号)数组；从0开始计数，序号也包含。
* @param {Boolean} isAllSome 是否2个tr的cols必须完成一样才能进行合并。true：完成一样；false(默认)：不完全一样
* @return void
* @author polk6 2015/07/21 
*/
function mergeCells(grid, cols, isAllSome) {
    // Do Something
}
```

|注释名|语法|含义|示例|
|--|---|---|----|
|@param|@param 参数名 {参数类型}  描述信息|描述参数的信息|@param name {String} 传入名称|
|@return|@return {返回类型} 描述信息|描述返回值的信息|@return {Boolean} true:可执行;false:不可执行|
|@author|@author 作者信息 [附属信息：如邮箱、日期]|描述此函数作者的信息|@author 张三 2015/07/21 |
|@example|@example 示例代码|演示函数的使用|@example setTitle('测试')|

#### eslint规范
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


## CSS
- 四个空格来代替制表符（tab） 
- 十六进制值应该全部小写，例如，`#fff`
- 为选择器中的属性添加双引号，例如，`input[type="text"]`
- 避免为 0 值指定单位，例如，用 `margin: 0`; 代替 `margin: 0px`;
- 不要使用 @import

#### 选择器
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

#### 最佳实践

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
#### 统一语义理解和命名
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
