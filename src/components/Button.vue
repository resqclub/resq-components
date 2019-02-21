<!--
	A simple button component to test out importing .vue components

	<Button>Content</Button>
-->

<template>
	<button @click="clicked" class="Button">
		<slot/>
	</button>
</template>

<script>
export default {
	name: 'Button',
	methods: {
		clicked() {
			this.$emit('click')
		},
	},
}
</script>

<style lang='stylus' scoped>
@import '../common.styl';
@import '../fonts/brother-1816-mixins.styl';

button {
	brother-medium()

	height: 36px;
	padding: 0px 20px;
	line-height: 36px;
	border-radius: 18px;
	font-size: $size-s;
	background: $color-resq-green;
	color: white;
	border: none;
	cursor: pointer;
	outline: none;
	white-space: nowrap;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.21);

	&:hover {
		// background: #666
		// color: white
	}

	&:active {
		// background: black
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.21);
	}

	&:focus {
		// border-color: black
	}

	&:disabled {
		cursor: default;
		background: #aaa;
	}

	.material-design-icon {
		width: 1.3em;
    	transform: translateY(-2px) scale(1.7);
	}
}
</style>
