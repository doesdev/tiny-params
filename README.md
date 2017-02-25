# tiny-params [![NPM version](https://badge.fury.io/js/tiny-params.svg)](https://npmjs.org/package/tiny-params)   [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

> A tiny URL param parser, suitable for server or browser

## install

```sh
$ npm install --save tiny-params
```

## api
- **url** *(string - required)*

## usage

```js
const tinyParams = require('tiny-params')
const url = 'http://localhost:80/base/res?name=andrew&zip=37615&zip=37601'
let params = tinyParams(url)
// params === {name: 'andrew', zip: ['37615', '37601']}
```

## License

MIT © [Andrew Carpenter](https://github.com/doesdev)
