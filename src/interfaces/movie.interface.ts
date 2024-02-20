import { IResponse } from './global.interface'

export interface IMovie {
  id: number | string
  original_language: string
  overview?: string
  poster_path?: string
  release_date?: string
  title: string
}

interface IGenre {
  id: number
  name: string
}

export interface IMovieDetails extends IMovie {
  budget: number
  genres: IGenre[]
  revenue: number
  runtime: number
  status: string
}

export interface IMovieImage {
  file_path: string
}

export interface IMovieImages {
  backdrops: IMovieImage[]
  logos: IMovieImage[]
  posters: IMovieImage[]
}

export interface IMovieAccountStates {
  favorite: boolean
  watchlist: boolean
}

export interface ICast {
  character: string
  credit_id: string
  id: number
  name: string
  profile_path?: string
}

export interface ICrew {
  credit_id: string
  department: string
  id: number
  job: string
  name: string
  profile_path?: string
}

export interface IMovieDetailsExtended extends IMovieDetails {
  account_states: IMovieAccountStates
  credits: {
    cast: ICast[]
    crew: ICrew[]
  }
  images: IMovieImages
}

export type IMoviesList = IResponse<IMovie>
