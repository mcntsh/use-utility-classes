# 🧱 useUtilityClasses 

Make your component's class-names reactive to your component state. Ideally used in conjunction with a utility-CSS framework like [Tailwind](https://tailwindcss.com/) or [Tachyons](https://tachyons.io/).

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

  return <span className={className}>Hey!</span>
}
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

  return <span className={className}>Hey!</span>
}
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

  return <span className={className}>Hey!</span>
}
```

For class-names that should always display, such as default class-names, just pass a string:

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

  return <span className={className}>Hey!</span>
}
```

Here's a real world example of a `Button` component using Tailwind, with a ghost/default variaton and a loading state:

```javascript
import useUtilityClasses from 'use-utility-classes'
import { TEXT_CLASSES } from '../../constants/base-classes'

const buttonClasses = `
  tw-border-2 tw-rounded-md tw-px-4
  tw-py-2 tw-transition-colors
`

const typeLoadingVariant = {
  when: { isLoading: true },
  use: 'tw-cursor-not-allowed tw-border-gray-300 tw-text-gray-400'
}

const typeDefaultVariant = {
  when: { type: 'default', isLoading: false },
  use: `
    tw-border-black tw-bg-black hover:tw-bg-gray-700
    tw-text-white
  `
}

const typeDefaultLoadingVariant = {
  when: { type: 'default', isLoading: true },
  use: 'tw-bg-gray-300'
}

const typeGhostVariant = {
  when: { type: 'ghost', isLoading: false },
  use: `
    tw-border-black hover:tw-bg-black hover:tw-text-white
    tw-text-black tw-bg-white
  `
}

const Button = ({ type = 'default', isLoading }) => {
  const setClassName = useUtilityClasses({ type, isLoading })

  const className = setClassName(
    typeDefaultVariant,
    typeDefaultLoadingVariant,
    typeGhostVariant,
    typeLoadingVariant,
    buttonClasses,
    TEXT_CLASSES.CTA
  )

  return <button className={className}>Hey!</button>
}
```

## Prefixes

You can pass a `prefix` option if you'd like a prefix automatically appended to your utility classes:

```javascript
import useUtilityClasses from 'use-utility-classes'

const Component = props => {
  const setClassName = useUtilityClasses(props, { prefix: 'tw-' })
  const className = setClassName('border-black bg-black hover:bg-gray-700 text-white')

  return <button className={className}>Hey!</button>
}

// <button class="tw-border-black tw-bg-black hover:tw-bg-gray-700 tw-text-white"
```

## Debugging

Debugging utility classes can be hard when you look at the DOM. You can pass an option to make the classes more legible while you're doing development:

```javascript
import useUtilityClasses from 'use-utility-classes'

const Component = props => {
  const setClassName = useUtilityClasses(props, { debug: true })
  
  const className = setClassName(
    'uppercase text-xs font-semibold tracking-wide
    { when: { isLoading: true }, use: 'text-gray-300 cursor-not-allowed' },
    { when: { isLoading: false }, use: 'text-black cursor-pointer'
  )

  return <button className={className}>Hey!</button>
}
```

When your className is rendered in the DOM, it will list out the enabled *and* the disabled classes by the order they were passed to the `setClassName` function:

```html
<!-- props: { isLoading: false } -->

<button class="
• uppercase text-xs font-semibold tracking-wide
×⠀text-gray-300⠀cursor-not-allowed
• text-black cursor-pointer">Hey!</button>

<!-- props: { isLoading: true } -->

<button class="
• uppercase text-xs font-semibold tracking-wide
• text-gray-300 cursor-not-allowed
×⠀text-black⠀cursor-pointer">Hey!</button>
```
