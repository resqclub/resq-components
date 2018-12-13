Official button
```js
const Vue = require('vue').default
const ArrowRight = require('vue-material-design-icons/ArrowRight.vue').default
Vue.component('ArrowRight', ArrowRight)

<div>
    <Button>Normal</Button>
    <Button disabled="disabled">Disabled</Button>
    <Button disabled="disabled"><ArrowRight/> With icon</Button>

    <div>
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. <ArrowRight/> It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </div>
</div>
```
