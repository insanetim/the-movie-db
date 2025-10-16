import { IResponse } from 'src/interfaces/global.interface'
import {
  IMDBInfo,
  IMovie,
  IMovieCredit,
  IMovieDetails,
  IMovieDetailsEx,
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
  imdb_id: 'tt1234567',
  production_countries: [
    { iso_3166_1: 'US', name: 'United States of America' },
  ],
  revenue: 3000000,
  runtime: 150,
  status: 'test/status',
}

const mockMovieCredit: IMovieCredit[] = [
  {
    character: 'test/character',
    credit_id: '1234',
    department: 'test/department',
    id: 1234,
    job: 'test/job',
    name: 'test/name',
    profile_path: '/image',
  },
]

const mockImage: IMovieImage = {
  file_path: '/image',
}

const mockImdbInfo: IMDBInfo = {
  contentRating: 'PG-13',
  id: 'tt1234567',
  rating: {
    count: 100500,
    star: 9,
  },
}

const mockMovieDetailsExtended: IMovieDetailsEx = {
  ...mockMovieDetails,
  account_states: { favorite: false, watchlist: false },
  credits: {
    cast: mockMovieCredit,
    crew: mockMovieCredit,
  },
  images: {
    backdrops: [mockImage],
    logos: [mockImage],
    posters: [mockImage],
  },
  imdbInfo: mockImdbInfo,
}

const mockMoviesResponse: IResponse<IMovie> = {
  page: 1,
  results: [mockMovie],
  total_pages: 1,
  total_results: 1,
}

export {
  mockImage,
  mockImdbInfo,
  mockMovie,
  mockMovieCredit,
  mockMovieDetailsExtended,
  mockMoviesResponse,
}
