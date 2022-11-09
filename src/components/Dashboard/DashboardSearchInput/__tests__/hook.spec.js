// import 'jsdom-global/register'
import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { clearSearch, fetchSearch } from 'src/state/dashboard/actions'
import { useNavigate } from 'react-router-dom'
import useContainer from '../hook'

describe('DashboardSearchInput useContainer hook', () => {
  let result = null
  const setState = jest.fn()
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation(initialState => [initialState, setState])

  const navigate = jest.fn()
  useNavigate.mockReturnValue(navigate)

  jest.mock('src/state/dashboard/selectors', () => ({
    searchQuerySelector: null
  }))

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleChange` method', () => {
    act(() => {
      result.current.handleChange({
        target: {
          value: 'test/value'
        }
      })
    })

    expect(setState).toHaveBeenCalledWith('test/value')
  })

  it('checks `handleSearch` method with value', () => {
    act(() => {
      result.current.handleSearch('value')
    })

    expect(dispatch).toHaveBeenCalledWith(fetchSearch({ query: 'value' }))
    expect(navigate).toHaveBeenCalledWith({ search: 'search=value' })
  })

  it('checks `handleSearch` method without value', () => {
    act(() => {
      result.current.handleSearch('')
    })

    expect(dispatch).toHaveBeenCalledWith(clearSearch())
    expect(navigate).toHaveBeenCalledWith('/')
  })
})
