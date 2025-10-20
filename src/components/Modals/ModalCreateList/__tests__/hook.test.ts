import { renderHook } from '@testing-library/react'
import { FormInstance, InputRef } from 'antd'
import { useRef } from 'react'
import { hideModal } from 'src/store/features/app'
import { ListData } from 'src/store/features/list'
import { useAppDispatch } from 'src/store/hooks'

import useContainer from '../hook'
import { ModalCreateListHookProps } from '../types'

jest.mock('src/store/hooks')
jest.mock('src/store/features/app', () => ({
  hideModal: jest.fn(),
}))

// Mock React useRef for testing inputRef
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}))

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<
  typeof useAppDispatch
>
const mockHideModal = hideModal as jest.MockedFunction<typeof hideModal>
const mockUseRef = useRef as jest.MockedFunction<typeof useRef>

// Mock InputRef interface for testing
const mockInputRef: React.RefObject<InputRef> = {
  current: {
    blur: jest.fn(),
    focus: jest.fn(),
    input: null,
    select: jest.fn(),
    setSelectionRange: jest.fn(),
    value: '',
  } as unknown as InputRef,
}

// Mock FormInstance
const mockForm: FormInstance = {
  focusField: jest.fn(),
  getFieldError: jest.fn(),
  getFieldInstance: jest.fn(),
  getFieldsError: jest.fn(),
  getFieldsValue: jest.fn(),
  getFieldValue: jest.fn(),
  // Missing methods that are required by FormInstance interface
  getFieldWarning: jest.fn(),
  isFieldsTouched: jest.fn(),
  isFieldsValidating: jest.fn(),
  isFieldTouched: jest.fn(),
  isFieldValidating: jest.fn(),
  resetFields: jest.fn(),
  scrollToField: jest.fn(),
  setFields: jest.fn(),
  setFieldsValue: jest.fn(),
  setFieldValue: jest.fn(),
  submit: jest.fn(),
  validateFields: jest.fn(),
}

// Mock ListData
const mockListData: ListData = {
  description: 'Test Description',
  name: 'Test List',
}

describe('ModalCreateList useContainer hook', () => {
  let dispatch: jest.Mock
  let mockOnSubmit: jest.Mock

  beforeEach(() => {
    dispatch = jest.fn()
    mockUseAppDispatch.mockReturnValue(dispatch as never)

    mockUseRef.mockReturnValue(mockInputRef as never)

    mockHideModal.mockReturnValue({
      payload: undefined,
      type: 'app/hideModal',
    } as never)

    mockOnSubmit = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return hook functions and refs', () => {
    const props: ModalCreateListHookProps = {
      form: mockForm,
      onSubmit: mockOnSubmit,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.handleOk).toBeDefined()
    expect(result.current.handleSubmit).toBeDefined()
    expect(result.current.handleAfterOpenChange).toBeDefined()
    expect(result.current.inputRef).toBe(mockInputRef)
  })

  it('should call form.submit() when handleOk is called', () => {
    const props: ModalCreateListHookProps = {
      form: mockForm,
      onSubmit: mockOnSubmit,
    }

    const { result } = renderHook(() => useContainer(props))

    result.current.handleOk()

    expect(mockForm.submit).toHaveBeenCalledTimes(1)
  })

  it('should dispatch hideModal and call onSubmit when handleSubmit is called', async () => {
    const props: ModalCreateListHookProps = {
      form: mockForm,
      onSubmit: mockOnSubmit,
    }

    const { result } = renderHook(() => useContainer(props))

    await result.current.handleSubmit(mockListData)

    expect(dispatch).toHaveBeenCalledWith(mockHideModal())
    expect(mockOnSubmit).toHaveBeenCalledWith(mockListData)
  })

  it('should dispatch hideModal and call onSubmit even without onSubmit prop', async () => {
    const props: ModalCreateListHookProps = {
      form: mockForm,
      // onSubmit is optional
    }

    const { result } = renderHook(() => useContainer(props))

    await result.current.handleSubmit(mockListData)

    expect(dispatch).toHaveBeenCalledWith(mockHideModal())
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('should focus input when handleAfterOpenChange is called with open=true', () => {
    const props: ModalCreateListHookProps = {
      form: mockForm,
      onSubmit: mockOnSubmit,
    }

    const { result } = renderHook(() => useContainer(props))

    result.current.handleAfterOpenChange(true)

    expect(mockInputRef.current!.focus).toHaveBeenCalledTimes(1)
  })

  it('should not focus input when handleAfterOpenChange is called with open=false', () => {
    const props: ModalCreateListHookProps = {
      form: mockForm,
      onSubmit: mockOnSubmit,
    }

    const { result } = renderHook(() => useContainer(props))

    result.current.handleAfterOpenChange(false)

    expect(mockInputRef.current!.focus).not.toHaveBeenCalled()
  })

  it('should handle null input ref gracefully in handleAfterOpenChange', () => {
    mockUseRef.mockReturnValue({ current: null } as never)

    const props: ModalCreateListHookProps = {
      form: mockForm,
      onSubmit: mockOnSubmit,
    }

    const { result } = renderHook(() => useContainer(props))

    // Should not throw an error
    expect(() => result.current.handleAfterOpenChange(true)).not.toThrow()
  })
})
