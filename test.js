'use strict'

const test = require('mvt')
const tp = require('./index.js')

const q = [
  'ary=a',
  'ary[]=b',
  'boolval=false',
  'first=andrew',
  'zip=37615',
  'last=carpenter',
  'zip=37601&q=%3F',
  'number=22.55',
  'nil=undefined',
  'flag',
  'amp=%26',
  'eq=%3D',
  'ary=c',
  'encodedAry%5B%5D=1',
  '#we=are&totally=done'
].join('&')

const p = tp(`http://localhost:80/base/path/resource?${q}`)

test('First name matches', (assert) => {
  assert.is(p.first, 'andrew')
})

test('Last name matches', (assert) => {
  assert.is(p.last, 'carpenter')
})

test('Encoded question mark is correctly parsed', (assert) => {
  assert.is(p.q, '?')
})

test('Encoded ampersand is correctly parsed', (assert) => {
  assert.is(p.amp, '&')
})

test('Encoded equal sign is correctly parsed', (assert) => {
  assert.is(p.eq, '=')
})

test('Numeric value parses as such', (assert) => {
  assert.is(p.number, 22.55)
})

test('Null and undefined stings parse as null', (assert) => {
  assert.is(p.nil, null)
})

test('Boolean value parses as such', (assert) => {
  assert.is(p.boolval, false)
})

test('Flag (key with no value) parses to true', (assert) => {
  assert.is(p.flag, true)
})

test('Zip code array is correctly parsed', (assert) => {
  assert.is(JSON.stringify(p.zip), '[37615,37601]')
})

test('Array values are correctly parsed', (assert) => {
  assert.is(JSON.stringify(p.ary), '["a","b","c"]')
})

test('Encoded array values are correctly parsed', (assert) => {
  assert.is(JSON.stringify(p.encodedAry), '[1]')
})

test('It ignores things after #', (assert) => {
  assert.falsy(p.we || p.totally)
})

test('Parse undefined', (assert) => {
  assert.notThrows(() => tp())
})

test('Parse empty string', (assert) => {
  assert.notThrows(() => tp(''))
})

test('Parse only host', (assert) => {
  assert.notThrows(() => tp('http://localhost:80'))
})

test('Parse trailing slash', (assert) => {
  assert.notThrows(() => tp('http://localhost:80/'))
})

test('Parse trailing question mark', (assert) => {
  assert.notThrows(() => tp('http://localhost:80?'))
})

test('Parse trailing ampersand', (assert) => {
  assert.notThrows(() => tp('http://localhost:80?key=value&'))
})

test('Parse trailing ampersand again', (assert) => {
  assert.notThrows(() => tp('http://localhost:80&'))
})

test('Parse trailing question mark and ampersand', (assert) => {
  assert.notThrows(() => tp('http://localhost:80?&'))
})
