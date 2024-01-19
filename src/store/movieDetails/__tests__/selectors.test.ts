import mockState from 'src/__mocks__/mockState'

import {
  movieDetailsErrorSelector,
  movieDetailsLoadingSelector,
  movieDetailsSelector,
} from '../selectors'

describe('movieDetails selectors', () => {
  it('movieDetailsSelector', () => {
    const result = movieDetailsSelector(mockState, 1234)

    expect(result).toBe(undefined)
  })

  it('movieDetailsLoadingSelector', () => {
    const result = movieDetailsLoadingSelector(mockState)

    expect(result).toBe(true)
  })

  it('movieDetailsErrorSelector', () => {
    const result = movieDetailsErrorSelector(mockState)

    expect(result).toBe(null)
  })
})
