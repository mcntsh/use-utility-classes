# 🧱 useUtilityClasses 

Make your component's class-names reactive to your component state. Ideally used in conjunction with a utility-CSS framework like [Tailwind](https://tailwindcss.com/) or [Tachyons](https://tachyons.io/).

------

1. [Install](#install)
2. [Use](#use)
3. [HOC](#hoc)
4. [Prefixes](#prefixes)
5. [Debugging](#debugging)

## Install

- `npm install use-utility-classes` or
- `yarn add use-utility-classes`

## Use

Pass your props to the `useUtilityClasses` hook, then pass conditions to the function it returns to conditionally render certain props:

```javascript
import useUtilityClasses from 'use-utility-classes'

const Component = ({ color }) => {
  // Watch the value for the prop `color`
  const setClassName = useUtilityClasses({ color })
  // Set the class `text-red-500` when the value is `red`
  const className = setClassName({
    when: { color: 'red' },
    use: 'text-red-500'
  })

  return <span className={className} />
}
```
```javascript
<Component color='red' /> // <span class="text-red-500" />
<Component color='blue' />  // <span />
```

You can add multiple criteria:

```javascript
import useUtilityClasses from 'use-utility-classes'

const Component = ({ color, isDisabled }) => {
  // Watch the value for the following props:
  const setClassName = useUtilityClasses({ color, isDisabled })
  // Only set the class when the color is red *and* the component is not disabled
  const className = setClassName({
    when: {
      color: 'red',
      isDisabled: false
    },
    use: 'text-red-500'
  })

  return <span className={className} />
}
```
```javascript
<Component color='red' isDisabled={true} /> // <span class="text-red-500" /> 
<Component color='red' isDisabled={false} /> => <span />
```

You can also pass more than one condition to the `setClassName` function:

```javascript
import useUtilityClasses from 'use-utility-classes'

const redEnabledVariant = {
  when: {
    color: 'red',
    isDisabled: false
  },
  use: 'text-red-500'
}

const redDisabledVariant = {
  when: {
    color: 'red',
    isDisabled: true
  },
  use: 'text-red-300 cursor-not-allowed'
}

const Component = ({ color, isDisabled }) => {
  const setClassName = useUtilityClasses({ color, isDisabled })
  const className = setClassName(redEnabledVariant, redDisabledVariant)

  return <span className={className} />
}
```
```javascript
<Component color='red' isDisabled={false} /> // <span class="text-red-500" />
<Component color='red' isDisabled={true} /> // <span class="text-red-300 cursor-not-allowed" />
```

For class-names that should always display, just pass a string:

```javascript
import useUtilityClasses from 'use-utility-classes'

const redEnabledVariant = {
  when: {
    color: 'red',
    isDisabled: false
  },
  use: 'text-red-500'
}

const redDisabledVariant = {
  when: {
    color: 'red',
    isDisabled: true
  },
  use: 'text-red-300 cursor-not-allowed'
}

const defaultClasses = 'font-semibold text-xs uppercase'

const Component = ({ color, isDisabled }) => {
  const setClassName = useUtilityClasses({ color, isDisabled })
  const className = setClassName(
    redEnabledVariant,
    redDisabledVariant,
    defaultClasses
  )

  return <span className={className} />
}
```
```javascript
<Component color='red' isDisabled={true} /> // <span class="text-red-300 cursor-not-allowed font-semibold text-xs uppercase" />
<Component color='red' isDisabled={false} /> // <span class="text-red-500 font-semibold text-xs uppercase" />
<Component /> // <span class="font-semibold text-xs uppercase" />
```

## HOC

An HOC helper is also included in this package which will pass the hook via props. It can be used like so:

```javascript
import withSetClassName from 'use-utility-classes/react'

const Component = props => {
  const className = props.setClassName({
    when: {
      color: 'red',
      isDisabled: false
    },
    use: 'text-red-500'
  })
  
  return <span className={className} />
}

const WrappedComponent = withSetClassName(Component /*, { debug: true, prefix: 'tw-' } */)
```
```javascript
<WrappedComponent color='red' isDisabled={false} /> // <span class="text-red-500"></span>
```

## Prefixes

You can pass a `prefix` option if you'd like a prefix automatically appended to your utility classes:

```javascript
import useUtilityClasses from 'use-utility-classes'

const Component = props => {
  const setClassName = useUtilityClasses(props, { prefix: 'tw-' })
  const className = setClassName('border-black bg-black hover:bg-gray-700 text-white')

  return <button className={className} />
}
```
```javascript
<Component /> // <span class="tw-border-black tw-bg-black hover:tw-bg-gray-700 tw-text-white" />
```

## Debugging

Debugging utility classes can be hard when you look at the DOM. You can pass an option to make the classes more legible while you're doing development:

```javascript
import useUtilityClasses from 'use-utility-classes'

const Component = props => {
  const setClassName = useUtilityClasses(props, { debug: true })
  
  const className = setClassName(
    'uppercase text-xs font-semibold tracking-wide',
    { when: { isLoading: true }, use: 'text-gray-300 cursor-not-allowed' },
    { when: { isLoading: false }, use: 'text-black cursor-pointer' }
  )

  return <span className={className} />
}
```

When your className is rendered in the DOM, it will list out the enabled *and* the disabled classes by the order they were passed to the `setClassName` function:

```javascript
<Component isLoading={false} />

/*
<span class="
• uppercase text-xs font-semibold tracking-wide
×⠀text-gray-300⠀cursor-not-allowed
• text-black cursor-pointer"></span>
*/

<Component isLoading={true} />

/*
<span class="
• uppercase text-xs font-semibold tracking-wide
• text-gray-300 cursor-not-allowed
×⠀text-black⠀cursor-pointer"></span>
*/
```
