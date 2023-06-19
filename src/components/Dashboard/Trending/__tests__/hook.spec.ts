import { act, renderHook } from '@testing-library/react'
import { dispatch } from 'src/__mocks__/react-redux'
import { fetchTrending, setTrendingPage } from 'src/store/dashboard/actions'

import useContainer from '../hook'

jest.mock('src/store/dashboard/actions')

jest.mock('src/store/dashboard/selectors', () => ({
  trendingErrorSelector: jest.fn(() => null),
  trendingLoadingSelector: jest.fn(() => true),
  trendingMoviesSelector: jest.fn(() => ({})),
  trendingPageSelector: jest.fn(() => 1)
}))

describe('Trending useContainer hook', () => {
  it('matches snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handlePagination` method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handlePagination(3)
    })

    expect(dispatch).toHaveBeenCalledWith(setTrendingPage(3))
  })

  it('checks `useEffect` method', () => {
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalledWith(fetchTrending(1))
  })
})
