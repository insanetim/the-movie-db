import mockState from 'src/__mocks__/mockState'

import {
  dashboardErrorSelector,
  dashboardLoadingSelector,
  dashboardMoviesSelector,
} from '../selectors'

describe('dashboard selectors', () => {
  it('dashboardMoviesSelector', () => {
    const result = dashboardMoviesSelector(mockState)

    expect(result).toBe(null)
  })

  it('dashboardLoadingSelector', () => {
    const result = dashboardLoadingSelector(mockState)

    expect(result).toBe(true)
  })

  it('dashboardErrorSelector', () => {
    const result = dashboardErrorSelector(mockState)

    expect(result).toBe(null)
  })
})
