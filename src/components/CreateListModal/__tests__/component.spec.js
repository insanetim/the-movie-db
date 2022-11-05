import { shallow } from 'enzyme'

import CreateListModal from '../component'

const mockedHookData = {
  handleOk: jest.fn(),
  handleSubmit: jest.fn(),
  handleAfterClose: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('CreateListModal component tests', () => {
  const component = shallow(<CreateListModal onCancel={jest.fn()} />)

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })
})
