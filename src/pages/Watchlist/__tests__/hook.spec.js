import { useDispatch } from 'react-redux'
import { Modal } from 'antd'
import { act, renderHook } from '@testing-library/react'

import { accountSelector } from 'src/store/session/selectors'
import { fetchWatchlist, setWatchlistPage } from 'src/store/watchlist/actions'
import { changeMovieInWatchlist } from 'src/store/movie/actions'
import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => ({}))
}))

jest.mock('src/store/watchlist/selectors', () => ({
  watchlistMoviesSelector: jest.fn(() => ({})),
  watchlistPageSelector: jest.fn(() => 1),
  watchlistLoadingSelector: jest.fn(() => true),
  watchlistErrorSelector: jest.fn(() => null)
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))
const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

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
