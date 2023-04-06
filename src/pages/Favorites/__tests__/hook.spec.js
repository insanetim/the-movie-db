import { Modal } from 'antd'
import { act, renderHook } from '@testing-library/react'

import { dispatch } from 'src/__mocks__/react-redux'
import { accountSelector } from 'src/store/session/selectors'
import { fetchFavorites, setFavoritesPage } from 'src/store/favorites/actions'
import { changeMovieInFavorites } from 'src/store/movie/actions'
import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => ({}))
}))

jest.mock('src/store/favorites/selectors', () => ({
  favoritesMoviesSelector: jest.fn(() => ({})),
  favoritesPageSelector: jest.fn(() => 1),
  favoritesLoadingSelector: jest.fn(() => true),
  favoritesErrorSelector: jest.fn(() => null)
}))

describe('Favotites useContainer hook', () => {
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

    expect(dispatch).toHaveBeenCalledWith(setFavoritesPage(3))
  })

  it('checks `handleDelete` method', () => {
    let onOk
    act(() => {
      onOk = result.current.handleDelete(123, { stopPropagation: jest.fn() })
    })
    onOk()

    expect(confirmSpy).toHaveBeenCalledWith({
      title: 'Do you want to delete movie from favorites?',
      onOk
    })
    expect(dispatch).toHaveBeenCalledWith(
      changeMovieInFavorites({
        movieId: 123,
        inFavorites: false
      })
    )
  })

  it('checks `useEffect` method with account', () => {
    accountSelector.mockReturnValueOnce({ id: 123 })
    ;({ result } = renderHook(useContainer))

    expect(dispatch).toHaveBeenCalledWith(fetchFavorites(1))
  })
})
