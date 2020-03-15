<template>
  <div>
    value:{{foo.bar}}
  </div>
</template>

<script>
  export default {
    name: 'init',
    data() {
      return {foo: {bar: 'foo'}};
    },
    mounted() {
      setTimeout(() => {
        this.foo.bar = 'f0000000';
      }, 1000)
    }
  }
</script>

<style lang="scss" scoped>

</style>