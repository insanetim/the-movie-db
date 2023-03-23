import { useDispatch } from 'react-redux'
import { act, renderHook } from '@testing-library/react'

import { hideModal } from 'src/store/app/actions'
import useContainer from '../hook'

jest.mock('src/store/app/selectors', () => ({
  modalTypeSelector: jest.fn(() => 'CREATE_LIST_MODAL'),
  modalPropsSelector: jest.fn(() => ({}))
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))
const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

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
