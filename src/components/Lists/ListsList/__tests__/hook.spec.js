import { act, renderHook } from '@testing-library/react'

import { dispatch } from 'src/__mocks__/react-redux'
import { setListsPage } from 'src/store/lists/actions'
import useContainer from '../hook'

describe('ListsList useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handlePaginationChange` method', () => {
    act(() => {
      result.current.handlePaginationChange(3)
    })

    expect(dispatch).toHaveBeenCalledWith(setListsPage(3))
  })
})
