import { act, renderHook } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import { dispatch } from 'src/__mocks__/react-redux'
import * as dashboardActions from 'src/store/dashboard/actions'

import useContainer from '../hook'

jest.mock('src/store/dashboard/selectors', () => ({
  dashboardMoviesSelector: () => null
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn()
}))
const searchParams = new URLSearchParams()
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

describe('Trending useContainer hook', () => {
  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check `handlePagination` method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handlePagination(3)
    })

    expect(setSearchParams).toHaveBeenCalledWith({ page: '3' })
  })

  it('should check `useEffect` method', () => {
    const fetchTrending = jest.spyOn(dashboardActions, 'fetchTrending')
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalled()
    expect(fetchTrending).toHaveBeenCalledWith('1')
  })
})
