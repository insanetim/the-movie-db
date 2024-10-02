import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Dashboard from '../component'
import { DashboardHookReturn } from '../types'

const mockedHook: DashboardHookReturn = { query: '' }
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('Dashboard component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Dashboard />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with query', () => {
    mockedHook.query = 'test/search'

    const { asFragment } = renderWithWrapper(<Dashboard />)

    expect(asFragment()).toMatchSnapshot()
  })
})
