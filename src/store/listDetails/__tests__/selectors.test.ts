import mockState from 'src/__mocks__/mockState'

import {
  listDetailsErrorSelector,
  listDetailsLoadingSelector,
  listDetailsSelector,
} from '../selectors'

describe('listDetails selectors', () => {
  it('listDetailsSelector', () => {
    const result = listDetailsSelector(mockState)

    expect(result).toBe(null)
  })

  it('listDetailsLoadingSelector', () => {
    const result = listDetailsLoadingSelector(mockState)

    expect(result).toBe(true)
  })

  it('listDetailsErrorSelector', () => {
    const result = listDetailsErrorSelector(mockState)

    expect(result).toBe(null)
  })
})
