import { IResponse } from 'src/interfaces/global.interface'
import {
  IMovie,
  IMovieCredit,
  IMovieDetails,
  IMovieDetailsExtended,
  IMovieImage,
} from 'src/interfaces/movie.interface'

const mockMovie: IMovie = {
  id: 1234,
  original_language: 'en',
  overview: 'test/overview',
  poster_path: '/image',
  release_date: '01-01-1999',
  title: 'test/title',
}

const mockMovieDetails: IMovieDetails = {
  ...mockMovie,
  budget: 1000000,
  genres: [{ id: 1, name: 'test/genre' }],
  production_countries: [
    { iso_3166_1: 'US', name: 'United States of America' },
  ],
  revenue: 3000000,
  runtime: 150,
  status: 'test/status',
}

const mockMovieCredit: IMovieCredit = {
  character: 'test/character',
  credit_id: '1234',
  department: 'test/department',
  id: 1234,
  job: 'test/job',
  name: 'test/name',
  profile_path: '/image',
}

const mockImage: IMovieImage = {
  file_path: '/image',
}

const mockMovieDetailsExtended: IMovieDetailsExtended = {
  ...mockMovieDetails,
  account_states: { favorite: false, watchlist: false },
  credits: {
    cast: [mockMovieCredit],
    crew: [mockMovieCredit],
  },
  images: {
    backdrops: [mockImage],
    logos: [mockImage],
    posters: [mockImage],
  },
}

const mockMoviesResponse: IResponse<IMovie> = {
  page: 1,
  results: [mockMovie],
  total_pages: 1,
  total_results: 1,
}

export {
  mockImage,
  mockMovie,
  mockMovieCredit,
  mockMovieDetailsExtended,
  mockMoviesResponse,
}
