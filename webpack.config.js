const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	module: {
		rules: [
			{
				test: /\.(woff|woff2)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			},
			{
				test: /\.styl(us)?$/,
				use: [
					// MiniCssExtractPlugin.loader,
					'vue-style-loader',
					'css-loader',
					'stylus-loader'
				]
			},
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
			inject: true
		}),
		new CopyWebpackPlugin([{
			from: resolve('src/fonts'),
			to: resolve('dist/fonts'),
			toType: 'dir'
		}]),
		// new MiniCssExtractPlugin({
		// 	filename: 'main.css'
		// })
	]
}


