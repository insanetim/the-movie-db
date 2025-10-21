import { ErrorMsg } from 'src/interfaces/global.interface'
import { IPersonDetails } from 'src/interfaces/person.interface'

export enum FilterOptions {
  All = 'all',
  Cast = 'cast',
  Crew = 'crew',
}

export type CreditsHookReturn = {
  dataSource: ICredit[]
  error: ErrorMsg
  handleChangeFilter: (filter: FilterOptions) => void
  isLoading: boolean
  person?: IPersonDetails
  personSlug: string
}

export type CreditsRouteParams = {
  personSlug: string
}

export interface ICredit {
  key: string
  movieSlug: string
  posterPath: null | string
  releaseDate: string
  releaseDateTitle: string
  role: string
  title: string
}
