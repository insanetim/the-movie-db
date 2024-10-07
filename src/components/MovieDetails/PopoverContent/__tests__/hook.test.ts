import { act } from '@testing-library/react'
import { modalComponentsMap } from 'src/components/ModalRoot/modalComponents'
import { showModal } from 'src/store/app/actions'
import * as createdListsActions from 'src/store/createdLists/actions'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'
import { PopoverContentHookProps } from '../types'

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('PopoverContent useContainer hook', () => {
  const setPopoverOpen = jest.fn()
  const props: PopoverContentHookProps = { movieId: 1234, setPopoverOpen }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleAddToNewList" method', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    act(() => {
      result.current.handleAddToNewList()
    })

    expect(mockDispatch).toHaveBeenCalledWith(
      showModal({
        modalProps: { movieId: 1234 },
        modalType: modalComponentsMap.MODAL_CREATE_LIST,
      })
    )
    expect(setPopoverOpen).toHaveBeenCalledWith(false)
  })

  it('should check "handleAddToList" method', () => {
    const addToList = jest.spyOn(createdListsActions, 'addToList')

    const { result } = renderHookWithWrapper(() => useContainer(props))

    act(() => {
      result.current.handleAddToList({ listId: 1234, listName: 'test/list' })
    })

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(addToList).toHaveBeenCalledWith({
      listId: 1234,
      listName: 'test/list',
      movieId: 1234,
    })
    expect(setPopoverOpen).toHaveBeenCalledWith(false)
  })
})
