const path = require('path');
const zipDistFilePlugin = require('./zipDistFile');

module.exports = {
	entry: './src/index.js',
	output: {
		chunkFilename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{}]
	},
	plugins: [
		new zipDistFilePlugin()
	]
}