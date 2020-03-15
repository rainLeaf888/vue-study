import Vue from 'vue'
// import App from './App.vue'
import InitComp from './sourceParse/init01'

Vue.config.productionTip = false

// 挂在到元素的入口
// new Vue({
//   render: h => h(App),
//   // render: h => h('div', 'aa'),
//   // template: '<div>template</div>',
// }).$mount('#app')

// new Vue({
//   el: '#app', // 存在此属性，会直接mount挂在，不需要手动mount
//   data: {foo: 'foo'}
// })

new Vue({
  render: h => h(InitComp)
}).$mount('#app');