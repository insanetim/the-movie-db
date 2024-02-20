import {
  ICreditCast,
  ICreditCrew,
  IExternalIds,
  IPersonDetails,
} from 'src/interfaces/person.interface'

const mockExternalIds: IExternalIds = {
  facebook_id: 'facebook_user',
  instagram_id: 'instagram_user',
  tiktok_id: '@tiktok_user',
  twitter_id: 'twitter_user',
}

const mockCreditCast: ICreditCast = {
  character: 'Neo',
  id: 1234,
  popularity: 100500,
  poster_path: '/image',
  title: 'John Doe',
}

const mockedCreditCrew: ICreditCrew = {
  department: 'Directing',
  id: 1234,
  job: 'Director',
  popularity: 100500,
  poster_path: '/image',
  title: 'John Doe',
}

const mockPersonDetails: IPersonDetails = {
  biography: 'test-biography',
  birthday: '01-01-1999',
  external_ids: mockExternalIds,
  gender: 0,
  id: 1234,
  known_for_department: 'Acting',
  movie_credits: {
    cast: [mockCreditCast],
    crew: [mockedCreditCrew],
  },
  name: 'test-person',
  place_of_birth: undefined,
  popularity: 999,
  profile_path: undefined,
}

export { mockPersonDetails }
