import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { fetchLists } from 'src/state/lists/actions'
import useContainer from '../hook'

describe('ListsList useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(() => useContainer(1)))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handlePaginationChange` method', () => {
    act(() => {
      result.current.handlePaginationChange(1)
    })

    expect(dispatch).toHaveBeenCalledWith(fetchLists(1))
  })
})
