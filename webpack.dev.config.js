const dev = require('./webpack.base.config')
const DefinePlugin = require('webpack/lib/DefinePlugin')

dev.plugins = (dev.plugins || []).concat([
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
