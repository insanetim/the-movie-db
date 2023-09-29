import type { FormInstance } from 'antd'

import { act, renderHook } from '@testing-library/react'
import { dispatch } from 'src/__mocks__/react-redux'
import { hideModal } from 'src/store/app/actions'
import { createList } from 'src/store/lists/actions'

import useContainer from '../hook'

jest.mock('src/store/lists/actions')

describe('ModalCreateList useContainer hook', () => {
  const props = {
    form: {
      resetFields: jest.fn(),
      submit: jest.fn()
    } as unknown as FormInstance,
    movieId: 123
  }

  it('matches snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleOk` method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleOk()
    })

    expect(props.form.submit).toHaveBeenCalled()
  })

  it('checks `handleSubmit` method', () => {
    const listData = { description: 'test/description', name: 'test/name' }
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleSubmit(listData)
    })

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(1, hideModal())
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      createList({ listData, movieId: props.movieId })
    )
  })

  it('checks `handleAfterClose` method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleAfterClose()
    })

    expect(props.form.resetFields).toHaveBeenCalled()
  })
})
