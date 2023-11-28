import { act, renderHook } from '@testing-library/react'
import { dispatch } from 'src/__mocks__/react-redux'
import { showModal } from 'src/store/app/actions'
import * as listsActions from 'src/store/lists/actions'

import useContainer from '../hook'

jest.mock('src/store/lists/selectors', () => ({
  listsSelector: () => null
}))

describe('PopoverContent useContainer hook', () => {
  const setPopoverOpen = jest.fn()
  const props = { movieId: 1234, setPopoverOpen }

  it('should match snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleAddToNewList" method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleAddToNewList()
    })

    expect(dispatch).toHaveBeenCalledWith(
      showModal({
        modalProps: { movieId: 1234 },
        modalType: 'MODAL_CREATE_LIST'
      })
    )
    expect(setPopoverOpen).toHaveBeenCalledWith(false)
  })

  it('should check "handleAddToList" method', () => {
    const addToList = jest.spyOn(listsActions, 'addToList')
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleAddToList({ listId: 1234, listName: 'test/list' })
    })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(addToList).toHaveBeenCalledWith({
      listId: 1234,
      listName: 'test/list',
      movieId: 1234
    })
    expect(setPopoverOpen).toHaveBeenCalledWith(false)
  })
})
