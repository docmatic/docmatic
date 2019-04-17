const filterKeys = (object, keyOrKeys) => {
  const keys = [].concat(keyOrKeys)

  return Object.keys(object)
    .filter(k => keys.indexOf(k) < 0)
    .reduce((result, curr) => {
      result[curr] = object[curr]
      return result
    }, {})
}

module.exports = { filterKeys }
