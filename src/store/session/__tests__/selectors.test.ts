import mockState from 'src/__mocks__/mockState'

import {
  accountSelector,
  loadingSelector,
  sessionIdSelector
} from '../selectors'

describe('session selectors', () => {
  it('sessionIdSelector', () => {
    const result = sessionIdSelector(mockState)

    expect(result).toBe('')
  })

  it('accountSelector', () => {
    const result = accountSelector(mockState)

    expect(result).toBe(null)
  })

  it('loadingSelector', () => {
    const result = loadingSelector(mockState)

    expect(result).toBe(false)
  })
})
