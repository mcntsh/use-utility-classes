import useUtilityClasses from './index'

test('returns a function when called with props', () => {
  const setClassName = useUtilityClasses({ prop: true })
  expect(typeof setClassName).toBe('function')
})

test('generates default classNames as a string', () => {
  const setClassName = useUtilityClasses()

  const classNames = setClassName({ use: 'a b c' })

  expect(classNames).toBe('a b c')

  const moreClassNames = setClassName(
    { use: ' a b c' },
    { use: 'd e fg hijk ' }
  )

  expect(moreClassNames).toBe('a b c d e fg hijk')
})

test('uses prop values to determine classNames', () => {
  const setClassName = useUtilityClasses({ foo: 'bar', baz: false })

  const classNames = setClassName({
    when: { foo: 'bar', baz: false },
    use: 'a b c',
  })

  expect(classNames).toBe('a b c')

  const badClassNames = setClassName({
    when: { foo: 'buzz' },
    use: 'a b c',
  })

  expect(badClassNames).toBe('')
})

test('handles shorthand default classNames', () => {
  const setClassName = useUtilityClasses({ foo: 'bar' })

  const classNames = setClassName(
    {
      when: { foo: 'bar' },
      use: 'a b c',
    },
    'default'
  )

  expect(classNames).toBe('a b c default')
})
