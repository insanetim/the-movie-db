import { IResponse } from './global.interface'

export interface IMovie {
  id: number | string
  original_language: string
  overview?: string
  poster_path: null | string
  release_date?: string
  title: string
}

interface IGenre {
  id: number
  name: string
}

interface ICountry {
  iso_3166_1: string
  name: string
}

export interface IMovieDetails extends IMovie {
  budget: number
  genres: IGenre[]
  imdb_id: null | string
  production_countries: ICountry[]
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

export interface IMovieCredit {
  character?: string
  credit_id: string
  department?: string
  id: number
  job?: string
  name: string
  profile_path?: string
}

interface IRating {
  count?: number
  star?: number
}

export interface IMDBInfo {
  contentRating?: string
  id: string
  rating?: IRating
}

export interface IMovieDetailsExtended extends IMovieDetails {
  account_states: IMovieAccountStates
  credits: {
    cast: IMovieCredit[]
    crew: IMovieCredit[]
  }
  images: IMovieImages
  imdbInfo?: IMDBInfo
}

export type IMoviesList = IResponse<IMovie>
