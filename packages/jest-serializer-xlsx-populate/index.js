const Workbook = require('xlsx-populate/lib/Workbook');
const table = require('text-table');
const XlsxPopulate = require('xlsx-populate');
const { isTodaysDate: _isTodaysDate } = require('jest-serializer-heuristics');

const { cluster } = require('./cluster');

const TIME_HEADING_REG = /time/i
const DATE_HEADING_REG = /date/i
const ID_HEADING_REG = /id/i
const ID_VAL_REG = /(\sID:\s)(\d+)/g
const BARCODE_HEADING_REG = /barcode/i
const ISO_DATE_FORMAT = /\d{4}-\d{1,2}-\d{1,2}/
const COMMON_DATE_FORMAT = /\d{1,2}\/\d{1,2}-\d{4}/
const EXCEL_DATE_FORMAT = /[mdyhms]{1,3}/;

module.exports = {
  test (val) {
    return val instanceof Workbook
  },
  print (wb) {
    let str = ''
    for (const sheet of wb.sheets()) {
      console.log(sheet.name())
      const usedRange = sheet.usedRange()
      if (!usedRange) {
        str += sheet.name() + ':\n\n'
        str += '\n---\n'
        continue;
      }
      const values = usedRange.value()
      const cleanedValues = values.map(row => row.map(value => {
        if (value === undefined) {
          return ''
        } else {
          return value
        }
      }))

      const { coordToCluster, clusterToHeader, clusterToHeaderIndex } = cluster(cleanedValues)

      const maskedValues = cleanedValues.map((row, i) => {
        row.forEach((cell, j) => {
          if (cell === '' || cell === null || cell === undefined) {
            return
          }
          const cluster = coordToCluster[i][j]
          const headerIndex = clusterToHeaderIndex[cluster]
          if (headerIndex === undefined || i <= headerIndex) {
            return row
          }
          const heading = clusterToHeader[cluster][j]
          if (typeof heading !== 'string') {
            return
          }
          const originalCell = usedRange.cell(i, j);
          const numberFormat = originalCell.style('numberFormat');
          const formatIsDate = !!numberFormat.match(EXCEL_DATE_FORMAT);

          if (heading.match(TIME_HEADING_REG)) {
            row[j] = typeof row[j] === 'number' ? '<time>': row[j]
          } else if (typeof row[j] === 'number' && (formatIsDate)) {
            row[j] = '<date>'
          } else if (heading.match(DATE_HEADING_REG)) {
            if (typeof row[j] === 'number') {
              row[j] = '<date>'
            } else if (typeof row[j] === 'string') {
              if (row[j].match(ISO_DATE_FORMAT)) {
                row[j] = '<date>'
              } else if (row[j].match(COMMON_DATE_FORMAT)) {
                row[j] = '<date>'
              }
            }
          } else if (heading.match(BARCODE_HEADING_REG)) {
            row[j] = !!row[j] ? '<barcode>': row[j]
          } else if (heading.match(ID_HEADING_REG)) {
            row[j] = row[j] ? '<id>': row[j]
          } else if (typeof row[j] === 'string' && row[j].match(ID_VAL_REG)) {
            row[j] = row[j].replace(ID_VAL_REG, (match, p1, p2) => {
              return p1 + '<id>';
            })
          } else if (isTodaysDate(row[j])) {
            row[j] = '<date>'
          }
        });
        return row
      })
      str += sheet.name() + ':\n\n'
      str += table(maskedValues)
      str += '\n---\n'
    }
    return str
  }
}

function isTodaysDate (value) {
  let d = value
  if (typeof value === 'number') {
    d = XlsxPopulate.numberToDate(value)
  }
  return _isTodaysDate(d)
}