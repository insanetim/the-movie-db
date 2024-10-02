import { act } from '@testing-library/react'
import { hideModal } from 'src/store/app/actions'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

describe('ModalRoot useContainer hook', () => {
  const mockDispatch = jest.fn()
  jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector')

  it('should match snapshot', () => {
    useSelectorMock.mockReturnValueOnce({
      modalProps: null,
      modalType: 'MODAL_CREATE_LIST',
    })

    const { result } = renderHookWithWrapper(useContainer)

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
