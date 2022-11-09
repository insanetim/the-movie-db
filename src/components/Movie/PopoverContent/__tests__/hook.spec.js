import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { showModal } from 'src/state/app/actions'
import { addToList } from 'src/state/lists/actions'
import useContainer from '../hook'

jest.mock('src/state/lists/selectors', () => ({
  listsSelector: jest.fn(() => ({}))
}))

jest.mock('src/state/app/actions')

describe('PopoverContent useContainer hook', () => {
  let result = null
  const setPopoverOpen = jest.fn()
  const props = { movieId: 1, setPopoverOpen }

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

    expect(dispatch).toHaveBeenCalledWith(showModal())
    expect(setPopoverOpen).toHaveBeenCalledWith(false)
  })

  it('checks `handleAddToList` method', () => {
    act(() => {
      result.current.handleAddToList(1)
    })

    expect(dispatch).toHaveBeenCalledWith(addToList({ listId: 1, movieId: 1 }))
    expect(setPopoverOpen).toHaveBeenCalledWith(false)
  })

  it('checks `cb` method', () => {
    act(() => {
      result.current.cb(3)
    })

    expect(dispatch).toHaveBeenCalledWith(addToList({ listId: 3, movieId: 1 }))
  })
})
