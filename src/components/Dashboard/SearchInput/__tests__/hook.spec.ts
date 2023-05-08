import React from 'react'
import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react'

import useContainer from '../hook'

jest.mock('src/store/dashboard/selectors', () => ({
  searchQuerySelector: jest.fn(() => null)
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

describe('SearchInput useContainer hook', () => {
  const props = { query: '' }
  const setState = jest.fn()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useStateMock: any = (initState: any) => [initState, setState]
  jest.spyOn(React, 'useState').mockImplementation(useStateMock)

  it('matches snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleChange` method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleChange({
        target: {
          value: 'test/search'
        }
      } as never)
    })

    expect(setState).toHaveBeenCalledWith('test/search')
  })

  it('checks `handleSearch` method with value', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleSearch('test/search')
    })

    expect(navigate).toHaveBeenCalledWith({ pathname: '/', search: 'search=test/search' })
  })

  it('checks `handleSearch` method without value', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleSearch('')
    })

    expect(navigate).toHaveBeenCalledWith('/')
  })
})
