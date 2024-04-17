import { pathOr } from 'ramda'

const errorMessage = (error: unknown) =>
  pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

export default errorMessage
