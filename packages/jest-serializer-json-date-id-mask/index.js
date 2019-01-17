const { isTodaysDate } = require('jest-serializer-heuristics');

module.exports = {
  test (val) {
    return isObject(val)
  },

  print (val) {
    return JSON.stringify(recurseSerialize(val), null, 2)
  }
}

const ID_REG = /id/i
function recurseSerialize (obj) {
  for (k in obj) {
    const v = obj[k]
    if (typeof v === 'string' || typeof v === 'number' || v instanceof Date) {
      if (k.match(/id/i)) {
        obj[k] = '<id>'
      } else if (isTodaysDate(v)) {
        obj[k] = '<date>'
      } 
    } else if (isObject(v)) {
        obj[k] = recurseSerialize(v)
    }
  }
  return obj
}

function isObject (val) {
  return val === Object(val)
}