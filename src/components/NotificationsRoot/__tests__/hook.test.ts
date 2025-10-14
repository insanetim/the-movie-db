import { act } from '@testing-library/react'
import mockNotification from 'src/__mocks__/mockNotification'
import { hideNotification } from 'src/store/app/actions'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('NotificationsRoot useContainer hook', () => {
  const mockState = {
    app: {
      modal: {
        modalProps: null,
        modalType: null,
      },
      notifications: [mockNotification],
      theme: 'light' as const,
    },
  }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(result.current).toMatchSnapshot()
  })

  it('should check "hideNotification" method', () => {
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    act(() => {
      result.current.hideNotification('test/id')
    })

    expect(mockDispatch).toHaveBeenCalledWith(hideNotification('test/id'))
  })
})
