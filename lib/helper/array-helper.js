const nonEmptyValues = val =>
  val !== '' && val !== undefined && val !== null && val !== []

module.exports = { nonEmptyValues }
