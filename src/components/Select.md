A select.
```js
const Vue = require('vue').default
const Plus = require('vue-material-design-icons/Plus.vue').default
Vue.component('Plus', Plus)
let val = false
<div>
Value: {{val}}
    <Select v-model='val' :items="[{label: 'Yes', value: true}, {label: 'No', value: false}]"></Select>

<Select v-model='val' label="Disabled" :items="[{label: 'Yes', value: true}, {label: 'No', value: false}]" disabled="disabled"></Select>

</div>
```
