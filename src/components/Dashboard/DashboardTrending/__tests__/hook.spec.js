import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { fetchTrending, setTrendingPage } from 'src/store/dashboard/actions'
import useContainer from '../hook'

jest.mock('src/store/dashboard/selectors', () => ({
  trendingMoviesSelector: jest.fn(() => ({})),
  trendingPageSelector: jest.fn(() => 1),
  trendingLoadingSelector: jest.fn(() => true),
  trendingErrorSelector: jest.fn(() => null)
}))

describe('DashboardSearchResult useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handlePagination` method', () => {
    act(() => {
      result.current.handlePagination(3)
    })

    expect(dispatch).toHaveBeenCalledWith(setTrendingPage(3))
  })

  it('checks `useEffect` method', () => {
    ;({ result } = renderHook(useContainer))

    expect(dispatch).toHaveBeenCalledWith(fetchTrending(1))
  })
})
