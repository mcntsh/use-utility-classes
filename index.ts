import memoize from 'lodash.memoize'

type PropKey = string
type PropValue = string | boolean | number | undefined | null
type Props = Record<PropKey, PropValue>

type Options = {
  prefix?: string
  debug?: boolean
}

type ClassNameCondition =
  | {
      when?: Props
      use: string
    }
  | string
type ClassNameCreator = (...conditions: Array<ClassNameCondition>) => string

function isString(condition: ClassNameCondition): condition is string {
  return typeof condition === 'string'
}

function trimString(str: string): string {
  return str.replace(/\s{2,}/g, ' ').trim()
}

function prefixString(str: string, prefix: string): string {
  return str.replace(/((?!\w+:)[A-Za-z0-9-_]+)/g, `${prefix}$1`)
}

function getClassNameFromCondition(
  condition: ClassNameCondition,
  options: Options
): string {
  const className = trimString(isString(condition) ? condition : condition.use)
  if (options.prefix) {
    return prefixString(className, options.prefix)
  }

  return className
}

function checkConditionPasses(
  props: Props,
  condition: ClassNameCondition
): boolean {
  const conditionProps = !isString(condition) && condition.when
  if (!conditionProps) {
    return true
  }

  return (
    // Only keep failing prop values in the array
    // Determine pass if there are 0 values in the filtered array
    // This allows us to pass zero prop values and still pass
    Object.keys(conditionProps).filter((prop: PropKey) => {
      return props[prop] !== conditionProps[prop]
    }).length === 0
  )
}

function debugClassNameConditions(
  props: Props,
  conditions: Array<ClassNameCondition>,
  options: Options
): Array<string> {
  const X_CHARACTER = '×'
  const BULL_CHARACTER = '•'
  const NULL_SPACE = '⠀'

  return conditions.map((condition: ClassNameCondition) => {
    const className = getClassNameFromCondition(condition, options)
    if (!checkConditionPasses(props, condition)) {
      return `${X_CHARACTER}${NULL_SPACE}${className.replace(/ /g, NULL_SPACE)}`
    }

    return `${BULL_CHARACTER} ${className}`
  })
}

function filterClassNameConditions(
  props: Props,
  conditions: Array<ClassNameCondition>,
  options: Options
): Array<string> {
  return conditions.reduce(
    (filteredConditions: Array<string>, condition: ClassNameCondition) => {
      if (checkConditionPasses(props, condition)) {
        return [
          ...filteredConditions,
          getClassNameFromCondition(condition, options),
        ]
      }

      return filteredConditions
    },
    []
  )
}

function filterConditionsViaProps(
  props: Props,
  conditions: Array<ClassNameCondition>,
  options: Options
): Array<ClassNameCondition> {
  if (options.debug) {
    return debugClassNameConditions(props, conditions, options)
  }

  return filterClassNameConditions(props, conditions, options)
}

function buildClassNameFromConditions(
  conditions: Array<ClassNameCondition>,
  options: Options
): string {
  if (options.debug) {
    return `\r\n${conditions.join('\r\n')}`
  }

  return conditions.join(' ')
}

function getShallowHashFromObject(object: {}): string {
  return Object.entries(object).toString()
}

function getShallowHashFromCondition(condition: ClassNameCondition): string {
  if (isString(condition)) {
    return condition
  }

  const whenHash = condition.when
    ? getShallowHashFromObject(condition.when)
    : ''

  return `when:${whenHash} use:${condition.use}`
}

function memoizeResolveSetClassName(
  ...conditions: Array<ClassNameCondition>
): string {
  return conditions.map(getShallowHashFromCondition).toString()
}

function useUtilityClasses(
  props: Props = {},
  options: Options = {}
): ClassNameCreator {
  const setClassName = (...conditions: Array<ClassNameCondition>): string => {
    return buildClassNameFromConditions(
      filterConditionsViaProps(props, conditions, options),
      options
    )
  }

  return memoize(setClassName, memoizeResolveSetClassName)
}

function memoizeResolveUseUtilityClasses(
  props: Props = {},
  options: Options = {}
) {
  const propsHash = getShallowHashFromObject(props)
  const optionsHash = getShallowHashFromObject(options)

  return getShallowHashFromObject(`props:${propsHash} options:${optionsHash}`)
}

export default memoize(useUtilityClasses, memoizeResolveUseUtilityClasses)
