const Workbook = require('xlsx-populate/lib/Workbook');
const table = require('text-table');
 
module.exports = {
  test (val) {
    return val instanceof Workbook
  },
  print (wb) {
    let str = ''
    for (const sheet of wb.sheets()) {
      const values = sheet.usedRange().value()
      const cleanedValues = values.map(row => row.map(value => {
        if (value === undefined) {
          return ''
        } else {
          return value
        }
      }))
      str += sheet.name() + ':\n\n'
      str += table(cleanedValues)
      str += '\n---\n'
    }
    return str
  }
}