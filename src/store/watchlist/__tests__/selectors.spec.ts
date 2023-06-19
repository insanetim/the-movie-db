import mockState from 'src/__mocks__/mockState'

import * as selectors from '../selectors'

describe('watchlist selectors', () => {
  it('watchlistMoviesSelector', () => {
    expect(selectors.watchlistMoviesSelector(mockState)).toBe(null)
  })

  it('watchlistLoadingSelector', () => {
    expect(selectors.watchlistLoadingSelector(mockState)).toBe(true)
  })

  it('watchlistErrorSelector', () => {
    expect(selectors.watchlistErrorSelector(mockState)).toBe(null)
  })
})
