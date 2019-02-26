
<script>
let langRoot = window.lang

function log(...args) {
	console.log(...args)
}

if (langRoot === undefined) {
	log('Lang: window.lang is not defined')
	langRoot = {}
}

function traverse(root, key) {
	let path = key.split('.')
	let node = root

	for (let i = 0; i < path.length; i++) {
		let keyPart = path[i]
		node = node[keyPart]
		if (node === undefined) {
			log('Lang: could not find string with id "' + key + '"')
			return null
		}
	}
	if (typeof node !== 'string') {
		log('Lang: the string with id "' + key + '" is not a string')
		return null
	}
	return node
}

export function findLangKey(key) {
	return traverse(langRoot, key)
}

export default {
	props: {
		/**
		 * `id` specifies a key for the text content. The content is read from `window.lang.<id>`.
		 * `<Lang>` will not crash even if you try to use a key that does not exist - it will render
		 * an error instead.
		 */
		id: {
			type: String,
			required: true,
		},
	},
	render: function(createElement) {
		let textContent = this.content

		let debugAttrs = {
			attrs: {
				'data-lang-key': this.id,
			},
		}

		// debugAttrs = null

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
			// A semi-undocumented way to create text nodes.
			//
			// TODO might make sense to just create a <span> so we can include debug attrs and make
			// all translations inspectable.
			// return createElement('span', debugAttrs, this.content)
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
			return createElement('span', debugAttrs, [
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
		return createElement('span', debugAttrs, resultParts)
	},

	computed: {
		error: function() {
			if (this.content === null) {
				return '[Invalid language key ' + this.id + ']'
			}

			return null
		},
		content: function() {
			return findLangKey(this.id)
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
