import { render } from '@testing-library/react'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import ModalRoot from '../component'
import { ModalRootHook } from '../types'

const mockedHookData: ModalRootHook = {
  modalProps: null,
  modalType: 'MODAL_CREATE_LIST',
  onCancel: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ModalRoot component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<ModalRoot />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('return null unless modalType present', () => {
    mockedHookData.modalType = null
    const { asFragment } = render(<ModalRoot />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
