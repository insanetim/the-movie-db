import { Modal } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { deleteList, removeFromList, fetchList } from 'src/store/lists/actions'
import useContainer from '../hook'

jest.mock('src/store/lists/selectors', () => ({
  listSelector: jest.fn(() => ({})),
  listLoadingSelector: jest.fn(() => true),
  listErrorSelector: jest.fn(() => null)
}))

jest.mock('src/store/lists/actions')

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

  it('checks `handleListDelete` method', async () => {
    dispatch.mockImplementationOnce(() => Promise.resolve())
    let onOk

    act(() => {
      onOk = result.current.handleListDelete()
    })
    await onOk()

    expect(confirmSpy).toHaveBeenCalledWith({
      title: 'Do you want to delete list?',
      onOk
    })
    expect(dispatch).toHaveBeenCalledWith(deleteList(123))
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
