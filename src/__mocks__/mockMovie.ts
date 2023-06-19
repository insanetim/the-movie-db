import type { IBackdrop, ICast, ICrew, IMovie, IMovieDetailExtended } from 'src/interfaces/movie.interface'

export const mockMovie: IMovie = {
  adult: false,
  backdrop_path: '/image',
  genre_ids: [1, 2, 3],
  id: 123,
  original_language: 'en',
  original_title: 'test/title',
  overview: 'test/overview',
  popularity: 123,
  poster_path: '/image',
  release_date: '01-01-1999',
  title: 'test/title',
  video: false,
  vote_average: 123,
  vote_count: 123
}

export const mockMovieDetail: IMovieDetailExtended = {
  accountStates: { favorite: false, id: 123, rated: false, watchlist: false },
  adult: false,
  backdrop_path: '/image',
  belongs_to_collection: null,
  budget: 1000000,
  credits: {
    cast: [
      {
        adult: true,
        cast_id: 123,
        character: 'test/character',
        credit_id: '123',
        gender: null,
        id: 123,
        known_for_department: '',
        name: 'test/name',
        order: 123,
        original_name: 'test/name',
        popularity: 123,
        profile_path: '/image'
      }
    ],
    crew: [
      {
        adult: true,
        credit_id: '123',
        department: 'test/department',
        gender: null,
        id: 123,
        job: 'test/job',
        known_for_department: '',
        name: 'test/name',
        original_name: 'test/name',
        popularity: 123,
        profile_path: '/image'
      }
    ],
    id: 123
  },
  genre_ids: [1, 2, 3],
  genres: [{ id: 1, name: 'test/genre' }],
  homepage: null,
  id: 123,
  images: [
    {
      aspect_ratio: 0.5625,
      file_path: '/image',
      height: 900,
      iso_639_1: null,
      vote_average: 123,
      vote_count: 123,
      width: 1600
    }
  ],
  imdb_id: null,
  original_language: 'en',
  original_title: 'test/title',
  overview: 'test/overview',
  popularity: 123,
  poster_path: '/image',
  production_companies: [{ id: 123, logo_path: null, name: 'test/company', origin_country: 'USA' }],
  production_countries: [{ iso_3166_1: 'en', name: 'USA' }],
  release_date: '01-01-1999',
  revenue: 3000000,
  runtime: 150,
  spoken_languages: [{ iso_639_1: 'en', name: 'EN' }],
  status: 'test/status',
  tagline: null,
  title: 'test/title',
  video: false,
  vote_average: 123,
  vote_count: 123
}

export const mockCast: ICast = {
  adult: true,
  cast_id: 123,
  character: 'test/character',
  credit_id: '123',
  gender: null,
  id: 123,
  known_for_department: '',
  name: 'test/name',
  order: 123,
  original_name: 'test/name',
  popularity: 123,
  profile_path: '/image'
}

export const mockCrew: ICrew = {
  adult: true,
  credit_id: '123',
  department: 'test/department',
  gender: null,
  id: 123,
  job: 'test/job',
  known_for_department: '',
  name: 'test/name',
  original_name: 'test/name',
  popularity: 123,
  profile_path: '/image'
}

export const mockImage: IBackdrop = {
  aspect_ratio: 0.5625,
  file_path: '/image',
  height: 900,
  iso_639_1: null,
  vote_average: 123,
  vote_count: 123,
  width: 1600
}
