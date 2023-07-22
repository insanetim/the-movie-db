import mockState from 'src/__mocks__/mockState'

import { accountSelector, loadingSelector, sessionIdSelector } from '../selectors'

describe('session selectors', () => {
  it('sessionIdSelector', () => {
    expect(sessionIdSelector(mockState)).toBe('')
  })

  it('accountSelector', () => {
    expect(accountSelector(mockState)).toBe(null)
  })

  it('loadingSelector', () => {
    expect(loadingSelector(mockState)).toBe(false)
  })
})
