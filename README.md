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
  const setClassName = useUtilityClasses({ color })
  return <span className={
    setClassName({ when: { color: 'red' }, use: 'text-red-500' })
  }>Hey!</span>
}
```

You can add multiple criteria:

```javascript
import useUtilityClasses from 'use-utility-classes'

const Component = ({ color, isDisabled }) => {
  const setClassName = useUtilityClasses({ color, isDisabled })
  return <span className={
    setClassName({
      when: {
        color: 'red',
        isDisabled: false
      },
      use: 'text-red-500'
    })
  }>Hey!</span>
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
  return <span className={
    setClassName(redEnabledVariant, redDisabledVariant)}
  >Hey!</span>
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

const defaultVariant = 'font-semibold text-xs uppercase'

const Component = ({ color, isDisabled }) => {
  const setClassName = useUtilityClasses({ color, isDisabled })
  return <span className={
    setClassName(redEnabledVariant, defaultVariant)
  }>Hey!</span>
}
```

Otherwise just compose your styles as you would with JavaScript. Here's a real world example of a button:

```javascript
import useUtilityClasses from 'use-utility-classes'
import {
  cta, // uppercase text-xs font-semibold tracking-wide
} from '../utils/classes/text'
import {
  disabled, // cursor-not-allowed
} from '../utils/classes/behaviours'

const typeDefaultVariant = {
  when: { type: 'default', isLoading: false },
  use: `bg-black hover:bg-gray-700 text-white`
}

const typeDefaultLoadingVariant = {
  when: { type: 'default', isLoading: true },
  use: `bg-gray-300 text-gray-400`
}

const typeGhostVariant = {
  when: { type: 'ghost', isDisabled: false },
  use: `border-2 border-black hover:bg-black hover:text-white text-black`
}

const typeLoadingVariant = {
  when: { isLoading: true },
  use: disabled
}

const defaultClasses = `rounded-md px-4 py-2 transition-colors ${cta}`

const Button = ({ type = 'default', isLoading }) => {
  const setClassName = useUtilityClasses({ isLoading })
  const className = setClassName(
    typeDefaultVariant,
    typeDefaultLoadingVariant,
    typeGhostVariant,
    typeLoadingVariant
    defaultClasses,
  )
  return <span className={
    setClassName(redEnabledVariant, defaultVariant)
  }>Hey!</span>
}
```
