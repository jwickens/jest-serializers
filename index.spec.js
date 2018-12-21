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
  wb.sheet("Sheet2").cell("B4").value(undefined)

  wb.addSheet('Masks')
  wb.sheet("Masks").cell("A1").value("Date")
  wb.sheet("Masks").cell("A2").value(XlsxPopulate.dateToNumber(new Date()))
  wb.sheet("Masks").cell("B1").value("Time")
  wb.sheet("Masks").cell("B2").value(XlsxPopulate.dateToNumber(new Date()))
  wb.sheet("Masks").cell("C1").value("ID")
  wb.sheet("Masks").cell("C2").value(Math.floor(Math.random() * 100))
  wb.sheet("Masks").cell("D1").value("some other dt")
  wb.sheet("Masks").cell("D2").value(XlsxPopulate.dateToNumber(new Date()))


  return wb
}

it('saves a snapshot', async () => {
  const d = await createTestData()
  expect(d).toMatchSnapshot()
})

it('ignores other data types', () => {
  expect({type: 'not a workbook'}).toMatchSnapshot()
})