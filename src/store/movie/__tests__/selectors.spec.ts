import mockState from 'src/__mocks__/mockState'

import { movieSelector } from '../selectors'

describe('movie selectors', () => {
  it('movieSelector', () => {
    expect(movieSelector(mockState)).toBe(null)
  })
})
