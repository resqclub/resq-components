
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
			required: true,
		},
	},
	render: function(createElement) {
		let textContent = this.content

		let debugIdentification = {
			attrs: {
				'data-lang-key': this.id,
			},
		}

		debugIdentification = null

		// Case 1: no such key. Return an error instead.
		// Probably could do something else in production.
		if (textContent === null) {
			return createElement('span', { class: 'error' }, this.error)
		}

		// If content contains one of these, we inject a thing from a slot instead
		const PLACEHOLDER_REGEX = /(?:%@|%ld|%f|%F)/
		let splitContent = textContent.split(PLACEHOLDER_REGEX)

		let requiredSlots = splitContent.length - 1

		// Case 2: simple key, no interpolation.
		if (requiredSlots === 0) {
			// A semi-undocumented way to create text nodes
			return this._v(this.content)
		}

		// Case 3: one placeholder - we use the default slot or slot number 0,
		// whichever is the first one we find
		if (requiredSlots === 1) {
			let slot = this.$slots.default || this.$slots[0]
			if (!slot) {
				return createElement(
					'span',
					{ class: 'error' },
					'[Missing default slot or slot 0 for key ' + this.id + ']'
				)
			}
			return createElement('span', debugIdentification, [
				splitContent[0],
				slot,
				splitContent[1],
			])
		}

		// Case 4: two or more placeholders. Require as many slots as there were placeholders.
		// Handle errors in case slots are missing.
		let resultParts = []
		let slotIdx = 0
		for (var i = 0; i < splitContent.length; i++) {
			resultParts.push(splitContent[i])
			if (i !== splitContent.length - 1) {
				let currentSlot = this.$slots[slotIdx]
				if (!currentSlot) {
					log(
						'Lang: the string to be interpolated needs ' +
							(splitContent.length - 1) +
							' slots but slot ' +
							slotIdx +
							' is missing'
					)
					log('Lang: id was:', this.id)
					log('Lang: content was:', textContent)
					log('Lang: slots were:', this.$slots)
					return createElement(
						'span',
						{ class: 'error' },
						'[Missing slot ' + slotIdx + ' for key ' + this.id + ']'
					)
				}
				slotIdx++
				resultParts.push(currentSlot)
			}
		}

		// Render function can only return one node so we need to wrap it inside a <span>
		return createElement('span', resultParts)
	},

	computed: {
		error: function() {
			if (this.content === null) {
				return '[Invalid language key ' + this.id + ']'
			}

			return null
		},
		path: function() {
			return this.id.split('.')
		},
		content: function() {
			return traverse(langRoot, this.path)
		},
	},
}
</script>

<style lang="stylus" scoped>

span.error {
	font-weight: bold
	color: red
}
</style>