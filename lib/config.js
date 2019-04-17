const fs = require('fs')
const path = require('path')
const objectHelper = require(path.join(__dirname, 'helper', 'object-helper.js'))

const docmaticFilePath = (configFileName = '.docmatic') => {
  try {
    return path.resolve(process.cwd(), configFileName)
  } catch (e) {
    // it's ok to not have a config file
    return null
  }
}
const readDocmaticFile = filePath => {
  try {
    return fs.readFileSync(filePath)
  } catch (e) {
    throw new ConfigFileError(
      'DocmaticConfigNotReadable',
      `.docmatic file not readable: ${e.message}`
    )
  }
}
const loadDocmaticFile = filePath => {
  if (!filePath || !fs.existsSync(filePath)) {
    return {}
  }

  const fileBuffer = readDocmaticFile(filePath)

  try {
    return JSON.parse(fileBuffer)
  } catch (e) {
    throw new ConfigFileError(
      'DocmaticConfigNotParsable',
      `.docmatic file not parsable: ${e.message}`
    )
  }
}

const loadDocmaticConfig = (options = {}) => {
  const fileConfig = loadDocmaticFile(
    docmaticFilePath(options.docmaticFilePath)
  )

  const cleanedOptions = objectHelper.filterKeys(options, 'docmaticFilePath')

  return Object.assign({}, fileConfig, { ...cleanedOptions })
}

class ConfigFileError extends Error {
  constructor (...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConfigFileError)
    }

    this.name = 'ConfigFileError'
  }
}

module.exports = {
  docmaticFilePath,
  loadDocmaticFile,
  loadDocmaticConfig,
  ConfigFileError
}
