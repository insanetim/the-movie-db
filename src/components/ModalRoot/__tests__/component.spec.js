import { render } from '@testing-library/react'

import Wrapper from 'src/__mocks__/wrapperMock'
import ModalRoot from '../component'

let mockedHookData = {
  modalType: 'CREATE_LIST_MODAL',
  modalProps: {},
  onCancel: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ModalRoot component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<ModalRoot />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('return null unless modalType present', () => {
    mockedHookData = {
      modalType: undefined
    }
    const { asFragment } = render(<ModalRoot />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
