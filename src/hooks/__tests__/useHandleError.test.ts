import { act, renderHook } from '@testing-library/react'
import { NOTIFICATION_TYPE } from 'src/constants'
import { showNotification } from 'src/store/features/app'
import { useAppDispatch } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'

import useHandleError from '../useHandleError'

jest.mock('src/store/features/app')
jest.mock('src/store/hooks')
jest.mock('src/utils/helpers/errorMessage')

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<
  typeof useAppDispatch
>
const mockShowNotification = showNotification as jest.MockedFunction<
  typeof showNotification
>
const mockErrorMessage = errorMessage as jest.MockedFunction<
  typeof errorMessage
>

describe('useHandleError', () => {
  const mockDispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseAppDispatch.mockReturnValue(mockDispatch)
    mockShowNotification.mockImplementation(({ message, type }) => ({
      payload: {
        duration: 0,
        id: 'mock-id',
        message,
        type: type ?? NOTIFICATION_TYPE.ERROR,
      },
      type: 'app/showNotification',
    }))
    mockErrorMessage.mockReturnValue('Default error message')
  })

  it('should dispatch showNotification with derived error message', () => {
    const { result } = renderHook(() => useHandleError())

    const error = new Error('Something went wrong')
    mockErrorMessage.mockReturnValue('Derived message')

    act(() => {
      result.current.handleError(error)
    })

    expect(mockErrorMessage).toHaveBeenCalledWith(error)
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        duration: 0,
        id: 'mock-id',
        message: 'Derived message',
        type: NOTIFICATION_TYPE.ERROR,
      },
      type: 'app/showNotification',
    })
  })

  it('should handle non-Error inputs by using derived error message', () => {
    const { result } = renderHook(() => useHandleError())

    mockErrorMessage.mockReturnValue('Unknown error occurred')

    act(() => {
      result.current.handleError('unexpected')
    })

    expect(mockErrorMessage).toHaveBeenCalledWith('unexpected')
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        duration: 0,
        id: 'mock-id',
        message: 'Unknown error occurred',
        type: NOTIFICATION_TYPE.ERROR,
      },
      type: 'app/showNotification',
    })
  })
})
