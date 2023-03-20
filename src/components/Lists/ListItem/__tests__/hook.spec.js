import 'jsdom-global/register'
import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { deleteList } from 'src/store/lists/actions'
import useContainer from '../hook'

jest.mock('src/store/lists/actions')

describe('ListItem useContainer hook', () => {
  let result = null
  const props = { listId: 123 }

  const navigate = jest.fn()
  useNavigate.mockReturnValue(navigate)

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
