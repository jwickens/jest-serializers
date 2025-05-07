
function isTodaysDate (value) {
  let d
  if (typeof value === 'number') {
    d = new Date(value)
  } else if (typeof value === 'string') {
    if (!isNaN(Date.parse(value))) {
      d = new Date(value)
    }
  } else if (value instanceof Date) {
    d = value
  }

  if (d) {
    const now = new Date()
    return now.toDateString() === d.toDateString()
  }
  return false
}

function isUUID(value) {
  return typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

module.exports = {
  isTodaysDate,
  isUUID
};
