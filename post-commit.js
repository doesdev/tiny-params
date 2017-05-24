'use strict'

const pkg = require('./package.json')
const git = require('simple-git')(__dirname)
git.addTag(pkg.version, (err) => {
  if (err) return console.error(err)
  git.pushTags('origin', (err) => {
    if (err) return console.error(err)
  })
})
