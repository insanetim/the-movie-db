import { act, renderHook } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import { dispatch } from 'src/__mocks__/react-redux'
import * as dashboardActions from 'src/store/dashboard/actions'

import useContainer from '../hook'

jest.mock('src/store/dashboard/selectors', () => ({
  dashboardErrorSelector: () => null,
  dashboardLoadingSelector: () => true,
  dashboardMoviesSelector: () => null,
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}))
const searchParams = new URLSearchParams({ query: 'test/search' })
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

describe('SearchResult useContainer hook', () => {
  const props = { query: 'test/search' }

  it('should match snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handlePagination" method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handlePagination(3)
    })

    expect(setSearchParams).toHaveBeenCalledWith({
      page: '3',
      search: props.query,
    })
  })

  it('should check "useEffect" method', () => {
    const fetchSearch = jest.spyOn(dashboardActions, 'fetchSearch')
    renderHook(() => useContainer(props))

    expect(dispatch).toHaveBeenCalled()
    expect(fetchSearch).toHaveBeenCalledWith({
      page: '1',
      query: props.query,
    })
  })
})
