import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import { act, renderHook } from '@testing-library/react'

import { deleteList } from 'src/store/lists/actions'
import useContainer from '../hook'

jest.mock('src/store/lists/actions')

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))
const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}))
const navigate = jest.fn()
useNavigate.mockReturnValue(navigate)

describe('ListItem useContainer hook', () => {
  let result = null
  const props = { listId: 123 }

  const confirmSpy = jest.spyOn(Modal, 'confirm')

  beforeEach(() => {
    ;({ result } = renderHook(() => useContainer(props)))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleClick` method', () => {
    act(() => {
      result.current.handleClick()
    })

    expect(navigate).toHaveBeenCalledWith('/list/123')
  })

  it('checks `handleDelete` method', () => {
    let onOk

    act(() => {
      onOk = result.current.handleDelete({ stopPropagation: jest.fn() })
    })
    onOk()

    expect(confirmSpy).toHaveBeenCalledWith({ title: 'Do you want to delete list?', onOk })
    expect(dispatch).toHaveBeenCalledWith(deleteList(123))
  })
})
