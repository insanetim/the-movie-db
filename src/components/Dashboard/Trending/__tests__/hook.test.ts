import { act, renderHook } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import { dispatch } from 'src/__mocks__/react-redux'
import { fetchTrending } from 'src/store/dashboard/actions'

import useContainer from '../hook'

jest.mock('src/store/dashboard/actions')

jest.mock('src/store/dashboard/selectors', () => ({
  dashboardMoviesSelector: jest.fn(() => ({}))
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
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalledWith(fetchTrending('1'))
  })
})
