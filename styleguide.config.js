let path = require('path')

module.exports = {
	components: 'src/components/**/*.vue',
	skipComponentsWithoutExample: true,
	require: [
		'vue-material-design-icons/styles.css',
		// Load all Brother 1816 fonts
		path.join(__dirname, 'src/fonts/brother-1816.css')
	]
}
