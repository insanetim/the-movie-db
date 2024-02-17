import { ICrew } from 'src/interfaces/movie.interface'

export type CrewListProps = {
  crew: ICrew[]
}

export type CrewListHookProps = {
  crew: ICrew[]
}

export type CrewListHookReturn = {
  groupedCrew: Partial<Record<string, ICrew[]>> & {
    groupNames: string[]
  }
}
