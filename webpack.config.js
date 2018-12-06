const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.styl(us)?$/,
				use: [
					// MiniCssExtractPlugin.loader,
					'vue-style-loader',
					'css-loader',
					'stylus-loader'
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),
		// new CopyWebpackPlugin([{
		// 	from: resolve('static'),
		// 	to: resolve('dist/static'),
		// 	toType: 'dir'
		// }]),
		// new MiniCssExtractPlugin({
		// 	filename: 'main.css'
		// })
	]
}


