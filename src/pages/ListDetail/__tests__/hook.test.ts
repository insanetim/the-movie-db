import { act, renderHook } from '@testing-library/react'
import { Modal } from 'antd'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { dispatch } from 'src/__mocks__/react-redux'
import useUpdatePage from 'src/hooks/useUpdatePage'
import * as listsActions from 'src/store/lists/actions'

import useContainer from '../hook'

jest.mock('src/store/lists/selectors', () => ({
  listDetailErrorSelector: () => null,
  listDetailLoadingSelector: () => true,
  listDetailSelector: () => null
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(() => ({ listId: '123' })),
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

describe('ListDetail useContainer hook', () => {
  const modalSpy = jest.spyOn(Modal, 'confirm')

  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot without params', () => {
    jest.mocked(useParams).mockReturnValueOnce({})
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handlePagination" method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handlePagination(3)
    })

    expect(setSearchParams).toHaveBeenCalledWith({ page: '3' })
  })

  it('should check "handleListDelete" method', async () => {
    const deleteList = jest.spyOn(listsActions, 'deleteList')
    let onOk = () => {}
    const { result } = renderHook(useContainer)

    await act(() => {
      onOk = result.current.handleListDelete()
      onOk()
    })

    expect(modalSpy).toHaveBeenCalledWith({
      onOk,
      title: 'Do you want to delete list?'
    })
    expect(dispatch).toHaveBeenCalled()
    expect(deleteList).toHaveBeenCalledWith('123')
    expect(navigate).toHaveBeenCalledWith('/lists')
  })

  it('should check "handleMovieDelete" method', async () => {
    const removeFromList = jest.spyOn(listsActions, 'removeFromList')
    let onOk = () => {}
    const { result } = renderHook(useContainer)

    await act(() => {
      onOk = result.current.handleMovieDelete(123, {
        stopPropagation: jest.fn()
      } as never)
      onOk()
    })

    expect(modalSpy).toHaveBeenCalledWith({
      onOk,
      title: 'Do you want to delete movie from this list?'
    })
    expect(dispatch).toHaveBeenCalled()
    expect(removeFromList).toHaveBeenCalledWith({ listId: '123', movieId: 123 })
    expect(updatePage).toHaveBeenCalled()
  })

  it('should check "useEffect" method', () => {
    const fetchListDetail = jest.spyOn(listsActions, 'fetchListDetail')
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalled()
    expect(fetchListDetail).toHaveBeenCalledWith({ listId: '123', page: '1' })
  })
})
