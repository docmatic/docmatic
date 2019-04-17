const test = require('tape')
const objectHelper = require('../../lib/helper/object-helper.js')

test('object-helper.js', tst => {
  const example = { a: 'one', b: 'two', c: 'three' }
  tst.test('filterKeys', t => {
    t.deepEqual(
      objectHelper.filterKeys(example, 'b'),
      { a: 'one', c: 'three' },
      'a single key should be filtered out when given'
    )

    t.deepEqual(
      objectHelper.filterKeys(example, ['b', 'c']),
      { a: 'one' },
      'a list of keys should be filtered out if an array is provided'
    )

    t.end()
  })

  tst.end()
})
