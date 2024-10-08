import { act, renderHook } from '@testing-library/react'
import { FormInstance } from 'antd'
import React from 'react'
import { hideModal } from 'src/store/app/actions'
import * as createdListsActions from 'src/store/createdLists/actions'
import * as reactRedux from 'src/store/hooks'

import useContainer from '../hook'
import { ModalCreateListHookProps } from '../types'

const focus = jest.fn()
jest.spyOn(React, 'useRef').mockReturnValue({ current: { focus } })

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('ModalCreateList useContainer hook', () => {
  const createList = jest.spyOn(createdListsActions, 'createList')
  const props: ModalCreateListHookProps = {
    form: {
      resetFields: jest.fn(),
      submit: jest.fn(),
    } as unknown as FormInstance,
    movieId: 1234,
  }

  it('should match snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleOk" method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleOk()
    })

    expect(props.form.submit).toHaveBeenCalled()
  })

  it('should check "handleSubmit" method', () => {
    const listData = { description: 'test/description', name: 'test/name' }

    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleSubmit(listData)
    })

    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenNthCalledWith(1, hideModal())
    expect(createList).toHaveBeenCalledWith({
      listData,
      movieId: props.movieId,
    })
  })

  it('should check "handleSubmit" method with onSuccess', async () => {
    const onSuccess = jest.fn()
    const extendedProps = { ...props, onSuccess }
    const listData = { description: 'test/description', name: 'test/list' }

    const { result } = renderHook(() => useContainer(extendedProps))

    await act(() => {
      result.current.handleSubmit(listData)
    })

    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenNthCalledWith(1, hideModal())
    expect(createList).toHaveBeenCalledWith({
      listData,
      movieId: props.movieId,
    })
    expect(onSuccess).toHaveBeenCalled()
  })

  it('should check "handleAfterClose" method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleAfterClose()
    })

    expect(props.form.resetFields).toHaveBeenCalled()
  })

  it('should check "handleAfterOpenChange" method with true', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleAfterOpenChange(true)
    })

    expect(focus).toHaveBeenCalled()
  })

  it('should check "handleAfterOpenChange" method with false', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleAfterOpenChange(false)
    })

    expect(focus).not.toHaveBeenCalled()
  })
})
