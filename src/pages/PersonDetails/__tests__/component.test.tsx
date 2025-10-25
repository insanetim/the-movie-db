import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockPersonDetails } from 'src/__mocks__/mockPerson'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import PersonDetails from '../component'
import { PersonDetailsHookReturn } from '../types'

const defaultPerson = { ...mockPersonDetails }

const mockedHook: PersonDetailsHookReturn = {
  error: null,
  handleGoToCredits: jest.fn(),
  isLoading: false,
  person: { ...defaultPerson },
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('PersonDetails component', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
    mockedHook.error = null
    mockedHook.isLoading = false
    mockedHook.person = { ...defaultPerson }
  })

  it('should render person details with known credits', () => {
    renderWithWrapper(<PersonDetails />)

    expect(
      screen.getByRole('heading', { name: defaultPerson.name })
    ).toBeInTheDocument()
    expect(screen.getByAltText(defaultPerson.name)).toHaveAttribute(
      'src',
      `https://image.tmdb.org/t/p/w500${defaultPerson.profile_path}`
    )
    expect(screen.getByText('Show all credits')).toBeInTheDocument()
  })

  it('should call "handleGoToCredits" when button clicked', async () => {
    renderWithWrapper(<PersonDetails />)

    const button = screen.getByText('Show all credits')
    await user.click(button)

    expect(mockedHook.handleGoToCredits).toHaveBeenCalled()
  })

  it('should render person details without poster and credits', () => {
    mockedHook.person = {
      ...defaultPerson,
      movie_credits: { cast: [], crew: [] },
      profile_path: undefined,
    }

    renderWithWrapper(<PersonDetails />)

    expect(screen.getByAltText(defaultPerson.name)).toHaveAttribute(
      'src',
      'test-file-stub'
    )
    expect(screen.queryByText('Show all credits')).not.toBeInTheDocument()
  })

  it('should render empty state when person not found', () => {
    mockedHook.person = undefined

    renderWithWrapper(<PersonDetails />)

    expect(screen.getByText('Person not found')).toBeInTheDocument()
  })

  it('should render loading state when fetching person', () => {
    mockedHook.isLoading = true
    renderWithWrapper(<PersonDetails />)

    expect(document.querySelector('.ant-spin')).toBeInTheDocument()
  })

  it('should render error state when request fails', () => {
    mockedHook.isLoading = false
    mockedHook.error = 'Something went wrong!'
    renderWithWrapper(<PersonDetails />)

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
  })
})
