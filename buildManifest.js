const fs = require('fs')
const base = require('./manifest/base')
const dev = require('./manifest/dev')
const config = process.env.BUILD_ENV === 'prod' ? base : dev

const path = __dirname + '/extension'
if (!fs.existsSync(path)) {
  fs.mkdirSync(path)
}

fs.writeFileSync(path + '/manifest.json', JSON.stringify(config, null, 4), 'utf8')
