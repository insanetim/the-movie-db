import { useDispatch } from 'react-redux'
import { act, renderHook } from '@testing-library/react'

import { fetchSearch, setSearchPage } from 'src/store/dashboard/actions'
import useContainer from '../hook'

jest.mock('src/store/dashboard/selectors', () => ({
  searchMoviesSelector: jest.fn(() => ({})),
  searchPageSelector: jest.fn(() => 1),
  searchLoadingSelector: jest.fn(() => true),
  searchErrorSelector: jest.fn(() => null)
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))
const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

describe('DashboardSearchResult useContainer hook', () => {
  let result = null
  const props = 'test/searchQuery'

  beforeEach(() => {
    ;({ result } = renderHook(() => useContainer(props)))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handlePagination` method', () => {
    act(() => {
      result.current.handlePagination(3)
    })

    expect(dispatch).toHaveBeenCalledWith(setSearchPage(3))
  })

  it('check `useEffect` method', () => {
    ;({ result } = renderHook(() => useContainer(props)))

    expect(dispatch).toHaveBeenCalledWith(fetchSearch({ query: props, page: 1 }))
  })
})
