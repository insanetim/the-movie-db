import * as selectors from '../selectors'

it('watchlistSelector', () => {
  const watchlist = 'test/watchlist'
  const state = { watchlist }

  expect(selectors.watchlistSelector(state)).toEqual(watchlist)
})
