import { act } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import * as dashboardActions from 'src/store/dashboard/actions'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}))
const searchParams = new URLSearchParams()
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

describe('Trending useContainer hook', () => {
  const mockDispatch = jest.fn()
  jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)
  const useSelectorMock = jest.spyOn(reactRedux, 'useAppSelector')

  it('should match snapshot', () => {
    useSelectorMock.mockReturnValueOnce(null)
    useSelectorMock.mockReturnValueOnce(true)
    useSelectorMock.mockReturnValueOnce(null)

    const { result } = renderHookWithWrapper(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check `handlePagination` method', () => {
    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      result.current.handlePagination(3)
    })

    expect(setSearchParams).toHaveBeenCalledWith({ page: '3' })
  })

  it('should check `useEffect` method', () => {
    const fetchTrending = jest.spyOn(dashboardActions, 'fetchTrending')

    renderHookWithWrapper(useContainer)

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchTrending).toHaveBeenCalledWith('1')
  })
})
