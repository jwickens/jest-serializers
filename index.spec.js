const XlsxPopulate = require('xlsx-populate');

async function createTestData () {
  const wb = await XlsxPopulate.fromBlankAsync()
  wb.sheet("Sheet1").cell("A1").value("This is neat!")
  wb.addSheet("Sheet2")
  wb.sheet("Sheet2").cell("A1").value("Student")
  wb.sheet("Sheet2").cell("A2").value("John")
  wb.sheet("Sheet2").cell("A3").value("Sally")
  wb.sheet("Sheet2").cell("A4").value("Kim")
  wb.sheet("Sheet2").cell("B1").value("Grade")
  wb.sheet("Sheet2").cell("B2").value("F")
  wb.sheet("Sheet2").cell("B3").value("A+")
  wb.sheet("Sheet2").cell("B3").value(undefined)
  return wb
}

it('saves a snapshot', async () => {
  const d = await createTestData()
  expect(d).toMatchSnapshot()
})

it('ignores other data types', () => {
  expect({type: 'not a workbook'}).toMatchSnapshot()
})