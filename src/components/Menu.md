A menu - NOT OFFICIAL

```js
const Vue = require('vue').default
const MenuItem = require('./MenuItem.vue').default
Vue.component('MenuItem', MenuItem)

<Menu message="Hello">
	<MenuItem>Item</MenuItem>
	<MenuItem>Hello</MenuItem>
	<MenuItem>Another</MenuItem>
	<MenuItem align="left">RESQ</MenuItem>
	<MenuItem align="right">Language</MenuItem>
</Menu>
```
