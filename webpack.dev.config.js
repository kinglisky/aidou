
const dev = require('./webpack.base.config')
const path = require('path')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

dev.entry = {
  popup: './src/popup/index.js',
  content: './dev/content.js'
}

dev.plugins = (dev.plugins || []).concat([
  new HtmlWebpackPlugin({
    filename: 'content.html',
    template: './dev/content.html',
    inject: false
  }),
  new DefinePlugin({
    'process.env': {
      ENV: '"development"'
    }
  })
])

dev.devServer = {
  contentBase: './src/popup',
  historyApiFallback: true,
  noInfo: true,
  overlay: true
}

module.exports = dev
