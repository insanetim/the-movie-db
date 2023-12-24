import mockState from 'src/__mocks__/mockState'

import {
  accountSelector,
  isAuthenticatedSelector,
  sessionIdSelector,
} from '../selectors'

describe('auth selectors', () => {
  it('accountSelector', () => {
    const result = accountSelector(mockState)

    expect(result).toBe(null)
  })

  it('isAuthenticatedSelector', () => {
    const result = isAuthenticatedSelector(mockState)

    expect(result).toBe(false)
  })

  it('sessionIdSelector', () => {
    const result = sessionIdSelector(mockState)

    expect(result).toBe('')
  })
})
