'use strict'

function decode (s) { return s.indexOf('%') === -1 ? s : decodeURIComponent(s) }
function num (v) { return Number.isNaN(+v) ? v : +v }
function bool (v) { return v === 'false' ? false : (v === 'true' ? true : v) }
function conv (v) { return bool(num(v)) }

export default function (u) {
  var qI, qU, hI
  if (!u || (qI = u.indexOf('?')) === -1 || !(qU = u.slice(qI + 1))) return {}
  if ((hI = qU.indexOf('#')) !== -1 && !(qU = qU.slice(0, hI))) return {}
  var obj = {}
  qU.split('&').forEach(function (q) {
    q = ((q = q.split('=')) && q.length === 2 ? q : [q[0], 'true']).map(decode)
    if (q[0].slice(-2) === '[]') obj[q[0] = q[0].slice(0, -2)] = obj[q[0]] || []
    if (!obj[q[0]]) return (obj[q[0]] = conv(q[1]))
    if (Array.isArray(obj[q[0]])) obj[q[0]].push(conv(q[1]))
    else obj[q[0]] = [obj[q[0]], conv(q[1])]
  })
  return obj
}
