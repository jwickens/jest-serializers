const Workbook = require('xlsx-populate/lib/Workbook');
const table = require('text-table');
 
module.exports = {
  test (val) {
    return val instanceof Workbook
  },
  print (wb) {
    let str = ''
    for (const sheet of wb.sheets()) {
      str += sheet.name() + ':\n\n'
      str += table(sheet.usedRange().value())
      str += '\n---\n'
    }
    return str
  }
}