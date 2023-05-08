import mockState from 'src/__mocks__/mockState'
import * as selectors from '../selectors'

describe('favorite selectors', () => {
  it('favoriteMoviesSelector', () => {
    expect(selectors.favoriteMoviesSelector(mockState)).toBe(null)
  })

  it('favoriteLoadingSelector', () => {
    expect(selectors.favoriteLoadingSelector(mockState)).toBe(true)
  })

  it('favoriteErrorSelector', () => {
    expect(selectors.favoriteErrorSelector(mockState)).toBe(null)
  })
})
