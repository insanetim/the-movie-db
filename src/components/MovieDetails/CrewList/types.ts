import { IMovieCredit } from 'src/interfaces/movie.interface'

export type CrewListHookProps = {
  crew: IMovieCredit[]
}

export type CrewListHookReturn = {
  groupedCrew: Partial<Record<string, IMovieCredit[]>> & {
    groupNames: string[]
  }
}

export type CrewListProps = {
  crew: IMovieCredit[]
}
