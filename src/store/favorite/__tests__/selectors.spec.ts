import mockState from 'src/__mocks__/mockState'

import { favoriteMoviesSelector } from '../selectors'

describe('favorite selectors', () => {
  it('favoriteMoviesSelector', () => {
    expect(favoriteMoviesSelector(mockState)).toBe(null)
  })
})
