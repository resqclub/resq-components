<!--
	A simple button component to test out importing .vue components

	<Button></Button-test>
-->

<template>
	<button @click="clicked"><slot /></button>
</template>

<script>
export default {
	methods: {
		clicked() {
			this.$emit('click')
			// console.log('clicked')
		}
	}
};
</script>

<style lang='stylus' scoped>
button {
	border: 1px solid #888
	height: 32px
	padding: 10px
	line-height: 14px
	border-radius: 16px
	font-size: 14px
	text-transform: uppercase
	font-variant: small-caps

	outline: none;

	&:hover {
		background: black
		color: white
	}

	&:focus {
		border-color: black
	}
}

</style>
