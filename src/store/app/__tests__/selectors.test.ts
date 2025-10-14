import mockState from 'src/__mocks__/mockState'

import {
  modalSelector,
  notificationsSelector,
  themeSelector,
} from '../selectors'

describe('app selectors', () => {
  it('modalSelector', () => {
    const result = modalSelector(mockState)

    expect(result).toEqual({
      modalProps: null,
      modalType: null,
    })
  })

  it('notificationsSelector', () => {
    const result = notificationsSelector(mockState)

    expect(result).toEqual([])
  })

  it('themeSelector', () => {
    const result = themeSelector(mockState)

    expect(result).toEqual('light')
  })
})
