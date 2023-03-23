import { useDispatch } from 'react-redux'
import { act, renderHook } from '@testing-library/react'

import { hideModal } from 'src/store/app/actions'
import { createList } from 'src/store/lists/actions'
import useContainer from '../hook'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))
const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

describe('CreateListModal useContainer hook', () => {
  let result = null

  const props = {
    form: { submit: jest.fn(), resetFields: jest.fn() },
    movieId: 123
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
    expect(dispatch).toHaveBeenNthCalledWith(2, createList({ listData, movieId: props.movieId }))
  })

  it('checks `handleAfterClose` method', () => {
    act(() => {
      result.current.handleAfterClose()
    })

    expect(props.form.resetFields).toHaveBeenCalled()
  })
})
