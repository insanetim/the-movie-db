import * as selectors from '../selectors'

it('movieSelector', () => {
  const movie = 'test/movie'
  const state = { movie: { movie } }

  expect(selectors.movieSelector(state)).toEqual(movie)
})

it('movieLoadingSelector', () => {
  const loading = 'test/loading'
  const state = { movie: { loading } }

  expect(selectors.movieLoadingSelector(state)).toEqual(loading)
})

it('movieErrorSelector', () => {
  const error = 'test/error'
  const state = { movie: { error } }

  expect(selectors.movieErrorSelector(state)).toEqual(error)
})
