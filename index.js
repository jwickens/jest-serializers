const Workbook = require('xlsx-populate/lib/Workbook');
const XlsxPopulate = require('xlsx-populate');
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
      const header = cleanedValues[0]
      const maskedValues = cleanedValues.map((row, i) => {
        if (i === 0) {
          return row
        }
        header.forEach((heading, j) => {
          if (heading.match(/time/i)) {
            row[j] = typeof row[j] === 'number' ? '<time>': row[j]
          } else if (heading.match(/date/i)) {
            row[j] = typeof row[j] === 'number' ? '<date>': row[j]
          } else if (heading.match(/id/i)) {
            row[j] = row[j] ? '<id>': row[j]
          } else if (typeof row[j] === 'number') {
            const d = XlsxPopulate.numberToDate(row[j])
            const now = new Date()
            if (d.getDate() === now.getDate() && d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()) {
              row[j] = '<date>'
            }
          }
        })
        return row
      })
      str += sheet.name() + ':\n\n'
      str += table(maskedValues)
      str += '\n---\n'
    }
    return str
  }
}