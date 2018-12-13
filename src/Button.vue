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
	font-family: 'brother-1816';
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
    	transform: translateY(-1px) scale(1.4);
	}
}
</style>
