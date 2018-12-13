<template>
	<li v-bind:class="classList">
		<slot/>
	</li>
</template>

<script>
export default {
	props: {
		align: String,
	},
	computed: {
		classList: function() {
			if (this.align === 'left') {
				return 'MenuItem left'
			} else if (this.align === 'right') {
				return 'MenuItem right'
			}
			return 'MenuItem'
		},
	},
}
</script>
<style lang="stylus" scoped>

li.MenuItem {
	display: inline-block;
	color: white;
	text-decoration: underline;
	margin: 0 10px;

	&.left {
		float: left
	}

	&.right {
		float: right
	}
}

</style>
