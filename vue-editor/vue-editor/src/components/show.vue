<template>
  <div>
    <h1>代码运行结果</h1>
    <div class="result-title">这里是最终的运行结果</div>
    <div class="component" ref="show"></div>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    getSource(type) {
      const reg = new RegExp(`<${type}[!>]*>`); // 匹配到开始标签
      let code = this.code;
      let matches = code.match(reg); // 匹配到template / script / style标签
      // console.log(matches[0])
      // 思路： 找到当前标签  然后加上标签的length 与 封口标签之间的字符， 使用code进行slice截取该标签
      if (matches) {
        let tag = matches[0];
        return code.slice(
          code.indexOf(tag) + tag.length,
          code.lastIndexOf(`</${type}>`)
        );
      }
    },
    run() {
      // console.log('run...')
      // 实现一个.vue的编辑器
      // 1. 获取模版中的 template / js / css
      const template = this.getSource("template");
      const script = this.getSource("script").replace(
        /export default/,
        "return"
      );
      const style = this.getSource("style");
      // console.log(template, script, style)
      // 拿到 template / js / style 的字符串形式 之后做什么呢？

      // 需要动态的加载一个组件， 组件就是一个对象，  对象里面包含 数据， render函数， 生命周期 方法
      // 目的是将这个comoment对象变为 { template: 'xx', data: xx } 这样一个对象，让comiler可以解析
      let component = {};
      if (script) {
        component = new Function(script)(); // 讲一个字符串形式的js表达式 进行执行。
      }
      if (template) {
        component.template = template;

        // 手动挂载组件，这里需要将执行后的组件 手动挂载到.component 盒子中。
        // 使用extends方法    这里的this.$options._base  指代的就是大Vue
        let vueComponent = new (this.$options._base.extend(component)); // 变成一个vue 组件
        // console.log(vueComponent)
        this.$refs.show.appendChild(vueComponent.$mount().$el); // 挂载之后模版编译成一个对象，$el中就是该模版对象所指代的dom
      }

      if (style) {
        let element = document.createElement("style");
        element.type = "text/css";
        element.innerText = style;
        document.body.appendChild(element);
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>