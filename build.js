'use strict'

const fs = require('fs')
const cjsModFile = 'index.js'
const esModFile = 'module.mjs'
const cjsTestFile = 'test.js'
const esTestFile = 'test.mjs'

if (process.argv.some((a) => a === '--unbuild')) {
  fs.unlinkSync(esTestFile)
} else {
  const cjsMod = fs.readFileSync(cjsModFile, 'utf8')
  const esMod = cjsMod.replace('module.exports = ', 'export default ')

  fs.writeFileSync(esModFile, esMod, 'utf8')

  const cjsTest = fs.readFileSync(cjsTestFile, 'utf8')
  const esTest = cjsTest.replace(
    /const (.+?) = require\((.+?)\)/g,
    'import $1 from $2'
  ).replace('CommonJS', 'ES')

  fs.writeFileSync(esTestFile, esTest, 'utf8')
}
