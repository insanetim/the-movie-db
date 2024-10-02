import { act } from '@testing-library/react'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

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
  const props: SearchInputHookProps = { query: '' }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleChange" method', () => {
    const setState = jest.fn()
    const useStateMock = (initState: unknown) => [initState, setState]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock as never)

    const { result } = renderHookWithWrapper(() => useContainer(props))

    act(() => {
      result.current.handleChange({
        target: { value: 'test/search' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(setState).toHaveBeenCalledWith('test/search')
  })

  it('should check "handleSearch" method with value', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    act(() => {
      result.current.handleSearch('test/search')
    })

    expect(setSearchParams).toHaveBeenCalledWith(
      { search: 'test/search' },
      { replace: true }
    )
  })

  it('should check "handleSearch" method without value', () => {
    const { result } = renderHookWithWrapper(() => useContainer(props))

    act(() => {
      result.current.handleSearch('')
    })

    expect(setSearchParams).toHaveBeenCalledWith({}, { replace: true })
  })
})
