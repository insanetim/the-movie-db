import { render } from '@testing-library/react'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import ModalRoot from '../component'
import { ModalRootHook } from '../types'

const mockedHook: ModalRootHook = {
  modalProps: null,
  modalType: 'MODAL_CREATE_LIST',
  onCancel: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ModalRoot component', () => {
  it('should match snapshot', () => {
    const { baseElement } = render(<ModalRoot />, { wrapper: Wrapper })

    expect(baseElement).toMatchSnapshot()
  })

  it('should return null unless modalType present', () => {
    mockedHook.modalType = null
    const { baseElement } = render(<ModalRoot />, { wrapper: Wrapper })

    expect(baseElement).toMatchSnapshot()
  })
})
