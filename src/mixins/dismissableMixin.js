export default {
	beforeDestroy() {
		this.$el.remove()
		window.removeEventListener('click', this.dismissableMixin_destroy)
		window.removeEventListener('keydown', this.dismissableMixin_escDestroyer)
	},
	mounted() {
		this.dismissableMixin_destroy = () => {
			this.$destroy()
		}
		this.dismissableMixin_escDestroyer = e => {
			// esc
			if (e.which === 27) {
				this.$destroy()
			}
		}
		setTimeout(() => {
			this.$el.onclick = event => event.stopPropagation()
			window.addEventListener('click', this.dismissableMixin_destroy)
			window.addEventListener('keydown', this.dismissableMixin_escDestroyer)
		}, 10)
	},
}
