import { act, renderHook } from '@testing-library/react'
import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { dispatch } from 'src/__mocks__/react-redux'
import { deleteList } from 'src/store/lists/actions'

import useContainer from '../hook'

jest.mock('src/store/lists/actions')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

describe('ListItem useContainer hook', () => {
  const modalSpy = jest.spyOn(Modal, 'confirm')
  const props = { listId: 123 }

  it('matches snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleClick` method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleClick()
    })

    expect(navigate).toHaveBeenCalledWith('/list/123')
  })

  it('checks `handleListDelete` method', () => {
    let onOk = () => {
      return
    }
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      onOk = result.current.handleListDelete({
        stopPropagation: jest.fn()
      } as never)
    })
    onOk()

    expect(modalSpy).toHaveBeenCalledWith({
      onOk,
      title: 'Do you want to delete list?'
    })
    expect(dispatch).toHaveBeenCalledWith(deleteList(123))
  })
})
