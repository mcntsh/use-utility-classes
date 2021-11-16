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
  const setClassName = useFancy({ color, isDisabled })
  return <span className={
    setClassName(redEnabledVariant, defaultVariant)
  }>Hey!</span>
}
```
