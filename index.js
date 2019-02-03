'use strict'

module.exports = function (url) {
  if (!url) return {}
  var qIdx = url.indexOf('?')
  if (qIdx === -1) return {}
  var q = url.slice(qIdx + 1)
  if (!q) return {}
  var obj = {}
  var ary = q.split('&')
  ary.forEach(function (q) {
    q = (q.split('=') || [q]).map(decodeURIComponent)
    if (q[0] !== (q[0] = q[0].replace(/\[]$/, ''))) obj[q[0]] = obj[q[0]] || []
    if (!obj[q[0]]) return (obj[q[0]] = q[1])
    if (Array.isArray(obj[q[0]])) obj[q[0]] = obj[q[0]].concat([q[1]])
    else obj[q[0]] = [obj[q[0]]].concat([q[1]])
  })
  return obj
}
