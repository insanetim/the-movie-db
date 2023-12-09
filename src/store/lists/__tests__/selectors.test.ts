import mockState from 'src/__mocks__/mockState'

import {
  listDetailErrorSelector,
  listDetailLoadingSelector,
  listDetailSelector,
  listsErrorSelector,
  listsLoadingSelector,
  listsSelector,
} from '../selectors'

describe('lists selectors', () => {
  it('listsSelector', () => {
    const result = listsSelector(mockState)

    expect(result).toBe(null)
  })

  it('listsLoadingSelector', () => {
    const result = listsLoadingSelector(mockState)

    expect(result).toBe(true)
  })

  it('listsErrorSelector', () => {
    const result = listsErrorSelector(mockState)

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
