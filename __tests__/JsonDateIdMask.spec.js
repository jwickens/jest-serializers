
const randomNumber = () => Math.floor((Math.random() * 100));

describe('jest-serializer-json-date-id-mask', () => {
  it('wont do anything to non objects', () => {
    expect('id').toMatchSnapshot()
    expect(new Date('1990')).toMatchSnapshot()
    expect(0).toMatchSnapshot()
  })

  it('it will serialize ids', () => {
    expect({myId: randomNumber()}).toMatchSnapshot()
  })

  it('it will serialize ids in value', () => {
    expect({field: `my ID: ${randomNumber()} second ID: ${randomNumber()}`}).toMatchSnapshot()
  })

  it('it will serialize todays date', () => {
    expect({someKey: new Date(), someOtherKey: (new Date()).toISOString()}).toMatchSnapshot()
  })

  it('it will serialize barcodes', () => {
    expect({'my barcode': Math.floor(Math.random() * 1000)}).toMatchSnapshot()
  })

  it('works with nested objects', () => {
    expect({id: {id: {date: new Date(), id: randomNumber(), someOtherDate: (new Date()).toLocaleDateString()}}}).toMatchSnapshot()
  })
});