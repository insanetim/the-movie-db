import React from 'react'
import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'

import useContainer from '../hook'

jest.mock('src/store/dashboard/selectors', () => ({
  searchQuerySelector: jest.fn(() => null)
}))

describe('DashboardSearchInput useContainer hook', () => {
  let result = null
  const props = 'test/searchQuery'
  const setState = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(initialState => [initialState, setState])

  const navigate = jest.fn()
  useNavigate.mockReturnValue(navigate)

  beforeEach(() => {
    ;({ result } = renderHook(() => useContainer(props)))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleChange` method', () => {
    act(() => {
      result.current.handleChange({
        target: {
          value: 'test/search'
        }
      })
    })

    expect(setState).toHaveBeenCalledWith('test/search')
  })

  it('checks `handleSearch` method with value', () => {
    act(() => {
      result.current.handleSearch('value')
    })

    expect(navigate).toHaveBeenCalledWith({ pathname: '/', search: 'search=value' })
  })

  it('checks `handleSearch` method without value', () => {
    act(() => {
      result.current.handleSearch('')
    })

    expect(navigate).toHaveBeenCalledWith('/')
  })
})
