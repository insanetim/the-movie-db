import mockState from 'src/__mocks__/mockState'

import {
  personDetailsErrorSelector,
  personDetailsLoadingSelector,
  personDetailsSelector,
} from '../selectors'

describe('personDetails selectors', () => {
  it('personDetailsSelector', () => {
    const result = personDetailsSelector(mockState, 1234)

    expect(result).toBe(undefined)
  })

  it('personDetailsLoadingSelector', () => {
    const result = personDetailsLoadingSelector(mockState)

    expect(result).toBe(true)
  })

  it('personDetailsErrorSelector', () => {
    const result = personDetailsErrorSelector(mockState)

    expect(result).toBe(null)
  })
})
