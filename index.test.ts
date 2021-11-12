import useClassName from './index'

test('returns a function when called with props', () => {
  const createClassName = useClassName({ prop: true })
  expect(typeof createClassName).toBe('function')
})

test('generates default classNames as a string', () => {
  const createClassName = useClassName()

  const classNames = createClassName({ className: 'a b c' })

  expect(classNames).toBe('a b c')

  const moreClassNames = createClassName(
    { className: ' a b c' },
    { className: 'd e fg hijk ' }
  )

  expect(moreClassNames).toBe('a b c d e fg hijk')
})

test('uses prop values to determine classNames', () => {
  const createClassName = useClassName({ foo: 'bar', baz: false })

  const classNames = createClassName({
    props: { foo: 'bar', baz: false },
    className: 'a b c',
  })

  expect(classNames).toBe('a b c')

  const badClassNames = createClassName({
    props: { foo: 'buzz' },
    className: 'a b c',
  })

  expect(badClassNames).toBe('')
})

test('handles shorthand default classNames', () => {
  const createClassName = useClassName({ foo: 'bar' })

  const classNames = createClassName(
    {
      props: { foo: 'bar' },
      className: 'a b c',
    },
    'default'
  )

  expect(classNames).toBe('a b c default')
})
