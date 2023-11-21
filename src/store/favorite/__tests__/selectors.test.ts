import mockState from 'src/__mocks__/mockState'

import {
  favoriteErrorSelector,
  favoriteLoadingSelector,
  favoriteMoviesSelector
} from '../selectors'

describe('favorite selectors', () => {
  it('favoriteMoviesSelector', () => {
    expect(favoriteMoviesSelector(mockState)).toBe(null)
  })

  it('favoriteLoadingSelector', () => {
    expect(favoriteLoadingSelector(mockState)).toBe(true)
  })

  it('favoriteErrorSelector', () => {
    expect(favoriteErrorSelector(mockState)).toBe(null)
  })
})
