<!--
	A simple button component to test out importing .vue components

	<Button></Button>
-->

<template>
	<button @click="clicked"><slot /></button>
</template>

<script>
export default {
	methods: {
		clicked() {
			this.$emit('click')
		}
	}
};
</script>

<style lang='stylus' scoped>
@import './common.styl'

button {
	// border: 1px solid #888
	height: 32px
	padding: 9px 15px
	line-height: 14px
	border-radius: 16px
	font-size: $size-s
	// text-transform: uppercase
	// font-variant: small-caps

	background #1bcbac
	color: white

	border: none

	cursor: pointer

	outline: none;

	white-space: nowrap;

	&:hover {
		// background: #666
		// color: white
	}

	&:active {
		// background: black
	}

	&:focus {
		// border-color: black
	}

	&:disabled {
		cursor: default
		background #aaa
	}
}

</style>
