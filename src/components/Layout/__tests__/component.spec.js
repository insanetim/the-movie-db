import { render } from '@testing-library/react'

import Wrapper from 'src/__mocks__/wrapperMock'
import Layout from '../component'

const mockedHeaderData = {
  account: {}
}
jest.mock('../Header/hook.js', () => jest.fn(() => mockedHeaderData))
const mockedModalData = {
  modalType: null
}
jest.mock('../../ModalRoot/hook.js', () => jest.fn(() => mockedModalData))
const mockedNotificationsData = {
  notifications: []
}
jest.mock('../../NotificationsRoot/hook.js', () => jest.fn(() => mockedNotificationsData))

describe('Layout component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Layout />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
