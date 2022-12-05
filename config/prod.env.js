'use strict'

let params = process.argv[2]
let baseUrl = ''
let zslims = '"http://10.60.137.87/LIMS"',
    cslims = '"http://10.60.138.12/LIMSTS"';

switch (params) {
    case 'test':
        baseUrl = '"http://192.168.1.45/LIMSZN"'
        break
    case 'prod':
        baseUrl = zslims
        break
    default:
        baseUrl = zslims
}

module.exports = {
    NODE_ENV: '"production"',
    baseUrl: baseUrl
}