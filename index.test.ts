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
    { use: 'd e fg hijk ' },
    ` foo 
     bar baz
    buz

    biff 
                         boing`
  )

  expect(moreClassNames).toBe('a b c d e fg hijk foo bar baz buz biff boing')
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

test('renders classNames differently when debug is true', () => {
  const X_CHARACTER = '×'
  const BULLET_CHARACTER = '•'
  const NULL_SPACE = '⠀'
  const setClassName = useUtilityClasses({ foo: 'bar' }, { debug: true })

  const classNames = setClassName(
    {
      when: { foo: 'buzz' },
      use: 'a b c',
    },
    {
      when: { foo: 'bar' },
      use: 'd e f',
    },
    {
      when: { foo: 'baz' },
      use: 'g',
    }
  )

  const debugFirstClassNames = `${X_CHARACTER}${NULL_SPACE}a${NULL_SPACE}b${NULL_SPACE}c`
  const debugSecondClassNames = `${BULLET_CHARACTER} d e f`
  const debugThirdClassNames = `${X_CHARACTER}${NULL_SPACE}g`
  const debugClassNames = `\r\n${debugFirstClassNames}\r\n${debugSecondClassNames}\r\n${debugThirdClassNames}`

  expect(classNames).toBe(debugClassNames)
})
