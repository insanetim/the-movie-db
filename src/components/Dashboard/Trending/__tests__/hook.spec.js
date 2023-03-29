import { useDispatch } from 'react-redux'
import { act, renderHook } from '@testing-library/react'

import { fetchTrending, setTrendingPage } from 'src/store/dashboard/actions'
import useContainer from '../hook'

jest.mock('src/store/dashboard/selectors', () => ({
  trendingMoviesSelector: jest.fn(() => ({})),
  trendingPageSelector: jest.fn(() => 1),
  trendingLoadingSelector: jest.fn(() => true),
  trendingErrorSelector: jest.fn(() => null)
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))
const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

describe('SearchResult useContainer hook', () => {
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
