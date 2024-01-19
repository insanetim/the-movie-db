import mockState from 'src/__mocks__/mockState'

import {
  createdListsErrorSelector,
  createdListsLoadingSelector,
  createdListsSelector,
  listDetailErrorSelector,
  listDetailLoadingSelector,
  listDetailSelector,
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

  it('listDetailSelector', () => {
    const result = listDetailSelector(mockState)

    expect(result).toBe(null)
  })

  it('listDetailLoadingSelector', () => {
    const result = listDetailLoadingSelector(mockState)

    expect(result).toBe(true)
  })

  it('listDetailErrorSelector', () => {
    const result = listDetailErrorSelector(mockState)

    expect(result).toBe(null)
  })
})
