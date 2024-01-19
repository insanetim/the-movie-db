import { act, renderHook } from '@testing-library/react'
import { dispatch } from 'src/__mocks__/react-redux'
import { modalComponentsMap } from 'src/components/ModalRoot/modalComponents'
import { showModal } from 'src/store/app/actions'
import * as createdListsActions from 'src/store/createdLists/actions'

import useContainer from '../hook'

jest.mock('src/store/createdLists/selectors', () => ({
  createdListsSelector: () => null,
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
        modalType: modalComponentsMap.MODAL_CREATE_LIST,
      })
    )
    expect(setPopoverOpen).toHaveBeenCalledWith(false)
  })

  it('should check "handleAddToList" method', () => {
    const addToList = jest.spyOn(createdListsActions, 'addToList')
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleAddToList({ listId: 1234, listName: 'test/list' })
    })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(addToList).toHaveBeenCalledWith({
      listId: 1234,
      listName: 'test/list',
      movieId: 1234,
    })
    expect(setPopoverOpen).toHaveBeenCalledWith(false)
  })
})
