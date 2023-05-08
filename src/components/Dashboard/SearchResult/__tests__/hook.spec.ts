import { act, renderHook } from '@testing-library/react'

import { dispatch } from 'src/__mocks__/react-redux'
import usePrevious from 'src/hooks/usePrevious'
import { fetchSearch, setSearchPage } from 'src/store/dashboard/actions'
import useContainer from '../hook'

jest.mock('src/store/dashboard/actions')

jest.mock('src/store/dashboard/selectors', () => ({
  searchMoviesSelector: jest.fn(() => null),
  searchPageSelector: jest.fn(() => 1),
  searchLoadingSelector: jest.fn(() => true),
  searchErrorSelector: jest.fn(() => null)
}))

jest.mock('src/hooks/usePrevious')
jest.mocked(usePrevious).mockReturnValue(undefined)

describe('SearchResult useContainer hook', () => {
  const props = { query: 'test/search' }

  it('matches snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handlePagination` method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handlePagination(3)
    })

    expect(dispatch).toHaveBeenCalledWith(setSearchPage(3))
  })

  it('check `useEffect` method', () => {
    renderHook(() => useContainer(props))

    expect(dispatch).toHaveBeenCalledWith(
      fetchSearch({
        query: props.query,
        page: 1
      })
    )
  })

  it('check `useEffect` method with usePrevious', () => {
    jest.mocked(usePrevious).mockReturnValueOnce('test/search')
    renderHook(() => useContainer(props))

    expect(dispatch).toHaveBeenCalledWith(
      fetchSearch({
        query: props.query,
        page: 1
      })
    )
  })
})
