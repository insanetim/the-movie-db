import { Modal } from 'antd'
import { act, renderHook } from '@testing-library/react'

import { dispatch } from 'src/__mocks__/react-redux'
import mockAccount from 'src/__mocks__/mockAccount'
import { accountSelector } from 'src/store/session/selectors'
import { fetchWatchlist } from 'src/store/watchlist/actions'
import { changeMovieInWatchlist } from 'src/store/movie/actions'
import useContainer from '../hook'

jest.mock('src/store/watchlist/actions')

jest.mock('src/store/movie/actions')

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => null)
}))

jest.mock('src/store/watchlist/selectors', () => ({
  watchlistMoviesSelector: jest.fn(() => null),
  watchlistPageSelector: jest.fn(() => 1),
  watchlistLoadingSelector: jest.fn(() => true),
  watchlistErrorSelector: jest.fn(() => null)
}))

describe('Watchlist useContainer hook', () => {
  const confirmSpy = jest.spyOn(Modal, 'confirm')

  it('matches snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handlePagination` method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handlePagination(3)
    })

    expect(dispatch).toHaveBeenCalledWith(fetchWatchlist(3))
  })

  it('checks `handleMovieDelete` method', () => {
    let onOk = () => {
      return
    }
    const { result } = renderHook(useContainer)

    act(() => {
      onOk = result.current.handleMovieDelete(123, { stopPropagation: jest.fn() } as never)
    })
    onOk()

    expect(confirmSpy).toHaveBeenCalledWith({
      title: 'Do you want to delete movie from watchlist?',
      onOk
    })
    expect(dispatch).toHaveBeenCalledWith(
      changeMovieInWatchlist({
        movieId: 123,
        inWatchlist: false
      })
    )
  })

  it('checks `useEffect` method with account', () => {
    jest.mocked(accountSelector).mockReturnValueOnce(mockAccount)
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalledWith(fetchWatchlist(1))
  })
})