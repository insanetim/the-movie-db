import 'jsdom-global/register'
import React from 'react'
import { Modal } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { deleteList, removeFromList, fetchList } from 'src/state/lists/actions'
import useContainer from '../hook'

jest.mock('src/state/lists/selectors', () => ({
  listSelector: jest.fn(() => ({}))
}))

describe('ListDetails useContainer hook', () => {
  let result = null
  const setState = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(initialState => [initialState, setState])

  const navigate = jest.fn()
  useNavigate.mockReturnValue(navigate)
  useParams.mockReturnValue({ listId: 123 })

  jest.spyOn(Modal, 'confirm')

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

    expect(Modal.confirm).toHaveBeenCalledWith({
      title: 'Do you want to delete list?',
      onOk: res.onOk
    })
    expect(dispatch).toHaveBeenCalledWith(deleteList(123, res.callback))
    expect(navigate).toHaveBeenCalledWith('/lists')
  })

  it('checks `handleMovieDelete` method', () => {
    let onOk
    act(() => {
      onOk = result.current.handleMovieDelete(123, { stopPropagation: jest.fn() })
    })
    onOk()

    expect(Modal.confirm).toHaveBeenCalledWith({
      title: 'Do you want to delete movie from this list?',
      onOk
    })
    expect(dispatch).toHaveBeenCalledWith(removeFromList({ listId: 123, movieId: 123 }))
  })

  it('check `useEffect` method', () => {
    ;({ result } = renderHook(useContainer))
    act(() => {
      result.current.onFinish()
    })

    expect(dispatch).toHaveBeenCalledWith(fetchList(123, result.current.onFinish))
    expect(setState).toHaveBeenCalledWith(false)
  })
})
