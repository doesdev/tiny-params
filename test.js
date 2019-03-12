'use strict'

const mvt = require('mvt')
const tp = require('./index.js')
const { runTests, test } = mvt
const q = [
  `ary=a`,
  `ary[]=b`,
  `boolval=false`,
  `first=andrew`,
  `zip=37615`,
  `last=carpenter`,
  `zip=37601&q=%3F`,
  `flag`,
  `amp=%26`,
  `eq=%3D`,
  `ary=c`,
  `#we=are&totally=done`
].join('&')
const p = tp(`http://localhost:80/base/path/resource?${q}`)

runTests('Testing tiny-params CommonJS module', () => {
  test('First name matches', p.first, 'andrew')
  test('Last name matches', p.last, 'carpenter')
  test('Encoded question mark is correctly parsed', p.q, '?')
  test('Encoded ampersand is correctly parsed', p.amp, '&')
  test('Encoded equal sign is correctly parsed', p.eq, '=')
  test('Boolean value parses as such', p.boolval, false)
  test('Flag (key with no value) parses to true', p.flag, true)

  test(
    'Zip code array is correctly parsed',
    JSON.stringify(p.zip),
    '[37615,37601]'
  )
  test(
    'Array values are correctly parsed',
    JSON.stringify(p.ary),
    '["a","b","c"]'
  )

  test('It ignores things after #', !p.we && !p.totally)

  test('Parse undefined', () => tp())
  test('Parse empty string', () => tp(''))
  test('Parse only host', () => tp('http://localhost:80'))
  test('Parse trailing slash', () => tp('http://localhost:80/'))
  test('Parse trailing question mark', () => tp('http://localhost:80?'))
  test('Parse trailing ampersand', () => tp('http://localhost:80?key=value&'))
  test('Parse trailing ampersand again', () => tp('http://localhost:80&'))
  test(
    'Parse trailing question mark and ampersand',
    () => tp('http://localhost:80?&')
  )
})
