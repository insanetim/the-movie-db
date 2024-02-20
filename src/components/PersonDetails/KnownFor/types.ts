import { ICredit, IPersonDetails } from 'src/interfaces/person.interface'

export type KnownForProps = {
  credits: IPersonDetails['movie_credits']
  knownForDepartment: IPersonDetails['known_for_department']
}

export type KnownForHookProps = {
  credits: IPersonDetails['movie_credits']
  knownForDepartment: IPersonDetails['known_for_department']
}

export type KnownForHookReturn = {
  sortedItems: ICredit[]
}
