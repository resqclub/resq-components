A button.
```js
const Vue = require('vue').default
const Plus = require('vue-material-design-icons/Plus.vue').default
Vue.component('Plus', Plus)

<div>
    <Button>Normal</Button>
    <Button disabled="disabled">Disabled</Button>
    <Button disabled="disabled"><Plus/> With icon</Button>
</div>
```
