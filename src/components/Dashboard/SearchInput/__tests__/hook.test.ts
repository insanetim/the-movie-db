import { act, renderHook } from '@testing-library/react'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

import useContainer from '../hook'
import { SearchInputHookProps } from '../types'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}))
const searchParams = new URLSearchParams()
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

describe('SearchInput useContainer hook', () => {
  const setState = jest.fn()
  const useStateMock = (initState: unknown) => [initState, setState]
  jest.spyOn(React, 'useState').mockImplementation(useStateMock as never)

  const props: SearchInputHookProps = { query: '' }

  it('should match snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleChange" method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleChange({
        target: { value: 'test/search' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(setState).toHaveBeenCalledWith('test/search')
  })

  it('should check "handleSearch" method with value', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleSearch('test/search')
    })

    expect(setSearchParams).toHaveBeenCalledWith({ search: 'test/search' })
  })

  it('should check "handleSearch" method without value', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleSearch('')
    })

    expect(setSearchParams).toHaveBeenCalledWith({})
  })

  it('should check `useEffect` method', () => {
    renderHook(() => useContainer(props))

    expect(setState).toHaveBeenCalledWith('')
  })
})
