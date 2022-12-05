'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let params = process.argv[4]
let baseUrl = ''

switch (params) {
    case '--env=test':
        baseUrl = '"http://192.168.1.45/LIMS"'
        break
    case '--env=prod':
        baseUrl = '"http://192.168.1.45/LIMS"'
        break
    default:
        baseUrl = '"/api"'
}

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    baseUrl: baseUrl
})