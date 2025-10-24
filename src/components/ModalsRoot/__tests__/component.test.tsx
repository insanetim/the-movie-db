import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ModalsRoot from '../component'
import useContainer from '../hook'
import { ModalRootHookReturn } from '../types'

jest.mock('../hook')

const mockedUseContainer = useContainer as jest.MockedFunction<
  typeof useContainer
>

describe('ModalsRoot component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('matches snapshot with active modal', () => {
    const modal: ModalRootHookReturn['modals'][number] = {
      modalId: 'modal-1',
      modalProps: {
        closeModal: jest.fn(),
        onSubmit: jest.fn(),
      },
      modalType: 'CREATE_LIST',
    }

    mockedUseContainer.mockReturnValue({
      closeModal: jest.fn(),
      modals: [modal],
      removeModal: jest.fn(),
    })

    const { baseElement } = renderWithWrapper(<ModalsRoot />)

    expect(baseElement).toMatchSnapshot()
  })

  it('matches snapshot without modals', () => {
    mockedUseContainer.mockReturnValue({
      closeModal: jest.fn(),
      modals: [],
      removeModal: jest.fn(),
    })

    const { baseElement } = renderWithWrapper(<ModalsRoot />)

    expect(baseElement).toMatchSnapshot()
  })
})
