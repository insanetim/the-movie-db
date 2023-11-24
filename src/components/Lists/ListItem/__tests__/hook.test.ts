import { act, renderHook } from '@testing-library/react'
import { Modal } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { dispatch } from 'src/__mocks__/react-redux'
import useUpdatePage from 'src/hooks/useUpdatePage'
import * as listsActions from 'src/store/lists/actions'

import useContainer from '../hook'

jest.mock('src/store/lists/selectors', () => ({
  listsSelector: () => null
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn()
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)
const searchParams = new URLSearchParams()
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

jest.mock('src/hooks/useUpdatePage')
const updatePage = jest.fn()
jest.mocked(useUpdatePage).mockReturnValue({ updatePage })

describe('ListItem useContainer hook', () => {
  const props = { listId: 123 }

  it('should match snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleClick" method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleClick()
    })

    expect(navigate).toHaveBeenCalledWith('/list/123')
  })

  it('should check "handleListDelete" method', async () => {
    const modalSpy = jest.spyOn(Modal, 'confirm')
    const deleteList = jest.spyOn(listsActions, 'deleteList')
    let onOk = () => {
      return
    }
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      onOk = result.current.handleListDelete({
        stopPropagation: jest.fn()
      } as never)
    })
    await onOk()

    expect(modalSpy).toHaveBeenCalledWith({
      onOk,
      title: 'Do you want to delete list?'
    })
    expect(dispatch).toHaveBeenCalled()
    expect(deleteList).toHaveBeenCalledWith(props.listId)
    expect(updatePage).toHaveBeenCalled()
  })
})
