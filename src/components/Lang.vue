<template>
<span v-if="error"><b style="color: red">{{ error }}</b>
</span>
<span v-else>{{ content }} </span>
</template>
<script>

let langRoot = window.lang

let log = console.log

if (langRoot === undefined) {
	log('Lang: window.lang is not defined')
	langRoot = {}
}

function traverse(root, path) {
	let node = root

	for (let i = 0; i < path.length; i++) {
		let key = path[i]
		node = node[key]
		if (node === undefined) {
			log('Lang: could not find string with id "' + path.join('.') + '"')
			return null
		}
	}
	if (typeof node !== 'string') {
		log('Lang: the string with id "' + path.join('.') + '" is not a string')
		return null
	}
	return node
}

export default {
	props: {
		id: {
			type: String,
			required: true
		}
	},
	computed: {
		error: function() {
			if (this.content === null) {
				return 'Invalid language key ' + this.id
			}

			return null 
		},
		path: function() {
			return this.id.split('.')
		},
		content: function() {			
			return traverse(langRoot, this.path)
		}
	}
}
</script>
