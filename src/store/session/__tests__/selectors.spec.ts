import mockState from 'src/__mocks__/mockState'
import * as selectors from '../selectors'

describe('session selectors', () => {
  it('sessionIdSelector', () => {
    expect(selectors.sessionIdSelector(mockState)).toBe('')
  })

  it('accountSelector', () => {
    expect(selectors.accountSelector(mockState)).toBe(null)
  })

  it('loadingSelector', () => {
    expect(selectors.loadingSelector(mockState)).toBe(false)
  })
})
