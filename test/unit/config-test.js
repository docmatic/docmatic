const test = require('tape')
const path = require('path')
const config = require('../../lib/config')
const ConfigFileError = config.ConfigFileError

const EXAMPLE_CONFIG_FILE = path.resolve(__dirname, 'fixtures/.docmatic')

const NOT_EXISTING_CONFIG_FILE = path.resolve(
  __dirname,
  'fixtures/.myfubarloo-config-not-exists'
)

const MALICIOUS_CONFIG_FILE = path.resolve(
  __dirname,
  'fixtures/.docmatic-with-malicious-content'
)

test('config.js', tst => {
  tst.ok(!!config, 'config should be loadable')

  tst.test('docmaticFilePath', t => {
    t.equal(
      config.docmaticFilePath('test/unit/fixtures/.docmatic'),
      path.resolve(__dirname, 'fixtures/.docmatic'),
      'should resolve the config file path if it exists'
    )

    t.doesNotThrow(() =>
      config.docmaticFilePath(
        NOT_EXISTING_CONFIG_FILE,
        Error,
        'should not fail even if no config exists'
      )
    )

    t.end()
  })

  tst.test('readDocmaticFile', t => {
    t.deepEqual(
      config.loadDocmaticFile(EXAMPLE_CONFIG_FILE),
      { plugins: [] },
      'returns the config parsed from the JSON file'
    )

    t.deepEqual(
      config.loadDocmaticFile(NOT_EXISTING_CONFIG_FILE),
      {},
      'returns an empty config for not existing config files'
    )

    t.throws(
      () =>
        config.loadDocmaticFile(
          config.docmaticFilePath(MALICIOUS_CONFIG_FILE)
        ),
      ConfigFileError,
      'throws a parsing exception for malicious files'
    )

    t.end()
  })

  tst.test('loadDocmaticConfig', t => {
    t.deepEqual(
      config.loadDocmaticConfig({
        docmaticFilePath: config.docmaticFilePath(EXAMPLE_CONFIG_FILE)
      }),
      { plugins: [] },
      'returns the unmodified config file, when no options are configured'
    )

    t.end()
  })

  tst.end()
})
