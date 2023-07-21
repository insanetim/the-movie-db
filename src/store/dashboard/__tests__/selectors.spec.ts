import mockState from 'src/__mocks__/mockState'

import * as selectors from '../selectors'

describe('dashboard selectors', () => {
  it('trendingMoviesSelector', () => {
    expect(selectors.dashboardMoviesSelector(mockState)).toBe(null)
  })

  it('trendingLoadingSelector', () => {
    expect(selectors.dashboardLoadingSelector(mockState)).toBe(true)
  })

  it('trendingErrorSelector', () => {
    expect(selectors.dashboardErrorSelector(mockState)).toBe(null)
  })
})
