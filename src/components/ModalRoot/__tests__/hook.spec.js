import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { hideModal } from 'src/store/app/actions'
import useContainer from '../hook'

jest.mock('src/store/app/selectors', () => ({
  modalTypeSelector: jest.fn(() => 'CREATE_LIST_MODAL'),
  modalPropsSelector: jest.fn(() => ({}))
}))

describe('ModalRoot useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `onCancel` method', () => {
    act(() => {
      result.current.onCancel()
    })

    expect(dispatch).toHaveBeenCalledWith(hideModal())
  })
})
