import mockState from 'src/__mocks__/mockState'

import {
  modalPropsSelector,
  modalTypeSelector,
  notificationsSelector
} from '../selectors'

describe('app selectors', () => {
  it('modalTypeSelector', () => {
    const result = modalTypeSelector(mockState)

    expect(result).toBe(null)
  })

  it('modalPropsSelector', () => {
    const result = modalPropsSelector(mockState)

    expect(result).toBe(null)
  })

  it('notificationsSelector', () => {
    const result = notificationsSelector(mockState)

    expect(result).toEqual([])
  })
})
