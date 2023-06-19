import mockState from 'src/__mocks__/mockState'

import * as selectors from '../selectors'

describe('dashboard selectors', () => {
  it('trendingMoviesSelector', () => {
    expect(selectors.trendingMoviesSelector(mockState)).toBe(null)
  })

  it('trendingPageSelector', () => {
    expect(selectors.trendingPageSelector(mockState)).toBe(1)
  })

  it('trendingLoadingSelector', () => {
    expect(selectors.trendingLoadingSelector(mockState)).toBe(true)
  })

  it('trendingErrorSelector', () => {
    expect(selectors.trendingErrorSelector(mockState)).toBe(null)
  })

  it('searchMoviesSelector', () => {
    expect(selectors.searchMoviesSelector(mockState)).toBe(null)
  })

  it('searchPageSelector', () => {
    expect(selectors.searchPageSelector(mockState)).toBe(1)
  })

  it('searchLoadingSelector', () => {
    expect(selectors.searchLoadingSelector(mockState)).toBe(true)
  })

  it('searchErrorSelector', () => {
    expect(selectors.searchErrorSelector(mockState)).toBe(null)
  })
})
