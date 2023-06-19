import mockState from 'src/__mocks__/mockState'

import * as selectors from '../selectors'

describe('movie selectors', () => {
  it('movieSelector', () => {
    expect(selectors.movieSelector(mockState)).toBe(null)
  })

  it('movieLoadingSelector', () => {
    expect(selectors.movieLoadingSelector(mockState)).toBe(true)
  })

  it('movieErrorSelector', () => {
    expect(selectors.movieErrorSelector(mockState)).toBe(null)
  })
})
