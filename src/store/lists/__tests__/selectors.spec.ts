import mockState from 'src/__mocks__/mockState'

import {
  listDetailErrorSelector,
  listDetailLoadingSelector,
  listDetailSelector,
  listsErrorSelector,
  listsLoadingSelector,
  listsSelector
} from '../selectors'

describe('lists selectors', () => {
  it('listsSelector', () => {
    expect(listsSelector(mockState)).toBe(null)
  })

  it('listsLoadingSelector', () => {
    expect(listsLoadingSelector(mockState)).toBe(true)
  })

  it('listsErrorSelector', () => {
    expect(listsErrorSelector(mockState)).toBe(null)
  })

  it('listDetailSelector', () => {
    expect(listDetailSelector(mockState)).toBe(null)
  })

  it('listDetailLoadingSelector', () => {
    expect(listDetailLoadingSelector(mockState)).toBe(true)
  })

  it('listDetailErrorSelector', () => {
    expect(listDetailErrorSelector(mockState)).toBe(null)
  })
})
