import { useDispatch } from 'react-redux'
import { act, renderHook } from '@testing-library/react'

import { showModal } from 'src/store/app/actions'
import { addToList } from 'src/store/lists/actions'
import useContainer from '../hook'

jest.mock('src/store/lists/selectors', () => ({
  listsSelector: jest.fn(() => ({}))
}))

jest.mock('src/store/app/actions')

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))
const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

describe('PopoverContent useContainer hook', () => {
  let result = null
  const setPopoverOpen = jest.fn()
  const props = { movieId: 123, setPopoverOpen }

  beforeEach(() => {
    ;({ result } = renderHook(() => useContainer(props)))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleAddToNewList` method', () => {
    act(() => {
      result.current.handleAddToNewList()
    })

    expect(dispatch).toHaveBeenCalledWith(
      showModal({
        modalType: 'CREATE_LIST_MODAL',
        modalProps: { movieId: 123 }
      })
    )
    expect(setPopoverOpen).toHaveBeenCalledWith(false)
  })

  it('checks `handleAddToList` method', () => {
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
