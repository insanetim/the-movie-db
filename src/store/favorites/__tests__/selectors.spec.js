import * as selectors from '../selectors'

describe('favorites selectors', () => {
  it('favoritesMoviesSelector', () => {
    const movies = 'test/movies'
    const state = { favorites: { movies } }

    expect(selectors.favoritesMoviesSelector(state)).toEqual(movies)
  })

  it('favoritesPageSelector', () => {
    const page = 'test/page'
    const state = { favorites: { page } }

    expect(selectors.favoritesPageSelector(state)).toEqual(page)
  })

  it('favoritesLoadingSelector', () => {
    const loading = 'test/loading'
    const state = { favorites: { loading } }

    expect(selectors.favoritesLoadingSelector(state)).toEqual(loading)
  })

  it('favoritesErrorSelector', () => {
    const error = 'test/error'
    const state = { favorites: { error } }

    expect(selectors.favoritesErrorSelector(state)).toEqual(error)
  })
})
