import mockState from 'src/__mocks__/mockState'

import {
  watchlistErrorSelector,
  watchlistLoadingSelector,
  watchlistMoviesSelector
} from '../selectors'

describe('watchlist selectors', () => {
  it('watchlistMoviesSelector', () => {
    const result = watchlistMoviesSelector(mockState)

    expect(result).toBe(null)
  })

  it('watchlistLoadingSelector', () => {
    const result = watchlistLoadingSelector(mockState)

    expect(result).toBe(true)
  })

  it('watchlistErrorSelector', () => {
    const result = watchlistErrorSelector(mockState)

    expect(result).toBe(null)
  })
})
