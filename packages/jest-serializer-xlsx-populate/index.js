const Workbook = require('xlsx-populate/lib/Workbook');
const table = require('text-table');
const XlsxPopulate = require('xlsx-populate');
const { isTodaysDate: _isTodaysDate, isUUID } = require('jest-serializer-heuristics');

const { cluster } = require('./cluster');

const TIME_HEADING_REG = /time/i
const DATE_HEADING_REG = /date/i
const ID_HEADING_REG = /id/i
const ID_VAL_REG = /(\sID:\s)(\d+)/g
const BARCODE_HEADING_REG = /barcode/i
const ISO_DATE_FORMAT = /\d{4}-\d{1,2}-\d{1,2}/
const COMMON_DATE_FORMAT = /\d{1,2}\/\d{1,2}-\d{4}/

module.exports = {
  test (val) {
    return val instanceof Workbook
  },
  print (wb) {
    let str = ''
    for (const sheet of wb.sheets()) {
      const usedRange = sheet.usedRange()
      if (!usedRange) {
        str += sheet.name() + ':\n\n'
        str += '\n---\n'
        return str
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
          if (heading.match(TIME_HEADING_REG)) {
            row[j] = typeof row[j] === 'number' ? '<time>': row[j]
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
          } else if (isUUID(row[j])) {
            row[j] = '<uuid>'
          } else if (typeof row[j] === 'string' && row[j].match(/^\d{4}-\d{1,2}-\d{1,2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)) {
            row[j] = '<date>'
          } else if (isTodaysDate(row[j])) {
            row[j] = '<date>'
          } else if (isNearToday(row[j])) {
            row[j] = '<date>';
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

function isNearToday (value) {
  if (typeof value === 'number') {
    const d = XlsxPopulate.numberToDate(value)
    const threshold = 1000 * 60 * 60 * 24 // 24 hour threshold
    return Math.abs(Date.now() - d) < threshold;
  }
  return false;
}