import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { trendingSelector } from 'src/state/dashboard/selectors'
import { fetchTrending } from 'src/state/dashboard/actions'
import useContainer from '../hook'

jest.mock('src/state/dashboard/selectors', () => ({
  trendingSelector: jest.fn(() => ({}))
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

    expect(dispatch).toHaveBeenCalledWith(fetchTrending(3))
  })

  it('checks `useEffect` method', () => {
    trendingSelector.mockReturnValue({ data: 'test/data' })
    ;({ result } = renderHook(useContainer))

    expect(dispatch).not.toHaveBeenCalled()
  })
})
