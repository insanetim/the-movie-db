import mockState from 'src/__mocks__/mockState'

import { accountSelector, sessionIdSelector } from '../selectors'

describe('auth selectors', () => {
  it('sessionIdSelector', () => {
    const result = sessionIdSelector(mockState)

    expect(result).toBe('')
  })

  it('accountSelector', () => {
    const result = accountSelector(mockState)

    expect(result).toBe(null)
  })
})
