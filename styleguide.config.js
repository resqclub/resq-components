let path = require('path')

module.exports = {
	components: 'src/*.vue',
	skipComponentsWithoutExample: true,
	require: [
		path.join(__dirname, 'test.css')
	]
}

