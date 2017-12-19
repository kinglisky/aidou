const base = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')

base.plugins = (base.plugins || []).concat([
  new CopyWebpackPlugin([
    {
      from: 'static/hot-reload.js',
      to: 'hot-reload.js'
    },
    {
      from: 'static/icon.png',
      to: 'icon.png'
    }
  ])
])
module.exports = base
