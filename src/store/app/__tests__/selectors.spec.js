import * as selectors from '../selectors'

describe('app selectors', () => {
  it('modalTypeSelector', () => {
    const modalType = 'test/modalType'
    const state = { app: { modal: { modalType } } }

    expect(selectors.modalTypeSelector(state)).toEqual(modalType)
  })

  it('modalPropsSelector', () => {
    const modalProps = 'test/modalProps'
    const state = { app: { modal: { modalProps } } }

    expect(selectors.modalPropsSelector(state)).toEqual(modalProps)
  })

  it('notificationsSelector', () => {
    const notifications = 'test/notifications'
    const state = { app: { notifications } }

    expect(selectors.notificationsSelector(state)).toEqual(notifications)
  })
})
