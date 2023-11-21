import { render } from '@testing-library/react'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import type { DashboardHook } from '../types'

import Dashboard from '../component'

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
  it('matches snapshot', () => {
    const { asFragment } = render(<Dashboard />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot with query', () => {
    mockedHookData.query = 'test/search'
    const { asFragment } = render(<Dashboard />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
