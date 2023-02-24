import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { fetchSearch } from 'src/state/dashboard/actions'
import useContainer from '../hook'

jest.mock('src/state/dashboard/selectors', () => ({
  searchSelector: jest.fn(() => ({}))
}))

describe('DashboardSearchResult useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(() => useContainer(null)))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handlePagination` method', () => {
    act(() => {
      result.current.handlePagination(3)
    })

    expect(dispatch).toHaveBeenCalledWith(fetchSearch({ query: null, page: 3 }))
  })

  it('check `useEffect` method', () => {
    ;({ result } = renderHook(() => useContainer(null)))

    expect(dispatch).toHaveBeenCalledWith(fetchSearch({ query: null }))
  })
})
