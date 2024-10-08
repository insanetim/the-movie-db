import { act } from '@testing-library/react'
import { hideModal } from 'src/store/app/actions'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('ModalRoot useContainer hook', () => {
  const mockState = {
    app: {
      modal: {
        modalProps: null,
        modalType: 'MODAL_CREATE_LIST' as const,
      },
      notifications: [],
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
