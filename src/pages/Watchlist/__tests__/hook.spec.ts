import { act, renderHook } from '@testing-library/react'
import { Modal } from 'antd'
import { useSearchParams } from 'react-router-dom'
import mockAccount from 'src/__mocks__/mockAccount'
import { dispatch } from 'src/__mocks__/react-redux'
import { changeMovieInWatchlist } from 'src/store/movie/actions'
import { accountSelector } from 'src/store/session/selectors'
import { fetchWatchlist } from 'src/store/watchlist/actions'

import useContainer from '../hook'

jest.mock('src/store/watchlist/actions')

jest.mock('src/store/movie/actions')

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => null)
}))

jest.mock('src/store/watchlist/selectors', () => ({
  watchlistMoviesSelector: jest.fn(() => null)
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn()
}))
const searchParams = new URLSearchParams()
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

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

    expect(setSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({
        page: '3'
      })
    )
  })

  it('checks `handleMovieDelete` method', () => {
    let onOk = () => {
      return
    }
    const { result } = renderHook(useContainer)

    act(() => {
      onOk = result.current.handleMovieDelete(123, {
        stopPropagation: jest.fn()
      } as never)
    })
    onOk()

    expect(confirmSpy).toHaveBeenCalledWith({
      onOk,
      title: 'Do you want to delete movie from watchlist?'
    })
    expect(dispatch).toHaveBeenCalledWith(
      changeMovieInWatchlist({
        inWatchlist: false,
        movieId: 123
      })
    )
  })

  it('checks `useEffect` method with account', () => {
    jest.mocked(accountSelector).mockReturnValueOnce(mockAccount)
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalledWith(fetchWatchlist('1'))
  })
})
