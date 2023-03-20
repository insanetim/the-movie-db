import * as selectors from '../selectors'

it('watchlistMoviesSelector', () => {
  const movies = 'test/movies'
  const state = { watchlist: { movies } }

  expect(selectors.watchlistMoviesSelector(state)).toEqual(movies)
})

it('watchlistPageSelector', () => {
  const page = 'test/page'
  const state = { watchlist: { page } }

  expect(selectors.watchlistPageSelector(state)).toEqual(page)
})

it('watchlistLoadingSelector', () => {
  const loading = 'test/loading'
  const state = { watchlist: { loading } }

  expect(selectors.watchlistLoadingSelector(state)).toEqual(loading)
})

it('watchlistErrorSelector', () => {
  const error = 'test/error'
  const state = { watchlist: { error } }

  expect(selectors.watchlistErrorSelector(state)).toEqual(error)
})
