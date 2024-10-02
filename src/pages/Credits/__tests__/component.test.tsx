import { mockedCredits, mockPersonDetails } from 'src/__mocks__/mockPerson'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Credits from '../component'
import { CreditsHookReturn } from '../types'

const mockedHook: CreditsHookReturn = {
  dataSource: mockedCredits,
  error: null,
  handleChangeFilter: jest.fn(),
  loading: false,
  person: mockPersonDetails,
  personSlug: '1234-test-person',
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Credits component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Credits />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with empty person', () => {
    mockedHook.person = undefined

    const { asFragment } = renderWithWrapper(<Credits />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with loading', () => {
    mockedHook.loading = true

    const { asFragment } = renderWithWrapper(<Credits />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with error', () => {
    mockedHook.loading = false
    mockedHook.error = 'Something went wrong!'

    const { asFragment } = renderWithWrapper(<Credits />)

    expect(asFragment()).toMatchSnapshot()
  })
})
