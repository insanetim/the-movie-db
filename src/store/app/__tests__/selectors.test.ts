import mockState from 'src/__mocks__/mockState'

import {
  modalPropsSelector,
  modalTypeSelector,
  notificationsSelector
} from '../selectors'

describe('app selectors', () => {
  it('modalTypeSelector', () => {
    expect(modalTypeSelector(mockState)).toBe(null)
  })

  it('modalPropsSelector', () => {
    expect(modalPropsSelector(mockState)).toBe(null)
  })

  it('notificationsSelector', () => {
    expect(notificationsSelector(mockState)).toEqual([])
  })
})
