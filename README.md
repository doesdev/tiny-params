<div align="center">
  <img src="tiny-params.png" alt="SCRUD" /><br />
  <a href="https://npmjs.org/package/tiny-params">
    <img src="https://badge.fury.io/js/tiny-params.svg" alt="NPM version" />
  </a>
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat" alt="js-standard-style" />
  </a>
</div>

# tiny-params

> A tiny URL param parser, suitable for server or browser

## highlights
- it's tiny (< 25 sloc)
- it's highly browser compatible (IE6 and everything else)
- it ships with both ES6 and CommonJS modules
- it makes repeated keys an array `?a=1&a=2` -> `{ a: [1, 2] }`
- it handles explicit arrays `?a[]=1` -> `{ a: [1] }`
- it handles flags (key with no value) `?a=b&flag` -> `{ a: 'b', flag: true }`
- it decodes `encodeURIComponent` encoded items
- it converts booleans and numbers from strings
- it converts the values `'null'` and `'undefined'` to `null`
- it respects the hash (as per [RFC 3986](https://tools.ietf.org/html/rfc3986#section-3.4))
- it's competitively fast (not the fastest, not far from it)

## lowlights
- it looks like code golf, kind of is
- it uses `decodeURIComponent` (sparingly) which is slow (but highly compatible)

## install

```sh
$ npm install --save tiny-params
```

## usage

```js
const tinyParams = require('tiny-params')
const url = 'http://localhost:80/base/res?name=andrew&zip=37615&zip=37601'
const params = tinyParams(url)
// params === { name: 'andrew', zip: [37615, 37601] }
```

## License

MIT © [Andrew Carpenter](https://github.com/doesdev)
