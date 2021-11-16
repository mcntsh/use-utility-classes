import memoize from 'lodash.memoize'

type PropKey = string
type PropValue = string | boolean | number | undefined | null
type Props = Record<PropKey, PropValue>

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

function filterConditionsViaProps(
  props: Props,
  conditions: Array<ClassNameCondition>
): Array<ClassNameCondition> {
  return conditions.filter((condition: ClassNameCondition) => {
    return checkConditionPasses(props, condition)
  })
}

function getClassNameFromConditions(
  conditions: Array<ClassNameCondition>
): string {
  return conditions
    .map((condition: ClassNameCondition) =>
      (isString(condition) ? condition : condition.use).trim()
    )
    .join(' ')
}

function useUtilityClasses(props: Props = {}): ClassNameCreator {
  return (...conditions: Array<ClassNameCondition>): string => {
    return getClassNameFromConditions(
      filterConditionsViaProps(props, conditions)
    )
  }
}

function getShallowHashFromProps(props: Props): string {
  return Object.keys(props)
    .map((propKey: PropKey) => `${propKey}:${props[propKey]}`)
    .join('|')
}

export default memoize(useUtilityClasses, (props: Props = {}) =>
  getShallowHashFromProps(props)
)
