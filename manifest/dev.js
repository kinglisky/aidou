const dev = require('./base')
dev.background.scripts.unshift('hot-reload.js')
module.exports = dev
