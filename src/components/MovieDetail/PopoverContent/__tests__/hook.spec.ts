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

  it('matches snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleAddToNewList` method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleAddToNewList()
    })

    expect(dispatch).toHaveBeenCalledWith(
      showModal({
        modalType: 'MODAL_CREATE_LIST',
        modalProps: { movieId: 123 }
      })
    )
    expect(setPopoverOpen).toHaveBeenCalledWith(false)
  })

  it('checks `handleAddToList` method', () => {
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
