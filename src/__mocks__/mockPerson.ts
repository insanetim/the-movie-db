import {
  IExternalIds,
  IPersonCredit,
  IPersonDetails,
} from 'src/interfaces/person.interface'
import { ICredit } from 'src/pages/Credits/types'

const mockExternalIds: IExternalIds = {
  facebook_id: 'facebook_user',
  instagram_id: 'instagram_user',
  tiktok_id: 'tiktok_user',
  twitter_id: 'twitter_user',
}

const mockCreditCast: IPersonCredit[] = [
  {
    character: 'Neo',
    id: 1234,
    popularity: 100500,
    poster_path: '/image',
    release_date: '1999-01-01',
    title: 'The Matrix',
  },
  {
    character: '',
    id: 1223,
    popularity: 100500,
    poster_path: '/image',
    release_date: '2003-01-01',
    title: 'The Matrix Reloaded',
  },
]

const mockedCreditCrew: IPersonCredit[] = [
  {
    department: 'Directing',
    id: 1234,
    job: 'Director',
    popularity: 100500,
    poster_path: '/image',
    release_date: '1999-01-01',
    title: 'The Matrix',
  },
  {
    department: 'Directing',
    id: 4321,
    job: 'Director',
    popularity: 999,
    poster_path: null,
    release_date: '',
    title: 'Jupiter Ascending',
  },
]

const mockedCredits: ICredit[] = [
  {
    key: '1234-the-chosen-one',
    movieSlug: '1234-test-movie',
    posterPath: '/image',
    releaseDate: '1999-01-01',
    releaseDateTitle: '1999',
    role: 'the-chosen-one',
    title: 'the-matrix',
  },
  {
    key: '4321-darth-maul',
    movieSlug: '4321-test-movie',
    posterPath: null,
    releaseDate: '2020-01-01',
    releaseDateTitle: '2020',
    role: 'darth-maul',
    title: 'star-wars',
  },
]

const mockPersonDetails: IPersonDetails = {
  biography: 'test-biography',
  birthday: '1999-01-01',
  external_ids: mockExternalIds,
  gender: 0,
  id: 1234,
  known_for_department: 'Acting',
  movie_credits: {
    cast: mockCreditCast,
    crew: mockedCreditCrew,
  },
  name: 'test-person',
  place_of_birth: 'New York, USA',
  popularity: 100500,
  profile_path: '/image',
}

export { mockPersonDetails, mockedCredits }
