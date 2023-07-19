import { act, renderHook } from '@testing-library/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import useContainer from '../hook'

jest.mock('src/store/dashboard/selectors', () => ({
  searchQuerySelector: jest.fn(() => null)
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn()
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)
const searchParams = {} as URLSearchParams
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

describe('SearchInput useContainer hook', () => {
  it('matches snapshot', () => {
    const { result } = renderHook(() => useContainer(), { wrapper: Wrapper })

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleSearch` method with value', () => {
    const { result } = renderHook(useContainer)

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
    const { result } = renderHook(() => useContainer(), { wrapper: Wrapper })

    act(() => {
      result.current.handleSearch('')
    })

    expect(navigate).toHaveBeenCalledWith('/')
  })
})
