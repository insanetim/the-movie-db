import { act } from '@testing-library/react'
import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useUpdatePage from 'src/hooks/useUpdatePage'
import * as createdListsActions from 'src/store/createdLists/actions'
import * as reactRedux from 'src/store/hooks'
import * as listDetailsActions from 'src/store/listDetails/actions'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(() => ({ listSlug: '1234-the-list' })),
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

describe('ListDetails useContainer hook', () => {
  const modalSpy = jest.spyOn(Modal, 'confirm')

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handlePagination" method', () => {
    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      result.current.handlePagination(3)
    })

    expect(setSearchParams).toHaveBeenCalledWith({ page: '3' })
  })

  it('should check "handleListDelete" method', async () => {
    const deleteList = jest.spyOn(createdListsActions, 'deleteList')
    let onOk = () => {}

    const { result } = renderHookWithWrapper(useContainer)

    await act(() => {
      onOk = result.current.handleListDelete()
      onOk()
    })

    expect(modalSpy).toHaveBeenCalledWith({
      onOk,
      title: 'Do you want to delete list?',
    })
    expect(mockDispatch).toHaveBeenCalled()
    expect(deleteList).toHaveBeenCalledWith(1234)
    expect(navigate).toHaveBeenCalledWith('/lists')
  })

  it('should check "handleMovieDelete" method', async () => {
    const removeFromList = jest.spyOn(createdListsActions, 'removeFromList')
    const event = {
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent<HTMLSpanElement>
    let onOk = () => {}

    const { result } = renderHookWithWrapper(useContainer)

    await act(() => {
      onOk = result.current.handleMovieDelete(event, 1234)
      onOk()
    })

    expect(modalSpy).toHaveBeenCalledWith({
      onOk,
      title: 'Do you want to delete movie from this list?',
    })
    expect(mockDispatch).toHaveBeenCalled()
    expect(removeFromList).toHaveBeenCalledWith({ listId: 1234, movieId: 1234 })
    expect(updatePage).toHaveBeenCalled()
  })

  it('should check "useEffect" method', () => {
    const fetchListDetail = jest.spyOn(listDetailsActions, 'fetchListDetails')

    renderHookWithWrapper(useContainer)

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchListDetail).toHaveBeenCalledWith({ listId: 1234, page: '1' })
  })
})
