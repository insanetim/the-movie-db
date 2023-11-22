import { render } from '@testing-library/react'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import Dashboard from '../component'
import { DashboardHook } from '../types'

const mockedHookData: DashboardHook = {
  query: ''
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

jest.mock('src/store/dashboard/selectors', () => ({
  dashboardErrorSelector: jest.fn(() => null),
  dashboardLoadingSelector: jest.fn(() => true),
  dashboardMoviesSelector: jest.fn(() => null)
}))

describe('Dashboard component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Dashboard />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with query', () => {
    mockedHookData.query = 'test/search'
    const { asFragment } = render(<Dashboard />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
