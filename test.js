'use strict'

const tp = require('./index.js')
const q = [
  `ary=a`,
  `ary[]=b`,
  `first=andrew`,
  `zip=37615`,
  `last=carpenter`,
  `zip=37601&q=%3F`,
  `amp=%26`,
  `eq=%3D`,
  `ary=c`
].join('&')
const p = tp(`http://localhost:80/base/path/resource?${q}`)

const start = () => {
  process.stdout.write(`\nStarting on tests in CommonJS module\n`)
}

const finish = () => {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(`All test have passed, ${run} test were run\n`)
}

let run = 0
const fail = (msg) => {
  console.log('\n')
  console.error(new Error(`Fail - ${msg}`))
  return process.exit(1)
}

const test = (msg, isTrueOrCompA, compB) => {
  if (compB) isTrueOrCompA = isTrueOrCompA === compB
  run++
  if (!isTrueOrCompA) return fail(msg)
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(`${run} test have passed`)
}

const notThrows = (name, fn) => {
  try {
    fn()
    test(name, true)
  } catch (ex) {
    console.log('\n')
    console.error(ex)
    return fail(name)
  }
}

start()

test('First name matches', p.first, 'andrew')
test('Last name matches', p.last, 'carpenter')
test('Encoded question mark is correctly parsed', p.q, '?')
test('Encoded ampersand is correctly parsed', p.amp, '&')
test('Encoded equal sign is correctly parsed', p.eq, '=')

test(
  'Zip code array is correctly parsed',
  JSON.stringify(p.zip),
  '["37615","37601"]'
)
test(
  'Array values are correctly parsed',
  JSON.stringify(p.ary),
  '["a","b","c"]'
)

notThrows('Parse undefined', () => tp())
notThrows('Parse empty string', () => tp(''))
notThrows('Parse only host', () => tp('http://localhost:80'))
notThrows('Parse trailing slash', () => tp('http://localhost:80/'))
notThrows('Parse trailing question mark', () => tp('http://localhost:80?'))
notThrows('Parse trailing ampersand', () => tp('http://localhost:80?key=value&'))
notThrows('Parse trailing ampersand again', () => tp('http://localhost:80&'))
notThrows(
  'Parse trailing question mark and ampersand',
  () => tp('http://localhost:80?&')
)

finish()
