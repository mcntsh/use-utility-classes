# 🎨 useClassName 

Allows you to make your component's class-names reactive to your component state. Ideally used in conjunction with a utility-CSS framework like [Tailwind](https://tailwindcss.com/) or [Tachyons](https://tachyons.io/).

## Install

- `npm install use-className` or
- `yarn add use-className`

## Use

Pass your props to the `useClassName` hook, then pass conditions to the function it returns to conditionally render certain props:

```javascript
const Component = ({ color }) => {
  const setClassName = useClassName({ color })
  return <span className={
    setClassName({ props: { color: 'red' }, className: 'Component--red' })
  }>Hey!</span>
}
```

Your span will get the class-name `Component--red` if your component has the prop `color` equal to `'red'`. You can add multiple criteria:

```javascript
const Component = ({ color, isDisabled }) => {
  const setClassName = useClassName({ color, isDisabled })
  return <span className={
    setClassName({
      props: {
        color: 'red',
        isDisabled: false
      },
      className: 'Component--red'
    })
  }>Hey!</span>
}
```

Now the span will only have the class-name `Component--red` if it has the props `{ color: 'red', isDisabled: false }`. You can also pass more than one condition to the `setClassName` function:

```javascript
const Component = ({ color, isDisabled }) => {
  const setClassName = useClassName({ color, isDisabled })
  return <span className={
    setClassName(
      {
        props: {
          color: 'red',
          isDisabled: false
        },
        className: 'Component--red'
      },
      {
        props: {
          color: 'blue',
          isDisabled: false
        }
        className: 'Component--blue'
      }
    )
  }>Hey!</span>
}

```

For class-names that should always display, such as default class-names, just pass a string:

```javascript
const Component = ({ color, isDisabled }) => {
  const setClassName = useClassName({ color, isDisabled })
  return <span className={
    setClassName(
      {
        props: {
          color: 'red',
          isDisabled: false
        },
        className: 'Component--red Component--redEnabled'
      },
      'Component--default Component--span'
    )
  }>Hey!</span>
}
```

Here's an example of a button, built with Tailwind:

```javascript
import React from 'react';
import useClassName from 'use-className';

const primaryPurpleClasses = {
  props: {
    type: 'primary',
    isDisabled: false,
    color: 'purple',
  }
  className: 'bg-purple-800 text-purple-900'
}

const primaryPurpleDisabledClasses = {
  props: {
    type: 'primary',
    isDisabled: true,
    color: 'purple',
  }
  className: 'bg-purple-600 text-purple-300'
}

const enabledClasses = {
  props: { 
    isDisabled: false,
  }
  className: 'cursor-pointer hover:bg-opacity-60'
}

const disabledClasses = {
  props: {
    isDisabled: true
  },
  className: 'cursor-not-allowed'
}

const defaultClasses = `
  bg-opacity-50 hover:bg-opacity-60
  transition-colors duration-200 rounded-xl font-semibold
  py-2 px-4 inline-flex
`

const Button = ({ type, color, isDisabled, label }) => {
  const setClassName = useClassName({
    type,
    color,
    isDisabled,
    label
  })

  const className = setClassName(
    primaryPurpleClasses,
    primaryPurpleDisabledClasses,
    enabledClasses,
    disabledClasses,
    defaultClasses
  );

  return <button className={className}>{label}</button>
}
```
