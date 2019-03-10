'use strict'

function decode (s) { return s.indexOf('%') === -1 ? s : decodeURIComponent(s) }

module.exports = function (u) {
  var qI, qU
  if (!u || (qI = u.indexOf('?')) === -1 || !(qU = u.slice(qI + 1))) return {}
  var obj = {}
  qU.split('&').forEach(function (q) {
    q = (q.split('=') || [q]).map(decode)
    if (q[0].slice(-2) === '[]') obj[q[0] = q[0].slice(0, -2)] = obj[q[0]] || []
    if (!obj[q[0]]) return (obj[q[0]] = q[1])
    if (Array.isArray(obj[q[0]])) obj[q[0]].push(q[1])
    else obj[q[0]] = [obj[q[0]], q[1]]
  })
  return obj
}
