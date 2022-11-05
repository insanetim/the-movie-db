/* eslint-disable react/jsx-no-useless-fragment */
import { shallow } from 'enzyme'

import Header from '../component'

jest.mock('react-router-dom', () => ({
  Link: () => <></>
}))

const mockedHookData = {
  account: {
    avatar: {
      gravatar: {
        hash: 'test/avatar'
      }
    },
    username: 'test/username'
  },
  handleLogout: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('CreateListModal component tests', () => {
  let component = shallow(<Header />)

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('matches snapshot with empty account', () => {
    mockedHookData.account = {}
    component = shallow(<Header />)

    expect(component).toMatchSnapshot()
  })
})
