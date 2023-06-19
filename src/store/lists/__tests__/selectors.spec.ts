import mockState from 'src/__mocks__/mockState'

import * as selectors from '../selectors'

describe('lists selectors', () => {
  it('listsSelector', () => {
    expect(selectors.listsSelector(mockState)).toBe(null)
  })

  it('listsLoadingSelector', () => {
    expect(selectors.listsLoadingSelector(mockState)).toBe(true)
  })

  it('listsErrorSelector', () => {
    expect(selectors.listsErrorSelector(mockState)).toBe(null)
  })

  it('listSelector', () => {
    expect(selectors.listSelector(mockState)).toBe(null)
  })

  it('listLoadingSelector', () => {
    expect(selectors.listLoadingSelector(mockState)).toBe(true)
  })

  it('listErrorSelector', () => {
    expect(selectors.listErrorSelector(mockState)).toBe(null)
  })
})
