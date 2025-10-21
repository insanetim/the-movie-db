import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import PersonDetails from '../component'
import { PersonDetailsHookReturn } from '../types'

const mockedHook: PersonDetailsHookReturn = {
  error: null,
  handleGoToCredits: jest.fn(),
  isLoading: false,
  person: mockPersonDetails,
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('PersonDetails component', () => {
  const user = userEvent.setup()

  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<PersonDetails />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleGoToCredits" when button clicked', async () => {
    renderWithWrapper(<PersonDetails />)

    const button = screen.getByText('Show all credits')
    await user.click(button)

    expect(mockedHook.handleGoToCredits).toHaveBeenCalled()
  })

  it('should match snapshot with other data', () => {
    mockedHook.person!.profile_path = undefined
    mockedHook.person!.movie_credits.cast = []

    const { asFragment } = renderWithWrapper(<PersonDetails />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty person', () => {
    mockedHook.person = undefined

    const { asFragment } = renderWithWrapper(<PersonDetails />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHook.isLoading = true

    const { asFragment } = renderWithWrapper(<PersonDetails />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHook.isLoading = false
    mockedHook.error = 'Something went wrong!'

    const { asFragment } = renderWithWrapper(<PersonDetails />)

    expect(asFragment()).toMatchSnapshot()
  })
})
