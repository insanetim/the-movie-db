export interface IMovie {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
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
  name: string
  id: number
  logo_path: string | null
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
  homepage: string | null
  imdb_id: number | null
  production_companies: IProductionCompany[]
  production_countries: IProductionCountry[]
  revenue: number
  runtime: number
  spoken_languages: ISpokenLanguage[]
  status: string
  tagline: string | null
}

export interface IBackdrop {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: string | null
  vote_average: number
  vote_count: number
  width: number
}

interface IPoster extends IBackdrop {}

export interface IMovieImages {
  id: number
  backdrops: IBackdrop[]
  posters: IPoster[]
}

export interface IMovieAccountStates {
  id: number
  favorite: boolean
  rated: boolean
  watchlist: boolean
}

export interface ICast {
  adult: boolean
  gender: number | null
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface ICrew {
  adult: boolean
  gender: number | null
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  credit_id: string
  department: string
  job: string
}

export interface IMovieCredits {
  id: number
  cast: ICast[]
  crew: ICrew[]
}

export interface IMovieDetailExtended extends IMovieDetail {
  images: IBackdrop[]
  accountStates: IMovieAccountStates
  credits: IMovieCredits
}

export interface IMoviesList {
  page: number
  results: IMovie[]
  total_pages: number
  total_results: number
}
