import { act, renderHook } from '@testing-library/react'
import { Modal } from 'antd'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { dispatch } from 'src/__mocks__/react-redux'
import useUpdatePage from 'src/hooks/useUpdatePage'
import {
  deleteList,
  fetchListDetail,
  removeFromList
} from 'src/store/lists/actions'

import useContainer from '../hook'

jest.mock('src/store/lists/selectors', () => ({
  listDetailErrorSelector: jest.fn(() => null),
  listDetailLoadingSelector: jest.fn(() => true),
  listDetailSelector: jest.fn(() => null)
}))

jest.mock('src/store/lists/actions')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn().mockImplementation(() => ({ listId: '123' })),
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

  it('matches snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('matches snapshot without params', () => {
    jest.mocked(useParams).mockReturnValueOnce({})
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handlePagination` method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handlePagination(3)
    })

    expect(setSearchParams).toHaveBeenCalledWith({ page: '3' })
  })

  it('checks `handleListDelete` method', async () => {
    dispatch.mockImplementationOnce(() => Promise.resolve())
    let onOk = () => {
      return
    }
    const { result } = renderHook(useContainer)

    act(() => {
      onOk = result.current.handleListDelete()
    })
    await onOk()

    expect(modalSpy).toHaveBeenCalledWith({
      onOk,
      title: 'Do you want to delete list?'
    })
    expect(dispatch).toHaveBeenCalledWith(deleteList(123))
    expect(navigate).toHaveBeenCalledWith('/lists')
  })

  it('checks `handleMovieDelete` method', async () => {
    let onOk = () => {
      return
    }
    const { result } = renderHook(useContainer)

    act(() => {
      onOk = result.current.handleMovieDelete(123, {
        stopPropagation: jest.fn()
      } as never)
    })
    await onOk()

    expect(modalSpy).toHaveBeenCalledWith({
      onOk,
      title: 'Do you want to delete movie from this list?'
    })
    expect(dispatch).toHaveBeenCalledWith(
      removeFromList({ listId: 123, movieId: 123 })
    )
    expect(updatePage).toHaveBeenCalled()
  })

  it('check `useEffect` method', () => {
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalledWith(
      fetchListDetail({ listId: 123, page: '1' })
    )
  })
})
