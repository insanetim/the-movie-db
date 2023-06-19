import { render } from '@testing-library/react'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import type { DashboardHook } from '../types'

import Dashboard from '../component'

const mockedHookData: DashboardHook = {
  query: ''
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

jest.mock('src/store/dashboard/selectors', () => ({
  searchErrorSelector: jest.fn(() => null),
  searchLoadingSelector: jest.fn(() => true),
  searchMoviesSelector: jest.fn(() => null),
  searchPageSelector: jest.fn(() => 1),
  trendingErrorSelector: jest.fn(() => null),
  trendingLoadingSelector: jest.fn(() => true),
  trendingMoviesSelector: jest.fn(() => null),
  trendingPageSelector: jest.fn(() => 1)
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
