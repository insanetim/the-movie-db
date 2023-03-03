import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { hideModal } from 'src/state/app/actions'
import { createList } from 'src/state/lists/actions'
import useContainer from '../hook'

describe('CreateListModal useContainer hook', () => {
  let result = null
  const callback = jest.fn()
  const props = {
    form: { submit: jest.fn(), resetFields: jest.fn() },
    callback
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
    const listData = { name: 'test/name', description: 'test/description' }

    act(() => {
      result.current.handleSubmit(listData)
    })

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1, hideModal())
    expect(dispatch).toHaveBeenNthCalledWith(2, createList({ listData, callback: props.callback }))
  })

  it('checks `handleAfterClose` method', () => {
    act(() => {
      result.current.handleAfterClose()
    })

    expect(props.form.resetFields).toHaveBeenCalled()
  })
})
