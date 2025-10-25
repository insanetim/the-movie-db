import { fireEvent, screen } from '@testing-library/react'
import { mockedCredits, mockPersonDetails } from 'src/__mocks__/mockPerson'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Credits from '../component'
import { CreditsHookReturn, FilterOptions } from '../types'

const mockedHook: CreditsHookReturn = {
  dataSource: mockedCredits,
  error: null,
  handleChangeFilter: jest.fn(),
  isLoading: false,
  person: mockPersonDetails,
  personSlug: '1234-test-person',
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Credits component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedHook.dataSource = mockedCredits
    mockedHook.error = null
    mockedHook.isLoading = false
    mockedHook.person = mockPersonDetails
    mockedHook.personSlug = '1234-test-person'
  })

  it('should render person details, filter, and credits table', () => {
    renderWithWrapper(<Credits />)

    expect(
      screen.getByRole('heading', { name: mockPersonDetails.name })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /back to person details/i })
    ).toHaveAttribute('href', '/person/1234-test-person')

    expect(
      screen.getByText(new RegExp(FilterOptions.All, 'i'))
    ).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()

    fireEvent.click(screen.getByText(new RegExp(FilterOptions.Crew, 'i')))
    expect(mockedHook.handleChangeFilter).toHaveBeenCalledWith(
      FilterOptions.Crew
    )
  })

  it('should show empty state when person data missing', () => {
    mockedHook.person = undefined

    renderWithWrapper(<Credits />)

    expect(screen.getByText(/person not found/i)).toBeInTheDocument()
  })

  it('should show loading indicator when data is loading', () => {
    mockedHook.isLoading = true

    renderWithWrapper(<Credits />)

    expect(document.querySelector('.ant-spin')).toBeInTheDocument()
  })

  it('should show error message when request fails', () => {
    mockedHook.error = 'Something went wrong!'

    renderWithWrapper(<Credits />)

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
  })
})
