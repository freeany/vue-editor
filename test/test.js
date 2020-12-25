let compiler = require('vue-template-compiler')

let t = `<div v-if="true">hello</div>
        <div v-else>world</div>`

console.log(compiler.compile(t).render)

