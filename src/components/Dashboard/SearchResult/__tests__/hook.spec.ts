import { act, renderHook } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import { dispatch } from 'src/__mocks__/react-redux'
import { fetchSearch } from 'src/store/dashboard/actions'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import useContainer from '../hook'

jest.mock('src/store/dashboard/actions')

jest.mock('src/store/dashboard/selectors', () => ({
  searchErrorSelector: jest.fn(() => null),
  searchLoadingSelector: jest.fn(() => true),
  searchMoviesSelector: jest.fn(() => null)
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn()
}))
const searchParams = {
  get: () => {}
} as unknown as URLSearchParams
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

describe('SearchResult useContainer hook', () => {
  const props = { query: 'test/search' }

  it('matches snapshot', () => {
    const { result } = renderHook(() => useContainer(props), { wrapper: Wrapper })

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handlePagination` method', () => {
    const { result } = renderHook(() => useContainer(props), { wrapper: Wrapper })

    act(() => {
      result.current.handlePagination(3)
    })

    expect(setSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({
        page: '3',
        search: props.query
      })
    )
  })

  it('check `useEffect` method', () => {
    renderHook(() => useContainer(props))

    expect(dispatch).toHaveBeenCalledWith(
      fetchSearch({
        page: '1',
        query: props.query
      })
    )
  })
})
