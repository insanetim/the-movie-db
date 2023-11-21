import mockState from 'src/__mocks__/mockState'

import {
  favoriteErrorSelector,
  favoriteLoadingSelector,
  favoriteMoviesSelector
} from '../selectors'

describe('favorite selectors', () => {
  it('favoriteMoviesSelector', () => {
    const result = favoriteMoviesSelector(mockState)

    expect(result).toBe(null)
  })

  it('favoriteLoadingSelector', () => {
    const result = favoriteLoadingSelector(mockState)

    expect(result).toBe(true)
  })

  it('favoriteErrorSelector', () => {
    const result = favoriteErrorSelector(mockState)

    expect(result).toBe(null)
  })
})
