export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length))
  }
  const d = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in d) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = d[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substring(str.length))
    }
  }
  return fmt
}

export function deepMerge(obj1, obj2) {
  let key
  for (key in obj2) {
    obj1[key] = obj1[key] && (obj1[key].toString() === '[object Object]' || obj1[key].constructor === Array)
      ? deepMerge(obj1[key], obj2[key]) : obj1[key] = obj2[key]
  }
  return obj1
}
