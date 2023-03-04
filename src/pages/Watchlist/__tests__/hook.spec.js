import 'jsdom-global/register'
import { Modal } from 'antd'
import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { accountSelector } from 'src/state/session/selectors'
import { fetchWatchlist, setWatchlistPage } from 'src/state/watchlist/actions'
import { changeMovieInWatchlist } from 'src/state/movie/actions'
import useContainer from '../hook'

jest.mock('src/state/session/selectors', () => ({
  accountSelector: jest.fn(() => ({}))
}))

jest.mock('src/state/watchlist/selectors', () => ({
  watchlistMoviesSelector: jest.fn(() => ({})),
  watchlistPageSelector: jest.fn(() => 1),
  watchlistLoadingSelector: jest.fn(() => true),
  watchlistErrorSelector: jest.fn(() => null)
}))

describe('Watchlist useContainer hook', () => {
  let result = null

  const confirmSpy = jest.spyOn(Modal, 'confirm')

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handlePagination` method', () => {
    act(() => {
      result.current.handlePagination(3)
    })

    expect(dispatch).toHaveBeenCalledWith(setWatchlistPage(3))
  })

  it('checks `handleDelete` method', () => {
    let onOk
    act(() => {
      onOk = result.current.handleDelete(123, { stopPropagation: jest.fn() })
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
    accountSelector.mockReturnValueOnce({ id: 123 })
    ;({ result } = renderHook(useContainer))

    expect(dispatch).toHaveBeenCalledWith(fetchWatchlist(1))
  })
})
