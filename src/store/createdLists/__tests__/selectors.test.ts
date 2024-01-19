import mockState from 'src/__mocks__/mockState'

import {
  createdListsErrorSelector,
  createdListsLoadingSelector,
  createdListsSelector,
} from '../selectors'

describe('createdLists selectors', () => {
  it('createdListsSelector', () => {
    const result = createdListsSelector(mockState)

    expect(result).toBe(null)
  })

  it('createdListsLoadingSelector', () => {
    const result = createdListsLoadingSelector(mockState)

    expect(result).toBe(true)
  })

  it('createdListsErrorSelector', () => {
    const result = createdListsErrorSelector(mockState)

    expect(result).toBe(null)
  })
})
