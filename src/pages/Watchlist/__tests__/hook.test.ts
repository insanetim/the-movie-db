import { act, renderHook } from '@testing-library/react'
import { Modal } from 'antd'
import { useSearchParams } from 'react-router-dom'
import mockAccount from 'src/__mocks__/mockAccount'
import { dispatch } from 'src/__mocks__/react-redux'
import useUpdatePage from 'src/hooks/useUpdatePage'
import * as sessionSelectors from 'src/store/auth/selectors'
import * as movieActions from 'src/store/movie/actions'
import * as watchlistActions from 'src/store/watchlist/actions'

import useContainer from '../hook'

jest.mock('src/store/watchlist/selectors', () => ({
  watchlistErrorSelector: () => null,
  watchlistLoadingSelector: () => true,
  watchlistMoviesSelector: () => null,
}))

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
  const confirmSpy = jest.spyOn(Modal, 'confirm')
  const accountSelector = jest
    .spyOn(sessionSelectors, 'accountSelector')
    .mockReturnValue(null)

  it('should match snapshot', () => {
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

  it('should check "handleMovieDelete" method', async () => {
    const changeMovieInWatchlist = jest.spyOn(
      movieActions,
      'changeMovieInWatchlist'
    )
    let onOk = () => {}
    const { result } = renderHook(useContainer)

    await act(() => {
      onOk = result.current.handleMovieDelete(1234, {
        stopPropagation: jest.fn(),
      } as never)
      onOk()
    })

    expect(confirmSpy).toHaveBeenCalledWith({
      onOk,
      title: 'Do you want to delete movie from watchlist?',
    })
    expect(dispatch).toHaveBeenCalled()
    expect(changeMovieInWatchlist).toHaveBeenCalledWith({
      inWatchlist: false,
      movieId: 1234,
    })
    expect(updatePage).toHaveBeenCalled()
  })

  it('should check "useEffect" method with account', () => {
    const fetchWatchlist = jest.spyOn(watchlistActions, 'fetchWatchlist')
    accountSelector.mockReturnValueOnce(mockAccount)
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalled()
    expect(fetchWatchlist).toHaveBeenCalledWith('1')
  })
})
