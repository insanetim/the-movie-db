import mockState from 'src/__mocks__/mockState'

import { dashboardMoviesSelector } from '../selectors'

describe('dashboard selectors', () => {
  it('dashboardMoviesSelector', () => {
    const result = dashboardMoviesSelector(mockState)

    expect(result).toBe(null)
  })
})
