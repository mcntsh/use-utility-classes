import React from 'react'
import omitBy from 'lodash.omitby'
import isObjectLike from 'lodash.isobjectlike'
import useUtilityClasses, {
  ClassNameCreator,
  Options as ClassNameCreatorOptions,
} from './'

interface WithSetClassNameProps {
  setClassName: ClassNameCreator
}

interface WithChildren {
  children?: React.ReactNode
}

export default function withSetClassName<
  T extends WithSetClassNameProps = WithSetClassNameProps
>(
  WrappedComponent: React.ComponentType<T>,
  options: ClassNameCreatorOptions = {}
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithSetClassName = (
    props: Omit<T, keyof WithSetClassNameProps> & WithChildren
  ) => {
    const usableProps: Record<string, any> = omitBy(
      { ...(WrappedComponent.defaultProps || {}), ...props },
      isObjectLike
    )
    const setClassName = useUtilityClasses(usableProps, options)

    return React.createElement(
      WrappedComponent,
      { ...(props as T), setClassName },
      props.children
    )
  }

  ComponentWithSetClassName.displayName = `withSetClassName(${displayName})`

  return React.memo(ComponentWithSetClassName)
}
