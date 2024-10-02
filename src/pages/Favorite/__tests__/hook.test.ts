import { act } from '@testing-library/react'
import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import mockAccount from 'src/__mocks__/mockAccount'
import useUpdatePage from 'src/hooks/useUpdatePage'
import * as favoriteActions from 'src/store/favorite/actions'
import * as reactRedux from 'src/store/hooks'
import * as movieDetailsActions from 'src/store/movieDetails/actions'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}))
const searchParams = new URLSearchParams()
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

jest.mock('src/hooks/useUpdatePage')
const updatePage = jest.fn()
jest.mocked(useUpdatePage).mockReturnValue({ updatePage })

describe('Favotite useContainer hook', () => {
  const mockDispatch = jest.fn()
  jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector')
  const modalSpy = jest.spyOn(Modal, 'confirm')

  it('should match snapshot', () => {
    useSelectorMock
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(null)

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

  it('should check "handleMovieDelete" method', async () => {
    const changeMovieInFavorite = jest.spyOn(
      movieDetailsActions,
      'changeMovieInFavorite'
    )
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
      title: 'Do you want to delete movie from favorite?',
    })
    expect(mockDispatch).toHaveBeenCalled()
    expect(changeMovieInFavorite).toHaveBeenCalledWith({
      inFavorite: false,
      movieId: 1234,
    })
    expect(updatePage).toHaveBeenCalled()
  })

  it('should check "useEffect" method with account', () => {
    useSelectorMock.mockReturnValueOnce(mockAccount)
    const fetchFavorite = jest.spyOn(favoriteActions, 'fetchFavorite')

    renderHookWithWrapper(useContainer)

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchFavorite).toHaveBeenCalledWith('1')
  })
})
