import { fireEvent, screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ModalsRoot from '../component'
import useContainer from '../hook'
import { ModalRootHookReturn } from '../types'

const capturedModalProps: { current?: Record<string, unknown> } = {}

jest.mock('../modalComponents', () => {
  const actual = jest.requireActual('../modalComponents')

  return {
    ...actual,
    MODAL_COMPONENTS: {
      ...actual.MODAL_COMPONENTS,
      CREATE_LIST: (props: Record<string, unknown>) => {
        capturedModalProps.current = props

        const ActualComponent = actual.MODAL_COMPONENTS.CREATE_LIST as (
          props: Record<string, unknown>
        ) => JSX.Element

        return ActualComponent(props)
      },
    },
  }
})

jest.mock('../hook')

const mockedUseContainer = useContainer as jest.MockedFunction<
  typeof useContainer
>

describe('ModalsRoot component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    capturedModalProps.current = undefined
  })

  it('renders provided modal component when a modal is active', () => {
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

    renderWithWrapper(<ModalsRoot />)

    expect(screen.getByText('Create list')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument()
    const modalProps = capturedModalProps.current as
      | Record<string, unknown>
      | undefined

    expect(modalProps).toBeDefined()
    if (!modalProps) {
      throw new Error('Modal props were not captured')
    }

    const typedModalProps = modalProps as Record<string, unknown>

    expect(typedModalProps).toEqual(expect.objectContaining(modal.modalProps))
  })

  it('renders nothing when there are no modals', () => {
    mockedUseContainer.mockReturnValue({
      closeModal: jest.fn(),
      modals: [],
      removeModal: jest.fn(),
    })

    renderWithWrapper(<ModalsRoot />)

    expect(screen.queryByText('Create list')).not.toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(capturedModalProps.current).toBeUndefined()
  })

  it('calls modal afterClose and removes modal when ModalComponent afterClose is triggered', () => {
    const removeModal = jest.fn()
    const closeModal = jest.fn()
    const modalAfterClose = jest.fn()
    const modal: ModalRootHookReturn['modals'][number] = {
      modalId: 'modal-1',
      modalProps: {
        afterClose: modalAfterClose,
      },
      modalType: 'CREATE_LIST',
    }

    mockedUseContainer.mockReturnValue({
      closeModal,
      modals: [modal],
      removeModal,
    })

    renderWithWrapper(<ModalsRoot />)

    const props = capturedModalProps.current

    expect(props).toBeDefined()

    const afterClose = props?.afterClose as (() => void) | undefined

    expect(afterClose).toBeDefined()

    afterClose?.()

    expect(modalAfterClose).toHaveBeenCalledTimes(1)
    expect(removeModal).toHaveBeenCalledWith('modal-1')
  })

  it('calls closeModal when ModalComponent onCancel is triggered', async () => {
    const removeModal = jest.fn()
    const closeModal = jest.fn()
    const modal: ModalRootHookReturn['modals'][number] = {
      modalId: 'modal-2',
      modalProps: {},
      modalType: 'CREATE_LIST',
    }

    mockedUseContainer.mockReturnValue({
      closeModal,
      modals: [modal],
      removeModal,
    })

    renderWithWrapper(<ModalsRoot />)

    const closeButton = await screen.findByRole('button', { name: /close/i })

    fireEvent.click(closeButton)

    expect(closeModal).toHaveBeenCalledWith('modal-2')
  })
})
