<template>
  <div @click="handleClick" class="div">
    hello world
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        alert('123')
      }
    }
  }
</script>
<style>
  .div {
   color: red 
  }
</style>