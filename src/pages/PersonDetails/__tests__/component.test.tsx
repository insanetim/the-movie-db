import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

import PersonDetails from '../component'
import { PersonDetailsHookReturn } from '../types'

const mockedHook: PersonDetailsHookReturn = {
  error: null,
  loading: false,
  person: mockPersonDetails,
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('PersonDetails component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<PersonDetails />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with other data', () => {
    mockedHook.person!.profile_path = undefined
    mockedHook.person!.movie_credits.cast = []
    const { asFragment } = renderWithWrapper(<PersonDetails />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty movie', () => {
    mockedHook.person = undefined
    const { asFragment } = renderWithWrapper(<PersonDetails />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHook.loading = true
    const { asFragment } = renderWithWrapper(<PersonDetails />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHook.loading = false
    mockedHook.error = 'Something went wrong!'
    const { asFragment } = renderWithWrapper(<PersonDetails />)

    expect(asFragment()).toMatchSnapshot()
  })
})
