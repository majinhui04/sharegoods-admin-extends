## 前言
本文主要介绍日常项目开发过程中的一些技巧，帮助大家规避错误的同时还能提高应用的性能。以下是我总结一些平时工作中的经验。

## 妙用Watchers
如果我们需要在组件初始化以及侦听属性变化时调用同一个方法，通常的做法像下面这样

```javascript
watch: {
  myProperty() {
    this.doSomething();
  }
},
created() {
  this.doSomething();
},
methods: {
  doSomething() {
     console.log('doing something...');
  }
}
```

尽管上面这段代码看起来没什么问题，但created钩子里面执行的方法是多余的。我们可以把所需要执行的方法放到watch里面，避免在created钩子里写重复代码，那将会在组件实例化的时候触发多一次。 那如何优化呢？代码如下：

```javascript
watch: {
  myProperty: {
    immediate: true,//表示创建组件时立马执行一次
    handler() {
      console.log('doing something...'); // 只用一次的方法没必要在methods里面声明了
    }
  }
}
```

## 一劳永逸的组件注册
组件使用前，需要引入后再注册：
```javascript
import BaseButton from './baseButton'
import BaseIcon from './baseIcon'
import BaseInput from './baseInput'

export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}
```
现在 BaseButton、 BaseIcon和BaseInput都可以在模板中使用了
```html
<BaseInput
  v-model="searchText"
  @keydown.enter="search"
/>
<BaseButton @click="search">
  <BaseIcon name="search"/>
</BaseButton>
```
但如果组件多了后，每次都要先导入每个你想使用的组件，然后再注册组件，便会新增很多代码量！我们应该如何优化呢？

我们在components文件夹添加一个叫global.js的文件，在这个文件里借助webpack，使用require.context 动态将需要的基础组件统统打包进来。这个方法需要3个参数：要搜索的文件夹目录，是否搜索它的子目录，以及一个匹配文件的正则表达式。

```javascript
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  '.', // 其组件目录的相对路径
  false,  // 是否查询其子目录
  /Base[A-Z]\w+\.(vue|js)$/  // 匹配基础组件文件名的正则表达式
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```
最后我们在main.js文件中import 'components/global.js'，然后我们就可以随时随地使用这些基础组件，无需手动引入了。

## 过滤器让数据处理更便利
Vue.js 允许你自定义过滤器，它的用法其实是很简单，但是可能有些朋友没有用过，接下来我们介绍下：

1. 理解过滤器
  - 功能：对要显示的数据进行特定格式化后再显示。
  - 注意：过滤器并没有改变原本的数据，需要对展现的数据进行包装
  - 使用场景：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。
2. 定义过滤器
可以在一个组件的选项中定义本地的过滤器：
```javascript
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```
也可以在创建 Vue 实例之前全局定义过滤器：
```javascript
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```
3. 使用过滤器
使用方法也简单，即在双花括号中使用管道符(pipeline) |隔开
```html
<!-- 在双花括号中 -->
<div>{{ myData| filterName}}</div>
<div>{{ myData| filterName(arg)}}</div>
<!-- 在 v-bind 中 -->
<div v-bind:id="rawId | formatId"></div>
```
过滤器可以串联：
```html
{{ message | filterA | filterB }}
```

在这个例子中，filterA 被定义为接收单个参数的过滤器函数，表达式 message 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 filterB，将 filterA 的结果传递到 filterB 中。
接下来我们看个如何使用过滤器格式化日期的例子：

```html
<div>
    <h2>显示格式化的日期时间</h2>
    <p>{{ date }}</p>
    <p>{{ date | filterDate }}</p>
    <p>年月日: {{ date | filterDate("YYYY-MM-DD") }}</p>
 </div>
 ......
  filters: {
    filterDate(value, format = "YYYY-MM-DD HH:mm:ss") {
      console.log(this)//undefined 过滤器没有this指向的
      return moment(value).format(format);
    }
  },
  data() {
    return {
      date: new Date()
    };
  }
```

## 能用computed的尽量用computed代替 watch
很多时候页面会出现 watch 的滥用而导致一系列问题的产生，而通常更好的办法是使用 computed 属性

- watch：监测的是属性值， 只要属性值发生变化，其都会触发执行回调函数来执行一系列操作。
- computed：监测的是依赖值，依赖值不变的情况下其会直接读取缓存进行复用，变化的情况下才会重新计算。

除此之外，有点很重要的区别是：计算属性不能执行异步任务，计算属性必须同步执行。也就是说计算属性不能向服务器请求或者执行异步任务。如果遇到异步任务，就交给侦听属性。watch也可以检测computed属性。总而言之，两者的区别归纳为以下两句话：

- computed能做的，watch都能做，反之则不行
- 能用computed的尽量用computed

为啥提倡使用 computed 代替 watch，这是因为有时候可以实现同样的效果，而 computed 会更胜一筹，比如在处理多数据联动的情况下，使用 computed 会更加合理一点。

```html
<template>
    <div>
        <input type="text" v-model="firstName">
        <input type="text" v-model="lastName">
        <span>{{ fullName }}</span>
        <span>{{ fullName2 }}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            fullName2: ''
        }
    },
    
    // 使用 computed
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName
        }
    },
    
    // 使用 watch
    watch: {
        firstName: function(newVal, oldVal) {
            this.fullName2 = newVal + ' ' + this.lastName;
        },
        lastName: function(newVal, oldVal) {
            this.fullName2 = this.firstName + ' ' + newVal;
        },
    }
}
</script>
```

## 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
配合webpack支持的路由懒加载方法有：

- 这种方法比较通用，而且支持性好
```javascript
resolve => require([./Foo], resolve)
```
- 这种写法是官方文档推荐的，如下
```javascript
const Foo = () => import('./Foo')
```

接下来我们以官方文档的写法为例，对比这两种写法：

```javascript
// 非懒加载写法
import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home'
...

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'home',
        component: Home
    }
    ...
  ]
})
```
推荐以下写法，路由懒加载可以帮我们在进入首屏时不用加载过多的资源，从而加快首屏加载速度。

```javascript
// 路由懒加载写法
import Vue from 'vue'
import Router from 'vue-router'

// 其它都不用变，就是这么简单
const Home = () => import('./home')
...

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'home',
        component: Home
    }
    ...
  ]
})
```

## 不要在使用v-for的同一元素上使用v-if
Vue官方文档强烈建议**永远不要把 v-if 和 v-for 同时用在同一个元素上。**一般我们在两种常见的情况下会倾向于这样做：

- 1)为了过滤一个列表中的项目 (比如 v-for="user in users" v-if="user.isActive")。在这种情形下，请将 users 替换为一个计算属性 (比如 activeUsers)，让其返回过滤后的列表(见下面例子)。
```html
// 第一种情形 反例
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
当 Vue 处理指令时，v-for 比 v-if 具有更高的优先级，所以哪怕我们只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，不论活跃用户是否发生了变化。我们可通过将其更换为在如下的一个计算属性上遍历：
```javascript
// 好例子
computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {
      return user.isActive
    })
  }
}
```

```html
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
- 2)为了避免渲染本应该被隐藏的列表 (比如 v-for="user in users" v-if="shouldShowUsers")。这种情形下，请将 v-if 移动至容器元素上 (比如 ul, ol)(见下面例子)。

```html
// 第二种情形 反例
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
更新为：
```html
// 好例子
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```

## 在v-if/v-if-else/v-else中使用key
`如果一组v-if 与v-else的元素类型相同，最好使用属性key`。这是因为Vue2.0引入虚拟DOM,为了避免不必要的DOM操作，虚拟DOM在虚拟节点映射到视图过程中，将虚拟节点与上一次渲染视图所使用的旧虚拟节点做对比，找出真正需要更新的节点来进行DOM操作。但有时如果两个本不相同的节点被识别为相同，便会出现意料之外的问题。我们看下面的一个例子：

```html
// 这种写法会出bug
 <div v-if="flag">
    <label>浪里行舟</label>
    <input  type="text" />
 </div>
 <div v-else>
    <label>前端工匠</label>
    <input  type="text" />
 </div>
 <button @click="flag = !flag">切换</button>
```

如果添加了属性key,那么在对比虚拟DOM时，则会认为它们是两个不同的节点，于是会将旧元素移除并在相同位置添加新元素，从而避免漏洞的出现。

```html
// 最佳写法
 <div v-if="flag">
    <label>浪里行舟</label>
    <input key="1" type="text" />
 </div>
 <div v-else>
    <label>前端工匠</label>
    <input key="2" type="text" />
 </div>
 <button @click="flag = !flag">切换</button>
```

## v-for循环中不推荐index作为key
我们会给列表渲染设置属性key,这个key属性主要用在虚拟DOM算法上，在对比新旧虚拟节点时辨识虚拟节点。但如果key用得不合理，就会出现bug,比如我们使用index作为key(见下面例子),核心代码如下：

```html
<div>
    <Children v-for="(key, index) in list" :key="index">//使用index作为key
      <button @click="() => handleDelete(key)">删除</button>
    </Children>
    <button @click="handleAdd">添加</button>
  </div>
......
   handleAdd() {
      this.list.push(key++);
    },
    handleDelete(key) {
      const index = this.list.findIndex(k => k === key);
      this.list.splice(index, 1);
```

上例中，我们想删除第二个输入框，却误删了第三个输入框，这因为当使用splice()方法删除数组的某个元素时数组的index会被重新索引，造成数组的最后一个index丢失，从而会使虚拟DOM的最后一个结点（key）丢失，造成无论删除哪个结点都会误删除最后一个结点的bug。但如果我们使用传入的key作为key,就可以避免这种问题出现

```html
<div>
    <Children v-for="key in list" :key="key">
      <button @click="() => handleDelete(key)">删除</button>
    </Children>
    <button @click="handleAdd">添加</button>
  </div>
```

## 简单暴力的router key
我们在项目开发时，可能会遇到这样问题:当页面切换到同一个路由但不同参数地址时，比如/detail/1，跳转到/detail/2，页面跳转后数据竟然没更新？路由配置如下：

```javascript
{
     path: "/detail/:id",
     name:"detail",
     component: Detail
 }
```
这是因为vue-router会识别出两个路由使用的是同一个组件从而进行复用，并不会重新创建组件，而且组件的生命周期钩子自然也不会被触发，导致跳转后数据没有更新。那我们如何解决这个问题呢？
我们可以为router-view组件添加属性key,例子如下：

```html
<router-view :key="$route.fullpath"></router-view>
```

这种办法主要是利用虚拟DOM在渲染时候通过key来对比两个节点是否相同，如果key不相同，就会判定router-view组件是一个新节点，从而先销毁组件，然后再重新创建新组件，这样组件内的生命周期会重新触发。

![avatar][doge]

[doge]:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACyElEQVR4AeXBvYqdZRiG0WsetjEgRJBdWElAGIIwhQfgIYQpPY40U9vHkxmmD1gF6ygJgSRETSOCmv/J/p77Mon1zG5evuZd62C73crEiskVkysmV0yumFwxuWJyxeSKyRWTKyZXTK6YXDG5YnLF5IrJFZPbMNDh4SHHx8dc5MGDB5ydnXGZmzdvcuPGDS5yenrKw4cPGWXDQMfHx5ycnHCRe/fucXZ2xmVu3brF0dERl7l9+zajFJMrJldMrphcMblichsG+vdcnj4PCALyniIg8NfuCkdHR1zmn/6Up8+D8pGI8pHA329lpA0D/fRMnt1tWlkiHenAEunI9WtfcefOHS7zw90dT+4udGCJdGSJdKCVP54sjFQMFKGVjnSkAx3pSAut7NORDnSkIx1ooZWORIYqBlLpSAc60JFFaaEjCXtF6MgSaaGVjnRkCUSG2jBQhA4skVZa6UBHlkjLXq10pIWOLJEOdKAjKiMVA0VopZWOLIGOdKQDkb06sAgd6UgHOrIorUSG2jCQyBLpQAc60pFFaKXDXlE60pEl0EorHeiAMlQxUIQOdGSJtNJCRzoS2asDHelAKx1ZAh3pSJSRioF6d05HWmmhA0ukIx1oZZ8oLSxKRzrQkY4sSpZ3jHSw3W5lkPrkKle//Br5n4K8Jwh88/lnnH73LSgqKioqH6h8//Mv3H/xGgHlIwHlPdn9+Qh354yyYaDs3vL691+5yO7FNXz6BSomqKioqER589t9Xr98yVqKlamYoKKioqKisrZiZSoqKioqKioosq5iTYqKioqKioqKytqKlamoqKioqKiooKypWJGAioqKioqKisraipWZoKKioqKiorK2DSt69OoVPz5+zJWDA1AEVD5QeZfw+M0b1nSw3W5lYsXkiskVkysmV0yumFwxuWJyxeSKyRWTKyZXTK6YXDG5YnLF5IrJ/QfMRqNUbCLjawAAAABJRU5ErkJggg==


