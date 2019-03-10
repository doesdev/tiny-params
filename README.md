# tiny-params [![NPM version](https://badge.fury.io/js/tiny-params.svg)](https://npmjs.org/package/tiny-params)   [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)   

> A tiny URL param parser, suitable for server or browser

## highlights
- it's tiny (< 20 sloc)
- it's highly browser compatible (IE6 and everything else)
- it ships with both ES6 and CommonJS modules
- it's competitively fast (use memoization in front of it to get really fast)
- it makes repeated keys an array `?a=1&a=2` -> `{ a: ['1', '2'] }`
- it makes handles explicit arrays `?a[]=1` -> `{ a: ['1'] }`
- it decodes `encodeURIComponent` encoded items

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
// params === { name: 'andrew', zip: ['37615', '37601'] }
```

## License

MIT © [Andrew Carpenter](https://github.com/doesdev)
