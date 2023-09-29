import { act, renderHook } from '@testing-library/react'
import { ChangeEvent, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import useContainer from '../hook'

jest.mock('src/store/dashboard/selectors', () => ({
  searchQuerySelector: jest.fn(() => null)
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}))
const setState = jest.fn()
const useStateMock = (initState: unknown) => [initState, setState]
jest.mocked(useState).mockImplementation(useStateMock as never)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn()
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)
const searchParams = new URLSearchParams()
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

describe('SearchInput useContainer hook', () => {
  const props = { query: '' }

  it('matches snapshot', () => {
    const { result } = renderHook(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleChange` method', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleChange({
        target: { value: 'test/search' }
      } as ChangeEvent<HTMLInputElement>)
    })

    expect(setState).toHaveBeenCalledWith('test/search')
  })

  it('checks `handleSearch` method with value', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleSearch('test/search')
    })

    expect(setSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({
        search: 'test/search'
      })
    )
  })

  it('checks `handleSearch` method without value', () => {
    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleSearch('')
    })

    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('check `useEffect` method', () => {
    renderHook(() => useContainer(props))

    expect(setState).toHaveBeenCalledWith('')
  })
})
