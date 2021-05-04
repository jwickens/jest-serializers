# Serializer for Objects that include volatile dates and IDS

This is useful for example when testing with a DB that generates IDs and Dates 

The serializer will look for columns marked as ID or Date and mask them, as these will normally change from test to test.

Please note that this will be incompatible with react projects, so if you are testing other objects use Expect.addSerializer to restrict to only one test suite.

# Usage

You need to add the snapshot serializer. You have two options:

1. Expect.addSerializer

```js
const jsonDateIdMask = require('jest-serializer-json-date-id-mask');
expect.addSnapshotSerializer(jsonDateIdMask);
```

2. Jest config

for example in package.json
```json
{
  "name": "my project",
  "jest": {
    "snapshotSerializers": ["jest-serializer-json-date-id-mask"]
  }
}
```
