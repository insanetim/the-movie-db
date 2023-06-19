import { act, renderHook } from '@testing-library/react'
import { Modal } from 'antd'
import mockAccount from 'src/__mocks__/mockAccount'
import { dispatch } from 'src/__mocks__/react-redux'
import { fetchFavorite } from 'src/store/favorite/actions'
import { changeMovieInFavorite } from 'src/store/movie/actions'
import { accountSelector } from 'src/store/session/selectors'

import useContainer from '../hook'

jest.mock('src/store/favorite/actions')

jest.mock('src/store/movie/actions')

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => null)
}))

jest.mock('src/store/favorite/selectors', () => ({
  favoriteErrorSelector: jest.fn(() => null),
  favoriteLoadingSelector: jest.fn(() => true),
  favoriteMoviesSelector: jest.fn(() => null),
  favoritePageSelector: jest.fn(() => 1)
}))

describe('Favotite useContainer hook', () => {
  const modalSpy = jest.spyOn(Modal, 'confirm')

  it('matches snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handlePagination` method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handlePagination(3)
    })

    expect(dispatch).toHaveBeenCalledWith(fetchFavorite(3))
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

    expect(modalSpy).toHaveBeenCalledWith({
      onOk,
      title: 'Do you want to delete movie from favorite?'
    })
    expect(dispatch).toHaveBeenCalledWith(
      changeMovieInFavorite({
        inFavorite: false,
        movieId: 123
      })
    )
  })

  it('checks `useEffect` method with account', () => {
    jest.mocked(accountSelector).mockReturnValueOnce(mockAccount)
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalledWith(fetchFavorite(1))
  })
})
