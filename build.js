'use strict'

// Setup
const fs = require('fs')
const pkg = require('./package.json')
const semver = require('semver')
const rollup = require('rollup').rollup
const rollBabel = require('rollup-plugin-babel')
const entry = 'tiny-params.js'
const dest = 'index.js'
const destEs6 = 'module.js'
const git = require('simple-git')(__dirname)
const babelOpts = {
  presets: [['es2015', {modules: false}]],
  plugins: ['external-helpers'],
  babelrc: false
}
const plugins = [rollBabel(babelOpts)]
const toAdd = ['package.json', dest, destEs6]

// Main
pkg.version = semver.inc(pkg.version, 'patch')
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), 'utf8')
let cjsRollup = () => rollup({entry})
let cjsBundle = (b) => b.write({format: 'cjs', dest})
let rollCjs = () => cjsRollup().then(cjsBundle)
let es6Rollup = () => rollup({entry, plugins})
let es6Bundle = (b) => b.write({format: 'es', dest: destEs6})
let rollEs6 = () => es6Rollup().then(es6Bundle)
let gitAdd = () => new Promise((resolve, reject) => {
  git.add(toAdd, (err) => err ? reject(err) : resolve())
})

rollCjs().then(rollEs6).then(gitAdd).catch(console.error)
