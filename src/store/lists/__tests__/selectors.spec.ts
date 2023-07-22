import mockState from 'src/__mocks__/mockState'

import { listSelector, listsSelector } from '../selectors'

describe('lists selectors', () => {
  it('listsSelector', () => {
    expect(listsSelector(mockState)).toBe(null)
  })

  it('listSelector', () => {
    expect(listSelector(mockState)).toBe(null)
  })
})
