const webpack = require('webpack')
const base = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')

base.devtool = '#source-map'
base.plugins = (base.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: {
      warnings: false
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new CopyWebpackPlugin([
    {
      from: 'static/icon.png',
      to: 'icon.png'
    }
  ])
])
module.exports = base
