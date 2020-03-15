<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" @add="cartAdd($event)" />
    <span>{{msg}}</span>
    <ul v-if="isShow">
      <li v-for="v in arr" :key="v.code">{{v.name}}</li>
    </ul>
    <button @click="handleOk">show</button>
    <input v-focus />
    <Head :title="title" level="3">{{title}}</Head>
    <div>{{foo}}</div>
    <p v-for="v in numbers" :key={v}>{{v}}</p>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Head from './components/Head.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Head,
  },
  data(){
    return {
        msg: '',
        arr: [{name: 'aaa', code: '1'}, {name:'bbb', code: '2'}],
        isShow: false,
        title: '开课吧',
        foo: 'foo',
        numbers: [1,2,3],
      };
  },
  mounted() {
    setTimeout(() => {
      this.foo = 'fooooo'; // diff table demo
      // this.numbers.push(4);
    }, 1000)
  },
  methods: {
    cartAdd(evt) {
      this.msg = evt;
    },
    handleOk() {
      this.isShow = !this.isShow;
    }
  },
  // 指令
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
