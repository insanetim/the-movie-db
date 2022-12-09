import { shallow } from 'enzyme'

import NotificationsRoot from '../component'

const mockedHookData = {
  notifications: [
    {
      id: 'test/id',
      messageType: 'success',
      messageText: 'test/message',
      duration: 2.5
    }
  ],
  hideNotification: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('NotificationsRoot component tests', () => {
  const component = shallow(<NotificationsRoot />)

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })
})
