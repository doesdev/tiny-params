'use strict'

// export
module.exports = (url) => {
  if (!url || url === '' || !/\?/.test(url)) return {}
  var q = url.split(/\?(.+)?/)[1] || ''
  var obj = {}
  var ary = q.split('&')
  ary.forEach((q) => {
    q = (q.split('=') || [q]).map(decodeURIComponent)
    if (q[0] !== (q[0] = q[0].replace(/\[]$/, ''))) obj[q[0]] = obj[q[0]] || []
    if (!obj[q[0]]) return (obj[q[0]] = q[1])
    if (Array.isArray(obj[q[0]])) obj[q[0]] = obj[q[0]].concat([q[1]])
    else obj[q[0]] = [obj[q[0]]].concat([q[1]])
  })
  return obj
}
