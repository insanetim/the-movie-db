import mockState from 'src/__mocks__/mockState'

import { watchlistMoviesSelector } from '../selectors'

describe('watchlist selectors', () => {
  it('watchlistMoviesSelector', () => {
    expect(watchlistMoviesSelector(mockState)).toBe(null)
  })
})
