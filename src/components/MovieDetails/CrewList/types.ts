import { IMovieCredit } from 'src/interfaces/movie.interface'

export type CrewListProps = {
  crew: IMovieCredit[]
}

export type CrewListHookProps = {
  crew: IMovieCredit[]
}

export type CrewListHookReturn = {
  groupedCrew: {
    groupNames: string[]
  } & Partial<Record<string, IMovieCredit[]>>
}
