import { isEmpty, isNotNil } from 'ramda'

const isPresent = <T>(val: T): val is NonNullable<T> => {
  return isNotNil(val) && !isEmpty(val)
}

export default isPresent
