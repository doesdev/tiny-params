'use strict'

// setup
import test from 'ava'
import tp from './index'

test('properly parses params', (assert) => {
  let q = `ary=a&ary[]=b&first=andrew&zip=37615&last=carpenter&zip=37601&q=%3F&amp=%26&eq=%3D&ary=c`
  let p = tp(`http://localhost:80/base/path/resource?${q}`)
  assert.is(p.first, 'andrew')
  assert.is(p.last, 'carpenter')
  assert.is(p.q, '?')
  assert.is(p.amp, '&')
  assert.is(p.eq, '=')
  assert.is(JSON.stringify(p.zip), '["37615","37601"]')
  assert.is(JSON.stringify(p.ary), '["a","b","c"]')
})
