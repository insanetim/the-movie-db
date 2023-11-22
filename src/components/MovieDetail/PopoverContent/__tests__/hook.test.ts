import { act, renderHook } from '@testing-library/react'
import { dispatch } from 'src/__mocks__/react-redux'
import { showModal } from 'src/store/app/actions'
import { addToList } from 'src/store/lists/actions'

import useContainer from '../hook'

jest.mock('src/store/app/actions')

jest.mock('src/store/lists/actions')

jest.mock('src/store/lists/selectors', () => ({
  listsSelector: jest.fn(() => null)
}))

describe('PopoverContent useContainer hook', () => {
  const setPopoverOpen = jest.fn()
  const props = { movieId: 123, setPopoverOpen }

  it('should match snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check `handleAddToNewList` method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleAddToNewList()
    })

    expect(dispatch).toHaveBeenCalledWith(
      showModal({
        modalProps: { movieId: 123 },
        modalType: 'MODAL_CREATE_LIST'
      })
    )
    expect(setPopoverOpen).toHaveBeenCalledWith(false)
  })

  it('should check `handleAddToList` method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleAddToList(123)
    })

    expect(dispatch).toHaveBeenCalledWith(
      addToList({
        listId: 123,
        movieId: 123
      })
    )
    expect(setPopoverOpen).toHaveBeenCalledWith(false)
  })
})
