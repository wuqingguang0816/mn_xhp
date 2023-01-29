'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let params = process.argv[4]
let baseUrl = ''

switch (params) {
    case '--env=test':
        baseUrl = '"/LIMS"'
        break
    case '--env=prod':
        baseUrl = '"/LIMS"'
        break
    default:
        baseUrl = '"/LIMS"'
}

module.exports = {
    NODE_ENV: '"production"',
    baseUrl: baseUrl
}