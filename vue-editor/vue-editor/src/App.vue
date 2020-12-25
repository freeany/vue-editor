<template>
  <div id="app">
   <edit @input="handleInput" @run="handleRun"></edit>
   <show :code="code" ref="show"></show>
  </div>
</template>

<script>
import edit from '@/components/edit'
import show from '@/components/show'
export default {
  name: 'App',
  components: {
    edit,
    show
  },
  data() {
    return {
      code: ''
    }
  },
  methods: {
    handleInput(v) {
      // console.log(v, 'cccc')
      this.code = v
    },
    handleRun() {
      this.$refs.show.run()
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html,body,#app{
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  &>div {
    width: 50%;
    height: 100%;
  }
}
</style>
