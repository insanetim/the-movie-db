import { pathOr } from 'ramda'
import { ErrorMsg } from 'src/interfaces/global.interface'

const errorMessage = (error?: unknown): ErrorMsg => {
  return error
    ? pathOr('Something went wrong!', ['data', 'status_message'], error)
    : null
}

export default errorMessage
