import { act } from '@testing-library/react'
import mockNotification from 'src/__mocks__/mockNotification'
import { hideNotification } from 'src/store/app/actions'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

describe('NotificationsRoot useContainer hook', () => {
  const mockDispatch = jest.fn()
  jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector')

  it('should match snapshot', () => {
    useSelectorMock.mockReturnValueOnce([mockNotification])

    const { result } = renderHookWithWrapper(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "hideNotification" method', () => {
    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      result.current.hideNotification('test/id')
    })

    expect(mockDispatch).toHaveBeenCalledWith(hideNotification('test/id'))
  })
})
