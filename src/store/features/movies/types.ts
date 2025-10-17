import { Query } from 'src/interfaces/global.interface'

export type SearchMoviesReq = {
  include_adult?: boolean
  page: string
  query: Query
}
