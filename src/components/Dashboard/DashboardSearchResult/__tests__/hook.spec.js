import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { searchSelector } from 'src/state/dashboard/selectors'
import { fetchSearch } from 'src/state/dashboard/actions'
import useContainer from '../hook'

jest.mock('src/state/dashboard/selectors', () => ({
  searchSelector: jest.fn(() => ({})),
  searchQuerySelector: jest.fn(() => null)
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

    expect(dispatch).toHaveBeenCalledWith(fetchSearch({ query: null, page: 3 }))
  })

  it('check useEffect method', () => {
    searchSelector.mockReturnValue({ data: 'test/data' })
    ;({ result } = renderHook(useContainer))

    expect(dispatch).not.toHaveBeenCalled()
  })
})
