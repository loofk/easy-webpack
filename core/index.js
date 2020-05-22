const compile = require('./compile')
const config = require('../webpack.config')

new compile(config).run()