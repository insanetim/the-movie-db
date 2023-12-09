import { IResponse } from 'src/interfaces/global.interface'
import {
  IBackdrop,
  ICast,
  ICrew,
  IMovie,
  IMovieDetail,
  IMovieDetailExtended,
} from 'src/interfaces/movie.interface'

const mockMovie: IMovie = {
  adult: false,
  backdrop_path: '/image',
  genre_ids: [1, 2, 3],
  id: 1234,
  original_language: 'en',
  original_title: 'test/title',
  overview: 'test/overview',
  popularity: 1234,
  poster_path: '/image',
  release_date: '01-01-1999',
  title: 'test/title',
  video: false,
  vote_average: 1234,
  vote_count: 1234,
}

const mockMovieDetail: IMovieDetail = {
  ...mockMovie,
  belongs_to_collection: null,
  budget: 1000000,
  genres: [{ id: 1, name: 'test/genre' }],
  homepage: null,
  imdb_id: null,
  production_companies: [
    { id: 1234, logo_path: null, name: 'test/company', origin_country: 'USA' },
  ],
  production_countries: [{ iso_3166_1: 'en', name: 'USA' }],
  revenue: 3000000,
  runtime: 150,
  spoken_languages: [{ iso_639_1: 'en', name: 'EN' }],
  status: 'test/status',
  tagline: null,
}

const mockMovieDetailExtended: IMovieDetailExtended = {
  ...mockMovieDetail,
  accountStates: { favorite: false, id: 1234, rated: false, watchlist: false },
  credits: {
    cast: [
      {
        adult: true,
        cast_id: 1234,
        character: 'test/character',
        credit_id: '123',
        gender: null,
        id: 1234,
        known_for_department: '',
        name: 'test/name',
        order: 1234,
        original_name: 'test/name',
        popularity: 1234,
        profile_path: '/image',
      },
    ],
    crew: [
      {
        adult: true,
        credit_id: '123',
        department: 'test/department',
        gender: null,
        id: 1234,
        job: 'test/job',
        known_for_department: '',
        name: 'test/name',
        original_name: 'test/name',
        popularity: 1234,
        profile_path: '/image',
      },
    ],
    id: 1234,
  },
  images: [
    {
      aspect_ratio: 0.5625,
      file_path: '/image',
      height: 900,
      iso_639_1: null,
      vote_average: 1234,
      vote_count: 1234,
      width: 1600,
    },
  ],
}

const mockCast: ICast = {
  adult: true,
  cast_id: 1234,
  character: 'test/character',
  credit_id: '123',
  gender: null,
  id: 1234,
  known_for_department: '',
  name: 'test/name',
  order: 1234,
  original_name: 'test/name',
  popularity: 1234,
  profile_path: '/image',
}

const mockCrew: ICrew = {
  adult: true,
  credit_id: '123',
  department: 'test/department',
  gender: null,
  id: 1234,
  job: 'test/job',
  known_for_department: '',
  name: 'test/name',
  original_name: 'test/name',
  popularity: 1234,
  profile_path: '/image',
}

const mockImage: IBackdrop = {
  aspect_ratio: 0.5625,
  file_path: '/image',
  height: 900,
  iso_639_1: null,
  vote_average: 1234,
  vote_count: 1234,
  width: 1600,
}

const mockMoviesResponse: IResponse<IMovie> = {
  page: 1,
  results: [mockMovie],
  total_pages: 1,
  total_results: 1,
}

export {
  mockCast,
  mockCrew,
  mockImage,
  mockMovie,
  mockMovieDetail,
  mockMovieDetailExtended,
  mockMoviesResponse,
}
