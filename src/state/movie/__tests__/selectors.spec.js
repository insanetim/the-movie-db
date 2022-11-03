import * as selectors from '../selectors'

it('movieSelector', () => {
  const movie = 'test/movie'
  const state = { movie }

  expect(selectors.movieSelector(state)).toEqual(movie)
})
