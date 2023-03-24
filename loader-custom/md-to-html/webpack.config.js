const path = require('path');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.md$/,
				use: [
					{
						loader: 'md-loader',
					}
				]
			}
		]
	},
	resolveLoader: {
		modules: ['node_modules', './src/myLoader'],
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		overlay: true,
	},
}
