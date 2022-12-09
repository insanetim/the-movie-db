import { shallow } from 'enzyme'

import Notification from '../component'

const mockedHookData = {}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('Notification component tests', () => {
  const props = {
    id: 'test/id',
    messageType: 'success',
    messageText: 'test/message',
    duration: 2.5,
    hideNotification: jest.fn()
  }

  const component = shallow(<Notification {...props} />)

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })
})
