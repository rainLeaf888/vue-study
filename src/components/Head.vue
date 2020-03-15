<script>
  export default {
    props: {
      level: {
        type: String,
        default: '1'
      },
      title: {
        type: String
      }
    },
    render(h) {
      return h(`h${this.level}`, {
        attrs: {
          title: this.title
        }
      }, this.$slots.default);
    }
  }
</script>