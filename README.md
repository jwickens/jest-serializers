# Serializer for XLSX Workbooks

Turn an [xlsx-populate](https://github.com/dtjohnson/xlsx-populate) workbook into a pretty snapshot.

The serializer will also look for columns marked as ID or Date and turn mask them, as these will normally change from test to test.

# Usage

First you need to add the snapshot serializer. You have two options:

1. Expect.addSerializer

```js
const xlsxPopulateSerializer = require('jest-serializer-xlsx-populate');
expect.addSnapshotSerializer(xslxPopulateSerializer);
```

2. Jest config

for example in package.json
```json
{
  "name": "my project",
  "jest": {
    "snapshotSerializers": ["jest-serializer-xlsx-populate"]
  }
}
```

Then you can serialize

```js
const wb = await XlsxPopulate.fromFileAsync('my-file.xlsx');
expect(wb).toMatchSnapshot();
```

Of course since you're using xlsx populate to create an xlsx file, it will probably be easier to test the Workbook before saving to desk.
