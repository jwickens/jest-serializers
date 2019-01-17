
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

module.exports = {
  isTodaysDate
};
