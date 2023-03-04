import 'jsdom-global/register'
import { Modal } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { deleteList, removeFromList, fetchList } from 'src/state/lists/actions'
import useContainer from '../hook'

jest.mock('src/state/lists/selectors', () => ({
  listSelector: jest.fn(() => ({})),
  listLoadingSelector: jest.fn(() => true),
  listErrorSelector: jest.fn(() => null)
}))

describe('ListDetails useContainer hook', () => {
  let result = null

  const navigate = jest.fn()
  useNavigate.mockReturnValue(navigate)
  useParams.mockReturnValue({ listId: 123 })

  const confirmSpy = jest.spyOn(Modal, 'confirm')

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleListDelete` method', () => {
    let res
    act(() => {
      res = result.current.handleListDelete()
    })
    res.onOk()
    res.callback()

    expect(confirmSpy).toHaveBeenCalledWith({
      title: 'Do you want to delete list?',
      onOk: res.onOk
    })
    expect(dispatch).toHaveBeenCalledWith(
      deleteList({
        listId: 123,
        callback: res.callback
      })
    )
    expect(navigate).toHaveBeenCalledWith('/lists')
  })

  it('checks `handleMovieDelete` method', () => {
    let onOk
    act(() => {
      onOk = result.current.handleMovieDelete(123, {
        stopPropagation: jest.fn()
      })
    })
    onOk()

    expect(confirmSpy).toHaveBeenCalledWith({
      title: 'Do you want to delete movie from this list?',
      onOk
    })
    expect(dispatch).toHaveBeenCalledWith(
      removeFromList({
        listId: 123,
        movieId: 123
      })
    )
  })

  it('check `useEffect` method', () => {
    ;({ result } = renderHook(useContainer))

    expect(dispatch).toHaveBeenCalledWith(fetchList(123))
  })
})
