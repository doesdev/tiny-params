'use strict'

const fs = require('fs')
const cjsMod = fs.readFileSync('index.js', 'utf8')
const esMod = cjsMod.replace('module.exports = ', 'export default ')

fs.writeFileSync('module.mjs', esMod, 'utf8')

const cjsTest = fs.readFileSync('test.js', 'utf8')
const esTest = cjsTest.replace(
  `const tp = require('./index')`,
  `import tp from './module'`
).replace('CommonJS', 'ES')

fs.writeFileSync('test.mjs', esTest, 'utf8')
