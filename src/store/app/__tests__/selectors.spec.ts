import mockState from 'src/__mocks__/mockState'

import * as selectors from '../selectors'

describe('app selectors', () => {
  it('modalTypeSelector', () => {
    expect(selectors.modalTypeSelector(mockState)).toBe(null)
  })

  it('modalPropsSelector', () => {
    expect(selectors.modalPropsSelector(mockState)).toBe(null)
  })

  it('notificationsSelector', () => {
    expect(selectors.notificationsSelector(mockState)).toEqual([])
  })
})
