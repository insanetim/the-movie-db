import { shallow } from 'enzyme'

import ModalRoot from '../component'

let mockedHookData = {
  modalType: 'CREATE_LIST_MODAL',
  modalProps: {},
  onCancel: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ModalRoot component', () => {
  let component = shallow(<ModalRoot />)

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('return null unless modalType present', () => {
    mockedHookData = {
      modalType: undefined
    }
    component = shallow(<ModalRoot />)

    expect(component).toMatchSnapshot()
  })
})
