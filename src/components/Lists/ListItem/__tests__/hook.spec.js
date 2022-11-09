import 'jsdom-global/register'
import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { deleteList } from 'src/state/lists/actions'
import useContainer from '../hook'

describe('ListItem useContainer hook', () => {
  let result = null

  const navigate = jest.fn()
  useNavigate.mockReturnValue(navigate)

  jest.spyOn(Modal, 'confirm')

  beforeEach(() => {
    ;({ result } = renderHook(() => useContainer(1)))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleClick` method', () => {
    act(() => {
      result.current.handleClick()
    })

    expect(navigate).toHaveBeenCalledWith('/list/1')
  })

  it('checks `handleDelete` method', () => {
    act(() => {
      result.current.handleDelete({ stopPropagation: jest.fn() })
    })

    expect(Modal.confirm).toHaveBeenCalled()
  })

  it('checks `onOk` method', () => {
    act(() => {
      result.current.onOk()
    })

    expect(dispatch).toHaveBeenCalledWith(deleteList(1))
  })
})
