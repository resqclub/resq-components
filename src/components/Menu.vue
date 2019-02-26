<template>
	<ul class="Menu">
		<slot></slot>
	</ul>
</template>

<script>
export default {
	props: {
		message: {
			type: String,
		},
	},
	// ...
}
</script>

<style lang="stylus" scoped>
@import '../common.styl'

ul.Menu {
	list-style-type: none
	margin: 0
	padding: 0
	height: $size-xl
	line-height: $size-xl
	display: block
	width: 100%
	background: $color-resq-green
	text-align: center
}
</style>
