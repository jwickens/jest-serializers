const { isTodaysDate } = require('jest-serializer-heuristics');
const prettyFormat = require('pretty-format');

module.exports = {
  test (val) {
    return isObject(val)
  },

  print (val) {
    const cleaned = recurseSerialize(val)
    return prettyFormat(cleaned, {
      escapeRegex: true,
      printFunctionName: false
    })
  }
}

const ID_KEY_REG = /id/i
const ID_VAL_REG = /(\sID:\s)(\d+)/
const BARCODE_KEY_REG = /barcode/i

function recurseSerialize (obj) {
  for (k in obj) {
    const v = obj[k]
    if (typeof v === 'string' || typeof v === 'number' || v instanceof Date) {
      if (k.match(ID_KEY_REG)) {
        obj[k] = '<id>'
      } else if (typeof obj[k] === 'string' && obj[k].match(ID_VAL_REG)) {
        obj[k] = obj[k].replace(ID_VAL_REG, (match, p1, p2) => {
          return p1 + '<id>';
        });
      } else if (k.match(BARCODE_KEY_REG)) {
        obj[k] = '<barcode>'
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