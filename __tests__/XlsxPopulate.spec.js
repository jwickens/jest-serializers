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
  wb.sheet("Masks").cell("E1").value("dt as text")
  wb.sheet("Masks").cell("E2").value((new Date().toLocaleDateString()))
  wb.sheet("Masks").cell("F1").value("barcode")
  wb.sheet("Masks").cell("F2").value(Math.floor(Math.random() * 1000))
  wb.sheet("Masks").cell("G1").value("field")
  wb.sheet("Masks").cell("G2").value(`My ID: ${Math.floor(Math.random() * 100)}`)

  wb.addSheet('Masks with subtotals and header')
  wb.sheet("Masks with subtotals and header").cell("A1").value("Header")
  wb.sheet("Masks with subtotals and header").cell("A2").value("Date")
  wb.sheet("Masks with subtotals and header").cell("A3").value("Subtotal")
  wb.sheet("Masks with subtotals and header").cell("A4").value(XlsxPopulate.dateToNumber(new Date()))
  wb.sheet("Masks with subtotals and header").cell("B2").value("Time")
  wb.sheet("Masks with subtotals and header").cell("B4").value(XlsxPopulate.dateToNumber(new Date()))
  wb.sheet("Masks with subtotals and header").cell("C2").value("ID")
  wb.sheet("Masks with subtotals and header").cell("C4").value(Math.floor(Math.random() * 100))
  wb.sheet("Masks with subtotals and header").cell("D2").value("some other dt")
  wb.sheet("Masks with subtotals and header").cell("D4").value(XlsxPopulate.dateToNumber(new Date()))
  wb.sheet("Masks with subtotals and header").cell("E2").value("dt as text")
  wb.sheet("Masks with subtotals and header").cell("E4").value((new Date().toLocaleDateString()))
  wb.sheet("Masks with subtotals and header").cell("F2").value("barcode")
  wb.sheet("Masks with subtotals and header").cell("F4").value(Math.floor(Math.random() * 1000))
  wb.sheet("Masks with subtotals and header").cell("G2").value("field")
  wb.sheet("Masks with subtotals and header").cell("G4").value(`My ID: ${Math.floor(Math.random() * 100)}`)
  wb.sheet("Masks with subtotals and header").cell("H2").value("field")
  wb.sheet("Masks with subtotals and header").cell("H4").value(`My ID: ${Math.floor(Math.random() * 100)} Second ID: ${Math.floor(Math.random() * 100)}`)

  wb.addSheet('Masks with numbers in header')
  wb.sheet("Masks with numbers in header").cell("A1").value("Header")
  wb.sheet("Masks with numbers in header").cell("A2").value("x")
  wb.sheet("Masks with numbers in header").cell("B1").value(0)
  wb.sheet("Masks with numbers in header").cell("B2").value("x")

  wb.addSheet('Masks CAPITALIZED SUBHEADERS')
  wb.sheet("Masks CAPITALIZED SUBHEADERS").cell("A1").value("Header")
  wb.sheet("Masks CAPITALIZED SUBHEADERS").cell("A2").value("START DATE")
  wb.sheet("Masks CAPITALIZED SUBHEADERS").cell("A3").value(`2021-04-0${Math.ceil(Math.random() * 9)}`)
  wb.sheet("Masks CAPITALIZED SUBHEADERS").cell("B2").value("END DATE")
  wb.sheet("Masks CAPITALIZED SUBHEADERS").cell("B3").value(`2021-04-2${Math.ceil(Math.random() * 9)}`)

  wb.addSheet('Empty sheet')
  return wb
}

describe('jest-serializer-xlsx-populate', () => {
  it('saves a snapshot', async () => {
    const d = await createTestData()
    expect(d).toMatchSnapshot()
  })

  it('ignores other data types', () => {
    expect({type: 'not a workbook'}).toMatchSnapshot()
  })
})