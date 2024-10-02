import { act, renderHook } from '@testing-library/react'
import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import mockAccount from 'src/__mocks__/mockAccount'
import useUpdatePage from 'src/hooks/useUpdatePage'
import * as reactRedux from 'src/store/hooks'
import * as movieDetailsActions from 'src/store/movieDetails/actions'
import * as watchlistActions from 'src/store/watchlist/actions'
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

describe('Watchlist useContainer hook', () => {
  const mockDispatch = jest.fn()
  jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector')
  const confirmSpy = jest.spyOn(Modal, 'confirm')

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
    const changeMovieInWatchlist = jest.spyOn(
      movieDetailsActions,
      'changeMovieInWatchlist'
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

    expect(confirmSpy).toHaveBeenCalledWith({
      onOk,
      title: 'Do you want to delete movie from watchlist?',
    })
    expect(mockDispatch).toHaveBeenCalled()
    expect(changeMovieInWatchlist).toHaveBeenCalledWith({
      inWatchlist: false,
      movieId: 1234,
    })
    expect(updatePage).toHaveBeenCalled()
  })

  it('should check "useEffect" method with account', () => {
    useSelectorMock
      .mockReturnValueOnce(mockAccount)
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(null)
    const fetchWatchlist = jest.spyOn(watchlistActions, 'fetchWatchlist')

    renderHook(useContainer)

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchWatchlist).toHaveBeenCalledWith('1')
  })
})
