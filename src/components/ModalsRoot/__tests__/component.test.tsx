import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ModalsRoot from '../component'
import { ModalRootHookReturn } from '../types'

const mockedHook: ModalRootHookReturn = {
  modalProps: null,
  modalType: 'MODAL_CREATE_LIST',
  onCancel: jest.fn(),
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ModalRoot component', () => {
  it('should match snapshot', () => {
    const { baseElement } = renderWithWrapper(<ModalsRoot />)

    expect(baseElement).toMatchSnapshot()
  })

  it('should match snapshot without modalType', () => {
    mockedHook.modalType = null

    const { baseElement } = renderWithWrapper(<ModalsRoot />)

    expect(baseElement).toMatchSnapshot()
  })
})
