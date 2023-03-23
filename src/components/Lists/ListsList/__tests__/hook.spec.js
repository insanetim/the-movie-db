import { useDispatch } from 'react-redux'
import { act, renderHook } from '@testing-library/react'

import { setListsPage } from 'src/store/lists/actions'
import useContainer from '../hook'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))
const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

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
