import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { pathOr } from 'ramda'
import { ErrorMsg } from 'src/interfaces/global.interface'

const errorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
): ErrorMsg => {
  if (!error) {
    return null
  }
  return pathOr('Something went wrong!', ['data', 'status_message'], error)
}

export default errorMessage
