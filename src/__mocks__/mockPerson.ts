import {
  IExternalIds,
  IPersonCredit,
  IPersonDetails,
} from 'src/interfaces/person.interface'

const mockExternalIds: IExternalIds = {
  facebook_id: 'facebook_user',
  instagram_id: 'instagram_user',
  tiktok_id: 'tiktok_user',
  twitter_id: 'twitter_user',
}

const mockCreditCast: IPersonCredit = {
  character: 'Neo',
  id: 1234,
  popularity: 100500,
  poster_path: '/image',
  title: 'The Matrix',
}

const mockedCreditCrew: IPersonCredit[] = [
  {
    department: 'Directing',
    id: 1234,
    job: 'Director',
    popularity: 100500,
    poster_path: '/image',
    title: 'The Matrix',
  },
  {
    department: 'Directing',
    id: 4321,
    job: 'Director',
    popularity: 999,
    poster_path: '/image',
    title: 'Jupiter Ascending',
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
    cast: [mockCreditCast],
    crew: mockedCreditCrew,
  },
  name: 'test-person',
  place_of_birth: 'New York, USA',
  popularity: 100500,
  profile_path: '/image',
}

export { mockPersonDetails }
