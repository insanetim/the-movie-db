import mockState from 'src/__mocks__/mockState'

import { selectMovieById } from '../selectors'

describe('movie selectors', () => {
  it('selectMovieById', () => {
    const result = selectMovieById(mockState, 1234)

    expect(result).toBe(undefined)
  })
})
