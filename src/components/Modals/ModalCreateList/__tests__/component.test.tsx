import { screen } from '@testing-library/react'
import { createRef } from 'react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ModalCreateList from '../component'
import { ModalCreateListHookReturn } from '../types'

const mockModalProps = jest.fn()

jest.mock('antd', () => {
  const actual = jest.requireActual('antd')

  return {
    ...actual,
    Modal: jest.fn(
      ({ afterOpenChange, children, okButtonProps, okText, onOk, title }) => {
        mockModalProps({
          afterOpenChange,
          children,
          okButtonProps,
          okText,
          onOk,
          title,
        })

        return (
          <div role='dialog'>
            <h1>{title}</h1>
            <button
              onClick={onOk}
              type='button'
            >
              {okText}
            </button>
            {children}
          </div>
        )
      }
    ),
  }
})

const mockedHook: jest.Mocked<ModalCreateListHookReturn> = {
  handleAfterOpenChange: jest.fn(),
  handleOk: jest.fn(),
  handleSubmit: jest.fn(),
  inputRef: createRef(),
  isSubmitting: false,
}

jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ModalCreateList component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedHook.isSubmitting = false
    mockedHook.inputRef = createRef()
    mockModalProps.mockClear()
  })

  it('renders modal content and form fields', () => {
    renderWithWrapper(<ModalCreateList onCancel={jest.fn()} />)

    expect(screen.getByText('Create list')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument()
  })

  it('calls handleOk when confirming creation', () => {
    renderWithWrapper(<ModalCreateList onCancel={jest.fn()} />)

    screen.getByRole('button', { name: 'Create' }).click()

    expect(mockedHook.handleOk).toHaveBeenCalled()
  })

  it('passes handleSubmit to the form onFinish prop', () => {
    renderWithWrapper(<ModalCreateList onCancel={jest.fn()} />)

    const lastCall =
      mockModalProps.mock.calls[mockModalProps.mock.calls.length - 1]
    const { children } = lastCall[0]
    const formElement = Array.isArray(children)
      ? children.find(child => child?.props?.onFinish)
      : children

    expect(formElement?.props?.onFinish).toBe(mockedHook.handleSubmit)
  })

  it('forwards inputRef to the name field input', () => {
    renderWithWrapper(<ModalCreateList onCancel={jest.fn()} />)

    expect(mockedHook.inputRef.current?.input).toBe(
      screen.getByPlaceholderText('Name')
    )
  })

  it('wires afterOpenChange handler from hook', () => {
    renderWithWrapper(<ModalCreateList onCancel={jest.fn()} />)

    const lastCall =
      mockModalProps.mock.calls[mockModalProps.mock.calls.length - 1]
    const modalProps = lastCall[0]
    const { afterOpenChange } = modalProps
    afterOpenChange?.(true)

    expect(mockedHook.handleAfterOpenChange).toHaveBeenCalledWith(true)
  })

  it('sets loading state on the create button while submitting', () => {
    mockedHook.isSubmitting = true

    renderWithWrapper(<ModalCreateList onCancel={jest.fn()} />)

    const lastCall =
      mockModalProps.mock.calls[mockModalProps.mock.calls.length - 1]
    const modalProps = lastCall[0]
    const { okButtonProps } = modalProps

    expect(okButtonProps?.loading).toBe(true)
  })
})
