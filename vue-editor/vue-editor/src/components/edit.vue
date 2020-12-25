<template>
  <div class="edit">
    <div class="edit-list">
      <button @click="run">运行</button>
      <button>清空</button>
    </div>
    <div class="edit-box">
      <textarea :value="code" @input="handleInput" @keydown.9.prevent="handleTab"></textarea>
    </div>
  </div>
</template>

<script>
  export default {
      data () {
        return {
          code: ''
        }
      },
      methods: {
        handleInput(e) {
          this.code = e.target.value
          this.$emit('input', this.code)
        },
        // 因为tab键会切换光标
        handleTab(e) {
          console.log('用户按住了tab键')
        },
        run() {
          this.$emit('run')
        }
      }
  }
</script>
<style lang="less" scoped>
  .edit {

    .edit-list {
      padding: 10px;

      button {
        height: 40px;
        width: 80px;
        margin: 5px;
      }
      background-color: #cccccc;
    }
    .edit-box {
      position: absolute;
      top: 60px;
      bottom: 0;
      left: 0;
      right: 0;
      width: 50%;
      textarea {
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>