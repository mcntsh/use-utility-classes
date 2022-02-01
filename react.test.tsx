import React from 'react'
import renderer from 'react-test-renderer'
import { ClassNameCreator } from './'
import withSetClassName from './react'

type ReactComponentProps = {
  type?: 'A' | 'B' | 'C'
  color?: 'B' | 'D'
  id?: string
  children?: React.ReactNode
  setClassName: ClassNameCreator
}

function ReactComponent({ type, children, setClassName, ...props }: ReactComponentProps) {
  const aVariant = {
    when: { type: 'A' },
    use: 'a',
  }
  const abVariant = {
    when: { type: 'A', color: 'B' },
    use: 'ab',
  }

  return (
    <div className={setClassName(aVariant, abVariant)} {...props}>
      {children}
    </div>
  )
}

test('renders the wrapped component as you would expect using the withSetClassName HOC', () => {
  const ReactComponentHOC = withSetClassName(ReactComponent)

  const component = renderer.create(
    <ReactComponentHOC id="foo">
      <div className="child">Hello!</div>
    </ReactComponentHOC>
  )
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

test('passes the setClassName helper and reacts to prop changes', () => {
  const ReactComponentHOC = withSetClassName(ReactComponent)

  const component = renderer.create(
    <>
      <ReactComponentHOC id="1" type='C' color='D'>
        <div className="child">No classes</div>
      </ReactComponentHOC>
      <ReactComponentHOC id="2" type='A' color='D'>
        <div className="child">Type classes</div>
      </ReactComponentHOC>
      <ReactComponentHOC id="3" type='A' color='B'>
        <div className="child">Type color classes</div>
      </ReactComponentHOC>
    </>
  )
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

test('passes the debug option to the setClassName helper', () => {
  const ReactComponentHOC = withSetClassName(ReactComponent, { debug: true })

  const component = renderer.create(
      <ReactComponentHOC id="3" type='A' color='B'>
        <div className="child">Type color classes</div>
      </ReactComponentHOC>
  )
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

test('passes the prefix option to the setClassName helper', () => {
  const ReactComponentHOC = withSetClassName(ReactComponent, { prefix: 'tw-' })

  const component = renderer.create(
      <ReactComponentHOC id="3" type='A' color='B'>
        <div className="child">Type color classes</div>
      </ReactComponentHOC>
  )
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})
