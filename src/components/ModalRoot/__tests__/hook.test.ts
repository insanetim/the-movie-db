import { act, renderHook } from '@testing-library/react'
import { dispatch } from 'src/__mocks__/react-redux'
import { hideModal } from 'src/store/app/actions'

import useContainer from '../hook'

jest.mock('src/store/app/selectors', () => ({
  modalSelector: () => ({
    modalProps: null,
    modalType: 'MODAL_CREATE_LIST',
  }),
}))

describe('ModalRoot useContainer hook', () => {
  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "onCancel" method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.onCancel()
    })

    expect(dispatch).toHaveBeenCalledWith(hideModal())
  })
})
