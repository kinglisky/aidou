const dev = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')

dev.entry = {
  popup: './src/popup/index.ts'
}

dev.plugins = (dev.plugins || []).concat([
  new HtmlWebpackPlugin({
    inject: true,
    template: './src/popup/index.html'
  }),
  new DefinePlugin({
    'process.env': {
      ENV: '"development"'
    }
  })
])

dev.devServer = {
  port: 8080,
  host: 'localhost',
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  contentBase: './src',
  open: true
}

module.exports = dev
