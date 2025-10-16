import { ErrorMsg } from 'src/interfaces/global.interface'
import { IPersonDetails } from 'src/interfaces/person.interface'

export type PersonDetailsHookReturn = {
  error: ErrorMsg
  handleGoToCredits: () => void
  isLoading: boolean
  person?: IPersonDetails
}

export type PersonDetailsRouteParams = {
  personSlug: string
}
