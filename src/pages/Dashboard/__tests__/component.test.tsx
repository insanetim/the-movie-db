import { render } from '@testing-library/react'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import Dashboard from '../component'
import { DashboardHook } from '../types'

const mockedHook: DashboardHook = { query: '' }
jest.mock('../hook', () => jest.fn(() => mockedHook))

jest.mock('src/store/dashboard/selectors', () => ({
  dashboardErrorSelector: () => null,
  dashboardLoadingSelector: () => true,
  dashboardMoviesSelector: () => null
}))

describe('Dashboard component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Dashboard />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with query', () => {
    mockedHook.query = 'test/search'
    const { asFragment } = render(<Dashboard />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
