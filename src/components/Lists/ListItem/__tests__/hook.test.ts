import { act } from '@testing-library/react'
import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useUpdatePage from 'src/hooks/useUpdatePage'
import * as createdListsActions from 'src/store/createdLists/actions'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'
import { ListItemHookProps } from '../types'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)
const searchParams = new URLSearchParams()
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

jest.mock('src/hooks/useUpdatePage')
const updatePage = jest.fn()
jest.mocked(useUpdatePage).mockReturnValue({ updatePage })

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('ListItem useContainer hook', () => {
  const props: ListItemHookProps = { id: 1234, name: 'list' }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleClick" method', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    act(() => {
      result.current.handleClick()
    })

    expect(navigate).toHaveBeenCalledWith('/list/1234-list')
  })

  it('should check "handleListDelete" method', async () => {
    const modalSpy = jest.spyOn(Modal, 'confirm')
    const deleteList = jest.spyOn(createdListsActions, 'deleteList')
    const event = {
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent<HTMLSpanElement>
    let onOk = () => {}

    const { result } = renderHookWithWrapper(() => useContainer(props))

    act(() => {
      onOk = result.current.handleListDelete(event)
    })
    await onOk()

    expect(modalSpy).toHaveBeenCalledWith({
      onOk,
      title: 'Do you want to delete list?',
    })
    expect(mockDispatch).toHaveBeenCalled()
    expect(deleteList).toHaveBeenCalledWith(props.id)
    expect(updatePage).toHaveBeenCalled()
  })
})
