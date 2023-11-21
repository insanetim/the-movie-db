import mockState from 'src/__mocks__/mockState'

import {
  watchlistErrorSelector,
  watchlistLoadingSelector,
  watchlistMoviesSelector
} from '../selectors'

describe('watchlist selectors', () => {
  it('watchlistMoviesSelector', () => {
    expect(watchlistMoviesSelector(mockState)).toBe(null)
  })

  it('watchlistLoadingSelector', () => {
    expect(watchlistLoadingSelector(mockState)).toBe(true)
  })

  it('watchlistErrorSelector', () => {
    expect(watchlistErrorSelector(mockState)).toBe(null)
  })
})
