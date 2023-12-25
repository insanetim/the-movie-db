import mockState from 'src/__mocks__/mockState'

import { accountSelector, isAuthenticatedSelector } from '../selectors'

describe('auth selectors', () => {
  it('accountSelector', () => {
    const result = accountSelector(mockState)

    expect(result).toBe(null)
  })

  it('isAuthenticatedSelector', () => {
    const result = isAuthenticatedSelector(mockState)

    expect(result).toBe(false)
  })
})
