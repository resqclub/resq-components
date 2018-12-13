<!--
	A simple button component to test out importing .vue components

	<Button></Button>
-->

<template>
	<button @click="clicked">
		<slot/>
	</button>
</template>

<script>
export default {
	methods: {
		clicked() {
			this.$emit('click')
		},
	},
}
</script>

<style lang='stylus' scoped>
@import './common.styl';

button {
	height: 32px;
	padding: 3px 15px;
	line-height: 25px;
	border-radius: 16px;
	font-size: $size-s;
	background: #1bcbac;
	color: white;
	border: none;
	cursor: pointer;
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
		cursor: default;
		background: #aaa;
	}
}
</style>
