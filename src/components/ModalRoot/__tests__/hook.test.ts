import { act } from '@testing-library/react'
import { hideModal, Theme } from 'src/store/features/app'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('ModalRoot useContainer hook', () => {
  const mockState = {
    app: {
      _persist: {
        rehydrated: true,
        version: -1,
      },
      modal: {
        modalProps: null,
        modalType: 'MODAL_CREATE_LIST' as const,
      },
      notifications: [],
      theme: 'light' as Theme,
    },
  }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(result.current).toMatchSnapshot()
  })

  it('should check "onCancel" method', () => {
    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      result.current.onCancel()
    })

    expect(mockDispatch).toHaveBeenCalledWith(hideModal())
  })
})
