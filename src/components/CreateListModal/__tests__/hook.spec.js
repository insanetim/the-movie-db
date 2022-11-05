import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { hideModal } from 'src/state/app/actions'
import { createList } from 'src/state/lists/actions'
import useContainer from '../hook'

describe('CreateListModal useContainer hook', () => {
  let result = null
  const props = {
    form: {
      submit: jest.fn(),
      resetFields: jest.fn()
    }
  }

  beforeEach(() => {
    ;({ result } = renderHook(() => useContainer(props)))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleOk` method', () => {
    act(() => {
      result.current.handleOk()
    })

    expect(props.form.submit).toHaveBeenCalled()
  })

  it('checks `handleSubmit` method', () => {
    act(() => {
      result.current.handleSubmit()
    })

    expect(dispatch).toHaveBeenCalledWith(hideModal())
    expect(dispatch).toHaveBeenCalledWith(createList())
  })

  it('checks `handleAfterClose` method', () => {
    act(() => {
      result.current.handleAfterClose()
    })

    expect(props.form.resetFields).toHaveBeenCalled()
  })
})
