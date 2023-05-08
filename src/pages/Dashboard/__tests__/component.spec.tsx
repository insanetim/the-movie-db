import { render } from '@testing-library/react'

import type { DashboardHook } from '../types'
import Wrapper from 'src/utils/testHelpers/wrapperMock'
import Dashboard from '../component'

const mockedHookData: DashboardHook = {
  query: ''
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

jest.mock('src/store/dashboard/selectors', () => ({
  trendingMoviesSelector: jest.fn(() => null),
  trendingPageSelector: jest.fn(() => 1),
  trendingLoadingSelector: jest.fn(() => true),
  trendingErrorSelector: jest.fn(() => null),
  searchMoviesSelector: jest.fn(() => null),
  searchPageSelector: jest.fn(() => 1),
  searchLoadingSelector: jest.fn(() => true),
  searchErrorSelector: jest.fn(() => null)
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
