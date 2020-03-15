# vue 源码解析

## vue 组件创建是自上而下，挂在组件是自下而上

## 一、入口 根据package.json 的script dev 配置得到入口文件地址：/src/platforms/web/entry-runtime-with-compiler.js

   优先级：render > template > el
   ```
     new Vue({
       el: '#app', // 直接获取选择器值作为内容
       data: {foo: 'aa'}
     })
   ```
   ```
     new Vue({
       // template: '<div>template</div>', // 需要使用$mount 收到挂在
       render: h => h('div', 'aa')
     }).$mount('#app')
   ```
   如果template存在，编译得到render 函数.

   ## 二、定义$mount /src/platforms/web/runtime/index.js

   ```
   // public mount method
    Vue.prototype.$mount = function (
      el?: string | Element,
      hydrating?: boolean
    ): Component {
      el = el && inBrowser ? query(el) : undefined
      // 初始化，将首次渲染的结果替换el
      return mountComponent(this, el, hydrating)
    }
   ```

   ## 三、初始化全局api /src/core/index.js

  1. initUse(Vue) // Vue.use 插件
  2. initMixin(Vue) // mixin 混入

  ## 定义Vue 构造函数 /src/core/instance/index.js

  ```
  function Vue (options) {
    this._init(options) // 通过initMixin添加的方法
  }
  initMixin(Vue) // Vue.proptype上添加_init 方法
  stateMixin(Vue) // $set,$delete, $watch
  eventsMixin(Vue) // $emit, $on, $off, $once
  lifecycleMixin(Vue) // _update, $forceUpdate, $destroy
  renderMixin(Vue) // _render, $nextTick
  ```

  ## 四、初始化方法 _init定义 (initMixin) /src/core/instance/init.js

  ```
  export function initMixin (Vue) {
     Vue.prototype._init = function (options) {
      // 合并选项
      if (options && options._isComponent) {
        initInternalComponent(vm, options)
      } else {
        vm.$options = mergeOptions(
          resolveConstructorOptions(vm.constructor),
          options || {},
          vm
        )
      }
      // 初始化生命周期，事件
      initLifecycle(vm) //  标记$parent, $root, $children, $refs
      initEvents(vm) // 对父组件传入的事件添加和监听
      initRender(vm) // 声明$slot, $scopedSlots,$createElment (即render中的h函数)
      callHook(vm, 'beforeCreate')
      initInjections(vm) // resolve injections before data/props
      initState(vm) // 重要，数据响应化处理
      initProvide(vm) // resolve provide after data/props
      callHook(vm, 'created')
     }
  }
  ```
  ## 五、描述如何将一个data:{foo: '1'} foo 值，替换模版中{{foo}}
  new Vue() => _init() => $mount => mountComponent =》updateComponent =》 _render => _update


  1. new Vue(): 创建Vue实例，调用_init
  2. _init() : 初始化各种属性，事件
  3. $mount: 调用mountComponent函数
  4. mountComponent: 定义updateComponent方法，创建Watcher
  5. updateComponent：Watcher的getter 方法触发, 执行_update
  6. _render: 得到虚拟dom
  7. _update: 把虚拟dom替换为真实dom (其中__patch__虚拟dom diff)



  # 响应式解析

  ## /vue/src/core/instance/state.js  initState方法
  initData 数据初始化及响应化
  ```
   function initData () {
     // data 数据代理到vm上
     proxy(vm, `_data`, key)
     // 数据响应处理
    observe(data, true /* asRootData */)
   }
  ```

  ```
  // 每个响应式对象都会有一个ob
  export class Observer {
    constructor (value: any) {
    this.value = value
    // 不能响应化对象的父对象，但对象中属性添加或删除需要更新
    // object对象有新增或删除属性 $set；array中有变更方法
    // 上述只要有变更即更新
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  }
  ```

