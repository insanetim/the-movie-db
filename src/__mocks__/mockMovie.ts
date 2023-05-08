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
  vote_count: 123,
  belongs_to_collection: null,
  budget: 1000000,
  genres: [{ id: 1, name: 'test/genre' }],
  homepage: null,
  imdb_id: null,
  production_companies: [{ name: 'test/company', id: 123, logo_path: null, origin_country: 'USA' }],
  production_countries: [{ iso_3166_1: 'en', name: 'USA' }],
  revenue: 3000000,
  runtime: 150,
  spoken_languages: [{ iso_639_1: 'en', name: 'EN' }],
  status: 'test/status',
  tagline: null,
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
  accountStates: { id: 123, favorite: false, rated: false, watchlist: false },
  credits: {
    id: 123,
    cast: [
      {
        adult: true,
        gender: null,
        id: 123,
        known_for_department: '',
        name: 'test/name',
        original_name: 'test/name',
        popularity: 123,
        profile_path: '/image',
        cast_id: 123,
        character: 'test/character',
        credit_id: '123',
        order: 123
      }
    ],
    crew: [
      {
        adult: true,
        gender: null,
        id: 123,
        known_for_department: '',
        name: 'test/name',
        original_name: 'test/name',
        popularity: 123,
        profile_path: '/image',
        credit_id: '123',
        department: 'test/department',
        job: 'test/job'
      }
    ]
  }
}

export const mockCast: ICast = {
  adult: true,
  gender: null,
  id: 123,
  known_for_department: '',
  name: 'test/name',
  original_name: 'test/name',
  popularity: 123,
  profile_path: '/image',
  cast_id: 123,
  character: 'test/character',
  credit_id: '123',
  order: 123
}

export const mockCrew: ICrew = {
  adult: true,
  gender: null,
  id: 123,
  known_for_department: '',
  name: 'test/name',
  original_name: 'test/name',
  popularity: 123,
  profile_path: '/image',
  credit_id: '123',
  department: 'test/department',
  job: 'test/job'
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
