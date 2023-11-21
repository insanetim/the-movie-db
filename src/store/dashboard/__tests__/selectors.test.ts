import mockState from 'src/__mocks__/mockState'

import { dashboardMoviesSelector } from '../selectors'

describe('dashboard selectors', () => {
  it('dashboardMoviesSelector', () => {
    expect(dashboardMoviesSelector(mockState)).toBe(null)
  })
})
