// Webpack main file

import Button from './components/Button.vue'
import Menu from './components/Menu.vue'

import Vue from 'vue'

new Vue({
	el: '#app',
	render: h => h(Button, 'It works!')
})
