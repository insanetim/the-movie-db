export interface IMovie {
  adult: boolean
  backdrop_path: null | string
  genre_ids: number[]
  id: number | string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: null | string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface IGenre {
  id: number
  name: string
}

interface IProductionCompany {
  id: number
  logo_path: null | string
  name: string
  origin_country: string
}

interface IProductionCountry {
  iso_3166_1: string
  name: string
}

interface ISpokenLanguage {
  iso_639_1: string
  name: string
}

export interface IMovieDetail extends IMovie {
  belongs_to_collection: null
  budget: number
  genres: IGenre[]
  homepage: null | string
  imdb_id: null | number
  production_companies: IProductionCompany[]
  production_countries: IProductionCountry[]
  revenue: number
  runtime: number
  spoken_languages: ISpokenLanguage[]
  status: string
  tagline: null | string
}

export interface IBackdrop {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: null | string
  vote_average: number
  vote_count: number
  width: number
}

interface IPoster extends IBackdrop {}

export interface IMovieImages {
  backdrops: IBackdrop[]
  id: number
  posters: IPoster[]
}

export interface IMovieAccountStates {
  favorite: boolean
  id: number
  rated: boolean
  watchlist: boolean
}

export interface ICast {
  adult: boolean
  cast_id: number
  character: string
  credit_id: string
  gender: null | number
  id: number
  known_for_department: string
  name: string
  order: number
  original_name: string
  popularity: number
  profile_path: null | string
}

export interface ICrew {
  adult: boolean
  credit_id: string
  department: string
  gender: null | number
  id: number
  job: string
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: null | string
}

export interface IMovieCredits {
  cast: ICast[]
  crew: ICrew[]
  id: number
}

export interface IMovieDetailExtended extends IMovieDetail {
  accountStates: IMovieAccountStates
  credits: IMovieCredits
  images: IBackdrop[]
}

export interface IMoviesList {
  page: number
  results: IMovie[]
  total_pages: number
  total_results: number
}
