import mockState from 'src/__mocks__/mockState'

import { selectMovieById } from '../selectors'

describe('movie selectors', () => {
  it('selectMovieById', () => {
    expect(selectMovieById(mockState, 123)).toBe(undefined)
  })
})
